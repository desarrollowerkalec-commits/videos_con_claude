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

- Playfair, frases de **2–4 palabras**, **al nivel del pecho** (abajo de la boca) — no pegados abajo ni arriba como título.
- Corren **desde el inicio** del reel (nada de título suelto en Montserrat arriba de todo).
- **Palabra hablada**: amarillo `#FFCC00` + más grande + **cajita amarilla suave** + **contorno negro nítido** (tipo sticker). El resto de la frase, blanco.
- Sin caja de fondo general. Sentence case, nunca mayúscula sostenida.

## Remarcar / remate (hero)

Para destacar partes o textos (como el viral de traducción):

- Frase **compuesta por palabras de distinta fuente, peso y tamaño**.
- Palabra o número **grande en amarillo (True Fate) con GLOW** y **sombra detrás** (overlay central) para que quede "por encima".
- El resto: combinación de Red Hat (bold/light), PT Serif itálica y Montserrat, en **blanco** con glow suave.
- Cada palabra **entra con su propia animación** (desde el costado · hacia arriba · fade · pop) y se van
  acomodando hasta formar la frase; al final **salen todas juntas**. (Implementado en `RemarkPhrase`.)

## Overlays de sombra

- **Central (chico):** elipse oscura difuminada **detrás de la palabra principal** del remate, para destacarla.
- **Separador (horizontal):** band de sombra **debajo de la línea ANTON** en las portadas, separa línea 1 de la 2 y la 3 de la 4.
- Recreados como vectores (recolorables). Si se quieren los PNG exactos de Daniela, subirlos como archivo.

## Íconos por ángulo (SVG, color del ángulo)

| Ángulo | Ícono |
|---|---|
| Vlogs / personales (celeste) | corazón |
| Opiniones / reflexión (fucsia) | cara-voz (perfil + ondas) |
| Prompts / guías (amarillo) | globo de diálogo |
| Apps / herramientas (verde) | grilla (4 cuadrados) |
| Noticias / novedades (rojo) | estrella |

## Otros elementos (pendientes de referencia)

- **Logos de apps** cuando se nombran (ChatGPT, Claude, WhatsApp, Gemini…): insignia tipo `ToolBadge`.
- **Texto detrás de la persona** (palabras entre el fondo y el sujeto): requiere segmentación del sujeto por frame.
- **Efectos / color grade por ángulo** (ver sección Efectos).

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

## Ángulos de contenido — color por ángulo

Base: **letras blancas sobre fondo negro**, con UN color de acento según el tipo de contenido.

| Color | Hex | Ángulo |
|---|---|---|
| Celeste | `#38B6FF` | Vlogs / contenidos personales |
| Fucsia | `#CB6CE6` | Opiniones, comentarios, informes |
| Amarillo | `#F4C910` | Prompts, guías paso a paso |
| Verde | `#2DAF8C` | Apps, herramientas, páginas, recomendaciones |
| Rojo | `#FF3131` | Noticias, novedades, cosas nuevas que llaman la atención |

**Color en el reel:** color PRINCIPAL = amarillo `#FFCC00` (palabra hablada + palabra grande del remate).
**2do color = el color del ángulo** (fucsia, celeste, verde, etc.): CTA, badges y acentos. Así el reel combina con su portada.

## Portadas (covers)

Una portada por reel. Combina **color del ángulo + blanco** sobre foto de Daniela oscurecida. Orden:

1. **Línea 1 — script** (BREATHING): `Hoy: <algo>` — "Hoy:" en color de ángulo, resto blanco. *(stand-in hasta subir BREATHING: Satisfy.)*
2. **Línea 2 — ANTON** (titular grande), mezcla color de ángulo + blanco por palabra. Detrás va la **sombra separadora** horizontal.
3. **Línea 3 — Montserrat** (bold), blanco + palabra clave en color de ángulo.
4. **Línea 4 — caja fina** (Arimo, Arial-like) con recuadro finito.
- **Ícono** del ángulo (color de ángulo) **a la izquierda**.
- **www.danielawerkalec.com.ar** centrado abajo.
- Elegir un frame con **boca cerrada** (no mid-palabra).

Fuentes: **Anton** + **Montserrat** + **Arimo** (ya disponibles) + **BREATHING** (custom, subir .ttf; por ahora Satisfy).

## Efectos y motion graphics (ref: reel VoiceStudio)

Estética tech/explainer con **un color base por ángulo** (el mismo color del ángulo del contenido):

- **Gráficos de línea** (line-art) animados en el color del ángulo, con glow: wireframes de UI, waveforms,
  íconos, medidores, tarjetas de contorno fino. Fondo negro.
- **Chips de pasos** arriba (`01 Paso · 02 Paso · 03 Paso`), **kicker** chico (`● QUÉ HACE`), **cursor** `|`
  parpadeante en los titulares.
- **Color grade / tinte** del clip hacia el color del ángulo (da el "color base").
- **Reencuadre dinámico** del talking head (punch-in, paneo, corte abierto↔cerrado) para simular cambios de ángulo.

Límites honestos (no es magia de post):
- Ángulos de cámara **físicos nuevos** → requieren multicámara al grabar (o herramienta de IA de video aparte).
- **Re-iluminación** → no se puede relight un clip plano; se gana al grabar (luz principal + contra + separación de fondo) y se grada en post.

Recomendación de captura para Daniela: grabar con buena luz y **2 tomas** (una abierta, una cerrada) para
que el reencuadre y los "cambios de ángulo" se sientan reales.

## Pipeline

`prep.py` (transcribir) → `reel_prep.py` (cortar vertical) → editar `video.tsx` → `stills.sh` (revisar) → `render.sh` (final) → portada (cover).
