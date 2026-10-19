import type { MetadataRoute } from "next";

import { blogPath, getPosts } from "@/lib/blog";
import { locales, pages } from "@/lib/i18n";
import { getAbsoluteUrl } from "@/lib/site-url";

/** Every page in both languages, each listing its counterpart; then each language's blog. */
export default function sitemap(): MetadataRoute.Sitemap {
  const blog = locales.flatMap((locale) => {
    const posts = getPosts(locale);
    if (posts.length === 0) return [];
    return [
      { url: getAbsoluteUrl(blogPath(locale)), lastModified: posts.map((post) => post.updated).sort().at(-1), changeFrequency: "weekly" as const, priority: 0.6 },
      ...posts.map((post) => ({
        url: getAbsoluteUrl(blogPath(locale, post.slug)),
        lastModified: post.updated,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  });

  const site = Object.entries(pages).flatMap(([key, paths]) =>
    Object.values(paths).map((path) => ({
      url: getAbsoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.3,
      alternates: { languages: { de: getAbsoluteUrl(paths.de), en: getAbsoluteUrl(paths.en) } },
    }))
  );
  return [...site, ...blog];
}
