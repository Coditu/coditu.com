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

    test("hero: one h1, the free-task mail and booking CTAs, the mail's key words build the app", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(home);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(lang === "de" ? "Von der Mail zur App." : "From mail to app.");
      // Primary: a mail whose subject sets free-task requests apart from project requests.
      const subject = encodeURIComponent(lang === "de" ? "Kleine Aufgabe gratis" : "Free small task");
      const freeTask = page.locator(`#hero-title ~ * a[href^="mailto:contact@coditu.com?subject=${subject}&"]`);
      await expect(freeTask).toHaveText(lang === "de" ? "Kleine Aufgabe gratis testen" : "Try us free with a small task");
      // Secondary: no booking tool yet (BOOKING_URL is null), so it goes to the contact section.
      await expect(page.locator(`#hero-title ~ * a[href="#${lang === "de" ? "kontakt" : "contact"}"]`)).toHaveText(
        lang === "de" ? "Termin buchen" : "Book a call",
      );
      await expect(
        page.getByText(
          lang === "de"
            ? "1 Aufgabe pro Kunde · ein Screen oder eine Funktion · in bis zu 3 Tagen"
            : "1 task per client · one screen or one feature · in up to 3 days",
        ),
      ).toBeVisible();
      // Text on the left, the stage beside it on the right, both above the fold.
      const stage = page.locator("[data-hero-stage]");
      const h1 = (await page.locator("h1").boundingBox())!;
      const box = (await stage.boundingBox())!;
      expect(box.x).toBeGreaterThan(h1.x + h1.width / 2);
      expect(box.y).toBeLessThan(900);

      // The stage is decoration with one sentence for screen readers, and nothing in it takes focus.
      await expect(stage).toHaveAttribute("aria-hidden", "true");
      await expect(page.locator('section[aria-labelledby="hero-title"] .sr-only')).toHaveCount(1);
      await expect(stage.locator("input, select, textarea, button, a, [tabindex]")).toHaveCount(0);

      // A mail app: the inbox list beside the open mail; its four key words light up.
      const mail = stage.locator('[data-part="mail"]');
      await expect(mail.getByText(lang === "de" ? "IT-Support" : "IT support")).toBeVisible();
      await expect(mail.locator(".underline")).toHaveCount(4, { timeout: 5000 });

      // They land in the app: title, bookings table, calendar card, sign-in. Then it goes live.
      const app = stage.locator('[data-part="app"]');
      await expect(app.getByText(/^Live$/)).toBeVisible({ timeout: 10000 });
      for (const word of lang === "de" ? ["Dashboard", "Buchungen", "Kalender", "Login"] : ["dashboard", "bookings", "calendar", "login"]) {
        await expect(app.getByText(word, { exact: true })).toBeVisible();
      }
      await expect(app.getByText(lang === "de" ? "Raum 1" : "Room 1")).toBeVisible();
      await expect(mail).toHaveCSS("opacity", "0");
    });

    test("hero: below lg, the stage follows the text and fits the screen", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 800 });
      await page.goto(home);
      const h1 = (await page.locator("h1").boundingBox())!;
      const stage = page.locator("[data-hero-stage]");
      const box = (await stage.boundingBox())!;
      expect(box.y).toBeGreaterThan(h1.y + h1.height);
      expect(box.x + box.width).toBeLessThanOrEqual(375);
      // Narrow: the open mail only, no inbox list.
      await expect(stage.getByText(lang === "de" ? "IT-Support" : "IT support")).toBeHidden();
      // It plays only while on screen.
      await stage.scrollIntoViewIfNeeded();
      await expect(stage.getByText(/^Live$/)).toBeVisible({ timeout: 12000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    });

    test("hero: reduced motion shows the mail with its words lit, then the app, without flying", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(home);
      const stage = page.locator("[data-hero-stage]");
      await expect(stage.locator('[data-part="mail"] .underline')).toHaveCount(4);
      await expect(stage.getByText(/^Live$/)).toBeVisible({ timeout: 6000 });
    });

    test("services: three cards, mockup and text side by side, alternating", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(home);
      const cards = page.locator('section[aria-labelledby="services-title"] article');
      await expect(cards).toHaveCount(3);
      for (let i = 0; i < 3; i++) {
        const card = cards.nth(i);
        await card.scrollIntoViewIfNeeded();
        // A picture with callouts, named for screen readers by its caption.
        await expect(card.locator('figure > [aria-hidden="true"] [data-pin]')).toHaveCount(3);
        await expect(card.locator("figcaption .sr-only")).not.toBeEmpty();
        const figure = (await card.locator("figure").boundingBox())!;
        const text = (await card.locator("h3").boundingBox())!;
        if (i % 2 === 0) expect(text.x).toBeGreaterThan(figure.x + figure.width - 1);
        else expect(text.x + text.width).toBeLessThan(figure.x + 1);
      }
    });

    test("services: on a phone the mockup sits above the text and fits", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(home);
      const cards = page.locator('section[aria-labelledby="services-title"] article');
      for (let i = 0; i < 3; i++) {
        const card = cards.nth(i);
        await card.scrollIntoViewIfNeeded();
        const figure = (await card.locator("figure").boundingBox())!;
        expect((await card.locator("h3").boundingBox())!.y).toBeGreaterThanOrEqual(figure.y + figure.height - 1);
        expect(figure.x + figure.width).toBeLessThanOrEqual(320);
      }
    });

    test("reference: the section has its language's id", async ({ page }) => {
      await page.goto(home);
      const id = await page.locator('section[aria-labelledby="reference-title"]').getAttribute("id");
      expect(id).toBe(lang === "de" ? "referenz" : "reference");
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

    test("contact: follows the FAQ, the hero CTA lands on it, mailto with a subject", async ({ page }) => {
      await page.goto(home);
      const id = lang === "de" ? "kontakt" : "contact";
      await expect(page.locator('section[aria-labelledby="faq-title"] + section')).toHaveId(id);
      const section = page.locator(`#${id}`);
      await expect(section.locator('a[href^="mailto:contact@coditu.com?subject="]')).toHaveCount(1);
      // No booking tool yet (BOOKING_URL is null): no booking button.
      await expect(section.locator("a")).toHaveCount(2);
      await expect(section.getByText("Adam Nafie")).toBeVisible();

      await page.locator(`#hero-title ~ * a[href="#${id}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator("#contact-title")).toBeInViewport();
    });

    test("footer: section links, legal pages, contact", async ({ page }) => {
      await page.goto(home);
      const footer = page.locator("footer");
      for (const anchor of lang === "de" ? ["leistungen", "faq", "kontakt"] : ["services", "faq", "contact"]) {
        await expect(footer.locator(`a[href="${home}#${anchor}"]`)).toHaveCount(1);
      }
      await expect(footer.locator(`a[href="${imprint}"]`)).toHaveCount(1);
      await expect(footer.locator(`a[href="${privacy}"]`)).toHaveCount(1);
      await expect(footer.locator('a[href="mailto:contact@coditu.com"]')).toHaveCount(1);
      await expect(footer).toContainText(`© ${new Date().getFullYear()} Coditu`);
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

  test("services: every card is shown", async ({ page }) => {
    await page.goto("/de");
    const cards = page.locator('section[aria-labelledby="services-title"] article');
    await expect(cards).toHaveCount(3);
    for (let i = 0; i < 3; i++) await expect(cards.nth(i)).toBeVisible();
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
