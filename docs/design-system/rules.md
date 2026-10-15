# Rules — do / don't, and the review checklist

## Do

- Orange **once per screen**, for the most important action.
- Blue for lines, grid, links, app buttons, active states, sheet labels.
- Start each section with a sheet label („Blatt 02 · Arbeitsweise“).
- Show sketch and live UI side by side, joined by a dashed connector.
- 1 px lines, flat fills, 2–4 px radius.
- Mono only for labels, tags, metadata, drawing annotations — uppercase, ≥ 11 px.
- Mark illustrative data „Beispiel“ / "Example".
- German first; every string also in English; both in `lib/marketing-content.ts`.
- Real team photos, real project names from `docs/00-CONTEXT.md`.

## Don't

| Don't | Why / instead |
|---|---|
| Two orange things on one screen (incl. icons, borders, highlights) | Orange = "the action". Second action → `outline` |
| White text on orange | 2.4:1. Use `text-cta-ink` |
| Gradients, glass, blur, glow, big soft shadows | Flat drawing. Only `shadow-lift` on live mockups |
| `rounded-lg`+, pill buttons, pill cards | `rounded-ui` (4 px). Pills = status only |
| `border-line` on inputs | 1.3:1. Use `border-line-input` |
| Mono for sentences, mono under 11 px | Unreadable |
| Raw hex / rgb / arbitrary colors in components | Tokens only |
| Status color as the only signal | Add a word or icon |
| Invented metrics, clients, testimonials, logos | `docs/00-CONTEXT.md` non-negotiables |
| Stock photos, emojis, playful illustrations | Not our register |
| Hype words (seamless, cutting-edge, empower…) | Voice rules in `docs/00-CONTEXT.md` |
| More drawing motifs than the budget | See `blueprint-motifs.md` budget table |
| Gradient logo | `CoditusMark variant="mono"` |
| Text in components | Copy in `lib/marketing-content.ts` |

## Review checklist (run before saying "done")

Copy this into the PR description and tick it.

```
Tokens
[ ] No raw hex/rgb/px colors; only classes from tokens.md
[ ] Spacing only 1/2/3/4/6/8/12/16/24 (optical 1.5/2.5 inside chips)
[ ] Radius: tag 2 / ui 4 / none / full(pills, avatars) only

Brand
[ ] Max one bg-cta in any viewport, with text-cta-ink
[ ] Section starts with a SheetLabel
[ ] Motifs within budget; decorative SVG aria-hidden
[ ] Logo is mono

States
[ ] default / hover / focus-visible / disabled (+ error on fields) all styled
[ ] Focus ring visible on paper, surface and blue-light

Accessibility
[ ] Real <button>/<a href>/<label>/<fieldset>; icon-only buttons have aria-label
[ ] Text ≥ 4.5:1 (≥ 3:1 at 24 px+), field borders ≥ 3:1 — both themes
[ ] Targets ≥ 44 px; one h1 per page; heading order correct
[ ] Works with prefers-reduced-motion

Layout
[ ] No horizontal scroll at 320, 375, 768, 1024, 1440
[ ] Dark mode checked (.dark on <html>)

Content
[ ] All strings in lib/marketing-content.ts, DE + EN
[ ] Nothing invented; demo data marked „Beispiel“
[ ] Spelling: „Maßstab“, dates 23.10., „33 %“

Build
[ ] Server Component unless it needs the client (.client.tsx)
[ ] / still prerendered; npm run gate -- --fast passes
```
