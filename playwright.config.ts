import { defineConfig, devices } from "@playwright/test";

/** One answer for both `use.baseURL` and `webServer.url`. */
const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

/**
 * E2E and accessibility suite for the site, against the dev server.
 *
 * `reuseExistingServer` locally so a run does not fight the server you already
 * have open; CI always starts its own.
 */
export default defineConfig({
  testDir: "./e2e",
  // `.gitignore` keeps `e2e/*.local.spec.ts` out of git; this keeps them out of
  // the routine run. `E2E_LOCAL=1` turns one back on deliberately.
  testIgnore: process.env.E2E_LOCAL ? [] : "**/*.local.spec.ts",
  // 10 s for an assertion, not the default 5: a suite that only passes on an
  // idle machine is not a suite anybody can trust.
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "line" : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  /**
   * **Playwright's WebKit is not iOS Safari.** It is the same engine built for
   * a different platform. It catches layout and touch regressions, which is
   * worth having, and it is not a substitute for looking at a real handset.
   */
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 15"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
