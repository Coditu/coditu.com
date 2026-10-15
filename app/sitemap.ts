import type { MetadataRoute } from "next";

import { pages } from "@/lib/i18n";
import { getAbsoluteUrl } from "@/lib/site-url";

/** Every page in both languages, each listing its counterpart. */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(pages).flatMap(([key, paths]) =>
    Object.values(paths).map((path) => ({
      url: getAbsoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.3,
      alternates: { languages: { de: getAbsoluteUrl(paths.de), en: getAbsoluteUrl(paths.en) } },
    }))
  );
}
