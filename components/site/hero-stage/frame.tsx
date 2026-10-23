import type { CSSProperties, ReactNode } from "react";

import { buttonClasses } from "@/components/ui/button";
import { controlClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages/de";

import { Sketch } from "./sketch";
import { parse, type Result, type Scenario } from "./scenario";
import { Pill } from "./web-parts/form";
import { ImageBox } from "./web-parts/news";

export const FRAMES = [
  "email",
  "sketch",
  "webpart",
  "filled",
  "result",
] as const;
export type Frame = (typeof FRAMES)[number];

type Labels = Messages["hero"]["request"];

/**
 * One still frame of the hero stage — e-mail, sketch, web part, filled,
 * result — rendered statically: no timers, no motion. The design reference
 * for the animation (docs/design-system/hero-frames/).
 *
 * Wide: the e-mail spans the stage; from the sketch on, paper left (~40 %),
 * „wird zu →“, the intranet page right (~60 %). Narrow: paper and web part
 * are one card showing one `side` (default: paper for the sketch, else the
 * web part); no arrow, no placeholder web parts. "Wide" is a container
 * query on the stage itself (`@min-[26rem]`, 416 px), not the viewport: the
 * hero stage is 432–528 px at lg+ and 343 px on a 375 px phone, and the
 * review page shows both widths side by side.
 *
 * Built for a camera: from the sketch on, every frame is the same
 * composition (paper, arrow, page) and only its contents change, so the
 * motion can scale one wrapper between frames instead of swapping layouts.
 * The parts that move carry `data-part` (email, paper, arrow, page, slot,
 * webpart, result); `data-frame` on the stage names the frame. In the
 * sketch the page is already there, faint, with an empty slot where the web
 * part will be — out of shot once the camera is on the paper.
 */
export function HeroFrame({
  frame,
  scenario,
  labels,
  side,
}: {
  frame: Frame;
  scenario: Scenario;
  labels: Labels;
  side?: "paper" | "webpart";
}) {
  const segments = parse(scenario.request);
  const words = segments.filter((x) => x.key !== null).map((x) => x.text);
  const [title, ...fields] = words;
  const filled = frame === "filled" || frame === "result";
  const values = filled ? scenario.values : fields.map(() => "");
  const active = frame === "filled" ? fields.length - 1 : -1;
  const shown = side ?? (frame === "sketch" ? "paper" : "webpart");

  return (
    <div className="@container mx-auto w-full max-w-2xl" aria-hidden="true">
      <div className="flex justify-end">
        <span className="rounded-tag border border-dashed border-ink px-1.5 py-0.5 font-mono text-[11px] text-ink uppercase">
          {labels.example}
        </span>
      </div>

      <div
        data-static
        data-frame={frame}
        className="mt-3 h-[440px] @min-[26rem]:h-[460px]"
      >
        {frame === "email" ? (
          <div className="flex h-full items-center">
            <div
              data-part="email"
              className="w-full rounded-ui border border-ink bg-surface p-6 shadow-lift @min-[26rem]:p-8"
            >
              <p className="font-mono text-label text-ink-muted uppercase">
                {labels.request}
              </p>
              <p className="mt-4 text-[19px] leading-relaxed @min-[26rem]:text-[21px]">
                {segments.map((x, i) => (
                  <span
                    key={i}
                    className={cn(
                      x.key !== null &&
                        "text-blueprint underline decoration-blueprint decoration-2 underline-offset-4",
                    )}
                  >
                    {x.text}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid h-full grid-rows-[minmax(0,1fr)] gap-2 @min-[26rem]:grid-cols-[minmax(0,2fr)_40px_minmax(0,3fr)]">
            {/* Paper stays paper in dark mode (globals.css → .cd-paper). */}
            <div
              data-part="paper"
              className={cn(
                "cd-paper min-h-0 items-center justify-center py-2",
                shown === "paper" ? "flex" : "hidden @min-[26rem]:flex",
              )}
            >
              <Sketch
                title={title}
                labels={fields}
                values={values}
                button={scenario.button}
                active={active}
                note={labels.note}
                done={frame === "result"}
                doneWord={labels.done}
                showWords
              />
            </div>

            <div
              data-part="arrow"
              className="hidden flex-col items-center justify-center gap-1 text-blueprint @min-[26rem]:flex"
            >
              <span className="cd-hand text-[20px] leading-none">
                {labels.becomes}
              </span>
              <svg viewBox="0 0 56 32" className="w-10" focusable="false">
                <path
                  d="M3 20 C16 6 34 8 50 18"
                  pathLength={1}
                  className="cd-pen"
                />
                <path
                  d="M40 10 L51 18 L39 25"
                  pathLength={1}
                  className="cd-pen"
                />
              </svg>
            </div>

            <div
              data-part="page"
              className={cn(
                "min-h-0 py-2",
                shown === "webpart" ? "block" : "hidden @min-[26rem]:block",
                frame === "sketch" && "opacity-40",
              )}
            >
              <IntranetPage
                labels={labels}
                title={title}
                live={frame === "result"}
              >
                {frame === "sketch" ? null : frame === "result" ? (
                  <ResultView
                    result={scenario.result}
                    fields={fields}
                    values={scenario.values}
                  />
                ) : (
                  <Form
                    fields={fields}
                    values={values}
                    active={active}
                    button={scenario.button}
                  />
                )}
              </IntranetPage>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** A web part that was on the page before: greyed bars, no content. Wide only. */
function Placeholder({ bars }: { bars: number }) {
  return (
    <div className="flex flex-col gap-2 rounded-ui border border-line bg-surface p-2.5">
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full bg-line"
          style={{ width: `${90 - i * 25}%` } as CSSProperties}
        />
      ))}
    </div>
  );
}

/**
 * A neutral intranet page: thin top bar (plain grid icon, „Intranet“), the
 * page title, the new web part, two greyed web parts under it. No product
 * logos. Nothing in it under 13 px. Without children (the sketch frame) the
 * web part is an empty dashed slot.
 */
function IntranetPage({
  labels,
  title,
  live,
  children,
}: {
  labels: Labels;
  title: string;
  live: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="flex size-full flex-col overflow-hidden rounded-ui border border-line bg-surface-sunk shadow-lift">
      <div className="flex h-9 flex-none items-center gap-2 border-b border-line bg-surface px-3 text-[13px] font-semibold text-ink-muted">
        <svg
          viewBox="0 0 12 12"
          className="size-3"
          fill="currentColor"
          focusable="false"
        >
          {[0, 4.5, 9].flatMap((y) =>
            [0, 4.5, 9].map((x) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" />
            )),
          )}
        </svg>
        {labels.intranet}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-2.5">
        <p className="text-[16px] leading-tight font-semibold">{labels.page}</p>
        {children == null ? (
          <div
            data-part="slot"
            className="min-h-0 flex-1 rounded-ui border border-dashed border-line-input"
          />
        ) : (
          <section
            data-part="webpart"
            className="flex min-h-0 flex-1 flex-col rounded-ui border border-line bg-surface"
          >
            <div className="flex h-10 flex-none items-center justify-between gap-2 border-b border-line px-3">
              <span className="truncate text-[15px] font-semibold">
                {title}
              </span>
              {live && (
                <Pill className="border-blueprint bg-blueprint-light text-[13px] text-blueprint">
                  {labels.live}
                </Pill>
              )}
            </div>
            <div className="min-h-0 flex-1 overflow-hidden p-2.5">
              {children}
            </div>
          </section>
        )}
        <div className="hidden grid-cols-2 gap-2.5 @min-[26rem]:grid">
          <Placeholder bars={2} />
          <Placeholder bars={2} />
        </div>
      </div>
    </div>
  );
}

/** The web part's "new item" form: the sketched fields, our real control styles, spans not inputs. The last is a choice. */
function Form({
  fields,
  values,
  active,
  button,
}: {
  fields: string[];
  values: string[];
  active: number;
  button: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {fields.map((label, i) => {
        const last = i === fields.length - 1;
        return (
          <div key={label} className="flex flex-col gap-1">
            <span className="truncate text-[13px] font-semibold">{label}</span>
            <span
              className={cn(
                controlClasses,
                "relative flex h-9 items-center text-[14px]",
                last && "pr-8",
                active === i &&
                  "border-blueprint outline-2 outline-offset-1 outline-blueprint",
              )}
            >
              <span className="truncate">{values[i]}</span>
              {last && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="absolute top-1/2 right-3 size-3 -translate-y-1/2 text-ink-muted"
                  focusable="false"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </span>
          </div>
        );
      })}
      <span
        className={cn(
          buttonClasses({ variant: "app" }),
          "mt-1 h-9 self-start px-4 text-[14px]",
        )}
      >
        {button}
      </span>
    </div>
  );
}

/** The sent item as real content in its web part, by `result.kind`. */
function ResultView({
  result,
  fields,
  values,
}: {
  result: Result;
  fields: string[];
  values: string[];
}) {
  if (result.kind === "news") {
    const [title, image, status] = values;
    return (
      <ul className="flex flex-col gap-2">
        <li
          data-part="result"
          className="flex gap-3 rounded-ui border border-blueprint p-2.5"
        >
          <ImageBox />
          <div className="flex min-w-0 flex-col items-start gap-1">
            <span className="line-clamp-2 text-[14px] leading-tight font-semibold">
              {title}
            </span>
            <span className="w-full truncate text-[13px] text-ink-muted">
              {image}
            </span>
            <Pill className="border-success bg-success-bg text-[13px] text-success">
              {status}
            </Pill>
          </div>
        </li>
        {result.older.map((post) => (
          <li key={post} className="flex rounded-ui border border-line p-2.5">
            <span className="truncate text-[13px] text-ink-muted">{post}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (result.kind === "checklist") {
    return (
      <div
        data-part="result"
        className="flex flex-col gap-2 rounded-ui border border-blueprint p-2.5 text-[13px]"
      >
        <p className="truncate text-[14px] leading-tight font-semibold">
          {result.heading}
        </p>
        <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3">
          {fields.map((label, i) => (
            <div key={label} className="contents">
              <dt className="text-ink-muted">{label}</dt>
              <dd className="truncate">{values[i]}</dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-col gap-1.5 border-t border-line pt-2">
          {result.tasks.map((task) => (
            <li key={task} className="flex items-center gap-2">
              <span className="size-3.5 flex-none rounded-tag border border-line-input" />
              <span className="truncate">{task}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // The plan as a small table: date, then topic with who owns it. The new row is lit.
  const [topic, date, owner] = fields;
  const rows = [...result.before, values, ...result.after];
  return (
    <div className="grid grid-cols-[max-content_minmax(0,1fr)] text-[13px]">
      <span className="border-b border-line px-2 pb-1.5 font-semibold text-ink-muted">
        {date}
      </span>
      <span className="truncate border-b border-line px-2 pb-1.5 font-semibold text-ink-muted">
        {topic} · {owner}
      </span>
      {rows.map(([t, d, o], r) => {
        const added = r === result.before.length;
        const cell = cn(
          "border-b border-line px-2 py-2",
          added ? "bg-blueprint-light text-blueprint" : "text-ink-muted",
        );
        return (
          <div key={r} className="contents">
            <span className={cn(cell, "tabular-nums")}>{d}</span>
            <span className={cn(cell, "flex min-w-0 flex-col")}>
              <span className={cn("truncate", added && "font-semibold")}>
                {t}
              </span>
              <span className="truncate">{o}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
