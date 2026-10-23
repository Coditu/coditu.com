import type { ReactNode } from "react";

/** Starts every section: „Blatt 02 · Arbeitsweise“. */
export function SheetLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-[12px] leading-[1.3] font-medium tracking-[0.08em] text-blueprint uppercase">
      <span aria-hidden="true" className="size-2 flex-none bg-blueprint" />
      {children}
    </p>
  );
}
