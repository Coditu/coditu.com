/**
 * Screenshots every still frame of the hero stage from the dev review page
 * (app/dev/hero-frames) into docs/design-system/hero-frames/<shot>.png.
 *
 *   npm run dev                        # in another terminal
 *   node scripts/shoot-hero-frames.mjs # against $E2E_BASE_URL, default :3000
 */
import { mkdirSync } from "node:fs";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3000";
const OUT = "docs/design-system/hero-frames";

const { chromium } = await import("playwright-core");
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 2000, height: 1000 }, deviceScaleFactor: 2 });
  await page.goto(`${BASE}/dev/hero-frames`, { waitUntil: "networkidle" });
  // Caveat is not preloaded; wait until the handwriting is really drawn in it.
  await page.evaluate(() => document.fonts.ready);
  // The dev overlay badge is not part of the frame.
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  mkdirSync(OUT, { recursive: true });
  const shots = page.locator("[data-shot]");
  const count = await shots.count();
  if (count === 0) throw new Error(`no [data-shot] on ${BASE}/dev/hero-frames — is the dev server running?`);
  for (let i = 0; i < count; i++) {
    const shot = shots.nth(i);
    const name = await shot.getAttribute("data-shot");
    await shot.screenshot({ path: `${OUT}/${name}.png` });
    console.log(`ok  ${name}.png`);
  }
} finally {
  await browser.close();
}
