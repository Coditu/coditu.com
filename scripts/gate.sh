#!/usr/bin/env bash
# The routine gate, as one command.
#
# A check that only runs when somebody remembers is not a check, so the list is
# executable.
#
#   npm run gate              everything
#   npm run gate -- --fast    skip the two long browser passes
set -euo pipefail
cd "$(dirname "$0")/.."

FAST=0
[ "${1:-}" = "--fast" ] && FAST=1

step() { printf '\n\033[1m── %s\033[0m\n' "$1"; }

step "git diff --check"; git diff --check
step "lint";             npm run lint
step "typecheck";        npm run typecheck
step "test";             npm run test

# One build, three consumers. `SKIP_BUILD=1` on the later ones so the gate does
# not build the site three times to ask it three questions.
step "build";            npm run build
step "tokens";           ./scripts/verify-tokens.sh
step "budgets";          SKIP_BUILD=1 ./scripts/with-prod-server.sh node scripts/check-budgets.mjs

if [ "$FAST" = "1" ]; then
  printf '\n\033[1mgate: OK (--fast — `npm run e2e` and `npm run lighthouse` were not run)\033[0m\n'
  exit 0
fi

step "e2e";        npm run e2e
step "lighthouse"; SKIP_BUILD=1 ./scripts/with-prod-server.sh node scripts/lighthouse.mjs

printf '\n\033[1mgate: OK\033[0m\n'
