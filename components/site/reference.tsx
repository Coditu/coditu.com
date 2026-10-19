import type { ReactNode } from "react";

import { Sheet } from "@/components/blueprint/sheet";
import { Tag } from "@/components/ui/tag";
import { getMessages, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import { SectionHeader } from "./section-header";

type R = ReturnType<typeof getMessages>["referenceSection"];

/**
 * Our work: one anonymous case study on a sheet (title block, real numbers,
 * what we built, our own example drawing), then two smaller projects.
 * Spec: blueprint-motifs.md (sheet, „Beispiel“), data-display.md (stat tile,
 * tag, card), page-sections.md (section header). Services' project cards
 * link here.
 */
export function Reference({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const r = t.referenceSection;

  return (
    <section
      id={t.anchors.reference}
      aria-labelledby="reference-title"
      className="py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          title={r.title}
          intro={r.intro}
          headingId="reference-title"
        />
        <Sheet
          className="mt-12"
          titleBlock={r.titleBlock}
          footer={[r.footer[0], r.footer[1]]}
        >
          <p className="font-mono text-label text-ink-muted uppercase">
            {r.factsLabel}
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {r.facts.map((fact, i) => (
              <li
                key={fact.value}
                data-reveal="section"
                data-reveal-on-view
                style={{ animationDelay: `${i * 80}ms` }}
                className="flex flex-col gap-2.5 border border-line bg-surface px-5 py-5"
              >
                <span className="text-[28px] leading-tight font-bold tracking-[-0.02em]">
                  {fact.value}
                </span>
                <span className="text-[15px] leading-snug text-ink-muted">
                  {fact.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="flex flex-col gap-8 lg:col-span-5">
              {r.built.map((group) => (
                <div key={group.title}>
                  <h3 className="text-h3">{group.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-[15px] leading-normal text-ink-muted">
                    {group.text}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex">
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="lg:col-span-7">
              <IntranetPage page={r.page} />
            </div>
          </div>
        </Sheet>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <h3 className="text-h3 lg:col-span-4">{r.moreTitle}</h3>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {r.projects.map((project) => (
              <li key={project.slug}>
                <article className="flex h-full flex-col gap-3 rounded-ui border border-line bg-surface p-2">
                  {/* Same 720 px thumbnails as the Services cards. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/work/thumbs/${project.slug}.webp`}
                    alt={project.alt}
                    width={720}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-tag border border-line object-cover object-top"
                  />
                  <div className="flex flex-col gap-2.5 px-2 pb-2">
                    <Tag>{project.kind}</Tag>
                    <h4 className="text-h3">{project.name}</h4>
                    <p className="text-[15px] leading-normal text-ink-muted">
                      {project.line}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Our own drawing of an intranet home page: web parts as labelled boxes, no content. */
function IntranetPage({ page }: { page: R["page"] }) {
  const p = page.parts;
  const bar = "block h-1.5 bg-line";
  return (
    <figure className="flex flex-col gap-3">
      <Tag variant="example">{page.example}</Tag>
      <div
        aria-hidden="true"
        className="flex flex-col gap-3 rounded-ui border border-line bg-paper p-3 shadow-lift sm:p-4"
      >
        <Part label={p.nav}>
          <div className="flex items-center gap-3">
            <span className="size-4 flex-none bg-blueprint" />
            {["w-12", "w-10", "w-16", "w-8"].map((w) => (
              <span key={w} className={cn(bar, w)} />
            ))}
          </div>
        </Part>
        <div className="grid gap-3 sm:grid-cols-3">
          <Part label={p.news} className="sm:col-span-2">
            <span className="block aspect-[2/1] border border-line bg-surface-sunk" />
            <span className={cn(bar, "w-4/5")} />
            <span className={cn(bar, "w-3/5")} />
          </Part>
          <Part label={p.links}>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="block aspect-square border border-line bg-surface-sunk"
                />
              ))}
            </div>
          </Part>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Part label={p.people}>
            {["w-3/5", "w-2/5"].map((w) => (
              <span key={w} className="flex items-center gap-2">
                <span className="size-6 flex-none rounded-full border border-line bg-surface-sunk" />
                <span className={cn(bar, w)} />
              </span>
            ))}
          </Part>
          <Part label={p.events}>
            {["w-1/2", "w-2/3"].map((w) => (
              <span key={w} className="flex items-center gap-2">
                <span className="size-6 flex-none border border-blueprint" />
                <span className={cn(bar, w)} />
              </span>
            ))}
          </Part>
        </div>
      </div>
      <figcaption className="text-[14px] leading-snug text-ink-muted">
        {page.caption}
      </figcaption>
    </figure>
  );
}

/** One web part: dashed blue outline with its name, like an annotation. */
function Part({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 border border-dashed border-blueprint/60 bg-surface p-3",
        className,
      )}
    >
      <span className="font-mono text-label text-blueprint uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}
