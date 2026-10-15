# Coditu

This repository is Coditu's public site: a statically prerendered Next.js site in two languages,
German first. There is no backend, no database, no auth and no environment variable the build needs.

It also held the internal delivery app (`/app`, Supabase) until 2026-10-13. That code is gone from
here; the last commit containing it is tagged `pre-split`. The repo was formerly named
*Strukture Digital*; that name is retired and must not appear anywhere in code, copy, metadata, or
assets.

## Commands

```bash
npm run dev         # next dev
npm run build       # next build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run test        # vitest run
npm run e2e         # playwright, against the dev server
npm run budgets     # JS budget for `/de`, and that every page is still prerendered
npm run lighthouse  # median of three, against a production build
npm run gate        # the whole list, in order (`npm run gate -- --fast` skips e2e + lighthouse)
```

**`npm run gate` is the list.** A check that only runs when somebody remembers is not a check.

## Rules

- **UI follows `docs/design-system/`.** Start at its README; read only the component file you need.
- **Invent nothing.** No testimonials, metrics, client counts or logo walls. The facts and the
  voice rules are in `docs/00-CONTEXT.md`, and `e2e/marketing.spec.ts` asserts several of them.
- **Copy lives in `messages/de.ts` and `messages/en.ts`**, not in components. German is written
  first; `en.ts` has the same shape (`Messages`), so a missing string is a type error.
- **Every page stays prerendered.** No `cookies()`, `headers()` or `searchParams` anywhere in the
  tree; `npm run budgets` fails if a route goes dynamic.
- **Dark mode follows the system setting only** (`prefers-color-scheme`). There is no toggle.
- **`[PLACEHOLDER: …]`** marks legal details only the team can fill (Impressum, Datenschutz).
  `scripts/deploy-production.sh` refuses to deploy while any are left in `messages/`.
- **Dates:** never `new Date("2026-08-23")` — that parses as UTC midnight and shows the previous
  day in half the world.
- Do not add a backend, auth, or a database here. Restraint is the design.

## Languages

- Routes: `/de` (primary) and `/en`. `/` redirects to `/de` (`next.config.ts`). Everything lives
  under `app/[lang]/`; the root layout there sets `<html lang>`.
- Every page exists in both languages. No English on `/de`, no German on `/en`, except fixed terms
  such as "SharePoint".
- `lib/i18n.ts` → `pages` is the table of every page's path per language. The language switch, the
  sitemap and each page's hreflang (`de`, `en`, `x-default` → `/de`) are generated from it — add a
  page there first.
- Section ids are per language (`messages/*.ts` → `anchors`); the switch keeps the reader on the
  section in view.
- `lib/site-config.ts` holds the values shared by both languages: contact address and the
  „Gespräch buchen“ link (`BOOKING_HREF`, a mailto until there is a booking tool).

## Where things are written down

| File | What lives there |
|---|---|
| `docs/00-CONTEXT.md` | Who Coditu is, the real work, the team, the voice rules, the things that must never ship. |
| `docs/design-system/` | **The design system ("Blueprint", Rev. A). Read `docs/design-system/README.md` before building or changing any UI.** Tokens, motifs, component specs, rules, migration plan. |
| `docs/01-DESIGN-SYSTEM.md` | History: the previous ("Instrument") system. Fully removed from the code; the last commit with it is tagged `old-design`. Not for new work. |
| `docs/05-DECISIONS.md` | Append-only ADR log. Mostly about the removed app; kept unedited as history. |
| `docs/coditu-revamp-prompt.md` | The brief the previous site was built from. Still the source for voice and company facts; its sections, visuals and motion are superseded by Blueprint. |
| `design/` | The earlier Claude Design bundle (previous design). Prototypes, not code; not the source for the current site. |

Some of these still link to documents that were deleted with the app. Those are in `pre-split`.

## Branches: trunk-based. There is one long-lived branch and it is `main`.

`main` is **always deployable**. Work happens on short-lived `feat/*` and `fix/*` branches that
merge back through a pull request CI runs. Vercel's per-branch preview deployments are the testing
environment.

Production deploys from CI on green, not from a push. `vercel.json` carries
`git.deploymentEnabled`, which is the one documented mechanism for that, so treat that file as
load-bearing: `tests/deploy-control.test.ts` asserts it is still there.

`public/sw.js` exists only to unregister the service worker the removed app installed. Delete it
once no installed copies can be left.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
