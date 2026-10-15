import type { ReactNode } from "react";

import { CoditusLockup } from "@/components/coditu/coditus-mark";
import { getMessages, pages, sectionHref, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site-config";

import { Container } from "./container";
import { LanguageSwitch } from "./language-switch.client";

const link = "text-[14px] text-ink transition-colors duration-150 hover:text-blueprint";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-mono text-label text-ink-muted uppercase">{title}</h2>
      {children}
    </div>
  );
}

export function SiteFooter({ locale, hashMap }: { locale: Locale; hashMap: Record<string, string> }) {
  const t = getMessages(locale);
  const services = sectionHref(locale, "services");

  return (
    <footer className="border-t border-ink pt-8 pb-6">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <CoditusLockup markSize={24} />
            <p className="text-[14px] text-ink-muted">{t.footer.slogan}</p>
          </div>

          <Column title={t.footer.servicesTitle}>
            <ul className="flex flex-col gap-2">
              {t.services.map((name) => (
                <li key={name}>
                  <a href={services} className={link}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title={t.footer.legalTitle}>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={pages.imprint[locale]} className={link}>
                  {t.footer.imprint}
                </a>
              </li>
              <li>
                <a href={pages.privacy[locale]} className={link}>
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
          </Column>

          <Column title={t.footer.contactTitle}>
            <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
              {CONTACT_EMAIL}
            </a>
            <LanguageSwitch locale={locale} label={t.footer.languageTitle} switchTo={t.language.switchTo} hashMap={hashMap} />
          </Column>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line py-3.5 font-mono text-label text-ink-muted uppercase">
          <span>© {new Date().getFullYear()} Coditu</span>
          <span>{t.footer.sheet}</span>
        </div>
      </Container>
    </footer>
  );
}
