"use client";

import { Fragment, useState, type CSSProperties, type ReactNode } from "react";

/**
 * The parts list's only state: which row is open. The server draws every row
 * and every detail; this wires the buttons. Where a detail sits and how it
 * swaps is CSS (globals.css → services), so without JS each detail simply
 * shows under its row. Desktop always shows one detail; the mobile accordion
 * may close them all.
 */
export function ServiceRows({
  head,
  rows,
  foot,
}: {
  head: ReactNode;
  rows: { row: ReactNode; detail: ReactNode }[];
  foot: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="cd-svc grid" style={{ "--rows": rows.length + 2 } as CSSProperties}>
      {head}
      {rows.map(({ row, detail }, i) => (
        <Fragment key={i}>
          <button
            type="button"
            aria-expanded={open === i}
            aria-controls={`svc-detail-${i}`}
            onClick={() => setOpen(open === i && !matchMedia("(min-width: 64rem)").matches ? null : i)}
            className="group relative w-full cursor-pointer text-left transition-colors duration-150 hover:bg-surface aria-expanded:bg-blueprint-light"
          >
            {row}
          </button>
          <div id={`svc-detail-${i}`} data-open={open === i ? "" : undefined} className="cd-svc-detail">
            {detail}
          </div>
        </Fragment>
      ))}
      {foot}
    </div>
  );
}
