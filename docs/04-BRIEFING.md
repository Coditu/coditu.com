# 04 — Briefing: start here

One file with everything a new session needs before touching this repo. Read this first;
it tells you which other doc to open for depth, so you don't have to rediscover the
project by grepping git log and diffing files. Written 2026-11-01, kept current by
whoever works here next — if you make a decision this file doesn't reflect, update it in
the same commit, the way `02-POSITIONING.md` has been kept current all day.

---

## Who Coditu is, in one paragraph

Coditu is a four-person distributed engineering team (Berlin + Cairo) that builds
SharePoint/SPFx web parts, internal business apps, and websites — mainly for the German
market. They are not AI-native and must never be marketed as one. Their flagship,
previously undersold, is the **Baukasten**: a component kit (React/shadcn-based, in the
client's own design) with Microsoft Entra login, backed by Python modules over SharePoint
and Microsoft Graph, hosted on the client's own server — so a new client gets a themed
app in 1–3 days instead of a from-scratch build. One real deployment of it (anonymised on
the public site — see "Anonymity," below) runs 6+ apps in production.

Team: Mohamed Tamer (Frontend Lead, Cairo), Abdelrahman Elkhateeb (Frontend Engineer,
Cairo), Ahmed Yehia (Backend & DevOps, Cairo), Adam Nafie (Client Partnerships, Berlin —
the one client-facing contact end to end). Contact: `contact@coditu.com`.

## What this repo is

`coditu.com` — the public marketing site. Next.js, statically prerendered, two languages
(`/de` primary, `/en` secondary), **no backend, no database, no auth, no required env
var**. That restraint is deliberate (`CLAUDE.md`) and has been load-bearing all day —
every feature built today (pricing, the offer panel, the compare-slider self-demo) had to
fit inside "every page stays prerendered."

**Read `CLAUDE.md` for the actual engineering conventions** (commands, the `npm run gate`
list, branch model, i18n rules, dark mode, placeholders). This file does not repeat those;
it covers what `CLAUDE.md` doesn't: the business context, the Nov 2026 repositioning
decisions, current state, and operational gotchas found while building it.

## Why the site changed on 2026-11-01

Ahmed's brief: the old site sold a **workflow** ("Von der Mail zur App" — from email to
app). Any agency can claim a workflow. The repositioning's thesis: sell the Baukasten
instead — a product, the one thing a competitor can't copy by rewriting a headline — and
target German KMU (small/mid-size companies, ~20–250 staff) instead of a vague "social
organisations and the Mittelstand" line that undersold the real target market.

**`docs/02-POSITIONING.md` is the decisions record for all of this** — hero copy, audience,
pricing, page order, motion rules, the offer panel spec, DSGVO claims. Read it before
touching any marketing copy or positioning-adjacent code. Everything below summarises it
plus everything built since it was written; `02-POSITIONING.md` stays the source of truth
if the two ever disagree (update whichever is stale).

## Current state of the site (as of commit `d50a9ea`)

**Homepage section order:** Hero → Intranet (before/after compare-slider, now
self-demonstrating) → Baukasten → Services → Process → Reference → Security → Pricing →
FAQ → Contact. The slider and Baukasten were deliberately promoted ahead of Services —
Ahmed asked whether the slider should be literally first (above the hero); the decision
was to keep it at position 2, right after Hero, to keep the H1/headline as the first thing
a visitor and Google see.

**Hero:** "Sie wählen die Bausteine. Wir bauen Ihre App." / "You pick the building blocks.
We build your app." — replaced "Von der Mail zur App". **The hero's visual animation
(`components/site/hero-stage/`) now matches it**: a Baukasten catalogue of building
blocks gets picked one by one and flies into the app they build — not an email inbox
anymore. Same proven FLIP-style fly animation and five-phase state machine as before
(`use-sequence.ts`, timing unchanged), only the source view was reskinned; `AppWindow`
(what the blocks build into) needed zero changes — it was always content-agnostic.

**Pricing:** published, not hidden. `600 €`/web part, `70 €`/hour (`lib/site-config.ts` →
`PRICES`), deliberately ~26% under the German market median (95 €/h) — a positioning
choice, never justified by Coditu's cost base, which must never appear on the site or in a
client conversation (Ahmed's explicit instruction). Not a fixed per-web-part price — it
varies with scope; the FAQ and the pricing cards say so, and larger projects get a
discount plus "a little extra," stated loosely, nothing specific invented. The whole
pricing display (FAQ price mentions, the homepage pricing-cards section, the blog's
`{{price:...}}` tokens) is gated on one switch: `SHOW_PRICES` in `lib/site-config.ts`,
driven by the build-time env var `NEXT_PUBLIC_SHOW_PRICES` (default on; set to the literal
string `"false"` in Vercel + redeploy to hide). The pricing cards
(`components/site/price-cards.tsx`) count up from 0 once scrolled into view
(`components/site/count-up.client.tsx`), holding the final value before/after for
no-JS and `prefers-reduced-motion`.

**Booking:** `BOOKING_URL` → `https://cal.com/coditu/30min` (a real Coditu-branded Cal.com
profile, not a personal one — it went through one iteration, starting on Abdelrahman's
personal profile before Ahmed set up the dedicated one). Every "Gespräch buchen"/"Book a
call" CTA site-wide reads this one constant; it used to be `null` (dead CTAs everywhere)
until today.

**DSGVO/Security section:** four confirmed claims, not five. The fifth (an AVV /
Auftragsverarbeitungsvertrag) was deliberately **dropped from the conversation entirely**,
not just left unconfirmed — Ahmed's instruction: Coditu holds no client data itself at
all, full stop ("we don't hold data, MS does" — Microsoft does); don't raise the AVV topic
again. The data-residency claim is unhedged for exactly this reason ("Wir bauen direkt in
Ihrem Microsoft 365..." — no "wo es geht"/"where possible" qualifier).

**Anonymity:** the real client behind the Baukasten and the "~40 web parts, one
organisation, almost a year of weekly sprints" reference numbers is never named — no logo,
no name, anywhere on the public site (`docs/00-CONTEXT.md` rule 5). An e2e test
(`"nothing invented, no old name, no old address"`) greps the whole rendered homepage for
the old client mark and fails the build if it ever leaks back in.

**German copy:** `messages/de.ts` is still marked `ENTWURF` — an automated review (see
"How things get verified," below) fixed ~11 concrete issues (an inconsistent booking CTA
across three labels, mixed "Login"/"Anmeldung", a "Lego" trademark mention, a bare
superlative, etc.) but **a human native speaker still needs one pass before real
outreach** — that review was a careful read, not the real thing docs/02-POSITIONING.md
calls for.

**Shipped across the session (chronological, latest last):** `components/site/baukasten.tsx`
(the flagship section); `components/site/price-cards.tsx` + `count-up.client.tsx` (counted
pricing); the compare slider's self-demo (`compare-slider.client.tsx` — sweeps once on view,
hand-hint, cancels on real interaction; two new animation types documented in
`docs/design-system/tokens.md` "Motion" to stay inside that doc's "don't invent new
animations except..." rule); `components/site/offer-panel.client.tsx` (intent-triggered
corner panel / mobile sticky bar); `components/site/organization-schema.tsx` + `public/llms.txt`
(AI-search SEO phase 1); **two genuinely interactive services mockups** — the calendar web
part's area filter and the editorial planner's status filter
(`calendar-filter-demo.client.tsx`, `planner-filter-demo.client.tsx`, sharing a small
`filter-chip.client.tsx`) — each a real `role="group"` of `aria-pressed` buttons sitting
*outside* the mockup's `aria-hidden` picture as a sibling, with an sr-only `aria-live` line,
so a screen-reader visitor gets the filter's effect even though the picture itself is
decorative; the website/NVRMiss mockup stays static on purpose — forcing interaction onto a
product-page screenshot would be gimmicky, not useful; **a dedicated pricing page**
(`app/[lang]/pricing/page.tsx`, same literal `/pricing` segment in both languages — see that
file's own comment for why, and the follow-up it notes) with the homepage teaser now linking
to it; **the hero-stage rebuild** (`components/site/hero-stage/`) — the mail → app
picture replaced with blocks being picked from a Baukasten catalogue and flying into the app
they build, matching the headline for the first time since it changed. Reused the same FLIP
fly animation and phase engine (`use-sequence.ts`); `AppWindow` needed no changes at all; and
**SEO phase 2, two keyword landing pages** (`app/[lang]/services/[slug]/page.tsx`,
`lib/landing-pages.ts`) — `/de/services/sharepoint-webparts-entwickeln-lassen` and
`/de/services/spfx-entwickler` (and their real, non-mirrored English equivalents), both fully
static (no client JS), both built entirely from facts already published elsewhere. Nested
under a literal `services/` segment specifically to get a genuinely localized, keyword-rich
final URL segment per language without touching the `[legal]` route at all (Next.js won't
allow two differently-named dynamic segments as siblings) — the pricing page's simpler
same-segment shortcut wasn't good enough here, because the slug IS the point on these pages.
Two things needed generic extension for this to behave like any other page:
`app/sitemap.ts` (landing pages weren't in the static `pages` table it iterates) and
`lib/blog.ts`'s `switchPaths` (the language switch silently fell back to the home page
before this — confirmed, not assumed).

A `/code-review high` pass on the day's full diff caught two real bugs, both fixed: `security.tsx`'s
icon array hadn't been updated when a point was cut from 5→4, silently showing two wrong
icons (verified visually and fixed; `baukasten.tsx` has the same positional-array pattern and
now both throw in dev if their points/icons arrays ever disagree in length again); and
`compare-slider.client.tsx` leaked a running animation frame on unmount mid-demo (now
cleaned up properly, matching `count-up.client.tsx`'s existing pattern).

**Performance, checked repeatedly, not just once:** `npm run lighthouse` has stayed
100/100/100/100 (Performance/Accessibility/Best-Practices/SEO), CLS 0.000, LCP ~800ms,
TBT ~30ms through every feature added today, re-run after each one specifically because
"enhance performance" was an explicit instruction alongside "keep building." **JS budget is
the thing to watch now: 168.2 KB gz against a 172 KB gate** (the gate, not the 130 KB figure
also reported — see `scripts/check-budgets.mjs`'s own comment for why those differ) — only
**~3.8 KB of headroom left**, tightened by every client-side feature added this session (the
compare-slider demo, the offer panel, the two interactive mockups, the hero rebuild). The two
keyword landing pages cost nothing here — fully static. **Run `npm run budgets` before
writing the next client-side feature, not after** — this is close enough that a non-trivial
addition could fail the gate outright.

## What's still open

- **Production has never actually deployed.** This is the single most important
  operational fact in this file. `main` is fully gated and green on every commit, but the
  GitHub Actions deploy job has been silently skipping on every run because four values
  aren't set in the repo (3 secrets, 1 variable). **Full detail, exact names, where to get
  each value: `docs/03-DEPLOYMENT-CHECKLIST.md`.** Ahmed is deploying at the end of this
  work deliberately, not urgently — but don't assume anything merged to `main` is live.
- Native-German review of `messages/de.ts` (a real speaker, not a model), before outreach.
- **JS budget headroom is down to ~3.8 KB** — see above. Check before adding client-side
  interactivity; raising the 172 KB gate itself needs a team decision, not a unilateral one.
- SEO phase 2: all five planned keyword/regional pages are now live — two keyword pages
  (`sharepoint-webparts-entwickeln-lassen`, `spfx-entwickler`) and three regional pages
  (Berlin, Bayern with the Digitalbonus.Bayern angle, and NRW — no funding-programme claim
  for NRW, since unlike Bavaria there's no confirmed NRW-specific grant; it leans on remote
  delivery from Berlin/Cairo instead). Adding another is cheap — content plus one
  `lib/landing-pages.ts` registry key, the route/sitemap/language-switch plumbing is generic
  and already handles it.
- Fully localized pricing-page URL (`/de/preise` instead of `/de/pricing`) — the keyword
  landing pages solved this exact problem for themselves (nested under a literal `services/`
  segment specifically to get a localized final slug without touching `[legal]`); the pricing
  page could adopt the same trick later, it just hasn't been revisited since.
- AVV template, "taking over an existing codebase" FAQ answer, whether "Zugriff nur, wo
  nötig" is confirmed — all still factually unresolved; AVV specifically is intentionally
  not being raised again (see above), the other two are tracked but low-priority.

## How things get verified here

**`npm run gate -- --fast`** (typecheck, lint, vitest, build, budgets — skips e2e and
lighthouse) is fast enough to run after every change and should be treated as the floor,
not the ceiling. Full `npm run gate` adds e2e and lighthouse.

**A real, recurring environment limitation, not a code issue:** this sandbox has
repeatedly killed long-running `npm run dev` / full-matrix `npm run e2e` background
processes mid-run — clean exit code 0, no crash signature, no error. It looks exactly like
a flaky regression (scattered, unrelated test failures, concentrated toward the end of a
long run) but isn't one. If `npm run e2e` connection-refuses intermittently or a wide,
unrelated set of tests fail together:
1. Check `lsof -ti :3000` for a dead or orphaned process before assuming a regression.
2. Kill it, restart `npm run dev` cleanly, confirm with a few `curl` checks that it's
   *stable* (not just "ready"), then retry.
3. Prefer targeted runs (`npx playwright test -g "<test name>" --project=chromium`) over
   the full multi-project matrix for verification during active development — the full
   matrix is what eventually confirms a finished phase, not what you lean on while
   iterating.
3 subagents independently hit this exact issue today (the DSGVO-review scope, the SEO
branch, the offer-panel branch) before it was diagnosed; all three ended up shipping
correct code that the full matrix only intermittently could confirm end-to-end.

**Parallel work pattern used today:** independent, non-overlapping features (SEO vs.
offer panel) were built by background agents each in their own git worktree/branch, not
pushed directly — reviewed and merged from the main session afterward, resolving the one
expected conflict (both touched `app/[lang]/layout.tsx`) by hand. Worked well; repeat it
for similarly-sized independent features. Don't parallelize anything that touches
`app/[lang]/page.tsx`'s section order or `e2e/site.spec.ts`'s sibling-selector assertions
in more than one branch at once — that's where real, hard-to-automerge conflicts live.

## Non-negotiables (violating these has already been called out once each; don't)

- **Invent nothing.** No metrics, client counts, testimonials, or claims not already on
  the site or confirmed by the team (`docs/00-CONTEXT.md`). This includes vague-sounding
  things like "we don't hold data, MS does" — stated as fact because Ahmed confirmed it,
  not because it sounded safe to assume.
- **No seniority claim.** Team's minimum experience is 3 years — mid-level in Germany, not
  senior. Evidence (the real numbers above) replaces adjectives everywhere on this site.
- **Coditu's own cost base is never a stated reason for anything** — not the pricing, not
  in copy, not in a client conversation. Price is a positioning choice; cost is private.
- **The EVIM mark/name never appears publicly** without their written permission — that
  decision belongs to the team, not to whoever is writing code.
- **No AI-native framing.** Coditu are developers who build the thing an AI (theirs or the
  client's) can be connected to later — never "we are an AI company."

## Where to go deeper

| Need | File |
|---|---|
| Engineering conventions, commands, the gate, branches, i18n rules | `CLAUDE.md` |
| Company facts, team, voice rules, what must never ship | `docs/00-CONTEXT.md` |
| Every Nov 2026 positioning decision and its reasoning | `docs/02-POSITIONING.md` |
| Deploying to production — the real blocker and how to fix it | `docs/03-DEPLOYMENT-CHECKLIST.md` |
| UI components, tokens, the "Blueprint" design system, the motion allow-list | `docs/design-system/README.md`, `docs/design-system/tokens.md` |
| The original outreach/lead-gen strategy this site serves | `docs/coditu-playbook.md` |
| Historical: the previous design system, fully removed from code | `docs/01-DESIGN-SYSTEM.md` (history only, not for new work) |
