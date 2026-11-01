import { Blocks, ClipboardList, Server, UserCheck } from "lucide-react";

import { Tag } from "@/components/ui/tag";
import { getMessages, type Locale } from "@/lib/i18n";

import { Container } from "./container";
import { SectionHeader } from "./section-header";

type B = ReturnType<typeof getMessages>["baukastenSection"];

/**
 * One icon per `baukastenSection.points` entry, in the SAME order, in BOTH
 * `messages/de.ts` and `messages/en.ts`. Positional, no other check — the
 * same pattern in `security.tsx` silently showed wrong icons after a point
 * was cut without updating its array. Keep this list's length and order in
 * sync with `points` in the same change that touches either.
 */
const POINT_ICONS = [Blocks, UserCheck, Server, ClipboardList];

/**
 * The Baukasten: our flagship offer, previously missing from the public
 * site entirely (docs/02-POSITIONING.md). Four points as feature items
 * (same shape as Security — page-sections.md, data-display.md), then one
 * proof panel: a real, anonymised number and the four kinds of app it
 * builds — never the client's name.
 */
export function Baukasten({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const b = t.baukastenSection;
  if (process.env.NODE_ENV !== "production" && b.points.length !== POINT_ICONS.length) {
    throw new Error(
      `Baukasten: baukastenSection.points has ${b.points.length} entries but POINT_ICONS has ${POINT_ICONS.length} — keep them in sync.`
    );
  }

  return (
    <section id={t.anchors.baukasten} aria-labelledby="baukasten-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader title={b.title} intro={b.intro} headingId="baukasten-title" />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7">
            {b.points.map((point, i) => {
              const Icon = POINT_ICONS[i];
              return (
                <li
                  key={point.title}
                  data-reveal="section"
                  data-reveal-on-view
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="flex items-start gap-4 border-t border-ink py-5"
                >
                  <span className="inline-flex size-[46px] flex-none items-center justify-center border border-blueprint text-blueprint">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.4} />
                  </span>
                  <div>
                    <h3 className="text-[18px] leading-snug font-bold">{point.title}</h3>
                    <p className="mt-1.5 max-w-[56ch] text-[15px] leading-normal text-ink-muted">{point.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="lg:col-span-5">
            <Proof proof={b.proof} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** One real, anonymised number, and the kinds of app built from the same blocks. */
function Proof({ proof }: { proof: B["proof"] }) {
  return (
    <figure className="flex flex-col gap-3">
      <Tag variant="example">{proof.label}</Tag>
      <div className="flex flex-col gap-2.5 border border-line bg-surface px-5 py-5">
        <span className="text-[28px] leading-tight font-bold tracking-[-0.02em]">{proof.stat}</span>
        <span className="text-[15px] leading-snug text-ink-muted">{proof.statText}</span>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {proof.types.map((kind) => (
            <li key={kind} className="flex">
              <Tag>{kind}</Tag>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="text-[14px] leading-snug text-ink-muted">{proof.caption}</figcaption>
    </figure>
  );
}
