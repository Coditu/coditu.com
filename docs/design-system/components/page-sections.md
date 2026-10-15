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
    <SheetLabel>Blatt 02 · Arbeitsweise</SheetLabel>
    <h2 className="mt-5 text-h1 max-w-[18ch]">So arbeiten wir: Sie sehen jeden Schritt.</h2>
  </div>
  <p className="text-lead text-ink-muted lg:col-span-5 max-w-[46ch]">{intro}</p>
</div>
```

Content starts `mt-12` below. One sheet label + one heading + optional intro. No eyebrow on top of the label.

## Hero

The only place for `text-display` and the page's orange CTA.

| Part | Spec |
|---|---|
| Section | `pt-8 pb-16 lg:pb-24`, sheet meta line on top (`mb-12`) |
| Grid | `grid gap-14 lg:grid-cols-12 lg:items-center` — copy `lg:col-span-5`, visual `lg:col-start-7 lg:col-span-6` |
| Copy | SheetLabel (services) → `<h1 class="text-display mt-6">` → `text-lead text-ink-muted mt-6 max-w-[52ch]` → buttons `mt-9` (`cta lg` + `outline lg`) → facts row |
| Headline | the slogan „Von der Skizze zur fertigen Software“ + a blue period `<span class="text-blueprint">.</span>` |
| Facts row | `mt-12 grid sm:grid-cols-3 gap-4 border-t border-ink`, each: mono label `T.01` blue + 15 px semibold fact. Facts must be true (see `docs/00-CONTEXT.md`). |
| Visual | a `<Sheet>` with crop marks containing a **sketch → live** pair ([`../blueprint-motifs.md`](../blueprint-motifs.md) §7) |
| Mobile | visual below copy; sketch and live stack; connector hidden |

Reference: canvas artboard *Hero – Test des Designsystems*.

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
| Columns | `grid gap-6 sm:grid-cols-2 lg:grid-cols-4`: brand + slogan · Leistungen · Rechtliches (Impressum, Datenschutz — required in DE) · Kontakt (`contact@coditu.com`, DE/EN switch) |
| Column title | `font-mono text-label uppercase text-ink-muted` |
| Links | `text-[14px] text-ink hover:text-blueprint` |
| Bottom strip | `border-t border-line py-3.5 font-mono text-label uppercase text-ink-muted`: `© {year} Coditu` left, `Blatt NN / NN · Rev. X` right |
