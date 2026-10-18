"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type Scenario = {
  /** The client's request. `[Words]` in brackets turn into the app: the first is its title, the rest its fields. */
  request: string;
  /** One example value per field, in order. */
  values: string[];
  button: string;
};

type Labels = { request: string; example: string; live: string; summary: string };

type Phase = "typing" | "mark" | "morph" | "app" | "out";

const TYPE_MS = 30;
const MARK_MS = 260;
const MORPH_MS = 750;
const APP_MS = 3600;
const OUT_MS = 450;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type Segment = { text: string; key: number | null };

/** "a [b] c" → [{a}, {b, key 0}, {c}] */
function parse(request: string): Segment[] {
  const out: Segment[] = [];
  let key = 0;
  for (const part of request.split(/(\[[^\]]+\])/)) {
    if (!part) continue;
    if (part.startsWith("[")) out.push({ text: part.slice(1, -1), key: key++ });
    else out.push({ text: part, key: null });
  }
  return out;
}

type Clone = { text: string; left: number; top: number; height: number; dx: number; dy: number; scale: number; strong: boolean };

/**
 * The hero's picture: a client's request types itself out, its key words are
 * underlined, then fly into place and the card becomes the app they describe.
 * Loops through the scenarios while on screen. Decoration: hidden from screen
 * readers (one sentence says what it shows). Reduced motion: no typing or
 * flying, the card just switches between request and app, slower.
 * The server renders the first request fully typed, so there is no flash.
 */
export function RequestToApp({ scenarios, labels }: { scenarios: Scenario[]; labels: Labels }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(Number.POSITIVE_INFINITY);
  const [marked, setMarked] = useState(0);
  const [clones, setClones] = useState<Clone[]>([]);
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);

  const card = useRef<HTMLDivElement>(null);
  const sources = useRef<(HTMLSpanElement | null)[]>([]);
  const targets = useRef<(HTMLElement | null)[]>([]);
  const cloneEls = useRef<(HTMLSpanElement | null)[]>([]);

  const scenario = scenarios[index];
  const segments = parse(scenario.request);
  const words = segments.filter((s) => s.key !== null);
  const length = segments.reduce((n, s) => n + s.text.length, 0);

  // Run only while the card is on screen and the tab is visible.
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onMedia = () => setReduced(media.matches);
    media.addEventListener("change", onMedia);

    let onScreen = false;
    const update = () => setRunning(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    if (card.current) observer.observe(card.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      media.removeEventListener("change", onMedia);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // The phase machine.
  useEffect(() => {
    if (!running) return;
    let timer: number;
    const next = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms);
    };

    if (phase === "typing") {
      if (reduced || typed >= length) next(() => setPhase("mark"), reduced ? 1800 : 500);
      else next(() => setTyped((n) => n + 1), TYPE_MS);
    } else if (phase === "mark") {
      if (reduced || marked >= words.length) next(() => setPhase("morph"), reduced ? 0 : 450);
      else next(() => setMarked((n) => n + 1), MARK_MS);
    } else if (phase === "morph") {
      if (reduced) setPhase("app");
      else next(() => setPhase("app"), MORPH_MS);
    } else if (phase === "app") {
      next(() => setPhase("out"), reduced ? APP_MS + 1500 : APP_MS);
    } else if (phase === "out") {
      next(() => {
        setIndex((i) => (i + 1) % scenarios.length);
        setTyped(reduced ? Number.POSITIVE_INFINITY : 0);
        setMarked(0);
        setClones([]);
        setPhase("typing");
      }, OUT_MS);
    }
    return () => window.clearTimeout(timer);
  }, [running, phase, typed, marked, length, words.length, reduced, scenarios.length]);

  // Entering "morph": measure each underlined word and its place in the app.
  useLayoutEffect(() => {
    if (phase !== "morph" || reduced || !card.current) return;
    const box = card.current.getBoundingClientRect();
    setClones(
      words.map((word, i) => {
        const s = sources.current[i]!.getBoundingClientRect();
        const t = targets.current[i]!.getBoundingClientRect();
        return {
          text: word.text,
          left: s.left - box.left,
          top: s.top - box.top,
          height: s.height,
          dx: t.left - s.left,
          dy: t.top - s.top,
          scale: t.height / s.height,
          strong: i === 0,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduced, index]);

  // Fly the clones.
  useLayoutEffect(() => {
    clones.forEach((clone, i) => {
      cloneEls.current[i]?.animate(
        [{ transform: "none" }, { transform: `translate(${clone.dx}px, ${clone.dy}px) scale(${clone.scale})` }],
        { duration: MORPH_MS - 100, delay: i * 50, easing: EASE, fill: "forwards" }
      );
    });
  }, [clones]);

  const showApp = phase === "morph" || phase === "app";
  const appDone = phase === "app";
  const out = phase === "out";
  let count = 0;

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <p className="sr-only">{labels.summary}</p>
      <div
        ref={card}
        aria-hidden="true"
        className={cn(
          "relative grid rounded-ui border border-ink bg-surface p-6 shadow-lift transition-opacity duration-300 sm:p-8",
          out && "opacity-0"
        )}
      >
        <span className="absolute top-3 right-3 rounded-tag border border-dashed border-ink px-1.5 py-0.5 font-mono text-[11px] text-ink uppercase">
          {labels.example}
        </span>

        {/* The request */}
        <div className={cn("col-start-1 row-start-1 transition-opacity duration-300", showApp && "opacity-0")}>
          <p className="font-mono text-label text-ink-muted uppercase">{labels.request}</p>
          <p className="mt-4 text-[19px] leading-relaxed sm:text-[21px]">
            {segments.map((segment, si) => {
              const start = count;
              count += segment.text.length;
              const shown = segment.text.slice(0, Math.max(0, typed - start));
              const hidden = segment.text.slice(shown.length);
              const caret = phase === "typing" && typed >= start && typed < count && !reduced;
              if (segment.key === null)
                return (
                  <span key={si}>
                    {shown}
                    {caret && <Caret />}
                    <span className="invisible">{hidden}</span>
                  </span>
                );
              const key = segment.key;
              return (
                <span
                  key={si}
                  ref={(el) => {
                    sources.current[key] = el;
                  }}
                  className={cn(
                    "decoration-blueprint decoration-2 underline-offset-4 transition-colors duration-200",
                    key < marked && "text-blueprint underline",
                    clones.length > 0 && "opacity-0"
                  )}
                >
                  {shown}
                  {caret && <Caret />}
                  <span className="invisible">{hidden}</span>
                </span>
              );
            })}
            {phase === "typing" && typed >= length && !reduced && <Caret />}
          </p>
        </div>

        {/* The app */}
        <div className={cn("col-start-1 row-start-1 flex flex-col gap-4 transition-opacity duration-300", !showApp && "opacity-0")}>
          <div className="flex items-center justify-between gap-4 pr-16">
            <span
              ref={(el) => {
                targets.current[0] = el;
              }}
              className={cn("text-[18px] leading-tight font-semibold", !appDone && !reduced && "opacity-0")}
            >
              {words[0]?.text}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {words.slice(1).map((word, i) => (
              <div key={word.text} className={cn("flex flex-col gap-1.5", i === 0 && "sm:col-span-2")}>
                <span
                  ref={(el) => {
                    targets.current[i + 1] = el;
                  }}
                  className={cn("w-fit text-[13px] leading-tight font-semibold", !appDone && !reduced && "opacity-0")}
                >
                  {word.text}
                </span>
                <span className="flex h-10 items-center rounded-ui border border-line-input bg-surface px-3 text-[15px]">
                  <span
                    className={cn("truncate transition-opacity duration-300", !appDone && "opacity-0")}
                    style={{ transitionDelay: appDone ? `${150 + i * 120}ms` : "0ms" }}
                  >
                    {scenario.values[i]}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between gap-4">
            <span className="inline-flex h-10 items-center rounded-ui bg-blueprint px-4 text-[15px] font-semibold text-blueprint-ink">
              {scenario.button}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-blueprint bg-blueprint-light px-2.5 py-0.5 text-[12px] font-semibold text-blueprint transition-all duration-300",
                appDone ? "scale-100 opacity-100" : "scale-90 opacity-0"
              )}
              style={{ transitionDelay: appDone ? "550ms" : "0ms" }}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {labels.live}
            </span>
          </div>
        </div>

        {/* The flying words */}
        {clones.map((clone, i) => (
          <span
            key={`${index}-${i}`}
            ref={(el) => {
              cloneEls.current[i] = el;
            }}
            className={cn(
              "pointer-events-none absolute origin-top-left text-[19px] leading-relaxed whitespace-nowrap sm:text-[21px]",
              clone.strong ? "font-semibold text-ink" : "text-blueprint",
              appDone && "opacity-0"
            )}
            style={{ left: clone.left, top: clone.top, height: clone.height, lineHeight: `${clone.height}px` }}
          >
            {clone.text}
          </span>
        ))}
      </div>
    </div>
  );
}

function Caret() {
  return <span className="cd-caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-blueprint" />;
}
