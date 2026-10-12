# Handoff — Edición VLOG_7 (marca daniela-werkalec)

> Nota para el Claude de la sesión nueva. Trabajá en la rama **`claude/laughing-bardeen-u3knko`**.
>
> **LEÉ ESTO ANTES DE TRANSCRIBIR (causa raíz del bloqueo, confirmada tras 4 sesiones):**
> La política de red **se congela cuando NACE el contenedor**. Editar la allowlist
> y re-chequear en una sesión YA ABIERTA no sirve: ese contenedor nunca levanta el
> cambio. Hay que **guardar la config y abrir una sesión NUEVA**. Los dominios ya
> estaban bien cargados (`huggingface.co` + `cas-bridge.xethub.hf.co` + `xethub.hf.co`);
> el problema nunca fue *qué* dominios, sino chequear en el contenedor viejo.
> Hay **un solo entorno** ("Default — trusted network access", `env_018AKTucLEvaWLJrVJtbkp9G`),
> así que no hay confusión de entornos posible.
>
> **Protocolo obligatorio al arrancar:** correr primero el chequeo de red de abajo.
> Si da 403 en una sesión recién nacida con la config guardada → NO es cuestión de
> cargar más dominios: es la plataforma no aplicando la allowlist → escalar a soporte.

## Qué es el video
- Archivo: **VLOG_7.mp4** — la usuaria lo re-adjunta en el chat (NO está versionado; `*.mp4` va al `.gitignore`).
- Formato: **vertical 9:16, 1080×1920, ~21,8 s, con audio.** Detección de marco: ninguno (grabación limpia a cámara).
- Contenido: talking head en coworking (sweater camel), dos encuadres (plano medio sentada / plano entero de pie). **Prácticamente un reel único** → usar el flujo de **reels** (`reel_prep.py` + `references/reels.md`), NO el de video largo.

## Estado al cerrar la sesión anterior
- ✅ `setup.sh` corre OK (faster-whisper, OpenCV, Remotion). Volver a correrlo igual (idempotente; el contenedor nuevo no trae `.venv` ni `node_modules`, están en `.gitignore`).
- ⛔ `prep.py` NO se pudo correr: bajaba el modelo Whisper medium (~1,5 GB) desde HuggingFace y el proxy devolvía **403** (dominios no aplicados en el contenedor viejo).
- ✅ Estilo de subtítulos definido en `marcas/daniela-werkalec/estilo.md` — leerlo completo antes de planear escenas.

## Chequeo de red OBLIGATORIO antes de transcribir
Correr y confirmar que den `200`/`401` (cualquier cosa menos `403`):
```
curl -sS -o /dev/null -w "%{http_code}\n" https://huggingface.co
curl -sS -o /dev/null -w "%{http_code}\n" https://cas-bridge.xethub.hf.co
```
Si sigue `403`: faltan dominios en el entorno (apex `huggingface.co` + CDN Xet `cas-bridge.xethub.hf.co` / `xethub.hf.co`), o se abrió sesión sobre el entorno equivocado. No reintentar el proxy; reportar.

## Orden de trabajo pedido por Daniela
1. `setup.sh` → `prep.py "VLOG_7.mp4"` (modelo medium, lang es).
2. Mostrarle la **transcripción completa con tiempos**.
3. Proponer cortes/escenas según `estilo.md`, en **tabla**: tramo · duración · gancho · qué b-roll/placa.
4. **CTA**: elegirlo Claude según lo que diga el video. Tres direcciones pre-propuestas — confirmar UNA tras leer el texto:
   - **ORDEN** → checklist de leads en WhatsApp (si habla de desorden comercial / consultas que se pierden).
   - **AGENTE** → guía de agente IA 24 hs (si el eje es atención/automatización).
   - **REEL** → plantilla de cómo edita reels con IA (si el video es meta, sobre su propio proceso).
5. Mostrar **fotogramas** (`stills.sh`) antes de renderizar, y recién después el **MP4**.

## Estilo de subtítulos (resumen de estilo.md — el detalle completo está en el archivo)
- Frases de **3–4 palabras** en pantalla. Palabra que se dice: **dorado (#F2B705) + más grande + bold**; resto en **blanco**.
- **Sin caja.** Contorno negro nítido tipo sticker. Sentence case, nunca mayúscula sostenida. Al **centro** del cuadro.
- Tipografía bold redondeada (Montserrat 800/900). Cambio visual cada 2–4 s. Primeros 2 s en cámara completa.
- **Hero con glow** dorado a cuentagotas (1–2 por reel) para el remate/dato fuerte.
- Marca de agua: `@danielawerkalec`.

## Tono con Daniela
Directo, irónico, estratégico, sin relleno ni adulación. No fabricar transcripción ni cortes sin haber leído el texto real. Español rioplatense.
