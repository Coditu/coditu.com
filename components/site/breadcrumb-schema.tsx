import { pages, type Locale } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site-config";
import { getAbsoluteUrl } from "@/lib/site-url";

/**
 * BreadcrumbList JSON-LD for a page one level below the home page (the
 * keyword/regional landing pages, the pricing page). Same escaping pattern
 * as `organization-schema.tsx` and `faq.tsx`: `dangerouslySetInnerHTML`
 * with `<` escaped. A separate script from the Organization + Service
 * `@graph` (that one is homepage-only and asserted to be the single
 * `@graph` script on the page — see e2e/site.spec.ts); this one carries no
 * `@graph`, so it never collides with that assertion.
 *
 * Two real crumbs only — Home and this page — built from `SITE_NAME`,
 * `pages.home` and the page's own title/path, nothing invented.
 */
export function BreadcrumbSchema({ locale, title, path }: { locale: Locale; title: string; path: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: getAbsoluteUrl(pages.home[locale]) },
      { "@type": "ListItem", position: 2, name: title, item: getAbsoluteUrl(path) },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
