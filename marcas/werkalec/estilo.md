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
| ~~Rojo `#BB0925`~~ | — | **fuera de la paleta** (decisión de Daniela: el highlight es el naranja) |

**Regla clave: el dorado FIRMA, el naranja SEÑALA.** Son vecinos de temperatura: nunca los dos en la misma
palabra, frase destacada o bloque. El dorado tiene poco contraste: **no usarlo para subtítulos** ni texto largo.

## Tipografías

| Uso | Fuente | Nota |
|---|---|---|
| **Titulares, remates, portada, nombre de marca** | **Cormorant Garamond** (600/700, itálica para énfasis) | `@remotion/google-fonts/CormorantGaramond` |
| **Subtítulos y textos** | **Montserrat** (500/700/800) | `@remotion/google-fonts/Montserrat` |

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

## Motion graphics (propuesta inicial)

Estética de la gráfica de referencia (`referencia/grafica-whatsapp-caos.webp`): **cinematográfica, sobria,
fondo azul noche, foto desaturada + un único acento naranja luminoso** (el destello / asterisco con glow).
- Placas: fondo `#1E2532` con viñeta, titular Cormorant blanco + palabra naranja.
- Elemento firma: **destello naranja con glow** (como el de la gráfica) para marcar el punto clave.
- B-roll ideal de agencia: **demos reales** (WhatsApp desordenado → CRM ordenado, agente IA conversando,
  lead que cambia de etapa). Más producto, menos cabeza parlante: el ángulo opinión ya lo cubre DW.
- Flecha / botón naranja como CTA visual (pill naranja con flecha, como la gráfica).

## Portada (propuesta inicial)

Basada en la gráfica: "Werkalec" en Cormorant dorado arriba al centro (o logo oscuro), foto desaturada
con degradé a `#1E2532` abajo, titular blanco grande con **una** palabra en naranja, bajada corta en
Montserrat, pill naranja con flecha. Titular dentro de la zona segura.

## Cuenta, placa final y música

- **Placa final:** `werkalec-logo-oscuro.png` + cuenta de Instagram + `werkalec.com.ar`, anillo dorado,
  fondo azul noche o recorte de escenario **sin Nicolás**.
- **Música:** todavía sin pista propia. `MARCA=werkalec bash editor-video-ia/scripts/render.sh …` busca
  `editor-video-ia/assets/music/werkalec-fondo.mp3` y **frena con error** si no existe (para que nunca salga
  con Forward Momentum, que es de DW). Mientras tanto: pasar una ruta como 3.er argumento o `"none"`.

## ⚠️ Pendiente

| Dato | Estado |
|---|---|
| Usuario de Instagram (y demás redes) de Werkalec | a confirmar |
| Descripción visual de Nicolás + frames de referencia | a pasar |
| Pista de música propia (`werkalec-fondo.mp3`) | a definir |
| Validar subtítulos / motion / portada con el primer reel | pendiente |
