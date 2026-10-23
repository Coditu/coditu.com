import { ButtonLink, textLink } from "@/components/ui/button";
import { getMessages, type Locale } from "@/lib/i18n";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site-config";

import { Container } from "./container";
import { TeamTile } from "./hero";
import { SectionHeader } from "./section-header";

/**
 * Contact: the email as the one main action, the booking button once there is
 * a booking tool, and the people they will talk to. No form: there is no
 * backend to send it to. Spec: page-sections.md (section header, team).
 */
export function Contact({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const s = t.contactSection;
  const mailto =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(s.email.subject)}` +
    `&body=${encodeURIComponent(s.email.body)}`;
  const members = t.hero.team.members;

  return (
    <section id={t.anchors.contact} aria-labelledby="contact-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader title={s.title} intro={s.intro} headingId="contact-title" />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div data-reveal="section" data-reveal-on-view className="border-t border-ink pt-6 lg:col-span-7">
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={mailto} variant="cta">
                {s.email.label}
              </ButtonLink>
              {BOOKING_URL && (
                <ButtonLink href={BOOKING_URL} variant="outline">
                  {s.booking}
                </ButtonLink>
              )}
            </div>
            <p className="mt-5 text-[15px] text-ink-muted">
              {s.email.or}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={textLink}>
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-1 text-[14px] text-ink-muted">{s.reply}</p>
          </div>

          <div
            data-reveal="section"
            data-reveal-on-view
            style={{ animationDelay: "80ms" }}
            className="flex flex-col lg:col-span-5"
          >
            <People title={s.contactTitle} members={members.filter((m) => m.hub === "berlin")} text={s.contactText} />
            <People title={s.teamTitle} members={members.filter((m) => m.hub === "cairo")} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function People({
  title,
  members,
  text,
}: {
  title: string;
  members: { slug: string; name: string; role: string }[];
  text?: string;
}) {
  return (
    <div className="border-t border-ink py-5">
      <h3 className="font-mono text-label text-ink-muted uppercase">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {members.map((member) => (
          <li key={member.slug} className="flex items-center gap-4">
            {/* The name is written next to it. */}
            <div aria-hidden="true">
              <TeamTile {...member} />
            </div>
            <div>
              <p className="text-[16px] font-semibold">{member.name}</p>
              <p className="text-[14px] text-ink-muted">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
      {text && <p className="mt-4 max-w-[46ch] text-[15px] leading-normal text-ink-muted">{text}</p>}
    </div>
  );
}
