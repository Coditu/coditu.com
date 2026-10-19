import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { marked } from "marked";

import { getMessages, locales, pages, type Locale } from "@/lib/i18n";
import { PRICES, SHOW_PRICES } from "@/lib/site-config";

/**
 * The blog: one Markdown file per post in `content/blog/<locale>/`, front
 * matter on top. A language with no visible posts has no blog — no index, no
 * nav link, nothing in the sitemap.
 */

export type Post = {
  title: string;
  description: string;
  slug: string;
  /** `YYYY-MM-DD`. A string on purpose: never `new Date("2026-08-23")`. */
  date: string;
  updated: string;
  /** Minutes. */
  readingTime: number;
  tags: string[];
  /** Index into `servicesSection.rows`: the service the end box links to. */
  service: number;
  /** The German slug this post translates (set on the English version). */
  translationOf?: string;
  /** Set (e.g. „needs Adam“) while the post waits for review. Never shown in production. */
  review?: string;
  /** Markdown. */
  body: string;
};

const DIR = path.join(process.cwd(), "content/blog");

/** Preview deployments and `next dev` show posts under review; production does not. */
const isProduction = process.env.VERCEL_ENV === "production";

const unquote = (value: string) => value.trim().replace(/^(["'])(.*)\1$/, "$2");

/** Front matter is flat `key: value` lines; `[a, b]` is a list. */
export function parsePost(source: string): Post {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!match) throw new Error("blog: a post must start with front matter between --- lines");
  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon < 1) continue;
    const value = line.slice(colon + 1).trim();
    data[line.slice(0, colon).trim()] = value.startsWith("[")
      ? value.slice(1, -1).split(",").map(unquote).filter(Boolean)
      : unquote(value);
  }

  for (const key of ["title", "description", "slug", "date", "updated", "readingTime", "service"]) {
    if (!data[key]) throw new Error(`blog: front matter is missing "${key}"`);
  }
  for (const key of ["date", "updated"]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data[key]))) throw new Error(`blog: "${key}" must be YYYY-MM-DD`);
  }

  return {
    title: String(data.title),
    description: String(data.description),
    slug: String(data.slug),
    date: String(data.date),
    updated: String(data.updated),
    readingTime: Number(data.readingTime),
    tags: Array.isArray(data.tags) ? data.tags : [],
    service: Number(data.service),
    translationOf: data.translationOf ? String(data.translationOf) : undefined,
    review: data.review ? String(data.review) : undefined,
    body: match[2],
  };
}

/** The posts readers may see in this language, newest first. */
export function getPosts(locale: Locale): Post[] {
  const dir = path.join(DIR, locale);
  if (!existsSync(dir)) return [];

  const posts = readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parsePost(readFileSync(path.join(dir, file), "utf8")))
    .filter((post) => !(isProduction && post.review));

  for (const post of posts) {
    // Unconfirmed claims are written `[TODO: …]`, like in messages/; they never ship.
    if (isProduction && post.body.includes("[TODO")) {
      throw new Error(`blog: "${post.slug}" is published but still contains [TODO: …]`);
    }
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (locale: Locale, slug: string) => getPosts(locale).find((post) => post.slug === slug);

export const blogPath = (locale: Locale, slug?: string) => `/${locale}/blog${slug ? `/${slug}` : ""}`;

const otherLocale = (locale: Locale): Locale => (locale === "de" ? "en" : "de");

/** The same post in the other language, if it is visible there. */
export function getTranslation(locale: Locale, post: Post) {
  return getPosts(otherLocale(locale)).find((p) => p.slug === post.translationOf || p.translationOf === post.slug);
}

/** The post in every language it exists in, for hreflang and the sitemap. */
export function postPaths(locale: Locale, post: Post): Partial<Record<Locale, string>> {
  const translation = getTranslation(locale, post);
  return { [locale]: blogPath(locale, post.slug), ...(translation && { [otherLocale(locale)]: blogPath(otherLocale(locale), translation.slug) }) };
}

/** The blog index in every language that has posts. */
export const blogIndexPaths = (): Partial<Record<Locale, string>> =>
  Object.fromEntries(locales.filter((l) => getPosts(l).length > 0).map((l) => [l, blogPath(l)]));

/**
 * Every path in this language → the same page in the other, for the language
 * switch. A post without a translation goes to the other blog, or its home
 * page if that language has no posts.
 */
export function switchPaths(locale: Locale): Record<string, string> {
  const other = otherLocale(locale);
  const otherBlog = getPosts(other).length > 0 ? blogPath(other) : pages.home[other];
  const map: Record<string, string> = Object.fromEntries(Object.values(pages).map((p) => [p[locale], p[other]]));
  map[blogPath(locale)] = otherBlog;
  for (const post of getPosts(locale)) map[blogPath(locale, post.slug)] = postPaths(locale, post)[other] ?? otherBlog;
  return map;
}

/** `2026-10-19` → „19. Oktober 2026“ / "October 19, 2026", whatever the server's time zone. */
export function formatDate(locale: Locale, date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(getMessages(locale).locale, { dateStyle: "long", timeZone: "UTC" }).format(
    Date.UTC(y, m - 1, d)
  );
}

/**
 * The post body as HTML. `{{price:webPart}}` / `{{price:change}}` become our
 * starting prices, or „Preis auf Anfrage“ while `SHOW_PRICES` is off. Tables
 * get a wrapper that scrolls sideways on phones.
 */
export function renderPost(locale: Locale, post: Post) {
  const t = getMessages(locale).blog;
  const euro = (amount: number) =>
    new Intl.NumberFormat(getMessages(locale).locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
      amount
    );
  const markdown = post.body.replace(/\{\{price:(webPart|change)\}\}/g, (_, key: keyof typeof PRICES) =>
    SHOW_PRICES ? t.prices[key].replace("{price}", euro(PRICES[key])) : t.prices.onRequest
  );

  return (marked.parse(markdown, { async: false }) as string)
    .replaceAll("<table>", `<div class="table-scroll" role="region" tabindex="0" aria-label="${t.tableLabel}"><table>`)
    .replaceAll("</table>", "</table></div>");
}
