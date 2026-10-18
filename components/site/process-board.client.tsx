"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Tag } from "@/components/ui/tag";
import type { Messages } from "@/messages/de";
import { cn } from "@/lib/utils";

type Column = Messages["processSection"]["board"]["columns"][number];

/** Column order is fixed in messages: Skizze, In Arbeit, Review, Live. */
const ACTIVE = 1;
const DONE = 3;

/**
 * The board, stage by stage: per column, the cards it holds, as
 * [column, index] into the messages. Stage 0 is the board as written.
 * 1: "Onboarding" goes to Review, the first review card goes live, the
 *    old live card leaves. 2: "Onboarding" goes live, the next sketch is
 *    picked up. No column ever holds more than two, so the sheet keeps its
 *    height on desktop.
 */
const STAGES: [number, number][][][] = [
  [[[0, 0], [0, 1]], [[1, 0]], [[2, 0], [2, 1]], [[3, 0]]],
  [[[0, 0], [0, 1]], [], [[2, 1], [1, 0]], [[2, 0]]],
  [[[0, 0]], [[0, 1]], [[2, 1]], [[2, 0], [1, 0]]],
];
/** When each stage starts, and how long cards take to fade out before it. */
const AT = [0, 1000, 2600];
const FADE_MS = 200;

/** Where each card sits in a stage: "c-i" → column. */
const placement = (stage: number) =>
  new Map<string, number>(STAGES[stage].flatMap((cards, col) => cards.map(([c, i]) => [`${c}-${i}`, col])));

/**
 * The example board in "How we work". When it comes into view, the active
 * card moves to Review, then Live, once — under five seconds, so it needs no
 * pause control (WCAG 2.2.2). Reduced motion: the board stays as written.
 * Spec: kanban.md.
 */
export function ProcessBoard({ columns }: { columns: readonly Column[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const board = ref.current;
    if (!board || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        AT.slice(1).forEach((at, i) => {
          timers.push(window.setTimeout(() => setLeaving(true), at - FADE_MS));
          timers.push(
            window.setTimeout(() => {
              setStage(i + 1);
              setLeaving(false);
            }, at)
          );
        });
      },
      // Starts once the board's top passes mid-screen; on a phone the board is
      // taller than the screen, so a visibility ratio might never be reached.
      { rootMargin: "0px 0px -50% 0px" }
    );
    observer.observe(board);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const before = stage > 0 ? placement(stage - 1) : null;
  const next = stage + 1 < STAGES.length ? placement(stage + 1) : null;

  return (
    <div ref={ref} className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((column, ci) => {
        const cards = STAGES[stage][ci];
        return (
          <section
            key={column.name}
            aria-labelledby={`process-col-${ci}`}
            className="flex flex-col gap-2.5 border border-line bg-paper p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 id={`process-col-${ci}`} className="flex items-center gap-2 text-[14px] font-bold">
                {ci === ACTIVE && <span aria-hidden="true" className="size-[7px] rounded-full bg-blueprint" />}
                {column.name}
              </h3>
              <span className="font-mono text-label text-ink-muted">{String(cards.length).padStart(2, "0")}</span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {cards.map(([c, i]) => {
                const key = `${c}-${i}`;
                const task = columns[c].tasks[i];
                return (
                  <li
                    key={key}
                    // A card that just changed column fades in; one about to leave fades out.
                    data-reveal={before && before.get(key) !== ci ? "micro" : undefined}
                    className={cn(
                      "flex flex-col gap-3 rounded-ui border bg-surface p-3.5 transition-opacity duration-200",
                      ci === ACTIVE ? "border-blueprint" : "border-line",
                      leaving && next?.get(key) !== ci && "opacity-0"
                    )}
                  >
                    <span className="text-[14px] leading-snug font-semibold">
                      {ci === DONE && (
                        <Check aria-hidden="true" className="mr-2 inline size-4 text-success" strokeWidth={2} />
                      )}
                      {task.title}
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <Tag>{task.tag}</Tag>
                      <Avatar size="sm" name={task.who} initials={initials(task.who)} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/** "Mohamed Tamer" → "MT" */
function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}
