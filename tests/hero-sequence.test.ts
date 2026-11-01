import { describe, expect, it } from "vitest";

import { advance, INITIAL, type Phase, type State } from "@/components/site/hero-stage/use-sequence";
import de from "@/messages/de";
import en from "@/messages/en";

const WORDS = 4;

/** Run the machine for one loop; collect the phases and the total time. */
function play(reduced: boolean) {
  const seen: Phase[] = [];
  let s: State = INITIAL;
  let ms = 0;
  do {
    if (seen.at(-1) !== s.phase) seen.push(s.phase);
    const [hold, next] = advance(s, WORDS, reduced);
    ms += hold;
    s = next;
  } while (s.phase !== "pick" && seen.length < 50);
  return { seen, ms, after: s };
}

describe("hero sequence", () => {
  it("plays blocks shown → picked → fly → app builds → holds, then the blocks again", () => {
    const { seen, ms, after } = play(false);
    expect(seen).toEqual(["pick", "mark", "fly", "build", "done"]);
    expect(after).toEqual(INITIAL);
    // Short: one loop in under 10 s.
    expect(ms).toBeLessThan(10_000);
  });

  it("picks every block before they fly", () => {
    let s: State = { phase: "mark", marked: 0 };
    while (s.phase === "mark") s = advance(s, WORDS, false)[1];
    expect(s).toEqual({ phase: "fly", marked: WORDS });
  });

  it("reduced motion: two still frames, the blocks already picked", () => {
    const { seen, after } = play(true);
    expect(seen).toEqual(["pick", "done"]);
    expect(after).toEqual({ phase: "pick", marked: WORDS });
  });

  it("the picker has exactly four blocks in both languages — the app has four places for them", () => {
    for (const t of [de, en]) {
      expect(t.hero.request.picker.blocks).toHaveLength(WORDS);
    }
  });
});
