#!/bin/bash
# Renderiza fotogramas de control en los segundos indicados y arma una hoja 2 columnas.
# Uso: stills.sh <carpeta edicion-...> 1.0 5.5 12.5 ...
set -e
# En la nube (red cerrada) Remotion no puede descargar su navegador ni validar el CA del proxy.
# Exportá REMOTION_BROWSER_EXECUTABLE (ruta a un chrome/headless_shell ya instalado) y, si hace
# falta, REMOTION_IGNORE_CERT=1. En Mac no hace falta nada (Remotion baja su propio chrome).
RFLAGS=""
[ -n "$REMOTION_BROWSER_EXECUTABLE" ] && RFLAGS="$RFLAGS --browser-executable=$REMOTION_BROWSER_EXECUTABLE"
[ -n "$REMOTION_IGNORE_CERT" ] && RFLAGS="$RFLAGS --ignore-certificate-errors"
WORK="$(cd "$1" && pwd)"; shift
cd "$WORK/remotion"; mkdir -p out/stills; rm -f out/stills/*.jpg
i=0
for s in "$@"; do
  i=$((i+1)); f=$(python3 -c "print(int(float('$s')*30))")
  npx remotion still src/index.ts Main "out/stills/$(printf %02d $i)_$s.jpg" --frame=$f --scale=0.5 $RFLAGS --log=error 2>&1 | grep -v "network requests" || true
done
rows=$(( (i+1)/2 ))
ffmpeg -v error -y -pattern_type glob -i 'out/stills/*.jpg' -filter_complex "tile=2x$rows" out/hoja.jpg
echo "$WORK/remotion/out/hoja.jpg"
