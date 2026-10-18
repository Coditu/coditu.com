import { CoditusLockup } from "@/components/coditu/coditus-mark";
import { ButtonLink } from "@/components/ui/button";
import { getMessages, pages, sectionHref, type Locale } from "@/lib/i18n";
import { BOOKING_HREF } from "@/lib/site-config";

import { Container } from "./container";
import { LanguageSwitch } from "./language-switch.client";
import { MobileMenu } from "./mobile-menu.client";
import { ThemeToggle } from "./theme-toggle.client";

export function SiteNav({ locale, hashMap }: { locale: Locale; hashMap: Record<string, string> }) {
  const t = getMessages(locale);
  const links = t.nav.links.map((link) => ({ href: sectionHref(locale, link.section), label: link.label }));

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
          <LanguageSwitch locale={locale} label={t.language.groupLabel} switchTo={t.language.switchTo} hashMap={hashMap} />
          <ThemeToggle label={t.nav.themeToggle} />
          <ButtonLink href={BOOKING_HREF} variant="outline" size="sm" className="hidden lg:inline-flex">
            {t.nav.booking}
          </ButtonLink>
          <MobileMenu
            links={links}
            booking={{ href: BOOKING_HREF, label: t.nav.booking }}
            labels={{ open: t.nav.menuOpen, close: t.nav.menuClose, nav: t.nav.menu }}
          />
        </div>
      </Container>
    </header>
  );
}
