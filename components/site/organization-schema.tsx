import { getMessages, type Locale } from "@/lib/i18n";
import { landingKeys, landingPaths } from "@/lib/landing-pages";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site-config";

/**
 * Organization + Service JSON-LD, mounted once from the root layout — see
 * docs/02-POSITIONING.md "Search", Phase 1 (AI search). Added once per page,
 * not per section, and kept outside visible markup (no visual output).
 *
 * Same escaping pattern as the FAQPage JSON-LD in components/site/faq.tsx:
 * `dangerouslySetInnerHTML` with `<` escaped so a closing `</script>` in data
 * can never break out of the tag.
 *
 * Facts only from docs/00-CONTEXT.md (team, locations, contact) and
 * docs/02-POSITIONING.md / messages/*.ts (service list, Baukasten) — no
 * street address (none is published) and no `sameAs`: no real social profile
 * URL exists in this codebase to link to.
 *
 * `logo` points at `public/icon-512.png` — a real asset already shipped as
 * the site's app icon (see `public/brand/`), not a new image made up for
 * this: Google's and schema.org's Organization guidance both call out `logo`
 * as a recommended property.
 *
 * `@id` and `description` exist to help AI/answer engines anchor this exact
 * entity — there is at least one unrelated company with a confusingly
 * similar name/domain (not coditu.com) that has shown up misattributed in a
 * third-party AI answer. A stable `@id` and a real, specific description are
 * the honest on-page lever here; the rest (consistent off-site citations —
 * LinkedIn, directories, backlinks) is outside this codebase.
 */
export function OrganizationSchema({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: t.meta.description,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
    email: CONTACT_EMAIL,
    inLanguage: t.locale,
    address: [
      { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
      { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer support",
    },
  };

  // Service categories: docs/02-POSITIONING.md "Search" + the live
  // `servicesSection.rows` (SharePoint web parts, internal apps, websites &
  // web apps), plus the Baukasten product (`baukastenSection`). 02-POSITIONING.md
  // wins over the older list in docs/00-CONTEXT.md where the two differ
  // (e.g. "AI assistants using RAG" is not in the current service list).
  // The keyword landing pages (lib/landing-pages.ts) get their own Service
  // entries too, each with a `url` — they're specific enough to deserve one,
  // unlike the homepage service rows, which only have an in-page anchor.
  const services = [
    ...t.servicesSection.rows.map((row) => ({ name: row.title, description: row.text })),
    { name: t.baukastenSection.title, description: t.baukastenSection.intro },
    ...landingKeys.map((key) => {
      const page = t.landingPages[key];
      return { name: page.title, description: page.intro, url: `${SITE_URL}${landingPaths(key)[locale]}` };
    }),
  ].map((service) => ({
    "@type": "Service",
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: "DE",
    inLanguage: t.locale,
    name: service.name,
    description: service.description,
    ...("url" in service ? { url: service.url } : {}),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [organization, ...services],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
