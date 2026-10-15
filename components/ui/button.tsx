import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Spec: docs/design-system/components/buttons.md */

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-ui border font-sans font-semibold " +
  "transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blueprint " +
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-sunk disabled:text-ink-muted";

const variants = {
  /** THE main action of the screen — max one per viewport. */
  cta: "border-cta bg-cta text-cta-ink hover:border-cta-hover hover:bg-cta-hover",
  outline: "border-blueprint bg-transparent text-blueprint hover:bg-blueprint-light",
  app: "border-blueprint bg-blueprint text-blueprint-ink hover:border-blueprint-hover hover:bg-blueprint-hover",
  link:
    "border-transparent p-0 text-blueprint underline decoration-1 underline-offset-4 hover:text-blueprint-hover hover:decoration-2 " +
    "disabled:border-transparent disabled:bg-transparent disabled:no-underline",
};

const sizes = {
  /** Desktop nav only; the `after:` keeps a 44 px hit area. */
  sm: "relative h-10 px-4 text-[14px] after:absolute after:-inset-y-1 after:inset-x-0",
  md: "h-11 px-5 text-[15px]",
  /** Hero only. */
  lg: "h-[54px] px-6 text-[16px]",
};

type Style = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export function buttonClasses({ variant = "app", size = "md" }: Style, className?: string) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], className);
}

/** Navigates → `<a>`. */
export function ButtonLink({ variant, size, className, ...props }: ComponentProps<"a"> & Style) {
  return <a className={buttonClasses({ variant, size }, className)} {...props} />;
}

/** Acts → `<button>`. */
export function Button({ variant, size, className, type = "button", ...props }: ComponentProps<"button"> & Style) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...props} />;
}
