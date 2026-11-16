# Estilo de marca — CROCHETES by María · crochetes.com.ar

> **Regla madre (decisión de Daniela, 16/11/2026): la marca se adapta a la WEB, no al revés.**
> La paleta y las tipografías salen del sitio actual (tema Melania) y del logo. La web no se toca.
> Esto **reemplaza** la paleta "marfil / rosa viejo / salvia / cacao" y el par Playfair + DM Sans + Montserrat
> que figuran en `manual-de-marca.md` §2–3 e `identidad.json` (quedan como historial).
>
> **Marca independiente:** no hereda la estética oscura/dorada de `marcas/daniela-werkalec/estilo.md`.
> De ahí se reutiliza solo el pipeline técnico (prep → reel_prep → Remotion → stills → render) y la zona segura.

Tono de las piezas: cálido, didáctico, cercano, adulto. Nunca infantil. No usar el tono privado de Daniela.

## Estado de las decisiones

| Tema | Estado |
|---|---|
| Concepto "Crochet Editorial" (fotografía cálida, texturas reales, edición rica) | ✅ aprobado |
| Paleta = web + logo | ✅ decidido (16/11) |
| Tipografías = web (Work Sans + Caveat) | ✅ decidido (16/11) — reemplaza a Montserrat en el karaoke |
| Logo vectorizado | 🟡 redibujo fiel desde el PDF de Canva; validar con Daniela |
| Script elegante para reveals | 🔴 sin elegir (la web no tiene uno) — ver "Tipografía" |
| Música / identidad sonora | 🔴 provisoria |
| Reels previos (3 versiones) | ❌ rechazados |

## Logo

Archivos en `marcas/crochetes/logo/` (SVG + PNG transparente 2000 px). Copias PNG para el kit en
`editor-video-ia/assets/logos/crochetes-*.png`.

| Archivo | Uso |
|---|---|
| `crochetes-logo-vertical-color` | piezas cuadradas/verticales sobre fondo claro (lino, blanco) |
| `crochetes-logo-horizontal-color` | cabeceras, placas anchas, firma de carrusel |
| `*-negativo` | sobre **marino** o fotos oscuras: la C pasa a lino `#F0EFEB` y el texto a blanco |
| `crochetes-isotipo-*` | sello chico, avatar de redes, marca de agua, favicon |

- **Origen:** los PDF de Canva (`original-canva-*.pdf`) traen el texto en vector (Open Sans Bold) pero la "C"
  como JPEG de 308 px y la aguja como PNG de 62×91 px. La C se **vectorizó por color** (`_vectorizar_isotipo.py`,
  potrace) y se armaron los logos con el texto vectorial original (`_armar_logos.py`). Es fiel pero no es el
  archivo maestro: si aparece la imagen original subida a Canva en mayor resolución, re-correr los scripts.
- La C en chocolate **desaparece sobre marino** (contraste ≈ 1,5): ahí usar siempre la versión negativa.
- Área de respeto: la altura de la "R" de ROCHETES alrededor. Tamaño mínimo: isotipo 48 px; logo horizontal 220 px.
- No: recolorear la aguja, girar el logo, ponerle sombra dura, apoyarlo sobre el azul.

## Color (de la web + logo)

| Token | Nombre | Hex | Origen | Uso |
|---|---|---|---|---|
| `bg` | **Lino** | `#F0EFEB` | fondo de la web | fondos de placas, notas de papel, texto grande "crema" sobre video |
| `accent` | **Azul aguja** | `#1B97C8` | acento de la web = aguja del logo | palabra activa del karaoke, chips, subrayados, resaltador |
| `deep` | **Marino** | `#001E42` | barra superior y pie de la web | chips de alto contraste, placas de cierre, sombra 3D de palabras pop |
| `brown` | **Chocolate** | `#47382F` | la "C" del logo | titulares sobre lino, marcos |
| `warm` | **Terracota** | `#B3695C` | hoja del logo | segundo acento: chips, estrellas, flores, corazones |
| `sand` | **Arena** | `#AF9373` | puntadas del logo | detalles, trazos de costura, fondos de etiqueta suaves |
| `text` | **Grafito** | `#282828` | títulos de la web | texto principal, sombra de subtítulos |
| `muted` | **Gris** | `#4E4E4E` | cuerpo de la web | texto corrido en placas |
| — | Blanco | `#FFFFFF` | — | subtítulo base, tiras blancas |

**Proporción orientativa:** lino/foto 55 % · azul 15 % · marino 10 % · terracota 10 % · chocolate + arena 10 %.
Azul y terracota son **complementarios**: usarlos juntos en la misma pantalla solo en pequeño (estrella + chip).

**Contrastes medidos (WCAG):**

| Combinación | Ratio | Veredicto |
|---|---|---|
| Blanco sobre marino | 16,61 | ✅ todo uso |
| Blanco sobre chocolate | 11,20 | ✅ |
| Grafito sobre lino | 12,81 | ✅ |
| Chocolate sobre lino | 9,74 | ✅ |
| Marino sobre azul | 4,99 | ✅ texto en chip azul (preferido) |
| Blanco sobre terracota | 4,12 | ✅ chips en bold ≥ 24 px |
| Blanco sobre azul | 3,33 | ⚠️ solo texto grande/bold (≥ 40 px en 1080) |
| Grafito / marino sobre arena | 5,09 / 5,73 | ✅ |
| Azul sobre lino | 2,89 | ❌ nunca texto azul fino sobre fondo claro |
| Blanco sobre arena | 2,90 | ❌ |

Prohibido: rosa chicle, amarillo saturado, neón, arcoíris, gradientes, cajas negras de subtítulo.

## Tipografía (de la web)

| Uso | Fuente | Peso | Nota |
|---|---|---|---|
| Subtítulos karaoke | **Work Sans** | 600 base / 700 palabra activa | fuente de toda la web |
| Palabra gigante / titular comercial | **Work Sans** | 800–900, mayúsculas | Work Sans llega a 900 en Google Fonts |
| Etiquetas, chips, títulos de placa | **Work Sans** | 600–700, mayúsculas con tracking +0,08 em | igual que el menú y los títulos de la web |
| Acento manuscrito (notas de papel, categorías, "Soy yo") | **Caveat** | 400 / 700 | es la de las categorías de la web ("Amigurumis, Crochet") |
| Logo | Open Sans Bold | — | **solo** dentro del logo; no usar en piezas |
| Script elegante tipo lettering ("Un día dije" de la ref.) | 🔴 sin elegir | — | la web no tiene uno. Opción coherente: resolverlo con **Caveat 700** grande. Si se quiere más "lettering", probar **Dancing Script** |

Regla: máximo 2 familias por pantalla (Work Sans + Caveat). Una idea dominante por pantalla.

## María (avatar IA)

- Presentadora **virtual ficticia**. Referencia obligatoria: `referencia/maria_character_sheet.webp`. La imagen manda.
- Vestuario: el del character sheet (sweater cruzado **rosa/terracota suave** + pantalón **crema**). Combina con
  terracota y lino; evitar azul y marino en la ropa (compiten con el acento de la marca).
- Marca de agua **"✦ generado con IA"** persistente en todo reel donde aparezca.
- Nunca atribuirle haber probado un producto ni testimonios.
- ⚠️ La web muestra a María como **ilustración** en la sidebar: contradice al avatar fotorrealista. Decidir cuál
  es la María oficial (no requiere cambiar el diseño de la web, solo esa imagen).

## Subtítulos karaoke

- **Work Sans 600**, blanco, **sin caja, sin banda**.
- Sombra grafito real: `0 2px 6px rgba(40,40,40,0.55)` + `0 0 2px rgba(40,40,40,0.6)`. Sin stroke grueso.
- Palabra activa: **solo la que suena**, en **azul aguja `#1B97C8`** + peso 700 (contra la sombra: 4,43). Escala máx. 1.04.
- ~54–60 px en 1080×1920; máx. 2 líneas de 4–6 palabras. "Demasiado gruesos" fue motivo de rechazo.
- Timing **word-level real** (Whisper vía `prep.py`) + revisión manual. Nunca estimado.
- Zona: y ≈ 1180–1380, márgenes laterales ≥ 108 px, fuera de los 320 px inferiores.
- Cuando entra una palabra cinética grande, el subtítulo se oculta o se corre: nunca comparten zona.

## Gramática de motion graphics (reel de referencia, 19,8 s)

Analizado frame a frame (712×1266, 30 fps). Hojas de contacto en `referencia/motion-ref/`. El video original no
se guarda (es de terceros). Timings medidos a 10 fps (±1 frame); el easing es reconstrucción visual, no keyframes originales.

| # | t (s) | Recurso | Cómo se mueve | Traducción CROCHETES |
|---|---|---|---|---|
| 1 | 0,0–0,6 | **Script que se escribe** con destellos ✦ | revelado izq→der por máscara (~0,5 s), destellos escalonados con twinkle | Caveat 700 lino + ✦ blanco/azul |
| 2 | 1,0–1,8 | **Texto seleccionado** estilo UI con handles | tipeo letra a letra en caja blanca | caja blanca, texto grafito, handles **azul aguja** (calza perfecto: es el azul de iOS) |
| 3 | 2,4–2,6 | **Dos palabras bold que chocan** | entran desde lados distintos y se juntan (~0,2 s, overshoot) | Work Sans 800 blanco |
| 4 | 2,8–3,2 | **Disolución de letras**: la frase se desarma y entra la nueva con tracking abierto que se cierra | tracking 0,5 em → 0 en ~0,3 s + fundido cruzado | igual |
| 5 | 3,0–4,6 | **Jerarquía de 3 niveles**: chica arriba + GIGANTE + chica abajo con ✦ | gigante con scale-pop 0,6→1,05→1; la de abajo cierra tracking | Work Sans 500 / **900 lino** / Caveat |
| 6 | 4,5 | **Corte de plano en el golpe gráfico** | corte seco | corte entre clips de María en el acento |
| 7 | 4,9–6,3 | **Explosión de stickers** + palabra grande que se arma letra por letra | stickers con pop escalonado (~40 ms) y leve rotación | chip **terracota** (texto blanco), estrellas azul/terracota, **ovillo y flor de crochet** en lugar del arcoíris |
| 8 | 6,4–8,6 | **Tiras blancas secuenciales** que se apilan con texto tipeado | tira por línea, texto palabra por palabra al ritmo de la voz | tiras blancas, Work Sans 500 grafito (reemplazan al karaoke en ese tramo) |
| 9 | 8,8–9,5 | **Palabra que entra girando y explota** | rotación −90°→0 + scale 0,4→1,1→1 (~0,3 s) + estallido de rayos | Work Sans 900 lino con **sombra 3D marino** (offset 6–8 px), rayos azul |
| 10 | 9,9–11,3 | **Nota de papel inclinada** (−8°) con manuscrita que se escribe + **resaltador** | pop de la nota; texto palabra por palabra; resaltador barre izq→der | hoja lino con renglones arena y margen terracota, Caveat grafito, resaltador **azul 35 %** |
| 11 | 11,4–13,8 | Tiras blancas otra vez | igual que #8 | igual |
| 12 | 14,0–16,6 | **Sticker + flecha dibujada** → palabra gigante que se arma → etiqueta que se tipea | flecha con stroke-dashoffset; letras con stagger desde abajo | chip azul (texto marino), flecha terracota, gigante lino, etiqueta **marino** con texto blanco |
| 13 | 16,6–17,0 | **Cambio de palabra en la misma posición** + estrellas que rotan | chips por palabra, estrellas en rotación continua | chips azul/terracota, estrellas terracota |
| 14 | 16,8–17,3 | **Transición flash + nubes dibujadas** | flash de 2–3 frames + corte de locación; nubes de trazo | flash **lino** (no blanco puro) + nubes/puntadas de línea arena |
| 15 | 17,3–19,8 | **Script fino bajo la palabra gigante** + mini-chip final | reveal de trazo + pop del chip | Caveat lino + chip terracota |

### Reglas que se desprenden
1. **Nunca dos recursos iguales seguidos.**
2. **Algo cambia cada ~1–1,5 s**, aunque la frase siga.
3. La palabra emocional del guion siempre es **la más grande** de la pantalla.
4. Cortes de plano **sobre** un acento gráfico.
5. Texto en el tercio superior (y ≈ 300–760) sin tapar la cara de María.
6. Sombra 3D marino solo en 1–2 palabras pop por reel.

### Lo que NO copiar
Arcoíris, amarillo saturado, rosa chicle, el audio y los textos de la referencia. Solo la gramática.

## Sonido

- Voz prioritaria; música con ducking. Música cálida ~100 BPM (pluck/marimba): **borrador, no aprobada** →
  hasta aprobarla, `render.sh … none` o pista provisoria marcada.
- SFX: pop (#3, #5, #7, #9), swish (#4, #14), papel (#10), tick de trazo (#1, #12, #15), sparkle (estrellas).
  −18 a −24 dB bajo voz. Solo SFX propios o con licencia clara.

## Formatos

Reel 1080×1920 · Carrusel 1080×1350 · Pin 1000×1500 · Shorts 9:16. Escenas de María ≤ 10 s.

## Observaciones de la web (no se modifica el diseño; son de contenido)

1. Error en el tagline: **"En espacio para los amantes del tejido a crochet"** → "Un espacio…".
2. Mezcla tú/vos: "Descubre", "Monetiza" vs. "necesitás". Para redes se usa **voseo**; unificar títulos cuando se pueda.
3. Sidebar con **"YOUR AD HERE"** de plantilla.
4. El logo publicado es un PNG de 182 px con fondo incrustado: reemplazarlo por `crochetes-logo-horizontal-color.png`
   (mismo diseño, nítido) mejora la web sin cambiarle la estética.
5. María ilustrada en la sidebar vs. María fotorrealista en video.
