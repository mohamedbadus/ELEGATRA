# What the shop needs to send

Everything below is a placeholder on the live site. Nothing needs a build step —
edit the file, save, `git push`, and the site updates itself in a minute.

## 1. The logo

The site currently uses the **Instagram profile picture**, which is only
150 × 150 pixels. It is fine at the 34px size in the header and as a tab icon,
but it will not scale up.

Ask for the **original artwork** — an SVG or PDF from whoever designed it, or
failing that the biggest PNG they have. Save it as `assets/img/logo.png` and
regenerate the icons (the command is in `assets/img/CREDITS.md`).

A transparent background is ideal. Gold on black also works, because the page
drops the black out. **Gold on white will not** — it would show as a white box.

## 2. Photographs — the big one

**Every photograph on the site is a placeholder** from Unsplash. Full list,
sources and sizes are in `assets/img/CREDITS.md`.

Nine slots, each shipped at two or three resolutions. `assets/img/resize.sh`
makes every size from one photo:

```sh
cd assets/img
./resize.sh ~/Desktop/our-chandeliers.jpg chandeliers portrait
./resize.sh ~/Desktop/showroom-wide.jpg   hero        wide
```

| Slot | Name to pass | Shape |
| --- | --- | --- |
| Hero background | `hero` | `wide` |
| Full-bleed band | `band` | `wide` |
| Chandeliers | `chandeliers` | `portrait` |
| Pendant lights | `pendants` | `portrait` |
| Wall lights | `wall` | `portrait` |
| Table lamps | `table` | `portrait` |
| Pedestal lamps | `pedestal` | `portrait` |
| Service section | `g1`, `g2` | `portrait` |

Keep the names and the site picks up the new files with no code change. Update
the `alt` text on each `<img>` at the same time — it describes the placeholder.

**Shoot dark.** Fixture lit, room low, and keep the exposure consistent between
shots. A bright flat photograph has nowhere to go when the dimmer comes down.

## 3. Contact details

One block in `index.html` — search for `<!-- CONTACT DETAILS`. Replace the
values in square brackets:

- Showroom address
- Phone — update **both** the visible text and `href="tel:+91…"`
- WhatsApp — the text and `href="https://wa.me/91…"` (digits only, no `+`, no spaces)
- Email
- Opening hours

Instagram is already correct: [@akchandeliers](https://instagram.com/akchandeliers).

**The floating WhatsApp button holds a second copy of the number.** Search for
`<!-- WHATSAPP` near the bottom of `index.html` and change that `href` too, or
the button will message nobody. Its pre-filled message can be reworded there.

## 4. The map

Google Maps → find the shop → Share → **Embed a map** → copy the `<iframe>`.
Paste it in place of the `<div class="mapslot">` block. It is already styled to
match the dark page.

## 5. Check the words are true

Two things were written speculatively and need confirming or correcting:

- **The service section** claims ceiling surveys and load ratings, matched
  dimmers and drivers, an in-house installation crew, and cleaning and
  restoration including fixtures the shop did not supply.
- **The process section** promises a fixed written quote valid 30 days, and
  **two years on workmanship** plus a free cleaning visit.

That warranty is a promise printed on the shop's own website. If it is wrong,
say so and it will be rewritten.

The five category descriptions and their spec figures (drops, heights, colour
temperatures, materials) are plausible ranges, not the shop's real numbers.

## 6. If the site moves to akchandeliers.com

The domain in the Instagram bio does not currently resolve. When it is bought
and pointed at GitHub Pages, two absolute URLs in `<head>` need updating or link
previews will keep pulling from the old address — search for `og:url` and
`og:image`.
