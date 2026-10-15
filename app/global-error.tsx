"use client";

import { Button } from "@/components/ui/button";
import { fontVariables } from "@/lib/fonts";
import de from "@/messages/de";
import en from "@/messages/en";

import "./globals.css";

/**
 * The root layout itself failed. The language is unknown here, so it speaks
 * both, German first.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="de">
      <body className={`${fontVariables} bg-paper font-sans antialiased`}>
        <main className="mx-auto flex min-h-dvh max-w-[60ch] flex-col justify-center gap-8 px-4 py-16">
          {[de, en].map((t, i) => (
            <section key={t.locale} lang={t.locale} className="flex flex-col gap-3">
              {i === 0 ? <h1 className="text-h2">{t.error.title}</h1> : <h2 className="text-h2">{t.error.title}</h2>}
              <p className="text-body text-ink-muted">{t.error.body}</p>
            </section>
          ))}
          <Button onClick={reset} className="self-start">
            {de.error.retry} / {en.error.retry}
          </Button>
          {error.digest && <p className="font-mono text-label text-ink-muted uppercase">ref {error.digest}</p>}
        </main>
      </body>
    </html>
  );
}
