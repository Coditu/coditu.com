import type { ReactNode } from "react";

import { Pill } from "./web-parts/form";

/** A greyed web part that was on the page before: a few bars, no content. */
function Placeholder({ bars }: { bars: number }) {
  return (
    <div className="flex flex-col gap-2 rounded-ui border border-line bg-surface p-2">
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} className="h-1.5 rounded-full bg-line" style={{ width: `${90 - i * 20}%` }} />
      ))}
    </div>
  );
}

/**
 * A neutral intranet page — top bar with a plain grid icon, a page title,
 * greyed web parts that were already there — and the new web part in the
 * middle of it: its title, then whatever it shows (`children`). No product
 * logos, no real client UI. Below lg only the new web part is shown.
 */
export function IntranetFrame({
  intranet,
  page,
  title,
  live,
  children,
}: {
  intranet: string;
  page: string;
  title: string;
  /** The "Live" pill's text once the item is sent; nothing before. */
  live: string | null;
  children: ReactNode;
}) {
  return (
    <div className="flex size-full flex-col overflow-hidden rounded-ui border border-line bg-surface-sunk shadow-lift">
      <div className="flex h-8 flex-none items-center gap-2 border-b border-line bg-surface px-3 text-[12px] font-semibold text-ink-muted">
        <svg viewBox="0 0 12 12" className="size-3" fill="currentColor">
          {[0, 4.5, 9].flatMap((y) => [0, 4.5, 9].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" />))}
        </svg>
        {intranet}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-2.5">
        <p className="text-[16px] leading-tight font-semibold">{page}</p>
        <div className="grid min-h-0 flex-1 gap-2.5 lg:grid-cols-[minmax(0,1fr)_16%]">
          <section data-reveal="micro" style={{ animationDelay: "200ms" }} className="flex min-h-0 flex-col rounded-ui border border-line bg-surface">
            <div data-reveal="micro" style={{ animationDelay: "350ms" }} className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
              <span className="truncate text-[14px] font-semibold">{title}</span>
              {live && (
                <Pill className="border-blueprint bg-blueprint-light text-blueprint" delay={900}>
                  {live}
                </Pill>
              )}
            </div>
            <div className="min-h-0 flex-1 overflow-hidden p-2.5">{children}</div>
          </section>
          <div className="hidden flex-col gap-2.5 lg:flex">
            <Placeholder bars={3} />
            <Placeholder bars={2} />
            <Placeholder bars={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
