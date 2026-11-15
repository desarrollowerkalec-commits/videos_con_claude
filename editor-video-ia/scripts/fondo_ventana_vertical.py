"""Fondo procedural VERTICAL (1080x1920): ventana grande a un jardín, muy esfumada, pared cálida y un mueble de madera.
Pensado para reels/videos 9:16 con la persona recortada adelante (la ventana queda detrás de la cabeza y hombros).
Uso: fondo_ventana_vertical.py <salida.png> [blur=22]
"""
import sys
import numpy as np, cv2

W, H = 1080, 1920
BLUR = float(sys.argv[2]) if len(sys.argv) > 2 else 22
rng = np.random.default_rng(11)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)


def noise(scale, seed):
    r = np.random.default_rng(seed)
    small = r.random((H // scale + 2, W // scale + 2)).astype(np.float32)
    return cv2.resize(small, (W, H), interpolation=cv2.INTER_CUBIC)


def col(c):
    return tuple(float(v) for v in c)


# pared crema cálida
img = np.zeros((H, W, 3), np.float32)
img[:] = np.array([0.80, 0.88, 0.95], np.float32) * (1 - 0.2 * (yy / H))[..., None]
img *= (0.97 + 0.05 * noise(50, 1))[..., None]

# ventana grande (detrás de la cabeza)
wx0, wx1, wy0, wy1 = 120, 1000, 150, 1250
win = np.zeros((H, W, 3), np.float32)
win[:] = np.array([0.98, 0.95, 0.88], np.float32)
for n, rmin, rmax, cols, top in [
    (200, 30, 90, [(0.30, 0.62, 0.38), (0.25, 0.55, 0.30), (0.35, 0.70, 0.50)], 0.30),
    (160, 16, 50, [(0.28, 0.66, 0.48), (0.40, 0.78, 0.62), (0.22, 0.50, 0.30)], 0.38),
    (60, 8, 22, [(0.55, 0.85, 0.98), (0.75, 0.92, 0.98), (0.60, 0.65, 0.95)], 0.55),
]:
    for _ in range(n):
        cx = rng.uniform(wx0 - 60, wx1 + 60)
        cy = rng.uniform(wy0 + top * (wy1 - wy0), wy1 + 40)
        c = np.array(cols[rng.integers(len(cols))], np.float32) * rng.uniform(0.85, 1.1)
        cv2.circle(win, (int(cx), int(cy)), int(rng.uniform(rmin, rmax)), col(c), -1, lineType=cv2.LINE_AA)
for _ in range(90):  # copa de árbol arriba a la derecha
    c = np.array([0.32, 0.60, 0.40], np.float32) * rng.uniform(0.8, 1.1)
    cv2.circle(win, (int(rng.uniform(600, 1060)), int(rng.uniform(wy0 - 20, wy0 + 330))), int(rng.uniform(30, 80)), col(c), -1, lineType=cv2.LINE_AA)
win = cv2.GaussianBlur(win, (0, 0), 18) * 1.08 + 0.06
m = np.zeros((H, W), np.float32)
cv2.rectangle(m, (wx0, wy0), (wx1, wy1), 1.0, -1)
img = img * (1 - m[..., None]) + win * m[..., None]
frame = np.zeros((H, W), np.float32)
cv2.rectangle(frame, (wx0, wy0), (wx1, wy1), 1.0, 30)
cv2.line(frame, ((wx0 + wx1) // 2, wy0), ((wx0 + wx1) // 2, wy1), 1.0, 20)
cv2.line(frame, (wx0, wy0 + 380), (wx1, wy0 + 380), 1.0, 14)
cv2.rectangle(frame, (wx0 - 40, wy1), (wx1 + 40, wy1 + 30), 1.0, -1)
img = img * (1 - frame[..., None]) + np.array([0.90, 0.95, 0.97], np.float32) * frame[..., None]
# cortina de lino a la izquierda
cur = np.zeros((H, W), np.float32)
cv2.fillPoly(cur, [np.array([[0, 60], [200, 60], [170, 1400], [0, 1400]], np.int32)], 1.0)
img = img * (1 - cur[..., None]) + (np.array([0.82, 0.90, 0.96], np.float32) * (0.88 + 0.12 * np.sin(xx / 20.0))[..., None]) * cur[..., None]

# mueble de madera abajo
dy0 = 1430
grain = 0.82 + 0.18 * (0.5 + 0.5 * np.sin((xx * 0.012 + 6 * noise(60, 3) + yy * 0.002) * 6.0))
desk = np.array([0.20, 0.38, 0.60], np.float32) * grain[..., None]
desk[(yy >= dy0) & (yy < dy0 + 80)] *= 1.25
dm = (yy >= dy0).astype(np.float32)
img = img * (1 - dm[..., None]) + desk * dm[..., None]
# planta a la derecha sobre el mueble
cv2.fillPoly(img, [np.array([[820, dy0 - 140], [1000, dy0 - 140], [975, dy0 + 10], [845, dy0 + 10]], np.int32)], (0.85, 0.88, 0.90), lineType=cv2.LINE_AA)
for _ in range(70):
    a = rng.uniform(-2.6, -0.5); L = rng.uniform(110, 260)
    x0, y0 = 910, dy0 - 140
    c = np.array([0.25, 0.52, 0.30], np.float32) * rng.uniform(0.8, 1.15)
    cv2.ellipse(img, (int(x0 + L / 2 * np.cos(a)), int(y0 + L / 2 * np.sin(a))), (int(L / 2), 18), np.degrees(a), 0, 360, col(c), -1, lineType=cv2.LINE_AA)

# esfumado fuerte + luz de la ventana
img = cv2.GaussianBlur(img, (0, 0), BLUR)
img += cv2.GaussianBlur(np.clip(img - 0.85, 0, 1), (0, 0), 50) * 1.5
img *= (1 - 0.25 * (((xx - W / 2) / W) ** 2 + ((yy - H * 0.45) / H) ** 2) * 2)[..., None]
img += rng.normal(0, 0.008, (H, W, 1)).astype(np.float32)
cv2.imwrite(sys.argv[1], np.clip(img * 255, 0, 255).astype(np.uint8))
