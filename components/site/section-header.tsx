import { SheetLabel } from "@/components/blueprint/sheet-label";

/**
 * Optional label + heading + optional intro. Content starts `mt-12` below.
 * `headingId` is what the section's `aria-labelledby` points at.
 */
export function SectionHeader({
  label,
  title,
  intro,
  headingId,
}: {
  label?: string;
  title: string;
  intro?: string;
  headingId: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        {label && <SheetLabel>{label}</SheetLabel>}
        <h2 id={headingId} className={`max-w-[18ch] text-h1 ${label ? "mt-5" : ""}`}>
          {title}
        </h2>
      </div>
      {intro && <p className="max-w-[46ch] text-lead text-ink-muted lg:col-span-5">{intro}</p>}
    </div>
  );
}
