import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The word carries the meaning; the dot and colour only support it. */
const statuses = {
  live: "border-blueprint bg-blueprint-light text-blueprint",
  draft: "border-dashed border-ink-muted text-ink-muted",
  approved: "border-success bg-success-bg text-success",
  warning: "border-warning bg-warning-bg text-warning",
  error: "border-error bg-error-bg text-error",
};

export function StatusPill({ status, children }: { status: keyof typeof statuses; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-semibold",
        statuses[status]
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", status === "draft" ? "border border-current" : "bg-current")}
      />
      {children}
    </span>
  );
}
