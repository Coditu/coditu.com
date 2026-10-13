<p align="center">
  <img src="./public/brand/lockup-horizontal.svg" alt="Coditu" width="180" />
</p>

<p align="center">
  The Coditu site: one statically prerendered Next.js page, no backend.
</p>

---

## Getting it running

```bash
npm install
npm run dev
```

No environment variables are required. `NEXT_PUBLIC_SITE_URL` is optional; see
[`.env.example`](./.env.example).

## Where things are

- `app/(marketing)/page.tsx` — the page.
- `components/site/` — its sections.
- `lib/marketing-content.ts` — every word of copy and all structured data.
- `app/globals.css` — the design tokens; documented in
  [`docs/01-DESIGN-SYSTEM.md`](./docs/01-DESIGN-SYSTEM.md).
- [`docs/00-CONTEXT.md`](./docs/00-CONTEXT.md) — who Coditu is and the voice rules.

## Checks

```bash
npm run gate            # lint, typecheck, unit, build, tokens, budgets, e2e, lighthouse
npm run gate -- --fast  # skips e2e and lighthouse
```

## Deploying

Production deploys from CI when the checks on `main` are green
(`.github/workflows/ci.yml` → `scripts/deploy-production.sh`): stage on Vercel,
smoke, promote, and roll back if the public smoke fails. `vercel.json` disables
Git deployments for `main` so a push alone never ships; branch previews still
build.

CI needs `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` and `VERCEL_TOKEN` as secrets and
`PRODUCTION_BASE_URL` as a variable, on the `Production` environment.

## History

This repository also held Coditu's internal delivery app until 2026-10-13. The
last commit that contains it is tagged `pre-split`.
