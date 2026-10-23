import { CoditusLockup } from "@/components/coditu/coditus-mark";
import { ButtonLink } from "@/components/ui/button";
import { blogPath, getPosts } from "@/lib/blog";
import { getMessages, pages, sectionHref, type Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/site-config";

import { Container } from "./container";
import { LanguageSwitch } from "./language-switch.client";
import { MobileMenu } from "./mobile-menu.client";
import { ThemeToggle } from "./theme-toggle.client";

export function SiteNav({
  locale,
  hashMap,
  pathMap,
}: {
  locale: Locale;
  hashMap: Record<string, string>;
  pathMap: Record<string, string>;
}) {
  const t = getMessages(locale);
  const links = t.nav.links.map((link) => ({ href: sectionHref(locale, link.section), label: link.label }));
  // Before „Kontakt“, and only in a language that has posts.
  if (getPosts(locale).length > 0) links.splice(-1, 0, { href: blogPath(locale), label: t.nav.blog });
  const booking = BOOKING_URL ?? sectionHref(locale, "contact");

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/95">
      <Container className="relative flex h-16 items-center justify-between gap-6 lg:h-[84px]">
        <a href={pages.home[locale]} aria-label={t.nav.homeLabel} className="inline-flex min-h-11 items-center">
          <CoditusLockup markSize={24} />
        </a>

        <nav aria-label={t.nav.mainLabel} className="hidden lg:block">
          <ul className="flex gap-8 xl:gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] font-medium text-ink transition-colors duration-150 hover:text-blueprint"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitch locale={locale} label={t.language.groupLabel} switchTo={t.language.switchTo} hashMap={hashMap} pathMap={pathMap} />
          <ThemeToggle label={t.nav.themeToggle} />
          <ButtonLink href={booking} variant="outline" size="sm" className="hidden lg:inline-flex">
            {t.nav.booking}
          </ButtonLink>
          <MobileMenu
            links={links}
            booking={{ href: booking, label: t.nav.booking }}
            label={t.nav.menu}
          />
        </div>
      </Container>
    </header>
  );
}
