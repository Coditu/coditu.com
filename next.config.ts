import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // German is the primary language. A redirect rule, not a page, so nothing
  // under `/de` or `/en` has to read headers and both stay prerendered.
  redirects: async () => [{ source: "/", destination: "/de", permanent: false }],
  experimental: {
    // `app/global-not-found.tsx`: the root layout lives under `[lang]`, so a
    // URL outside both languages has no layout to render a 404 in.
    globalNotFound: true,
    // Vercel restores `.next/cache` between builds, and a warm Turbopack cache
    // shipped the stylesheet of an older commit with the current HTML (the
    // services tabs had no CSS). The site builds in seconds cold.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
