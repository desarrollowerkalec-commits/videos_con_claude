# VSL de referencia — Taller IA Inmobiliaria · Día 1 (16:9, estilo DW, ángulo verde)

Video para la página de venta (landing). Daniela grabó horizontal en su casa, **sin pantalla verde**.

## Pipeline usado

1. `prep.py` → transcripción (si falla PyAV: `pip install av==13.1.0`).
2. Recorte con IA + piel suavizada (pecas, sin plastificar):
   ```bash
   # una vez: libs de sistema + modelo
   apt-get install -y libegl1 libgles2
   editor-video-ia/.venv/bin/pip install mediapipe
   mkdir -p editor-video-ia/assets/models && curl -o editor-video-ia/assets/models/selfie_multiclass_256x256.tflite \
     https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite
   # prueba en un cuadro (mirar comp.png y piel_antes_despues.png)
   editor-video-ia/.venv/bin/python editor-video-ia/scripts/recorte_ia.py test cuadro.png salida/
   # video completo → webm VP9 con alfa a 30 fps (~1,4 cuadros/s en 4 núcleos: 80 s de video ≈ 30 min)
   editor-video-ia/.venv/bin/python editor-video-ia/scripts/recorte_ia.py video original.mp4 public/fg.webm
   ```
3. Fondo: `fondo_estudio.py fondo.png` (estudio cálido, ventana a jardín, escritorio de madera, todo desenfocado).
   Si Daniela pasa una foto real, reemplazar `img/fondo.png` y listo.
4. `video.tsx` → composición 1920×1080. Daniela se mueve con `POSE` (solo **desplazar a la derecha y acercar**:
   en el original su cabeza toca el borde de arriba, si se achica aparece el corte). Paneles a la izquierda.
5. `render.sh` con ruta absoluta (música Forward Momentum automática).

## Reglas aprendidas

- Textos del VSL = los de la landing (fechas, horarios, "Grabación disponible por 6 meses", USD 97).
- "Acá te dejo los datos" / "por acá te inscribís" → se resuelven con panel de datos + botón "Reservá tu lugar" ↓.
- Corregir Whisper: "Chachipiti Cloud" = ChatGPT y Claude; "transacciones" = tasaciones; "hojita 4" = hoja A4.
- Que no llegue por WhatsApp: pedir el archivo original (WhatsApp lo dejó en 576×324 dentro de un marco vertical).
- Para la versión 9:16: grabar horizontal 4K centrada, con aire a los costados.
