/** Values that are the same in every language. */

export const SITE_NAME = "Coditu";
export const SITE_URL = "https://coditu.com";
export const CONTACT_EMAIL = "contact@coditu.com";

/**
 * „Gespräch buchen“ / "Book a call": a 20-minute call.
 * TODO(team): the booking tool's URL. While null, the contact section hides
 * its booking button and the nav's „Gespräch buchen“ goes to the contact section.
 */
export const BOOKING_URL: string | null = null;

/**
 * Our starting prices, in euros: a new web part from 450, a small change 45
 * per hour. The blog writes them where a post says `{{price:webPart}}` or
 * `{{price:change}}` (lib/blog.ts).
 * TODO(team): publish them? While `SHOW_PRICES` is false, every one of those
 * reads „Preis auf Anfrage“ / "Price on request".
 */
export const SHOW_PRICES = false;
export const PRICES = { webPart: 450, change: 45 } as const;
