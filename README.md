# Lai-Jing Chu — Manuscript

The **Manuscript** direction of LJ's personal landing page: a literary, serif-led
editorial layout with a **3D-flip** transition between two rooms.

- **Read room** — the structured, linear story (intro · strengths · Syllabind · a
  testimonial · now).
- **Play room** — a full-screen creative-coding canvas. Ships with a **three.js**
  point-field scaffold; swap it for your real sketch.

One toggle in the top bar flips the whole stage between Read and Play.

---

## Run it

### No build (instant)
Open **`preview.html`** in a browser. It loads React + three.js from a CDN — no
install step. Good for a quick look or sharing.

> Note: the canvas and transitions only animate in a **visible** tab.

### Full project (Vite + shadcn/ui)
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Stack
- **React 18** + **Vite**
- **Tailwind CSS** with LJ's brand tokens (`tailwind.config.js`)
- **shadcn/ui** components (`src/components/ui/*`, New York style) — `Button`, `Badge`
- **three.js** for the Play-room canvas (`src/components/PlayCanvas.jsx`)

## Where things live
```
src/
  App.jsx                 # this direction's theme + config
  index.css               # brand tokens + the "Two Rooms" transition CSS
  data/lj.js              # all copy + links (edit here)
  lib/utils.js            # cn() helper (shadcn)
  components/
    Stage.jsx             # top bar + Read/Play toggle + room transitions
    Toggle.jsx            # segmented Read/Play control
    ReadRoom.jsx          # the structured content (unique per direction)
    PlayCanvas.jsx        # three.js generative scaffold (replace me)
    atoms.jsx             # Eyebrow / links / play labels
    ui/                   # shadcn/ui primitives
```

## Brand palette
Paper `#FAF6EC` · Ink `#15131F` · Indigo `#28289C` · Gold `#86632C` · Label `#56566E`

## Customize the transition
In `App.jsx`, `transition` accepts `flip` · `iris` · `cover` · `dissolve`
(all defined in `src/index.css`). Manuscript ships with `flip`.
