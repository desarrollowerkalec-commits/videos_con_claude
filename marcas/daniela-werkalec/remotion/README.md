# Paquete Remotion de la marca Daniela Werkalec

Piezas probadas en los reels reales (SALUDO Martillero, Congreso). Se copian en cada reel nuevo
después de `reel_prep.py`:

```bash
R=edicion-xxx/reels/<nombre>/remotion
cp marcas/daniela-werkalec/remotion/src/* $R/src/        # NO pisa words.ts (no está acá)
mkdir -p $R/public/fonts && cp editor-video-ia/assets/fonts/{NeatoSerif-Regular.ttf,Breathing.ttf} $R/public/fonts/
```

| Archivo | Qué tiene |
|---|---|
| `src/theme.ts` | fuentes (Playfair, True Fate/Neato, Red Hat, PT Serif) y colores. **Cambiar `lime` y `angle` al color del ángulo.** |
| `src/reel.tsx` | cámara, subtítulos karaoke al pecho, remate en cascada (`RemarkPhrase`), fondo de red neuronal |
| `src/mg.tsx` | **gráficos a pantalla completa** (`FullScreen` + piezas line-art) y parciales |
| `src/Cover.tsx` | portada según la spec nueva (líneas pegadas, sombra 3D de Anton, bajada 52 px minúscula, foto con exposición bajada). Cambiar `AC`, textos, ícono y el tamaño del Anton según el largo del titular |
| `src/lib.tsx`, `src/Root.tsx` | utilidades y composiciones (Main + Cover) |
| `ejemplos/video-congreso.tsx` | reel completo: remates, tarjetas, 5 gráficos a pantalla completa, balanza, placa final con oficina |
| `ejemplos/video-saludo.tsx` | reel corto: subtítulos + marca de agua IA + placa final |
| `ejemplos/video-noventa.tsx` | reel de noticias (rojo) sobre un video que YA trae motions y música: gráficos solo en los huecos, encuesta final |

**Zona segura:** todo el texto va entre x 60–940 (centro 500) e y ≤ 1500. `SubsV`, `RemarkPhrase`, `Kicker` y `Headline` ya la respetan; `SAFE` en `mg.tsx`.

`public/` de cada reel necesita además: `end-office.jpg` (recorte de oficina SIN la figura), `end-portrait.jpg`
(foto para la placa) y `cover-bg.jpg` (frame con boca cerrada). Ver `../estilo.md`.
