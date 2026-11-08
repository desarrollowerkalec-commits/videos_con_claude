#!/bin/bash
# Render final: Remotion → (música con ducking opcional) → loudnorm -14 LUFS.
# Uso: render.sh <carpeta edicion-...> "<ruta salida.mp4>" [musica.wav] [volumen_musica=0.16]
set -e
# En la nube (red cerrada): exportá REMOTION_BROWSER_EXECUTABLE (ruta a un chrome/headless_shell ya
# instalado) y, si hace falta, REMOTION_IGNORE_CERT=1. En Mac no hace falta (Remotion baja su chrome).
RFLAGS=""
[ -n "$REMOTION_BROWSER_EXECUTABLE" ] && RFLAGS="$RFLAGS --browser-executable=$REMOTION_BROWSER_EXECUTABLE"
[ -n "$REMOTION_IGNORE_CERT" ] && RFLAGS="$RFLAGS --ignore-certificate-errors"
SKILL="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(cd "$1" && pwd)"; OUT="$2"; MUSIC="${3:-}"; MVOL="${4:-}"; MSTART="${5:-}"
# Música por defecto según la marca (variable MARCA; vacía = Daniela Werkalec). Siempre, salvo otra ruta o "none".
#   MARCA=dw  (default) → Forward Momentum, desde el 2.º 10 (ahí entra el beat), volumen 0.42
#   MARCA=mdi           → mdi-fondo.mp3 (Marketing Digital Inmobiliario), desde el 2.º 17.5 (groove completo),
#                         volumen 0.14 (la pista es ~5 dB más fuerte que Forward Momentum; bajada a pedido de Daniela, nov-2026)
# Placa final: la voz se termina y el ducking suelta → la música subía sola. Ahora, desde END_AT (segundos antes
# del final, default 3.5 = placa final estándar) la música baja a END_GAIN (default 0.55 ≈ −5 dB) en 0.6 s.
# Variables: END_AT=0 desactiva el bajón · END_GAIN=0.4 lo hace más fuerte. SKIP_RENDER=1 reusa out/render.mp4
# (rehacer solo la mezcla, sin volver a renderizar el video).
if [ -z "$MUSIC" ]; then
  if [ "${MARCA:-dw}" = "mdi" ]; then
    MUSIC="$SKILL/assets/music/mdi-fondo.mp3"; [ -z "$MSTART" ] && MSTART=17.5; [ -z "$MVOL" ] && MVOL=0.14
  elif [ -f "$SKILL/assets/music/forward-momentum.mp3" ]; then
    MUSIC="$SKILL/assets/music/forward-momentum.mp3"; [ -z "$MSTART" ] && MSTART=10
  fi
fi
[ -z "$MVOL" ] && MVOL=0.42
[ "$MUSIC" = "none" ] && MUSIC=""
[ -z "$MSTART" ] && MSTART=0
cd "$WORK/remotion"
[ "${SKIP_RENDER:-0}" = "1" ] && [ -f out/render.mp4 ] || npx remotion render src/index.ts Main out/render.mp4 --crf=18 $RFLAGS --log=error 2>&1 | grep -v "network requests" || true
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/render.mp4)
ffmpeg -v error -y -i out/render.mp4 -vn -af "loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 "$WORK/voz_sfx.wav"
if [ -n "$MUSIC" ]; then
  FO=$(python3 -c "print(max(0,$D-1.6))")
  MEND=$(python3 -c "print($MSTART+$D)")
  ES=$(python3 -c "print(max(0,$D-${END_AT:-3.5}) if ${END_AT:-3.5}>0 else 1e9)")
  EG=${END_GAIN:-0.55}
  ffmpeg -v error -y -i "$WORK/voz_sfx.wav" -i "$MUSIC" -filter_complex \
    "[1:a]atrim=$MSTART:$MEND,asetpts=PTS-STARTPTS,aresample=48000,volume=$MVOL,volume='if(lt(t,$ES),1,if(lt(t,$ES+0.6),1-(1-$EG)*(t-$ES)/0.6,$EG))':eval=frame,afade=t=in:d=0.8,afade=t=out:st=$FO:d=1.6[m];[0:a]asplit=2[v][sc];[m][sc]sidechaincompress=threshold=0.08:ratio=4:attack=25:release=350[md];[v][md]amix=inputs=2:normalize=0,alimiter=limit=0.89[out]" \
    -map "[out]" -ar 48000 "$WORK/mezcla.wav"
  A="$WORK/mezcla.wav"
else
  A="$WORK/voz_sfx.wav"
fi
ffmpeg -v error -y -i out/render.mp4 -i "$A" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest "$OUT"
echo "Listo: $OUT ($(printf %.1f $D)s)"
ffmpeg -i "$OUT" -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" || true
