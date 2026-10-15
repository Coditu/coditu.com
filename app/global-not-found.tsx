import type { Metadata } from "next";

import { CoditusLockup } from "@/components/coditu/coditus-mark";
import { SheetLabel } from "@/components/blueprint/sheet-label";
import { fontVariables } from "@/lib/fonts";
import { getMessages, locales, pages } from "@/lib/i18n";

import "./globals.css";

/**
 * Any URL that matches no route. The language is unknown here, so it speaks
 * both, German first. Bypasses the `[lang]` layout entirely.
 */
export const metadata: Metadata = {
  title: `404 — ${getMessages("de").notFound.title}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="de">
      <body className={`${fontVariables} bg-blueprint-grid font-sans antialiased`}>
        <main className="mx-auto flex min-h-dvh max-w-page flex-col justify-center gap-12 px-4 py-16 sm:px-6 md:px-8">
          <CoditusLockup markSize={24} />
          {locales.map((lang) => {
            const t = getMessages(lang).notFound;
            return (
              <section key={lang} lang={lang} className="flex flex-col gap-3">
                <SheetLabel>404</SheetLabel>
                {lang === "de" ? <h1 className="text-h1">{t.title}</h1> : <h2 className="text-h1">{t.title}</h2>}
                <p className="text-lead text-ink-muted">{t.body}</p>
                <a href={pages.home[lang]} className="text-blueprint underline underline-offset-4">
                  {t.home}
                </a>
              </section>
            );
          })}
        </main>
      </body>
    </html>
  );
}
