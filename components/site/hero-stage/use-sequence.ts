import { useEffect, useState } from "react";

import { parse, type Scenario } from "./scenario";

export { parse, type Result, type Scenario, type Segment } from "./scenario";

/** In order: the e-mail types itself, words are marked, fly onto paper, the pen draws, the web part builds on the intranet page, fills itself, is sent. */
export const PHASES = ["type", "mark", "fly", "draw", "build", "fill", "point", "press", "send", "done", "out"] as const;
export type Phase = (typeof PHASES)[number];

export type State = {
  index: number;
  phase: Phase;
  /** Characters of the request shown. */
  typed: number;
  /** Key words underlined. */
  marked: number;
  /** The field being filled; below it are full, above it empty. `fields` = all full. */
  field: number;
  /** Characters of the active field's value shown. */
  chars: number;
};

export const TYPE_MS = 30;
export const FLY_MS = 800;
export const SEND_MS = 900;

/** The server's frame: the first request, fully typed. */
export const INITIAL: State = { index: 0, phase: "type", typed: Number.POSITIVE_INFINITY, marked: 0, field: -1, chars: 0 };

export const reached = (phase: Phase, step: Phase) => PHASES.indexOf(phase) >= PHASES.indexOf(step);

/**
 * One tick of the machine: how long to hold `s`, and what comes after.
 * Reduced motion skips typing, drawing and flying: three still frames
 * (e-mail · sketch and filled web part · sent), switched slowly.
 */
export function advance(s: State, scenarios: Scenario[], reduced: boolean): [ms: number, next: State] {
  const scenario = scenarios[s.index];
  const segments = parse(scenario.request);
  const words = segments.filter((x) => x.key !== null).length;
  const fields = words - 1;
  const length = segments.reduce((n, x) => n + x.text.length, 0);
  const to = (ms: number, patch: Partial<State>): [number, State] => [ms, { ...s, ...patch }];

  if (reduced) {
    if (s.phase === "type" || s.phase === "mark") return to(2600, { phase: "fill", marked: words, field: fields });
    if (s.phase === "out") return next(s, scenarios, reduced);
    if (s.phase === "done") return to(3500, { phase: "out" });
    return to(3500, { phase: "done", field: fields });
  }

  switch (s.phase) {
    case "type":
      return s.typed < length ? to(TYPE_MS, { typed: s.typed + 1 }) : to(500, { phase: "mark" });
    case "mark":
      return s.marked < words ? to(260, { marked: s.marked + 1 }) : to(450, { phase: "fly" });
    case "fly":
      return to(FLY_MS, { phase: "draw" });
    case "draw":
      // The pen: one row per field, then the button and the margin note (see sketch.tsx).
      return to(220 * (fields + 2) + 700, { phase: "build" });
    case "build":
      return to(1500, { phase: "fill", field: 0, chars: 0 });
    case "fill":
      if (s.chars < scenario.values[s.field].length) return to(TYPE_MS * 1.5, { chars: s.chars + 1 });
      if (s.field < fields - 1) return to(350, { field: s.field + 1, chars: 0 });
      return to(400, { phase: "point", field: fields });
    case "point":
      return to(700, { phase: "press" });
    case "press":
      return to(180, { phase: "send" });
    case "send":
      return to(SEND_MS, { phase: "done" });
    case "done":
      return to(3000, { phase: "out" });
    case "out":
      return next(s, scenarios, reduced);
  }
}

function next(s: State, scenarios: Scenario[], reduced: boolean): [number, State] {
  const index = (s.index + 1) % scenarios.length;
  const words = parse(scenarios[index].request).filter((x) => x.key !== null).length;
  return [
    450,
    reduced
      ? { index, phase: "type", typed: Number.POSITIVE_INFINITY, marked: words, field: -1, chars: 0 }
      : { index, phase: "type", typed: 0, marked: 0, field: -1, chars: 0 },
  ];
}

/** Runs `advance` on a timer while `running`; holds still otherwise. */
export function useSequence(scenarios: Scenario[], reduced: boolean, running: boolean) {
  const [state, setState] = useState(INITIAL);
  useEffect(() => {
    if (!running) return;
    const [ms, after] = advance(state, scenarios, reduced);
    const timer = window.setTimeout(() => setState(after), ms);
    return () => window.clearTimeout(timer);
  }, [state, scenarios, reduced, running]);
  return state;
}
