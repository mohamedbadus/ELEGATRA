# A.K Chandeliers

Static marketing site for the chandelier and decorative-lighting showroom at
[@akchandeliers](https://instagram.com/akchandeliers). No build step and no
install — plain HTML, CSS and one JavaScript file.

**Live:** https://mohamedbadus.github.io/ak-chandeliers/

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/              ← logo and photographs (all placeholder — see CREDITS.md)
CONTENT-TO-PROVIDE.md    ← what the shop still needs to send, and where it goes
```

## Run it locally

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. Stop it with `lsof -ti:8000 | xargs kill`.

## The idea

**The page is a light you can dim.** The brass dimmer — fixed to the right edge
on desktop, docked to the bottom on a phone — writes one CSS custom property,
`--lum`, onto `:root`. Every photograph carries `.lit`, which exposes it from
that value:

```css
.lit{
  --lit-floor:.34; --lit-gain:.88;
  filter: brightness(calc(var(--lit-floor) + var(--lum) * var(--lit-gain)))
          saturate(calc(.58 + var(--lum) * .56))
          contrast(calc(.92 + var(--lum) * .16));
}
```

So dragging it really re-lights the room — it changes the exposure of the actual
photographs, and the warm bloom over the hero fixture grows with it. The readout
shows the matching lumen figure, the way a dimmer plate does.

The floor and gain are per-image, because a photograph shot dark needs more
headroom than one shot bright. The shade under the copy **rises with the light**
too, so the type stays readable at every setting — verified at 6% and 100%.

## Design

- **Type** — Bodoni Moda (display; the didone thick/thin mirrors a cut crystal
  facet), Jost (body), IBM Plex Mono (specs).
- **Colour** — warm-violet ink `#0B0A10`, dusk `#171420`, antique brass `#C39A4B`,
  candle `#FFD9A0`, linen `#EDE7DC`, and a cyan/rose prism pair used only on the
  one word where light refracts.
- **Structure** — the five stock categories carry real spec tags (what it suits ·
  drop or height · colour temperature · materials), not decorative numbering.
  Numbers appear once, on the process timeline, where the order is a sequence.
- **Motion** — an orchestrated load, scroll-scrubbed parallax on the two
  full-bleed photographs, staggered reveals, hover states.

Nothing is load-bearing for legibility: with JavaScript off there is no
animation and the full copy is simply there.

## Libraries

Three, from a CDN, **all optional** — if any fails to load the page falls back to
IntersectionObserver reveals and native scrolling, and nothing throws.

| Library | Used for |
| --- | --- |
| [GSAP](https://gsap.com) 3.12.5 | animation engine |
| GSAP ScrollTrigger | scroll-scrubbed parallax |
| [Lenis](https://lenis.darkroom.engineering) 1.x | smooth momentum scrolling |

All motion is disabled under `prefers-reduced-motion`.

## Quality floor

Responsive to 360px. Visible keyboard focus. The dimmer is a real
`<input type="range">`, so arrow keys and screen readers drive it. Decorative
images are `aria-hidden`; the product photographs carry real alt text. The
docked controls respect `env(safe-area-inset-bottom)`.

## Deploy

GitHub Pages, from `main` / root. Every `git push` redeploys within a minute —
there is no upload step. Check a deploy with:

```sh
gh api repos/mohamedbadus/ak-chandeliers/pages/builds/latest --jq '.status'
```

## Still placeholder

The logo is the 150px Instagram profile picture, every photograph is from
Unsplash, the contact details are `[bracketed]`, and the spec figures on the five
category cards are plausible ranges rather than the shop's real numbers. See
`CONTENT-TO-PROVIDE.md`.
