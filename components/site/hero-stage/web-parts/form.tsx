import type { ReactNode, Ref } from "react";

import { buttonClasses } from "@/components/ui/button";
import { controlClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * The web part's "new item" form: the same fields as the sketch, in our real
 * component styles — but a picture of it. Spans, not inputs: the stage is
 * `aria-hidden` and nothing in it may take focus. The last field is a choice
 * (a select), like the chevron on paper. Compact sizes: it sits in a web part.
 */
export function WebPartForm({
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
    <div className="flex flex-col gap-2.5">
      {labels.map((label, i) => {
        const last = i === labels.length - 1;
        return (
          <div key={label} data-reveal="micro" className="flex flex-col gap-1" style={{ animationDelay: `${450 + i * 120}ms` }}>
            <span className="truncate text-[12px] font-semibold text-ink">{label}</span>
            <span
              className={cn(
                controlClasses,
                "relative flex h-9 items-center text-[14px]",
                last && "pr-8",
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
        style={{ animationDelay: `${450 + labels.length * 120}ms` }}
        className={cn(
          buttonClasses({ variant: "app" }),
          "mt-1 h-9 self-start px-4 text-[14px] transition-transform",
          pressed && "scale-[0.97] border-blueprint-hover bg-blueprint-hover",
          sending && "opacity-80"
        )}
      >
        {sending ? sendingLabel : button}
      </span>
    </div>
  );
}

/** StatusPill's look, inline: the full variant map would cost the client bundle. */
export function Pill({ className, children, delay }: { className: string; children: ReactNode; delay?: number }) {
  return (
    <span
      data-reveal={delay === undefined ? undefined : "micro"}
      style={delay === undefined ? undefined : { animationDelay: `${delay}ms` }}
      className={cn("inline-flex flex-none items-center gap-1.5 rounded-full border px-2 py-px text-[11px] font-semibold", className)}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function Caret() {
  return <span className="cd-caret ml-px inline-block h-[1.1em] w-[2px] flex-none bg-blueprint" />;
}
