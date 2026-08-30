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

**Every photograph on the site is a placeholder** from Unsplash, so the layout
could be judged with real images in it. Full list, sources and sizes are in
`assets/img/CREDITS.md`.

Each slot ships at **two resolutions** (the browser picks one via `srcset`, so
retina screens get the sharp file and phones do not download it). There is a
script that makes both from one photo:

```sh
cd assets/img
./resize.sh ~/Desktop/the-real-sevigne.jpg sevigne portrait
./resize.sh ~/Desktop/showroom-wide.jpg    hero    wide
```

| Slot | Name to pass | Shape |
| --- | --- | --- |
| Hero background | `hero` | `wide` |
| Full-bleed band | `band` | `wide` |
| Sévigné Crystal | `sevigne` | `portrait` |
| Halle Brass Tier | `halle` | `portrait` |
| Murano Bloom | `murano` | `portrait` |
| Ledger Linear | `ledger` | `portrait` |
| Court Banquet | `court` | `portrait` |
| Ora Halo | `ora` | `portrait` |
| Service section | `g1`, `g2` | `portrait` |

Keep the names and the site picks the new files up with no code change.

**Shoot dark.** Fixture lit, room low. The page dims every photograph through a
CSS filter, so a bright flat shot has nowhere to go when the dimmer comes down.

Update the `alt` text on each `<img>` at the same time — it currently describes
the placeholder. The six fixture names, descriptions and specs are placeholder
copy too.

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

**The floating WhatsApp button has its own copy of the number.** Search for
`<!-- WHATSAPP` near the bottom of `index.html` and change the number in that
`href` too, or the button will message nobody. The pre-filled message text is in
the same link and can be reworded.

## 5. Map

Google Maps → find the shop → Share → **Embed a map** → copy the `<iframe>`.
Paste it in place of the `<div class="mapslot">` block. It is already styled to
match the dark page.

## 6. Optional

- **Favicon**: add `assets/img/favicon.png` and a `<link rel="icon">` in `<head>`.
- **Social preview**: add `og:image` meta tags once there is a hero photograph.

## 7. When the site moves to its own domain

Two absolute URLs in `<head>` point at the GitHub Pages address so link previews
work when the site is shared on WhatsApp or Instagram. Search for `og:url` and
`og:image` and update both, or the preview will keep pulling from the old
address.

The preview picture is currently `hero-1600.jpg`. Once there is a real
photograph of the shop, point `og:image` at that instead — it is the image
people see before they decide whether to tap the link.
