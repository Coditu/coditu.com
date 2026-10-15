import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** A label, not a button. `example` marks illustrative data („Beispiel“). */
export function Tag({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "example" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center self-start rounded-tag border px-1.5 py-0.5 font-mono text-label uppercase",
        variant === "example" ? "border-dashed border-ink text-ink" : "border-blueprint/45 text-blueprint"
      )}
    >
      {children}
    </span>
  );
}
