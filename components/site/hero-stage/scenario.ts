/** A hero scenario and its request, parsed. No React here: the still frames (frame.tsx) are Server Components. */

export type Scenario = {
  /** The client's request. `[Words]` in brackets turn into the app: the first is its title, the rest its fields. */
  request: string;
  /** One example value per field, in order. */
  values: string[];
  button: string;
  /** What the sent item becomes inside its web part (web-parts/*.tsx). */
  result: Result;
};

/** Example rows already in the web part; the sent item lands among them. */
export type Result =
  | { kind: "checklist"; heading: string; tasks: string[] }
  | { kind: "calendar"; before: string[][]; after: string[][] }
  | { kind: "news"; older: string[] };

export type Segment = { text: string; key: number | null; start: number };

/** "a [b] c" → [{a}, {b, key 0}, {c}], each with its offset in the typed text */
export function parse(request: string): Segment[] {
  const out: Segment[] = [];
  let key = 0;
  let start = 0;
  for (const part of request.split(/(\[[^\]]+\])/)) {
    if (!part) continue;
    const text = part.startsWith("[") ? part.slice(1, -1) : part;
    out.push({ text, key: part.startsWith("[") ? key++ : null, start });
    start += text.length;
  }
  return out;
}
