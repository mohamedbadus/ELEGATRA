# What to send, and where it goes

Everything below is a placeholder in the live page. Nothing needs a build step —
edit the file, save, refresh.

## 1. Logo

Put the file at `assets/img/logo.svg` (SVG preferred, or a PNG at 2× height).
Then in `index.html`, replace the marked `<svg class="brand__mark">` block in the
header with:

```html
<img src="assets/img/logo.svg" alt="Elegatra" class="brand__img">
```

There is a second copy of the mark in the footer — replace it the same way.

## 2. Shop name

If the trading name is not exactly "Elegatra", search `index.html` for
`brand__name` (2 places), the `<title>`, and the footer copyright line.

## 3. Photographs — this is the big one

**Every photograph on the site right now is a placeholder** pulled from Unsplash
so the layout could be judged with real images in it. See
`assets/img/CREDITS.md` for the full list, the source of each one, and the exact
pixel size to match.

Replace the file in `assets/img/` keeping the same filename and the site picks it
up — no code change needed:

| Slot | File | Ratio |
| --- | --- | --- |
| Hero background | `hero.jpg` | 16:10 landscape, 2000 × 1250 |
| Sévigné Crystal | `sevigne.jpg` | 3:4 portrait, 1000 × 1333 |
| Halle Brass Tier | `halle.jpg` | 3:4 portrait |
| Murano Bloom | `murano.jpg` | 3:4 portrait |
| Ledger Linear | `ledger.jpg` | 3:4 portrait |
| Court Banquet | `court.jpg` | 3:4 portrait |
| Ora Halo | `ora.jpg` | 3:4 portrait |
| Full-bleed band | `band.jpg` | 5:3 landscape, 2000 × 1200 |
| Service section | `g1.jpg`, `g2.jpg` | 3:4 portrait |

**Shoot dark.** Fixture lit, room low. The page dims every photograph through a
CSS filter, so a bright flat shot has nowhere to go when the dimmer comes down.

Update the `alt` text on each `<img>` at the same time — it currently describes
the placeholder.

The six fixture names, descriptions and specs are placeholder copy written to
show the layout. Swap them for the real stock.

## 4. Contact details

All in one block in `index.html` — search for `<!-- CONTACT DETAILS`. Replace the
values in square brackets:

- Showroom address
- Phone — update **both** the visible text and the `href="tel:+91…"`
- WhatsApp — update the text and the `href="https://wa.me/91…"` (number only, no
  `+`, no spaces)
- Email — text and `href="mailto:…"`
- Instagram — handle and the profile URL
- Opening hours

## 5. Map

Google Maps → find the shop → Share → **Embed a map** → copy the `<iframe>`.
Paste it in place of the `<div class="mapslot">` block. It is already styled to
match the dark page.

## 6. Optional

- **Favicon**: add `assets/img/favicon.png` and a `<link rel="icon">` in `<head>`.
- **Social preview**: add `og:image` meta tags once there is a hero photograph.
