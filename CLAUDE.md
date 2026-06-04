# Manuscript — agent guide

## Design system docs are a mirror of the code — keep them in sync

This repo ships a design-system documentation site at `/docs.html` (source in `src/docs/`,
modeled on Material/Carbon, organized by Atomic Design). The docs render the **real** components,
so behavior stays live — but token tables, prop/variant tables, **states matrices**, anatomy notes,
and code snippets are authored by hand and WILL drift unless you update them.

**Whenever you make a material change, update the matching doc page in the same PR/commit:**

| If you change… | Also update… |
|---|---|
| `src/index.css` `:root` tokens or motion/transition rules | `src/docs/pages/Color.jsx`, `Motion.jsx`, `Spacing.jsx` |
| `tailwind.config.js` (colors, fonts, radius) | `Color.jsx`, `Typography.jsx`, `Spacing.jsx` |
| `src/components/ui/button.jsx` or `badge.jsx` (variants, sizes, states) | `ButtonPage.jsx` / `BadgePage.jsx` — incl. the **States matrix** |
| `src/components/atoms.jsx` (`Eyebrow`, `TopLinks`, `Links`, `PlayTag`) | the matching Atoms/Molecules page + props/states |
| `src/components/Toggle.jsx` / `Stage.jsx` / `ReadRoom.jsx` / `PlayCanvas.jsx` | `TogglePage.jsx` / `StagePage.jsx` / `ReadRoomPage.jsx` / `PlayCanvasPage.jsx` |
| **Add / remove a component** | add or remove its page under `src/docs/pages/` AND its entry in `src/docs/routes.jsx` (which drives the sidebar nav) |

**Material change** = anything that alters a token value, a component's props/variants/sizes,
its visual states (hover/focus/active/disabled/selected), its anatomy, or the public API. Pure
refactors with identical output don't require doc edits.

**Definition of done:** `npm run dev` → open `/docs.html`, confirm the changed page reflects reality
(values, all states, snippets), and `npm run build` emits both `index.html` and `docs.html`.

## Repo orientation

- `src/index.css` — `:root` brand tokens + the "Two Rooms" stage machine (`.lj-*` classes).
- `tailwind.config.js` — brand palette + font families + radii (the Tailwind side of the tokens).
- `src/components/ui/` — shadcn-style primitives (`button.jsx`, `badge.jsx`).
- `src/components/atoms.jsx` — `Eyebrow`, `TopLinks`, `Links`, `PlayTag`.
- `src/components/{Stage,ReadRoom,PlayCanvas,Toggle}.jsx` — the "Two Rooms" architecture.
- `src/data/lj.js` — content model. `src/lib/utils.js` — `cn()` class combiner.
- `src/docs/` — the documentation site (separate Vite entry, `docs.html`). Does not touch the landing page.
