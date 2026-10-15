# Data display — cards, tags, pills, avatars, stats, progress

## Card

```tsx
<article className="flex flex-col rounded-ui border border-line bg-surface">
  <header className="flex justify-between border-b border-line px-4 py-3 font-mono text-label uppercase text-ink-muted">
    <span>Modul M-04</span><span>SharePoint</span>
  </header>
  <div className="flex flex-col gap-2.5 p-4">
    <h3 className="text-h3">{title}</h3>
    <p className="text-[15px] leading-normal text-ink-muted">{text}</p>
    <div className="flex flex-wrap gap-2">{tags}</div>
  </div>
  <footer className="px-4 pb-4"><a className="text-[15px] font-semibold text-blueprint underline underline-offset-4" href={href}>Details ansehen</a></footer>
</article>
```

- Mono header strip is optional; use it for module IDs / categories.
- Whole-card click: make the title the link and stretch it (`after:absolute after:inset-0`, card `relative`). Never nest links.
- No hover lift. Hover may change border to `border-ink`.

## Tag

```tsx
<span className="inline-flex items-center self-start rounded-tag border border-blueprint/45 px-1.5 py-0.5 font-mono text-label uppercase text-blueprint">
  Webpart
</span>
```

Variant **example**: `border-dashed border-ink text-ink` with text „Beispiel“.
Tags are labels, not buttons. If clickable (filters), they become `<button>` with ≥ 44 px hit area and `aria-pressed`.

## Status pill

Only place `rounded-full` is allowed on a container.

| Status | Classes | Dot |
|---|---|---|
| Live | `border-blueprint bg-blueprint-light text-blueprint` | filled `bg-blueprint` |
| Entwurf / Draft | `border-dashed border-ink-muted text-ink-muted` | outline dot |
| Abgenommen / Approved | `border-success bg-success-bg text-success` | filled `bg-success` |
| Achtung / Warning | `border-warning bg-warning-bg text-warning` | filled |
| Fehler / Error | `border-error bg-error-bg text-error` | filled |

```tsx
<span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ...">
  <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />Live
</span>
```

The word carries the meaning; the dot and color only support it.

## Avatar (initials)

`size-8` (32) default, `size-7` (28) in task cards. `rounded-full border border-ink bg-surface font-mono text-[11px] font-semibold`, max 2 letters, same 11 px at both sizes.
Overflow avatar „+2“: `bg-blueprint text-blueprint-ink border-blueprint`.
Always `aria-label` / `title` with the full name: `<span title="Mohamed Tamer" aria-label="Mohamed Tamer">MT</span>`.

## Stat tile

```tsx
<div className="flex flex-col gap-2.5 border border-line bg-surface px-5 py-5">
  <span className="font-mono text-label uppercase text-ink-muted">Sprint</span>
  <span className="text-[28px] font-bold tracking-[-0.02em]">Sprint 3 von 5</span>
  {/* optional: segmented bar or one line of text-[13px] text-ink-muted */}
</div>
```

Square corners (`rounded-none`). Values must be real or inside a sheet marked „Beispiel“.

## Progress bar — segmented

One segment per unit (task, sprint). Done = `bg-blueprint`, open = `bg-surface-sunk` (or `bg-line` for 4 px bars).

```tsx
<div>
  <div className="mb-2.5 flex items-baseline justify-between">
    <span className="text-[15px] font-semibold">3 von 9 Aufgaben erledigt</span>
    <span className="font-mono text-[12px] font-semibold text-blueprint">33 %</span>
  </div>
  <div role="img" aria-label="Fortschritt: 3 von 9 Aufgaben erledigt"
       className="grid gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0,1fr))` }}>
    {Array.from({ length: total }, (_, i) => (
      <span key={i} className={cn("h-2.5", i < done ? "bg-blueprint" : "bg-surface-sunk")} />
    ))}
  </div>
</div>
```

Heights: 10 px (`h-2.5`) standalone, 4 px (`h-1`) inside a stat tile. Above ~20 units use one
continuous bar (`<progress>` styled, or a div with `role="progressbar" aria-valuenow/min/max`).
No rounded bars, no gradients, no animation beyond `micro` reveal.
