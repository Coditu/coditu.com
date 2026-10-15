import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  // German is the primary language. A redirect rule, not a page, so nothing
  // under `/de` or `/en` has to read headers and both stay prerendered.
  redirects: async () => [{ source: "/", destination: "/de", permanent: false }],
  experimental: {
    // `app/global-not-found.tsx`: the root layout lives under `[lang]`, so a
    // URL outside both languages has no layout to render a 404 in.
    globalNotFound: true,
  },
};

/** `npm run analyze` opens the treemap; every other build is untouched. */
export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "1" })(nextConfig);
