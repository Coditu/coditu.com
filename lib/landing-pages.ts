import { getMessages, locales, type Locale } from "@/lib/i18n";

/**
 * Keyword landing pages (app/[lang]/services/[slug]/page.tsx). One key per
 * page; add a new one here, its content+slug in messages/*.ts
 * "landingPages", and it's live in both languages. See messages/de.ts
 * "landingPages" doc comment for the full picture.
 */
export const landingKeys = ["sharepointWebparts"] as const;
export type LandingKey = (typeof landingKeys)[number];

/** This page's path in every language — for hreflang and the sitemap. */
export function landingPaths(key: LandingKey): Record<Locale, string> {
  return Object.fromEntries(locales.map((locale) => [locale, `/${locale}/services/${getMessages(locale).landingPages[key].slug}`])) as Record<
    Locale,
    string
  >;
}

/** Every (lang, slug) pair across every landing page, for generateStaticParams. */
export function allLandingParams(): { lang: Locale; slug: string }[] {
  return locales.flatMap((lang) => landingKeys.map((key) => ({ lang, slug: getMessages(lang).landingPages[key].slug })));
}

/** Which landing page (if any) this (lang, slug) pair resolves to. */
export function findLanding(lang: Locale, slug: string): LandingKey | undefined {
  return landingKeys.find((key) => getMessages(lang).landingPages[key].slug === slug);
}
