# Rapheal Suber — Portfolio (Space Console)

A self-contained, drop-in version of the portfolio. All paths are local — serve the folder and it runs. No build step.

## Run it
Uses in-browser React + Babel, so it works on any static host (GitHub Pages, Netlify, Vercel static, S3) with **zero tooling**.

Serve the folder (don't open via `file://` — the `.jsx` fetches need http):
- `npx serve .`
- `python3 -m http.server 8000`
- VS Code "Live Server"

## What this is
A "kiosk" portfolio: the home screen is a **constellation console** — five glass spheres floating in deep space over a live star field. Clicking a sphere fires a colored warp transition and swaps to that channel as its own full-screen view. There is no long scrolling home page.

Channels: **Case Studies**, **Science**, **Art**, **About**, **Contact**.

## File map
```
index.html        — entry; loads React/Babel + the 5 scripts below, in order
portfolio-pdf.html— print/PDF version (doc-page component, paper styling)
doc-page.js       — paged-document web component used only by the PDF version
styles.css        — design-system entry (only @imports the tokens)
tokens/
  colors.css      — void/ice/sky/teal space palette + warm paper light mode
  typography.css  — Newsreader serif (display) + Hanken Grotesk + Geist Mono
  spacing.css     — 4px scale, sharp/pill radii, layout
  motion.css      — cinematic eases + durations
  base.css        — reset, type-role utilities, reveal helper
assets/work/      — project imagery
helpers.jsx       — star-field canvas + comet-trail cursor (BlueprintBg),
                    IntroCurtain, Sphere, ScrollProgress, scroll-reveal hook
sections.jsx      — Nav (+ theme toggle), KioskHero console, CaseStudies
                    mission-patch grid, MissionCard
currently.jsx     — Science channel (space human-factors facts + sources)
                    and Currently/Art shelf (media picks, daily shuffle)
overlays.jsx      — case-study takeover with the launch-sequence reveal
app.jsx           — WORK data, About/Contact content, view router
```

## Editing your content
- **Case studies:** the `WORK` array at the top of `app.jsx`. Each entry has `code`, `title`, `year`, `disciplines`, `blurb`, a `sections` object (Problem / Constraints / Approach / Outcome / Lessons Learned), and `meta`.
- **Science facts:** the `FACTS` array in `currently.jsx` — `{ tag, t, body, src, url }`. Featured fact rotates daily; "Next transmission" re-rolls.
- **Art / media picks:** the collection array in `currently.jsx`.
- **About / Contact:** `AboutContent` / `ContactContent` in `app.jsx`.
- **Console channels:** `KIOSK_NODES` in `sections.jsx` (position `x`/`y` as %, size, gradient colors, glow). Routing lives in `App` in `app.jsx`.
- **Theme tokens:** `tokens/*.css`. Everything reads CSS custom properties.
- **Light/Dark:** nav toggle, persisted to `localStorage` under `rs-theme`. Dark is default.

## Moving to a real build (Vite / Next)
The `.jsx` files are plain React (function components, hooks) but share scope via `window` for the no-build setup. To convert:
1. Add `import React, { useState, useEffect, useRef } from 'react'` to each file.
2. Replace each `Object.assign(window, { ... })` with `export { ... }`, and replace cross-file `window.X` reads with real imports.
3. Keep `styles.css` as a global stylesheet import; tokens are framework-agnostic.
4. Fonts load from Google Fonts via `@import` in `typography.css` — keep or self-host.

## Fonts
Google Fonts: **Newsreader** (display), **Hanken Grotesk** (body/UI), **Geist Mono** (labels, telemetry, indices).

## Accessibility / performance notes
- All motion honors `prefers-reduced-motion` (star drift, twinkle, comet trail, warp, launch stages).
- The star field is a single `<canvas>` sized to DPR, redrawn on one `requestAnimationFrame` loop; the comet trail is capped at 240 particles.
- The custom cursor and comet trail are disabled on coarse pointers (touch).
