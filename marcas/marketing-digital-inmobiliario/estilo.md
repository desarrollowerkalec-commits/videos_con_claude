# Estilo de marca — Marketing Digital Inmobiliario (MDI) · marketingdigitalinmobiliario.com.ar

> **Herencia:** esta marca usa TODO el sistema de `marcas/daniela-werkalec/estilo.md` (pipeline, motion
> graphics line-art, chips de pasos, remate en cascada SIN sombra negra, portada con líneas pegadas y sombra
> del titular sobre las vecinas, bajada en 1 línea en minúscula sin punto, foto con exposición bajada, placa
> final sobre fondo de oficina sin la figura, música automática). **Acá solo va lo que CAMBIA.** Si un dato
> no está en este archivo, se toma del de Daniela Werkalec.

Tono: didáctico, claro y movilizador (formación para el sector inmobiliario). No el tono privado de Daniela.

## Presentadora: CLARA (avatar IA)

- La cara de MDI es **Clara**, un **avatar IA** (rubia, blazer camel, camisa floreada, oficina luminosa).
  **No es Daniela.** Nunca rotular a Clara como "Daniela Werkalec".
- Por ser avatar: marca de agua **"✦ generado con IA"** persistente, siempre.
- Daniela aparece como **nombre/autoridad** (ej. "DANIELA te espera en su MASTERCLASS"), no como cara.

## Logo oficial (desde `logo_cuadrado.pdf`)

Mismo isotipo **W con ondas** que Daniela Werkalec (sistema de marcas hermanas), en verde agua.
Archivos en `editor-video-ia/assets/logos/` (PNG transparentes):
- `mdi-logo.png` → W verde agua + "Marketing Digital / inmobiliario" en **negro** (solo fondos claros).
- `mdi-logo-oscuro.png` → W verde agua + texto **blanco** → **la que va en reels, placas y portadas**.
- `mdi-logo-blanco.png` → todo blanco (sobre fotos o fondos de color).
- `mdi-isotipo.png` → solo la W (sello chico, marca de agua de cuenta).

Ojo: en el PDF el texto viene como imagen de baja resolución (500 px): usar el logo completo a **≤ 600 px
de ancho**. Para más grande, usar el isotipo (nítido) + el texto escrito en fuente (sans semibold tipo Open Sans).

## Color

| Uso | Hex | Nota |
|---|---|---|
| **Acento principal (verde agua)** | **`#6AD5B7`** | palabras clave, script con glow, marcos de b-roll, CTA (dado por Daniela) |
| Verde del logo | `#6AD4BE` | prácticamente el mismo; usar `#6AD5B7` en gráficos |
| Glow del acento | `#6AD5B7` → halo más cian/claro | en video el neón se ve casi cian por el glow |
| Texto | `#FFFFFF` | base de subtítulos |
| Fondo de placas | `#0B0A10` (heredado) | placas oscuras con halo verde agua |

Un solo acento fijo (no se usan los 5 colores por ángulo de DW salvo que Daniela lo pida).

## Subtítulos (analizados del reel de referencia — frames en `referencia/`)

Dos fuentes que se combinan dentro de la misma frase:

1. **Base: Montserrat 800–900**, blanco, **sentence case**, letter-spacing apretado (≈ −2), 2 líneas
   máximo, sombra suave para legibilidad. Ej.: "¿Seguís escribiendo / tus descripciones".
2. **Palabra clave: script manuscrito en verde agua con GLOW neón** → **Vujahday Script** (fuente OFICIAL,
   la pasó Daniela; archivo local `editor-video-ia/assets/fonts/VujahdayScript-Regular.ttf`, licencia SIL OFL =
   uso comercial libre). Se carga con FontFace (ver `useLocalFonts` en `references/reels/mdi/kit.tsx`).
   Más grande que la base (~118 px vs 62 px), ligeramente inclinada. **Ya no usar Yellowtail.** Ej.: "*a mano?*", "*Facebook* y un mensaje de *WhatsApp*",
   "para *inversores.*", "dejás de *pelear*".

Variante **MAYÚSCULAS** (momentos de énfasis / CTA): todo en **Montserrat 900 caps**, la palabra clave
**más grande en verde agua con glow** y el resto blanco más chico, en 2 líneas.
Ej.: "**SUENA** HUMANO, / NO COMO UN ROBOT." · "SI QUERÉS **DEJAR**" · "**DANIELA** TE ESPERA / EN SU **MASTERCLASS**".

- Posición: tercio medio-bajo (≈ 45–60 % del alto), centrados. Sin caja de fondo.
- Frases cortas (2–5 palabras por línea), aparecen por frase; la palabra script entra con fade + glow.

## Motion graphics y b-roll — LENGUAJE PROPIO DE MDI (no heredar el de DW)

> ⚠️ Error ya cometido: aplicar los paneles oscuros line-art / chips / kicker de Daniela Werkalec. **En MDI NO.**
> Código de referencia que funciona: `editor-video-ia/references/reels/mdi/` (`kit.tsx` + `video.tsx`, reel "charla").

- **Subtítulos palabra por palabra**, **alineados a la IZQUIERDA** (x ≈ 66), y ≈ 1150 (sube a ≈ 900 cuando hay PiP,
  baja a ≈ 1630 durante los cortes a tarjeta). Script Vujahday verde agua con glow para la palabra clave; variante
  caps para énfasis/CTA. Remate: palabras grandes CENTRADAS (caps blancas + script gigante), sin sombra negra.
- **B-roll de corte:** entra a pantalla completa con **blur** → se achica a **tarjeta inclinada 3D** (≈ 800×1280) con
  **borde fino verde agua + glow**, sobre fondo **negro verdoso** (`#061416`, halo `#0E3A38`), girando lento (rotateY).
- **PiP:** tarjeta inclinada en la mitad de abajo (Clara arriba), fundida a negro hacia abajo.
- **Captura blanca** (tarjeta tipo screenshot) sobre el pecho de Clara (ej. la invitación a la charla).
- **Título grande caps blanco + eco script CONTORNEADO verde agua** arriba, sobre velo oscuro, letras con flicker/blur.
- **Transiciones por blur.**
- **Qué poner en las tarjetas:** fotos de b-roll que pase Daniela (lo ideal, como el demo) o, si no hay,
  **pantallas de interfaz realistas** (WhatsApp desbordado, agente IA conversando, CRM con el lead que pasa a
  "para atender", notificación en pantalla de bloqueo). Canva genera imágenes pero acá solo llega una miniatura
  de 150 px: no sirve para video.
- Subtítulos del reel = Montserrat + Vujahday Script; **portada = Lato**. No mezclar.

## Portada (DEFINIDA — ejemplos de Daniela en `referencia/portada_ej1.jpg`, `portada_ej2.jpg`)

**Distinta a la de DW** (no hereda la portada centrada con Anton/BREATHING). Plantilla lista:
`editor-video-ia/references/reels/mdi/CoverMDI.tsx` (props: título, kicker, flecha, bajada).

- **Tipografía: LATO** (Bold 700) en todo. Texto **blanco**, **alineado a la izquierda** (x ≈ 110).
- **Fondo:** foto de Clara (u otra imagen) arriba; **degradé** hacia abajo: foto → velo azul petróleo
  (`≈ #4E889D`) → **verde agua sólido `#69D5BE`** desde ~72 % del alto hasta abajo.
- **Titular:** Lato Bold ~190 px, line-height ~0.86, 2–4 líneas, mezcla de minúscula y MAYÚSCULA
  (ej. "¿ Cómo / usar / CLAUDE…", "USD 50.000.000 / perdidos por / ChatGPT"). **Sombra dura** desplazada
  abajo-derecha (gris, poco blur) → efecto 3D.
- **Flecha blanca de bloque** apuntando al titular o al sujeto (horizontal ← o diagonal ↘).
- **Kicker opcional** arriba del titular: Lato Bold caps ~82 px (ej. "CHARLA / ONLINE") con flecha diagonal.
- **Línea separadora** blanca fina (3 px) debajo del titular, de x≈105 a ≈795.
- **Bajada:** ícono **globo de diálogo con corazón** (outline blanco) + texto Lato Bold ~64 px, blanco,
  varias líneas cortas, alineado a la izquierda a la derecha del ícono (x ≈ 490).
- Sin URL ni ícono de ángulo (a diferencia de DW).

## Cuenta, placa final y música

- **Instagram:** `@mktdginmobiliario` (instagram.com/mktdginmobiliario) → marca de agua de cuenta y placa final.
- **Placa final:** **logo MDI** (`mdi-logo-oscuro.png`) + `@mktdginmobiliario`. **NO** poner "por Daniela
  Werkalec". El paraguas futuro es **Werkalec & Asociados** (grupo empresarial, nombre a definir): cuando
  esté, se evalúa sumarlo como firma chica. Hasta entonces, nada de firma personal.
- **Música: pista propia `editor-video-ia/assets/music/mdi-fondo.mp3`** (generada por Daniela en Google,
  "Trimmed Intro", 2:56, ~122 BPM). Entra **sola** si se renderiza con `MARCA=mdi`:
  `MARCA=mdi bash editor-video-ia/scripts/render.sh <carpeta> "$PWD/<carpeta>/Reel.mp4"`
  → arranca en el **2.º 17.5** (ahí entra el groove completo; 1–16 s es intro con bajo, 16–17.5 s un corte),
  volumen 0.23 con ducking (la pista es ~5 dB más fuerte que Forward Momentum). Hay un cambio de sección más
  intenso en el 2.º 64 de la pista (≈ 46 s de reel): en reels largos, revisar que no pise la voz.
  **Nunca** usar Forward Momentum en MDI (es la de Daniela Werkalec).

## ⚠️ Pendiente

| Dato | Estado |
|---|---|
| Nombre del paraguas (Werkalec & Asociados u otro) | a definir |
| Fuente base de subtítulos (hoy: Montserrat 800/900) | Daniela pasa la oficial |
| Logo MDI en vector (texto del PDF es de baja resolución) | opcional |
