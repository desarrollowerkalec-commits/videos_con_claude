# CLAUDE.md — Repo de edición de reels de Daniela Werkalec

Este archivo lo lee Claude **automáticamente** al empezar cada sesión nueva sobre este repo.
Su función: que cualquier sesión (cualquier modelo) sepa editar un reel con el estilo de Daniela
sin que ella tenga que re-explicar nada.

## Qué es este repo

Sistema repetible para editar reels verticales (1080×1920) de la marca **Daniela Werkalec**
(`danielawerkalec.com.ar`) con el kit **`editor-video-ia`** (Remotion + Whisper).

- `editor-video-ia/` → el kit: skill, scripts (`setup.sh`, `prep.py`, `reel_prep.py`, `stills.sh`, `render.sh`), motor Remotion, assets (fuentes, música, íconos, overlays).
- `marcas/daniela-werkalec/estilo.md` → **la biblia de estilo** (colores, tipografías, subtítulos karaoke, remate en cascada, portadas, placa final, música, ángulos). **Leer SIEMPRE antes de editar.**
- `edicion-*/` → carpetas por-video (gitignored, descartables). Cada reel vive en una.

## Marcas (una carpeta por marca en `marcas/`)

| Marca | Estilo |
|---|---|
| Daniela Werkalec (marca personal) | `marcas/daniela-werkalec/estilo.md` — **sistema base** |
| Marketing Digital Inmobiliario (MDI) | `marcas/marketing-digital-inmobiliario/estilo.md` — **hereda** del base; verde agua `#6AD5B7`, presentadora **Clara (avatar IA, no es Daniela)** |

Si Daniela no dice la marca y no se deduce del video, preguntar. Para una marca derivada: leer PRIMERO el
estilo base y DESPUÉS el de la marca (que pisa colores, fuentes, subtítulos, logo, placa final).
Código de referencia reutilizable: `editor-video-ia/references/reels/opinion-diversidad/` (cambiar solo
las constantes de color/fuente de `kit.tsx` y los textos).

## Regla de oro: leer el estilo primero

Antes de tocar un video, **leé `marcas/daniela-werkalec/estilo.md` completo.** Ahí está todo lo
decidido con Daniela. No reinventes criterios que ya están resueltos.

## Pipeline (resumen; detalle en `editor-video-ia/SKILL.md`)

`setup.sh` (deps, 1 vez) → `prep.py` (transcribir) → `reel_prep.py` (cortar vertical) →
editar `remotion/src/video.tsx` con el estilo → `stills.sh` (revisar fotogramas) →
`render.sh` (MP4 final con música automática) → portada (`Cover.tsx`).

**No inventes transcripción ni cortes.** Transcribí de verdad y proponé cortes leyendo el texto real.

## Cosas del entorno cloud (sesión web) que SIEMPRE aplican

- **Render Remotion** necesita Chromium ya instalado y saltear el cert del proxy:
  ```bash
  export REMOTION_BROWSER_EXECUTABLE=$(find /opt/pw-browsers -name headless_shell | head -1)
  export REMOTION_IGNORE_CERT=1
  ```
- **`render.sh` necesita ruta de salida ABSOLUTA** (hace `cd` interno). Ej:
  `bash editor-video-ia/scripts/render.sh edicion-xxx "$PWD/edicion-xxx/Reel.mp4"`
- **PyAV**: si `prep.py` falla por `metadata_errors`, fijar `pip install av==13.1.0` en el venv del kit.
- **OpenCV sin CascadeClassifier**: pasar `--cam 1080:1920:0:0 --wide none` a `reel_prep.py`.
- **HuggingFace / fuentes**: si da 403, es la política de red del entorno (no un bug). Se arregla en
  la config del entorno con sesión nueva; dominios: `*.hf.co`, `huggingface.co`, `fonts.g*`.

## Música (automática)

`render.sh` ya mete la pista de marca **Forward Momentum** (`editor-video-ia/assets/music/forward-momentum.mp3`)
en TODOS los renders, con ducking bajo la voz, arrancando en el **2.º 10** (donde entra el beat).
No hay que pasar nada. Para otra pista: 3er arg = ruta; `"none"` la saca. 5.º arg = segundo de inicio.

## Marca de agua y placa final

- Reels con avatar IA: marca de agua **"✦ generado con IA"** persistente.
- Placa final = motion graphics con **foto enmarcada + anillo del color del ángulo + waveform + nombre**.
  Fondo = recorte de **oficina SIN la figura de Daniela** (nunca negro, nunca su cuerpo blureado).

## Cómo hablarle a Daniela

En español rioplatense, directo, con criterio estratégico (es experta en marketing/IA/inmobiliaria).
Nada de relleno ni adulación. Para contenido PÚBLICO, adaptar el tono a la marca/canal (ver sus
preferencias), no el tono privado. Guía para humanos: `GUIA-NUEVO-VIDEO.md`.
