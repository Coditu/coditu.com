"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * The showcase's only state: which tab is open. The server draws every tab
 * and every panel; this wires them up (WAI-ARIA tabs, automatic activation:
 * arrows, Home, End). Without JS the tab bar is hidden and every panel shows,
 * one under the other (globals.css → services).
 */
export function ServiceTabs({
  label,
  tabs,
  panels,
}: {
  label: string;
  tabs: ReactNode[];
  panels: ReactNode[];
}) {
  const [open, setOpen] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (open === last ? 0 : open + 1)
      : e.key === "ArrowLeft" ? (open === 0 ? last : open - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setOpen(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="cd-svc flex flex-col">
      <div className="cd-svc-panels">
        {panels.map((panel, i) => (
          <div
            key={i}
            id={`svc-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`svc-tab-${i}`}
            data-open={open === i ? "" : undefined}
            className="cd-svc-panel"
          >
            {panel}
          </div>
        ))}
      </div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="cd-svc-tabs grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4 lg:border-t-0"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`svc-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={open === i}
            aria-controls={`svc-panel-${i}`}
            tabIndex={open === i ? 0 : -1}
            onClick={() => setOpen(i)}
            className="group relative flex cursor-pointer flex-col gap-1.5 bg-surface px-4 py-4 text-left transition-colors duration-150 hover:bg-surface-sunk aria-selected:bg-blueprint-light lg:px-5 lg:py-5"
          >
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-1 bg-blueprint group-aria-selected:block lg:top-0 lg:bottom-auto" />
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
