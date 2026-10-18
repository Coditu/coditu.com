"use client";

/**
 * The only control of the hero's sketch/live compare: a real range input laid
 * invisibly over the whole picture, so mouse, touch and keyboard all work and
 * the target is the full area. It writes `--pos` on its parent and marks it
 * `data-moved`, which stops the CSS intro sweep (globals.css → hero compare).
 * The visible handle is drawn by the server; focus shows on it.
 */
export function CompareRange({ label }: { label: string }) {
  return (
    <input
      type="range"
      min={0}
      max={100}
      defaultValue={50}
      aria-label={label}
      onInput={(event) => {
        const parent = event.currentTarget.parentElement!;
        parent.style.setProperty("--pos", `${event.currentTarget.value}%`);
        parent.dataset.moved = "";
      }}
      className="absolute inset-0 size-full cursor-ew-resize touch-pan-y appearance-none bg-transparent opacity-0"
    />
  );
}
