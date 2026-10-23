"use client";

import { Inbox } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

import { Window } from "@/components/site/window";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages/de";

import { AppWindow } from "./app-window";
import { FLY_MS, parse, reached, useSequence } from "./use-sequence";

type Labels = Messages["hero"]["request"];

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const BODY = "text-[15px] leading-relaxed";

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const media = matchMedia(REDUCED);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

type Clone = { text: string; left: number; top: number; height: number; dx: number; dy: number; scale: number };

/**
 * The hero's picture, playing by itself: a request is open in a mail app; its
 * key words light up one by one, lift out of the mail and fly into a booking
 * app that builds around them — each word lands in the part it asked for.
 * The app holds, then the mail again. ~9 s per loop.
 *
 * Runs only while on screen and the tab is visible. Decoration: `aria-hidden`,
 * one sr-only sentence says what it shows. Reduced motion: two still frames
 * (mail · app), switched slowly. The server renders the open mail, so there
 * is no flash. Narrow vs wide is a container query on the stage (26rem).
 */
export function HeroStage({ labels }: { labels: Labels }) {
  const { mail, app } = labels;
  const segments = parse(mail.body);
  const words = segments.filter((x) => x.key !== null).map((x) => x.text);

  const [running, setRunning] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => matchMedia(REDUCED).matches, () => false);
  const { phase, marked } = useSequence(words.length, reduced, running);
  const [clones, setClones] = useState<Clone[]>([]);

  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sources = useRef<(HTMLSpanElement | null)[]>([]);
  const targets = useRef<(HTMLSpanElement | null)[]>([]);
  const cloneEls = useRef<(HTMLSpanElement | null)[]>([]);

  const onMail = !reached(phase, "fly");

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

  // Entering "fly": measure each lit word and its place in the app (laid out, still transparent).
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

  // The mail shrinks a little as it goes; the app only fades, so the places measured in it hold still.
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
          {/* 1 · The mail */}
          <div data-part="mail" className={cn(layer, !onMail && "scale-[0.98] opacity-0")}>
            <Window
              className="h-full"
              bar={
                <>
                  <Inbox className="size-4 text-blueprint" strokeWidth={1.5} />
                  <span className="text-[14px] font-semibold">{mail.inbox}</span>
                </>
              }
            >
              <div className="flex min-h-0 flex-1">
                <div className="hidden w-[38%] flex-none flex-col border-r border-line @min-[26rem]:flex">
                  {[{ from: mail.from, subject: mail.subject, time: mail.time }, ...mail.others].map((item, i) => (
                    <div key={item.from} className={cn("border-b border-line px-3 py-2.5", i === 0 && "bg-blueprint-light")}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={cn("truncate text-[13px]", i === 0 ? "font-semibold text-ink" : "text-ink-muted")}>{item.from}</span>
                        <span className="flex-none font-mono text-label text-ink-muted uppercase">{item.time}</span>
                      </div>
                      <p className="mt-0.5 truncate text-[12px] text-ink-muted">{item.subject}</p>
                    </div>
                  ))}
                </div>

                <div className="min-w-0 flex-1 p-4 @min-[26rem]:p-5">
                  <p className="text-[17px] leading-snug font-semibold">{mail.subject}</p>
                  <div className="mt-3 flex items-center gap-2.5">
                    <span className="flex size-8 flex-none items-center justify-center rounded-full bg-blueprint text-[12px] font-semibold text-blueprint-ink">
                      {mail.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold">{mail.from}</span>
                      <span className="block truncate text-[12px] text-ink-muted">{mail.to}</span>
                    </span>
                    <span className="flex-none font-mono text-label text-ink-muted uppercase">{mail.time}</span>
                  </div>
                  <p className={cn("mt-4", BODY)}>
                    {segments.map(({ text, key }, i) =>
                      key === null ? (
                        text
                      ) : (
                        <span
                          key={i}
                          ref={(el) => {
                            sources.current[key] = el;
                          }}
                          className={cn(
                            "rounded-tag decoration-blueprint decoration-2 underline-offset-4 transition-colors duration-200",
                            (reduced || key < marked) && "bg-blueprint-light text-blueprint underline",
                            phase === "fly" && "invisible"
                          )}
                        >
                          {text}
                        </span>
                      )
                    )}
                  </p>
                  <p className={cn("mt-3", BODY)}>{mail.signoff}</p>
                </div>
              </div>
            </Window>
          </div>

          {/* 2 · The app it becomes */}
          <div data-part="app" className={cn(layer, onMail && "opacity-0")}>
            <AppWindow
              app={app}
              initials={mail.initials}
              words={words}
              step={phase === "done" ? "done" : phase === "build" ? "build" : "slots"}
              targetRef={(i, el) => {
                targets.current[i] = el;
              }}
            />
          </div>

          {/* The flying words */}
          {phase === "fly" &&
            clones.map((clone, i) => (
              <span
                key={i}
                ref={(el) => {
                  cloneEls.current[i] = el;
                }}
                className={cn(
                  "pointer-events-none absolute origin-top-left rounded-tag bg-blueprint-light whitespace-nowrap text-blueprint",
                  BODY
                )}
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
