# ELEGATRA

Static marketing site for a chandelier showroom. No build step and no install —
plain HTML, CSS and one JavaScript file.

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/              ← photographs (all currently placeholders — see CREDITS.md)
CONTENT-TO-PROVIDE.md    ← what the client still needs to send, and where it goes
```

## Run it

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Stop it with `lsof -ti:8000 | xargs kill`.

## The idea

**The page is a light you can dim.** The brass dimmer — fixed to the right edge on
desktop, docked to the bottom on mobile — writes one CSS custom property, `--lum`,
onto `:root`. Every photograph on the page carries the `.lit` class, which exposes
it from that value:

```css
.lit{ filter: brightness(calc(.30 + var(--lum) * .92))
              saturate(calc(.55 + var(--lum) * .60))
              contrast(calc(.92 + var(--lum) * .16)); }
```

So dragging the dimmer really does re-light the room — it changes the exposure of
the actual photographs, and the warm bloom over the hero fixture grows with it.
Nothing is faked with a black overlay. The readout shows the matching lumen
figure, the way a real dimmer plate does.

Text legibility never depends on `--lum`: the scrims over the hero and the band
are constant, so the copy stays readable at every setting.

## Design

- **Type** — Bodoni Moda (display; the didone thick/thin mirrors a cut crystal
  facet), Jost (body), IBM Plex Mono (fixture specs).
- **Colour** — warm-violet ink `#0B0A10`, dusk `#171420`, antique brass `#C39A4B`,
  candle `#FFD9A0`, linen `#EDE7DC`, and a cyan/rose prism pair used only on the
  two words where light refracts.
- **Structure** — fixtures are labelled with real spec tags (arms · drop · Kelvin ·
  material), not decorative numbering. Numbers appear once, on the process
  timeline, where the order is genuinely a sequence.
- **Motion** — an orchestrated page load (the hero photograph settles, the headline
  lifts line by line), scroll-scrubbed parallax on the two full-bleed photographs,
  staggered reveals, and hover states on every card.

## Photography

Every image is a placeholder from Unsplash — see `assets/img/CREDITS.md` for
sources, the two sizes each slot needs, and `resize.sh`, which makes both from
one photo using `sips`.

Each slot ships at two resolutions and the browser picks one through `srcset`,
so a retina display gets the sharp file (hero at 3200 px) and a phone does not
download it.

## Libraries

Three, all loaded from a CDN and **all optional**:

| Library | Used for |
| --- | --- |
| [GSAP](https://gsap.com) 3.12.5 | animation engine |
| GSAP ScrollTrigger | scroll-scrubbed parallax |
| [Lenis](https://lenis.darkroom.engineering) 1.x | smooth momentum scrolling |

If any of them fails to load — offline, blocked, slow — the page falls back to
IntersectionObserver reveals and native scrolling. Nothing throws and nothing
disappears. Everything is also disabled under `prefers-reduced-motion`.

## Quality floor

Responsive to 360 px. Visible keyboard focus throughout. The dimmer is a real
`<input type="range">`, so arrow keys and screen readers drive it. Decorative
images are `aria-hidden`; the fixture photographs carry real alt text.

## Deploy

Any static host. GitHub Pages: **Settings → Pages → Deploy from branch → `main` / root**.
