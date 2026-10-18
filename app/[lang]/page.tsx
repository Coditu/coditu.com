import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RevealScope } from "@/components/motion/reveal-scope.client";
import { Hero } from "@/components/site/hero";
import { getMessages, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getMessages(lang);
  return pageMetadata(lang, "home", { title: { absolute: t.meta.title }, description: t.meta.description });
}

/** Sections are added one by one in page order (Phase 2). */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Hero locale={lang} />
      {/* One observer for every [data-reveal-on-view] on the page. */}
      <RevealScope />
    </>
  );
}
