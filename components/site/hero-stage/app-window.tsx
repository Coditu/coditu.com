import { DoorOpen, LayoutDashboard, Lock, Plus, Users } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { Window } from "@/components/site/window";
import { StatusPill } from "@/components/ui/status-pill";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages/de";

type App = Messages["hero"]["request"]["app"];

/** Bookings per weekday (example data); Thursday is today, matching the „Heute 6“ tile. */
const COUNTS = [3, 5, 2, 6, 4];
const TODAY = 3;
const NAV_ICONS = [LayoutDashboard, DoorOpen, Users];

/**
 * The booking app the mail turns into — a picture, not a UI: spans, nothing
 * focusable. The mail's four key words land in it, in order: page title,
 * bookings table, calendar card, sign-in. Until they land (`slots`) those
 * places are empty dashed outlines and the content is hidden; on `build`
 * the content reveals and the landed words are lit; on `done` they settle and
 * the „Live“ pill shows.
 *
 * Narrow stage (< 26rem): the sidebar is an icon rail and the stat tiles are left out.
 */
export function AppWindow({
  app,
  initials,
  words,
  step,
  targetRef,
}: {
  app: App;
  initials: string;
  words: string[];
  step: "slots" | "build" | "done";
  targetRef: (i: number, el: HTMLSpanElement | null) => void;
}) {
  const built = step !== "slots";

  // A place one key word lands in. Capitalised, as the English mail writes them in lower case.
  const word = (i: number) => (
    <span
      ref={(el) => targetRef(i, el)}
      className={cn(
        "inline-block rounded-tag outline-offset-2 transition-colors duration-700 first-letter:uppercase",
        !built && "text-transparent outline-1 outline-blueprint outline-dashed",
        step === "build" && "bg-blueprint-light text-blueprint"
      )}
    >
      {words[i]}
    </span>
  );

  // Content that reveals once the words have landed, staggered.
  // (A class, not an inline opacity: prerendered HTML must not carry `opacity:0`, see verify-tokens.sh.)
  const reveal = (ms: number, className: string) => ({
    "data-reveal": built ? ("micro" as const) : undefined,
    style: built ? { animationDelay: `${ms}ms` } : undefined,
    className: cn(className, !built && "opacity-0"),
  });

  return (
    <Window
      className="h-full"
      bar={
          <>
            <span className="size-3 flex-none rounded-tag bg-blueprint" />
            <span className="truncate text-[14px] font-semibold">{app.name}</span>
            {step === "done" && (
              <span data-reveal="micro">
                <StatusPill status="live">{app.live}</StatusPill>
              </span>
            )}
            <span className="ml-auto flex flex-none items-center gap-2">
              <span className="flex items-center gap-1 text-[13px] text-ink-muted">
                <Lock className="size-3.5" strokeWidth={1.5} />
                {word(3)}
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-blueprint text-[11px] font-semibold text-blueprint-ink">
                {initials}
              </span>
            </span>
          </>
      }
    >
      <div className="flex min-h-0 flex-1">
        <div className="flex w-11 flex-none flex-col gap-1 border-r border-line p-1.5 @min-[26rem]:w-32 @min-[26rem]:p-2">
          {app.nav.map((label, i) => {
            const Icon = NAV_ICONS[i];
            return (
              <span
                key={label}
                className={cn(
                  "flex h-8 items-center justify-center gap-2 rounded-ui text-[13px] text-ink-muted @min-[26rem]:justify-start @min-[26rem]:px-2",
                  i === 0 && "bg-blueprint-light font-semibold text-blueprint"
                )}
              >
                <Icon className="size-4 flex-none" strokeWidth={1.5} />
                <span className="hidden truncate @min-[26rem]:inline">{label}</span>
              </span>
            );
          })}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 @min-[26rem]:p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[18px] leading-tight font-bold tracking-tight">{word(0)}</span>
            <span {...reveal(0, buttonClasses({ variant: "app" }, "h-8 gap-1.5 px-2.5 text-[13px]"))}>
              <Plus className="size-3.5" strokeWidth={2} />
              {app.newBooking}
            </span>
          </div>

          <div {...reveal(80, "hidden grid-cols-2 gap-3 @min-[26rem]:grid")}>
            {app.stats.map((stat) => (
              <div key={stat.label} className="rounded-ui border border-line px-3 py-1.5">
                <p className="font-mono text-label text-ink-muted uppercase">{stat.label}</p>
                <p className="mt-1 text-[20px] leading-none font-bold tabular-nums">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-ui border border-line px-3 py-1.5">
            <p className="text-[13px] font-semibold">{word(2)}</p>
            <div {...reveal(160, "mt-2 grid grid-cols-5 gap-1.5")}>
              {app.days.map((day, i) => (
                <div key={day} className={cn("flex flex-col items-center gap-1 rounded-tag py-0.5", i === TODAY && "bg-blueprint-light")}>
                  <span className={cn("font-mono text-label uppercase", i === TODAY ? "text-blueprint" : "text-ink-muted")}>{day}</span>
                  <span className="flex h-5 items-end">
                    <span className="w-2.5 rounded-tag bg-blueprint" style={{ height: COUNTS[i] * 3 }} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden rounded-ui border border-line">
            <p className="border-b border-line px-3 py-1.5 text-[13px] font-semibold">{word(1)}</p>
            <div {...reveal(240, "grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 px-3 text-[13px]")}>
              {app.columns.map((column) => (
                <span key={column} className="py-1.5 font-mono text-label text-ink-muted uppercase">
                  {column}
                </span>
              ))}
              {app.rows.map((row) => (
                <div key={row.room} className="contents">
                  <span className="truncate border-t border-line py-1.5">{row.room}</span>
                  <span className="border-t border-line py-1.5 tabular-nums">{row.time}</span>
                  <span className="border-t border-line py-1">
                    <StatusPill status={row.pending ? "warning" : "approved"}>{row.pending ? app.pending : app.confirmed}</StatusPill>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
