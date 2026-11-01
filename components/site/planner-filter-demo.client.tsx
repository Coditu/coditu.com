"use client";

import { Check, ChevronLeft, ChevronRight, Circle, Clock3, Lock, Plus, UserRound } from "lucide-react";
import { useState, type ReactNode } from "react";

import { buttonClasses } from "@/components/ui/button";
import { type getMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { Window } from "./window";

type S = ReturnType<typeof getMessages>["servicesSection"];

const STATUS_ICONS = [Circle, Clock3, Check];
const PLANNER_TODAY = 2; // Wednesday 21
/** How many days show: one on a phone, three in a narrow column, five when there is room. */
const dayVisibility = (day: number) => (day === 0 ? "" : day < 3 ? "hidden @min-[30rem]:block" : "hidden @min-[42rem]:block");

/**
 * The editorial planner, genuinely filterable by status — "Status auf
 * einen Blick" made real, the same pattern as
 * `calendar-filter-demo.client.tsx`: the picture stays `aria-hidden`
 * (visual feedback only), the real filter chips are its sibling, outside
 * that scope, labelled and keyboard-operable. Spec: page-sections.md →
 * Services; docs/02-POSITIONING.md "Interactive web parts".
 */
export function PlannerFilterDemo({ s }: { s: S }) {
  const p = s.planner;
  const [login, data, statusPin] = s.rows[1].labels;
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div aria-hidden="true" className="@container">
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
                      const dimmed = active !== null && entry !== undefined && entry.status !== active;
                      return (
                        <div key={day} className={cn("min-w-0 border-t border-line pt-2 pb-2", dayVisibility(d))}>
                          {entry && (
                            <EntryCard
                              entry={entry}
                              statuses={p.statuses}
                              pin={ch === 0 && d === 0 ? statusPin : undefined}
                              dimmed={dimmed}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </Pin>
          </div>
        </Window>
      </div>

      {/* The one real control: filters the picture above by status. Outside
          the `aria-hidden` scope on purpose. */}
      <div role="group" aria-label={statusPin} className="mt-3 flex flex-wrap gap-1.5">
        <FilterChip pressed={active === null} onClick={() => setActive(null)}>
          {allLabel(p.statuses)}
        </FilterChip>
        {p.statuses.map((status, i) => (
          <FilterChip key={status} pressed={active === i} onClick={() => setActive(i)}>
            {status}
          </FilterChip>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {statusPin}: {active === null ? allLabel(p.statuses) : p.statuses[active]}
      </p>
    </>
  );
}

/** No separate "all statuses" string exists in the data — composing it from
 * the real status words keeps this at "invent nothing", just joined. */
function allLabel(statuses: string[]) {
  return statuses.join(" / ");
}

function FilterChip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "rounded-tag border px-2.5 py-1 font-mono text-label uppercase transition-colors duration-150",
        pressed ? "border-blueprint bg-blueprint text-blueprint-ink" : "border-line-input text-ink-muted hover:border-blueprint hover:text-blueprint"
      )}
    >
      {children}
    </button>
  );
}

function EntryCard({
  entry,
  statuses,
  pin,
  dimmed,
}: {
  entry: S["planner"]["entries"][number];
  statuses: string[];
  pin?: string;
  dimmed: boolean;
}) {
  const Icon = STATUS_ICONS[entry.status]!;
  const state = (
    <span className="flex min-w-0 items-center gap-1 text-[12px] font-semibold">
      <Icon className={cn("size-3.5 flex-none", entry.status === 2 ? "text-success" : "text-ink-muted")} strokeWidth={2} />
      <span className="truncate">{statuses[entry.status]}</span>
    </span>
  );
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-ui border border-line bg-surface p-2 transition-opacity duration-150",
        dimmed && "opacity-30"
      )}
    >
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

/** A callout: dashed blue outline round a part of the mockup, its label on the edge. Duplicated from services.tsx's own `Pin` — same spec, this file needs its own because it's a separate client bundle. */
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
