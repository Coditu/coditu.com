import de from "@/messages/de";
import en from "@/messages/en";

import { pages, type Locale } from "./locales";

export { defaultLocale, hasLocale, locales, pages, type Locale, type PageKey } from "./locales";

const messages = { de, en };
export const getMessages = (locale: Locale) => messages[locale];

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
