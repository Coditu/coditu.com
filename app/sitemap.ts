import type { MetadataRoute } from "next";

import { blogIndexPaths, blogPath, getPosts, postPaths } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { locales, pages } from "@/lib/i18n";
import { getAbsoluteUrl } from "@/lib/site-url";

const languages = (paths: Partial<Record<Locale, string>>) =>
  Object.fromEntries(Object.entries(paths).map(([locale, path]) => [locale, getAbsoluteUrl(path)]));

/** Every page in both languages, each listing its counterpart; then each language's blog. */
export default function sitemap(): MetadataRoute.Sitemap {
  const blog = locales.flatMap((locale) => {
    const posts = getPosts(locale);
    if (posts.length === 0) return [];
    return [
      { url: getAbsoluteUrl(blogPath(locale)), lastModified: posts.map((post) => post.updated).sort().at(-1), changeFrequency: "weekly" as const, priority: 0.6, alternates: { languages: languages(blogIndexPaths()) } },
      ...posts.map((post) => ({
        url: getAbsoluteUrl(blogPath(locale, post.slug)),
        lastModified: post.updated,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: languages(postPaths(locale, post)) },
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
