import { getMessages, type Locale } from "@/lib/i18n";
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
 */
export function OrganizationSchema({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  const organization = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
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
  const services = [
    ...t.servicesSection.rows.map((row) => ({ name: row.title, description: row.text })),
    { name: t.baukastenSection.title, description: t.baukastenSection.intro },
  ].map((service) => ({
    "@type": "Service",
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: "DE",
    inLanguage: t.locale,
    name: service.name,
    description: service.description,
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
