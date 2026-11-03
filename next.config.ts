import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next sends this by default ("X-Powered-By: Next.js" — confirmed on a
  // real built server). Pure information disclosure, no behavior tied to it.
  poweredByHeader: false,
  // German is the primary language. A redirect rule, not a page, so nothing
  // under `/de` or `/en` has to read headers and both stay prerendered.
  redirects: async () => [
    { source: "/", destination: "/de", permanent: false },
    // The dedicated pricing page was removed (2026-11-03) — both URLs were
    // already indexed, so redirect rather than 404. Permanent: the removal
    // is deliberate, not temporary, and this passes link equity to the
    // homepage's own pricing section instead of orphaning it.
    { source: "/de/pricing", destination: "/de#preise", permanent: true },
    { source: "/en/pricing", destination: "/en#pricing", permanent: true },
  ],
  // Static, declarative — same as `redirects` above, applied by the CDN/edge
  // layer, not read in-app, so this doesn't touch "every page stays
  // prerendered" either. No prior security headers existed at all (checked
  // next.config.ts and vercel.json). Deliberately not a Content-Security-Policy
  // here: this site has inline JSON-LD `<script>` tags and Vercel's own
  // injected scripts, and getting a CSP's allow-list right needs live-browser
  // verification this session can't do — a wrong CSP silently breaks pages
  // rather than failing a test. These four are universally safe, don't change
  // any existing behavior, and need no allow-list.
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
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
