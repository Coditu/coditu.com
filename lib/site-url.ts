import { SITE_URL } from "@/lib/site-config";

/**
 * The origin for metadata, canonicals, OG images and the sitemap: the env value
 * if set, else Vercel's production domain (set on previews too), else
 * coditu.com in a build and localhost in `next dev`.
 */
const origin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.NODE_ENV === "production" ? SITE_URL : "http://localhost:3000");

export const getSiteUrl = () => new URL(origin);
export const getSiteOrigin = () => getSiteUrl().origin;
export const getAbsoluteUrl = (path: string) => new URL(path, origin).toString();
