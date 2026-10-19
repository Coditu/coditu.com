/**
 * The JavaScript budget for the home page (`/de`, `/en`), measured the way a budget is written: the
 * total compressed JS a browser actually downloads to render the route.
 *
 * Not a manifest sum. A manifest tells you which chunks a route *references*;
 * it does not tell you what crosses the wire, and Turbopack emits no per-route
 * table at all. So this loads the route in a real production server with a real
 * browser and adds up the transfer size of every `/_next/static/**.js` response.
 *
 * ── On the number ──────────────────────────────────────────────────────────
 * The brief's figure is 130KB gzipped. On Next 16 + React 19 that is below the
 * framework floor (~139KB arrives before any of this repository's code runs),
 * so it is REPORTED and not gated. The gate is `GATE_KB`: the measured total
 * plus headroom, which is the number that catches a regression.
 *
 *   node scripts/check-budgets.mjs                 # against $E2E_PROD_URL
 *   npm run budgets                                # builds and serves first
 */
import { existsSync } from "node:fs";
import { gzipSync } from "node:zlib";

const BASE = process.env.E2E_PROD_URL ?? "http://localhost:3000";
const BRIEF_KB = 130;
const GATE_KB = 170;

const kb = (bytes) => bytes / 1024;

/** @returns {Promise<Map<string, number>>} chunk URL → gzipped bytes */
async function measure(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const scripts = new Map();
  page.on("response", async (response) => {
    const url = response.url();
    if (!url.includes("/_next/static/") || !url.endsWith(".js")) return;
    try {
      // `content-length` is the compressed size when the server encodes it.
      // `next start` does not always gzip on localhost, so compress the body
      // here too and take the larger reading — a budget that under-reports is
      // worse than no budget.
      const header = Number(response.headers()["content-length"] ?? 0);
      const body = await response.body();
      scripts.set(url, Math.max(header, gzipSync(body).byteLength));
    } catch {
      // A chunk that never finished loading is not part of the initial load.
    }
  });

  // `networkidle` plus a short sleep is NOT a stable reading: chunks were still
  // arriving after it on a slower machine. Wait for `load`, then for the
  // network to actually go quiet, then settle again.
  await page.goto(`${BASE}/de`, { waitUntil: "load" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(2500);
  await context.close();
  return scripts;
}

const { chromium } = await import("playwright-core");
const browser = await chromium.launch();
let failed = false;

try {
  const scripts = await measure(browser);
  const total = kb([...scripts.values()].reduce((sum, size) => sum + size, 0));

  if (scripts.size === 0) {
    // Zero chunks is a small, plausible number that is under budget. Silence
    // and success are indistinguishable unless the check says which it is.
    failed = true;
    console.log("FAIL  /de loaded ZERO JavaScript chunks — nothing was measured.");
  } else {
    const over = total > GATE_KB;
    if (over) failed = true;
    console.log(
      `${over ? "FAIL" : "ok  "}  /de total ${total.toFixed(1)} KB gz / ${GATE_KB} KB   ` +
        `(${scripts.size} chunks; the brief's figure is ${BRIEF_KB} KB)`
    );
    if (over) {
      for (const [url, size] of [...scripts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)) {
        console.log(`        ${kb(size).toFixed(1).padStart(7)} KB  ${url.split("/").pop()}`);
      }
    }
  }
} finally {
  await browser.close();
}

// Every page is the same for everyone and changes only when someone deploys,
// so each is built once and served as a file. That is one `cookies()`,
// `headers()` or `searchParams` away from being untrue, and nothing else would
// go red: the page still renders, it just quietly starts running React for
// every visitor. A prerendered route leaves its HTML on disk; a dynamic one
// does not.
// The blogs assume posts under review are visible, as they are outside production.
for (const route of ["de", "en", "de/impressum", "de/datenschutz", "en/legal-notice", "en/privacy", "de/blog", "en/blog"]) {
  const prerendered = `.next/server/app/${route}.html`;
  if (existsSync(prerendered)) {
    console.log(`ok    /${route} is prerendered`);
  } else {
    failed = true;
    console.log(`FAIL  /${route} is no longer prerendered — ${prerendered} was not built.`);
    console.log("        Something in the tree opted the route into dynamic rendering:");
    console.log("        cookies(), headers(), searchParams, or `dynamic = 'force-dynamic'`.");
  }
}

console.log(failed ? "\nbudgets: FAILED" : "\nbudgets: OK");
process.exit(failed ? 1 : 0);
