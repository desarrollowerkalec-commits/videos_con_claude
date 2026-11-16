# Estilo de marca — CROCHETES by María · crochetes.com.ar

> **Marca independiente.** NO hereda la estética de `marcas/daniela-werkalec/estilo.md`: allá las placas son
> oscuras, el acento es dorado y los subtítulos se ven muy cargados. Acá es **Crochet Editorial**: claro, cálido,
> textil. De Daniela Werkalec se reutiliza **solo el pipeline técnico** (prep → reel_prep → Remotion → stills →
> render) y la zona segura de Instagram.
>
> Fuentes de verdad: `manual-de-marca.md` (estrategia completa) e `identidad.json` (tokens). Este archivo es la
> **traducción operativa para editar reels**. Si contradice al manual, gana la decisión más reciente de la dueña.

Tono de las piezas: cálido, didáctico, cercano, adulto. Nunca infantil ni "kawaii". No usar el tono privado de Daniela.

## Estado de las decisiones

| Tema | Estado |
|---|---|
| Dirección "Crochet Editorial" | ✅ aprobada |
| Paleta (6 tokens) | 🟡 de trabajo — usar, pero puede ajustarse |
| Montserrat para karaoke | ✅ pedida explícitamente |
| Fuente manuscrita / script | 🔴 NO elegida — ver propuesta abajo, requiere prueba |
| Logo | 🔴 falta archivo en alta (ver "Logo") |
| Música / identidad sonora | 🔴 provisoria, no aprobada |
| Reels previos (3 versiones) | ❌ rechazados — no tomarlos como estándar |

## María (avatar IA)

- Presentadora **virtual ficticia**. Referencia obligatoria: `referencia/maria_character_sheet.webp`
  (cabello castaño con luces cálidas a los hombros, en capas; ojos castaños; maquillaje discreto;
  sweater cruzado rosa viejo + pantalón sastrero crema). La imagen manda sobre cualquier descripción.
- Marca de agua **"✦ generado con IA"** persistente en todo reel donde aparezca María.
- Nunca atribuirle haber probado físicamente un producto ni testimonios.
- ⚠️ La web hoy muestra a "María" como **ilustración** en la sidebar ("Hola! Soy María"): convive mal con el
  avatar fotorrealista. Unificar (ver "Pendientes web").

## Logo

- Lo único disponible es el de la web: `referencia/logo_web_actual_182px.png` — **182×100 px, inusable en video**
  (se pixela arriba de ~180 px de ancho).
- Composición: "C" grande en cacao con textura de puntada + aguja de crochet **azul (#1B97C8 aprox.)** +
  "ROCHETES / by MARIA" en sans negro.
- 🔴 El azul de la aguja **no existe en la paleta** Crochet Editorial. Propuesta: versión de marca con la aguja en
  **salvia `#A4B6A0`** o **rosa viejo `#D9A5A0`** y el texto en **grafito**. Pedir el original (AI/SVG/PNG ≥ 2000 px).
- Hasta tenerlo: en reels usar el nombre escrito en fuente (Playfair Display "CROCHETES" + Montserrat 600 "by María")
  y NO estirar el PNG.

## Color

| Token | Hex | Uso en video |
|---|---|---|
| Marfil | `#F7F2EB` | texto grande "crema" (equivale al crema de JEFA en la referencia), notas de papel, fondos de placas |
| Rosa viejo | `#D9A5A0` | etiquetas/chips, palabra activa del karaoke, resaltador, estrellas |
| Salvia | `#A4B6A0` | segundo acento: flores, subrayados, resaltador alternativo |
| Cacao | `#73564A` | texto sobre etiquetas rosa/marfil, titulares editoriales, sombras 3D de palabras pop |
| Grafito | `#282623` | sombra de subtítulos y textos, tinta de la nota manuscrita |
| Blanco | `#FFFFFF` | subtítulo base, tiras blancas |

**Contrastes medidos (WCAG):**
- Rosa sobre marfil **1,92** ❌ y blanco sobre rosa **2,13** ❌ → nunca texto rosa sobre claro ni texto blanco sobre chip rosa.
- Chip rosa → texto **grafito (7,07)** ✅ o cacao (3,11, solo en titulares grandes/bold).
- Chip salvia → texto **grafito (7,03)** ✅.
- Cacao sobre marfil **5,97** ✅ · Grafito sobre marfil **13,55** ✅ · Blanco sobre cacao **6,65** ✅.
- Sobre video, rosa/salvia/blanco funcionan **solo con sombra grafito**.

Prohibido: fondos negros pesados, neón, amarillo saturado, gradientes fluorescentes, cajas negras de subtítulo.

## Tipografía

| Uso | Fuente | Peso |
|---|---|---|
| Subtítulos karaoke | **Montserrat** | 600 base / 700 palabra activa |
| Palabra gigante / titular comercial | **Montserrat** | 800–900, mayúsculas |
| Titular editorial / serif ("Para ser", "Del sistema" en la ref) | **Playfair Display** | 400 / 600 / Italic |
| Cuerpo, placas con texto largo | **DM Sans** | 400 / 500 |
| Script elegante (reveal "Un día dije", "Soy yo") | 🔴 a definir — propuesta: **Parisienne** o **Allura** (Google Fonts) | 400 |
| Manuscrita de nota de papel ("AHORA TRABAJO…") | 🔴 a definir — propuesta: **Caveat** 600 (ya está en la web → coherencia) | 600 |

Regla: máximo **3 familias por pantalla** y una idea dominante.

## Subtítulos karaoke (decisión definitiva)

- Montserrat 600, blanco `#FFFFFF` (o marfil), **sin caja, sin banda**.
- Sombra grafito real: `0 2px 6px rgba(40,38,35,0.55)` + `0 0 2px rgba(40,38,35,0.6)`. Nada de stroke grueso.
- Palabra activa: **solo la que suena**, en rosa viejo `#D9A5A0` + peso 700. Sin escala exagerada (máx. 1.04).
- Tamaño: ~54–60 px en 1080×1920; **máx. 2 líneas, ~4–6 palabras por línea**. "Demasiado gruesos" fue motivo de rechazo.
- Timing: **word-level real** de Whisper (`prep.py`) + revisión manual de cada corte. Nunca estimar por longitud.
- Zona: tercio inferior-medio (y ≈ 1180–1380), márgenes laterales ≥ 10 % (≥ 108 px). Fuera de los 320 px
  inferiores (UI de Instagram).
- Cuando entra una palabra cinética grande, **el subtítulo se oculta o se corre**: nunca comparten zona.

## Gramática de motion graphics (del reel de referencia, 19,8 s)

Reel analizado frame a frame (712×1266, 30 fps). Hojas de contacto en `referencia/motion-ref/`.
El video original **no** se guarda en el repo (es contenido de terceros): pedirlo de nuevo si hace falta.
Los timings son medidos a 10 fps (precisión ±1 frame a 30 fps); las curvas de easing son **reconstrucción visual**, no keyframes originales.

| # | t (s) | Recurso | Cómo se mueve | Traducción CROCHETES |
|---|---|---|---|---|
| 1 | 0,0–0,6 | **Script que se escribe** ("Un día dije") con destellos ✦ alrededor | revelado izq→der por máscara (~0,5 s), destellos aparecen escalonados con twinkle | script en marfil + ✦ rosa/blanco |
| 2 | 1,0–1,8 | **Texto seleccionado** estilo UI ("Voy a renunciar" con handles azules) | aparece tipeado letra a letra dentro de caja blanca | chip "selección" con handles **rosa viejo**, texto grafito |
| 3 | 2,4–2,6 | **Dos palabras sans bold que chocan** ("No / nací") | entran escalonadas desde posiciones distintas y se juntan en una línea (~0,2 s, overshoot) | Montserrat 800 blanco |
| 4 | 2,8–3,2 | **Transición por disolución de letras**: la frase anterior se desarma mientras entra la nueva con letras espaciadas que se cierran | tracking de ~0,5 em → 0 en ~0,3 s + fade cruzado | igual |
| 5 | 3,0–4,6 | **Jerarquía mixta 3 niveles**: serif chica arriba ("Para ser") + condensada GIGANTE ("ESCLAVA") + serif con ✦ a los costados ("Del sistema") | gigante con scale-pop 0,6→1,05→1; la línea de abajo entra con tracking abierto que se cierra | Playfair + Montserrat 900 marfil + Playfair italic |
| 6 | 4,5 | **Corte de plano en el golpe gráfico**: cambia la toma y el texto sigue un instante | corte seco | corte entre clips de María en el acento |
| 7 | 4,9–6,3 | **Explosión de stickers**: chip rosa "Voy a" + arcoíris + estrellas + flor + corazones; palabra grande ("EMPRENDER") se arma letra por letra | stickers con pop escalonado (~40 ms entre sí) + leve rotación; letras con stagger | chip rosa (texto grafito), stickers en rosa/salvia/marfil — **sin arcoíris saturado** (fuera de paleta): reemplazar por ovillo/flor de crochet |
| 8 | 6,4–8,6 | **Tiras blancas secuenciales**: cada línea es una tira blanca con texto serif negro que se tipea; las tiras se apilan | tira aparece con la línea, texto palabra por palabra sincronizado a la voz | tiras blancas, Playfair grafito (son el subtítulo de ese tramo: no duplicar karaoke) |
| 9 | 8,8–9,5 | **Palabra que entra girando y explota** ("ESCLAV4"): gira ~90° con un círculo-trazo alrededor, se asienta y salen rayitos/chispas | rotación −90°→0 + scale 0,4→1,1→1 (~0,3 s) + burst de rayos | Montserrat 900 marfil con sombra 3D **cacao/rosa** (offset 6–8 px), rayos salvia |
| 10 | 9,9–11,3 | **Nota de papel inclinada** (hoja rayada con margen rojo, rot. ≈ −8°) con texto manuscrito que se escribe y **resaltador** que se pinta debajo | nota entra con pop; texto palabra por palabra; resaltador barre izq→der | hoja marfil con rayado salvia y margen rosa, tinta grafito, resaltador rosa 55 % |
| 11 | 11,4–13,8 | Tiras blancas otra vez ("No tengo horario / No tengo prestaciones") | igual que #8 | igual |
| 12 | 14,0–16,6 | **Lettering sticker con flecha dibujada** ("Y mi" + flechita trazada) → palabra gigante crema ("JEFA") que se arma → chip de etiqueta ("ME DEBE DINERO") que se tipea | flecha por stroke-dashoffset; letras con stagger desde abajo; chip con tipeo | chip "Y mi" rosa con flecha salvia; gigante marfil; etiqueta salvia con texto grafito |
| 13 | 16,6–17,0 | **Swap de palabra en la misma posición**: se mantiene la jerarquía y cambia el contenido ("Y mi JEFA" → "PERO LA JEFA") + estrellas que rotan | chips rosa por palabra, estrellas con rotación continua | igual, estrellas rosa viejo |
| 14 | 16,8–17,3 | **Transición nubes/flash**: flash blanco de 2–3 frames + corte a otra locación; nubes dibujadas a mano envuelven la palabra | flash + corte + nubes con trazo | flash marfil (no blanco puro) + nubes/flores de línea |
| 15 | 17,3–19,8 | **Script fino que se escribe** bajo la palabra gigante ("Soy yo") + mini-chip final ("Chao") | reveal de trazo + pop del chip | script marfil + chip rosa |

### Reglas que se desprenden (lo que hace que funcione)
1. **Nunca dos recursos iguales seguidos.** La ref alterna: script → UI → sans → jerarquía → stickers → tiras → pop → nota → tiras → flecha+gigante → swap → transición → script.
2. **Cambio gráfico cada ~1–1,5 s**, aunque la frase siga.
3. La palabra emocional del guion siempre es **la más grande** de la pantalla (ESCLAVA, EMPRENDER, JEFA).
4. Cortes de plano **sobre** un acento gráfico, no en el medio de una palabra.
5. El texto vive en el **tercio superior** (la cara queda libre); la ref lo pone sobre la frente/cabeza — en CROCHETES
   bajarlo apenas para no tapar la cara de María (y ≈ 300–760).
6. Sombra 3D (offset sólido) solo en 1–2 palabras pop por reel; el resto con sombra suave.

### Lo que NO copiar
- Arcoíris y amarillos saturados, rosa chicle (#FF6FA5-ish), azul de la UI de iOS: fuera de paleta.
- El audio de la referencia (tercero).
- Ningún texto de la ref: solo la gramática.

## Sonido

- Voz siempre prioritaria; música con ducking.
- Música: cálida, instrumental, ~100 BPM, pluck/marimba suave — **borrador, no aprobada**. Hasta aprobarla,
  renderizar con `none` o con pista provisoria marcada como tal (`render.sh … none`).
- SFX por recurso: pop (#3, #5, #7, #9), swish (#4, #14), papel (#10), tick de trazo (#1, #12, #15), sparkle (estrellas).
  Volumen −18 a −24 dB bajo voz. Solo SFX propios o con licencia clara.

## Formatos

Reel 1080×1920 · Carrusel 1080×1350 · Pin 1000×1500 · Shorts 9:16. Escenas de María de ≤ 10 s.

## Pendientes web detectados (16/11/2026)

1. Tagline con error: **"En espacio para los amantes del tejido a crochet"** → "Un espacio…".
2. La web usa **azul `#1B97C8` + navy `#001E42`** y **Work Sans + Caveat**: nada que ver con Crochet Editorial
   (marfil/rosa/salvia/cacao, Playfair/DM Sans). Hoy redes y web contarían dos marcas distintas.
3. Mezcla tú/vos: títulos con "Descubre", "Monetiza" y notas nuevas con "necesitás". Definir voseo y unificar.
4. Sidebar con placeholder **"YOUR AD HERE"**, calendario y nube de tags: ruido que resta autoridad editorial.
5. Columna central de la home con mucho espacio vacío debajo del slider (revisar en mobile).
6. Tema Melania con **Elementor + WPBakery** a la vez: dos page builders = peso y conflictos.
7. María ilustrada en la sidebar vs. María fotorrealista en video (ver arriba).
8. Logo en 182 px y con aguja azul (ver "Logo").
