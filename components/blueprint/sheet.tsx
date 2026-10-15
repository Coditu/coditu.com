import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CropMarks } from "./crop-marks";

/**
 * A drawing sheet framing a demo. Example data inside must be marked
 * „Beispiel“ — the footer says so for the whole sheet.
 */
export function Sheet({
  titleBlock,
  footer,
  children,
  className,
}: {
  /** Title-block cells: label over value, e.g. { label: "Kunde", value: "…" }. */
  titleBlock?: { label: string; value: ReactNode }[];
  footer?: [ReactNode, ReactNode?];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative border border-ink bg-surface", className)}>
      <CropMarks />
      {titleBlock && (
        <dl
          className="grid grid-cols-1 border-b border-ink sm:grid-cols-[repeat(var(--cells),minmax(0,1fr))]"
          style={{ "--cells": titleBlock.length } as CSSProperties}
        >
          {titleBlock.map((cell) => (
            <div
              key={cell.label}
              className="flex flex-col gap-1 border-line px-5 py-3.5 not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l"
            >
              <dt className="font-mono text-label text-ink-muted uppercase">{cell.label}</dt>
              <dd className="text-[15px] font-semibold">{cell.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="p-6 md:p-8">{children}</div>
      {footer && (
        <div className="flex justify-between gap-4 border-t border-line px-5 py-3 font-mono text-label text-ink-muted uppercase">
          <span>{footer[0]}</span>
          {footer[1] && <span>{footer[1]}</span>}
        </div>
      )}
    </div>
  );
}
