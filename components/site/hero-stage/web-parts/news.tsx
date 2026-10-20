import { Pill } from "./form";

/** An image not drawn yet: the drawing placeholder (a box with a thin cross). */
export function ImageBox() {
  return (
    <span className="block size-12 flex-none border border-line bg-surface-sunk text-line-input">
      <svg viewBox="0 0 48 48" className="size-full">
        <path d="M0 0 48 48M48 0 0 48" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}

/** Intranet news: the sent article drops into the top of the feed, approved; older posts sit below. */
export function News({ older, values }: { older: string[]; values: string[] }) {
  const [title, image, status] = values;
  return (
    <ul className="flex flex-col gap-2">
      <li data-reveal="micro" className="flex gap-3 rounded-ui border border-blueprint p-2.5">
        <ImageBox />
        <div className="flex min-w-0 flex-col items-start gap-1">
          <span className="line-clamp-2 text-[14px] leading-tight font-semibold">{title}</span>
          <span className="w-full truncate text-[12px] text-ink-muted">{image}</span>
          <Pill className="border-success bg-success-bg text-success">{status}</Pill>
        </div>
      </li>
      {older.map((post) => (
        <li key={post} className="flex items-center gap-3 rounded-ui border border-line p-2.5">
          <ImageBox />
          <span className="truncate text-[13px] text-ink-muted">{post}</span>
        </li>
      ))}
    </ul>
  );
}
