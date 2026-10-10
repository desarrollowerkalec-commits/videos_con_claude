# Edición de videos con IA — Daniela Werkalec

Repo autocontenido para editar reels con el kit `editor-video-ia` (de Melina Blanco /
Camaleones Digitales) usando el **estilo de marca de Daniela Werkalec**.

> **Por qué existe este repo:** la sesión cloud de Claude es efímera (se borra al cerrar) y
> arrancó con la red bloqueada. Dejar todo versionado acá permite retomar en cualquier
> sesión nueva —web o Mac— sin rehacer el análisis de estilo.

---

## Qué hay acá

```
marcas/daniela-werkalec/
  estilo.md     → spec de estilo sacada de tus videos reales (subtítulos, dorado, b-roll)
  theme.ts      → tema listo para pegar en cada proyecto Remotion (dorado + blanco)
editor-video-ia/  → el kit (solo fuente; las dependencias se instalan con setup.sh)
```

---

## Cómo retomar la edición (sesión nueva)

### 1. Red abierta (una vez, en la config del entorno)
En **sesión cloud web**: el panel de red ya quedó con estos dominios permitidos →
`huggingface.co`, `cdn-lfs.huggingface.co`, `fonts.googleapis.com`, `fonts.gstatic.com`,
`pexels.com`, `pixabay.com`. El cambio aplica a **sesiones nuevas**, no a la que ya está corriendo.
En **Mac**: no hay proxy, no hace falta tocar nada.

### 2. Instalar el kit y sus dependencias (una vez por contenedor, ~15 min)
```bash
mkdir -p ~/.claude/skills
cp -R editor-video-ia ~/.claude/skills/editor-video-ia
bash ~/.claude/skills/editor-video-ia/scripts/setup.sh
```
La primera transcripción baja el modelo de Whisper (~1,5 GB). Una sola vez.

### 3. Editar un video
En Claude Code:
```
Edita este video con la marca daniela-werkalec: /ruta/a/mi-video.mp4
```
Pasale también `marcas/daniela-werkalec/estilo.md` como referencia de estilo. Claude:
1. Transcribe.
2. Propone los cortes y las escenas (vos aprobás).
3. Aplica tu tema (`marcas/daniela-werkalec/theme.ts` → `remotion/src/theme.ts`).
4. Muestra **fotogramas** para aprobar antes de renderizar.
5. Renderiza el MP4.

---

## Tu estilo en una línea

Subtítulos en **frases de 3–4 palabras**, blancas, con la **palabra activa en dorado y más
grande** (karaoke por color + tamaño). Remates/números con **glow dorado** (hero word).
Cortes cada 2–4 s, talking head + b-roll. Marca de agua `@danielawerkalec`. Detalle en
`marcas/daniela-werkalec/estilo.md`.

---

## Pendientes (para la próxima sesión con red abierta)

- [ ] Correr la **demo del VLOG_7** de punta a punta (transcripción → escenas → fotogramas → MP4).
- [ ] Ajustar el componente de subtítulos (`SubsV`) al formato nuevo: frase + palabra activa
      dorada y más grande.
- [ ] Sumar el "hero word" con glow para remates/números.
- [ ] Definir **CTA por video** (palabra a comentar + qué se envía) analizando cada guion.
- [ ] Configurar **b-roll** desde Pexels/Pixabay (API key gratis de cada uno) o con clips propios.

---

## Créditos y licencias

- Kit `editor-video-ia`: **Melina Blanco · Camaleones Digitales · @meliwhite_8** (kit gratuito).
- Remotion es gratis para personas y empresas de hasta 3 empleados; empresas mayores necesitan
  licencia (remotion.dev/license). Whisper, ffmpeg y OpenCV son de código abierto.
