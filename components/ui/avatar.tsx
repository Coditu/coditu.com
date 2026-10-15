import { cn } from "@/lib/utils";

/** Initials avatar, max two letters. `name` is what assistive tech reads. */
export function Avatar({
  initials,
  name,
  size = "md",
  overflow = false,
}: {
  initials: string;
  name: string;
  size?: "sm" | "md";
  /** The „+2“ chip. */
  overflow?: boolean;
}) {
  return (
    <span
      role="img"
      title={name}
      aria-label={name}
      className={cn(
        "inline-flex flex-none items-center justify-center rounded-full border font-mono text-[11px] font-semibold",
        size === "sm" ? "size-7" : "size-8",
        overflow ? "border-blueprint bg-blueprint text-blueprint-ink" : "border-ink bg-surface text-ink"
      )}
    >
      {initials}
    </span>
  );
}
