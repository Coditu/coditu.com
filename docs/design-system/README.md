# Coditu Design System — "Blueprint" (Rev. A)

The rules every new UI in this repo follows. Written for agents first: short files, tables over
prose, one topic per file. **Read this file in full, then only the file for the part you are building.**

Visual source: the Claude Design canvas *Coditu Website* → artboards **Coditu – Designsystem (Rev. A)**
and **Hero – Test des Designsystems**. Where the canvas and these docs disagree, **these docs win**.

> Status: this spec is approved; `app/globals.css` still ships the previous system.
> Until the migration in [`migration.md`](./migration.md) lands, build new components against
> [`tokens.css`](./tokens.css) names and note the dependency in the PR.

---

## Files — what to read when

| You are building… | Read |
|---|---|
| anything | this file |
| something that needs a color, size, space, radius | [`tokens.md`](./tokens.md) |
| the CSS itself (globals, Tailwind v4 theme) | [`tokens.css`](./tokens.css) |
| grid paper, crop marks, dimension lines, sheet labels, sketch→live | [`blueprint-motifs.md`](./blueprint-motifs.md) |
| a button or link | [`components/buttons.md`](./components/buttons.md) |
| an input, select, date range, form | [`components/forms.md`](./components/forms.md) |
| a card, tag, status pill, avatar, stat tile, progress bar | [`components/data-display.md`](./components/data-display.md) |
| a kanban board or task card | [`components/kanban.md`](./components/kanban.md) |
| nav bar, section header, footer, team card, feature item, hero, services | [`components/page-sections.md`](./components/page-sections.md) |
| a review of finished work | [`rules.md`](./rules.md) (do / don't + checklist) |
| moving the live site onto this system | [`migration.md`](./migration.md) |

Voice, company facts and things that must never ship: [`../00-CONTEXT.md`](../00-CONTEXT.md).

---

## The idea in one paragraph

Coditu turns paper sketches into working software. The UI looks like a **technical drawing**:
off-white paper with a faint blue grid, 1 px lines, crop marks, dimension lines, monospace sheet
labels (`BLATT 01 · ARBEITSWEISE`). Sketches (dashed, mono, blue) sit next to the finished "live" UI
(white, solid, Geist). Calm, precise, technical, friendly. Never flashy.

## The 12 hard rules

1. **Tokens only.** No hex, rgb or px value that is not in `tokens.md`. Use the Tailwind classes it lists.
2. **Orange once per screen.** `bg-cta` is for the single main action of the viewport. Nothing else is orange — no icons, borders, highlights.
3. **Ink on orange, never white.** `text-cta-ink` (#14171C, 7.6:1). White on orange is 2.4:1.
4. **Blue is the drawing ink.** Lines, grid, links, app buttons, active states, sheet labels.
5. **Flat.** No gradients, no glass, no blur on surfaces. Shadow only `shadow-lift` on "live" UI mockups.
6. **Small radius.** `rounded-tag` (2 px) tags, `rounded-ui` (4 px) controls and cards, `rounded-none` sheets, `rounded-full` only for status pills, avatars, dots.
7. **1 px borders.** 2 px only for the focus ring.
8. **Two fonts.** Geist for headings and text. JetBrains Mono only for labels, tags, metadata, numbers in drawings — uppercase, tracking 0.08em, **never under 11 px**, never for running text.
9. **Sections start with the heading.** No numbered sheet labels („Blatt 02 · …“), no „Rev. A“ meta line.
10. **WCAG 2.2 AA, both themes.** Text 4.5:1 (3:1 at ≥ 24 px), field borders 3:1, visible `:focus-visible`, targets ≥ 44 px, real `<button>` / `<a href>` / `<label>`.
11. **Copy lives in `messages/de.ts` + `messages/en.ts`**, German first, English second. Components hold no strings. Invent nothing (no metrics, clients, testimonials).
12. **Mobile first.** Works at 320 px with no horizontal scroll. Desktop is the enhancement.

## How to build a new component (agent workflow)

1. Find the closest spec in `components/*.md`. If one exists, follow its anatomy and classes exactly.
2. If none exists, compose from existing parts. New visual ideas must use only `tokens.md` values.
3. Put it in the right place:
   - drawing primitives → `components/blueprint/` (`sheet-label.tsx`, `crop-marks.tsx`, …)
   - generic UI (button, input, tag) → `components/ui/`
   - page sections → `components/site/`
   - interactive files end in `.client.tsx`; everything else stays a Server Component.
4. Merge classes with `cn()` from `lib/utils.ts`. Variants as a typed `variant` prop, not ad-hoc classes.
5. Add all states: default, hover, `focus-visible`, disabled (and error for fields).
6. Check dark mode (the nav toggle, or emulate `prefers-color-scheme: dark`) and 320 px width.
7. Run the checklist at the bottom of [`rules.md`](./rules.md), then `npm run gate -- --fast`.

## Stack facts that change how you write code

- **Tailwind v4.** No `tailwind.config.js`. Theme lives in CSS (`@theme`) — see `tokens.css`.
- **Next.js 16 / React 19.** Read `node_modules/next/dist/docs/` before using a Next API (see `CLAUDE.md`).
- `/` must stay statically prerendered. No `cookies()`, `headers()`, `searchParams`.
- Icons: `lucide-react`, `strokeWidth={1.5}`, 24 px (20 px inline, 16 px in dense UI). Color via `currentColor`.
- Dark mode: `data-theme="dark"` on `<html>` — the nav toggle's saved choice, else the system setting. Variant `dark:` maps to that attribute.

## Vocabulary

| Term | Means |
|---|---|
| Blatt / Sheet | One section, drawn like a sheet of a technical drawing |
| Sheet label | The mono label at the top of a section: `BLATT 02 · ARBEITSWEISE` |
| Skizze / Sketch | Wireframe version: dashed blue lines, mono text, no fills |
| Live | Finished UI: white surface, solid border, Geist, may have `shadow-lift` |
| CTA | The one orange button on a screen |
| App button | Blue filled button used inside product UI and demos |
