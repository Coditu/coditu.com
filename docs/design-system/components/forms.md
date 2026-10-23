# Forms

No form ships yet, so there are no component files; build them from this page when one does.
Every form element exists in two looks: **live** (real control) and **sketch** (picture of a
control, see [`../blueprint-motifs.md`](../blueprint-motifs.md) §7).

## Field anatomy (live)

```tsx
<div className="flex flex-col gap-1.5">
  <label htmlFor={id} className="text-[13px] font-semibold text-ink">{label}</label>
  <input
    id={id}
    aria-describedby={`${id}-help`}
    aria-invalid={!!error || undefined}
    className={cn(
      "h-11 w-full rounded-ui border border-line-input bg-surface px-3 text-[15px] text-ink",
      "placeholder:text-ink-muted hover:border-ink",
      "focus-visible:border-blueprint focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blueprint",
      "disabled:border-line disabled:bg-surface-sunk disabled:text-ink-muted",
      "aria-invalid:border-error",
    )}
  />
  <p id={`${id}-help`} className={cn("text-[13px] leading-snug", error ? "font-semibold text-error" : "text-ink-muted")}>
    {error ?? help}
  </p>
</div>
```

## States

| State | Border | Background | Extra |
|---|---|---|---|
| default | `border-line-input` (3.6:1) | `bg-surface` | |
| hover | `border-ink` | | |
| focus | `border-blueprint` + 2 px outline, offset 1 | | |
| disabled | `border-line` | `bg-surface-sunk` | text `ink-muted` |
| error | `border-error` | | helper text becomes the error, `text-error font-semibold`, `aria-invalid` |

## Controls

| Control | Spec |
|---|---|
| Text / email | as above. `type` matches content, `autoComplete` set. |
| Select | native `<select>` with the same classes + `appearance-none` and a 12 px lucide `ChevronDown` at `right-3`. Use shadcn Select only when native can't do it. |
| Date range | two `type="date"` inputs in `grid grid-cols-2 gap-2.5`. One visible label for the group (`<fieldset>` + `<legend>`), each input gets `aria-label` „von“ / „bis“. |
| Textarea | same classes, `min-h-28 py-2.5`, `resize-y`. |
| Checkbox / radio | native, `accent-blueprint size-4`, label to the right, whole row ≥ 44 px tall. |

## Sketch field (for sketch/wireframe visuals only)

```tsx
<div className="flex flex-col gap-1.5" aria-hidden="true">
  <span className="font-mono text-label uppercase text-blueprint">01 · Name</span>
  <div className="flex h-11 items-center border border-dashed border-blueprint px-3 font-mono text-[12px] text-blueprint">
    Text · Pflichtfeld
  </div>
</div>
```

Numbered labels `01 ·`, `02 ·`. Content describes the field type, not example data.

## Rules

- Every input has a visible `<label>`. Placeholder is never the label.
- Helper text below, not inside. Errors replace helper text, they don't stack.
- Required: say „Pflichtfeld“ in the helper text or label suffix „(Pflicht)“ — no lone red asterisk.
- Field borders use `line-input`, never `line` (`line` fails 3:1).
- Submit button of a form = `app` variant, unless the form *is* the page's main conversion
  (contact form) — then it is the one `cta`.
- One column on mobile; two columns only for short related fields (date range, PLZ + Ort).
