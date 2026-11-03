/** Values that are the same in every language. */

export const SITE_NAME = "Coditu";
export const SITE_URL = "https://coditu.com";
export const CONTACT_EMAIL = "contact@coditu.com";

/**
 * Coditu's LinkedIn company page. The numeric-ID form, not a vanity slug —
 * it always resolves regardless of what the page's public slug is set to.
 * Referenced from the footer (a real, crawlable link) and the Organization
 * schema's `sameAs` (see `components/site/organization-schema.tsx`).
 */
export const LINKEDIN_URL = "https://www.linkedin.com/company/107461913";

/**
 * „Gespräch buchen“ / "Book a call": a 30-minute call, on Coditu's own
 * Cal.com profile. Set to `null`, the contact section hides its booking
 * button and the nav's „Gespräch buchen“ goes to the contact section
 * instead — that was the state before this URL existed.
 */
export const BOOKING_URL: string | null = "https://cal.com/coditu/30min";
