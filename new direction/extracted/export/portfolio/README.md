# Rapheal Suber — Portfolio (Editorial Archive)

A self-contained, drop-in version of the portfolio home. All paths are local — open `index.html` and it runs.

## Run it (no build step)
This version uses in-browser React + Babel, so it works on any static host (GitHub Pages, Netlify, Vercel static, S3) with **zero build tooling**.

- **Locally:** serve the folder (don't open via `file://`, the `.jsx` fetches need http). Any of:
  - `npx serve .`
  - `python3 -m http.server 8000`
  - VS Code "Live Server" extension
- Then visit the printed URL.

## File map
```
index.html        — entry; loads React/Babel + the 5 scripts below, in order
styles.css        — design-system entry (only @imports the tokens)
tokens/
  colors.css      — paper/ink/obsidian, clay + pine accents, light + dark themes
  typography.css  — Newsreader serif (display/name) + Hanken Grotesk + Geist Mono
  spacing.css     — 4px scale, sharp/pill radii, layout
  motion.css      — cinematic eases + durations
  base.css        — reset, type-role utilities, reveal helper
assets/work/      — project imagery (Celio, North Star, Illumi, Prox)
helpers.jsx       — Cursor, IntroCurtain, scroll-reveal hook
sections.jsx      — Nav (+ theme toggle), Hero, Archive case-file index
atmosphere.jsx    — Marquee, Ethos break (animated), Footer
overlays.jsx      — case-file takeover + About/Contact slide panels
app.jsx           — project data + page composition (edit your content here)
```

## Editing your content
- **Projects:** the `WORK` array at the top of `app.jsx` (title, code, year, disciplines, summary, detail, meta, images).
- **About / Contact:** `AboutContent` / `ContactContent` in `app.jsx`.
- **Theme tokens:** edit `tokens/*.css` — everything reads CSS custom properties, so a color/size change there propagates everywhere.
- **Light/Dark:** toggle in the nav; the choice persists to `localStorage` under `rs-theme`.

## Moving to a real build (Vite / Next / CRA)
The `.jsx` files are plain React (function components, hooks) but currently share scope via `window` for the no-build setup. To use them as ES modules:
1. Add `import React, { useState, useEffect, useRef } from 'react'` at the top of each file.
2. Replace each `Object.assign(window, { ... })` with `export { ... }`, and replace the cross-file `window.X` reads with real `import` statements.
3. Keep `styles.css` as a global stylesheet import; the tokens are framework-agnostic.
4. The fonts load from Google Fonts via `@import` in `typography.css` — keep, or self-host for offline.

(Ask the assistant to do this conversion for your specific framework — it's a mechanical pass.)

## Fonts
Loaded from Google Fonts: **Newsreader** (editorial serif — the name & display), **Hanken Grotesk** (body/UI), **Geist Mono** (labels/indices). No local font files required.
