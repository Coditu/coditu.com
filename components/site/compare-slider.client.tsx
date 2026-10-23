"use client";

import { ChevronsLeftRight } from "lucide-react";
import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * Before/after: two pictures stacked, the after one clipped from the left at
 * the handle. The control is a native range input over the whole picture, so
 * drag, click and arrow keys work without custom code; it is invisible, and
 * the handle shows its focus. Pictures are `aria-hidden`.
 */
export function CompareSlider({
  before,
  after,
  label,
  beforeLabel,
  afterLabel,
}: {
  before: ReactNode;
  after: ReactNode;
  label: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pos, setPos] = useState(50);
  const chip = "absolute bottom-3 z-10 rounded-tag border bg-surface px-1.5 py-px font-mono text-label uppercase";

  return (
    <div className="relative grid" style={{ "--pos": `${pos}%` } as CSSProperties}>
      <div aria-hidden="true" className="relative [grid-area:1/1]">
        {before}
        <span className={`${chip} left-3 border-line-input text-ink-muted`}>{beforeLabel}</span>
      </div>
      <div aria-hidden="true" className="relative [grid-area:1/1] [clip-path:inset(0_0_0_var(--pos))]">
        {after}
        <span className={`${chip} right-3 border-blueprint text-blueprint`}>{afterLabel}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={`${beforeLabel} ${pos} % · ${afterLabel} ${100 - pos} %`}
        className="peer absolute inset-0 size-full cursor-ew-resize touch-pan-y appearance-none opacity-0 [&::-moz-range-thumb]:size-11 [&::-webkit-slider-thumb]:size-11 [&::-webkit-slider-thumb]:appearance-none"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--pos) w-px bg-blueprint" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-(--pos) flex size-11 -translate-1/2 items-center justify-center rounded-ui border border-blueprint bg-surface text-blueprint peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-blueprint"
      >
        <ChevronsLeftRight className="size-5" strokeWidth={1.5} />
      </span>
    </div>
  );
}
