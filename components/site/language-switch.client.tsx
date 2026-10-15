"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

import { locales, pages, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * DE / EN. The other language's link points at the same page in that language,
 * and on click also at the section currently in view (`hashMap` maps this
 * language's section ids to the other's). Without JS it still lands on the
 * right page.
 */
export function LanguageSwitch({
  locale,
  label,
  switchTo,
  hashMap,
}: {
  locale: Locale;
  label: string;
  switchTo: string;
  hashMap: Record<string, string>;
}) {
  const pathname = usePathname();
  const page = Object.values(pages).find((p) => p[locale] === pathname) ?? pages.home;

  const keepSection = (event: MouseEvent<HTMLAnchorElement>) => {
    const inView = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"))
      .filter((section) => section.getBoundingClientRect().top <= window.innerHeight / 3)
      .pop();
    const target = inView && hashMap[inView.id];
    if (target) event.currentTarget.hash = target;
  };

  return (
    <div role="group" aria-label={label} className="flex items-center gap-1 font-mono text-[12px] uppercase">
      {locales.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-ink-muted">
              /
            </span>
          )}
          {lang === locale ? (
            <span aria-current="true" className="inline-flex min-h-11 items-center px-1 font-semibold text-ink">
              <span className="border-b border-ink">{lang}</span>
            </span>
          ) : (
            <a
              href={page[lang]}
              hrefLang={lang}
              lang={lang}
              aria-label={switchTo}
              onClick={keepSection}
              className={cn(
                "inline-flex min-h-11 items-center px-1 text-ink-muted transition-colors duration-150 hover:text-blueprint"
              )}
            >
              {lang}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
