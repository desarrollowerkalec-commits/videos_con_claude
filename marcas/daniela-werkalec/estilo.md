# Estilo de marca — Daniela Werkalec · danielawerkalec.com.ar

Spec para edición de reels (skill `editor-video-ia`). Capturado de los videos reales de Daniela
(VLOG viral de traducción + reels con subtítulos karaoke) y de sus decisiones de tipografía.

## Identidad / colores

- **Dorado de marca** `#F2B705`, bronce secundario `#C98A2E`.
- **Amarillo** de subtítulos y palabra de remate `#FFCC00`.
- **Texto** blanco puro `#FFFFFF`. Fondo oscuro de placas `#0B0A10`.
- Usuario / marca de agua: `@danielawerkalec`.
- Tono visual: cálido, natural, aspiracional. Nada chillón salvo el amarillo/dorado de énfasis.

## Tipografías

Archivos propios en `editor-video-ia/assets/fonts/`; el resto por Google Fonts.

| Uso | Fuente | Nota |
|---|---|---|
| **Subtítulos base** (running captions) | **Playfair Display** (serif) | el efecto karaoke que le gusta |
| **Palabra GRANDE amarilla** (remate) | **True Fate = Neato Serif** (local, `assets/fonts/NeatoSerif-Regular.ttf`) | con glow |
| Variación de remate — sans | **Red Hat Display** (400/700/900) | reemplaza a *Indivisible* |
| Variación de remate — serif | **PT Serif** + itálica | reemplaza a *SchoolBook* |
| Variación de remate — sans | Montserrat | |

Pendiente de archivos reales (cuando Daniela los suba, reemplazan a los similares): **Indivisible**,
**SchoolBook**, **Neato Serif Rough** (versión gastada para las palabras grandes amarillas).

## Subtítulos (running captions)

- Playfair, frases de **2–4 palabras**, hacia el **centro-bajo** del cuadro.
- **Palabra hablada**: amarillo `#FFCC00` + más grande + **cajita amarilla suave** + **contorno negro nítido** (tipo sticker). El resto de la frase, blanco.
- Sin caja de fondo general. Sentence case, nunca mayúscula sostenida.

## Remarcar / remate (hero)

Para destacar partes o textos (como el viral de traducción):

- Frase **compuesta por palabras de distinta fuente, peso y tamaño**.
- Palabra o número **grande en amarillo (True Fate) con GLOW**.
- El resto: combinación de Red Hat (bold/light), PT Serif itálica y Montserrat, **todas con glow**.
- Cada palabra **entra con una animación distinta** (fade · desde el costado · brillo) y se van
  acomodando hasta componer la frase. *(Set exacto de animaciones: pendiente — Daniela pasa un video de referencia.)*

## Otros elementos (pendientes de referencia)

- **Logos de apps** cuando se nombran (ChatGPT, Claude, WhatsApp, Gemini…): insignia tipo `ToolBadge`.
- **Texto detrás de la persona** (palabras entre el fondo y el sujeto): requiere segmentación del sujeto por frame.
- **Light leaks / destellos** en los cortes entre clips.

## Estructura y ritmo

- Talking head (cámara) + cutaways de b-roll / placas, alternados.
- Cambio visual cada **2–4 s**. Primeros 2 s en cámara completa (el gancho es la cara).
- Hero con glow a cuentagotas (1–2 por reel) en el remate/dato fuerte.

## B-roll — de dónde sale

1. Capturas/clips que aporta Daniela por video (lo más fiel, sin líos de licencia).
2. Placas de texto sobre fondo plano (cero dependencias) cuando no hay b-roll.
3. Stock gratis (Pexels / Pixabay) — requiere red abierta + API key de cada uno.

## Música

- Pista original **chill corporativa** libre de derechos: `editor-video-ia/assets/music/chill-corporativa.wav`.
- Se usa como cama a ~−14 LUFS (volumen 0.14 en `render.sh`, con ducking bajo la voz).

## CTA

- Comentar una palabra → se responde por DM. Configurar respuesta automática (ManyChat u otra) para esa palabra.
- Palabra + recurso se definen por video.

## Pipeline

`prep.py` (transcribir) → `reel_prep.py` (cortar vertical) → editar `video.tsx` → `stills.sh` (revisar) → `render.sh` (final).
