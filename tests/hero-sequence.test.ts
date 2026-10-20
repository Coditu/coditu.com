import { describe, expect, it } from "vitest";

import { advance, INITIAL, type Phase, type State } from "@/components/site/hero-stage/use-sequence";
import de from "@/messages/de";
import en from "@/messages/en";

/** Run the machine until it leaves scenario 0; collect the phases and the last state of each. */
function play(reduced: boolean) {
  const scenarios = de.hero.request.scenarios;
  const seen: Phase[] = [];
  const last = new Map<Phase, State>();
  let s = INITIAL;
  for (let i = 0; i < 5000 && s.index === 0; i++) {
    if (seen.at(-1) !== s.phase) seen.push(s.phase);
    last.set(s.phase, s);
    s = advance(s, scenarios, reduced)[1];
  }
  return { seen, last, after: s };
}

describe("hero sequence", () => {
  it("plays e-mail → sketch → app → sent, then the next scenario from an empty e-mail", () => {
    const { seen, last, after } = play(false);
    expect(seen).toEqual(["type", "mark", "fly", "draw", "build", "fill", "point", "press", "send", "done", "out"]);
    // Every field was filled to its full value before sending.
    const fill = last.get("fill")!;
    expect(fill.field).toBe(de.hero.request.scenarios[0].values.length - 1);
    expect(fill.chars).toBe(de.hero.request.scenarios[0].values.at(-1)!.length);
    expect(after).toMatchObject({ index: 1, phase: "type", typed: 0, marked: 0, field: -1 });
  });

  it("reduced motion: three still frames, nothing typed", () => {
    const { seen, after } = play(true);
    expect(seen).toEqual(["type", "fill", "done", "out"]);
    expect(after.typed).toBe(Number.POSITIVE_INFINITY);
  });

  it("every scenario has one value per field, in both languages", () => {
    for (const scenario of [...de.hero.request.scenarios, ...en.hero.request.scenarios]) {
      const words = scenario.request.match(/\[[^\]]+\]/g) ?? [];
      expect(scenario.values).toHaveLength(words.length - 1);
    }
  });
});
