# A Song of Types and Agents — the deck

A custom, world-built talk deck for the AI Engineer World's Fair (online, recorded):
**how TypeScript is taking the AIron Throne.** Built as a React + Vite + Framer Motion
app (not reveal.js) so the Game-of-Thrones throughline could be rendered as an
illuminated-manuscript / heraldic *realm* rather than a slide template.

## Run

```bash
npm install
npm run dev      # → http://localhost:5173
```

## Present

- **→ / Space / Enter** — next (advances fragments within a folio, then the next folio)
- **← / Backspace** — back
- **N** or **S** — toggle the **presenter-notes overlay** (your cue cards, lifted from the
  delivery plan; not visible to the audience — turn it off before recording the take)
- **Home** — jump to folio 1

It runs in a fixed 16:9 stage that letterboxes to any window; just share/record the tab full-screen.

## The world

The protagonist is the **crown**, not a person — you are never on screen as a character.
The three **houses** contend for the throne:

| House | Color | Role |
| --- | --- | --- |
| TypeScript | vermilion `#e0552c` | the riser / the app / the new throne |
| Python | teal `#5cc6b0` | the incumbent / the brain / conceded turf |
| JavaScript | muted tan | the deposed old king |

Persistent **realm chrome** shows the current Book (chapter), who holds the throne (the
sigil flips teal→vermilion at folio 9, the memorable moment), and a war-for-the-throne
progress rule. Narrative beats are fully world-built (throne, sigils, ravens, proclamations,
the road, the bannermen); the **data and code folios stay clean and editorial** — the
"standard slides in the middle."

## Edit content

- **`src/data/slides.ts`** — all 20 folios: assertion titles (verbatim from `02-slides-content.md`),
  fragment counts (`steps`), and presenter cue cards (`notes`, verbatim from `03-delivery-plan.md`).
  Inline accent tags in statements: `<ts>…</ts>`, `<py>…</py>`, `<em>…</em>`.
- **`src/data/chapters.ts`** — the Books and the throne-holder-per-folio rule.
- **`src/index.css`** — design tokens (palette + type), lifted from `04-slides-style.md`. Type
  scale is in container-query units (`cqw`) so everything scales with the 16:9 stage.
- **`src/components/scenes/`** — one component per layout (title, throne, statement, split,
  road, data, code, bannermen, quote).
- **`src/components/world/`** — the hand-built SVG primitives (Throne, HouseSigil, Raven).
- **`src/components/charts/`** — the four decluttered SVG charts (folios 7, 10, 12, 13).

## Notes / deliberate choices

- **No PDF export.** Agreed for an animation-heavy recorded talk — present/record from the running app.
- **Folio 14 ("the bannermen")** renders the tools as a typographic wordmark wall, not sourced
  brand logos, to honor the style spec's "no sourced/generated images" rule. Swap in real SVG
  logos here if you'd prefer actual logos.
- **Folio 9** splits the verbatim assertion into a setup heading + the deadpan punch line to
  remove on-slide redundancy; the full sentence's content is preserved across the folio.
- **Closing byline** uses `ratel.sh` as the handle placeholder — swap for a social handle if you want.
- Every visual is hand-built SVG; no images are generated or fetched. Every number traces to
  `01-content-brief.md`.
