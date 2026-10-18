import { existsSync } from "node:fs";
import { join } from "node:path";

import { ArrowRight, ChevronsLeftRight } from "lucide-react";

import { DimensionLine } from "@/components/blueprint/dimension-line";
import { Sheet } from "@/components/blueprint/sheet";
import { SheetLabel, SheetMeta } from "@/components/blueprint/sheet-label";
import { Sketch, SketchButton, SketchField } from "@/components/blueprint/sketch";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { StatusPill } from "@/components/ui/status-pill";
import { getMessages, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site-config";

import { CompareRange } from "./compare-range.client";
import { Container } from "./container";

type HeroMessages = ReturnType<typeof getMessages>["hero"];

/**
 * Blatt 01. Spec: docs/design-system/components/page-sections.md → Hero, and
 * blueprint-motifs.md §7. Motion is CSS only (globals.css → hero).
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const h = t.hero;
  const mailto =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(h.cta.subject)}` +
    `&body=${encodeURIComponent(h.cta.body)}`;

  return (
    <section aria-labelledby="hero-title" className="pt-8 pb-16 lg:pb-24">
      <Container>
        <div className="mb-12">
          <SheetMeta left={h.meta[0]} right={h.meta[1]} />
        </div>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SheetLabel>{h.label}</SheetLabel>
            <h1 id="hero-title" className="mt-6 text-display">
              {h.title}
              <span className="text-blueprint">.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-ink-muted">{h.lead}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={mailto} variant="cta" size="lg">
                {h.cta.label}
              </ButtonLink>
              <ButtonLink href={`#${t.anchors.process}`} variant="outline" size="lg">
                {h.secondary}
              </ButtonLink>
            </div>
            <dl className="mt-12 grid gap-4 border-t border-ink pt-4 sm:grid-cols-3">
              {h.facts.map((fact) => (
                <div key={fact.id}>
                  <dt className="font-mono text-label text-blueprint uppercase">{fact.id}</dt>
                  <dd className="mt-1 text-[15px] leading-snug font-semibold">{fact.text}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ul aria-label={h.team.listLabel} className="flex gap-2">
                {h.team.members.map((member) => (
                  <li key={member.slug}>
                    <TeamTile {...member} />
                  </li>
                ))}
              </ul>
              <p className="font-mono text-label text-ink-muted uppercase">{h.team.line}</p>
            </div>
          </div>
          <HeroDemo d={h.demo} />
        </div>
      </Container>
    </section>
  );
}

/**
 * A square portrait from public/team/<slug>.jpg, checked at build time. Until
 * it exists: the drawing placeholder from the team-card spec, which must not
 * reach production (`hero.team.photos` holds the deploy).
 */
function TeamTile({ slug, name, role }: { slug: string; name: string; role: string }) {
  const tooltip = `${name} · ${role}`;
  if (existsSync(join(process.cwd(), "public", "team", `${slug}.jpg`))) {
    return (
      // A 40 px square needs no optimiser, and next/image would add client JS to the hero.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/team/${slug}.jpg`}
        alt={name}
        title={tooltip}
        width={40}
        height={40}
        className="size-10 border border-line object-cover"
      />
    );
  }
  return (
    <span role="img" aria-label={name} title={tooltip} className="block size-10 border border-line bg-surface-sunk text-line-input">
      <svg aria-hidden="true" viewBox="0 0 40 40" className="size-full">
        <path d="M0 0 40 40M40 0 0 40" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}

/** Zeitraum and Kosten share a row from `sm`; everything else is full width. */
const fieldSpan = (index: number) => (index === 2 || index === 3 ? undefined : "sm:col-span-2");

/**
 * The same form twice in one grid cell: the live version underneath, the
 * sketch on top, clipped at `--pos` by the range input.
 */
function HeroDemo({ d }: { d: HeroMessages["demo"] }) {
  return (
    <figure className="lg:col-span-6 lg:col-start-7">
      <Sheet titleBlock={[{ label: d.sheet.label, value: d.sheet.value }]}>
        <div className="cd-compare group relative grid overflow-x-clip">
          <div className="col-start-1 row-start-1 flex flex-col gap-3">
            <div
              role="group"
              aria-labelledby="hero-demo-title"
              className="flex flex-col gap-4 rounded-ui border border-line bg-surface p-4 shadow-lift"
            >
              <div className="flex items-center justify-between gap-4">
                <p id="hero-demo-title" className="text-[15px] font-semibold">
                  {d.live.title}
                </p>
                <StatusPill status="live">{d.live.status}</StatusPill>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {d.fields.map((field, i) => (
                  <div key={field.label} className={fieldSpan(i)}>
                    <Field id={`hero-field-${i}`} label={field.label}>
                      {(props) => <Input {...props} readOnly tabIndex={-1} defaultValue={field.value} />}
                    </Field>
                  </div>
                ))}
                <div className="flex sm:col-span-2">
                  <Button tabIndex={-1}>{d.live.button}</Button>
                </div>
              </div>
            </div>
            <p className="text-right font-mono text-label text-ink-muted uppercase">{d.live.caption}</p>
          </div>

          <div className="cd-wipe col-start-1 row-start-1 bg-surface">
            <Sketch label={d.sketch.label} id={d.sketch.id} caption={d.sketch.caption}>
              <div className="cd-sketch-in grid gap-4 sm:grid-cols-2">
                {d.fields.map((field, i) => (
                  <div key={field.label} className={fieldSpan(i)}>
                    <SketchField label={`0${i + 1} · ${field.label}`} hint={field.hint} />
                  </div>
                ))}
                <div className="flex sm:col-span-2">
                  <SketchButton>{d.sketch.button}</SketchButton>
                </div>
              </div>
            </Sketch>
          </div>

          <div aria-hidden="true" className="cd-wipe-handle pointer-events-none relative col-start-1 row-start-1">
            <span className="absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-blueprint" />
            <span className="absolute top-1/2 left-0 flex size-11 -translate-1/2 items-center justify-center rounded-ui border border-blueprint bg-surface text-blueprint group-has-focus-visible:outline-2 group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-blueprint">
              <ChevronsLeftRight className="size-5" strokeWidth={1.5} />
            </span>
          </div>

          <CompareRange label={d.compareLabel} />
        </div>

        <div className="mt-8">
          <ol aria-label={d.stepsLabel} className="cd-steps flex items-center">
            {d.steps.map((step, i) => (
              <li key={step} className="flex flex-1 items-center gap-2 font-mono text-label text-ink uppercase last:flex-none">
                <span aria-hidden="true" className="relative size-2 flex-none border border-blueprint">
                  <span className="cd-step-on absolute inset-0 bg-blueprint" />
                </span>
                {step}
                {i < d.steps.length - 1 && (
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} className="mr-2 ml-auto size-4 text-blueprint" />
                )}
              </li>
            ))}
          </ol>
          <div className="mt-3">
            <DimensionLine label={d.duration} />
          </div>
        </div>
      </Sheet>
      <figcaption className="mt-4 text-[13px] text-ink-muted">{d.caption}</figcaption>
    </figure>
  );
}
