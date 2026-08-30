# ELEGATRA

Static marketing site for a chandelier showroom. No build step, no dependencies —
plain HTML, CSS and one JavaScript file.

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/            ← logo and fixture photographs go here
CONTENT-TO-PROVIDE.md  ← what the client still needs to send, and where it goes
```

## Run it

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly also works.

## The design

The page is a light you can dim. A brass dimmer rail — fixed to the right edge on
desktop, docked to the bottom on mobile — writes a single CSS custom property,
`--lum`, on `:root`. Everything else reads it: the room's background lifts, the
halo behind the chandelier blooms, the candle flames grow, and the crystal drops
gain opacity. It is the one interaction the product itself is about.

The chandelier in the hero is hand-drawn SVG, so it works before any photographs
arrive and stays sharp at any size.

- **Type** — Bodoni Moda (display), Jost (body), IBM Plex Mono (specs).
- **Colour** — warm-violet ink `#0B0A10`, dusk `#171420`, antique brass `#C39A4B`,
  candle `#FFD9A0`, linen `#EDE7DC`, with a cyan/rose prism pair used only where
  light refracts.
- **Motion** — an orchestrated page load (the fixture drops in, the candles strike
  in sequence), staggered scroll reveals, and hover states. All of it is disabled
  under `prefers-reduced-motion`.

Responsive to 360 px. Keyboard focus is visible throughout, and the dimmer is a
real `<input type="range">`, so it works with arrow keys and screen readers.

## Deploy

Any static host. GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
