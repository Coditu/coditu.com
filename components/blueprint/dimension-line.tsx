/** │◀── B = 350 ──▶│ — decorative, max two per screen. */
export function DimensionLine({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="flex items-center gap-1.5 text-blueprint">
      <svg width="8" height="12" viewBox="0 0 8 12">
        <path d="M.5 0v12" stroke="currentColor" fill="none" />
        <path d="M1 6 7 3v6z" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-current" />
      <span className="font-mono text-label uppercase">{label}</span>
      <span className="h-px flex-1 bg-current" />
      <svg width="8" height="12" viewBox="0 0 8 12">
        <path d="M7.5 0v12" stroke="currentColor" fill="none" />
        <path d="M7 6 1 3v6z" fill="currentColor" />
      </svg>
    </div>
  );
}
