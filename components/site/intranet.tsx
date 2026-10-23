import type { ReactNode } from "react";

import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Database,
  Globe,
  HeartPulse,
  KeyRound,
  Laptop,
  Lock,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Syringe,
  Utensils,
} from "lucide-react";

import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { getMessages, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { CompareSlider } from "./compare-slider.client";
import { Container } from "./container";
import { SectionHeader } from "./section-header";
import { Window } from "./window";

type S = ReturnType<typeof getMessages>["intranetSection"];
type Post = S["news"][number];

/** One icon per post in `news`, then the admin's new post. */
const NEWS_ICONS = [Utensils, HeartPulse, Laptop];
const TRUST_ICONS = [ShieldCheck, KeyRound, Database];

/**
 * The intranet offer: heading → before/after slider (classic SharePoint vs.
 * our design) → the admin publishing a post that lands on the intranet → three
 * trust points → three steps → the free-task CTA, marked „Intranet“.
 *
 * Mockups are pictures in the hero's window frame (`aria-hidden`, nothing
 * focusable); each figure's caption carries a sentence for screen readers.
 * The publish plays once on view through the page's reveal system (CSS
 * animations held until `<RevealScope>` releases them): no JS of its own, the
 * end state without JS, a 120 ms fade under reduced motion.
 */
export function Intranet({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const s = t.intranetSection;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(s.subject)}&body=${encodeURIComponent(s.body)}`;

  return (
    <section id={t.anchors.intranet} aria-labelledby="intranet-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader title={s.title} intro={s.intro} headingId="intranet-title" />

        <figure className="mt-12" data-reveal="section" data-reveal-on-view>
          <div className="@container">
            <CompareSlider
              before={<ClassicPage s={s} />}
              after={<ModernPage s={s} />}
              label={s.compare.control}
              beforeLabel={s.compare.before}
              afterLabel={s.compare.after}
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-label text-ink-muted uppercase">
            <span>{s.compare.hint}</span>
            <span>
              <span className="sr-only">{s.compare.summary} </span>
              {s.caption}
            </span>
          </figcaption>
        </figure>

        <figure className="mt-16" data-reveal="section" data-reveal-on-view>
          <div aria-hidden="true" className="grid items-start gap-8 lg:grid-cols-12">
            <div className="@container min-w-0 lg:col-span-7">
              <AdminMock s={s} />
            </div>
            <div className="@container min-w-0 lg:col-span-5">
              <LiveIntranet s={s} />
            </div>
          </div>
          <figcaption className="mt-3 text-right font-mono text-label text-ink-muted uppercase">
            <span className="sr-only">{s.admin.summary} </span>
            {s.caption}
          </figcaption>
        </figure>

        <ul className="mt-16 grid gap-x-6 md:grid-cols-3">
          {s.trust.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <li key={item.title} className="flex items-start gap-4 border-t border-ink py-5">
                <span className="inline-flex size-[46px] flex-none items-center justify-center border border-blueprint text-blueprint">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="text-[18px] leading-snug font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-normal text-ink-muted">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="text-h2">{s.stepsTitle}</h3>
          </div>
          <div className="lg:col-span-8">
            <ol className="grid gap-x-6 md:grid-cols-3">
              {s.steps.map((step, i) => (
                <li key={step.title} className="border-t border-ink py-5">
                  <p className="font-mono text-label text-blueprint uppercase">{String(i + 1).padStart(2, "0")}</p>
                  <h4 className="mt-1 text-[18px] leading-snug font-bold">{step.title}</h4>
                  <p className="mt-1.5 text-[15px] leading-normal text-ink-muted">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col items-start gap-3">
              <ButtonLink href={mailto} variant="cta" className="h-auto min-h-11 py-2 whitespace-normal">
                {s.cta}
              </ButtonLink>
              <p className="font-mono text-label text-ink-muted uppercase">{s.fine}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// --- Before / after ------------------------------------------------------------

function BrowserBar({ site, page }: { site: string; page: string }) {
  return (
    <>
      <Globe className="size-4 flex-none text-ink-muted" strokeWidth={1.5} />
      <span className="text-[14px] font-semibold">{site}</span>
      <span className="truncate text-[13px] text-ink-muted">/ {page}</span>
    </>
  );
}

/** Generic classic SharePoint: grey bar, ribbon tabs, a list of links, a small table. No Microsoft marks. */
function ClassicPage({ s }: { s: S }) {
  const c = s.classic;
  return (
    <Window className="h-full" bar={<BrowserBar site={c.site} page={c.heading} />}>
      <div className="flex-1 text-[12px] leading-snug">
        <div className="flex h-8 items-center gap-4 border-b border-line-input bg-surface-sunk px-3 text-ink-muted">
          <span className="font-semibold text-ink">{c.site}</span>
          {c.suite.map((item) => (
            <span key={item} className="hidden @min-[30rem]:inline">
              {item}
            </span>
          ))}
          <span className="ml-auto flex gap-3">
            <Settings className="size-3.5" strokeWidth={1.5} />
            <CircleHelp className="size-3.5" strokeWidth={1.5} />
          </span>
        </div>
        <div className="flex items-center gap-4 border-b border-line px-3 py-1 text-[11px] text-ink-muted uppercase">
          {c.tabs.map((tab, i) => (
            <span key={tab} className={cn(i === 0 && "font-semibold text-blueprint")}>
              {tab}
            </span>
          ))}
          <span className="ml-auto hidden gap-3 @min-[36rem]:flex">
            {c.actions.map((action) => (
              <span key={action}>{action}</span>
            ))}
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <span className="size-10 flex-none border border-line-input bg-surface-sunk" />
          <div className="min-w-0">
            <p className="text-[20px] leading-tight text-blueprint">{c.site}</p>
            <p className="truncate text-ink-muted">{c.breadcrumb}</p>
          </div>
        </div>
        <div className="flex gap-4 px-4 pb-6">
          <ul className="hidden w-28 flex-none flex-col gap-1.5 border-r border-line pr-3 @min-[30rem]:flex">
            {c.nav.map((item, i) => (
              <li key={item} className={cn("text-blueprint", i === 1 && "font-semibold text-ink")}>
                {item}
              </li>
            ))}
          </ul>
          <div className="min-w-0 flex-1">
            <p className="text-[16px]">{c.heading}</p>
            <p className="mt-1 flex items-center gap-1 text-blueprint">
              <Plus className="size-3.5 rounded-full border border-blueprint" strokeWidth={1.5} />
              {c.add}
            </p>
            <table className="mt-2 w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line-input text-ink-muted">
                  {c.columns.map((column, i) => (
                    <th key={column} className={cn("py-1 pr-2 font-normal", i === 2 && "hidden @min-[36rem]:table-cell")}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.news.map((post, i) => (
                  <tr key={post.title} className={cn("align-top", i % 2 === 1 && "bg-surface-sunk")}>
                    <td className="py-1 pr-2 text-blueprint underline">{post.title}</td>
                    <td className="py-1 pr-2 whitespace-nowrap text-ink-muted tabular-nums">{post.date}</td>
                    <td className="hidden py-1 pr-2 text-ink-muted @min-[36rem]:table-cell">{post.by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-ink-muted">{s.news[0].teaser}</p>
          </div>
        </div>
      </div>
    </Window>
  );
}

function ModernPage({ s }: { s: S }) {
  const m = s.modern;
  return (
    <Window className="h-full" bar={<BrowserBar site={m.site} page={m.heading} />}>
      <div className="flex-1 bg-paper">
        <div className="flex h-12 items-center gap-4 border-b border-line bg-surface px-4">
          <span className="size-5 flex-none rounded-tag bg-blueprint" />
          <span className="text-[14px] font-bold">{m.site}</span>
          <span className="hidden gap-4 text-[13px] @min-[36rem]:flex">
            {m.nav.map((item, i) => (
              <span key={item} className={i === 1 ? "font-semibold text-blueprint" : "text-ink-muted"}>
                {item}
              </span>
            ))}
          </span>
          <span className="ml-auto hidden h-7 w-36 items-center gap-1.5 rounded-full border border-line px-2.5 text-[12px] text-ink-muted @min-[30rem]:flex">
            <Search className="size-3.5" strokeWidth={1.5} />
            {m.search}
          </span>
        </div>
        <div className="p-4 @min-[36rem]:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[22px] leading-tight font-bold tracking-tight">{m.heading}</p>
            <span className="flex flex-wrap gap-1.5">
              {m.filters.map((filter, i) => (
                <span
                  key={filter}
                  className={cn(
                    "rounded-tag px-2 py-1 text-[12px] font-semibold",
                    i === 0 ? "bg-blueprint text-blueprint-ink" : "border border-line bg-surface text-ink-muted",
                    i === 3 && "hidden @min-[30rem]:inline"
                  )}
                >
                  {filter}
                </span>
              ))}
            </span>
          </div>
          <div className="mt-4 grid gap-3 @min-[36rem]:grid-cols-3">
            {s.news.map((post, i) => (
              <NewsCard key={post.title} post={post} Icon={NEWS_ICONS[i]} read={m.read} className={cn(i === 2 && "hidden @min-[36rem]:flex")} />
            ))}
          </div>
          <p className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-blueprint">
            {m.more}
            <ArrowRight className="size-3.5" strokeWidth={1.5} />
          </p>
        </div>
      </div>
    </Window>
  );
}

function NewsCard({ post, Icon, read, className }: { post: Post; Icon: typeof Utensils; read: string; className?: string }) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-ui border border-line bg-surface", className)}>
      <span className="flex h-20 items-center justify-center bg-blueprint-light text-blueprint">
        <Icon className="size-6" strokeWidth={1.5} />
      </span>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <Meta post={post} />
        <span className="text-[14px] leading-snug font-semibold">{post.title}</span>
        <span className="line-clamp-2 text-[12px] leading-snug text-ink-muted">{post.teaser}</span>
        <span className="mt-auto pt-1 text-[12px] font-semibold text-blueprint">{read}</span>
      </div>
    </div>
  );
}

function Meta({ post, children }: { post: Post; children?: ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <span className="rounded-tag bg-surface-sunk px-1.5 py-px text-[12px]">{post.area}</span>
      <span className="font-mono text-label text-ink-muted tabular-nums">{post.date}</span>
      {children}
    </span>
  );
}

// --- Admin → live intranet -------------------------------------------------------

/** Holds until on view, then plays once (globals.css → reveal system). */
const ON_VIEW = { "data-reveal-on-view": "" };
const PUBLISH = "animate-[cd-fade_300ms_ease-out_1200ms_both]";

function AdminMock({ s }: { s: S }) {
  const a = s.admin;
  const field = "rounded-ui border border-line-input bg-surface px-3 text-[13px]";
  const label = "text-[12px] font-semibold";
  return (
    <Window
      bar={
        <>
          <span className="size-3 flex-none rounded-tag bg-blueprint" />
          <span className="truncate text-[14px] font-semibold">{a.app}</span>
          <span className="ml-auto flex flex-none items-center gap-2">
            <span className="flex items-center gap-1 text-[13px] text-ink-muted">
              <Lock className="size-3.5" strokeWidth={1.5} />
              {a.login}
            </span>
            <span className="flex size-7 items-center justify-center rounded-full bg-blueprint text-[11px] font-semibold text-blueprint-ink">
              {a.initials}
            </span>
          </span>
        </>
      }
    >
      <div className="flex flex-col gap-4 p-4 @min-[30rem]:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[18px] leading-tight font-bold tracking-tight">{a.heading}</p>
          <span className="grid text-[12px] font-semibold">
            <span {...ON_VIEW} className="animate-[cd-fade_300ms_ease-out_1200ms_reverse_both] rounded-full bg-warning-bg px-2 py-0.5 text-warning [grid-area:1/1]">
              {a.draft}
            </span>
            <span {...ON_VIEW} className={cn(PUBLISH, "rounded-full bg-success-bg px-2 py-0.5 text-success [grid-area:1/1]")}>
              {a.published}
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className={label}>{a.fields.area}</span>
          <span className="flex flex-wrap gap-1.5">
            {s.modern.filters.slice(1).map((area) => (
              <span
                key={area}
                className={cn(
                  "flex items-center gap-1 rounded-tag border px-2 py-1 text-[12px]",
                  area === a.post.area ? "border-blueprint bg-blueprint-light font-semibold text-blueprint" : "border-line-input"
                )}
              >
                {area === a.post.area && <Check className="size-3.5" strokeWidth={2} />}
                {area}
              </span>
            ))}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className={label}>{a.fields.title}</span>
          <span className={cn(field, "flex min-h-10 items-center py-2 font-semibold")}>{a.post.title}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className={label}>{a.fields.teaser}</span>
          <span className={cn(field, "py-2 leading-snug")}>{a.post.teaser}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className={label}>{a.fields.date}</span>
          <span className={cn(field, "flex h-10 w-40 items-center gap-2 tabular-nums")}>
            <CalendarDays className="size-4 text-ink-muted" strokeWidth={1.5} />
            {a.post.date}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <span {...ON_VIEW} className={cn(PUBLISH, "flex items-center gap-1.5 text-[13px] font-semibold text-success")}>
            <Check className="size-4" strokeWidth={2} />
            {a.done}
          </span>
          <span className="ml-auto flex flex-wrap justify-end gap-2">
            <span className="hidden h-9 items-center rounded-ui border border-line-input px-3 text-[13px] font-semibold @min-[26rem]:flex">
              {a.save}
            </span>
            <span className={buttonClasses({ variant: "app" }, "h-9 px-3 text-[13px]")}>{a.publish}</span>
          </span>
        </div>
      </div>
    </Window>
  );
}

/**
 * The intranet home beside the admin: the list moves down a row and the new
 * post slides in on top, out from under the box's clipped edge. Four rows of equal height (gap as padding) in a box three
 * rows high, so `cd-push` (−25 %) is exactly one row.
 */
function LiveIntranet({ s }: { s: S }) {
  const a = s.admin;
  const rows = [a.post, ...s.news];
  return (
    <Window bar={<BrowserBar site={s.modern.site} page={a.page} />}>
      <div className="bg-paper p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[18px] leading-tight font-bold tracking-tight">{s.modern.heading}</p>
          <span className="flex items-center gap-1 text-[12px] font-semibold text-blueprint">
            {s.modern.more}
            <ArrowRight className="size-3.5" strokeWidth={1.5} />
          </span>
        </div>
        <div className="mt-3 h-69 overflow-hidden">
          <div {...ON_VIEW} className="animate-[cd-push_700ms_var(--ease-entrance)_1600ms_both]">
            {rows.map((post, i) => {
              const Icon = i === 0 ? Syringe : NEWS_ICONS[i - 1];
              return (
                <div key={post.title} className="pb-3">
                  <div className={cn("flex h-20 gap-3 rounded-ui border bg-surface p-3", i === 0 ? "border-blueprint" : "border-line")}>
                    <span className="flex size-14 flex-none items-center justify-center rounded-tag bg-blueprint-light text-blueprint">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <Meta post={post}>
                        {i === 0 && (
                          <span className="hidden rounded-full bg-blueprint-light px-2 text-[12px] font-semibold text-blueprint @min-[22rem]:inline">{a.fresh}</span>
                        )}
                      </Meta>
                      <span className="line-clamp-2 text-[13px] leading-tight font-semibold">{post.title}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Window>
  );
}
