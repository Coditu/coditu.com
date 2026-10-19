import { Fragment } from "react";

import { ArrowRight } from "lucide-react";

import { Sheet } from "@/components/blueprint/sheet";
import { Sketch, SketchButton, SketchField } from "@/components/blueprint/sketch";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { StatusPill } from "@/components/ui/status-pill";
import { Tag } from "@/components/ui/tag";
import { getMessages, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site-config";

import { Container } from "./container";
import { SectionHeader } from "./section-header";
import { ServiceTabs } from "./service-tabs.client";

type Messages = ReturnType<typeof getMessages>;
type S = Messages["servicesSection"];

/**
 * Services as a showcase: one big sheet shows the picked service, the tabs
 * under it (one column per service) pick it. On phones the tabs sit above.
 * Spec: page-sections.md (section header), blueprint-motifs.md (sheet, §7
 * sketch vs live), data-display.md (tags).
 */
export function Services({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const s = t.servicesSection;
  const demos = [
    <Catalogue key="catalogue" s={s} />,
    <AppDemo key="app" s={s} />,
    <Projects key="projects" projects={t.referenceSection.projects} href={`#${t.anchors.reference}`} />,
    <Changelog key="changelog" s={s} />,
  ];

  return (
    <section id={t.anchors.services} aria-labelledby="services-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader title={s.title} intro={s.intro} headingId="services-title" />
        <div className="mt-12">
          <ServiceTabs
            label={s.title}
            tabs={s.rows.map((row) => (
              <Fragment key={row.title}>
                <span className="text-[16px] leading-snug font-semibold">{row.title}</span>
                <span className="text-[14px] leading-snug text-ink-muted">{row.problem}</span>
              </Fragment>
            ))}
            panels={s.rows.map((row, i) => (
              <Sheet key={row.title}>
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className="flex flex-col lg:col-span-5">
                    <h3 className="text-h2">{row.title}</h3>
                    <p className="mt-4 text-lead font-semibold">{row.problem}</p>
                    <p className="mt-3 max-w-[46ch] text-[16px] leading-normal text-ink-muted">{row.text}</p>
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {row.tags.map((tag) => (
                        <li key={tag} className="flex">
                          <Tag>{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                    {row.facts && (
                      <div className="mt-8 border-t border-ink pt-4 lg:mt-auto">
                        <p className="font-mono text-label text-blueprint uppercase">{s.facts}</p>
                        <p className="mt-1 text-[15px] leading-snug font-semibold">{row.facts}</p>
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-7">{demos[i]}</div>
                </div>
              </Sheet>
            ))}
          />
          <p className="mt-8">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(s.more.subject)}`}
              className="text-[15px] font-semibold text-blueprint underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-blueprint-hover hover:decoration-2"
            >
              {s.more.label}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

/** Detail 01: web parts we really built, grouped. */
function Catalogue({ s }: { s: S }) {
  return (
    <div>
      <p className="font-mono text-label text-ink-muted uppercase">{s.catalogue.label}</p>
      <dl className="mt-4 flex flex-col gap-4">
        {s.catalogue.groups.map((group) => (
          <div key={group.name}>
            <dt className="text-[13px] font-semibold">{group.name}</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex">
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Detail 02: a request form as sketch, then live. */
function AppDemo({ s }: { s: S }) {
  const a = s.app;
  return (
    <div className="flex flex-col gap-6">
      <Tag variant="example">{s.example}</Tag>
      <Sketch label={a.sketch.label} id={a.sketch.id} caption={a.sketch.caption}>
        <div className="cd-sketch-in flex flex-col gap-4">
          {a.fields.map((field, i) => (
            <SketchField key={field.label} label={`0${i + 1} · ${field.label}`} hint={field.hint} />
          ))}
          <SketchButton>{a.sketch.button}</SketchButton>
        </div>
      </Sketch>
      <div className="flex flex-col gap-3">
        <div
          inert
          role="group"
          aria-labelledby="svc-app-title"
          className="flex flex-col gap-4 rounded-ui border border-line bg-surface p-4 shadow-lift"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p id="svc-app-title" className="text-[15px] font-semibold">
              {a.live.title}
            </p>
            <StatusPill status="live">{a.live.login}</StatusPill>
          </div>
          {a.fields.map((field, i) => (
            <Field key={field.label} id={`svc-field-${i}`} label={field.label}>
              {(props) => <Input {...props} readOnly tabIndex={-1} defaultValue={field.value} />}
            </Field>
          ))}
          <div className="flex">
            <Button tabIndex={-1}>{a.live.button}</Button>
          </div>
        </div>
        <p className="text-right font-mono text-label text-ink-muted uppercase">{a.live.caption}</p>
      </div>
    </div>
  );
}

/** Detail 03: two real projects, linking to the reference section. */
function Projects({ projects, href }: { projects: Messages["referenceSection"]["projects"]; href: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <a
            href={href}
            className="flex h-full flex-col gap-2 rounded-ui border border-line bg-surface p-2 transition-colors duration-150 hover:border-ink"
          >
            {/* 720 px thumbnails, made once from public/work/<name>.webp: small enough
                that the optimiser (and next/image's client component) is not needed. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/work/thumbs/${project.slug}.webp`}
              alt=""
              width={720}
              height={540}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-tag border border-line object-cover object-top"
            />
            <span className="px-1 text-[15px] font-semibold text-blueprint">{project.name}</span>
            <span className="px-1 pb-1 text-[14px] leading-snug text-ink-muted">{project.line}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Detail 04: example tickets, Änderung → Erledigt. */
function Changelog({ s }: { s: S }) {
  const c = s.changelog;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-label text-ink-muted uppercase">{c.label}</p>
        <Tag variant="example">{s.example}</Tag>
      </div>
      <ol className="mt-4 flex flex-col gap-3">
        {c.tickets.map((ticket) => (
          <li key={ticket.id} className="flex flex-col gap-2 rounded-ui border border-line bg-surface p-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="mr-auto font-mono text-label text-ink-muted uppercase">{ticket.id}</span>
              <span className="flex items-center gap-2">
                <StatusPill status="draft">{c.from}</StatusPill>
                <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4 text-blueprint" />
                <StatusPill status="approved">{c.to}</StatusPill>
              </span>
            </div>
            <p className="text-[15px] leading-snug">{ticket.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
