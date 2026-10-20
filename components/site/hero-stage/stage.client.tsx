"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { IntranetFrame } from "./intranet-frame";
import { Sketch } from "./sketch";
import { FLY_MS, parse, reached, useSequence, type Scenario } from "./use-sequence";
import { Calendar } from "./web-parts/calendar";
import { Checklist } from "./web-parts/checklist";
import { Caret, WebPartForm } from "./web-parts/form";
import { News } from "./web-parts/news";

type Labels = {
  request: string;
  example: string;
  live: string;
  summary: string;
  becomes: string;
  intranet: string;
  page: string;
  sending: string;
  note: string[];
  done: string;
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const media = matchMedia(REDUCED);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

type Clone = { text: string; left: number; top: number; height: number; dx: number; dy: number; scale: number };

/**
 * The hero's picture, playing by itself: a request by e-mail types itself out
 * and its key words are underlined; they fly onto a sheet of paper where a pen
 * sketches the form; a web part builds on an intranet page beside it, fills
 * itself in while the sketch mirrors every value, and is sent: the item lands
 * in the web part as real content. Then the next scenario.
 *
 * From lg the paper and the intranet page sit side by side; below lg they are
 * one card, the sketch crossfading into the web part. Runs only while on screen and the tab
 * is visible. Decoration: `aria-hidden`, one sr-only sentence says what it
 * shows. Reduced motion: three still frames, switched slowly. The server
 * renders the first request fully typed, so there is no flash.
 */
export function HeroStage({ scenarios, labels }: { scenarios: Scenario[]; labels: Labels }) {
  const [running, setRunning] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => matchMedia(REDUCED).matches, () => false);
  const s = useSequence(scenarios, reduced, running);
  const [clones, setClones] = useState<Clone[]>([]);

  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sources = useRef<(HTMLSpanElement | null)[]>([]);
  const targets = useRef<(SVGTextElement | null)[]>([]);
  const cloneEls = useRef<(HTMLSpanElement | null)[]>([]);
  const button = useRef<HTMLSpanElement>(null);
  const pointer = useRef<HTMLDivElement>(null);

  const scenario = scenarios[s.index];
  const segments = parse(scenario.request);
  const words = segments.filter((x) => x.key !== null).map((x) => x.text);
  const fields = words.slice(1);
  const length = segments.reduce((n, x) => n + x.text.length, 0);
  const values = fields.map((_, i) =>
    i < s.field ? scenario.values[i] : i === s.field ? scenario.values[i].slice(0, s.chars) : ""
  );

  const { phase } = s;
  const email = phase === "type" || phase === "mark";
  const sketching = phase === "fly" || phase === "draw";
  const built = reached(phase, "build");
  const done = reached(phase, "done");
  const filling = phase === "fill" && !reduced;

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

  // Entering "fly": measure each underlined word and its place on paper.
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
            scale: to.height / from.height,
          },
        ];
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, s.index]);

  // Fly the clones.
  useLayoutEffect(() => {
    clones.forEach((clone, i) => {
      cloneEls.current[i]?.animate(
        // The word fades as it lands: the handwritten one takes its place.
        [
          { transform: "none", opacity: 1 },
          { opacity: 1, offset: 0.65 },
          { transform: `translate(${clone.dx}px, ${clone.dy}px) scale(${clone.scale})`, opacity: 0 },
        ],
        { duration: FLY_MS - 150, delay: i * 60, easing: EASE, fill: "forwards" }
      );
    });
  }, [clones]);

  // Entering "point": the pointer glides onto the button.
  useLayoutEffect(() => {
    if (phase !== "point" || !stage.current || !button.current || !pointer.current) return;
    const box = stage.current.getBoundingClientRect();
    const b = button.current.getBoundingClientRect();
    const x = b.left - box.left + b.width / 2;
    const y = b.top - box.top + b.height / 2;
    pointer.current.animate(
      [{ transform: `translate(${x + 90}px, ${y + 70}px)` }, { transform: `translate(${x}px, ${y}px)` }],
      { duration: 600, easing: EASE, fill: "forwards" }
    );
  }, [phase]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="sr-only">{labels.summary}</p>
      <div ref={root} aria-hidden="true">
        <div className="flex justify-end">
          <span className="rounded-tag border border-dashed border-ink px-1.5 py-0.5 font-mono text-[11px] text-ink uppercase">
            {labels.example}
          </span>
        </div>

        <div
          ref={stage}
          className={cn("relative mt-3 h-[440px] transition-opacity duration-300 lg:h-[460px]", phase === "out" && "opacity-0")}
        >
          {/* 1 · The request */}
          <div
            className={cn(
              "absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-ui border border-ink bg-surface p-6 shadow-lift transition-opacity duration-300 sm:p-8",
              !email && "opacity-0"
            )}
          >
            <p className="font-mono text-label text-ink-muted uppercase">{labels.request}</p>
            <p className="mt-4 text-[19px] leading-relaxed sm:text-[21px]">
              {segments.map((segment, si) => {
                const { start, key } = segment;
                const end = start + segment.text.length;
                const shown = segment.text.slice(0, Math.max(0, s.typed - start));
                const hidden = segment.text.slice(shown.length);
                const caret = phase === "type" && s.typed >= start && s.typed < end && !reduced;
                return (
                  <span
                    key={si}
                    ref={
                      key === null
                        ? undefined
                        : (el) => {
                            sources.current[key] = el;
                          }
                    }
                    className={cn(
                      key !== null && "decoration-blueprint decoration-2 underline-offset-4 transition-colors duration-200",
                      key !== null && key < s.marked && "text-blueprint underline",
                      key !== null && phase === "fly" && "opacity-0"
                    )}
                  >
                    {shown}
                    {caret && <Caret />}
                    <span className="invisible">{hidden}</span>
                  </span>
                );
              })}
              {phase === "type" && s.typed >= length && !reduced && <Caret />}
            </p>
          </div>

          <div className="absolute inset-0 grid grid-rows-[minmax(0,1fr)] gap-2 lg:grid-cols-[minmax(0,2fr)_48px_minmax(0,3fr)]">
            {/* 2 · The sketch */}
            <div
              data-draw={reached(phase, "draw") || undefined}
              className={cn(
                "col-start-1 row-start-1 flex min-h-0 items-center justify-center py-2 transition-opacity duration-500",
                sketching ? "opacity-100" : "opacity-0",
                reached(phase, "fly") ? "lg:opacity-100" : "lg:opacity-0"
              )}
            >
              <Sketch
                key={s.index}
                title={words[0]}
                labels={fields}
                values={values}
                button={scenario.button}
                active={filling ? s.field : -1}
                note={labels.note}
                done={done}
                doneWord={labels.done}
                showWords={reached(phase, "draw")}
                targets={(el, i) => {
                  targets.current[i] = el;
                }}
              />
            </div>

            {/* „wird zu →“ */}
            <div
              data-draw={built || undefined}
              className={cn("col-start-2 row-start-1 hidden flex-col items-center justify-center gap-1 text-blueprint lg:flex", !built && "opacity-0")}
            >
              <span className="cd-hand cd-write text-[20px] leading-none" style={{ "--row": 1 } as CSSProperties}>
                {labels.becomes}
              </span>
              <svg viewBox="0 0 56 32" className="w-12" focusable="false">
                <path d="M3 20 C16 6 34 8 50 18" pathLength={1} className="cd-pen" />
                <path d="M40 10 L51 18 L39 25" pathLength={1} className="cd-pen" style={{ "--row": 1 } as CSSProperties} />
              </svg>
            </div>

            {/* 3 · The web part on its intranet page */}
            <div
              className={cn(
                "col-start-1 row-start-1 min-h-0 py-2 transition-opacity duration-500 lg:col-start-3",
                !built && "opacity-0"
              )}
            >
              {built && (
                <IntranetFrame intranet={labels.intranet} page={labels.page} title={words[0]} live={done ? labels.live : null}>
                  {!done ? (
                    <WebPartForm
                      labels={fields}
                      values={values}
                      active={filling ? s.field : -1}
                      caret={filling}
                      button={scenario.button}
                      pressed={phase === "press"}
                      sending={phase === "send"}
                      sendingLabel={labels.sending}
                      buttonRef={button}
                    />
                  ) : scenario.result.kind === "checklist" ? (
                    <Checklist {...scenario.result} labels={fields} values={scenario.values} />
                  ) : scenario.result.kind === "calendar" ? (
                    <Calendar {...scenario.result} values={scenario.values} />
                  ) : (
                    <News {...scenario.result} values={scenario.values} />
                  )}
                </IntranetFrame>
              )}
            </div>
          </div>

          {/* The flying words */}
          {phase === "fly" &&
            clones.map((clone, i) => (
            <span
              key={`${s.index}-${i}`}
              ref={(el) => {
                cloneEls.current[i] = el;
              }}
              className="pointer-events-none absolute origin-top-left text-[19px] whitespace-nowrap text-blueprint sm:text-[21px]"
              style={{ left: clone.left, top: clone.top, height: clone.height, lineHeight: `${clone.height}px` }}
            >
              {clone.text}
            </span>
          ))}

          {/* The pointer that sends the form */}
          {(phase === "point" || phase === "press" || phase === "send") && !reduced && (
            <div ref={pointer} className="pointer-events-none absolute top-0 left-0">
              <svg
                viewBox="0 0 16 22"
                className={cn("block w-4 origin-top-left text-ink transition-transform duration-150", phase === "press" && "scale-90")}
                focusable="false"
              >
                <path d="M1 1v17l4.5-4.2 3 6.7 2.8-1.3-3-6.6H14z" fill="currentColor" stroke="var(--surface)" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
