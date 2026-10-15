# Buttons and links

File: `components/ui/button.tsx`. One component, `variant` + `size` props. Render as `<a>` when it
navigates (`asChild` pattern or an `href` prop), `<button type="button">` when it acts.

## Variants

| Variant | When | Default | Hover | Disabled |
|---|---|---|---|---|
| `cta` | **the** main action of the screen — max 1 per viewport | `bg-cta text-cta-ink border-cta` | `bg-cta-hover border-cta-hover` | shared disabled |
| `outline` | secondary action next to the CTA, nav "Gespräch buchen" | `bg-transparent text-blueprint border-blueprint` | `bg-blueprint-light` | shared disabled |
| `app` | actions inside product UI, demos, forms | `bg-blueprint text-blueprint-ink border-blueprint` | `bg-blueprint-hover border-blueprint-hover` | shared disabled |
| `link` | inline / low-priority actions | `text-blueprint underline underline-offset-4 decoration-1`, no padding | `decoration-2 text-blueprint-hover` | `text-ink-muted no-underline` |

Shared disabled: `disabled:bg-surface-sunk disabled:text-ink-muted disabled:border-line disabled:cursor-not-allowed`.
Disabled is not a reason to hide meaning — if possible say why next to it.

## Sizes

| Size | Height | Padding | Text |
|---|---|---|---|
| `sm` | `h-10` (40) — desktop nav only | `px-4` | 14 px semibold |
| `md` (default) | `h-11` (44) | `px-5` | 15 px semibold |
| `lg` | `h-[54px]` | `px-6` | 16 px semibold — hero only |

On touch devices `sm` must still have a 44 px hit area (`relative after:absolute after:-inset-y-1` or use `md`).

## Base classes

```ts
const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-ui border font-sans font-semibold " +
  "transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blueprint " +
  "disabled:pointer-events-none";
```

## Icons

Optional trailing `ArrowRight` (lucide, 18 px, `strokeWidth={1.75}`, `aria-hidden`) on the CTA only.
Icon-only buttons: square (`size-11`), `aria-label` required, variant `outline` or `app`.

## Rules

- Never two `cta` buttons in one viewport — not even in different sections that show together.
- Never white text on orange.
- Label = verb + object: „Projekt anfragen“, „Antrag senden“. Not „Hier klicken“, not „Mehr“.
- Button pairs: CTA first (left), outline second. Wrap with `flex flex-wrap gap-3`.
- No pill-shaped buttons, no gradients, no shadows.
- Text links in running text: `text-blueprint underline underline-offset-4`.
