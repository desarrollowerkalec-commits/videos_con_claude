# Reel de referencia — Opinión (fucsia) · "Modelo 2027" (video CRUDO de avatar IA)

A diferencia de `opinion-diversidad/` (que venía con subs quemados), acá el video llega **sin subtítulos**:

- `video.tsx` → **subtítulos karaoke Playfair** (`Karaoke`, armados solos desde `words.json`: grupos de 2–4
  palabras, corte en puntuación o pausa > 0.4 s; palabra hablada amarilla con escala 1.14 + cajita amarilla suave
  + contorno negro; `FIX` corrige voseo que Whisper pierde: necesitás, imaginá, comentá…), a y≈850 (pecho).
  Se ocultan durante los remates en cascada (`R1`, `R2`). Docks line-art (y 1080–1500), chips de pasos,
  AngleTag, punch-ins, flash, placa final con cara + anillo + waveform.
- `kit.tsx` → usar el de `opinion-diversidad/` sin cambios (ahí están Dock, Kicker, draw, fuentes).
- `Cover.tsx` → portada DW: Anton ~157 px para "TU INMOBILIARIA" (15 caracteres = borde a borde).
- Render: `render.sh` normal (Forward Momentum automática, baja sola en la placa final).
