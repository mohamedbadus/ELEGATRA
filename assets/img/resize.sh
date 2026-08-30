#!/bin/sh
# Make the two sizes the site needs from one large photograph.
# Uses sips, which ships with macOS — nothing to install.
#
#   ./resize.sh ~/Desktop/IMG_4821.jpg sevigne portrait
#   ./resize.sh ~/Desktop/showroom.jpg hero     wide
#
# Writes into this folder, ready for the page to pick up.

set -e
SRC="$1"; NAME="$2"; SHAPE="${3:-portrait}"
DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$SRC" ] || [ -z "$NAME" ]; then
  echo "usage: ./resize.sh <source-image> <name> [portrait|wide]" >&2
  exit 1
fi

make() { # out w h
  cp "$SRC" "$DIR/$1"
  sips -s format jpeg -c "$3" "$2" "$DIR/$1" >/dev/null   # -c crops to fill
  echo "  wrote $1  ($2 x $3)"
}

case "$SHAPE" in
  wide)     make "$NAME-1600.jpg" 1600 1000; make "$NAME-3200.jpg" 3200 2000 ;;
  portrait) make "$NAME-700.jpg"   700  933; make "$NAME-1400.jpg" 1400 1867 ;;
  *) echo "shape must be 'portrait' or 'wide'" >&2; exit 1 ;;
esac
