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
        // The reference client stays anonymous.
        expect(text).not.toMatch(/evim/);
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

    test("theme: system by default, toggle overrides and is kept", async ({ page }) => {
      const html = page.locator("html");
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(home);
      await expect(html).toHaveAttribute("data-theme", "dark");

      await page.getByRole("button", { name: /hell \/ dunkel|light \/ dark/i }).click();
      await expect(html).toHaveAttribute("data-theme", "light");
      await page.reload();
      await expect(html).toHaveAttribute("data-theme", "light");
    });

    test("hero: one h1, mailto CTA, the request turns into the app", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(home);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('#hero-title ~ * a[href^="mailto:contact@coditu.com?subject="]')).toHaveCount(1);
      // Text on the left, the card beside it on the right, both above the fold.
      const h1 = (await page.locator("h1").boundingBox())!;
      const box = (await page.locator('section[aria-labelledby="hero-title"] [aria-hidden="true"]').first().boundingBox())!;
      expect(box.x).toBeGreaterThan(h1.x + h1.width / 2);
      expect(box.y).toBeLessThan(900);

      // The card is decoration with one sentence for screen readers; its app goes live.
      const card = page.locator('section[aria-labelledby="hero-title"] [aria-hidden="true"]').first();
      await expect(card).toBeVisible();
      await expect(page.locator('section[aria-labelledby="hero-title"] .sr-only')).toHaveCount(1);
      await expect(card.getByText(/^Live$/)).toBeVisible({ timeout: 8000 });
    });

    test("hero: reduced motion skips the typing and still shows the app", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(home);
      await expect(page.locator(".cd-caret")).toHaveCount(0);
      const card = page.locator('section[aria-labelledby="hero-title"] [aria-hidden="true"]').first();
      await expect(card.getByText(/^Live$/)).toBeVisible({ timeout: 8000 });
    });

    test("services: tabs under the showcase, by mouse and keyboard", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(home);
      const tabs = page.locator('section[aria-labelledby="services-title"] [role="tab"]');
      await expect(tabs).toHaveCount(4);
      await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
      await expect(page.locator("#svc-panel-0")).toBeVisible();
      await expect(page.locator("#svc-panel-1")).toBeHidden();

      // The tabs sit under the showcase and do not move when the panel changes.
      const panel = (await page.locator("#svc-panel-0").boundingBox())!;
      const before = (await tabs.nth(0).boundingBox())!;
      expect(before.y).toBeGreaterThanOrEqual(panel.y + panel.height - 1);

      await tabs.nth(1).click();
      await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
      await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "false");
      await expect(page.locator("#svc-panel-1")).toBeVisible();
      await expect(page.locator("#svc-panel-0")).toBeHidden();
      expect((await tabs.nth(0).boundingBox())!.y).toBeCloseTo(before.y, 0);

      await page.keyboard.press("ArrowRight");
      await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
      await expect(tabs.nth(2)).toBeFocused();
      await page.keyboard.press("End");
      await expect(tabs.nth(3)).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press("ArrowRight");
      await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
      await expect(page.locator("#svc-panel-0")).toBeVisible();
    });

    test("services: on a phone the tabs sit above the showcase", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(home);
      const tabs = page.locator('section[aria-labelledby="services-title"] [role="tab"]');
      await tabs.nth(2).click();
      const panel = page.locator("#svc-panel-2");
      await expect(panel).toBeVisible();
      const tab = (await tabs.nth(3).boundingBox())!;
      expect((await panel.boundingBox())!.y).toBeGreaterThanOrEqual(tab.y + tab.height - 1);
    });

    test("reference: the Services project cards land on the case study", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(home);
      const section = page.locator('section[aria-labelledby="reference-title"]');
      const id = await section.getAttribute("id");
      expect(id).toBe(lang === "de" ? "referenz" : "reference");

      await page.locator('section[aria-labelledby="services-title"] [role="tab"]').nth(2).click();
      await page.locator(`#svc-panel-2 a[href="#${id}"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator("#reference-title")).toBeInViewport();
    });

    test("security: follows the case study, five points", async ({ page }) => {
      await page.goto(home);
      const section = page.locator('section[aria-labelledby="security-title"]');
      expect(await section.getAttribute("id")).toBe(lang === "de" ? "sicherheit" : "security");
      await expect(page.locator('section[aria-labelledby="reference-title"] + section')).toHaveId(/^(sicherheit|security)$/);
      await expect(section.locator("h3")).toHaveCount(5);
    });

    test("faq: follows security, all closed, opens by keyboard, JSON-LD says the same", async ({ page }) => {
      await page.goto(home);
      const section = page.locator('section[aria-labelledby="faq-title"]');
      await expect(page.locator('section[aria-labelledby="security-title"] + section')).toHaveId("faq");
      await expect(section.locator("details[open]")).toHaveCount(0);

      const first = section.locator("details").first();
      await first.locator("summary").focus();
      await page.keyboard.press("Enter");
      await expect(first).toHaveAttribute("open", "");

      const ld = JSON.parse((await section.locator('script[type="application/ld+json"]').textContent())!);
      expect(ld["@type"]).toBe("FAQPage");
      const questions = (await section.locator("summary").allInnerTexts()).map((q) => q.trim());
      expect(ld.mainEntity.map((q: { name: string }) => q.name)).toEqual(questions);
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

test.describe("without JS", () => {
  test.use({ javaScriptEnabled: false });

  test("services: every panel is shown, no tab bar", async ({ page }) => {
    await page.goto("/de");
    for (let i = 0; i < 4; i++) await expect(page.locator(`#svc-panel-${i}`)).toBeVisible();
    await expect(page.locator('[role="tablist"]')).toBeHidden();
  });
});

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
