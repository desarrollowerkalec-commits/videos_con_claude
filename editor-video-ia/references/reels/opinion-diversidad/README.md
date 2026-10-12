# Reel de referencia — Opinión (fucsia) · "Día de la diversidad cultural"

Caso: el video llega **ya editado** (subtítulos + música quemados). Solo se suman motion graphics y portada.

- `video.tsx` → escenas line-art en la zona libre de abajo (torso, `Dock`), chips de pasos arriba,
  punch-ins, tinte del ángulo, remate en cascada, placa final sobre la oficina sin la figura.
- `kit.tsx` → fuentes (True Fate y BREATHING locales vía FontFace), `Dock`, `Kicker` con cursor, `draw()` para trazos.
- `Cover.tsx` → portada según `marcas/daniela-werkalec/estilo.md` (Anton 133 px = borde a borde para
  "TRADUCIR ≠ ENTENDER"; ajustar el tamaño según el largo del titular).
- Render: `render.sh <carpeta> <salida> none` (el video ya trae música; la cola de marca entra solo en la placa).
- Assets en `public/`: `src.mp4`, `fonts/`, `img/` (cover-bg = frame con boca cerrada, face.jpg, office-*.jpg), `sfx/`, `forward-momentum.mp3`.
- Ojo: `assets/overlays/*.png` son máscaras de luminancia (blanco = sin efecto); las sombras acá se hicieron en CSS.
