import type { CSSProperties, ReactNode, Ref } from "react";

/**
 * A box drawn by hand: every corner a little off and the first stroke
 * overshooting its start, the way a pen does. Fixed offsets, so it looks the
 * same on every render. (Ported from the Baukasten sketch.)
 */
function box(x: number, y: number, w: number, h: number) {
  return [
    `M${x + 3} ${y + 1}`,
    `L${x + w - 2} ${y - 1}`,
    `Q${x + w + 2} ${y} ${x + w + 1} ${y + 4}`,
    `L${x + w + 1} ${y + h - 3}`,
    `Q${x + w} ${y + h + 1} ${x + w - 4} ${y + h + 1}`,
    `L${x + 2} ${y + h - 1}`,
    `Q${x - 2} ${y + h - 2} ${x - 1} ${y + h - 6}`,
    `L${x} ${y + 5}`,
    `Q${x} ${y - 1} ${x + 12} ${y + 2}`,
  ].join(" ");
}

/** Long values still have to fit their box on paper. */
const short = (text: string, chars: number) => (text.length > chars ? `${text.slice(0, chars - 1)}…` : text);

/** `row` staggers the pen: row n starts n × 220 ms after drawing begins (globals.css → .cd-pen). */
function Pen({ d, row, className }: { d: string; row: number; className?: string }) {
  return <path d={d} pathLength={1} className={className ? `cd-pen ${className}` : "cd-pen"} style={{ "--row": row } as CSSProperties} />;
}

function Hand({
  x,
  y,
  size = 19,
  turn = 0,
  row,
  ref,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  turn?: number;
  /** Written with the pen at this row; without one, it is there as soon as its parent is. */
  row?: number;
  ref?: Ref<SVGTextElement>;
  children: ReactNode;
}) {
  return (
    <text
      ref={ref}
      x={x}
      y={y}
      fontSize={size}
      transform={turn ? `rotate(${turn} ${x} ${y})` : undefined}
      className={row === undefined ? "cd-hand" : "cd-hand cd-write"}
      style={row === undefined ? undefined : ({ "--row": row } as CSSProperties)}
    >
      {children}
    </text>
  );
}

const W = 300;
const H = 400;
const FIELD_Y = 92;
const FIELD_STEP = 72;

/**
 * The paper sketch of the app: the title and field names in handwriting, a
 * wobbly box under each, the button, one red margin note. Values appear in
 * the boxes as the app fills; a sent form gets a big red tick. Pen strokes
 * draw once the parent carries `data-draw`.
 */
export function Sketch({
  title,
  labels,
  values,
  button,
  active,
  note,
  done,
  doneWord,
  showWords,
  targets,
}: {
  title: string;
  labels: string[];
  values: string[];
  button: string;
  /** Index of the field being filled, lit together with its app field. */
  active: number;
  note: string[];
  done: boolean;
  doneWord: string;
  /** The flown-in words are written (they land at the end of the flight). */
  showWords: boolean;
  /** The title and field names, for the words to fly to. */
  targets: (el: SVGTextElement | null, i: number) => void;
}) {
  const buttonY = FIELD_Y + labels.length * FIELD_STEP - 8;
  const words = showWords ? "" : "opacity-0";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block size-full -rotate-1 text-blueprint"
      aria-hidden="true"
      focusable="false"
    >
      {/* Ruled paper. Drawn in the SVG, so the sheet keeps its shape whatever the slot's. */}
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} className="fill-surface stroke-line" />
      <g className="text-line" stroke="currentColor" strokeWidth="1">
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M0 ${64 + i * 36}H${W}`} />
        ))}
      </g>

      <g className={words}>
        <Hand x={20} y={44} size={28} turn={-2} ref={(el) => targets(el, 0)}>
          {short(title, 22)}
        </Hand>
      </g>
      <Pen d="M20 56 q40 7 80 0 t80 0 t60 3" row={0} />

      {labels.map((label, i) => {
        const y = FIELD_Y + i * FIELD_STEP;
        const last = i === labels.length - 1;
        return (
          <g key={label} className="cd-sketch-part" data-active={active === i || undefined}>
            <g className={words}>
              <Hand x={22} y={y} ref={(el) => targets(el, i + 1)}>
                {label}
              </Hand>
            </g>
            <Pen d={box(20, y + 8, 260, 36)} row={i + 1} />
            {/* The last field is a choice: a chevron, like the select it becomes. */}
            {last && <Pen d={`M254 ${y + 22} l7 7 l7 -8`} row={i + 1} />}
            {values[i] && (
              <Hand x={32} y={y + 33} size={20}>
                {short(values[i], last ? 22 : 25)}
              </Hand>
            )}
          </g>
        );
      })}

      <Pen
        d={`M44 ${buttonY} L150 ${buttonY - 2} Q172 ${buttonY - 1} 172 ${buttonY + 21} Q172 ${buttonY + 44} 148 ${buttonY + 43} L42 ${buttonY + 45} Q18 ${buttonY + 44} 18 ${buttonY + 22} Q18 ${buttonY + 1} 48 ${buttonY}`}
        row={labels.length + 1}
      />
      <Hand x={32} y={buttonY + 28} size={20} row={labels.length + 1}>
        {short(button, 14)} →
      </Hand>

      {/* The red pen in the margin. */}
      <g className="text-pen-red">
        {note.map((line, i) => (
          <Hand key={line} x={196 + i * 4} y={buttonY + 14 + i * 20} size={19} turn={-9} row={labels.length + 2}>
            {line}
          </Hand>
        ))}
        <Pen d={`M198 ${buttonY + 36} q-6 12 -18 2 m0 0 l1 -8 m-1 8 l8 -2`} row={labels.length + 2} />
      </g>

      {done && (
        <g className="text-pen-red">
          <Pen d="M64 196 l52 64 l150 -190" row={0} className="cd-pen-bold" />
          <Hand x={172} y={392} size={32} turn={-10} row={0}>
            {doneWord}
          </Hand>
        </g>
      )}
    </svg>
  );
}
