import { Plus } from "lucide-react";

import { textLink } from "@/components/ui/button";
import { getMessages, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import { SectionHeader } from "./section-header";

/**
 * FAQ: native <details> rows, all closed — keyboard and screen readers get
 * the disclosure for free, and it works without JS. No spec of its own, so it
 * reuses the section header and the Security rows (page-sections.md).
 * The FAQPage JSON-LD is built from the same messages.
 */
export function Faq({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const s = t.faqSection;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: t.locale,
    mainEntity: s.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id={t.anchors.faq} aria-labelledby="faq-title" className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Container>
        <SectionHeader title={s.title} intro={s.intro} headingId="faq-title" />
        <div className="mt-12 grid lg:grid-cols-12">
          <ul className="border-b border-ink lg:col-span-8">
            {s.items.map((item, i) => (
              <li
                key={item.question}
                data-reveal="section"
                data-reveal-on-view
                style={{ animationDelay: `${i * 60}ms` }}
                className="border-t border-ink"
              >
                <details className="group">
                  {/* No heading inside: <summary> is a button, and its role would hide it. */}
                  <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-5 text-[18px] leading-snug font-bold transition-colors duration-150 hover:text-blueprint focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blueprint [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="inline-flex size-8 flex-none items-center justify-center border border-blueprint text-blueprint"
                    >
                      <Plus
                        className="size-5 transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none"
                        strokeWidth={1.5}
                      />
                    </span>
                  </summary>
                  <div className="pb-6 sm:pr-12">
                    <p className="max-w-[64ch] text-[15px] leading-normal text-ink-muted">{item.answer}</p>
                    {item.link && (
                      <a href={`#${t.anchors[item.link.section]}`} className={cn(textLink, "mt-1")}>
                        {item.link.label}
                      </a>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
