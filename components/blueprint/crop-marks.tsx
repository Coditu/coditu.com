const corner = "pointer-events-none absolute hidden size-[18px] border-ink/55 sm:block";

/** Four L-corners 10 px outside the parent. The parent must be `relative`. */
export function CropMarks() {
  return (
    <>
      <span aria-hidden="true" className={`${corner} -top-2.5 -left-2.5 border-t border-l`} />
      <span aria-hidden="true" className={`${corner} -top-2.5 -right-2.5 border-t border-r`} />
      <span aria-hidden="true" className={`${corner} -bottom-2.5 -left-2.5 border-b border-l`} />
      <span aria-hidden="true" className={`${corner} -right-2.5 -bottom-2.5 border-r border-b`} />
    </>
  );
}
