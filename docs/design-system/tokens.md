# Tokens

Every value a component may use. The CSS is in [`tokens.css`](./tokens.css); this file is the
reference. Contrast ratios were computed (WCAG formula), not eyeballed.

## Color — light (default)

| Token | Tailwind | Hex | Use | Contrast on paper |
|---|---|---|---|---|
| `--paper` | `bg-paper` | `#F7F6F2` | page background | — |
| `--surface` | `bg-surface` | `#FFFFFF` | cards, sheets, live UI | — |
| `--surface-sunk` | `bg-surface-sunk` | `#EFEDE7` | disabled fields, image placeholders, empty progress | — |
| `--ink` | `text-ink` | `#14171C` | headings, body, strong lines | 16.6:1 |
| `--ink-muted` | `text-ink-muted` | `#5A5E66` | secondary text, helper text, mono metadata | 6.0:1 |
| `--line` | `border-line` | `#D9D7D0` | dividers, card borders — **decoration only** | 1.3:1 |
| `--line-input` | `border-line-input` | `#7D8189` | field borders, checkbox borders | 3.6:1 |
| `--blueprint` | `text-blueprint` `bg-blueprint` | `#1F4FD8` | primary: lines, links, app buttons, labels | 6.1:1 |
| `--blueprint-hover` | `bg-blueprint-hover` | `#1A42B8` | hover of blue fills | — |
| `--blueprint-light` | `bg-blueprint-light` | `#E8EDFB` | tints, hover of outline buttons, "Live" pill bg | blue on it 5.7:1 |
| `--grid-major` | (in `bg-blueprint-grid`) | `rgb(31 79 216 / .09)` | 40 px grid lines | — |
| `--grid-minor` | (in `bg-blueprint-grid`) | `rgb(31 79 216 / .04)` | 8 px grid lines | — |
| `--cta` | `bg-cta` | `#FF8A1F` | **the one main CTA per screen** | — |
| `--cta-hover` | `bg-cta-hover` | `#E8780F` | CTA hover | ink on it 6.1:1 |
| `--cta-ink` | `text-cta-ink` | `#14171C` | text on CTA | 7.6:1 on `--cta` |

### Status (light)

| Status | Text / icon | Background | Ratio (text on bg) |
|---|---|---|---|
| success | `#2E7048` `text-success` | `#E6F1EA` `bg-success-bg` | 5.1:1 |
| warning | `#8A5A00` `text-warning` | `#F7EEDC` `bg-warning-bg` | 5.1:1 |
| error | `#B3382C` `text-error` | `#F7E5E2` `bg-error-bg` | 4.9:1 |
| info | `#1F6E8C` `text-info` | `#E2F0F5` `bg-info-bg` | 4.9:1 |

Status colors mean status. Never decoration. Always pair with a word or icon — color is never the only signal.

## Color — dark (`prefers-color-scheme: dark`)

| Token | Hex | Contrast on paper `#0F1216` |
|---|---|---|
| `--paper` | `#0F1216` | — |
| `--surface` | `#171B21` | — |
| `--surface-sunk` | `#1E232A` | — |
| `--ink` | `#ECEAE4` | 15.6:1 |
| `--ink-muted` | `#A2A6AE` | 7.7:1 |
| `--line` | `#2A2F37` | decoration |
| `--line-input` | `#6E7480` | 4.0:1 (3.7:1 on surface) |
| `--blueprint` | `#86A2FF` | 7.7:1 — dark text on it: `--blueprint-ink` `#0F1216` |
| `--blueprint-hover` | `#A3B8FF` | |
| `--blueprint-light` | `#1C2437` | blue on it 6.4:1 |
| `--grid-major` / `--grid-minor` | `rgb(134 162 255 / .08)` / `/ .03` | |
| `--cta` / `--cta-hover` / `--cta-ink` | `#FF8A1F` / `#FFA04D` / `#14171C` | ink on hover 8.9:1 |
| success / warning / error / info | `#6FC48F` / `#E7B04E` / `#F08A7E` / `#6CC0DE` | each ≥ 5.8:1 on its own bg |
| status bg | same hue at 12 % alpha | |

Text color on blue fills is a token, not white: `text-blueprint-ink` (white in light, `#0F1216` in dark).

## Typography

Fonts: **Geist** (sans) via `next/font/google`, variable `--font-geist`.
**JetBrains Mono** via `next/font/google`, variable `--font-jetbrains` (already in `lib/fonts`).

| Level | Class | Size mobile → desktop | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|---|
| Display | `text-display` | 46 → 76 px | 1.02 | 700 | −0.04em | hero headline only, 1 per page |
| H1 | `text-h1` | 36 → 52 px | 1.06 | 700 | −0.035em | section headline |
| H2 | `text-h2` | 28 → 36 px | 1.15 | 700 | −0.03em | sub-section, dark-mode panels |
| H3 | `text-h3` | 20 → 22 px | 1.3 | 600 | −0.01em | card titles, feature titles |
| Lead | `text-lead` | 18 → 20 px | 1.55 | 400 | 0 | intro paragraph under a headline |
| Body | `text-body` | 16 px | 1.55 | 400 | 0 | running text |
| Small | `text-small` | 14 px | 1.45 | 400–600 | 0 | cards, helper text, table cells |
| Label | `text-label` + `font-mono uppercase` | 11 px (12 px for sheet labels) | 1.3 | 500 | 0.08em | labels, tags, metadata |

Sizes are fluid `clamp()` between 375 px and 1100 px viewports. HTML level and visual level are
independent: one `<h1>` per page, then correct order; pick the visual class separately.

Rules: running text max `68ch`, headlines max `18ch`. `tabular-nums` on numbers in columns.
Mono never below 11 px. Never mono for sentences.

## Spacing — 4 px base

Tailwind v4's default spacing (`--spacing: 4px`) already matches. Use **only** these steps:

| px | 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64 | 96 |
|---|---|---|---|---|---|---|---|---|---|
| class | `1` | `2` | `3` | `4` | `6` | `8` | `12` | `16` | `24` |

e.g. `p-4`, `gap-6`, `mt-12`. Optical exceptions (`gap-1.5`, `gap-2.5`) only inside chips, pills, labels.

| Rhythm | Value |
|---|---|
| between sections | `py-16 md:py-24` (64 → 96) |
| heading → content | `mt-12` (48) |
| card padding | `p-4` (16) small, `p-6` (24) default |
| form field gap | `gap-4` (16), label → input `gap-1.5` (6) |

## Radius, borders, shadow

| Token | Class | Value | Use |
|---|---|---|---|
| `--radius-tag` | `rounded-tag` | 2 px | tags, small chips |
| `--radius-ui` | `rounded-ui` | 4 px | buttons, inputs, cards, task cards |
| — | `rounded-none` | 0 | drawing sheets, sections, stat tiles |
| — | `rounded-full` | 999 px | status pills, avatars, dots only |
| border | `border` | 1 px | everything |
| focus | `outline-2 outline-offset-3` | 2 px, offset 3 px, `--blueprint` | all focusable elements |
| sketch line | `border border-dashed border-blueprint` | 1 px dashed | sketch elements only |
| `--shadow-lift` | `shadow-lift` | `0 12px 24px -16px rgb(20 23 28 / .30)` | "live" UI mockups only |
| `--shadow-sm` | `shadow-sm` | `0 1px 0 rgb(20 23 28 / .06)` | optional on cards |

No other shadows.

## Layout

| Item | Value |
|---|---|
| Container | `max-w-page` = 1280 px, centered, `mx-auto` |
| Side padding | 16 (base) · 24 (`sm`) · 32 (`md`) · 48 (`lg`) · 80 (`xl`) |
| Columns | 4 (base/sm) · 8 (`md`) · 12 (`lg`+), gutter 24 px (`gap-x-6`) |
| Breakpoints | `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1440 |
| Nav height | 84 px desktop, 64 px mobile |
| Touch target | ≥ 44 px (`h-11`); hero buttons 54 px (`h-[54px]` is allowed) |

Prefer `grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]` or container queries for
component-level layout, viewport breakpoints for page-level layout.

## Motion

Calm. Opacity and transform only. Reuse the reveal system already in `globals.css`
(`data-reveal="micro" | "section"`); do not invent new animations except:

| Motion | Spec |
|---|---|
| hover / color change | 150 ms `ease-out` (`transition-colors duration-150`) |
| draw-on of dimension lines / connectors | `stroke-dashoffset` → 0, 900 ms `--ease-entrance`, once, on view |
| reveal | existing `section` (blocks) and `micro` (chips) tiers |

`prefers-reduced-motion: reduce` → no movement, lines shown fully drawn.

## Z-index

`z-0` content · `z-10` sticky nav · `z-40` popovers/menus · `z-50` dialogs + scrim.
