# 03 — Deployment checklist

What to check before the first production deploy, and what each piece means. Written
2026-11-01, after a round of work that got `main` fully gated and green but never once
deployed — see "Why nothing has deployed yet" below, which was the actual blocker.

---

## Why nothing has deployed yet

Two things both have to be true, and right now neither is:

1. **Vercel's own auto-deploy is off on purpose.** `vercel.json` sets
   `git.deploymentEnabled.main: false`. This repo does not deploy on push — it deploys only
   through its own GitHub Actions pipeline, which runs the full gate first. This is
   intentional (see `CLAUDE.md`) and should stay off.
2. **That pipeline's deploy job needs four values that are not set in the GitHub repo**, so
   it has been silently skipping on every single run. Check with:

   ```bash
   gh run view <run-id>   # look for the "production deploy after blocking checks" job
   ```

   It will say `skipped`, and a job earlier in the same run — "is the production deploy
   configured" — prints exactly which of the four are missing.

## The four values to set

In the GitHub repo: **Settings → Secrets and variables → Actions.**

| Name | Kind | Where it comes from |
|---|---|---|
| `VERCEL_TOKEN` | Repository secret | Vercel → Account Settings → Tokens. Create one scoped to this project if possible. |
| `VERCEL_ORG_ID` | Repository secret | Vercel project → Settings → General ("Project ID" section also shows the org/team ID), or `.vercel/project.json` after running `vercel link` locally. |
| `VERCEL_PROJECT_ID` | Repository secret | Same place as above. |
| `PRODUCTION_BASE_URL` | Repository **variable** (not secret — it's public, just the live URL) | The production domain, e.g. `https://coditu.com`. Must be one HTTPS origin, no path (the deploy script validates this and fails loudly if it's wrong). |

Once all four are set, the **next push to `main`** (or the next successful CI run on an
existing commit, if re-run) will deploy automatically. Nothing else needs to change — the
pipeline, the smoke tests, and the rollback-on-failure logic in
`scripts/deploy-production.sh` are already built and tested, just never exercised for real
because the deploy job has never run.

### What that pipeline actually does, once it can run

From `scripts/deploy-production.sh` (already in the repo, already correct — read for the
full detail, this is the short version):

1. Builds on Vercel (not in CI) — some production env vars are marked Sensitive/write-only
   in Vercel, so `vercel pull` can't read them back; the build has to happen where they
   resolve.
2. Stages the build as a preview deployment, smoke-tests it (`/build-health.json` plus
   `/`, `/de`, `/en`) before touching the live domain.
3. Promotes that staged deployment to production only if the smoke test passes.
4. Smoke-tests production itself after promotion.
5. **Automatically rolls back** to the previous deployment if the post-promotion smoke
   test fails, and verifies the rollback itself worked.

This is a real blue/green deploy with an automatic rollback, already built. It has simply
never run end-to-end against real Vercel credentials.

## Before the first real deploy, also check

- **Legal placeholders.** `messages/de.ts` and `messages/en.ts` each still carry
  `[PLACEHOLDER: …]` markers in the Impressum/Datenschutz content (16 in German, 15 in
  English, as of this file's writing) — real company registration details only the team
  can fill: legal name, address, register court, VAT ID, etc. `scripts/deploy-production.sh`
  **refuses to deploy while any `[PLACEHOLDER: …]` or `[TODO: …]` remains** in `messages/` —
  this is already enforced, not something to remember to check manually. Run:

  ```bash
  grep -rnF -e '[PLACEHOLDER' -e '[TODO' messages
  ```

  to see exactly what's left.

- **Env vars at build time** (set in Vercel → Project → Settings → Environment Variables,
  not in GitHub):
  - `NEXT_PUBLIC_SHOW_PRICES` — optional. Unset or anything other than the literal string
    `"false"` shows prices (600 €/web part, 70 €/h, and the counted pricing cards on the
    homepage). Set to `false` to hide them — requires a redeploy to take effect; it's a
    **build-time** switch, not a runtime one (the site has no backend and every page stays
    prerendered on purpose).
  - `NEXT_PUBLIC_SITE_URL` — optional, see `.env.example`. Falls back to Vercel's own
    production URL if unset, so this normally doesn't need setting explicitly.
  - No other env var is required for the build to succeed — that's a deliberate repo rule
    (`CLAUDE.md`: "no backend, no database, no auth and no environment variable the build
    needs").

- **`BOOKING_URL`** (`lib/site-config.ts`) is hardcoded, not an env var — currently
  `https://cal.com/coditu/30min`. If that link ever changes, it's a code change (one line),
  not a deploy setting.

- **Playwright browsers**, if anyone runs `npm run e2e` or `npm run budgets`/`npm run
  lighthouse` on a machine that's never run them before: `npx playwright install chromium
  firefox webkit`. CI already has these cached/installed via its own setup step; this is
  only relevant locally.

- **`npm run gate`** is the full list (typecheck, lint, unit tests, build, budgets,
  lighthouse, e2e). CI runs the `--fast` variant (skips e2e + lighthouse) as the blocking
  check, then runs lighthouse separately as report-only. Nothing here needs to change —
  just know what's actually gating the deploy if something looks slow or confusing in the
  Actions log.

## After the four values are set

1. Push anything to `main`, or re-run the most recent CI run from the GitHub Actions tab.
2. Watch the "production deploy after blocking checks" job — it should go from `skipped`
   to actually running.
3. Confirm the live site at `PRODUCTION_BASE_URL` reflects the latest commit:
   `curl https://coditu.com/build-health.json` should show `"status":"ok"` and a `commit`
   matching `git rev-parse HEAD` on `main`.
