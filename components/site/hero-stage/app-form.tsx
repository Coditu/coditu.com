import type { Ref } from "react";

import { buttonClasses } from "@/components/ui/button";
import { controlClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * The live half: the same form as the sketch, in our real component styles —
 * but a picture of it. Spans, not inputs: the stage is `aria-hidden` and
 * nothing in it may take focus. The last field is a choice (a select), like
 * the chevron on paper.
 */
export function AppForm({
  title,
  labels,
  values,
  active,
  caret,
  button,
  pressed,
  sending,
  sendingLabel,
  buttonRef,
}: {
  title: string;
  labels: string[];
  values: string[];
  active: number;
  caret: boolean;
  button: string;
  pressed: boolean;
  sending: boolean;
  sendingLabel: string;
  buttonRef: Ref<HTMLSpanElement>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p data-reveal="micro" className="truncate text-[18px] leading-tight font-semibold">
        {title}
      </p>
      {labels.map((label, i) => {
        const last = i === labels.length - 1;
        return (
          <div key={label} data-reveal="micro" className="flex flex-col gap-1.5" style={{ animationDelay: `${120 + i * 120}ms` }}>
            <span className="text-[13px] font-semibold text-ink">{label}</span>
            <span
              className={cn(
                controlClasses,
                "relative flex h-11 items-center",
                last && "pr-9",
                active === i && "border-blueprint outline-2 outline-offset-1 outline-blueprint"
              )}
            >
              <span className="truncate">{values[i]}</span>
              {caret && active === i && <Caret />}
              {last && (
                // Select's chevron, inline (lucide's ChevronDown path).
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="absolute top-1/2 right-3 size-3 -translate-y-1/2 text-ink-muted"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </span>
          </div>
        );
      })}
      <span
        ref={buttonRef}
        data-reveal="micro"
        style={{ animationDelay: `${120 + labels.length * 120}ms` }}
        className={cn(
          buttonClasses({ variant: "app" }),
          "mt-1 self-start transition-transform",
          pressed && "scale-[0.97] border-blueprint-hover bg-blueprint-hover",
          sending && "opacity-80"
        )}
      >
        {sending ? sendingLabel : button}
      </span>
    </div>
  );
}

/** After sending: a check, the title, what was entered, and the app is live. */
export function AppSuccess({ title, labels, values, live }: { title: string; labels: string[]; values: string[]; live: string }) {
  return (
    <div data-reveal="micro" className="flex flex-col items-start gap-4">
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-blueprint text-blueprint-ink">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <p className="text-[18px] leading-tight font-semibold">{title}</p>
      <dl className="grid w-full grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-line pt-4 text-[14px]">
        {labels.map((label, i) => (
          <div key={label} className="contents">
            <dt className="font-semibold">{label}</dt>
            <dd className="truncate text-ink-muted">{values[i]}</dd>
          </div>
        ))}
      </dl>
      {/* StatusPill's "live" look, inline: the full variant map would cost the client bundle. */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-blueprint bg-blueprint-light px-2.5 py-0.5 text-[12px] font-semibold text-blueprint">
        <span className="size-1.5 rounded-full bg-current" />
        {live}
      </span>
    </div>
  );
}

export function Caret() {
  return <span className="cd-caret ml-px inline-block h-[1.1em] w-[2px] flex-none bg-blueprint" />;
}
