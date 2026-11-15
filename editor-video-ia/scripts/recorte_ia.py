"""Segmentación persona + suavizado de piel (pecas) para el VSL.

Uso:
  seg.py test <in.png> <outdir>           -> PNGs de diagnóstico
  seg.py video <in.mp4> <out_fg.webm>     -> video de Daniela con alfa (VP9) y piel suavizada, 30 fps
Clases del modelo selfie_multiclass: 0 fondo, 1 pelo, 2 piel cuerpo, 3 piel cara, 4 ropa, 5 otros.
"""
import sys, subprocess, os
import numpy as np, cv2
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions

MODEL = os.environ.get("SEG_MODEL", os.path.join(os.path.dirname(__file__), "..", "assets", "models", "selfie_multiclass_256x256.tflite"))
W, H = 1920, 1080  # se recalcula según el video de entrada
EDGE_FADE_LEFT = int(os.environ.get("EDGE_FADE_LEFT", "0"))  # px a desvanecer a la izq. (objetos en el borde)


def make_seg():
    opts = vision.ImageSegmenterOptions(
        base_options=BaseOptions(model_asset_path=MODEL),
        running_mode=vision.RunningMode.IMAGE,
        output_confidence_masks=True, output_category_mask=False)
    return vision.ImageSegmenter.create_from_options(opts)


def guided(I, p, r, eps):
    """Guided filter (He et al.) con guía en gris float32 0..1."""
    mI = cv2.boxFilter(I, -1, (r, r)); mp_ = cv2.boxFilter(p, -1, (r, r))
    cIp = cv2.boxFilter(I * p, -1, (r, r)) - mI * mp_
    vI = cv2.boxFilter(I * I, -1, (r, r)) - mI * mI
    a = cIp / (vI + eps); b = mp_ - a * mI
    return cv2.boxFilter(a, -1, (r, r)) * I + cv2.boxFilter(b, -1, (r, r))


class Proc:
    def __init__(self):
        self.seg = make_seg()
        self.prev_alpha = None

    def __call__(self, bgr):
        rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
        res = self.seg.segment(mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb))
        cm = [m.numpy_view().astype(np.float32) for m in res.confidence_masks]
        cm = [cv2.resize(c, (bgr.shape[1], bgr.shape[0]), interpolation=cv2.INTER_LINEAR) for c in cm]
        person = np.clip(1.0 - cm[0], 0, 1)
        face = cm[3]; body = cm[2]
        g = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
        # matte: guided filter a media resolución (rápido) para pegarse al pelo
        hh, ww = g.shape
        sw, sh = (ww // 2, hh // 2) if ww * hh > 1.2e6 else (ww, hh)
        gs = cv2.resize(g, (sw, sh)); ps = cv2.resize(person, (sw, sh))
        a = guided(gs, ps, 9 if sw > 700 else 5, 1e-3)
        a = cv2.resize(a, (bgr.shape[1], bgr.shape[0]), interpolation=cv2.INTER_LINEAR)
        a = np.clip((a - 0.22) / 0.66, 0, 1)
        if EDGE_FADE_LEFT:
            a[:, :EDGE_FADE_LEFT] *= np.linspace(0, 1, EDGE_FADE_LEFT, dtype=np.float32)[None, :] ** 2
        # estabilidad temporal (menos parpadeo en bordes)
        if self.prev_alpha is not None:
            a = 0.65 * a + 0.35 * self.prev_alpha
        self.prev_alpha = a
        # piel: suavizado bilateral solo en piel (cara + cuerpo), mezcla parcial para no "plastificar"
        skin = np.clip(face + 0.7 * body, 0, 1)
        skin = cv2.GaussianBlur(skin, (0, 0), 6)
        small = cv2.resize(bgr, (sw, sh))
        sm = cv2.bilateralFilter(small, 9, 34, 8)
        sm = cv2.bilateralFilter(sm, 9, 28, 6)
        sm = cv2.resize(sm, (bgr.shape[1], bgr.shape[0]), interpolation=cv2.INTER_CUBIC)
        # devolver algo de textura fina (alta frecuencia muy suave) para que no quede de cera
        hf = bgr.astype(np.float32) - cv2.GaussianBlur(bgr, (0, 0), 1.2).astype(np.float32)
        smooth = sm.astype(np.float32) + 0.32 * hf
        k = (0.8 * skin)[..., None]
        out = bgr.astype(np.float32) * (1 - k) + smooth * k
        # leve calidez + un toque de brillo para integrarla al fondo cálido
        out = out * np.array([0.97, 1.0, 1.03], np.float32) * 1.02
        # descontaminar bordes: el halo claro de la pared se reemplaza por color del interior
        wgt = np.clip((a - 0.85) / 0.15, 0, 1)
        num = cv2.GaussianBlur(out * wgt[..., None], (0, 0), 7)
        den = cv2.GaussianBlur(wgt, (0, 0), 7)[..., None] + 1e-4
        est = num / den
        e = np.clip((a - 0.55) / 0.45, 0, 1)[..., None]
        e = e * e * (3 - 2 * e)
        out = est * (1 - e) + out * e
        return np.clip(out, 0, 255).astype(np.uint8), a, skin


def test(inp, outdir):
    os.makedirs(outdir, exist_ok=True)
    bgr = cv2.imread(inp)
    p = Proc()
    out, a, skin = p(bgr)
    cv2.imwrite(f"{outdir}/alpha.png", (a * 255).astype(np.uint8))
    cv2.imwrite(f"{outdir}/skin.png", (skin * 255).astype(np.uint8))
    cv2.imwrite(f"{outdir}/smooth.png", out)
    green = np.zeros_like(out); green[:] = (60, 180, 60)
    comp = out * a[..., None] + green * (1 - a[..., None])
    cv2.imwrite(f"{outdir}/comp.png", comp.astype(np.uint8))
    crop = np.hstack([bgr[150:650, 820:1320], out[150:650, 820:1320]])
    cv2.imwrite(f"{outdir}/piel_antes_despues.png", crop)


def video(inp, outp):
    global W, H
    W, H = [int(v) for v in subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', inp]).decode().strip().split(',')]
    dec = subprocess.Popen(["ffmpeg", "-v", "error", "-i", inp, "-vf", "fps=30", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"],
                           stdout=subprocess.PIPE)
    enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgra", "-s", f"{W}x{H}", "-r", "30", "-i", "-",
                            "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "22", "-row-mt", "1",
                            "-deadline", "good", "-cpu-used", "5", "-auto-alt-ref", "0", outp], stdin=subprocess.PIPE)
    p = Proc(); n = 0
    fs = W * H * 3
    while True:
        buf = dec.stdout.read(fs)
        if len(buf) < fs:
            break
        bgr = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
        out, a, _ = p(bgr)
        bgra = np.dstack([out, (a * 255).astype(np.uint8)])
        enc.stdin.write(bgra.tobytes())
        n += 1
        if n % 150 == 0:
            print("frames", n, flush=True)
    enc.stdin.close(); enc.wait(); dec.wait()
    print("listo", n)


if __name__ == "__main__":
    {"test": test, "video": video}[sys.argv[1]](*sys.argv[2:])
