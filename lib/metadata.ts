import type { Metadata } from "next";

import { getMessages, pages, type Locale, type PageKey } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site-config";

const OG_IMAGE = "/og.png";

/**
 * Title, description, canonical, hreflang (de, en, x-default → German) and the
 * social card for one page in one language. URLs are relative and resolve
 * against `metadataBase` in the root layout.
 */
export function pageMetadata(
  locale: Locale,
  page: PageKey,
  { title, description }: { title: Metadata["title"]; description: string }
): Metadata {
  const t = getMessages(locale);
  const ogTitle = typeof title === "object" && title && "absolute" in title ? title.absolute : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: pages[page][locale],
      languages: { de: pages[page].de, en: pages[page].en, "x-default": pages[page].de },
    },
    openGraph: {
      title: ogTitle,
      description,
      url: pages[page][locale],
      siteName: SITE_NAME,
      type: "website",
      locale: t.locale.replace("-", "_"),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [OG_IMAGE] },
  };
}
