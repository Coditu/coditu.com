#!/usr/bin/env bash
# Step 3 verification: the token and motion layer survives the production build.
#
# This exists because of a trap that fails SILENTLY. Tailwind v4 prunes
# `@layer utilities` down to the utilities it sees used, and an attribute
# selector such as `[data-reveal="section"]` is not a class name — it and its
# @keyframes vanish from the output with nothing in the build log to say so, and
# every reveal on the site quietly stops animating. Grep the built CSS, not the
# source.
#
# Usage: npm run build && ./scripts/verify-tokens.sh
set -uo pipefail
cd "$(dirname "$0")/.."

# EVERY built stylesheet, concatenated. A build emits more than one, and
# `find ... | head -1` returns whichever the filesystem lists first — which is
# the 74KB token layer on one machine and a 4KB fragment on another. The
# question here is "did this rule survive the build", not "is it in this
# particular chunk".
CSS_FILES=$(find .next/static -name '*.css' -type f)
if [ -z "$CSS_FILES" ]; then
  echo "no built CSS found — run 'npm run build' first" >&2
  exit 1
fi
CSS=$(mktemp -t coditu-css.XXXXXX)
# shellcheck disable=SC2086
cat $CSS_FILES > "$CSS"
trap 'rm -f "$CSS"' EXIT
echo "built CSS: $(printf '%s\n' $CSS_FILES | wc -l | tr -d ' ') file(s), $(wc -c < "$CSS" | tr -d ' ') bytes"

# The built CSS is minified: `--canvas: #ebeff6` becomes `--canvas:#ebeff6` and
# `[data-reveal="micro"]` loses its quotes. Compare with whitespace and quotes
# stripped from both sides so the check tracks meaning, not formatting.
NORM=$(tr -d ' \n\t"'"'" < "$CSS")

fail=0
need() {
  needle=$(printf '%s' "$2" | tr -d ' \t"'"'")
  if printf '%s' "$NORM" | grep -qF -- "$needle"; then
    echo "  ok   $1"
  else
    echo "  MISS $1  (looked for: $2)"; fail=1
  fi
}

echo
echo "Blueprint tokens, both themes (docs/design-system/tokens.md)"
need "light paper"         "--paper: #f7f6f2"
need "dark paper"          "--paper: #0f1216"
need "light ink"           "--ink: #14171c"
need "dark ink"            "--ink: #eceae4"
need "light blueprint"     "--blueprint: #1f4fd8"
need "dark blueprint"      "--blueprint: #86a2ff"
need "cta"                 "--cta: #ff8a1f"
need "cta ink"             "--cta-ink: #14171c"
need "field border"        "--line-input: #7d8189"
need "dark = system"       "prefers-color-scheme:dark"
need "grid paper"          "bg-blueprint-grid"

echo
echo "motion — the rules Tailwind is most likely to prune"
need "micro tier"          '[data-reveal="micro"]'
need "section tier"        '[data-reveal="section"]'
need "micro keyframes"     "cd-reveal-micro"
need "section keyframes"   "cd-reveal-section"
need "headline words"      "cd-word"
need "draw-on"             "cd-draw"
need "on-view pause gate"  "[data-reveal-on-view]"
need "reduced motion"      "prefers-reduced-motion"
need "hero wipe"           "cd-wipe-handle"
need "hero sketch draw-in" "cd-sketch-in"
need "hero steps"          "cd-step-on"

# The reduced-motion block is where a dropped rule is least likely to be
# noticed, because nobody testing on a normal machine ever sees it.
need "rm: reveal collapses"   "animation-name:cd-fade!important"
need "rm: no scroll gate"     ".js[data-reveal-on-view]{animation-play-state:running!important}"
# Lightning CSS normalises `0ms` to `0s`, so match what actually ships.
need "rm: no stagger"         "animation-delay:0s!important"
need "rm: lines drawn"        "stroke-dashoffset:0!important"

echo
echo "server-rendered content must never ship hidden"
# A JS-driven reveal serialises its own hidden state, so the HTML arrives with
# real content at opacity 0 and stays invisible until React hydrates. `<Reveal>`
# is CSS-driven precisely to avoid that. Since step 12 there is no Framer reveal
# left anywhere, so this is a hard failure rather than a warning.
offenders=$(grep -rlF 'opacity:0' --include='*.html' .next/server/app 2>/dev/null || true)
if [ -n "$offenders" ]; then
  for f in $offenders; do
    echo "  FAIL $f prerenders content at opacity:0"
  done
  fail=1
else
  echo "  ok   no prerendered content shipped hidden"
fi

echo
if [ "$fail" -eq 0 ]; then echo "tokens: OK"; else echo "tokens: FAILED"; exit 1; fi
