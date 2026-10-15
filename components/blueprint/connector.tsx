import { cn } from "@/lib/utils";

/** Dashed line joining a sketch to its live version. Optional mono tag („Umsetzung“). */
export function Connector({ label, className }: { label?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex flex-col items-center gap-1 text-blueprint", className)}>
      {label && <span className="font-mono text-label uppercase">{label}</span>}
      <svg width="48" height="24" viewBox="0 0 48 24">
        <circle cx="3" cy="12" r="2.5" fill="currentColor" />
        <path d="M3 12H42" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 5" />
        <path d="m37 7 6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
