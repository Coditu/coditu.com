"use client";

import { ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, Search } from "lucide-react";
import { useState } from "react";

import { type getMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { FilterChip, Pin } from "./filter-chip.client";
import { Window } from "./window";

type S = ReturnType<typeof getMessages>["servicesSection"];

/** Four weeks from Monday 19 October 2026 (example data; numbers, not Dates). */
const WEEKS = [
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
];
const TODAY = 3; // index in the first week: Thursday 22
const DOTS: Record<number, number> = { 22: 2, 23: 1, 27: 1, 29: 2, 3: 1, 5: 1, 10: 1, 12: 2 };
/** Which event (by its day number) each day's dots belong to — for the filter to dim by area. */
const DOT_DAYS = Object.keys(DOTS).map(Number);

/**
 * The calendar web part, genuinely filterable by area — the one SharePoint
 * mockup with a real control, not just a picture. The picture itself stays
 * `aria-hidden` (sighted-only visual feedback); the filter buttons that
 * drive it are real, labelled, keyboard-operable, and sit OUTSIDE that
 * `aria-hidden` scope, as a sibling in the figure — see services.tsx. Spec:
 * page-sections.md → Services; docs/02-POSITIONING.md "Interactive web parts".
 */
export function CalendarFilterDemo({ s }: { s: S }) {
  const c = s.calendar;
  const [filter, grid, live] = s.rows[0].labels;
  const areas = [...new Set(c.events.map((event) => event.area))];
  const [active, setActive] = useState<string | null>(null);

  // Deterministic, from the day number alone: every third dotted day belongs
  // to the first area, the next to the second, and so on — example data, not
  // a claim about which real event is which; it only has to look plausible
  // and actually dim/undim when a real area is picked.
  const areaForDay = (day: number) => areas[DOT_DAYS.indexOf(day) % areas.length];

  return (
    // A fragment, not a wrapping div: the picture stays a DIRECT child of
    // the figure in services.tsx (the existing e2e test for Services checks
    // `figure > [aria-hidden]`), with the real filter controls as its sibling.
    <>
      <div aria-hidden="true" className="@container">
        <Window
          bar={
            <>
              <LayoutGrid className="size-4 flex-none text-blueprint" strokeWidth={1.5} />
              <span className="text-[14px] font-semibold">{c.site}</span>
              <span className="truncate text-[13px] text-ink-muted">/ {c.page}</span>
              <span className="ml-auto hidden h-7 w-40 items-center gap-1.5 rounded-full border border-line px-2.5 text-[12px] text-ink-muted @min-[26rem]:flex">
                <Search className="size-3.5" strokeWidth={1.5} />
                {c.search}
              </span>
            </>
          }
        >
          <div className="p-4 @min-[26rem]:p-5">
            <p className="text-[18px] leading-tight font-bold tracking-tight">{c.title}</p>
            <div className="mt-4 grid gap-5 @min-[36rem]:grid-cols-[minmax(0,1fr)_minmax(0,14rem)]">
              <div className="flex flex-col gap-3">
                <Pin label={filter} at="-top-2.5 right-2">
                  <p className="font-mono text-label text-ink-muted uppercase">{c.filterLabel}</p>
                  <div className="mt-1 flex h-9 items-center gap-2 rounded-ui border border-line-input px-2.5 text-[13px] font-semibold">
                    <span className="size-3 flex-none rounded-full border border-line-input" />
                    {active ?? c.filter}
                    <ChevronDown className="ml-auto size-4 text-ink-muted" strokeWidth={1.5} />
                  </div>
                </Pin>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14px] font-semibold">{c.range}</span>
                  <span className="flex gap-1.5">
                    {[ChevronLeft, ChevronRight].map((Icon, i) => (
                      <span key={i} className="flex size-7 items-center justify-center rounded-full border border-blueprint text-blueprint">
                        <Icon className="size-4" strokeWidth={1.5} />
                      </span>
                    ))}
                  </span>
                </div>
                <Pin label={grid} at="-bottom-2.5 right-2" className="pb-4">
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {c.weekdays.map((day) => (
                      <span key={day} className="py-1 font-mono text-label text-ink-muted uppercase">
                        {day}
                      </span>
                    ))}
                    {WEEKS.flatMap((week, w) =>
                      week.map((day, d) => {
                        const today = w === 0 && d === TODAY;
                        const dots = DOTS[day] ?? 0;
                        const dimmed = active !== null && dots > 0 && areaForDay(day) !== active;
                        return (
                          <span
                            key={`${w}-${d}`}
                            className={cn(
                              "flex h-9 flex-col items-center justify-center gap-0.5 rounded-ui text-[13px] tabular-nums transition-opacity duration-150",
                              w === 0 && d < TODAY && "text-ink-muted",
                              today && "bg-blueprint font-semibold text-blueprint-ink",
                              dimmed && "opacity-30"
                            )}
                          >
                            {day}
                            <span className="flex h-1 gap-0.5">
                              {Array.from({ length: dots }, (_, k) => (
                                <span key={k} className={cn("size-1 rounded-full", today ? "bg-blueprint-ink" : "bg-blueprint")} />
                              ))}
                            </span>
                          </span>
                        );
                      })
                    )}
                  </div>
                </Pin>
              </div>

              <Pin label={live} className="flex flex-col gap-2 pt-3">
                {c.events.map((event, i) => {
                  const dimmed = active !== null && event.area !== active;
                  return (
                    <div
                      key={event.title}
                      className={cn(
                        "flex-col gap-1.5 rounded-ui border border-line p-2.5 transition-opacity duration-150",
                        i === 2 ? "hidden @min-[36rem]:flex" : "flex",
                        dimmed && "opacity-30"
                      )}
                    >
                      <span className="font-mono text-label text-ink-muted uppercase">{event.date}</span>
                      <span className="text-[14px] leading-snug font-semibold">{event.title}</span>
                      <span className="flex flex-wrap gap-1">
                        {[event.time, event.area].map((pill) => (
                          <span key={pill} className="rounded-full bg-blueprint-light px-2 py-0.5 text-[12px] text-blueprint tabular-nums">
                            {pill}
                          </span>
                        ))}
                      </span>
                      <span className="text-[12px] text-ink-muted">
                        {c.place}: {event.place}
                      </span>
                    </div>
                  );
                })}
                <span className="flex justify-center gap-1 pt-1">
                  {[1, 2, 3].map((page) => (
                    <span
                      key={page}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full text-[12px] tabular-nums",
                        page === 1 ? "bg-blueprint font-semibold text-blueprint-ink" : "text-ink-muted"
                      )}
                    >
                      {page}
                    </span>
                  ))}
                </span>
              </Pin>
            </div>
          </div>
        </Window>
      </div>

      {/* The one real control: filters the picture above by area. Outside
          the `aria-hidden` scope on purpose. */}
      <div role="group" aria-label={c.filterLabel} className="mt-3 flex flex-wrap gap-1.5">
        <FilterChip pressed={active === null} onClick={() => setActive(null)}>
          {c.filter}
        </FilterChip>
        {areas.map((area) => (
          <FilterChip key={area} pressed={active === area} onClick={() => setActive(area)}>
            {area}
          </FilterChip>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {c.filterLabel}: {active ?? c.filter}
      </p>
    </>
  );
}
