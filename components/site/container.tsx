import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Page container: 1280 px max, side padding 16 · 24 · 32 · 48 · 80 (tokens.md → Layout). */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-page px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20", className)}>
      {children}
    </div>
  );
}
