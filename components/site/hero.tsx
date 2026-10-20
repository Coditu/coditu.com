import { existsSync } from "node:fs";
import { join } from "node:path";

import { ButtonLink } from "@/components/ui/button";
import { getMessages, type Locale } from "@/lib/i18n";

import { Container } from "./container";
import { HeroStage } from "./hero-stage/stage.client";

/**
 * Hero: the text on the left, and beside it the one picture of what we do:
 * a client's request by e-mail becomes a sketch, then the app (<HeroStage>).
 * On phones the stage comes after the text. Spec:
 * docs/design-system/components/page-sections.md → Hero.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const h = t.hero;

  return (
    <section aria-labelledby="hero-title">
      <Container>
        <div className="grid gap-12 pt-12 pb-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-6">
            <p className="text-[15px] font-semibold text-blueprint">{h.label}</p>
            <h1 id="hero-title" className="mt-5 max-w-[16ch] text-display text-balance">
              {h.title}
              <span className="text-blueprint">.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-pretty text-ink-muted">{h.lead}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={`#${t.anchors.contact}`} variant="cta" size="lg">
                {h.cta}
              </ButtonLink>
              <ButtonLink href={`#${t.anchors.process}`} variant="outline" size="lg">
                {h.secondary}
              </ButtonLink>
            </div>
            <ul className="mt-12 grid gap-4 border-t border-ink pt-5 sm:grid-cols-3">
              {h.facts.map((fact) => (
                <li key={fact.id} className="text-[15px] leading-snug font-semibold">
                  {fact.text}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ul aria-label={h.team.listLabel} className="flex gap-2">
                {h.team.members.map((member) => (
                  <li key={member.slug}>
                    <TeamTile {...member} />
                  </li>
                ))}
              </ul>
              <p className="font-mono text-label text-ink-muted uppercase">{h.team.line}</p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HeroStage scenarios={h.request.scenarios} labels={h.request} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * A square portrait from public/team/<slug>.jpg, checked at build time. Until
 * it exists: the drawing placeholder from the team-card spec, which must not
 * reach production (`hero.team.photos` holds the deploy).
 */
export function TeamTile({ slug, name, role }: { slug: string; name: string; role: string }) {
  const tooltip = `${name} · ${role}`;
  if (existsSync(join(process.cwd(), "public", "team", `${slug}.jpg`))) {
    return (
      // A 40 px square needs no optimiser, and next/image would add client JS to the hero.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/team/${slug}.jpg`}
        alt={name}
        title={tooltip}
        width={40}
        height={40}
        className="size-10 border border-line object-cover"
      />
    );
  }
  return (
    <span role="img" aria-label={name} title={tooltip} className="block size-10 border border-line bg-surface-sunk text-line-input">
      <svg aria-hidden="true" viewBox="0 0 40 40" className="size-full">
        <path d="M0 0 40 40M40 0 0 40" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
