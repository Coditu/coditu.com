# Hero stage — still frames

The five still frames of the hero story (e-mail → sketch → web part on an intranet page), drawn
before any animation is built. Scenario: *Intranet-News* (`hero.request.scenarios[2]`), plus the
result state of *Onboarding-Checkliste* and *Redaktionsplan*.

| Frame | What it shows |
|---|---|
| `f1-email` | Card „Anfrage per E-Mail“, request fully typed, key words underlined in blue |
| `f2-sketch` | Ruled paper: title, field labels, a wobbly box each, the button, one red margin note; „wird zu →“; the page faint, its web-part slot empty |
| `f3-webpart` | The intranet page (top bar „Intranet“, grid icon, page title, 2 greyed web parts) with the new, empty web part |
| `f4-filled` | Values in the form and in handwriting on paper; the last field is the active pair |
| `f5-result` | Red tick + „Fertig!“ on paper; the news card on top of the feed; „Live“ pill |
| `result-onboarding`, `result-redaktionsplan` | The result state of the other two scenarios: checklist card, new row in the plan table |

Each at desktop (`-desktop`, the stage at 528 px) and phone (`-phone`, 343 px = a 375 px screen),
light and dark. From F4 on, the phone card is shown from both sides (`-paper`, `-webpart`).

## Where it lives

- `components/site/hero-stage/frame.tsx` — `<HeroFrame frame scenario labels side? />`, static,
  a Server Component. Reuses `Sketch`, `parse` (now in `scenario.ts`), `Pill`, `controlClasses`,
  `buttonClasses`.
- `app/dev/hero-frames` — the review page, all frames side by side. `notFound()` in production;
  not in `lib/i18n.ts` → `pages`, so not in the sitemap.
- Regenerate the PNGs: `npm run dev`, then `npm run hero-frames`.
- The live hero (`<HeroStage>`) is unchanged.

## Motion direction (planned, not built)

The frames are drawn for this; nothing moves yet.

- **Restraint.** One thing in focus per moment, big type, lots of space. Animate `transform` and
  `opacity` only; the two exceptions are named below.
- **One easing:** `--ease-entrance` (`cubic-bezier(0.16, 1, 0.3, 1)`, already in
  `app/globals.css`), for every move.
- **A camera, not cuts.** From F2 on every frame is the same composition — paper, arrow, page — and
  only the contents change. A transition scales and translates one wrapper around the stage (the
  camera) and swaps the contents under it; the layout never changes between frames. That is why the
  page is already on F2, faint (`opacity-40`), with an empty dashed slot where the web part goes.
  It is out of shot while the camera is on the paper. (Answers open question 2.)
- **Hooks.** `data-frame` on the stage; `data-part` on what moves: `email`, `paper`, `arrow`,
  `page`, `slot` (F2 only), `webpart`, `result`.

### Per frame

Camera = scale of the wrapper and its `transform-origin` (in % of the stage). The layout is fixed
(stage height, `2fr 40px 3fr` grid), so the origins are constants, not measured.

| Frame | In focus | Camera | Moves in | Moves out |
|---|---|---|---|---|
| F1 `email` | the request text, key words underlined | 1, centre | the e-mail card (opacity 0 → 1, scale 0.96 → 1) | — |
| F2 `sketch` | the paper | ~1.6 on the paper (origin ≈ 20 % 50 %) | paper (blur → sharp), the pen strokes | e-mail card (scale up past the lens + fade) |
| F3 `webpart` | the new web part on the full page | pull back to 1, centre | page to full opacity; web part in the slot (clip-path wipe, top → bottom); arrow | slot outline (under the web part) |
| F4 `filled` | the last field pair — paper box and form field | 1 (wide); narrow: on the web part side | values (opacity), active outline | — |
| F5 `result` | the result card | slight push in, ~1.1 on the web part (origin ≈ 70 % 40 %) | result card lands (translateY −12 px → 0, opacity); tick and „Fertig!“; „Live“ pill | the form (opacity) |

Narrow (one card): no camera pan across, the card turns from paper (F2) to web part (F3–F5);
the same scale + blur → sharp on the card.

### Hero loop

8–10 s per scenario, calm: ~1.5 s per frame plus ~0.4 s transitions, a ~2 s hold on F5, then F1 of
the next scenario. Transition = outgoing scale 1 → 1.04 + opacity → 0; incoming scale 0.96 → 1 +
blur 6 px → 0 + opacity → 1, 500–700 ms. Pauses off screen and in a hidden tab, as now.

### Section „Von der E-Mail zur App“ (under the hero)

Same five frames, scroll-driven: a tall section (~5 × 100 vh) with a sticky stage; CSS
`animation-timeline: view()` on the section (`scroll()` not needed), `animation-range` splits it into
five ranges. No library, no JS on the scroll path. Beats: zoom into the paper on F2, pull back to the
full intranet page on F3, web part revealed with a clip-path wipe, result card lands on F5. One
big-type caption per frame beside the stage (copy in `messages/*.ts`, to be written; none yet).

**Fallback** — `@supports not (animation-timeline: view())` or `prefers-reduced-motion: reduce`:
the five `<HeroFrame>`s stacked as stills, each with its caption, no sticky. That is the default
markup; the scroll version is the enhancement on top.

### Known limits

- **`filter: blur()` and `clip-path` are not transform/opacity.** Both repaint in some engines.
  Kept small: blur only on the incoming layer, ≤ 6 px, only during the transition; the wipe only on
  the web part box. If either janks on a mid phone, drop the blur first (scale + opacity alone).
- **Redaktionsplan's new row** is a `display: contents` wrapper around grid cells, so it has no
  box to transform and no `data-part`; it lands by opacity only. A real row element fixes it if needed.
- `prefers-reduced-motion` already caps all animations at 120 ms (`app/globals.css`); the scroll
  section must use the stacked fallback instead, not a fast scroll animation.

## Decisions taken here

- **Handwriting: Caveat**, already in the repo (`lib/fonts`), self-hosted by next/font, not
  preloaded. Cost: **one latin woff2 of 74.6 KB**, fetched only when a `.cd-hand` glyph renders;
  **0 KB JS**. Not counted by `npm run budgets` (JS only).
- **Wide vs narrow is a container query on the stage** (`@min-[26rem]`, 416 px), not the
  viewport. The stage is 432–528 px at lg+ and 343 px on a phone, so the result is the same as
  „lg+“ on the site, and the review page can show both widths on one screen.
- **Paper stays light in dark mode** via `.cd-paper` in `app/globals.css`, which resets
  `--surface`, `--line`, `--blueprint` and `--pen-red` to their light values inside the sheet.
- The dark token block is now `[data-theme="dark"]` instead of `:root[data-theme="dark"]`, so a
  subtree can be dark (the review page's dark column). On the site the attribute is only on `<html>`.
- **13 px minimum in the web part** held by simplifying: the older news posts have no image box,
  the placeholder web parts are two bars each, the plan table puts the owner under the topic
  instead of a third column.

## Open questions

1. **The paper is small on desktop.** At 40 % of a 528 px stage the 3:4 sheet is ~200 px wide and
   ~260 px tall in a 460 px stage; the handwriting renders at ~12–13 px and there is empty space
   above and below. A taller sheet (more ruled lines) or 45/55 would read better. Keep 40 %?
2. ~~**F2's right side is empty**~~ — taken: the page is there, faint, with an empty slot (see
   *Motion direction*). The camera needs it for the pull-back on F3.
3. **Phone, „one card“:** read here as one slot that shows the paper (F2) and then the web part
   (F3–F5), like the two sides of a card. If it meant paper and web part stacked in one card,
   the 440 px height does not fit both at 13 px.
4. **The tick crosses the filled boxes** (it is the existing `Sketch` tick). Smaller tick in the
   empty space under the button instead?
5. **Long button labels truncate on paper** („Veröffentlich… →“) — `Sketch` cuts at 14
   characters. Shorter button copy, or a wider sketched button?
6. **„wird zu“ wraps** onto two lines in the 40 px gutter. Fine as a hand note, or widen the gutter?
7. **White paper in dark mode** is the brightest thing on the screen. Use `#f7f6f2` (light
   `--paper`) for the sheet in dark mode to soften it?
8. **Caveat's 74.6 KB.** A subset to the glyphs the sketch uses (A–Z, a–z, 0–9, äöüß, `.,&!→…`)
   would be a few KB, but needs `next/font/local` and a subsetting step. Worth it?
9. **English frames** are not shot; `messages/en.ts` has the same strings. Shoot `/en` too?
10. **Old web-part files** (`web-parts/*.tsx`, `intranet-frame.tsx`) still carry 11–12 px text and
    stay as they are for the live hero. When the animation is rebuilt on these frames, they go.
