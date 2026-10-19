import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { formatDate, parsePost, renderPost } from "@/lib/blog";
import { locales } from "@/lib/i18n";
import de from "@/messages/de";

const source = `---
title: "Was kostet ein Webpart?"
description: Kurz: es kommt darauf an.
slug: was-kostet
date: 2026-10-19
updated: 2026-10-20
readingTime: 4
tags: [SharePoint, "SPFx"]
service: 0
review: "needs Adam"
---

Antwort. {{price:webPart}}

| A | B |
|---|---|
| 1 | 2 |
`;

describe("blog", () => {
  it("reads the front matter, colons in values included", () => {
    const post = parsePost(source.replaceAll("\n", "\r\n"));
    expect(post).toMatchObject({
      title: "Was kostet ein Webpart?",
      description: "Kurz: es kommt darauf an.",
      date: "2026-10-19",
      updated: "2026-10-20",
      readingTime: 4,
      tags: ["SharePoint", "SPFx"],
      service: 0,
      review: "needs Adam",
    });
  });

  it("refuses a post without a required field or with a bad date", () => {
    expect(() => parsePost(source.replace(/slug: .*\n/, ""))).toThrow(/slug/);
    expect(() => parsePost(source.replace("date: 2026-10-19", "date: 19.10.2026"))).toThrow(/date/);
  });

  it("writes „Preis auf Anfrage“ while prices are off, and wraps tables to scroll", () => {
    const html = renderPost("de", parsePost(source));
    expect(html).toContain(de.blog.prices.onRequest);
    expect(html).toMatch(/<div class="table-scroll" role="region" tabindex="0" aria-label="[^"]+"><table>[\s\S]*<\/table><\/div>/);
  });

  it("formats a date as the day it is, in any time zone", () => {
    expect(formatDate("de", "2026-08-23")).toBe("23. August 2026");
  });

  /** The article template: every post in the repo has its parts, and its links lead somewhere. */
  for (const locale of locales) {
    const dir = resolve(import.meta.dirname, "../content/blog", locale);
    let files: string[] = [];
    try {
      files = readdirSync(dir).filter((file) => file.endsWith(".md"));
    } catch {}
    const slugs = files.map((file) => parsePost(readFileSync(resolve(dir, file), "utf8")).slug);

    for (const file of files) {
      it(`${locale}/${file} follows the template`, () => {
        const post = parsePost(readFileSync(resolve(dir, file), "utf8"));
        expect(file).toBe(`${post.slug}.md`);
        expect(post.title.endsWith("?")).toBe(true);
        expect(post.body.match(/^\|---/gm)).toHaveLength(1);
        expect(post.body).toMatch(/^## (Wann wir nicht die richtige Wahl sind|When we are not the right choice)$/m);
        expect(post.body).not.toMatch(/EVIM/i);
        if (post.translationOf) {
          const other = resolve(import.meta.dirname, "../content/blog", locale === "de" ? "en" : "de", `${post.translationOf}.md`);
          expect(parsePost(readFileSync(other, "utf8")).date).toBe(post.date);
        }
        for (const [, slug] of post.body.matchAll(new RegExp(`\\]\\(/${locale}/blog/([^)]+)\\)`, "g"))) {
          expect(slugs).toContain(slug);
        }
      });
    }
  }
});
