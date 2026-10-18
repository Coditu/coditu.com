# Blueprint motifs

The drawing elements that make Coditu look like Coditu. They are **decoration around content**,
never the content itself. All go in `components/blueprint/`. All decorative SVG/spans get
`aria-hidden="true"`.

## Budget per screen (viewport)

| Motif | Max |
|---|---|
| Grid paper background | page wrapper / hero only |
| Crop marks | 2 sets (one per important sheet) |
| Dimension lines | 2 |
| Dashed connectors | 2 |
| Sheet label | none on the home page — see §1 |

More than this turns a drawing into noise.

---

## 1. Sheet label — `<SheetLabel>`

**Not used on the home page.** No numbered sheet labels („Blatt 02 · …“) and no sheet meta line („Rev. A“): they read as decoration. Sections start with the heading. `<SheetLabel>` stays only for short, unnumbered labels (404, legal pages). Blue 8 px square + mono uppercase text.

```tsx
<p className="flex items-center gap-2.5 font-mono text-label uppercase text-[12px] text-blueprint">
  <span aria-hidden="true" className="size-2 bg-blueprint" />
  {label /* "Rechtliches" */}
</p>
```

Never number it.

## 2. Sheet meta line

**Not used** (removed from the hero). Kept for reference only: Left: what it is. Right (hidden < `sm`): revision + scale.

```tsx
<div className="flex justify-between gap-4 font-mono text-label uppercase text-ink-muted">
  <span>Blatt 01 · Startseite</span>
  <span className="hidden sm:inline">Rev. C · Maßstab 1:1</span>
</div>
```

## 3. Drawing sheet — `<Sheet>`

A bordered white panel that frames a demo (board, form, assistant). Optional title block on top.

```tsx
<div className="relative border border-ink bg-surface">
  <CropMarks />
  <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-ink">
    {/* title-block cells */}
    <div className="flex flex-col gap-1 px-5 py-3.5 sm:border-l sm:first:border-l-0 border-line">
      <span className="font-mono text-label uppercase text-ink-muted">Kunde</span>
      <span className="text-[15px] font-semibold">{value}</span>
    </div>
  </div>
  <div className="p-6 md:p-8">{children}</div>
  <div className="flex justify-between border-t border-line px-5 py-3 font-mono text-label uppercase text-ink-muted">
    <span>Alle Angaben beispielhaft</span>
  </div>
</div>
```

`rounded-none`. Border is `border-ink` (outer) and `border-line` (inner dividers).
Example data inside a sheet must be marked **„Beispiel“ / "Example"** (dashed tag) — invent nothing.

## 4. Crop marks — `<CropMarks>`

Four 18 px L-corners, 10 px outside the parent. Parent must be `relative`.

```tsx
const corner = "pointer-events-none absolute size-[18px] border-ink/55";
export function CropMarks() {
  return (
    <>
      <span aria-hidden="true" className={`${corner} -top-2.5 -left-2.5 border-t border-l`} />
      <span aria-hidden="true" className={`${corner} -top-2.5 -right-2.5 border-t border-r`} />
      <span aria-hidden="true" className={`${corner} -bottom-2.5 -left-2.5 border-b border-l`} />
      <span aria-hidden="true" className={`${corner} -bottom-2.5 -right-2.5 border-b border-r`} />
    </>
  );
}
```

Hide below `sm` if they collide with the 16 px page gutter (`hidden sm:block`).

## 5. Dimension line — `<DimensionLine label="B = 350" />`

Horizontal: arrow │◀── B = 350 ──▶│. Vertical variant uses `writing-mode: vertical-rl`.

```tsx
<div aria-hidden="true" className="flex items-center gap-1.5 text-blueprint">
  <svg width="8" height="12" viewBox="0 0 8 12"><path d="M.5 0v12" stroke="currentColor" fill="none"/><path d="M1 6 7 3v6z" fill="currentColor"/></svg>
  <span className="h-px flex-1 bg-current" />
  <span className="font-mono text-label uppercase">{label}</span>
  <span className="h-px flex-1 bg-current" />
  <svg width="8" height="12" viewBox="0 0 8 12"><path d="M7.5 0v12" stroke="currentColor" fill="none"/><path d="M7 6 1 3v6z" fill="currentColor"/></svg>
</div>
```

Label format: `B = 350` (Breite) / `H = 410` (Höhe). Use the element's real design width if known.
Vertical dimension lines: `hidden md:flex`.

## 6. Dashed connector — `<Connector>`

Links a sketch to its live version. 1.2 px stroke, `stroke-dasharray="5 5"`, start dot r 2.5,
open arrowhead at the end. Optional mono tag on the line ("Umsetzung" / "Build").

```tsx
<svg aria-hidden="true" width="48" height="24" viewBox="0 0 48 24" className="text-blueprint">
  <circle cx="3" cy="12" r="2.5" fill="currentColor" />
  <path d="M3 12H42" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 5" />
  <path d="m37 7 6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
</svg>
```

Curved version for free layouts: cubic path, same stroke rules. Hide on mobile when sketch and
live stack vertically — or rotate 90° to point down.

## 7. Sketch vs Live

The signature pattern: the same UI twice — as a sketch, then finished.

| Property | Sketch (A · Entwurf) | Live (B · Ergebnis) |
|---|---|---|
| Container | `border border-blueprint bg-paper/85`, no radius | `border border-line rounded-ui bg-surface shadow-lift` |
| Fields | `h-11 border border-dashed border-blueprint` | real `<input>` with `border-line-input` |
| Text | `font-mono text-label` (11–12 px) blue, describes intent: „Text · Pflichtfeld“ | Geist, real example content |
| Buttons | `[ Antrag senden ]` in solid blue 1 px box, mono | App button (`bg-blueprint`) |
| Header | mono label + sheet id `A-01` | title + "Live" status pill |
| Caption under | `A · Entwurf` / `A · Sketch` | `B · Ergebnis` / `B · Result` |
| Interactive | no — `aria-hidden` or presentational divs | yes, real controls (or `readOnly` in demos) |

Layout: side by side from `lg` (sketch left, connector, live right); stacked below.
The sketch must describe the same fields as the live version — they are one object, two states.

Sketch fields are divs, not inputs: they are a picture of a form. Give the sketch block a
visually hidden heading or `aria-hidden="true"` so screen readers meet the form once.

## 8. Annotation note

A small boxed note pinned to a sketch: `border border-blueprint bg-paper px-2.5 py-2`,
first line `font-mono text-label` („Hinweis 1“), second line mono 11 px semibold.

---

## Label vocabulary (DE / EN)

| DE | EN | Where |
|---|---|---|
| Rev. C | Rev. C | sheet meta |
| Maßstab 1:1 | Scale 1:1 | sheet meta |
| Skizze 01 | Sketch 01 | sheet meta |
| A · Entwurf | A · Sketch | under a sketch |
| B · Ergebnis | B · Result | under live UI |
| Hinweis 1 | Note 1 | annotation |
| Umsetzung | Build | connector tag |
| Beispiel | Example | marks demo data |
| Alle Angaben beispielhaft | All data is illustrative | sheet footer |
| Fortsetzung folgt | To be continued | last sheet footer |

German spelling: **Maßstab** (with ß), not „Massstab“. Dates `23.10.` / `03.11. – 07.11.2026`.
Percent with a space: `33 %` (DE), `33%` (EN).
