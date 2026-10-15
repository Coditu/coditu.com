import type { ReactNode } from "react";

/**
 * The "A · Entwurf" half of a sketch → live pair: a picture of a form, not a
 * form. Everything is presentational and `aria-hidden` so screen readers meet
 * the form once, in its live version.
 */
export function Sketch({
  label,
  id,
  caption,
  children,
}: {
  /** Mono header, e.g. „Urlaubsantrag“. */
  label: string;
  /** Sheet id, e.g. „A-01“. */
  id: string;
  /** „A · Entwurf“ / "A · Sketch". */
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure aria-hidden="true" className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 border border-blueprint bg-paper/85 p-4">
        <div className="flex justify-between gap-4 font-mono text-label text-blueprint uppercase">
          <span>{label}</span>
          <span>{id}</span>
        </div>
        {children}
      </div>
      <figcaption className="font-mono text-label text-ink-muted uppercase">{caption}</figcaption>
    </figure>
  );
}

/** „01 · Name“ over a dashed box describing the field type. */
export function SketchField({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-label text-blueprint uppercase">{label}</span>
      <div className="flex h-11 items-center border border-dashed border-blueprint px-3 font-mono text-[12px] text-blueprint">
        {hint}
      </div>
    </div>
  );
}

/** `[ Antrag senden ]` */
export function SketchButton({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-11 items-center justify-center self-start border border-blueprint px-4 font-mono text-[12px] text-blueprint uppercase">
      [ {children} ]
    </div>
  );
}

/** A boxed note pinned to a sketch: „Hinweis 1“ + one line. */
export function SketchNote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border border-blueprint bg-paper px-2.5 py-2">
      <p className="font-mono text-label text-blueprint uppercase">{label}</p>
      <p className="font-mono text-[11px] font-semibold text-blueprint">{children}</p>
    </div>
  );
}
