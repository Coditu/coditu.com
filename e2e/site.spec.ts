import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * The site: routing, languages, claims, accessibility, layout. Sections add
 * their own tests as they land.
 */

const LANGS = [
  { lang: "de", home: "/de", imprint: "/de/impressum", privacy: "/de/datenschutz", pricing: "/de/pricing" },
  { lang: "en", home: "/en", imprint: "/en/legal-notice", privacy: "/en/privacy", pricing: "/en/pricing" },
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

for (const { lang, home, imprint, privacy, pricing } of LANGS) {
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
        [pricing, other.pricing],
      ]) {
        await page.goto(from);
        await page.locator(`header a[hreflang="${other.lang}"]`).click();
        await expect(page).toHaveURL(new RegExp(`${to}(#.*)?$`));
      }
    });

    test("nothing invented, no old name, no old address", async ({ page }) => {
      for (const path of [home, imprint, privacy, pricing]) {
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

    test("offer panel: hidden on load, appears after 25s, dismissible, dismissal persists across reload", async ({ page }) => {
      test.setTimeout(90_000);
      const subject = encodeURIComponent(lang === "de" ? "Kleine Aufgabe gratis – Panel" : "Free small task – Panel");
      const cta = lang === "de" ? "Kostenlos anfragen" : "Request it free";
      const close = lang === "de" ? "Angebot schließen" : "Close offer";

      await page.goto(home);
      const panel = page.locator("aside");
      await expect(panel).toHaveCount(0);

      // The real 25 s timer — no scroll, no mouse movement, so neither of the
      // other two triggers fires first.
      await expect(panel).toBeVisible({ timeout: 30_000 });
      await expect(panel.locator(`a[href^="mailto:contact@coditu.com?subject=${subject}&"]`)).toHaveText(cta);

      // Dismissible, by a real <button> with an accessible name, reachable by keyboard.
      const closeButton = panel.getByRole("button", { name: close });
      await closeButton.focus();
      await page.keyboard.press("Enter");
      await expect(panel).toHaveCount(0);

      // Remembered via localStorage: still gone after a reload, even once the
      // same trigger would otherwise fire again.
      await page.reload();
      await page.waitForTimeout(27_000);
      await expect(page.locator("aside")).toHaveCount(0);
    });

    test("hero: one h1, the free-task mail and booking CTAs, the picker's blocks build the app", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(home);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(
        lang === "de" ? "Sie wählen die Bausteine. Wir bauen Ihre App." : "You pick the building blocks. We build your app.",
      );
      // Primary: a mail whose subject sets free-task requests apart from project requests.
      const subject = encodeURIComponent(lang === "de" ? "Kleine Aufgabe gratis" : "Free small task");
      const freeTask = page.locator(`#hero-title ~ * a[href^="mailto:contact@coditu.com?subject=${subject}&"]`);
      await expect(freeTask).toHaveText(lang === "de" ? "Kleine Aufgabe gratis sichern" : "Try us free with a small task");
      // Secondary: BOOKING_URL is set (lib/site-config.ts), so it goes straight to Cal.com.
      await expect(page.locator(`#hero-title ~ * a[href="https://cal.com/coditu/30min"]`)).toHaveText(
        lang === "de" ? "Gespräch buchen" : "Book a call",
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

      // A block catalogue: the four real blocks beside decorative "more" ones; all four get picked.
      const picker = stage.locator('[data-part="picker"]');
      await expect(picker.getByText(lang === "de" ? "Formular" : "Form")).toBeVisible();
      await expect(picker.locator('[data-picked="true"]')).toHaveCount(4, { timeout: 5000 });

      // They land in the app: title, bookings table, calendar card, sign-in. Then it goes live.
      const app = stage.locator('[data-part="app"]');
      await expect(app.getByText(/^Live$/)).toBeVisible({ timeout: 10000 });
      for (const word of lang === "de" ? ["Dashboard", "Buchungen", "Kalender", "Login"] : ["Dashboard", "Bookings", "Calendar", "Login"]) {
        await expect(app.getByText(word, { exact: true })).toBeVisible();
      }
      await expect(app.getByText(lang === "de" ? "Raum 1" : "Room 1")).toBeVisible();
      await expect(picker).toHaveCSS("opacity", "0");
    });

    test("hero: below lg, the stage follows the text and fits the screen", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 800 });
      await page.goto(home);
      const h1 = (await page.locator("h1").boundingBox())!;
      const stage = page.locator("[data-hero-stage]");
      const box = (await stage.boundingBox())!;
      expect(box.y).toBeGreaterThan(h1.y + h1.height);
      expect(box.x + box.width).toBeLessThanOrEqual(375);
      // Narrow: the four real blocks only, the decorative "more" catalogue entries hidden.
      await expect(stage.getByText(lang === "de" ? "Formular" : "Form")).toBeHidden();
      // It plays only while on screen.
      await stage.scrollIntoViewIfNeeded();
      await expect(stage.getByText(/^Live$/)).toBeVisible({ timeout: 12000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    });

    test("hero: reduced motion shows the blocks already picked, then the app, without flying", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(home);
      const stage = page.locator("[data-hero-stage]");
      await expect(stage.locator('[data-part="picker"] [data-picked="true"]')).toHaveCount(4);
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

    test("services: the calendar mockup's area filter is real — dims non-matching events, announces the change", async ({
      page,
    }) => {
      await page.goto(home);
      const card = page.locator('section[aria-labelledby="services-title"] article').first();
      await card.scrollIntoViewIfNeeded();

      const group = card.getByRole("group", { name: lang === "de" ? "Bereich" : "Area" });
      const area = lang === "de" ? "Verwaltung" : "Admin";
      const allButton = group.getByRole("button", { name: lang === "de" ? "Alle Bereiche" : "All areas" });
      const areaButton = group.getByRole("button", { name: area, exact: true });

      // Starts unfiltered.
      await expect(allButton).toHaveAttribute("aria-pressed", "true");
      await expect(areaButton).toHaveAttribute("aria-pressed", "false");

      // A real, keyboard-reachable control — not just a click target.
      await areaButton.focus();
      await page.keyboard.press("Enter");
      await expect(areaButton).toHaveAttribute("aria-pressed", "true");
      await expect(allButton).toHaveAttribute("aria-pressed", "false");

      // It actually filters the picture: an event from a different area dims.
      // Scoped to the aria-hidden picture, not the real filter buttons —
      // both render area names as text.
      const picture = card.locator('[aria-hidden="true"]');
      const otherArea = lang === "de" ? "Bildung" : "Education";
      const otherEvent = picture.getByText(otherArea, { exact: true }).first();
      await expect(otherEvent.locator("xpath=ancestor::div[contains(@class,'opacity-30')][1]")).toHaveCount(1);

      // And a screen reader is told, even though the picture itself is aria-hidden.
      await expect(card.getByText(`${lang === "de" ? "Bereich" : "Area"}: ${area}`)).toHaveCount(1);

      // Back to "all": nothing stays dimmed.
      await allButton.click();
      await expect(picture.locator(".opacity-30")).toHaveCount(0);
    });

    test("services: the planner mockup's status filter is real — dims entries in other statuses", async ({ page }) => {
      await page.goto(home);
      const card = page.locator('section[aria-labelledby="services-title"] article').nth(1);
      await card.scrollIntoViewIfNeeded();

      const label = lang === "de" ? "Status auf einen Blick" : "Status at a glance";
      const group = card.getByRole("group", { name: label });
      const status = lang === "de" ? "Entwurf" : "Draft";
      const statusButton = group.getByRole("button", { name: status, exact: true });
      const picture = card.locator('[aria-hidden="true"]');

      await expect(statusButton).toHaveAttribute("aria-pressed", "false");
      await statusButton.focus();
      await page.keyboard.press("Enter");
      await expect(statusButton).toHaveAttribute("aria-pressed", "true");

      // An entry with a different status dims; the matching one doesn't.
      const otherStatus = lang === "de" ? "Veröffentlicht" : "Published";
      const otherEntry = picture.getByText(otherStatus, { exact: true }).first();
      await expect(otherEntry.locator("xpath=ancestor::div[contains(@class,'opacity-30')][1]")).toHaveCount(1);
      const matchingEntry = picture.getByText(status, { exact: true }).first();
      await expect(matchingEntry.locator("xpath=ancestor::div[contains(@class,'opacity-30')][1]")).toHaveCount(0);

      await expect(card.getByText(`${label}: ${status}`)).toHaveCount(1);
    });

    test("intranet: follows hero, the slider works by keyboard, the CTA is the free task marked Intranet", async ({ page }) => {
      // Reduced motion, set BEFORE navigation — it's the one documented way to
      // turn off the slider's own self-demo (tokens.md "compare-slider
      // auto-demo"), so a keyboard press lands on a value this test can
      // predict instead of racing an in-flight sweep. The component reads
      // this once at mount, so it has to be set before `goto`, not after.
      // The self-demo's own behaviour is covered by "compare-slider:
      // demonstrates itself..." below.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(home);
      const section = page.locator('section[aria-labelledby="intranet-title"]');
      // Promoted ahead of Services on 2026-11-01 (docs/02-POSITIONING.md "Page order") —
      // the before/after slider is the strongest two seconds on the site.
      await expect(page.locator('section[aria-labelledby="hero-title"] + section')).toHaveId("intranet");

      // Before/after: a native range input, pictures hidden from screen readers.
      const slider = section.getByRole("slider");
      await expect(slider).toHaveValue("50");
      await slider.focus();
      await page.keyboard.press("ArrowRight");
      await expect(slider).toHaveValue("51");
      await expect(section.locator("figure [aria-hidden] input, figure [aria-hidden] a, figure [aria-hidden] button")).toHaveCount(0);

      // The published post shows on the live intranet.
      await section.locator("figure").nth(1).scrollIntoViewIfNeeded();
      await expect(section.getByText(lang === "de" ? "Grippeimpfung im Haus ab 3. November" : "Flu jabs on site from 3 November")).toHaveCount(2);

      // One offer: the hero's free-task subject, marked Intranet.
      const subject = encodeURIComponent(lang === "de" ? "Kleine Aufgabe gratis – Intranet" : "Free small task – Intranet");
      await expect(section.locator(`a[href^="mailto:contact@coditu.com?subject=${subject}&"]`)).toHaveText(
        lang === "de" ? "Webpart kostenlos neu gestalten lassen" : "Get one web part redesigned free",
      );
    });

    test("compare-slider: demonstrates itself once on view, then settles back and hints at the drag", async ({ page }) => {
      // Full motion this time — this test is specifically about the self-demo
      // (tokens.md "compare-slider auto-demo" / "drag-hint"), which only runs
      // without prefers-reduced-motion.
      await page.goto(home);
      const slider = page.locator('section[aria-labelledby="intranet-title"]').getByRole("slider");
      await expect(slider).toHaveValue("50");
      await slider.scrollIntoViewIfNeeded();
      // The sweep's first leg moves it away from 50 within ~700 ms of entering view.
      await expect(slider).not.toHaveValue("50", { timeout: 2000 });
      // It returns to 50 once the full ~1.6 s sequence finishes.
      await expect(slider).toHaveValue("50", { timeout: 4000 });
    });

    test("baukasten: follows intranet, precedes services, four points, the proof panel names no client", async ({
      page,
    }) => {
      await page.goto(home);
      const section = page.locator('section[aria-labelledby="baukasten-title"]');
      expect(await section.getAttribute("id")).toBe("baukasten");
      await expect(page.locator('section[aria-labelledby="intranet-title"] + section')).toHaveId("baukasten");
      // Promoted ahead of Services on 2026-11-01 (docs/02-POSITIONING.md "Page order").
      await expect(page.locator('section[aria-labelledby="baukasten-title"] + section')).toHaveId(
        lang === "de" ? "leistungen" : "services",
      );
      await expect(section.locator("h3")).toHaveCount(4);
      // One real, anonymised number — see docs/02-POSITIONING.md "Baukasten
      // permissions". "nothing invented, no old name, no old address" (above)
      // already asserts the client's name never appears anywhere on the page.
      await expect(section.getByText(/6\+/)).toBeVisible();
    });

    test("reference: the section has its language's id", async ({ page }) => {
      await page.goto(home);
      const id = await page.locator('section[aria-labelledby="reference-title"]').getAttribute("id");
      expect(id).toBe(lang === "de" ? "referenz" : "reference");
    });

    test("security: follows the case study, four points", async ({ page }) => {
      await page.goto(home);
      const section = page.locator('section[aria-labelledby="security-title"]');
      expect(await section.getAttribute("id")).toBe(lang === "de" ? "sicherheit" : "security");
      await expect(page.locator('section[aria-labelledby="reference-title"] + section')).toHaveId(/^(sicherheit|security)$/);
      // Four confirmed points, not five — see docs/02-POSITIONING.md: no AVV
      // claim ships until a template exists.
      await expect(section.locator("h3")).toHaveCount(4);
    });

    test("pricing: follows security, precedes faq, shows a counted web part and hourly price", async ({ page }) => {
      await page.goto(home);
      const section = page.locator('section[aria-labelledby="pricing-title"]');
      expect(await section.getAttribute("id")).toBe(lang === "de" ? "preise" : "pricing");
      await expect(page.locator('section[aria-labelledby="security-title"] + section')).toHaveId(
        lang === "de" ? "preise" : "pricing"
      );
      await expect(page.locator('section[aria-labelledby="pricing-title"] + section')).toHaveId("faq");
      const cards = section.locator("li");
      await expect(cards).toHaveCount(2);
      await expect(cards.nth(0)).toContainText("600");
      await expect(cards.nth(1)).toContainText("70");

      // Links through to the dedicated pricing page.
      await page.getByRole("link", { name: lang === "de" ? "Alle Preise und Abrechnungsarten ansehen" : "See all prices and billing models" }).click();
      await expect(page).toHaveURL(new RegExp(`${pricing}$`));
    });

    test("pricing page: three billing models, both counted cards, a free-task CTA", async ({ page }) => {
      await page.goto(pricing);
      await expect(page.locator("h1")).toHaveText(lang === "de" ? "Preise" : "Pricing");

      const lists = page.locator("main ul");
      const models = lists.nth(0).locator("li");
      await expect(models).toHaveCount(3);

      const priceCards = lists.nth(1).locator("li");
      await expect(priceCards).toHaveCount(2);
      await expect(priceCards.nth(0)).toContainText("600");
      await expect(priceCards.nth(1)).toContainText("70");

      const subject = encodeURIComponent(lang === "de" ? "Kleine Aufgabe gratis – Preise" : "Free small task – Pricing");
      await expect(page.locator(`a[href^="mailto:contact@coditu.com?subject=${subject}&"]`)).toHaveText(
        lang === "de" ? "Kleine Aufgabe gratis sichern" : "Try us free with a small task",
      );
    });

    const LANDING_PAGES = [
      {
        slug: { de: "sharepoint-webparts-entwickeln-lassen", en: "sharepoint-web-parts-development" },
        title: { de: "SharePoint-Webparts entwickeln lassen", en: "SharePoint Web Parts Development" },
        subject: { de: "Kleine Aufgabe gratis – SharePoint Webparts", en: "Free small task – SharePoint Web Parts" },
        cta: { de: "Webpart kostenlos neu gestalten lassen", en: "Get one web part redesigned free" },
      },
      {
        slug: { de: "spfx-entwickler", en: "spfx-developer" },
        title: { de: "SPFx-Entwickler", en: "SPFx Developer" },
        subject: { de: "Kleine Aufgabe gratis – SPFx", en: "Free small task – SPFx" },
        cta: { de: "Kleine Aufgabe gratis sichern", en: "Try us free with a small task" },
      },
      {
        slug: { de: "sharepoint-entwicklung-berlin", en: "sharepoint-development-berlin" },
        title: { de: "SharePoint-Entwicklung Berlin", en: "SharePoint Development Berlin" },
        subject: { de: "Kleine Aufgabe gratis – Berlin", en: "Free small task – Berlin" },
        cta: { de: "Kleine Aufgabe gratis sichern", en: "Try us free with a small task" },
      },
      {
        slug: { de: "sharepoint-entwicklung-bayern", en: "sharepoint-development-bavaria" },
        title: { de: "SharePoint-Entwicklung Bayern", en: "SharePoint Development Bavaria" },
        subject: { de: "Kleine Aufgabe gratis – Bayern", en: "Free small task – Bavaria" },
        cta: { de: "Kleine Aufgabe gratis sichern", en: "Try us free with a small task" },
      },
    ] as const;

    for (const entry of LANDING_PAGES) {
      test(`keyword landing page: ${entry.title.en} — three points, two real proof stats, a priced CTA`, async ({ page }) => {
        await page.goto(`/${lang}/services/${entry.slug[lang]}`);
        await expect(page.locator("h1")).toHaveText(entry.title[lang]);

        const points = page.locator("main ul").nth(0).locator("li");
        await expect(points).toHaveCount(3);

        const proof = page.locator("main ul").nth(1).locator("li");
        await expect(proof).toHaveCount(2);
        await expect(proof.nth(0)).toContainText("40");

        const subject = encodeURIComponent(entry.subject[lang]);
        await expect(page.locator(`main a[href^="mailto:contact@coditu.com?subject=${subject}&"]`)).toHaveText(entry.cta[lang]);
      });
    }

    test("keyword landing page: the language switch stays on the same page, not the home page", async ({ page }) => {
      // lib/blog.ts switchPaths was specifically extended for this — confirmed
      // it fell back to the home page before that fix.
      await page.goto(`/${lang}/services/${LANDING_PAGES[0].slug[lang]}`);
      const otherLang = lang === "de" ? "en" : "de";
      await page.locator(`header a[hreflang="${otherLang}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/${otherLang}/services/${LANDING_PAGES[0].slug[otherLang]}$`));
    });

    test("faq: follows pricing, all closed, opens by keyboard, JSON-LD says the same", async ({ page }) => {
      await page.goto(home);
      const section = page.locator('section[aria-labelledby="faq-title"]');
      await expect(page.locator('section[aria-labelledby="pricing-title"] + section')).toHaveId("faq");
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

    test("Organization + Service JSON-LD: one script, right @types, locale-aware", async ({ page }) => {
      await page.goto(home);
      // Mounted once from the root layout (components/site/organization-schema.tsx),
      // not per visible section — docs/02-POSITIONING.md "Search", Phase 1. It sits
      // outside any <section> (the FAQ's own FAQPage JSON-LD lives inside one), and
      // is the only script on the page carrying an "@graph".
      const scripts = page.locator('script[type="application/ld+json"]');
      const texts = await scripts.allTextContents();
      const graphScripts = texts.filter((text) => JSON.parse(text)["@graph"]);
      expect(graphScripts).toHaveLength(1);
      const ld = JSON.parse(graphScripts[0]);
      expect(ld["@context"]).toBe("https://schema.org");
      const graph = ld["@graph"] as Array<Record<string, unknown>>;

      const org = graph.find((node) => node["@type"] === "Organization")!;
      expect(org.name).toBe("Coditu");
      expect(org.url).toBe("https://coditu.com");
      expect(org.email).toBe("contact@coditu.com");
      expect(org.inLanguage).toBe(lang === "de" ? "de-DE" : "en-GB");
      expect(JSON.stringify(org)).not.toMatch(/evim/i);

      const services = graph.filter((node) => node["@type"] === "Service");
      expect(services.length).toBeGreaterThanOrEqual(4); // 3 services + the Baukasten
      const names = services.map((s) => s.name as string);
      expect(names).toContain(lang === "de" ? "SharePoint-Webparts" : "SharePoint web parts");
      for (const service of services) {
        expect(service.inLanguage).toBe(lang === "de" ? "de-DE" : "en-GB");
      }
    });

    test("contact: follows the FAQ, mailto with a subject, booking button links to Cal.com", async ({ page }) => {
      await page.goto(home);
      const id = lang === "de" ? "kontakt" : "contact";
      await expect(page.locator('section[aria-labelledby="faq-title"] + section')).toHaveId(id);
      const section = page.locator(`#${id}`);
      await expect(section.locator('a[href^="mailto:contact@coditu.com?subject="]')).toHaveCount(1);
      // BOOKING_URL is set (lib/site-config.ts): the booking button renders.
      await expect(section.locator('a[href="https://cal.com/coditu/30min"]')).toHaveText(
        lang === "de" ? "Gespräch buchen" : "Book a call",
      );
      await expect(section.locator("a")).toHaveCount(3);
      await expect(section.getByText("Adam Nafie")).toBeVisible();
    });

    test("footer: its contact link lands on the contact section", async ({ page }) => {
      await page.goto(home);
      const id = lang === "de" ? "kontakt" : "contact";
      await page.locator(`footer a[href="${home}#${id}"]`).click();
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

// A native popover: the browser announces the button's expanded state, which
// Playwright cannot read, so this checks the sheet itself.
test("the mobile menu opens, closes on Escape and on a link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/de");
  const button = page.locator('button[popovertarget="mobile-menu"]');
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeHidden();
  await button.click();
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await button.click();
  await menu.getByRole("link").first().click();
  await expect(menu).toBeHidden();
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
