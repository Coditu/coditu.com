/**
 * Languages and page paths, without any copy. Client components import from
 * here: `lib/i18n.ts` pulls in every string in both languages, and a client
 * import of it ships all of them to the browser.
 */
export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const otherLocale = (locale: Locale): Locale => (locale === "de" ? "en" : "de");

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Every page, in both languages. The language switch maps between these, the
 * sitemap lists them and every page's hreflang tags come from here.
 */
export const pages = {
  home: { de: "/de", en: "/en" },
  imprint: { de: "/de/impressum", en: "/en/legal-notice" },
  privacy: { de: "/de/datenschutz", en: "/en/privacy" },
} as const satisfies Record<string, Record<Locale, string>>;
