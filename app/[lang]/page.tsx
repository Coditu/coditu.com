import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RevealScope } from "@/components/motion/reveal-scope.client";
import { Baukasten } from "@/components/site/baukasten";
import { Contact } from "@/components/site/contact";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { Intranet } from "@/components/site/intranet";
import { Process } from "@/components/site/process";
import { Reference } from "@/components/site/reference";
import { Security } from "@/components/site/security";
import { Services } from "@/components/site/services";
import { getMessages, hasLocale, pages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getMessages(lang);
  return pageMetadata(lang, pages.home, { title: { absolute: t.meta.title }, description: t.meta.description });
}

/**
 * Sections are added one by one in page order (Phase 2). Order per
 * docs/02-POSITIONING.md "Page order": the before/after slider (Intranet)
 * and the Baukasten were promoted ahead of Services on 2026-11-01 — the
 * slider is the strongest two seconds on the site and was previously
 * buried, and the Baukasten is the flagship offer.
 */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Hero locale={lang} />
      <Intranet locale={lang} />
      <Baukasten locale={lang} />
      <Services locale={lang} />
      <Process locale={lang} />
      <Reference locale={lang} />
      <Security locale={lang} />
      <Faq locale={lang} />
      <Contact locale={lang} />
      {/* One observer for every [data-reveal-on-view] on the page. */}
      <RevealScope />
    </>
  );
}
