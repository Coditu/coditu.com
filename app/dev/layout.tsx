import type { Metadata } from "next";

import { fontVariables } from "@/lib/fonts";

import "../globals.css";

/** Root layout for dev-only review pages. Not linked, not in the sitemap; every page under it is a 404 in production. */
export const metadata: Metadata = { robots: { index: false } };

export default function DevLayout({ children }: LayoutProps<"/dev">) {
  return (
    <html lang="de">
      <body className={`${fontVariables} bg-paper font-sans text-ink antialiased`}>{children}</body>
    </html>
  );
}
