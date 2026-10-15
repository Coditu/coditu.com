# Migration — from the shipped system to Blueprint

**Current state (2026-10-15):** the live site (`app/globals.css`, `components/site/*`) still uses
the previous system — dark-first canvas `#EBEFF6` / `#07090E`, Satoshi, cobalt→aqua gradient,
radii 6–20 px. That system is documented in `docs/01-DESIGN-SYSTEM.md`, which is now **legacy**.
This file is the plan to move to Blueprint. Do it as separate PRs, in this order; each must pass
`npm run gate`.

## PR 1 — tokens + fonts (no visual redesign yet)

1. `lib/fonts/index.ts`: add `Geist` from `next/font/google` with `variable: "--font-geist"`,
   weights 400/500/600/700, `display: "swap"`. Add it to `fontVariables`. Keep JetBrains Mono.
2. `app/globals.css`: replace the token blocks (`:root, .light`, `.dark`, `@theme inline`) with
   [`tokens.css`](./tokens.css). Keep imports, `@custom-variant dark`, keyframes and the reveal
   rules. Keep `--ease-exit`, `--ease-drift`, `--dur-*` if the reveal rules still read them.
3. `scripts/verify-tokens.sh`: replace the "surface + ink", "status chip" and "grouping" needles
   with the new ones, e.g.
   `--paper: #f7f6f2`, `--paper: #0f1216`, `--ink: #14171c`, `--ink: #eceae4`,
   `--blueprint: #1f4fd8`, `--blueprint: #86a2ff`, `--cta: #ff8a1f`, `--line-input: #7d8189`.
   Keep every motion needle.
4. `app/layout.tsx` → `viewport.themeColor`: light `#f7f6f2`, dark `#0f1216`.
5. Rename classes in components (counts from a grep on 2026-10-15):

| Old class | New class | Notes |
|---|---|---|
| `border-hairline` (20) | `border-line` | |
| `border-hairline-strong` (12) | `border-line-input` on fields, else `border-ink` or `border-line` | decide per use |
| `bg-hairline` (4) | `bg-line` | |
| `text-ink-faint` (13) | `text-ink-muted` | one muted level now |
| `text-accent` (8) / `bg-accent` (4) | `text-blueprint` / `bg-blueprint` | `accent` is now shadcn's hover surface |
| `bg-raised` (6), `bg-overlay` (4) | `bg-surface` | |
| `bg-canvas` | `bg-paper` | |
| `rounded-control` (13), `rounded-section` (7), `rounded-card`, `rounded-inner`, `rounded-list` | `rounded-ui`, or `rounded-none` for sheets/sections | |
| `rounded-chip` (2) | `rounded-tag` | |
| `rounded-pill` (4) | `rounded-full` (status/avatars only) | |
| `signal-gradient` (6) | `bg-cta text-cta-ink` for the one CTA, otherwise remove | gradients are gone |
| `text-h4` (4) | `text-h3` | scale has 4 heading levels |
| amber / rose / jade / slate | `warning` / `error` / `success` / `ink-muted` | |
| chip-*, tone-*, group-*, rail/topbar/tabbar, ring-track | delete | belonged to the removed app |

## PR 2 — motifs and primitives

Create `components/blueprint/`: `sheet-label.tsx`, `sheet.tsx`, `crop-marks.tsx`,
`dimension-line.tsx`, `connector.tsx`, `sketch.tsx`. Create `components/ui/`: `button.tsx`,
`input.tsx`, `select.tsx`, `field.tsx`, `tag.tsx`, `status-pill.tsx`, `avatar.tsx`.
Specs: [`blueprint-motifs.md`](./blueprint-motifs.md) and [`components/`](./components/).
Add `bg-blueprint-grid` to the page wrapper.

## PR 3 — sections

Rebuild hero, sections, contact, footer from [`components/page-sections.md`](./components/page-sections.md).
Replace `SignalRule` / `signal-trace` (gradient motifs) with dimension lines and connectors.
Logo → `CoditusMark variant="mono"`.

## PR 4 — clean-up

- Remove Satoshi files and the `satoshi` export once nothing references `--font-satoshi`.
- Mark `docs/01-DESIGN-SYSTEM.md` as history (keep the file; it explains past decisions).
- Update `e2e/marketing.spec.ts` assertions that check old colors or classes.

## Open decisions (team, not the agent)

| Question | Default if nobody decides |
|---|---|
| Wordmark font: keep Satoshi in the logo lockup, or redraw in Geist? | keep the existing lockup SVGs; only the site text moves to Geist |
| Favicon / OG images use the gradient mark | keep until a mono set is rendered with `npm run brand:assets` |
| DE/EN: the copy is English-only today | `/` German + `/en` English, both statically prerendered; copy as `{ de, en }` in `lib/marketing-content.ts` |
| Keep the per-word blur headline (`cd-word`)? | keep — it is CSS-only and tested; it is the one "felt" motion |
