import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site-config";
import { allLandingParams, findLanding, landingPaths } from "@/lib/landing-pages";
import { getMessages, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { withPrices } from "@/lib/pricing";

export const dynamicParams = false;
export const generateStaticParams = () => allLandingParams();

async function resolve(params: PageProps<"/[lang]/services/[slug]">["params"]) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const key = findLanding(lang, slug);
  if (!key) notFound();
  return { lang, t: getMessages(lang), page: getMessages(lang).landingPages[key] };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, page } = await resolve(params);
  const key = findLanding(lang, page.slug)!;
  return pageMetadata(lang, landingPaths(key), { title: page.meta.title, description: page.meta.description });
}

/**
 * Keyword landing pages — docs/02-POSITIONING.md "Search" phase 2. One page
 * per real search phrase (playbook move #7), content drawn only from facts
 * already published elsewhere (servicesSection, referenceSection,
 * pricingSection) — see messages/de.ts "landingPages" doc comment. Fully
 * static, no client component: nothing here needs the JS budget.
 */
export default async function LandingPage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, t, page: p } = await resolve(params);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.body)}`;
  // The two facts most relevant to a single web part — the same real numbers
  // referenceSection already states, not new ones.
  const proof = t.referenceSection.facts.slice(0, 2);

  return (
    <Container className="py-16 md:py-24">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h1 className="text-h1 lg:col-span-7">{p.title}</h1>
        <p className="max-w-[46ch] text-lead text-ink-muted lg:col-span-5">{p.intro}</p>
      </div>

      <ul className="mt-12 grid gap-4 border-t border-ink pt-8 @min-[36rem]:grid-cols-3">
        {p.points.map((point) => (
          <li key={point.title} className="flex flex-col gap-2 border border-line bg-surface px-5 py-5">
            <span className="text-[16px] font-bold">{point.title}</span>
            <span className="text-[14px] leading-snug text-ink-muted">{point.text}</span>
          </li>
        ))}
      </ul>

      <p className="mt-10 font-mono text-label text-ink-muted uppercase">{p.proofLabel}</p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {proof.map((fact) => (
          <li key={fact.value} className="flex flex-col gap-2.5 border border-line bg-surface px-5 py-5">
            <span className="text-[28px] leading-tight font-bold tracking-[-0.02em]">{fact.value}</span>
            <span className="text-[14px] leading-snug text-ink-muted">{fact.text}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-[64ch] text-[15px] leading-normal text-ink-muted">{withPrices(lang, p.priceLine)}</p>

      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href={mailto} variant="cta" size="lg">
          {p.cta}
        </ButtonLink>
        {BOOKING_URL && (
          <ButtonLink href={BOOKING_URL} variant="outline" size="lg">
            {t.nav.booking}
          </ButtonLink>
        )}
      </div>
    </Container>
  );
}
