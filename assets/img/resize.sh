#!/bin/sh
# Make the sizes the site needs from one large photograph.
# Uses sips, which ships with macOS — nothing to install.
#
#   ./resize.sh ~/Desktop/IMG_4821.jpg chandeliers portrait
#   ./resize.sh ~/Desktop/showroom.jpg hero        wide

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
  wide)     make "$NAME-1600.jpg" 1600 1000
            make "$NAME-2560.jpg" 2560 1600
            make "$NAME-3840.jpg" 3840 2400 ;;
  portrait) make "$NAME-800.jpg"   800 1066
            make "$NAME-1600.jpg" 1600 2133 ;;
  *) echo "shape must be 'portrait' or 'wide'" >&2; exit 1 ;;
esac
