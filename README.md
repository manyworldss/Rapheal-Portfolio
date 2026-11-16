# Rapheal Suber — Portfolio

A personal portfolio for human factors, UX research, and software development. The console-inspired home opens a horizontal, keyboard-accessible project library: Reach, Celio, Birk Aerosystems, Prox, and upcoming Runa.

## Preview

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. The homepage loads React and Babel from a CDN, so its first load requires an internet connection.

## Edit and build

Canonical homepage components and project records live in `ui_kits/portfolio/`. Theme and console styles live in `tokens/`. Run:

```sh
node scripts/build-standalone.js
```

This rebuilds the root homepage, the standalone homepage export, the Celio/Birk/Runa article pages, and the legacy nested entry point. Edit source components rather than the generated HTML. Prox and Reach retain their existing full articles.

- `ui_kits/portfolio/work.jsx`: project copy, metadata, image paths, and photo slots.
- `ui_kits/portfolio/sections.jsx`: console home and horizontal cartridge library.
- `tokens/console.css`: light/dark palette, responsive console styling, reduced-motion rules.
- `scripts/build-project-pages.js`: current project articles generated from the same records.
- `assets/work/celio-ios-*.png`: captures of the current Celio GitHub Pages marketing site, including its illustrative phone mockups.

## Adding Birk photos or Runa details

Birk's `photoSlots` are labeled placeholders, not sample client imagery. Add approved files under `assets/work/`, set `thumb` / `hero`, and replace the placeholders with `gallery` entries (`src` and `caption`) in `work.jsx`. Update Runa's upcoming record when its details are ready, then rebuild.

## Interaction

The project library supports touch swipes, a native horizontal scrollbar, previous/next controls, project indicators, and left/right arrow keys while the rail is focused. Parallax is disabled for reduced motion. Case-study dialogs close with Escape, trap keyboard focus, and restore focus to the opener. The light/dark choice persists locally.
