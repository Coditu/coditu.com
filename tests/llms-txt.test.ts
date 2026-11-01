import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * `public/llms.txt` — docs/02-POSITIONING.md "Search", Phase 1 (AI search).
 * Follows the llms.txt convention (https://llmstxt.org): an H1 title, one
 * blockquote summary, then H2 sections of markdown links with a one-line
 * description each. Checks the shape, not every word, so the file can be
 * edited without the test becoming the thing maintained.
 */
const content = readFileSync(resolve(import.meta.dirname, "../public/llms.txt"), "utf8");
const lines = content.split("\n");

describe("public/llms.txt", () => {
  it("starts with an H1 title, then a blockquote summary", () => {
    expect(lines[0]).toBe("# Coditu");
    const blockquote = lines.slice(1).find((line) => line.trim() !== "");
    expect(blockquote?.startsWith(">")).toBe(true);
  });

  it("has H2 sections made of markdown links", () => {
    const h2s = lines.filter((line) => line.startsWith("## "));
    expect(h2s.length).toBeGreaterThan(0);

    const linkLines = lines.filter((line) => line.startsWith("- ["));
    expect(linkLines.length).toBeGreaterThan(0);
    for (const line of linkLines) {
      expect(line).toMatch(/^- \[[^\]]+\]\(https:\/\/coditu\.com\/[^)]+\): .+/);
    }
  });

  it("links only to coditu.com, over https", () => {
    const urls = [...content.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url.startsWith("https://coditu.com/")).toBe(true);
    }
  });

  it("invents nothing that is banned on the public site", () => {
    const lower = content.toLowerCase();
    expect(lower).not.toContain("strukture");
    expect(lower).not.toMatch(/evim/);
    expect(lower).not.toContain("hello@coditu.com");
    expect(content).toContain("contact@coditu.com");
  });
});
