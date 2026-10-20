import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { FRAMES, HeroFrame, type Frame } from "@/components/site/hero-stage/frame";
import type { Scenario } from "@/components/site/hero-stage/scenario";
import de from "@/messages/de";

/**
 * Dev-only review of the hero stage's still frames: every frame at desktop
 * (528 px, the stage at xl) and phone (343 px, a 375 px screen) width, light
 * and dark, side by side. `node scripts/shoot-hero-frames.mjs` screenshots
 * each `[data-shot]` into docs/design-system/hero-frames/.
 */
export default function HeroFramesPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const labels = de.hero.request;
  const [onboarding, plan, news] = labels.scenarios;
  const rows: { id: string; frame: Frame; scenario: Scenario }[] = [
    ...FRAMES.map((frame, i) => ({ id: `f${i + 1}-${frame}`, frame, scenario: news })),
    { id: "result-onboarding", frame: "result", scenario: onboarding },
    { id: "result-redaktionsplan", frame: "result", scenario: plan },
  ];
  // Narrow, the card shows one side: the sketch is paper only; from "filled" on, both sides are worth a look.
  const sides = (frame: Frame): ("paper" | "webpart")[] =>
    frame === "sketch" ? ["paper"] : frame === "filled" || frame === "result" ? ["webpart", "paper"] : ["webpart"];

  return (
    <main className="flex w-max flex-col gap-12 p-8">
      {rows.map(({ id, frame, scenario }) => (
        <section key={id} className="flex flex-col gap-3">
          <h2 className="font-mono text-label uppercase text-ink-muted">{id}</h2>
          <div className="flex items-start gap-6">
            {(["light", "dark"] as const).flatMap((theme) => [
              <Cell key={`${theme}-desktop`} shot={`${id}-desktop-${theme}`} theme={theme} width="w-[528px]">
                <HeroFrame frame={frame} scenario={scenario} labels={labels} />
              </Cell>,
              ...sides(frame).map((side, _, all) => (
                <Cell
                  key={`${theme}-${side}`}
                  shot={`${id}-phone${all.length > 1 ? `-${side}` : ""}-${theme}`}
                  theme={theme}
                  width="w-[343px]"
                >
                  <HeroFrame frame={frame} scenario={scenario} labels={labels} side={side} />
                </Cell>
              )),
            ])}
          </div>
        </section>
      ))}
    </main>
  );
}

function Cell({ shot, theme, width, children }: { shot: string; theme: "light" | "dark"; width: string; children: ReactNode }) {
  return (
    <div data-shot={shot} data-theme={theme} className="flex flex-col gap-2 bg-paper p-4 text-ink">
      <p className="font-mono text-label uppercase text-ink-muted">{shot}</p>
      <div className={width}>{children}</div>
    </div>
  );
}
