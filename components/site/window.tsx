import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The frame every product mockup sits in (hero stage, services): ink border,
 * the one `shadow-lift`, a 44 px title bar. A picture, not UI: put nothing
 * focusable inside.
 */
export function Window({ bar, children, className }: { bar: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-ui border border-ink bg-surface shadow-lift", className)}>
      <div className="flex h-11 flex-none items-center gap-2 border-b border-line px-3">{bar}</div>
      {children}
    </div>
  );
}
