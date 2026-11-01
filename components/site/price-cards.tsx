import { textLink } from "@/components/ui/button";
import { getMessages, pages, type Locale } from "@/lib/i18n";
import { PRICES, SHOW_PRICES } from "@/lib/site-config";

import { Container } from "./container";
import { CountUp } from "./count-up.client";
import { SectionHeader } from "./section-header";

/**
 * Pricing teaser: two stat tiles (spec: data-display.md), each number
 * counting up once it scrolls into view. Gone entirely while SHOW_PRICES is
 * off (lib/site-config.ts, NEXT_PUBLIC_SHOW_PRICES) — no markup, no counter
 * JS. The euro amount comes from `PRICES`; the surrounding words come from
 * the same `blog.prices.webPart` / `.change` templates the blog and the FAQ
 * use, split on `{price}` so the counted amount sits exactly where the
 * template puts it — one number, three places, always agreeing.
 */
export function Pricing({ locale }: { locale: Locale }) {
  if (!SHOW_PRICES) return null;

  const t = getMessages(locale);
  const s = t.pricingSection;
  const [webPartBefore, webPartAfter] = t.blog.prices.webPart.split("{price}");
  const [hourBefore, hourAfter] = t.blog.prices.change.split("{price}");

  return (
    <section id={t.anchors.pricing} aria-labelledby="pricing-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader title={s.title} intro={s.intro} headingId="pricing-title" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          <li
            data-reveal="section"
            data-reveal-on-view
            className="flex flex-col gap-2.5 border border-line bg-surface px-5 py-5"
          >
            <span className="font-mono text-label text-ink-muted uppercase">{s.webPartLabel}</span>
            <span className="text-[28px] leading-tight font-bold tracking-[-0.02em]">
              {webPartBefore}
              <CountUp localeTag={t.locale} value={PRICES.webPart} />
              {webPartAfter}
            </span>
            <span className="text-[14px] leading-snug text-ink-muted">{s.webPartText}</span>
          </li>
          <li
            data-reveal="section"
            data-reveal-on-view
            style={{ animationDelay: "80ms" }}
            className="flex flex-col gap-2.5 border border-line bg-surface px-5 py-5"
          >
            <span className="font-mono text-label text-ink-muted uppercase">{s.hourLabel}</span>
            <span className="text-[28px] leading-tight font-bold tracking-[-0.02em]">
              {hourBefore}
              <CountUp localeTag={t.locale} value={PRICES.change} />
              {hourAfter}
            </span>
            <span className="text-[14px] leading-snug text-ink-muted">{s.hourText}</span>
          </li>
        </ul>
        <p className="mt-6 max-w-[64ch] text-[15px] leading-normal text-ink-muted">{s.note}</p>
        <p className="mt-3">
          <a href={pages.pricing[locale]} className={textLink}>
            {s.moreLabel}
          </a>
        </p>
      </Container>
    </section>
  );
}
