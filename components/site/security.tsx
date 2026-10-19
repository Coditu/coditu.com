import { Database, FolderGit2, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";

import { Connector } from "@/components/blueprint/connector";
import { Tag } from "@/components/ui/tag";
import { getMessages, type Locale } from "@/lib/i18n";

import { Container } from "./container";
import { SectionHeader } from "./section-header";

type S = ReturnType<typeof getMessages>["securitySection"];

const POINT_ICONS = [Database, KeyRound, ShieldCheck, FolderGit2, LockKeyhole];

/**
 * Security & data: the points as feature items, next to our own drawing of
 * the client's tenant with our work inside it. Spec: page-sections.md
 * (section header, feature item), blueprint-motifs.md (connector, „Beispiel“).
 */
export function Security({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const s = t.securitySection;

  return (
    <section id={t.anchors.security} aria-labelledby="security-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader title={s.title} intro={s.intro} headingId="security-title" />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7">
            {s.points.map((point, i) => {
              const Icon = POINT_ICONS[i];
              return (
                <li
                  key={point.title}
                  data-reveal="section"
                  data-reveal-on-view
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="flex items-start gap-4 border-t border-ink py-5"
                >
                  <span className="inline-flex size-[46px] flex-none items-center justify-center border border-blueprint text-blueprint">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.4} />
                  </span>
                  <div>
                    <h3 className="text-[18px] leading-snug font-bold">{point.title}</h3>
                    <p className="mt-1.5 max-w-[56ch] text-[15px] leading-normal text-ink-muted">{point.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="lg:col-span-5">
            <Tenant tenant={s.tenant} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The client's tenant as a boundary, our web parts and apps inside, Coditu outside. */
function Tenant({ tenant }: { tenant: S["tenant"] }) {
  return (
    <figure className="flex flex-col gap-3">
      <Tag variant="example">{tenant.example}</Tag>
      <div aria-hidden="true" className="flex flex-col items-center">
        <div className="w-full border border-blueprint bg-paper p-3 sm:p-4">
          <span className="font-mono text-label text-blueprint uppercase">{tenant.tenant}</span>
          <div className="mt-3 flex flex-col gap-3 border border-line bg-surface p-3 shadow-lift">
            <span className="font-mono text-label text-ink-muted uppercase">{tenant.site}</span>
            <div className="grid grid-cols-2 gap-3">
              {tenant.parts.map((part) => (
                <div key={part} className="flex flex-col gap-2.5 border border-dashed border-blueprint/60 p-3">
                  <span className="font-mono text-label text-blueprint uppercase">{part}</span>
                  <span className="block h-1.5 w-4/5 bg-line" />
                  <span className="block h-1.5 w-3/5 bg-line" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Rotated to point up into the tenant; py-3 makes room for the turn. */}
        <div className="relative py-3">
          <Connector className="-rotate-90" />
          <span className="absolute top-1/2 left-full -translate-y-1/2 font-mono text-label text-blueprint uppercase">
            {tenant.build}
          </span>
        </div>
        <span className="border border-ink bg-surface px-4 py-2 font-mono text-label uppercase">{tenant.us}</span>
      </div>
      <figcaption className="text-[14px] leading-snug text-ink-muted">{tenant.caption}</figcaption>
    </figure>
  );
}
