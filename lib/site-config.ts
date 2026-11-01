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
 * Our starting prices, in euros: a web part from 600, ongoing changes at 70
 * per hour. Anywhere copy says `{{price:webPart}}` or `{{price:change}}`
 * (`lib/pricing.ts`, used by the blog and the FAQ), this is what fills it in.
 *
 * `600 ÷ 70 ≈ 8.6 hours` — on purpose, inside the 5–10 hour range the site
 * states elsewhere for a web part. A web part price and the hourly rate are
 * read together, so keep them agreeing if either changes.
 * See docs/02-POSITIONING.md "Prices" for the market comparison behind 70 €/h.
 */
export const PRICES = { webPart: 600, change: 70 } as const;

/**
 * Whether prices show at all. A *build-time* switch, not a runtime one — this
 * repo has no backend and every page stays prerendered, so there is nothing
 * to read at request time. Set `NEXT_PUBLIC_SHOW_PRICES=false` in Vercel and
 * redeploy to hide prices again; unset (or anything else) shows them. Vercel
 * inlines `NEXT_PUBLIC_*` vars into the static output at build time, so this
 * never makes a page dynamic and needs no env var to build without one.
 */
export const SHOW_PRICES = process.env.NEXT_PUBLIC_SHOW_PRICES !== "false";
