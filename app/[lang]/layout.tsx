import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { fontVariables } from "@/lib/fonts";
import { getMessages, hasLocale, locales, sectionMap } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site-config";
import { getSiteUrl } from "@/lib/site-url";

import "../globals.css";

/** `/de` and `/en` only — anything else is a 404, and both are prerendered. */
export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getMessages(lang);
  return {
    metadataBase: getSiteUrl(),
    title: { default: t.meta.title, template: `%s | ${SITE_NAME}` },
    description: t.meta.description,
    applicationName: SITE_NAME,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
        { url: "/brand/mark.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: [{ url: "/favicon.ico" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export const viewport: Viewport = {
  // `--paper` in each theme.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1216" },
  ],
};

/** The saved choice from `<ThemeToggle>`, else the system setting (followed live). */
const themeScript = `(function(){
var d=document.documentElement,m=matchMedia("(prefers-color-scheme: dark)");
d.classList.add("js");
function saved(){try{return localStorage.getItem("theme")}catch(e){return null}}
function apply(){d.dataset.theme=saved()||(m.matches?"dark":"light")}
apply();
m.addEventListener("change",function(){if(!saved())apply()});
})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getMessages(lang);
  const hashMap = sectionMap(lang);

  return (
    // The script below sets `data-theme` before hydration.
    <html lang={lang} className="overflow-x-clip" suppressHydrationWarning>
      <body className={`${fontVariables} min-w-0 overflow-x-clip bg-blueprint-grid font-sans antialiased`}>
        {/* Before first paint: marks that JS is running (scroll-triggered
            reveals only hold their hidden frame with the `js` class, so a
            broken bundle degrades to content that is simply visible), and sets
            the theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-surface focus:px-4 focus:py-3 focus:text-ink"
        >
          {t.skipLink}
        </a>
        <SiteNav locale={lang} hashMap={hashMap} />
        <main id="inhalt" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter locale={lang} hashMap={hashMap} />
      </body>
    </html>
  );
}
