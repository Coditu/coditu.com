import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SheetLabel } from "@/components/blueprint/sheet-label";
import { Container } from "@/components/site/container";
import { getMessages, hasLocale, pages, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

/** Impressum / Datenschutz, under their own slug in each language. */
const legalPages = ["imprint", "privacy"] as const;

const slugOf = (page: (typeof legalPages)[number], locale: Locale) => pages[page][locale].split("/")[2];

export const dynamicParams = false;
export const generateStaticParams = ({ params }: { params: { lang: string } }) =>
  hasLocale(params.lang) ? legalPages.map((page) => ({ legal: slugOf(page, params.lang as Locale) })) : [];

async function resolve(params: PageProps<"/[lang]/[legal]">["params"]) {
  const { lang, legal } = await params;
  if (!hasLocale(lang)) notFound();
  const page = legalPages.find((key) => slugOf(key, lang) === legal);
  if (!page) notFound();
  return { lang, page, content: getMessages(lang).legal[page], label: getMessages(lang).legal.sheetLabel };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[legal]">): Promise<Metadata> {
  const { lang, page, content } = await resolve(params);
  return pageMetadata(lang, pages[page], { title: content.title, description: content.description });
}

export default async function LegalPage({ params }: PageProps<"/[lang]/[legal]">) {
  const { content, label } = await resolve(params);

  return (
    <Container className="py-16 md:py-24">
      <article className="max-w-[68ch]">
        <SheetLabel>{label}</SheetLabel>
        <h1 className="mt-5 text-h1">{content.title}</h1>
        <div className="mt-12 flex flex-col gap-8">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-h3">{section.heading}</h2>
              <div className="mt-2 flex flex-col gap-1 text-body text-ink-muted">
                {section.lines.map((line) =>
                  typeof line === "string" ? (
                    <p key={line}>{line}</p>
                  ) : (
                    <p key={line.href}>
                      <a href={line.href} className="text-blueprint underline underline-offset-4">
                        {line.label}
                      </a>
                    </p>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
