# Handoff brief — Rapheal Suber portfolio

Paste this alongside the folder when handing the project to another AI assistant (Gemini, Claude Code, Cursor, etc.).

## What you're working on
A personal portfolio for **Rapheal Suber** — a Human Factors Psychology graduate student (accelerated B.S./M.S., Embry-Riddle) working in **AI reliability, technical operations, and systems improvement**. He is targeting human factors roles in safety-critical domains: aerospace (NASA is an explicit goal), healthcare, and manufacturing.

**This is not a UX/product-design portfolio.** Do not reintroduce design-portfolio language ("my UX process", "Dribbble"-style case studies). Projects are framed as engineering and human-factors problem solving.

## Positioning
- Hero statement: "Building better systems through human-centered thinking."
- Case studies use exactly five headings: **Problem, Constraints, Approach, Outcome, Lessons Learned**.
- Audience: recruiters in human factors, aerospace, AI reliability, technical operations, systems engineering.

## Aesthetic direction (hold this line)
A **space console / kiosk**. The home screen is a constellation of glass spheres in deep space; you pick a channel rather than scroll a page.

- **Palette is cool-only:** deep space black `#05070C`, sky blue `#7EC8F0`, pale ice `#E8F1F8`, teal `#63C6BE`, indigo `#1B2340`. Dark is the default. Light mode is a warm-paper reading surface (the one warm exception).
- **Background:** sparse star field on canvas + comet-trail cursor. **No nebula halos, no warm aurora blobs** — these were explicitly removed. The cursor effect is enough.
- **Type:** Newsreader serif for display/name, Hanken Grotesk for body/UI, Geist Mono for labels, telemetry, and indices (uppercase, widely tracked).
- **Shape:** sharp corners (0) or fully pill — nothing between. Flat; no drop shadows.
- **Motion:** slow cinematic eases, no bounce. Intro curtain with counter, warp transition between channels, launch-sequence reveal inside case studies. Everything honors `prefers-reduced-motion`.
- **No em dashes in copy.** Use commas or colons. No emoji.

## Things the owner has explicitly rejected
- Warm clay/terracotta palette (replaced by cool space tones)
- Checkered/blueprint grid backgrounds
- Nebula halo lights in the background
- Instructional microcopy telling the user to scroll or hover ("the UX should be intuitive")
- A plain vertical list for the case studies index (now a mission-patch grid)
- Randomly name-dropping favorite films/media as decoration

## Good next tasks
- Convert to a real build (Vite) — see README step list
- Add real project imagery for Reach and the AI reliability work
- Deepen the Art channel so it has the same craft as the Science channel
- Mobile pass on the constellation console (nodes currently position by %)

## Do not
- Change the five case-study headings
- Add a second warm accent or gradient decoration
- Replace the kiosk model with a conventional scrolling one-pager
