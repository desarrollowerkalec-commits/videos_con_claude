"""Fondo procedural: estudio cálido con ventana a un jardín + escritorio de madera, con profundidad de campo.
Uso: fondo.py <salida.png>
"""
import sys
import numpy as np, cv2

W, H = 1920, 1080
rng = np.random.default_rng(7)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)


def noise(scale, seed):
    r = np.random.default_rng(seed)
    small = r.random((H // scale + 2, W // scale + 2)).astype(np.float32)
    return cv2.resize(small, (W, H), interpolation=cv2.INTER_CUBIC)


img = np.zeros((H, W, 3), np.float32)  # BGR 0..1

# --- pared cálida (crema) con caída de luz
wall = np.array([0.80, 0.88, 0.95], np.float32)  # BGR crema cálido
fall = 1.0 - 0.28 * ((xx - 820) / W) ** 2 - 0.18 * (yy / H)
img[:] = wall * fall[..., None]
img *= (0.97 + 0.05 * noise(40, 1))[..., None]

# --- ventana (vista al jardín)
wx0, wx1, wy0, wy1 = 360, 1300, 70, 650
win = np.zeros((H, W, 3), np.float32)
t = np.clip((yy - wy0) / (wy1 - wy0), 0, 1)
sky = np.array([0.98, 0.95, 0.88], np.float32)  # cielo claro
win[:] = sky
# follaje: capas de manchas verdes / amarillas (bokeh de jardín)
for layer, (n, rmin, rmax, cols) in enumerate([
    (260, 18, 60, [(0.30, 0.62, 0.38), (0.25, 0.55, 0.30), (0.35, 0.70, 0.50)]),
    (180, 10, 34, [(0.28, 0.66, 0.48), (0.40, 0.78, 0.62), (0.22, 0.50, 0.30)]),
    (60, 6, 16, [(0.55, 0.85, 0.98), (0.75, 0.92, 0.98), (0.60, 0.65, 0.95)]),  # flores / luz
]):
    for _ in range(n):
        cx = rng.uniform(wx0 - 40, wx1 + 40)
        top = wy0 + (0.25 if layer < 2 else 0.45) * (wy1 - wy0)
        cy = rng.uniform(top, wy1 + 30)
        r = rng.uniform(rmin, rmax)
        c = np.array(cols[rng.integers(len(cols))], np.float32) * rng.uniform(0.85, 1.1)
        cv2.circle(win, (int(cx), int(cy)), int(r), tuple(float(v) for v in c), -1, lineType=cv2.LINE_AA)
# árbol de fondo arriba a la derecha de la ventana
for _ in range(120):
    cx = rng.uniform(950, 1350); cy = rng.uniform(wy0 - 20, wy0 + 260); r = rng.uniform(20, 55)
    c = np.array([0.32, 0.60, 0.40], np.float32) * rng.uniform(0.8, 1.1)
    cv2.circle(win, (int(cx), int(cy)), int(r), tuple(float(v) for v in c), -1, lineType=cv2.LINE_AA)
win = cv2.GaussianBlur(win, (0, 0), 16)
win = win * 1.08 + 0.06  # sobreexpuesto suave: ventana luminosa
mask = np.zeros((H, W), np.float32)
cv2.rectangle(mask, (wx0, wy0), (wx1, wy1), 1.0, -1)
img = img * (1 - mask[..., None]) + win * mask[..., None]
# marco y parteluces blancos
frame = np.zeros((H, W), np.float32)
cv2.rectangle(frame, (wx0, wy0), (wx1, wy1), 1.0, 26)
cv2.line(frame, ((wx0 + wx1) // 2, wy0), ((wx0 + wx1) // 2, wy1), 1.0, 18)
cv2.line(frame, (wx0, wy0 + 200), (wx1, wy0 + 200), 1.0, 12)
cv2.rectangle(frame, (wx0 - 40, wy1), (wx1 + 40, wy1 + 26), 1.0, -1)  # alféizar
fc = np.array([0.90, 0.95, 0.97], np.float32)
img = img * (1 - frame[..., None]) + fc * frame[..., None]
# cortina de lino a la izquierda
cur = np.zeros((H, W), np.float32)
pts = np.array([[wx0 - 130, 30], [wx0 + 70, 30], [wx0 + 40, 720], [wx0 - 170, 720]], np.int32)
cv2.fillPoly(cur, [pts], 1.0)
folds = 0.88 + 0.12 * np.sin(xx / 22.0)
cc = np.array([0.82, 0.90, 0.96], np.float32)
img = img * (1 - cur[..., None]) + (cc * folds[..., None]) * cur[..., None]

# --- escritorio de madera (de pared a pared, detrás de ella)
dy0 = 735
desk = np.zeros((H, W, 3), np.float32)
grain = 0.5 + 0.5 * np.sin((xx * 0.012 + 6 * noise(60, 3) + yy * 0.002) * 6.0)
grain = 0.82 + 0.18 * grain * (0.7 + 0.3 * noise(8, 4))
wood = np.array([0.20, 0.38, 0.60], np.float32)  # nogal cálido (BGR)
desk[:] = wood * grain[..., None]
top = (yy >= dy0) & (yy < dy0 + 70)
desk[top] *= 1.25  # tapa con brillo
dm = (yy >= dy0).astype(np.float32)
img = img * (1 - dm[..., None]) + desk * dm[..., None]
cv2.line(img, (0, dy0 + 70), (W, dy0 + 70), (0.10, 0.20, 0.33), 6, lineType=cv2.LINE_AA)

# planta en maceta sobre el escritorio (izquierda)
pot = np.array([[150, dy0 - 120], [300, dy0 - 120], [280, dy0 + 10], [170, dy0 + 10]], np.int32)
cv2.fillPoly(img, [pot], (0.85, 0.88, 0.90), lineType=cv2.LINE_AA)
for _ in range(70):
    a = rng.uniform(-2.6, -0.5); L = rng.uniform(90, 230)
    x0, y0 = 225, dy0 - 120
    x1, y1 = x0 + L * np.cos(a), y0 + L * np.sin(a)
    c = np.array([0.25, 0.52, 0.30], np.float32) * rng.uniform(0.8, 1.15)
    cv2.ellipse(img, (int((x0 + x1) / 2), int((y0 + y1) / 2)), (int(L / 2), 16), np.degrees(a), 0, 360, tuple(float(v) for v in c), -1, lineType=cv2.LINE_AA)
# libros + taza (derecha)
x = 1500
for w_, h_, c in [(38, 190, (0.25, 0.30, 0.55)), (30, 170, (0.55, 0.50, 0.30)), (44, 200, (0.80, 0.82, 0.85)), (34, 160, (0.30, 0.55, 0.70))]:
    cv2.rectangle(img, (x, dy0 - h_), (x + w_, dy0 + 4), c, -1); x += w_ + 4
# lámpara cálida a la derecha (luz)
cv2.circle(img, (1800, 300), 90, (0.75, 0.93, 1.0), -1, lineType=cv2.LINE_AA)

# --- profundidad de campo + luz
img = cv2.GaussianBlur(img, (0, 0), 15)
glow = cv2.GaussianBlur(np.clip(img - 0.85, 0, 1), (0, 0), 40)
img = img + glow * 1.6
lamp = np.exp(-(((xx - 1800) ** 2 + (yy - 300) ** 2) / (2 * 260 ** 2)))
img += lamp[..., None] * np.array([0.02, 0.10, 0.18], np.float32)
# viñeta suave y grano
vig = 1 - 0.22 * (((xx - W / 2) / W) ** 2 + ((yy - H / 2) / H) ** 2) * 2
img *= vig[..., None]
img += (rng.normal(0, 0.008, (H, W, 1))).astype(np.float32)
cv2.imwrite(sys.argv[1], np.clip(img * 255, 0, 255).astype(np.uint8))
