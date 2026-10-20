# Hero stage — still frames

The five still frames of the hero story (e-mail → sketch → web part on an intranet page), drawn
before any animation is built. Scenario: *Intranet-News* (`hero.request.scenarios[2]`), plus the
result state of *Onboarding-Checkliste* and *Redaktionsplan*.

| Frame | What it shows |
|---|---|
| `f1-email` | Card „Anfrage per E-Mail“, request fully typed, key words underlined in blue |
| `f2-sketch` | Ruled paper: title, field labels, a wobbly box each, the button, one red margin note; „wird zu →“ |
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
2. **F2's right side is empty** on desktop: the arrow points at nothing until F3. Show a faint
   dashed outline of the page to come, or keep the empty space as the pause before the build?
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
