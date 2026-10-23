import { useEffect, useState } from "react";

export type Segment = { text: string; key: number | null };

/** "a [b] c" → [{a}, {b, key 0}, {c}] */
export function parse(body: string): Segment[] {
  let key = 0;
  return body
    .split(/(\[[^\]]+\])/)
    .filter(Boolean)
    .map((part) => (part.startsWith("[") ? { text: part.slice(1, -1), key: key++ } : { text: part, key: null }));
}

/** In order: the mail is open, its key words light up, fly into the app, the app builds, holds. Then the mail again. */
export const PHASES = ["mail", "mark", "fly", "build", "done"] as const;
export type Phase = (typeof PHASES)[number];

export type State = { phase: Phase; /** Key words lit. */ marked: number };

export const FLY_MS = 1100;

/** The server's frame: the mail, open, nothing lit yet. */
export const INITIAL: State = { phase: "mail", marked: 0 };

export const reached = (phase: Phase, step: Phase) => PHASES.indexOf(phase) >= PHASES.indexOf(step);

/**
 * One tick: how long to hold `s`, and what comes after. ~9 s per loop.
 * Reduced motion: two still frames, the mail (words lit) and the app, switched slowly.
 */
export function advance(s: State, words: number, reduced: boolean): [ms: number, next: State] {
  if (reduced) return s.phase === "mail" ? [3500, { phase: "done", marked: words }] : [4500, { phase: "mail", marked: words }];

  switch (s.phase) {
    case "mail":
      return [1200, { phase: "mark", marked: 0 }];
    case "mark":
      return s.marked < words ? [300, { phase: "mark", marked: s.marked + 1 }] : [400, { phase: "fly", marked: words }];
    case "fly":
      return [FLY_MS, { phase: "build", marked: words }];
    case "build":
      return [1400, { phase: "done", marked: words }];
    case "done":
      return [3200, INITIAL];
  }
}

/** Runs `advance` on a timer while `running`; holds still otherwise. */
export function useSequence(words: number, reduced: boolean, running: boolean) {
  const [state, setState] = useState(INITIAL);
  useEffect(() => {
    if (!running) return;
    const [ms, after] = advance(state, words, reduced);
    const timer = window.setTimeout(() => setState(after), ms);
    return () => window.clearTimeout(timer);
  }, [state, words, reduced, running]);
  return state;
}
