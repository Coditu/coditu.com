import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Spec: docs/design-system/components/data-display.md → Card. No hover lift. */
export function Card({
  meta,
  title,
  children,
  footer,
  className,
}: {
  /** Optional mono strip, e.g. ["Modul M-04", "SharePoint"]. */
  meta?: [string, string?];
  title: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("flex flex-col rounded-ui border border-line bg-surface", className)}>
      {meta && (
        <header className="flex justify-between gap-4 border-b border-line px-4 py-3 font-mono text-label text-ink-muted uppercase">
          <span>{meta[0]}</span>
          {meta[1] && <span>{meta[1]}</span>}
        </header>
      )}
      <div className="flex flex-col gap-2.5 p-4">
        <h3 className="text-h3">{title}</h3>
        {children}
      </div>
      {footer && <footer className="mt-auto px-4 pb-4">{footer}</footer>}
    </article>
  );
}
