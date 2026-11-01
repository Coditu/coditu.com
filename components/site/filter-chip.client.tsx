"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A toggle button for a filter group — shared by calendar-filter-demo and
 * planner-filter-demo (both had their own identical copy; one shared module
 * lets the bundler emit it once instead of twice). `aria-pressed` is the
 * whole state story; no `role="tab"` — these aren't a tablist, each one
 * independently shows/hides, including "show everything" as its own chip.
 */
export function FilterChip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
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

/**
 * A callout: dashed blue outline round a part of the mockup, its label on
 * the edge. Same spec as services.tsx's own (server-side) `Pin` — this is
 * the client-side twin, shared by the two interactive mockups so it isn't
 * duplicated between their two bundles.
 */
export function Pin({ label, at = "-top-2.5 left-2", className, children }: { label: string; at?: string; className?: string; children: ReactNode }) {
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
