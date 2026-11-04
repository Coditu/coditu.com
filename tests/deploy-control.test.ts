import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * `vercel.json` controls whether a push to `main` triggers a production
 * deployment directly through Vercel's own git integration.
 *
 * As of 2026-11-04, `git.deploymentEnabled.main` is `true` on purpose: every
 * push to `main` deploys straight to production, with no gate from the
 * GitHub Actions pipeline (tests, smoke test, auto-rollback) in front of it.
 * That pipeline still exists (`scripts/deploy-production.sh`) but is not
 * what puts code live while this flag is on.
 */

const config = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../vercel.json"), "utf8"),
) as { git?: { deploymentEnabled?: boolean | Record<string, boolean> } };

describe("vercel.json deploys main directly from a push", () => {
  it("declares git.deploymentEnabled", () => {
    expect(config.git).toBeDefined();
    expect(config.git?.deploymentEnabled).toBeDefined();
  });

  it("enables main, whichever of the two shapes is used", () => {
    const enabled = config.git?.deploymentEnabled;

    if (typeof enabled === "boolean") {
      expect(enabled).toBe(true);
      return;
    }

    expect(enabled).toBeTypeOf("object");
    expect(enabled).toHaveProperty("main");
    expect((enabled as Record<string, boolean>).main).toBe(true);
  });

  it("does not carry the deprecated github.enabled instead", () => {
    // `github.enabled` reads like the same control and is deprecated in favour
    // of `git.deploymentEnabled`. Someone replacing one with the other would
    // otherwise leave this file looking configured while Vercel ignores it.
    const raw = readFileSync(resolve(import.meta.dirname, "../vercel.json"), "utf8");
    const parsed = JSON.parse(raw) as { github?: { enabled?: boolean } };
    expect(parsed.github?.enabled).toBeUndefined();
  });
});
