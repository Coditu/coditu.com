import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * The site: routing, languages, claims, accessibility, layout. Sections add
 * their own tests as they land.
 */

const LANGS = [
  { lang: "de", home: "/de", imprint: "/de/impressum", privacy: "/de/datenschutz" },
  { lang: "en", home: "/en", imprint: "/en/legal-notice", privacy: "/en/privacy" },
] as const;

/** Every failing node by selector, so a regression names the element. */
async function audit(page: Page): Promise<string[]> {
  // Let entrances finish: axe sampling a word mid-fade reports contrast that
  // does not exist once it lands. Paused (scroll-gated) animations never settle.
  await page.evaluate(async () => {
    const running = document.getAnimations().filter((a) => a.playState === "running");
    await Promise.race([
      Promise.all(running.map((a) => a.finished.catch(() => undefined))),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
  });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  return results.violations.flatMap((v) => v.nodes.map((n) => `${v.id} @ ${n.target.join(" ")}`));
}

test("/ redirects to German", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/de$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
});

for (const { lang, home, imprint, privacy } of LANGS) {
  test.describe(lang, () => {
    test("html lang, own title, hreflang with x-default → German", async ({ page }) => {
      await page.goto(home);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      const hreflang = await page.evaluate(() =>
        Object.fromEntries(
          Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')).map((l) => [
            l.hreflang,
            new URL(l.href).pathname,
          ])
        )
      );
      expect(hreflang).toEqual({ de: "/de", en: "/en", "x-default": "/de" });
      expect(new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!).pathname).toBe(home);
    });

    test("the language switch lands on the same page in the other language", async ({ page }) => {
      const other = LANGS.find((l) => l.lang !== lang)!;
      for (const [from, to] of [
        [home, other.home],
        [imprint, other.imprint],
        [privacy, other.privacy],
      ]) {
        await page.goto(from);
        await page.locator(`header a[hreflang="${other.lang}"]`).click();
        await expect(page).toHaveURL(new RegExp(`${to}(#.*)?$`));
      }
    });

    test("nothing invented, no old name, no old address", async ({ page }) => {
      for (const path of [home, imprint, privacy]) {
        await page.goto(path);
        const text = (await page.locator("body").innerText()).toLowerCase();
        // Retired locations; the team is in Berlin and Cairo (docs/00-CONTEXT.md).
        expect(text).not.toMatch(/\b(munich|münchen|ulm)\b/);
        expect(text).not.toContain("hello@coditu.com");
        expect(text).not.toContain("strukture");
        expect(text).not.toMatch(/\b\d+\+? (happy )?(clients|kunden)\b/);
        expect((await page.title()).toLowerCase()).not.toContain("strukture");
      }
    });

    test("axe finds nothing, light and dark", async ({ page }) => {
      for (const colorScheme of ["light", "dark"] as const) {
        await page.emulateMedia({ colorScheme });
        for (const path of [home, imprint]) {
          await page.goto(path);
          expect(await audit(page), `${path} ${colorScheme}`).toEqual([]);
        }
      }
    });

    test("hero: one h1, mailto CTA, the form met once, slider by keyboard", async ({ page }) => {
      await page.goto(home);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('a[href^="mailto:contact@coditu.com?subject="]')).toHaveCount(1);

      // The sketch is a picture: its labels are not form controls, and it is hidden.
      await expect(page.getByLabel("Name", { exact: true })).toHaveCount(1);
      await expect(page.locator("figure[aria-hidden='true'] input")).toHaveCount(0);

      const range = page.locator(".cd-compare input[type=range]");
      await expect(range).toHaveValue("50");
      await range.focus();
      await page.keyboard.press("ArrowRight");
      await expect(range).toHaveValue("51");
      await expect(page.locator(".cd-compare")).toHaveAttribute("style", /--pos:\s*51%/);
      await expect(page.locator(".cd-compare")).toHaveAttribute("data-moved", "");
    });

    test("hero: reduced motion shows the resting state", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(home);
      const clip = await page.locator(".cd-wipe").evaluate((el) => getComputedStyle(el).clipPath);
      expect(clip).toContain("50%");
      const lit = await page.locator(".cd-step-on").evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
      expect(lit).toEqual(["1", "1", "1"]);
    });

    test("no horizontal scroll from 320 to 2560", async ({ page }) => {
      await page.goto(home);
      for (const width of [320, 360, 390, 430, 640, 744, 834, 1024, 1280, 1440, 1728, 1920, 2560]) {
        await page.setViewportSize({ width, height: 900 });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow, `at ${width}px`).toBeLessThanOrEqual(1);
      }
    });
  });
}

test("the mobile menu opens, closes on Escape, and says so", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/de");
  const button = page.locator('button[aria-controls="mobile-menu"]');
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
});

test("sitemap lists both languages; unknown routes are 404", async ({ page }) => {
  const sitemap = await (await page.request.get("/sitemap.xml")).text();
  for (const path of ["/de", "/en", "/de/impressum", "/en/legal-notice", "/de/datenschutz", "/en/privacy"]) {
    expect(sitemap).toContain(`${path}<`);
  }
  for (const path of ["/fr", "/de/nope", "/en/impressum", "/app", "/login"]) {
    expect((await page.request.get(path)).status(), path).toBe(404);
  }
});
