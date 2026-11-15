# Estilo de marca — Werkalec · werkalec.com.ar

> **Herencia:** esta marca usa el **pipeline** y las reglas técnicas de `marcas/daniela-werkalec/estilo.md`
> (transcripción real, cortes, zona segura, stills antes de renderizar, placa final sobre fondo sin figura,
> ducking de música). **Acá va lo que CAMBIA**, que es casi toda la identidad visual. Si un dato técnico no
> está en este archivo, se toma del de Daniela Werkalec. **Nunca** se toman de DW los colores, las fuentes,
> el amarillo del karaoke ni Forward Momentum.

**Qué es:** la agencia de marketing digital, CRM, automatización y agentes de IA (Rosario). Se firma
**"Werkalec"** a secas. "Werkalec y Asociados" es la razón completa y también el grupo de unidades de
negocio: no va en reels ni placas salvo pedido explícito.

**Tono:** directo, moderno, estratégico, provocador. Rioplatense ("vos", "tenés"), **nunca** español neutro
("Descubre…", "hoy mismo"). Habla de procesos y resultados comerciales, no de "magia de la IA".

## Presentador: NICOLÁS (avatar IA)

- La cara de Werkalec en **todas** las redes es **Nicolás**, un **avatar IA**. **No es una persona real** ni
  es Daniela: nunca rotularlo como "Daniela Werkalec" ni presentarlo como empleado humano.
- Por ser avatar: marca de agua **"✦ generado con IA"** persistente, siempre (arriba a la izquierda, x 66 / y 262).
- Daniela puede aparecer como **nombre/autoridad** ("el equipo de Daniela Werkalec"), no como cara.
- ⚠️ Pendiente: descripción visual fija de Nicolás (pelo, ropa, escenario) para continuidad entre escenas.

## Logo oficial (desde `referencia/logo-oficial-horizontal.png` y `logo-oficial-vertical.png`, PNG transparentes 2000 px que pasó Daniela)

Isotipo **W con ondas** en **dorado `#C6A37B`** (mismo sistema de marcas hermanas que DW y MDI) +
"Werkalec" en sans condensada bold **gris `#4C4C4E`** + "y Asociados" en dorado.
Archivos en `editor-video-ia/assets/logos/` (PNG transparentes, derivados del oficial sin redibujar):

| Archivo | Qué es | Dónde va |
|---|---|---|
| `werkalec-logo-oscuro.png` | horizontal oficial SIN "y Asociados": W dorada + "Werkalec" **blanco** | **reels, placas, portadas** (fondos oscuros / video) |
| `werkalec-logo.png` | horizontal: W dorada + "Werkalec" gris | solo fondos claros |
| `werkalec-logo-blanco.png` | horizontal todo blanco | sobre fotos o fondos de color |
| `werkalec-logo-horizontal-completo(-oscuro/-blanco).png` | horizontal oficial **con "y Asociados"** (light, dorado) | solo si Daniela pide el nombre completo |
| `werkalec-logo-vertical(-oscuro/-blanco).png` | vertical completo **con "y Asociados"** | solo si Daniela pide el nombre completo |
| `werkalec-isotipo.png` / `-blanco.png` | solo la W | sello chico, marca de agua de cuenta |

- La versión horizontal **no lleva "y Asociados"**: en redes se firma "Werkalec".
- **Nunca** el gris `#4C4C4E` sobre fondo oscuro (no se lee): usar la versión `-oscuro`.
- La tipografía del logo (sans condensada) es **solo del logo**: no usarla en subtítulos ni titulares.

## Color

| Rol | Hex | Uso |
|---|---|---|
| **Identidad (dorado)** | **`#C6A37B`** | logo, isotipo, filetes, anillo de la placa final, nombre de marca |
| **Highlight / acción (naranja)** | **`#FEB050`** | palabra clave del karaoke, botones, flechas, glow, CTA (medido de la gráfica de referencia) |
| Glow del naranja | `#FDB680` | halo del destello / de la palabra clave |
| **Fondo** | **`#1E2532`** azul noche | placas, portadas, fondos de motion. **No es negro** |
| Texto | `#FFFFFF` sobre video/oscuro · `#000000` sobre claro | base de subtítulos y titulares |
| Secundario | `#848484` | cargos, URL, textos chicos. Nunca algo que deba leerse en 2 s |
| **Rojo dato** | **`#BB0925`** (+ glow) | **solo** números/datos de impacto o dolor en placa negra ("ENTRE 5 Y 7 OPERACIONES"). Máx. 1–2 veces por reel |

**Regla clave: el dorado FIRMA, el naranja SEÑALA, el rojo GOLPEA (dato).** Son vecinos de temperatura: nunca los dos en la misma
palabra, frase destacada o bloque. El dorado tiene poco contraste: **no usarlo para subtítulos** ni texto largo.

## Tipografías

| Uso | Fuente | Nota |
|---|---|---|
| **Titulares, remates, portada, nombre de marca** | **Cormorant Garamond** (600/700, itálica para énfasis) | `@remotion/google-fonts/CormorantGaramond` |
| **Subtítulos y textos** | **Montserrat** (500/700/800) | `@remotion/google-fonts/Montserrat` |
| **Caps condensadas** (datos, golpes, "CONTACTA") | **IBM Plex Sans Condensed Bold** | **es la fuente del logo** (verificado): no suma una familia nueva. `@remotion/google-fonts/IBMPlexSansCondensed` |

Las dos vienen de Google Fonts (ya incluidas en el paquete del engine; no hay que instalar nada).
Ojo: la gráfica de referencia usa Playfair / Raleway / Poppins. **Ese sistema queda descartado**: el oficial
es Cormorant Garamond + Montserrat. No mezclar.

## Subtítulos (propuesta inicial, a validar con el primer reel)

- **Montserrat Bold** blanca, sentence case, frases de 2–4 palabras, sombra difusa oscura
  (`0 6px 18px rgba(0,0,0,.55)`). Sin caja de fondo.
- **Palabra clave:** **Cormorant Garamond itálica** en **naranja `#FEB050`** con glow suave, más grande
  (≈ 1.3×). Es el contraste serif/sans de la gráfica ("¿Tu *WhatsApp* es un caos total?").
- Posición: tercio medio (y ≈ 1150), centrados. Zona segura de Instagram obligatoria (heredada: nada debajo
  de y ≈ 1500 ni a la derecha de x ≈ 940).

## Lenguaje de video (DEFINIDO — ref. de Daniela en `referencia/video-ref/`, reel de 61 s)

Edición **densa**: un evento visual cada **1–2 s**. Ideal para avatar IA (Nicolás casi no se mueve: la edición
pone el movimiento). Recursos, traducidos a Werkalec:

1. **Hook apilado arriba** (primeros 3–4 s): frase en cascada mezclando **Plex Condensed caps** (blanco) +
   **Cormorant itálica** (naranja) + caps chicas naranja. Ej. "LAS INMOBILIARIAS / *que más venden* / NO ATIENDEN / A UN SOLO CLIENTE".
2. **Subtítulos de 1–2 palabras** al centro (pecho), **Montserrat Bold blanca**, tamaño **variable**: palabra
   clave más grande; a veces **naranja con glow**. Sin caja.
3. **Pop-in de íconos/logos de herramientas** (ManyChat, WhatsApp, CRM) junto a la mano de Nicolás, con leve 3D y rebote.
4. **Placa roja de dato:** fondo negro, **punch-in** sobre la cara (zoom, desaturado), número en **Plex Condensed
   caps rojo `#BB0925` con glow**, segunda línea en contorno rojo. Ej. "ENTRE 5 Y 7 / OPERACIONES".
5. **Pantalla blanca con capturas** (posts de Instagram, chats) que entran escalonadas + texto chico negro
   ("como este, este o este"). Pruebas reales, no ilustración.
6. **B-roll cinematográfico** (macro, bokeh, manos, personas trabajando) con **texto serif itálico grande**
   (**Cormorant itálica**, blanco/dorado) en cascada palabra a palabra. Ej. "*para que no / se pierdan / conversiones,*".
7. **Collage giratorio de casos de éxito** (tarjetas en 3D girando, motion blur) → prueba social.
8. **Pantalla destacada:** fondo desaturado, la pantalla (laptop/celular) a color con **marco de selección de
   esquinas** (tipo bounding box, handles naranja); palabras sueltas alrededor + golpe en caps naranja ("CONTACTA",
   "PRE / FILTRA" combinando Cormorant + caps contorneadas).
9. **Números cinéticos** con líneas finas ("en los últimos / **6** / a cerrar").
10. **Cierre** en plano de Nicolás con CTA en subtítulos ("Comentá X") → placa final.

**Qué NO copiar de la ref.:** usa ~6 tipografías y 4 acentos (amarillo, rojo, verde, azul) → en Werkalec
**3 familias** (Cormorant, Montserrat, Plex Condensed) y **3 acentos con rol fijo** (dorado firma, naranja
señala, rojo dato). Nada de verde ni azul.

**B-roll — de dónde sale:** (a) motion graphics hechos en Remotion (capturas, UI, números, íconos, marcos):
**siempre posibles**; (b) capturas/fotos reales que pase Daniela (casos, chats, CRM); (c) b-roll
cinematográfico generado con IA (Higgsfield) o de stock — revisar cada clip, sin caras deformes ni texto falso.
Grade general: cálido/oscuro, viñeta, fondos bajos.

## Portada (DEFINIDA por Daniela — ref. `referencia/portada-ejemplo-recorte.webp`)

- **Fondo:** foto de Nicolás (plano medio-corto, mirando a cámara) con **degradé marrón oscuro** que esfuma
  la mitad de abajo: transparente arriba → `#3A210E` ≈ 55 % → `#301805` sólido abajo. **Marrón, no el azul
  noche** (el azul queda para placas/motion).
- **Pregunta**, en dos registros dentro de la misma frase, alineada a la izquierda (x ≈ 30 % del ancho):
  - Arranque en **Cormorant Garamond** (regular/medium), **blanco**, grande (ej. "Tenés").
  - Resto en **Montserrat Bold/ExtraBold**, **naranja `#FEB050`** (en la ref. mide `#FDBB5B`), renglones pegados.
- **Signos de pregunta:** el **"¿" de apertura GIGANTE** (≈ 2.5–3× el titular) en **Cormorant blanco**, a la
  izquierda, ocupando la altura de todo el bloque. El **"?" de cierre** grande en **Montserrat Bold naranja**,
  pegado a la última palabra. Siempre los dos.
- **Palabra fantasma opcional** detrás del bloque (ej. "preguntas") en script, marrón apenas más claro que el
  fondo (`≈ #4A2E1A`), muy baja opacidad. Textura, no texto a leer.
- **Logo abajo al centro:** **`werkalec-logo-horizontal-completo-oscuro.png`** (W dorada + "Werkalec" blanco +
  "y Asociados" dorado; ref. `referencia/portada-ejemplo-logo.png`). Ancho ≈ 50–55 % de la portada.
  **Única excepción** a "se firma Werkalec a secas": en portada va el horizontal completo.
- ⚠️ **Recorte de la grilla de Instagram (3:4 → 1080×1440 centrado):** la grilla corta ≈ 240 px arriba y abajo.
  El logo y el titular tienen que quedar **entre y ≈ 260 y y ≈ 1660** del 1080×1920, o desaparecen en el perfil.
- Reglas de Daniela en la grilla: el titular se lee en < 2 s → **máximo ~6 palabras**.
- ⚠️ **Nunca cortar palabras con guion** ("seguimien-to" en la ref.): ajustar tamaño o renglones. Se lee como error,
  no como recurso.

## Cuenta, placa final y música

- **Instagram:** `@werkalec` (instagram.com/werkalec) → marca de agua de cuenta y placa final.
- **Placa final:** `werkalec-logo-oscuro.png` + `@werkalec` + `werkalec.com.ar`, anillo dorado,
  fondo azul noche o recorte de escenario **sin Nicolás**.
- **Música:** todavía sin pista propia. `MARCA=werkalec bash editor-video-ia/scripts/render.sh …` busca
  `editor-video-ia/assets/music/werkalec-fondo.mp3` y **frena con error** si no existe (para que nunca salga
  con Forward Momentum, que es de DW). Mientras tanto: pasar una ruta como 3.er argumento o `"none"`.

## Código de referencia

`editor-video-ia/references/reels/werkalec-crm-arm/` → reel CRM→ARM (v2, el que sí tiene el lenguaje de la ref.):
- `cut2.py`: une los clips de Nicolás y saca silencios (silencedetect; umbral −28 dB si hay ruido de fondo).
- `matte.py`: **recorta a Nicolás del fondo** con MODNet (HF `Xenova/modnet`, Apache-2.0, apto comercial) →
  WebM VP9 con alfa para poner **texto DETRÁS de él**. ⚠️ No usar `briaai/RMBG` (licencia no comercial).
- `video.tsx`: zoom distinto en cada corte + golpes de zoom, glitch wireframe (ffmpeg `edgedetect`), light leaks,
  primer plano editorial con líneas, mosaico rojo + polaroid, íconos 3D (simple-icons), palabras dispersas con
  fondo desaturado + marco de esquinas, teléfono 3D, collage giratorio, bokeh + serif itálica, lente viñeta,
  "texto detrás" en negro (rojo para dolor, naranja para la solución), subs 1–2 palabras que entran desenfocados.
- ⚠️ Error ya cometido (v1): tarjetas planas sobre fondo azul = lenguaje de MDI. **En Werkalec no.** El movimiento lo
  ponen la cámara, las transiciones y el texto en el espacio, no las tarjetas.

**Nicolás (visto en los clips):** avatar IA, morocho, barba corta, anteojos, saco azul oscuro + remera negra,
oficinas luminosas con ventanales; planos generales caminando. Ojo: el hombre de la portada de referencia es otro.

## ⚠️ Pendiente

| Dato | Estado |
|---|---|
| Descripción visual de Nicolás + frames de referencia | a pasar |
| Pista de música propia (`werkalec-fondo.mp3`) | a crear |
| Estilo de video de referencia (lo pasa Daniela) | a recibir |
| Validar subtítulos / motion / portada con el primer reel | pendiente |
