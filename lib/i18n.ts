import de from "@/messages/de";
import en from "@/messages/en";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

const messages = { de, en };
export const getMessages = (locale: Locale) => messages[locale];

/**
 * Every page, in both languages. The language switch maps between these, the
 * sitemap lists them and every page's hreflang tags come from here.
 */
export const pages = {
  home: { de: "/de", en: "/en" },
  imprint: { de: "/de/impressum", en: "/en/legal-notice" },
  privacy: { de: "/de/datenschutz", en: "/en/privacy" },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof pages;

/** Section anchor on the home page, e.g. `/de#leistungen`. */
export const sectionHref = (locale: Locale, section: keyof (typeof de)["anchors"]) =>
  `${pages.home[locale]}#${messages[locale].anchors[section]}`;

/** This language's section ids → the other language's, for the language switch. */
export function sectionMap(locale: Locale): Record<string, string> {
  const other = getMessages(locale === "de" ? "en" : "de").anchors;
  const own = getMessages(locale).anchors;
  return Object.fromEntries(
    (Object.keys(own) as (keyof typeof own)[]).map((key) => [own[key], other[key]])
  );
}
