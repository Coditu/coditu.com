import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { CountUp } from "@/components/site/count-up.client";
import { BOOKING_URL, CONTACT_EMAIL, PRICES, SHOW_PRICES } from "@/lib/site-config";
import { getMessages, hasLocale, pages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

async function resolve(params: PageProps<"/[lang]/pricing">["params"]) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang, t: getMessages(lang) };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/pricing">): Promise<Metadata> {
  const { lang, t } = await resolve(params);
  return pageMetadata(lang, pages.pricing, { title: t.pricingPage.meta.title, description: t.pricingPage.meta.description });
}

/**
 * The dedicated pricing page — docs/02-POSITIONING.md's "Pricing teaser →
 * pricing page" plan, the teaser being `components/site/price-cards.tsx` on
 * the homepage. Three billing models in prose, then the same counted cards
 * (a fresh pair, not the homepage's — a second `id="preise"` on one page
 * would collide, and this page needs no in-page anchor). While SHOW_PRICES
 * is off, the whole page shows `pricingPage.hidden` instead — never blank,
 * just less specific. Same gate, same `lib/site-config.ts` constants, no
 * new toggle to keep in sync.
 */
export default async function PricingPage({ params }: PageProps<"/[lang]/pricing">) {
  const { t } = await resolve(params);
  const p = t.pricingPage;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.body)}`;

  return (
    <Container className="py-16 md:py-24">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h1 className="text-h1 lg:col-span-7">{p.title}</h1>
        <p className="max-w-[46ch] text-lead text-ink-muted lg:col-span-5">{p.intro}</p>
      </div>

      <ul className="mt-12 grid gap-4 border-t border-ink pt-8 @min-[36rem]:grid-cols-3">
        {p.models.map((model) => (
          <li key={model.title} className="flex flex-col gap-2 border border-line bg-surface px-5 py-5">
            <span className="text-[16px] font-bold">{model.title}</span>
            <span className="text-[14px] leading-snug text-ink-muted">{model.text}</span>
          </li>
        ))}
      </ul>

      {SHOW_PRICES ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="flex flex-col gap-2.5 border border-line bg-surface px-5 py-5">
            <span className="font-mono text-label text-ink-muted uppercase">{t.pricingSection.webPartLabel}</span>
            <span className="text-[28px] leading-tight font-bold tracking-[-0.02em]">
              {t.blog.prices.webPart.split("{price}")[0]}
              <CountUp localeTag={t.locale} value={PRICES.webPart} />
              {t.blog.prices.webPart.split("{price}")[1]}
            </span>
            <span className="text-[14px] leading-snug text-ink-muted">{t.pricingSection.webPartText}</span>
          </li>
          <li className="flex flex-col gap-2.5 border border-line bg-surface px-5 py-5">
            <span className="font-mono text-label text-ink-muted uppercase">{t.pricingSection.hourLabel}</span>
            <span className="text-[28px] leading-tight font-bold tracking-[-0.02em]">
              {t.blog.prices.change.split("{price}")[0]}
              <CountUp localeTag={t.locale} value={PRICES.change} />
              {t.blog.prices.change.split("{price}")[1]}
            </span>
            <span className="text-[14px] leading-snug text-ink-muted">{t.pricingSection.hourText}</span>
          </li>
        </ul>
      ) : (
        <div className="mt-6 border border-line bg-surface px-5 py-5">
          <p className="text-[16px] font-bold">{p.hidden.title}</p>
          <p className="mt-1 text-[14px] leading-snug text-ink-muted">{p.hidden.text}</p>
        </div>
      )}

      <p className="mt-6 max-w-[64ch] text-[15px] leading-normal text-ink-muted">{t.pricingSection.note}</p>

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
