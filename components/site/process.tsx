import { Check, Clock, PenLine, SquareKanban, Wrench } from "lucide-react";

import { Sheet } from "@/components/blueprint/sheet";
import { Avatar } from "@/components/ui/avatar";
import { Tag } from "@/components/ui/tag";
import { getMessages, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import { SectionHeader } from "./section-header";

const STEP_ICONS = [PenLine, Clock, SquareKanban, Wrench];
/** Column order is fixed in messages: Skizze, In Arbeit, Review, Live. */
const ACTIVE = 1;
const DONE = 3;

/**
 * How we work: a read-only example board, then the four steps under it.
 * Spec: kanban.md (board, task card), page-sections.md (section header,
 * feature item), blueprint-motifs.md (sheet, „Beispiel“).
 */
export function Process({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const p = t.processSection;
  const b = p.board;

  return (
    <section id={t.anchors.process} aria-labelledby="process-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader title={p.title} intro={p.intro} headingId="process-title" />
        <Sheet className="mt-12" footer={[b.footer[0], b.footer[1]]}>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-label text-ink-muted uppercase">{b.label}</p>
            <Tag variant="example">{b.example}</Tag>
          </div>
          <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {b.columns.map((column, ci) => (
              <section
                key={column.name}
                aria-labelledby={`process-col-${ci}`}
                className="flex flex-col gap-2.5 border border-line bg-paper p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 id={`process-col-${ci}`} className="flex items-center gap-2 text-[14px] font-bold">
                    {ci === ACTIVE && <span aria-hidden="true" className="size-[7px] rounded-full bg-blueprint" />}
                    {column.name}
                  </h3>
                  <span className="font-mono text-label text-ink-muted">
                    {String(column.tasks.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {column.tasks.map((task) => (
                    <li
                      key={task.title}
                      className={cn(
                        "flex flex-col gap-3 rounded-ui border bg-surface p-3.5",
                        ci === ACTIVE ? "border-blueprint" : "border-line"
                      )}
                    >
                      <span className="text-[14px] leading-snug font-semibold">
                        {ci === DONE && (
                          <Check aria-hidden="true" className="mr-2 inline size-4 text-success" strokeWidth={2} />
                        )}
                        {task.title}
                      </span>
                      <div className="flex items-center justify-between gap-2">
                        <Tag>{task.tag}</Tag>
                        <Avatar size="sm" name={task.who} initials={initials(task.who)} />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Sheet>

        <ol className="mt-12 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li key={step.title} className="flex items-start gap-4 border-t border-ink py-5">
                <span className="inline-flex size-[46px] flex-none items-center justify-center border border-blueprint text-blueprint">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.4} />
                </span>
                <div>
                  <p className="font-mono text-label text-blueprint uppercase">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-[18px] leading-snug font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-normal text-ink-muted">{step.text}</p>
                  {step.proof && (
                    <div className="mt-4 border-t border-line pt-3">
                      <p className="font-mono text-label text-blueprint uppercase">{p.proofLabel}</p>
                      <p className="mt-1 text-[15px] leading-snug font-semibold">{step.proof}</p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** "Mohamed Tamer" → "MT" */
function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}
