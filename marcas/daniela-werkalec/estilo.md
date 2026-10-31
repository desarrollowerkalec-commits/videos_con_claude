# Estilo de marca — Daniela Werkalec · danielawerkalec.com.ar

Spec para edición de reels (skill `editor-video-ia`). Capturado de los videos reales de Daniela
(VLOG viral de traducción + reels con subtítulos karaoke) y de sus decisiones de tipografía.

## Identidad / colores

- **Dorado de marca** `#F2B705`, bronce secundario `#C98A2E`.
- **Amarillo** de subtítulos y palabra de remate `#FFCC00`.
- **Texto** blanco puro `#FFFFFF`. Fondo oscuro de placas `#0B0A10`.
- Usuario / marca de agua: `@danielawerkalec`.
- Tono visual: cálido, natural, aspiracional. Nada chillón salvo el amarillo/dorado de énfasis.

## Logo oficial (desde el PDF `DW_final.pdf`)

Archivos en `editor-video-ia/assets/logos/` (PNG transparentes, alta resolución):
- `daniela-werkalec-logo.png` → logo completo a color (isotipo W con ondas + "Daniela Werkalec").
- `daniela-werkalec-logo-blanco.png` → mismo logo en **blanco** (para fondos oscuros: placa final, portadas).
- `daniela-werkalec-isotipo.png` → solo la **W con ondas** (marca de agua, sello chico, favicon de placa).

Colores del logo: **violeta `#73308B`** (isotipo) y **gris `#4C4C4E`** (nombre). Sobre fondos oscuros usar
siempre la versión **blanca** (el gris no se lee). El violeta del logo NO reemplaza al fucsia de ángulo
`#CB6CE6`: son cosas distintas.

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
- Palabra o número **grande en amarillo (True Fate) con GLOW**. **SIN sombra negra ni overlay oscuro detrás** de la frase en cascada: las palabras van directo sobre el video (solo su glow y una sombra de texto fina para legibilidad).
- El resto: combinación de Red Hat (bold/light), PT Serif itálica y Montserrat, en **blanco** con glow suave.
- Cada palabra **entra con su propia animación** (desde el costado · hacia arriba · fade · pop) y se van
  acomodando hasta formar la frase; al final **salen todas juntas**. (Implementado en `RemarkPhrase`.)

### Dinámica de referencia (viral "Google acaba de convertir cualquier auricular")

Analizada de los primeros ~2 s del video de Daniela:

- Las palabras **aparecen de a una, sincronizadas con la voz** (~cada 0.3 s).
- **Layout en cascada / apilado** (NO una sola línea): cada palabra en su posición, componiendo la frase en varias líneas/alturas.
- **Fuente y color distintos por palabra**:
  - Palabra clave 1 (p. ej. "Google") → **serif grande AMARILLA (True Fate)** con **flash de glow** al entrar.
  - Conector (p. ej. "acaba") → sans blanca bold, más chica.
  - "de convertir" → **serif itálica blanca**, mediana.
  - "cualquier" → sans blanca chica.
  - Palabra clave 2 (p. ej. "auricular") → **amarilla bold con glow**.
- **1–2 palabras amarillas con glow** (las clave); el resto blanco.
- Entrada: fade + leve escala; las amarillas con **flash de brillo**.
- Frase completa → sostiene → sale.

> Pendiente: actualizar `RemarkPhrase` de una línea centrada → **cascada apilada** con 2 palabras clave amarillas.

## Overlays de sombra

- ~~Central (chico): elipse oscura detrás de la palabra principal del remate~~ → **NO se usa en el remate en cascada** (decisión de Daniela). Las palabras animadas van sin overlay negro detrás.
- **Separador (horizontal):** en portadas ya no va como banda suelta: la sombra la da el propio titular Anton, que cae sobre las líneas vecinas (ver Portadas).
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

## Zona segura de Instagram (OBLIGATORIA)

- **Ningún texto, subtítulo ni panel con info debajo de y ≈ 1500** (los ~420 px de abajo los tapan el pie de
  foto, el usuario y la música) ni **a la derecha de x ≈ 940** (botones me gusta / comentar / compartir).
  Arriba, libre hasta y ≈ 250 salvo títulos centrados.
- Consecuencia: los paneles de motion graphics van **entre el pecho y y ≈ 1500** (ej. `DOCK` top 1080 / alto 420),
  no pegados abajo. El panel del reel "diversidad" (y 1318–1768) quedó fuera de zona: no repetir.
- Marca de agua "✦ generado con IA" y @usuario: arriba a la izquierda (y ≈ 262), no abajo.
- Chequeo antes de renderizar: stills con líneas guía en y=1500 y x=940.

## Estructura y ritmo

- Talking head (cámara) + cutaways de b-roll / placas, alternados.
- Cambio visual cada **2–4 s**. Primeros 2 s en cámara completa (el gancho es la cara).
- Hero con glow a cuentagotas (1–2 por reel) en el remate/dato fuerte.

## B-roll — de dónde sale

1. Capturas/clips que aporta Daniela por video (lo más fiel, sin líos de licencia).
2. Placas de texto sobre fondo plano (cero dependencias) cuando no hay b-roll.
3. Stock gratis (Pexels / Pixabay) — requiere red abierta + API key de cada uno.

## Música

- Pista oficial **"Forward Momentum"** (house luminoso, ~120 BPM, cálido), generada en **Google Labs / MusicFX** → libre de derechos para la marca: `editor-video-ia/assets/music/forward-momentum.mp3`.
- Entra **sola en todos los renders** (default en `render.sh`): cama a volumen 0.42 con **ducking** bajo la voz → mezcla final ~−14 LUFS, música ~10 dB bajo la voz.
- **Arranca en el 2.º 10** (ahí entra el beat; los primeros ~10 s son intro suave). Configurable: 5.º argumento de `render.sh` = segundo de inicio.
- Para otra pista en un render puntual: pasar la ruta como 3er argumento a `render.sh`; `"none"` la saca.
- Nota: la síntesis por código (osciladores) no da calidad profesional. Para nuevas camas, generar en MusicFX/Suno/Udio o usar catálogo (Epidemic, Artlist, Pixabay) y guardarlas acá.

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

Una portada por reel (1080×1920). Fondo: foto de Daniela **oscurecida** (frame con **boca cerrada**). Todo **centrado**, combinando **color del ángulo + blanco**. Specs:

| Elemento | Fuente | Tamaño | Posición / nota |
|---|---|---|---|
| 1 · "Hoy: <algo>" | **BREATHING** | ~104 px | "Hoy:" en color de ángulo, resto blanco |
| 2 · Titular | **ANTON** | **~158 px**, **UNA sola línea** (nowrap), **al límite del ancho** (borde a borde) | mezcla color de ángulo + blanco; **2 sombras centradas** (entre script↔Anton y Anton↔Montserrat) + drop-shadow arriba/abajo → efecto **3D** |
| 3b · Bajada corta | **Montserrat 800** | ~86 px, corta (ej. "la ventaja: el equipo") | reemplaza la bajada larga |
| 3 · Bajada | **Montserrat 800** | **52 px**, **UNA línea**, letter-spacing **−2**, minúscula y sin punto final | blanco + palabra clave en color de ángulo |
| 4 · Caja | **Arimo** | 34 px | recuadro fino (1.5 px) centrado |
| Ícono del ángulo | **PNG real** (`assets/iconos/`) | **163.8 × 134.1 px** | **posición fija: x 198.8, y 1289.8** (igual en todas) |
| URL | **Arimo 400** (fina, sin bold) | 32 px | centrada, y ≈ 1500 |

Bloque de texto: `top ≈ 720`, centrado. Fuentes ya instaladas: Anton, Montserrat, Arimo (Google) + **BREATHING** (`assets/fonts/Breathing.ttf`, *Personal Use Only* — para uso comercial conviene licencia).

**Interlineado: las líneas se TOCAN.** Script ↔ Anton ↔ bajada van pegadas (sin aire entre ellas; Anton con
margen negativo ~−20 px y line-height ~1). Por eso la **sombra del titular Anton** es fuerte arriba y abajo y
**cae sobre la línea de arriba y la de abajo**: eso da el efecto 3D. No separar las líneas con bandas sueltas.

**Línea 3 (bajada) = UNA sola línea**, Montserrat 800 **52 px fijo** (no se agranda para llenar el ancho:
la tipografía más grande es SIEMPRE Anton), letter-spacing −2, nowrap. **Todo en minúscula** (solo siglas como
IA en mayúscula; ni siquiera la primera palabra) y **sin punto final**. Una palabra en color de ángulo.
Ej.: "la IA **traduce** el idioma".

**Exposición de la foto (NUEVO):** bajarle la exposición a la FOTO misma (`brightness` entre ~0.65 y 0.78; en el reel del Congreso: `brightness(0.78) contrast(1.04)`), no solo
taparla con overlay. Así la banda oscura del medio puede ser más suave (~0.6–0.7 de opacidad) y **no se nota
como un bloque negro** en el centro.

**Fondo:** overlay base **suave** (la foto se ve) + **banda oscura gruesa detrás del texto** que sube arriba de "Hoy" y baja pasando el recuadro, fundida arriba y abajo (la foto se ve arriba y abajo). **Encuadrar la cara alta** (reframe/zoom del frame) para que ni la banda ni las palabras la tapen. **Ícono transparente** sobre la foto.

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

### Gráficos a pantalla completa (cada tanto, en todos los reels)

Aprobado por Daniela en el reel del Congreso. **Cada tanto un gráfico tapa la cámara a pantalla completa**
(la voz sigue). Le da ritmo y explica lo abstracto mejor que un b-roll de stock.

- **Frecuencia:** ~1 cada 15–25 s → 3–5 en un reel de 1–2 min; 1–2 en uno de <45 s.
- **Si el video ya trae transiciones propias** (p. ej. calabaza de Halloween): mapear los tiempos y dejar esas ventanas libres (sin subtítulos ni gráficos encima).
- **Subtítulos con planos distintos** (cuerpo entero vs sentada): la altura va por plano (parada ≈ 650, sentada ≈ 880), siempre a la altura del pecho, no fija en 1180.
- **Si el video ya trae motions propios:** mapear primero dónde están (hoja de fotogramas cada 2 s con tiempo) y
  poner los gráficos a pantalla completa SOLO en los huecos sin gráficos propios (no taparlos).
- **Dónde:** en frases conceptuales (algoritmos, preguntas, comparaciones, listas, "antes/después").
  NO en lo personal/emocional (ahí va la cara). Primeros 2 s siempre cara; un gancho visual corto (~2 s) justo después funciona.
- **Duración:** 2–6 s (hasta ~10 s si es una lista que se va armando).
- **Entrada:** círculo que se abre desde el centro + anillo del color del ángulo + whoosh. **Salida:** fade + leve escala.
- **Estética:** fondo oscuro + glow del ángulo + red de puntos (NeuralBg); line-art del color del ángulo con glow;
  kicker `● TEXTO` arriba; textos que entran **palabra por palabra sincronizados con la voz**; palabra clave en
  **True Fate amarilla con glow**; lo "viejo/descartado" se **tacha en rojo**.
- **Subtítulos ocultos** mientras dura el gráfico (el gráfico ya lleva el texto).
- **Tipos probados:** diagrama (nodo ALGORITMO → personas ✓/✗), dos celulares (uno ve / otro bloqueado),
  pregunta cinética con ícono line-art que se dibuja, checklist (tachado → ✓ ✓ ✓), burbujas de chat.
  Reel "90 minutos" (noticias): celular que **gira de vertical a horizontal** con contador 0:15 → 90:00,
  **embudo de 2 etapas** (cortos atraen / largos muestran), **plataforma A → B con pila de costos** que se apila,
  y una **encuesta parcial** (SÍ / NO) en la pregunta final para empujar comentarios.
- **Parcial (sin tapar la cara):** tarjeta abajo (y≈1275–1580), p. ej. una balanza que se equilibra.
- **Código:** `marcas/daniela-werkalec/remotion/src/mg.tsx` (FullScreen, Kicker, Headline, PropertyCard, Person,
  Line + los ejemplos). Uso completo en `marcas/daniela-werkalec/remotion/ejemplos/video-congreso.tsx`.

### Placa de cierre (motion graphics)

En vez de una placa plana negra, cerrar con **motion graphics** sobre la **oficina de fondo** (NO negro, NO la figura de Daniela):
- Fondo = **recorte de la pared/oficina SIN su cuerpo**, desenfocado suave y con velo oscuro. En este caso: la **pared de ladrillo con el cartel WERKALEC** (zona bien iluminada, de marca). Clave: tomar una región donde NO esté su cuerpo (si se blurea el frame entero, su camisa/figura se ve como un borrón) — el `<Img>` va dentro de un `AbsoluteFill` para que no lo tape el fondo base.
- **Foto de Daniela** enmarcada (rounded) con **anillo del color del ángulo que se dibuja + glow**.
- **Waveform** line-art (barras del color del ángulo, animadas) debajo.
- **Nombre** en True Fate + credencial en DOS líneas:
  1. **"Corredora Inmobiliaria"** — Montserrat 800, color del ángulo.
  2. **"Marketing digital e inteligencia artificial"** — blanco, sin "Experta" (decidido el 28/10: Daniela pidió
     la recomendación y la aceptó; reemplaza a "+ Experta en Tecnología e IA para negocios").
  Debajo, `www.danielawerkalec.com.ar`. Nada del evento en la placa final. No inventar otros taglines.
- Marca de agua **"✦ generado con IA"** (persistente en los reels con avatar IA), **arriba a la izquierda** (top 262, left 56) para que la interfaz de Instagram no la tape.

## Pipeline

`prep.py` (transcribir) → `reel_prep.py` (cortar vertical) → **copiar el paquete de marca** (`marcas/daniela-werkalec/remotion/src/*` a `reels/<nombre>/remotion/src/`, sin pisar `words.ts`; fuentes de `editor-video-ia/assets/fonts/` a `public/fonts/`) → editar `video.tsx` (base: `ejemplos/`) → `stills.sh` (revisar) → `render.sh` (final) → portada (`Cover.tsx`).

Si el video ya viene montado con música propia (p. ej. avatar IA editado): `reel_prep.py --segments "0-<dur>" --gap 999 --cam 1080:1920:0:0 --wide none` (sin jump cuts) y `render.sh … none` (sin sumar Forward Momentum).
