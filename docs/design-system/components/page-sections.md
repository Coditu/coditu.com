# Page sections — nav, hero, section header, feature, team, footer

Page wrapper: `<body>` gets `bg-blueprint-grid` (or the hero section only, if the full-page grid
is too busy on a given page). Content container:

```tsx
<div className="mx-auto w-full max-w-page px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0">…</div>
```

## Logo

Use the existing mark: `CoditusLockup` / `CoditusMark` from `components/coditu/coditus-mark.tsx`
with **`variant="mono"`** (`currentColor` → `text-ink`). The gradient variant breaks the
"no gradients" rule. The blue square with a crosshair seen on the design canvas is a placeholder,
not the logo. Clear space ≥ 0.5 × mark height; minimum mark 20 px.

## Nav bar

| Part | Spec |
|---|---|
| Bar | `<header>`, `h-16 lg:h-[84px]`, `flex items-center justify-between gap-6 border-b border-line`, sticky optional (`sticky top-0 z-10 bg-paper/95`) |
| Logo | left, links to `/`, `aria-label="Coditu Startseite"` |
| Links | `<nav aria-label="Hauptnavigation">`, `hidden lg:flex gap-10 text-[15px] font-medium`, `text-ink hover:text-blueprint`; current page `text-blueprint underline underline-offset-[6px]` + `aria-current="page"` |
| Language switch | `font-mono text-[12px] uppercase` `DE / EN`; active: `text-ink font-semibold border-b border-ink` + `aria-current="true"`; other: real `<a href hreflang="en" lang="en">` `text-ink-muted`. Wrapped in `role="group" aria-label="Sprache"` |
| Action | `outline` button `sm` „Gespräch buchen“ — **not** orange (the hero owns the orange) |
| Mobile | links move into a menu button (`aria-expanded`, `aria-controls`), sheet below the bar, full-width 44 px rows |

## Section header

```tsx
<div className="grid gap-6 lg:grid-cols-12 lg:items-end">
  <div className="lg:col-span-7">
    <h2 className="text-h1 max-w-[18ch]">So arbeiten wir: Sie sehen jeden Schritt.</h2>
  </div>
  <p className="text-lead text-ink-muted lg:col-span-5 max-w-[46ch]">{intro}</p>
</div>
```

Content starts `mt-12` below. One heading + optional intro. No numbered sheet labels („Blatt 02 · …“) and no sheet meta line („Rev. A“): they read as decoration. Sections start with the heading.

## Hero

The only place for `text-display` and the page's orange CTA.

| Part | Spec |
|---|---|
| Section | `grid lg:grid-cols-12 lg:items-center`: text `lg:col-span-6` left, stage `lg:col-span-6` right; on phones the stage follows the text. No sheet meta line. |
| Copy | blue label → `<h1 class="text-display mt-5">` → `text-lead text-ink-muted mt-6 max-w-[56ch]` → buttons `mt-9` (`cta lg` + `outline lg`) → facts row → team |
| Stage | `<HeroStage>` (`components/site/hero-stage/`), plays by itself — the visitor types nothing. See *Hero stage* below. |
| Headline | the slogan „Von der Skizze zur fertigen Software“ + a blue period `<span class="text-blueprint">.</span>` |
| Facts row | `mt-12 grid sm:grid-cols-3 gap-4 border-t border-ink`, each a 15 px semibold fact (no T.01 ids shown). Facts must be true (see `docs/00-CONTEXT.md`). |
| Mobile | stage below copy; sketch and web part are one card; arrow and placeholder web parts hidden |

Reference: canvas artboard *Hero – Test des Designsystems*.

### Hero stage — e-mail → sketch → web part

A **sketch → live** pair ([`../blueprint-motifs.md`](../blueprint-motifs.md) §7) told as a story.
One timer-driven phase machine (`use-sequence.ts`), no animation library. Per scenario in
`hero.request.scenarios`:

| # | Phase | What happens |
|---|---|---|
| 1 | E-mail | Card „Anfrage per E-Mail“; the request types itself out with a caret, then its `[key words]` are underlined in blue one by one. |
| 2 | Sketch | The underlined words fly onto a sheet of ruled paper: the first lands as the handwritten title, the rest as field labels. The pen draws a wobbly box under each label, then the button, then a red margin note (`hero.request.note`). |
| 3 | Build | „wird zu →“ draws (lg+ only) and a neutral intranet page (`intranet-frame.tsx`) appears beside the paper: a top bar with a plain grid icon and „Intranet“, a page title, greyed placeholder web parts (lg+). The new web part assembles in it: header with the first word as title, then a small „new item“ form with the sketched fields, styled with `controlClasses` / `buttonClasses` from `components/ui` — spans, not inputs. The last field is a choice (chevron on paper, select look in the web part). No product logos, no real client UI. |
| 4 | Fill | Each field fills with `values[i]` at typing speed, with a caret; the same value appears in handwriting in the sketch box. The active pair is lit in both. |
| 5 | Send | A pointer glides to the button, presses it, „Wird gesendet …“ (~900 ms); then the item lands in the web part as real content (`web-parts/*.tsx`, chosen by `result.kind`): a checklist card with its tasks (`checklist`), a new row between the planned ones (`calendar`), a news card at the top of the feed with its approval pill (`news`). On paper a big red tick and „Fertig!“; then the „Live“ pill in the web part header. |
| 6 | Out | Holds ~3 s, fades, next scenario. Pauses off screen or in a hidden tab. |

- **Layout.** Fixed stage height (`h-[440px] lg:h-[460px]`), so nothing jumps between phases or scenarios. lg+: the e-mail spans the width; from phase 2 paper left (~40 %), arrow, intranet page right (~60 %). Below lg: paper and web part share one slot — the sketch draws, then crossfades into the web part; the placeholder web parts are hidden.
- **Long values** truncate with „…“ on paper and in the web part.
- **Example data.** Each scenario's `result` holds the rows already in its web part (tasks, planned topics, older news) — example data, marked by the „Beispiel“ tag; nothing about real clients.
- **Color.** Blue is the pen; red (`text-pen-red`) only for the margin note and the tick. Handwriting is Caveat (`.cd-hand`, `--font-caveat`), self-hosted by next/font, not preloaded.
- **Accessibility.** The stage is `aria-hidden` with one sr-only sentence (`hero.request.summary`); nothing in it is focusable. Marked „Beispiel“.
- **Reduced motion.** No typing, drawing, flying or pointer: three still frames — e-mail, sketch + filled web part, the item in the web part — switched every few seconds.
- **No flash.** The server renders the first request fully typed.
- **Still frames.** `frame.tsx` renders each frame statically (`frame="email" | "sketch" | "webpart" | "filled" | "result"`); review at `/dev/hero-frames` (dev only), PNGs and open questions in [`../hero-frames/`](../hero-frames/README.md).

## Feature / benefit item

```tsx
<div className="flex items-start gap-4 border-t border-ink py-5">
  <span className="inline-flex size-[46px] flex-none items-center justify-center border border-blueprint text-blueprint">
    <Boxes aria-hidden className="size-6" strokeWidth={1.4} />
  </span>
  <div>
    <p className="font-mono text-label uppercase text-blueprint">P.01</p>
    <h3 className="mt-1 text-[18px] font-bold">{title}</h3>
    <p className="mt-1.5 text-[15px] leading-normal text-ink-muted">{text}</p>
  </div>
</div>
```

Groups of 3 in `grid gap-6 md:grid-cols-3`, or stacked in a list. Icon box is square (no radius).
Icon matches meaning: modular → `Boxes`, GDPR/data → `ShieldCheck`, speed → `Clock`,
transparency → `SquareKanban`, contact → `MessageSquare`.

## Team member card

```tsx
<article className="border border-line bg-surface">
  <Image src={photo} alt={name} width={400} height={500}
         className="aspect-[4/5] w-full border-b border-line object-cover" />
  <div className="flex flex-col gap-1 p-3.5">
    <h3 className="text-[16px] font-semibold">{name}</h3>
    <p className="font-mono text-label uppercase text-ink-muted">{role} · {city}</p>
  </div>
</article>
```

- **Real photos only** (color, neutral background, same crop for all four). No stock, no illustrations, no AI faces.
- Until a photo exists, show a `bg-surface-sunk` 4:5 box with a thin diagonal cross (drawing placeholder) and the label „[Foto]“ — and do not ship that to production.
- Names, roles and cities come from `docs/00-CONTEXT.md` → The team. Never invent.
- Grid: `grid grid-cols-2 lg:grid-cols-4 gap-4`.

## Footer

| Part | Spec |
|---|---|
| Wrapper | `<footer>` `border-t border-ink pt-8 pb-6` |
| Columns | `grid gap-6 sm:grid-cols-2 lg:grid-cols-4`: brand + one-line description · Übersicht (the home page's section anchors) · Rechtliches (Impressum, Datenschutz — required in DE) · Kontakt (`contact@coditu.com`, Berlin · Kairo, DE/EN switch) |
| Column title | `font-mono text-label uppercase text-ink-muted` |
| Links | `text-[14px] text-ink hover:text-blueprint` |
| Bottom strip | `border-t border-line py-3.5 font-mono text-label uppercase text-ink-muted`: `© {year} Coditu` |
