import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ControlProps = { id: string; "aria-describedby"?: string; "aria-invalid"?: true };

/**
 * Label + control + helper text. The error replaces the helper, never stacks.
 *
 *   <Field id="name" label="Name" help="Pflichtfeld">{(p) => <Input {...p} />}</Field>
 */
export function Field({
  id,
  label,
  help,
  error,
  children,
}: {
  id: string;
  label: string;
  help?: string;
  error?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const note = error ?? help;
  const noteId = `${id}-help`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink">
        {label}
      </label>
      {children({
        id,
        "aria-describedby": note ? noteId : undefined,
        "aria-invalid": error ? true : undefined,
      })}
      {note && (
        <p id={noteId} className={cn("text-[13px] leading-snug", error ? "font-semibold text-error" : "text-ink-muted")}>
          {note}
        </p>
      )}
    </div>
  );
}
