# Images

## The logo

`logo.png`, `favicon.png` and `apple-touch-icon.png` are all made from the
**Instagram profile picture** at
[@akchandeliers](https://instagram.com/akchandeliers), which is only **150 × 150
pixels**. That is enough for the 34px mark in the header and for a browser tab,
but it is soft if used any larger.

**Ask the shop for the original logo artwork** — ideally an SVG or PDF from
whoever designed it, otherwise the largest PNG they have. Drop it in as
`logo.png` and regenerate the two icons:

```sh
cd assets/img
cp logo.png favicon.png          && sips -s format png -z 64 64   favicon.png
cp logo.png apple-touch-icon.png && sips -s format png -z 180 180 apple-touch-icon.png
```

The logo is gold on black, and the page renders it with `mix-blend-mode:screen`
so the black background drops out. A replacement with a transparent background
works too; one on a *white* background will not — it would appear as a white box.

## Photography — all placeholder

Every photograph is a **temporary stand-in** from [Unsplash](https://unsplash.com)
under the [Unsplash License](https://unsplash.com/license), free for commercial
use with no attribution required. **Replace all of them with the shop's own
stock before this is the real website.**

Each slot ships at two or three sizes and the browser picks one via `srcset`, so
a 4K screen gets the sharp file and a phone does not download it.

| Slot | Files | Shape |
| --- | --- | --- |
| Hero background | `hero-1600` / `-2560` / `-3840` | 8:5 landscape |
| Full-bleed band | `band-1600` / `-2560` / `-3840` | 8:5 landscape |
| Chandeliers | `chandeliers-800` / `-1600` | 3:4 portrait |
| Pendant lights | `pendants-800` / `-1600` | 3:4 portrait |
| Wall lights | `wall-800` / `-1600` | 3:4 portrait |
| Table lamps | `table-800` / `-1600` | 3:4 portrait |
| Pedestal lamps | `pedestal-800` / `-1600` | 3:4 portrait |
| Service section | `g1-*`, `g2-*` | 3:4 portrait |

`resize.sh` makes every size from one photo using `sips`:

```sh
cd assets/img
./resize.sh ~/Desktop/our-chandeliers.jpg chandeliers portrait
./resize.sh ~/Desktop/showroom-wide.jpg   hero        wide
```

## Shoot dark

Fixture lit, room low. The page dims every photograph through a CSS filter, so a
bright, flat, evenly-lit shot has nowhere to go when the dimmer comes down.

Two of the current placeholders needed individual correction, which shows what
to avoid: the wall light was shot so dark it read as a black card, and the floor
lamp was shot against a white wall and read as a white one. They carry
`piece--dark` and `piece--bright` in `index.html`, which set a different
exposure floor. **If the real photographs are shot consistently, delete those
two classes** rather than adding more.
