"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A euro amount that counts up from 0 once it scrolls into view, then holds
 * at the real value. The initial render — so the no-JS and pre-hydration
 * state too — is already the final formatted amount: the count is a decoration
 * layered on top after mount, never the only way to read the number.
 * `prefers-reduced-motion` skips the animation outright and keeps that value.
 *
 * Duration and easing follow the design system's entrance convention
 * (docs/design-system/tokens.md "draw-on": 900 ms, a cubic ease-out in the
 * same spirit as tokens.css `--ease-entrance`), so this reads as the same
 * kind of motion as everything else that draws on on first view.
 */
export function CountUp({ localeTag, value }: { localeTag: string; value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => format(localeTag, value));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const duration = 900;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setDisplay(format(localeTag, 0));
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - elapsed) ** 3;
          setDisplay(format(localeTag, Math.round(value * eased)));
          if (elapsed < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [localeTag, value]);

  return <span ref={ref}>{display}</span>;
}

function format(localeTag: string, amount: number) {
  return new Intl.NumberFormat(localeTag, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
}
