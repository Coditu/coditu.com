import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Spec: docs/design-system/components/forms.md. Always inside a `<Field>`. */

export const controlClasses = cn(
  "w-full rounded-ui border border-line-input bg-surface px-3 text-[15px] text-ink",
  "placeholder:text-ink-muted hover:border-ink",
  "focus-visible:border-blueprint focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blueprint",
  "disabled:border-line disabled:bg-surface-sunk disabled:text-ink-muted",
  "aria-invalid:border-error"
);

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClasses, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlClasses, "min-h-28 resize-y py-2.5", className)} {...props} />;
}
