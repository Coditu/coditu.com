import { cn } from "@/lib/utils";

/** Editorial calendar: the sent topic slides in as a new row, in date order between the planned ones. */
export function Calendar({ before, after, values }: { before: string[][]; after: string[][]; values: string[] }) {
  const rows = [...before, values, ...after];
  return (
    <ul className="flex flex-col text-[13px]">
      {rows.map(([topic, date, owner], r) => {
        const added = r === before.length;
        return (
          <li
            key={r}
            data-reveal={added ? "micro" : undefined}
            style={added ? { animationDelay: "200ms" } : undefined}
            className={cn(
              "flex flex-col gap-0.5 border-b border-line px-2 py-2",
              added ? "bg-blueprint-light text-blueprint" : "text-ink-muted"
            )}
          >
            <span className={cn("truncate", added && "font-semibold")}>{topic}</span>
            <span className="truncate text-[12px]">
              {date} · {owner}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
