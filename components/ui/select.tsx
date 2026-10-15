import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { controlClasses } from "./input";

/** Native `<select>`, styled like an input. */
export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <span className="relative block">
      <select className={cn(controlClasses, "h-11 appearance-none pr-9", className)} {...props} />
      <ChevronDown
        aria-hidden
        strokeWidth={1.5}
        className="pointer-events-none absolute top-1/2 right-3 size-3 -translate-y-1/2 text-ink-muted"
      />
    </span>
  );
}
