# 02 — Positioning, Rev. B (November 2026)

The decisions behind the November 2026 revamp, taken to make the site win German KMU clients.
Supersedes the positioning in `coditu-revamp-prompt.md` where the two disagree. Voice rules,
company facts and the "invent nothing" rule in `00-CONTEXT.md` still hold without exception.

---

## What changed and why

The previous site sold a **workflow** („Von der Mail zur App"). Any agency in Germany can claim a
workflow. The Baukasten — the component kit, the Entra login, the client-hosted backend — is a
**product**, and it is the only thing a competitor cannot copy by rewriting a headline. It was
absent from the site entirely. That is the revamp.

## Positioning

**Hero**

| | |
|---|---|
| DE | „Sie wählen die Bausteine. Wir bauen Ihre App." |
| EN | "You pick the building blocks. We build your app." |

„Von der Skizze zur App" moves down into the Arbeitsweise section, where step 01 is already
*Skizze & Gespräch*. It describes the process; it does not carry the pitch.

**Audience.** Kleine und mittlere Unternehmen (KMU), roughly 20–250 staff. The previous line
(„soziale Organisationen, Vereine und den Mittelstand") is retired as a *target*. The social-sector
project stays as the reference, anonymised — it is the only real proof and the warm-referral chain.

Known tension: companies under ~50 staff rarely run a SharePoint intranet, so web parts will not
apply to the bottom of the band. Internal apps still will.

**On AI.** Coditu is not an AI-native company and must not claim to be. The frame is: documented
components with a real API layer over SharePoint and Graph, permissions already modelled, so an
assistant can be attached without re-plumbing. *The client connects theirs, or Coditu connects one.*
Never a bare "KI-fähig" badge — a technical buyer discounts it instantly.

## Credibility: evidence, not adjectives

No seniority claim appears anywhere. The team's minimum experience is 3 years, which is *mid-level*
in the German market (junior 0–2, mid 3–5, senior 5–10). „Senior-Entwickler" would contradict itself
to exactly the buyer being targeted, and would draw scrutiny onto the rate instead of supporting it.

What runs instead, all of it already true:

- über 40 Webparts for one organisation, including complex ones — Organigramm, Kalender
- six apps in production
- almost a year of weekly sprints with the same client

## Prices

Published, and gated behind a build-time env var so they can be switched off.

| | DE | EN |
|---|---|---|
| Web part | ab 600 € | from €600 |
| Hourly | 70 € | €70 |
| Alle Preise netto. | All prices net. |

**Not a fixed per-web-part price.** The site never says a web part "usually" has a fixed price —
the real driver is the amount of work, which varies by scope. 600 €/70 €/h are starting figures,
not a price list. Larger projects get a discount, and something extra on top — stated loosely
(`pricingSection.note` in `messages/*.ts`), not as a specific named freebie.

Three billing models: **per web part (default), per project, per hour.** Per-piece leads, because
hourly billing punishes a team that delivers in days — see the playbook.

Market context, for defending the number: the German median for SharePoint work is 95 €/h
(junior 80–100, senior 120–160). 70 €/h is ~26% below median. It is deliberately the affordable
option. It is *not* justified by a low cost base — that sets margin, not price, and must never
appear on the site or in a conversation with a client.

Consistency rule: **600 € ÷ 70 €/h ≈ 8.6 hours.** Any statement about how long a web part takes has
to land near that. `messages/de.ts` → `servicesSection.rows[0].result` and
`referenceSection.facts` must agree with it.

Toggle note: a switch that works without a redeploy would need request state, which breaks the
"every page stays prerendered" rule `npm run budgets` enforces. Build-time env var
(`NEXT_PUBLIC_SHOW_PRICES`) + redeploy only. This now gates a whole homepage section
(`components/site/price-cards.tsx` → `Pricing`), not just blog/FAQ text: off, the section renders
nothing and ships no counter JS.

## The free offer

**One** offer, published everywhere: „Ein Webpart. Kostenlos. In 3 Tagen." — one per organisation.

Not three. A free demo *and* a free prototype *and* two free web parts is not more generous; it is
unpriced work, and to a KMU buyer it signals an empty calendar.

The bespoke re-themed demo stays a **sales tool**, deployed on the top 3–5 leads per week and capped
at half a day (playbook). It is never advertised as a public promise.

Flow: short form (company, email, screenshot or description) → confirmation → Cal.com booking as the
optional next step. The lead is captured even if they never book.

## Page order

1. Hero — blocks assembling into a working app
2. **Before/after slider** — moved up from deep in the page
3. Baukasten — the block catalogue
4. What we build (three services)
5. Interactive web part demos
6. How we work (board, weekly sprints)
7. Reference — one year of sprints
8. Security & DSGVO
9. Pricing teaser → pricing page
10. FAQ · Team · Contact

The slider is the strongest two seconds on the site: it makes the problem visceral before a word is
read. It was buried.

## Motion

**Functional scroll-driven motion only.** CSS scroll timelines (`animation-timeline: view()`),
near-zero JS, `prefers-reduced-motion` respected, every page still prerendered.

The rule: **scroll that reveals information is good; scroll that performs is not.** No scroll-jacking,
no pinned sections, no video scrubbing. The Apple product-page pattern was considered and rejected —
it sells desire to a consumer, while the visitor here is an IT lead with twenty minutes, and it would
blow both `npm run budgets` and `npm run lighthouse`.

Applied to: blocks snapping together (Baukasten), the slider wiping itself open on entry, web parts
assembling header → filter → cards.

The compare slider auto-sweeps once on first view, then a hand cursor wiggles twice and fades. It
demonstrates itself instead of asking the visitor to work it out.

**`components/site/hero-stage/` must be rebuilt.** It animates an inbox into an app — a literal
illustration of the retired headline.

## The offer panel

Silent. Bottom-right, slides in on 40% scroll / 25s / exit-intent, one border pulse, dismissible,
dismissal remembered in `localStorage`. Sticky bar on mobile.

No audio. Chrome and Safari block autoplay until the visitor interacts, so a cold visitor who reads
for five seconds without clicking hears nothing regardless — the feature would ship as risk and
deliver silence.

## DSGVO and security claims

Confirmed by the team, stated flatly, no hedging:

- Data stays in the client's own Microsoft 365 and SharePoint
- The client owns the code, the documentation and full control — no lock-in
- Keys and passwords live in a protected secret store, never in code, never in chat

A fifth, unconfirmed point was cut rather than published — `scripts/deploy-production.sh` already
refuses to deploy while `[TODO: …]` or `[PLACEHOLDER: …]` remain in `messages/`, and none do now.

## Search

Phase 1 — AI search: `llms.txt`, schema.org `Organization` + `Service`, `FAQPage` on the FAQ,
quotable fact blocks. Almost no German SharePoint shop has done this.

Phase 2 — keyword and region: `/de/spfx-entwickler`,
`/de/sharepoint-webparts-entwickeln-lassen`, regional pages (Berlin, Bayern, NRW) with the
Digitalbonus.Bayern angle. Every page needs an `/en` twin and an entry in `lib/i18n.ts` → `pages`.

## Language

All copy ships in `messages/de.ts` and `messages/en.ts` together. German is written first.

`de.ts` is marked ENTWURF — never reviewed by a native speaker. **One native-German pass over the
whole file, including the pre-existing copy, before the first outreach.** Slightly-off German on a
DSGVO page is what makes a German buyer quietly not reply.

## Still open

- Cal.com URL → `BOOKING_URL` in `lib/site-config.ts` (every booking CTA is dead until then)
- Taking over an existing codebase — yes / no / case-by-case
- Form endpoint: Next.js route handler + Resend (EU) recommended over US-hosted Formspree
- Which three web parts become genuinely interactive
- Who does the native-German review
