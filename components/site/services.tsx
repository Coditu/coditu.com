import type { ReactNode } from "react";

import { Bell, CalendarDays, Check, ChevronLeft, ChevronRight, Circle, Clock3, Lock, Phone, Plus, UserRound } from "lucide-react";

import { buttonClasses, textLink } from "@/components/ui/button";
import { getMessages, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { CalendarFilterDemo } from "./calendar-filter-demo.client";
import { Container } from "./container";
import { SectionHeader } from "./section-header";
import { Window } from "./window";

type S = ReturnType<typeof getMessages>["servicesSection"];

/**
 * Services: one card per kind of work, alternating sides from lg; on phones the
 * mockup sits above the text. Each mockup is a coded rebuild of a real project
 * with example data, in the hero's window frame, with three callouts pinned to
 * it. Mockups are pictures (`aria-hidden`); the figcaption carries a sentence
 * for screen readers. Spec: page-sections.md → Services.
 */
export function Services({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const s = t.servicesSection;
  // Row 0 (the calendar web part) is the one genuinely interactive mockup —
  // CalendarFilterDemo owns its own aria-hidden scoping internally, so it's
  // rendered outright below, not through this array.
  const mockups = [null, <PlannerMock key="planner" s={s} />, <WebsiteMock key="website" s={s} />];

  return (
    <section id={t.anchors.services} aria-labelledby="services-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader title={s.title} intro={s.intro} headingId="services-title" />
        <div className="mt-12 flex flex-col gap-16 lg:gap-24">
          {s.rows.map((row, i) => (
            <article
              key={row.title}
              aria-labelledby={`svc-title-${i}`}
              data-reveal="section"
              data-reveal-on-view
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <figure className={cn("min-w-0 lg:col-span-7", i % 2 === 1 && "lg:order-last")}>
                {i === 0 ? (
                  <CalendarFilterDemo s={s} />
                ) : (
                  <div aria-hidden="true" className="@container">
                    {mockups[i]}
                  </div>
                )}
                <figcaption className="mt-3 text-right font-mono text-label text-ink-muted uppercase">
                  <span className="sr-only">{row.summary} </span>
                  {s.caption}
                </figcaption>
              </figure>
              <div className="lg:col-span-5">
                <h3 id={`svc-title-${i}`} className="text-h2">
                  {row.title}
                </h3>
                <p className="mt-4 text-lead font-semibold">{row.problem}</p>
                <p className="mt-3 max-w-[46ch] text-body text-ink-muted">{row.text}</p>
                <div className="mt-6 border-t border-ink pt-4">
                  <p className="font-mono text-label text-blueprint uppercase">{s.result}</p>
                  <p className="mt-1 text-[16px] leading-snug font-semibold">{row.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-16">
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(s.more.subject)}`} className={textLink}>
            {s.more.label}
          </a>
        </p>
      </Container>
    </section>
  );
}

/** A callout: dashed blue outline round a part of the mockup, its label on the edge. */
function Pin({ label, at = "-top-2.5 left-2", className, children }: { label: string; at?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative rounded-ui outline-1 outline-offset-2 outline-blueprint outline-dashed", className)}>
      {children}
      <span
        data-pin
        className={cn(
          "absolute z-10 rounded-tag border border-blueprint bg-surface px-1.5 py-px font-mono text-label whitespace-nowrap text-blueprint uppercase",
          at
        )}
      >
        {label}
      </span>
    </div>
  );
}

// --- 02 · Internal app: the editorial planner -------------------------------

const STATUS_ICONS = [Circle, Clock3, Check];
const PLANNER_TODAY = 2; // Wednesday 21
/** How many days show: one on a phone, three in a narrow column, five when there is room. */
const dayVisibility = (day: number) => (day === 0 ? "" : day < 3 ? "hidden @min-[30rem]:block" : "hidden @min-[42rem]:block");

function PlannerMock({ s }: { s: S }) {
  const p = s.planner;
  const [login, data, status] = s.rows[1].labels;
  return (
    <Window
      bar={
        <>
          <span className="size-3 flex-none rounded-tag bg-blueprint" />
          <span className="truncate text-[14px] font-semibold">{p.app}</span>
          <span className="ml-auto flex flex-none items-center gap-2">
            <Pin label={login} at="top-full right-0 mt-2.5" className="flex items-center gap-1 px-1 text-[13px] text-ink-muted">
              <Lock className="size-3.5" strokeWidth={1.5} />
              {p.login}
            </Pin>
            <span className="flex size-7 items-center justify-center rounded-full bg-blueprint text-[11px] font-semibold text-blueprint-ink">
              {p.initials}
            </span>
          </span>
        </>
      }
    >
      <div className="p-3 @min-[26rem]:p-4">
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {[ChevronLeft, ChevronRight].map((Icon, i) => (
            <span key={i} className="flex size-8 items-center justify-center rounded-ui border border-line-input">
              <Icon className="size-4" strokeWidth={1.5} />
            </span>
          ))}
          <span className="flex h-8 items-center rounded-ui border border-line-input px-2.5 text-[13px] font-semibold">{p.today}</span>
          <span className="min-w-0 flex-1 text-[15px] font-bold whitespace-nowrap tabular-nums">{p.range}</span>
          <span className={buttonClasses({ variant: "app" }, "hidden h-8 gap-1.5 px-2.5 text-[13px] @min-[26rem]:inline-flex")}>
            <Plus className="size-3.5" strokeWidth={2} />
            {p.add}
          </span>
        </div>

        <Pin label={data} at="-bottom-2.5 right-2" className="mt-4 pb-3">
          <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-2 @min-[30rem]:grid-cols-[6.5rem_repeat(3,minmax(0,1fr))] @min-[42rem]:grid-cols-[7rem_repeat(5,minmax(0,1fr))]">
            <span />
            {p.days.map((day, d) => (
              <span
                key={day}
                className={cn(
                  "rounded-tag py-1 text-center font-mono text-label uppercase",
                  d === PLANNER_TODAY ? "bg-blueprint-light font-semibold text-blueprint" : "text-ink-muted",
                  dayVisibility(d)
                )}
              >
                {day}
              </span>
            ))}
            {p.channels.map((channel, ch) => (
              <div key={channel} className="contents">
                <span className="flex items-start gap-1.5 border-t border-line pt-3 pb-2 text-[12px] font-semibold">
                  <span className="mt-1 size-2 flex-none rounded-tag bg-blueprint" />
                  <span className="min-w-0 hyphens-auto">{channel}</span>
                </span>
                {p.days.map((day, d) => {
                  const entry = p.entries.find((e) => e.channel === ch && e.day === d);
                  return (
                    <div key={day} className={cn("min-w-0 border-t border-line pt-2 pb-2", dayVisibility(d))}>
                      {entry && <EntryCard entry={entry} statuses={p.statuses} pin={ch === 0 && d === 0 ? status : undefined} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Pin>
      </div>
    </Window>
  );
}

function EntryCard({
  entry,
  statuses,
  pin,
}: {
  entry: S["planner"]["entries"][number];
  statuses: string[];
  pin?: string;
}) {
  const Icon = STATUS_ICONS[entry.status];
  const state = (
    <span className="flex min-w-0 items-center gap-1 text-[12px] font-semibold">
      <Icon className={cn("size-3.5 flex-none", entry.status === 2 ? "text-success" : "text-ink-muted")} strokeWidth={2} />
      <span className="truncate">{statuses[entry.status]}</span>
    </span>
  );
  return (
    <div className="flex flex-col gap-1.5 rounded-ui border border-line bg-surface p-2">
      <span className="text-[13px] leading-tight font-semibold">{entry.title}</span>
      <span className="self-start rounded-tag bg-surface-sunk px-1.5 py-px text-[12px]">{entry.area}</span>
      {pin ? (
        <Pin label={pin} at="top-full left-0 mt-1.5">
          {state}
        </Pin>
      ) : (
        state
      )}
      <span className="hidden min-w-0 items-center gap-1 text-[12px] text-ink-muted @min-[30rem]:flex">
        <UserRound className="size-3.5 flex-none" strokeWidth={1.5} />
        <span className="truncate">{entry.editor}</span>
      </span>
    </div>
  );
}

// --- 03 · Website: the NVRMiss home page -----------------------------------

function WebsiteMock({ s }: { s: S }) {
  const w = s.website;
  const [message, product, next] = s.rows[2].labels;
  const widget = "rounded-ui border border-line bg-surface p-2.5 text-left";
  return (
    <Window
      bar={
        <>
          <Phone className="size-4 flex-none text-blueprint" strokeWidth={1.5} />
          <span className="text-[14px] font-bold">
            <span className="text-blueprint">{w.brand.slice(0, 3)}</span>
            {w.brand.slice(3)}
          </span>
          <span className="mx-auto hidden gap-4 text-[12px] text-ink-muted @min-[36rem]:flex">
            {w.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
          <span className="ml-auto flex h-7 flex-none items-center rounded-ui border border-blueprint px-2.5 text-[12px] font-semibold text-blueprint @min-[36rem]:ml-0">
            {w.demo}
          </span>
        </>
      }
    >
      <div className="bg-blueprint-grid px-4 py-6 @min-[36rem]:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-blueprint text-blueprint-ink">
            <Phone className="size-5" strokeWidth={1.5} />
          </span>
          <span className="mt-3 rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12px] text-ink-muted">{w.badge}</span>
          <Pin label={message} at="-top-2.5 left-1/2 -translate-x-1/2" className="mt-5 px-1 pt-4">
            <p className="text-[22px] leading-tight font-bold tracking-tight @min-[36rem]:text-[24px]">
              {w.headline[0]}
              <br />
              <span className="text-blueprint">{w.headline[1]}</span>
            </p>
          </Pin>
          <p className="mt-3 max-w-[40ch] text-[13px] leading-snug text-ink-muted">{w.lead}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Pin label={next} at="top-full left-1/2 mt-2 -translate-x-1/2">
              <span className={buttonClasses({ variant: "app" }, "h-8 px-3 text-[13px]")}>{w.cta}</span>
            </Pin>
            <span className="flex h-8 items-center rounded-ui border border-line-input bg-surface px-3 text-[13px] font-semibold">{w.secondary}</span>
          </div>
          <p className="mt-9 font-mono text-label text-ink-muted uppercase">{w.fine}</p>
        </div>

        {/* Glimpses of the product, as the real page floats them round the headline. */}
        <div className="mt-8 grid items-start gap-3 @min-[30rem]:grid-cols-3">
          <Pin label={product} className="pt-3">
            <div className={widget}>
              <p className="text-[12px] font-semibold">{w.calls.title}</p>
              {w.calls.rows.map((row, i) => (
                <div key={row.text} className="mt-1.5 flex flex-col border-t border-line pt-1.5 text-[12px]">
                  <span className="truncate">{row.text}</span>
                  <span className={cn("font-semibold", i === 0 ? "text-success" : "text-warning")}>{row.status}</span>
                </div>
              ))}
            </div>
          </Pin>
          <div className={cn(widget, "mt-3 hidden @min-[30rem]:block")}>
            <p className="flex items-center gap-1.5 text-[12px] font-semibold">
              <Bell className="size-3.5 text-blueprint" strokeWidth={1.5} />
              {w.reminder.title}
            </p>
            <p className="mt-1.5 text-[12px] leading-snug">{w.reminder.text}</p>
            <p className="mt-1 font-mono text-label text-blueprint tabular-nums">{w.reminder.time}</p>
          </div>
          <div className={cn(widget, "mt-3 hidden @min-[30rem]:block")}>
            <p className="flex items-center gap-1.5 text-[12px] font-semibold">
              <CalendarDays className="size-3.5 text-blueprint" strokeWidth={1.5} />
              {w.sync.title}
            </p>
            <p className="mt-1.5 text-[12px] text-ink-muted">{w.sync.text}</p>
          </div>
        </div>
      </div>
    </Window>
  );
}
