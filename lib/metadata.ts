import type { Metadata } from "next";

import { getMessages, type Locale } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site-config";

const OG_IMAGE = "/og.png";

/**
 * Title, description, canonical, hreflang (de, en, x-default → German) and the
 * social card for one page in one language. `paths` is the page in every
 * language it exists in (`pages.home`, or a blog post in one language). URLs
 * are relative and resolve against `metadataBase` in the root layout.
 */
export function pageMetadata(
  locale: Locale,
  paths: Partial<Record<Locale, string>>,
  {
    title,
    description,
    article,
  }: {
    title: Metadata["title"];
    description: string;
    article?: { publishedTime: string; modifiedTime: string };
  }
): Metadata {
  const t = getMessages(locale);
  const ogTitle = typeof title === "object" && title && "absolute" in title ? title.absolute : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: paths[locale],
      languages: { ...paths, "x-default": paths.de ?? paths[locale] },
    },
    openGraph: {
      title: ogTitle,
      description,
      url: paths[locale],
      siteName: SITE_NAME,
      ...(article ? { type: "article", ...article } : { type: "website" }),
      locale: t.locale.replace("-", "_"),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [OG_IMAGE] },
  };
}
