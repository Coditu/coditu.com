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
| Headline | the slogan „Von der Mail zur App“ / "From mail to app" + a blue period `<span class="text-blueprint">.</span>` |
| Facts row | `mt-12 grid sm:grid-cols-3 gap-4 border-t border-ink`, each a 15 px semibold fact (no T.01 ids shown). Facts must be true (see `docs/00-CONTEXT.md`). |
| Mobile | stage below copy; the mail without its inbox list, the app with an icon rail and no stat tiles |

Reference: canvas artboard *Hero – Test des Designsystems*.

### Hero stage — e-mail → app

A client's request, open in a mail app, becomes the app it asks for. One timer-driven phase
machine (`use-sequence.ts`), no animation library; the flying words use the Web Animations API.
One example, `hero.request` (a room-booking app — close to NVRMiss, booking and calendar).

| # | Phase | What happens |
|---|---|---|
| 1 | Mail | A mail app (`data-part="mail"`): top bar „Posteingang“, inbox list (the request first, lit, then two other mails), the open request — subject, avatar, sender, „an Coditu“, time, body, sign-off. ~1.2 s. |
| 2 | Mark | The body's four `[key words]` light up one by one: blue, `bg-blueprint-light`, underlined. |
| 3 | Fly | The mail fades and shrinks a little; the app (`app-window.tsx`, `data-part="app"`) fades in as a frame: top bar, sidebar, empty cards. The four places the words go are dashed blue outlines. Each lit word lifts out of the mail and flies into its place, scaled to its new size, 80 ms apart. ~1.1 s. |
| 4 | Build | The words stay lit where they landed; the rest reveals, staggered (`data-reveal="micro"`): the „Neue Buchung“ app button, stat tiles, calendar bars, table rows with status pills. |
| 5 | Done | The landed words settle to ink; „Live“ pill beside the app name. Holds ~3 s, then the mail again (crossfade). Pauses off screen or in a hidden tab. |

The words land in order — **first: page title, second: bookings table title, third: calendar card
title, fourth: the sign-in in the top bar**. So the body has exactly four `[words]`, in that order,
in both languages (`tests/hero-sequence.test.ts`). In the app they are capitalised by CSS.

- **Layout.** Fixed stage height (`h-[440px] lg:h-[460px]`); the two windows are layers in it, so nothing jumps. Wide vs narrow is a container query on the stage (`@min-[26rem]`, 416 px), not the viewport. Narrow: no inbox list; the app's sidebar is an icon rail, the stat tiles are left out.
- **Look.** Both windows are "live" UI: `border-ink rounded-ui bg-surface shadow-lift`, `border-line` inside. Blue for the lit words, avatar, active nav item, app button; status pills with words. No orange — the hero CTA owns it.
- **Example data.** Sender, rooms, times, counts are examples, marked by the „Beispiel“ tag; nothing about real clients.
- **Accessibility.** The stage is `aria-hidden` (`data-hero-stage`) with one sr-only sentence (`hero.request.summary`); nothing in it is focusable.
- **Reduced motion.** No flying: two still frames — the mail with its words lit, the finished app — switched every few seconds.
- **No flash.** The server renders the open mail; hidden app content uses the `opacity-0` class, never an inline `opacity:0` (`scripts/verify-tokens.sh` fails on that).

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
