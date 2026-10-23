import { describe, expect, it } from "vitest";

import { advance, INITIAL, parse, type Phase, type State } from "@/components/site/hero-stage/use-sequence";
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
  } while (s.phase !== "mail" && seen.length < 50);
  return { seen, ms, after: s };
}

describe("hero sequence", () => {
  it("plays mail → words lit → fly → app builds → holds, then the mail again", () => {
    const { seen, ms, after } = play(false);
    expect(seen).toEqual(["mail", "mark", "fly", "build", "done"]);
    expect(after).toEqual(INITIAL);
    // Short: one loop in under 10 s.
    expect(ms).toBeLessThan(10_000);
  });

  it("lights every key word before they fly", () => {
    let s: State = { phase: "mark", marked: 0 };
    while (s.phase === "mark") s = advance(s, WORDS, false)[1];
    expect(s).toEqual({ phase: "fly", marked: WORDS });
  });

  it("reduced motion: two still frames, the words already lit", () => {
    const { seen, after } = play(true);
    expect(seen).toEqual(["mail", "done"]);
    expect(after).toEqual({ phase: "mail", marked: WORDS });
  });

  it("the mail has exactly four key words in both languages — the app has four places for them", () => {
    for (const t of [de, en]) {
      expect(parse(t.hero.request.mail.body).filter((x) => x.key !== null)).toHaveLength(WORDS);
    }
  });

  it("parse keeps the text and numbers the key words", () => {
    expect(parse("a [b] c [d]")).toEqual([
      { text: "a ", key: null },
      { text: "b", key: 0 },
      { text: " c ", key: null },
      { text: "d", key: 1 },
    ]);
  });
});
