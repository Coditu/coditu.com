"use client";

import { useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

const STORAGE_KEY = "coditu-offer-dismissed";
const SCROLL_DEPTH = 0.4;
const TIME_MS = 25_000;

function readDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Private browsing / blocked storage: the panel just stops persisting the
    // choice. It never throws and never blocks the page.
  }
}

/**
 * The one public offer (docs/02-POSITIONING.md "The offer panel" and "The
 * free offer"), shown once per visitor after 40 % scroll, 25 s on page, or
 * exit-intent (desktop pointers only — there is no such gesture on touch).
 * Bottom-right corner on desktop, a thin sticky bar on mobile. Dismissing it
 * — or having dismissed it on an earlier visit — stops it for good via
 * `localStorage`. Mounted globally in `app/[lang]/layout.tsx`; renders
 * nothing until a client-side trigger fires, so it ships no server-rendered
 * markup on any page (`scripts/verify-tokens.sh` — nothing hidden to reveal).
 *
 * Strings and the finished `mailto:` link come in as props, built by the
 * server layout from `getMessages` — the same split every other `.client.tsx`
 * here uses (e.g. `ThemeToggle`), so this component's bundle holds no copy of
 * `messages/de.ts` / `messages/en.ts`.
 */
export function OfferPanel({
  title,
  fine,
  cta,
  close,
  mailto,
  booking,
  bookingUrl,
}: {
  title: string;
  fine: string;
  cta: string;
  close: string;
  mailto: string;
  booking: string;
  bookingUrl: string | null;
}) {
  const [visible, setVisible] = useState(false);
  // Lazy init only: reading `localStorage` here does not change what this
  // component renders on first paint (that's always governed by `visible`),
  // so server and client agree, and no `setState` runs synchronously in an effect.
  const [dismissed, setDismissed] = useState(() => readDismissed());
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (dismissed) return;

    function trigger() {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setVisible(true);
      cleanup();
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_DEPTH) trigger();
    }

    function onMouseOut(e: MouseEvent) {
      // The pointer left through the top of the viewport (into the browser
      // chrome), not onto another element — the classic exit-intent read.
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    }

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }

    const timer = window.setTimeout(trigger, TIME_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Exit-intent doesn't exist on touch — a finger leaving the top of the
    // screen means nothing, so it is only wired up on hover-capable pointers.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.addEventListener("mouseout", onMouseOut);
    }

    return cleanup;
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const dismiss = () => {
    writeDismissed();
    setDismissed(true);
  };

  return (
    <aside
      aria-label={title}
      className="offer-panel-pulse fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-ink bg-surface px-4 py-3 lg:inset-x-auto lg:bottom-6 lg:right-6 lg:w-80 lg:flex-col lg:items-stretch lg:gap-4 lg:border lg:p-5 lg:shadow-lift"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold leading-snug lg:text-h3 lg:whitespace-normal">{title}</p>
        <p className="mt-1.5 hidden font-mono text-label text-ink-muted uppercase lg:block">{fine}</p>
      </div>
      <div className="flex flex-none items-center gap-2 lg:w-full lg:items-stretch">
        <ButtonLink href={mailto} variant="cta" className="flex-none whitespace-nowrap lg:w-full">
          {cta}
        </ButtonLink>
        <button
          type="button"
          onClick={dismiss}
          aria-label={close}
          className="inline-flex size-11 flex-none items-center justify-center text-ink-muted transition-colors duration-150 hover:text-blueprint"
        >
          <X aria-hidden="true" size={18} strokeWidth={1.5} />
        </button>
      </div>
      {/* Desktop only — the mobile bar stays a single row (CTA + close); a
          second full-width button there would crowd an 11 px-tall strip. */}
      {bookingUrl && (
        <ButtonLink href={bookingUrl} variant="outline" className="hidden lg:flex lg:w-full">
          {booking}
        </ButtonLink>
      )}
    </aside>
  );
}
