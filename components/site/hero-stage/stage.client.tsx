"use client";

import { Blocks, CalendarDays, Check, FileText, FolderOpen, LayoutDashboard, ListChecks, Lock, Users } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

import { Window } from "@/components/site/window";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages/de";

import { AppWindow } from "./app-window";
import { FLY_MS, reached, useSequence } from "./use-sequence";

type Labels = Messages["hero"]["request"];

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const media = matchMedia(REDUCED);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

type Clone = { text: string; left: number; top: number; height: number; dx: number; dy: number; scale: number };

/**
 * The four blocks that fly, in the fixed order `picker.blocks` and the app's
 * four word-slots both agree on — page title, bookings table, calendar card,
 * sign-in (app-window.tsx). Positional, same risk class flagged in
 * security.tsx/baukasten.tsx: if `picker.blocks` in messages/*.ts ever gains,
 * loses or reorders an entry, update this list in the same change.
 */
const BLOCK_ICONS = [LayoutDashboard, ListChecks, CalendarDays, Lock];
/** Icons for `picker.more` — decorative catalogue texture, never picked. */
const MORE_ICONS = [FileText, Users, FolderOpen];

/**
 * The hero's picture, playing by itself: a catalogue of building blocks is
 * open; four of them get picked one by one, lift out of the catalogue and
 * fly into a booking app that builds around them — each block lands in the
 * part it stands for. The app holds, then the catalogue again. ~9 s per loop.
 *
 * Runs only while on screen and the tab is visible. Decoration: `aria-hidden`,
 * one sr-only sentence says what it shows. Reduced motion: two still frames
 * (blocks, all picked · app), switched slowly. The server renders the open
 * catalogue, so there is no flash. Narrow vs wide is a container query on the
 * stage (26rem).
 */
export function HeroStage({ labels }: { labels: Labels }) {
  const { picker, app } = labels;
  const words = picker.blocks;

  if (process.env.NODE_ENV !== "production" && words.length !== BLOCK_ICONS.length) {
    throw new Error(`HeroStage: picker.blocks has ${words.length} entries but BLOCK_ICONS has ${BLOCK_ICONS.length} — keep them in sync.`);
  }

  const [running, setRunning] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => matchMedia(REDUCED).matches, () => false);
  const { phase, marked } = useSequence(words.length, reduced, running);
  const [clones, setClones] = useState<Clone[]>([]);

  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sources = useRef<(HTMLSpanElement | null)[]>([]);
  const targets = useRef<(HTMLSpanElement | null)[]>([]);
  const cloneEls = useRef<(HTMLSpanElement | null)[]>([]);

  const onPick = !reached(phase, "fly");

  // Run only while the stage is on screen and the tab is visible.
  useEffect(() => {
    let onScreen = false;
    const update = () => setRunning(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Entering "fly": measure each picked block and its place in the app (laid out, still transparent).
  useLayoutEffect(() => {
    if (phase !== "fly" || !stage.current) return;
    const box = stage.current.getBoundingClientRect();
    setClones(
      words.flatMap((text, i) => {
        const from = sources.current[i]?.getBoundingClientRect();
        const to = targets.current[i]?.getBoundingClientRect();
        if (!from || !to) return [];
        return [
          {
            text,
            left: from.left - box.left,
            top: from.top - box.top,
            height: from.height,
            dx: to.left - from.left,
            dy: to.top - from.top,
            scale: parseFloat(getComputedStyle(targets.current[i]!).fontSize) / parseFloat(getComputedStyle(sources.current[i]!).fontSize),
          },
        ];
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Fly the clones: the move eases in the first 75 %, then each fades where it landed and the word in the app takes its place.
  useLayoutEffect(() => {
    clones.forEach((clone, i) => {
      const end = `translate(${clone.dx}px, ${clone.dy}px) scale(${clone.scale})`;
      cloneEls.current[i]?.animate(
        [{ transform: "none", opacity: 1, easing: EASE }, { transform: end, opacity: 1, offset: 0.75 }, { transform: end, opacity: 0 }],
        { duration: FLY_MS - 80 * clones.length, delay: i * 80, fill: "forwards" }
      );
    });
  }, [clones]);

  // The catalogue shrinks a little as it goes; the app only fades, so the places measured in it hold still.
  const layer = "absolute inset-0 transition-[opacity,scale] duration-500 ease-entrance";

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="sr-only">{labels.summary}</p>
      <div ref={root} aria-hidden="true" data-hero-stage="">
        <div className="flex justify-end">
          <span className="rounded-tag border border-dashed border-ink px-1.5 py-0.5 font-mono text-[11px] text-ink uppercase">
            {labels.example}
          </span>
        </div>

        <div ref={stage} className="@container relative mt-3 h-[440px] lg:h-[460px]">
          {/* 1 · The block catalogue */}
          <div data-part="picker" className={cn(layer, !onPick && "scale-[0.98] opacity-0")}>
            <Window
              className="h-full"
              bar={
                <>
                  <Blocks className="size-4 text-blueprint" strokeWidth={1.5} />
                  <span className="text-[14px] font-semibold">{picker.title}</span>
                </>
              }
            >
              <div className="flex min-h-0 flex-1 flex-col p-4 @min-[26rem]:p-5">
                <p className="font-mono text-label text-ink-muted uppercase">{picker.hint}</p>
                <div className="mt-3 grid grid-cols-2 gap-2.5 @min-[26rem]:grid-cols-3">
                  {words.map((label, i) => {
                    const Icon = BLOCK_ICONS[i]!;
                    const picked = reduced || i < marked;
                    return (
                      <div
                        key={label}
                        data-picked={picked}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-ui border p-3 transition-colors duration-200",
                          picked ? "border-blueprint bg-blueprint-light" : "border-line-input"
                        )}
                      >
                        <span className="flex w-full items-center justify-between">
                          <Icon className={cn("size-4", picked ? "text-blueprint" : "text-ink-muted")} strokeWidth={1.5} />
                          <span
                            className={cn(
                              "flex size-4 items-center justify-center rounded-full border transition-colors duration-200",
                              picked ? "border-blueprint bg-blueprint text-blueprint-ink" : "border-line-input"
                            )}
                          >
                            {picked && <Check className="size-3" strokeWidth={2.5} />}
                          </span>
                        </span>
                        <span
                          ref={(el) => {
                            sources.current[i] = el;
                          }}
                          className={cn(
                            "text-[13px] leading-tight font-semibold",
                            picked ? "text-blueprint" : "text-ink",
                            phase === "fly" && "invisible"
                          )}
                        >
                          {label}
                        </span>
                      </div>
                    );
                  })}
                  {picker.more.map((label, i) => {
                    const Icon = MORE_ICONS[i];
                    return (
                      <div
                        key={label}
                        className="hidden flex-col items-start gap-2 rounded-ui border border-dashed border-line-input p-3 text-ink-muted @min-[30rem]:flex"
                      >
                        {Icon && <Icon className="size-4" strokeWidth={1.5} />}
                        <span className="text-[13px] leading-tight font-semibold">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Window>
          </div>

          {/* 2 · The app it becomes */}
          <div data-part="app" className={cn(layer, onPick && "opacity-0")}>
            <AppWindow
              app={app}
              initials={app.initials}
              words={words}
              step={phase === "done" ? "done" : phase === "build" ? "build" : "slots"}
              targetRef={(i, el) => {
                targets.current[i] = el;
              }}
            />
          </div>

          {/* The flying blocks */}
          {phase === "fly" &&
            clones.map((clone, i) => (
              <span
                key={i}
                ref={(el) => {
                  cloneEls.current[i] = el;
                }}
                className="pointer-events-none absolute origin-top-left rounded-tag bg-blueprint-light px-1 text-[13px] leading-tight font-semibold whitespace-nowrap text-blueprint"
                style={{ left: clone.left, top: clone.top, height: clone.height, lineHeight: `${clone.height}px` }}
              >
                {clone.text}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
