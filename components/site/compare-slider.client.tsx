"use client";

import { ChevronsLeftRight, Hand } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Before/after: two pictures stacked, the after one clipped from the left at
 * the handle. The control is a native range input over the whole picture, so
 * drag, click and arrow keys work without custom code; it is invisible, and
 * the handle shows its focus. Pictures are `aria-hidden`.
 *
 * It also demonstrates itself once, the first time it scrolls into view: the
 * handle sweeps toward "after" and back, then a hand icon nudges twice near
 * it and fades — both skipped outright by `prefers-reduced-motion`, and both
 * cancelled the moment a visitor actually touches the control (never fights
 * a real drag). Spec: docs/design-system/tokens.md "Motion" — "compare-slider
 * auto-demo" and "drag-hint".
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
  const [showHint, setShowHint] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchedRef = useRef(false);
  const chip = "absolute bottom-3 z-10 rounded-tag border bg-surface px-1.5 py-px font-mono text-label uppercase";

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || touchedRef.current) return;
        observer.disconnect();
        runDemo(touchedRef, setPos, () => {
          if (!touchedRef.current) setShowHint(true);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative grid" style={{ "--pos": `${pos}%` } as CSSProperties}>
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
        onChange={(e) => {
          touchedRef.current = true;
          setShowHint(false);
          setPos(Number(e.target.value));
        }}
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
      {showHint && (
        <span
          aria-hidden="true"
          className="cd-hand-hint pointer-events-none absolute top-[calc(50%+38px)] left-(--pos) flex size-9 items-center justify-center rounded-ui border border-blueprint bg-surface text-blueprint"
        >
          <Hand className="size-4" strokeWidth={1.5} />
        </span>
      )}
    </div>
  );
}

/**
 * The self-demo: 50 → 15 → 50, easing each leg, then `onSettled`. Bails at
 * the top of every frame if `touched` has gone true meanwhile — a real drag
 * always wins, never fights the animation for the handle.
 */
function runDemo(touched: { current: boolean }, setPos: (value: number) => void, onSettled: () => void) {
  const legs: [from: number, to: number, ms: number][] = [
    [50, 15, 700],
    [15, 15, 260],
    [15, 50, 700],
  ];
  let legIndex = 0;
  let legStart = performance.now();
  let frame = 0;

  const tick = (now: number) => {
    if (touched.current) return;
    const [from, to, ms] = legs[legIndex]!;
    const elapsed = Math.min(1, (now - legStart) / ms);
    const eased = 1 - (1 - elapsed) ** 3;
    setPos(from + (to - from) * eased);
    if (elapsed < 1) {
      frame = requestAnimationFrame(tick);
      return;
    }
    legIndex += 1;
    if (legIndex >= legs.length) {
      onSettled();
      return;
    }
    legStart = now;
    frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}
