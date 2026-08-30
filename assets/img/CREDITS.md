# Placeholder photography

Every image here is a **temporary stand-in** from [Unsplash](https://unsplash.com),
under the [Unsplash License](https://unsplash.com/license) — free for commercial
use, no attribution required. They exist so the layout can be judged with real
photographs in it. **Replace all of them before the site goes live.**

## Two sizes per slot

Each slot ships at two resolutions and the browser picks one via `srcset`, so a
retina display gets the sharp file and a phone does not download it.

| Slot | Files | Ratio |
| --- | --- | --- |
| Hero background | `hero-1600.jpg`, `hero-3200.jpg` | 8:5 landscape |
| Full-bleed band | `band-1600.jpg`, `band-3200.jpg` | 8:5 landscape |
| Sévigné Crystal | `sevigne-700.jpg`, `sevigne-1400.jpg` | 3:4 portrait |
| Halle Brass Tier | `halle-700.jpg`, `halle-1400.jpg` | 3:4 portrait |
| Murano Bloom | `murano-700.jpg`, `murano-1400.jpg` | 3:4 portrait |
| Ledger Linear | `ledger-700.jpg`, `ledger-1400.jpg` | 3:4 portrait |
| Court Banquet | `court-700.jpg`, `court-1400.jpg` | 3:4 portrait |
| Ora Halo | `ora-700.jpg`, `ora-1400.jpg` | 3:4 portrait |
| Service section | `g1-*.jpg`, `g2-*.jpg` | 3:4 portrait |

## Making both sizes from one photograph

`resize.sh` does it with `sips`, which is already on every Mac:

```sh
cd assets/img
./resize.sh ~/Desktop/the-real-sevigne.jpg sevigne portrait
./resize.sh ~/Desktop/showroom-wide.jpg    hero    wide
```

Keep the names exactly as above and the page picks them up with no code change.

## Shoot dark

Fixture lit, room low. The page dims every photograph through a CSS filter, so a
bright, flat, evenly-lit shot has nowhere to go when the dimmer comes down — and
pale busy backgrounds fight the white type laid over them.

## Sources

| File | Unsplash |
| --- | --- |
| `hero-*` | unsplash.com/photos/647dYgB4olI |
| `band-*` | unsplash.com/photos/Uxjd-u0C8yM |
| `sevigne-*` | unsplash.com/photos/0zERrbey8XM |
| `halle-*` | unsplash.com/photos/PnGdZRc8w5Y |
| `murano-*` | unsplash.com/photos/Kd6rg_7XHzc |
| `ledger-*` | unsplash.com/photos/CzdrRlfRhok |
| `court-*` | unsplash.com/photos/Z9g0j4GzrmE |
| `ora-*` | unsplash.com/photos/vJ701Ia1z3A |
| `g1-*` | unsplash.com/photos/iL9UGdhqgSg |
| `g2-*` | unsplash.com/photos/vRs1id8Q1Vw |
