import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/site-url";

/** One public page. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
