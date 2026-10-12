# 🎬 Cómo hacer un reel nuevo — Guía para Daniela

Guía para vos (humana). El detalle técnico está en `CLAUDE.md` y `editor-video-ia/SKILL.md`;
esto es el paso a paso práctico.

## ⚡ Atajo: qué escribir al abrir la sesión (copiar y pegar)

**Daniela Werkalec (marca personal):**
> Reel para **Daniela Werkalec**, ángulo **[opiniones / vlog / prompts / apps / noticias]**.
> [Si ya viene editado:] Ya tiene subtítulos y música: hacé la portada y sumá motion graphics.
> [Si viene crudo:] Transcribí, proponé cortes, subtítulos, motion graphics, portada y placa final.

**Marketing Digital Inmobiliario:**
> Reel para **Marketing Digital Inmobiliario**, ángulo **[…]**. Mismo flujo que siempre.
> (Mientras `marcas/marketing-digital-inmobiliario/estilo.md` tenga casilleros vacíos, Claude te va a
> pedir colores/fuentes/logo antes de editar.)

Siempre: **sesión nueva** sobre el repo `videos_con_claude` + adjuntar el .mp4. Una sesión por reel (o por tanda
del mismo día). No hace falta explicar el estilo: está todo guardado en `marcas/`.

---

## La idea en una línea

**No volvés a la sesión vieja.** Abrís una **sesión nueva sobre este mismo repo**, subís tu video,
y le pedís que lo edite con tu estilo. Todo tu sistema (estilo, música, fuentes, íconos) ya vive acá.

---

## Paso a paso

### 1. Grabá el video
- Hablá a cámara, buena luz. Si podés, grabá **2 tomas** (una abierta, una cerrada) para que los
  "cambios de ángulo" se sientan reales.
- Para reels: vertical (celular parado) o un video largo del que sacar varios clips.

### 2. Abrí una sesión nueva de Claude Code sobre el repo
- En **claude.ai/code** (web): nueva sesión apuntando al repo **`videos_con_claude`**.
- Al clonarse, Claude lee solo el `CLAUDE.md` y ya sabe tu flujo y tu estilo.

### 3. Subí el video y pedí la edición
Escribí algo así (podés copiar y pegar):

> Quiero editar un reel nuevo con mi estilo de marca. Acá está el video: [subí el .mp4].
> Es un reel vertical sobre [tema]. Seguí `marcas/daniela-werkalec/estilo.md`.
> Transcribí de verdad, proponeme los cortes, elegí el CTA y mostrame fotogramas antes de renderizar.

### 4. Lo que Claude va a hacer (y dónde opinás vos)
1. **Transcribe** el audio (texto real, con tiempos).
2. **Propone los cortes** en una tabla → vos aprobás o ajustás.
3. **Edita** con tu estilo (subtítulos al pecho, remate en cascada, color del ángulo).
4. **Música** automática (Forward Momentum, ya puesta).
5. **Fotogramas** para revisar antes de renderizar → vos aprobás.
6. **Render** del MP4 final + **portada** del reel.

### 5. Decidí el ángulo y su color
Cada reel entra en uno de tus 5 ángulos (define el 2.º color + ícono + portada):

| Ángulo | Color | Para |
|---|---|---|
| Vlogs / personal | Celeste `#38B6FF` | tu día a día, detrás de escena |
| Opiniones / reflexión | Fucsia `#CB6CE6` | comentarios, informes, posturas |
| Prompts / guías | Amarillo `#F4C910` | paso a paso, tutoriales |
| Apps / herramientas | Verde `#2DAF8C` | recomendaciones, reviews |
| Noticias / novedades | Rojo `#FF3131` | lo nuevo que llama la atención |

Decile a Claude qué ángulo es y listo.

---

## Para que la música no sea genérica (opcional)
Hoy todos los reels usan la misma cama. Si querés variar, generás otra en **Google Labs (MusicFX)**,
me la pasás, y la guardo igual que la actual. Prompt base que funciona:
> *Upbeat feel-good house, ~120 BPM, warm, no vocals, instrumental, polished, positive — brand reel.*

## Lo que se guarda y lo que no
- **Se guarda** (en el repo, para siempre): el kit, tu estilo, fuentes, música, íconos, estas guías.
- **No se guarda** (y está bien): los `.mp4` pesados y las carpetas `edicion-*`. Son por-video.
  Si querés conservar un reel terminado, descargalo de la sesión cuando te lo entrego.

## Si algo se rompe
- **403 / red bloqueada** (HuggingFace, fuentes): es la política de red del entorno, no un bug.
  Se arregla en la config del entorno y aplica a **sesiones nuevas**.
- Cualquier detalle técnico está en `CLAUDE.md`. Decile a Claude "leé el CLAUDE.md" si arranca perdido.
