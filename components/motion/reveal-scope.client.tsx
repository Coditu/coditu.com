"use client";

import { useEffect } from "react";

/**
 * Releases every paused `[data-reveal-on-view]` element on the page, through
 * one `IntersectionObserver` for all of them.
 *
 * The pause itself is CSS, and it only applies while `<html>` carries the `js`
 * class. If this never hydrates the animations play on parse and the content is
 * simply visible: the observer is an enhancement, never a gate. Anything
 * already above the fold is released on the observer's first callback, which
 * fires immediately, so the hero does not wait for a scroll.
 */
export function RevealScope() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "-8% 0px" }
    );
    for (const target of document.querySelectorAll("[data-reveal-on-view]")) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return null;
}
