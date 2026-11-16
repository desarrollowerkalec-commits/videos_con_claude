# Kit Remotion · CROCHETES

Para cada reel nuevo, después de `reel_prep.py`:
1. `cp marcas/crochetes/theme.ts <reel>/remotion/src/theme.ts`
2. `cp marcas/crochetes/remotion/kit.tsx <reel>/remotion/src/kit.tsx`
3. `cp marcas/crochetes/remotion/sfx-extra/*.wav <reel>/remotion/public/sfx/` (tick, paper, sparkle; ya están también en template-reel)
4. `mkdir -p <reel>/remotion/public/logos && cp editor-video-ia/assets/logos/crochetes-*.png <reel>/remotion/public/logos/`
5. Extraer el último cuadro para la placa: `ffmpeg -ss <DURATION-0.05> -i public/cam.mp4 -frames:v 1 public/last.jpg`
6. Escribir `video.tsx` tomando como modelo `ejemplo-reel01-video.tsx`.
7. Portada: copiar `Cover.tsx`, registrar la composition `Cover` en `Root.tsx` (ver estilo.md → Portadas), cambiar textos y foto (`public/img/cover-bg.jpg`).
8. Placa final: SIN sombras, SIN "link en la bio" (no hay guía en el link).

Render SIN música mientras la identidad sonora no esté aprobada (si no, render.sh mete la de Daniela Werkalec):
`bash editor-video-ia/scripts/render.sh <reel> "$PWD/Reels - CROCHETES/<nombre>.mp4" none`

Piezas del kit ↔ recursos de la referencia (estilo.md): ScriptReveal #1/#15 · SelectBox #2 · TrackIn #4 ·
BigWord #5 (spin = #9) · Strip #8 · PaperNote #10 · Chip #7/#12 · Stickers #7/#13 · DrawnArrow #12 · Flash #14 ·
EndCard (placa) · Karaoke (subtítulos) · AiMark (marca de agua IA obligatoria).
