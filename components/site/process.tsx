import { Clock, PenLine, SquareKanban, Wrench } from "lucide-react";

import { Sheet } from "@/components/blueprint/sheet";
import { Tag } from "@/components/ui/tag";
import { getMessages, type Locale } from "@/lib/i18n";

import { Container } from "./container";
import { ProcessBoard } from "./process-board.client";
import { SectionHeader } from "./section-header";

const STEP_ICONS = [PenLine, Clock, SquareKanban, Wrench];

/**
 * How we work: a read-only example board, then the four steps under it.
 * Spec: kanban.md (board, task card), page-sections.md (section header,
 * feature item), blueprint-motifs.md (sheet, „Beispiel“). The steps reveal
 * one after another on view.
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
          <ProcessBoard columns={b.columns} />
        </Sheet>

        <ol className="mt-12 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li
                key={step.title}
                data-reveal="section"
                data-reveal-on-view
                style={{ animationDelay: `${i * 80}ms` }}
                className="flex items-start gap-4 border-t border-ink py-5"
              >
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
