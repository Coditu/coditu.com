/**
 * Every German string on the site. German is the primary language.
 *
 * ENTWURF — written by the engineering side, not yet edited by a native
 * speaker. `messages/en.ts` must have exactly the same shape (`Messages`).
 *
 * Invent nothing: no metrics, clients, testimonials or promises that are not
 * in docs/00-CONTEXT.md or confirmed by the team. Placeholders that must be
 * filled before a production deploy are written `[PLACEHOLDER: …]`;
 * `scripts/deploy-production.sh` refuses to ship while any are left.
 */
import { CONTACT_EMAIL } from "@/lib/site-config";

export type LegalLine = string | { label: string; href: string };
export type LegalSection = { heading: string; lines: LegalLine[] };

const de = {
  locale: "de-DE",

  meta: {
    title: "Coditu — SharePoint-Webparts und interne Apps",
    description:
      "Coditu entwickelt SharePoint- und SPFx-Webparts und interne Apps für Organisationen in Deutschland. Ein Team von der Skizze bis zum Betrieb.",
    ogAlt: "Coditu — Von der Skizze zur fertigen Software",
  },

  /** Section ids on the home page. Language-specific, so URLs stay German. */
  anchors: {
    services: "leistungen",
    process: "arbeitsweise",
    reference: "referenz",
    team: "team",
    faq: "faq",
    contact: "kontakt",
  },

  skipLink: "Zum Inhalt springen",

  nav: {
    homeLabel: "Coditu Startseite",
    mainLabel: "Hauptnavigation",
    links: [
      { section: "services" as const, label: "Leistungen" },
      { section: "process" as const, label: "Arbeitsweise" },
      { section: "reference" as const, label: "Referenz" },
      { section: "team" as const, label: "Team" },
      { section: "contact" as const, label: "Kontakt" },
    ],
    booking: "Gespräch buchen",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    themeToggle: "Hell / Dunkel umschalten",
    menu: "Menü",
  },

  language: {
    groupLabel: "Sprache",
    /** The other language's name, in that language. */
    switchTo: "English",
  },

  /** Names only; the section text lives with the section. */
  services: [
    "SharePoint & SPFx-Webparts",
    "Interne Apps",
    "Websites & Frontend",
  ],

  /** Hero. ENTWURF — Adam überarbeitet den Text. */
  hero: {
    label: "SharePoint · Interne Apps",
    /** The blue period is added by the component. */
    title: "Von der Skizze zur fertigen Software",
    lead: "Wir bauen Software für soziale Organisationen, Vereine und den Mittelstand. Aus Ihrer Skizze wird eine App, die im Alltag funktioniert. Jeden Schritt sehen Sie auf einem gemeinsamen Board.",
    cta: {
      label: "Projekt anfragen",
      subject: "Projektanfrage",
      body: "Hallo Coditu,\n\nunsere Idee in ein paar Sätzen:\n\n\nGern hängen wir auch ein Foto unserer Skizze an.\n",
    },
    secondary: "So arbeiten wir",
    /**
     * The hero picture: a request in words becomes the app. `[Words]` turn
     * into the app — the first is its title, the rest its fields, one value
     * each. Example data, marked „Beispiel“. Apps of the kinds we really built.
     */
    request: {
      request: "Anfrage per E-Mail",
      example: "Beispiel",
      live: "Live",
      summary: "Beispiel: Aus einer Anfrage in ein paar Sätzen wird eine fertige App.",
      scenarios: [
        {
          request: "Neue Kolleginnen sollen eine [Onboarding-Checkliste] bekommen – mit [Startdatum], [Team] und [Ansprechpartner].",
          values: ["03.11.2026", "Beratung", "Sarah Weber"],
          button: "Anlegen",
        },
        {
          request: "Unsere Intranet-Themen planen wir per E-Mail. Wir brauchen einen [Redaktionsplan] mit [Thema], [Datum] und [Zuständigkeit].",
          values: ["Neue Kantine", "14.11.2026", "Team Kommunikation"],
          button: "Einplanen",
        },
        {
          request: "Alle sollen [Intranet-News] schreiben können – mit [Titel], [Bild] und [Freigabe] durch die Kommunikation.",
          values: ["Sommerfest am 12. Juni", "sommerfest.jpg", "Freigegeben"],
          button: "Veröffentlichen",
        },
      ],
    },
    facts: [
      { id: "T.01", text: "Von der Skizze zur App in wenigen Tagen" },
      { id: "T.02", text: "Sie sehen jeden Schritt im Board" },
      { id: "T.03", text: "Läuft in Ihrem Microsoft 365" },
    ],
    team: {
      listLabel: "Das Team",
      line: "Ihr Team · Berlin · Kairo",
      /** Blocks the production deploy until public/team/<slug>.jpg exist for everyone. */
      photos: "[PLACEHOLDER: Teamfotos]",
      members: [
        { slug: "mohamed-tamer", name: "Mohamed Tamer", role: "Frontend Lead" },
        { slug: "abdelrahman-elkhateeb", name: "Abdelrahman Elkhateeb", role: "Frontend Engineer" },
        { slug: "ahmed-yehia", name: "Ahmed Yehia", role: "Backend & DevOps" },
        { slug: "adam-nafie", name: "Adam Nafie", role: "Kundenbetreuung & Partnerschaften" },
      ],
    },
  },

  /**
   * Services: a showcase with one tab per service. The client's problem in
   * their words, what we build, proof, tech. Every number here is from real sprint data — add none.
   */
  servicesSection: {
    title: "Was wir bauen – und welches Problem es löst",
    intro:
      "Jede Leistung beginnt mit dem Satz, mit dem Kunden zu uns kommen. Darunter: was wir bauen und womit.",
    facts: "Aus der Praxis",
    example: "Beispiel",
    more: { label: "Nicht sicher, was passt? Schicken Sie uns Ihre Skizze.", subject: "Projektanfrage" },
    rows: [
      {
        title: "SharePoint-Webparts",
        problem: "„Unser Intranet ist unübersichtlich und veraltet.“",
        text: "Webparts, die sich in Ihre bestehenden SharePoint-Seiten einfügen.",
        facts: "Über 35 Webparts für eine Organisation · meist 1–2 Tage pro Webpart",
        tags: ["SharePoint", "SPFx", "React", "TypeScript", "Fluent UI"],
      },
      {
        title: "Interne Apps",
        problem: "„Das läuft bei uns noch über Papier, Excel und E-Mail.“",
        text: "Kleine, fokussierte Apps nach Ihrer Skizze – für Anträge, Onboarding oder den Redaktionsplan. Mit Microsoft-Anmeldung und Rechten nach Gruppen.",
        facts: "Erste Version in wenigen Tagen",
        tags: ["React", "Next.js", "Python", "Microsoft Graph"],
      },
      {
        title: "Websites & Frontend",
        problem: "„Unsere Website ist langsam oder wirkt veraltet.“",
        text: "Schnelle Websites und Frontends, gebaut, um bei Google gefunden zu werden.",
        tags: ["Next.js", "React", "Core Web Vitals", "Technisches SEO"],
      },
      {
        title: "Betreuung nach dem Start",
        problem: "„Und wer kümmert sich danach darum?“",
        text: "Wartung, wenn Sie sie brauchen – abgerechnet pro Anfrage.",
        facts:
          "Seit fast einem Jahr wöchentliche Sprints für denselben Kunden · kleine Änderungen meist unter 2 Stunden Aufwand",
        tags: ["Wartung", "Änderungen", "Support"],
      },
    ],
    /** Detail 01: web parts we really built. */
    catalogue: {
      label: "Katalog · Auswahl",
      groups: [
        {
          name: "Neuigkeiten & Kommunikation",
          items: ["News Center", "Banner mit News", "Newspart", "Social Corner", "Instagram-/LinkedIn-Feed", "Hinweis-Banner"],
        },
        {
          name: "Navigation & Suche",
          items: ["Hauptnavigation", "Quick Links", "Link-Karussell", "Link-Kacheln", "Schnellzugriffe", "Finder", "Suchbanner"],
        },
        { name: "Menschen", items: ["Organigramm", "Personenverzeichnis", "Jubiläen", "Kontaktkarten"] },
        {
          name: "Seitenaufbau",
          items: ["Tabs", "Tabs mit Karten", "Akkordeon", "Überschrift & Trenner", "Banner", "Prozess & Zeitleiste", "Kennzahlen"],
        },
        {
          name: "Medien & Beteiligung",
          items: ["Video-Karussell", "Interaktives Video", "Folien", "Umfrage", "Feedback", "Kalender"],
        },
      ],
    },
    /** Detail 02: a small sketch → live pair. `hint` is the sketch, `value` the live example. */
    app: {
      sketch: { label: "Anfrage", id: "A-02", caption: "A · Entwurf", button: "Anfrage senden" },
      live: { title: "Anfrage", login: "Anmeldung mit Microsoft", caption: "B · Ergebnis", button: "Anfrage senden" },
      fields: [
        { label: "Betreff", hint: "Text · Pflichtfeld", value: "Laptop für neue Kollegin" },
        { label: "Team", hint: "Auswahl · Gruppe", value: "Beratung" },
      ],
    },
    /** Detail 03: real projects, public/work/thumbs/<slug>.webp. */
    projects: [
      { slug: "nvrmiss", name: "NVRMiss", line: "Produktseite für eine B2B-Software für Servicebetriebe" },
      { slug: "nile-atelier", name: "Nile Atelier", line: "Website für eine ägyptische Modemarke" },
    ],
    /** Detail 04: example tickets, marked „Beispiel“. */
    changelog: {
      label: "Änderungsprotokoll",
      from: "Änderung",
      to: "Erledigt",
      tickets: [
        { id: "Ä-01", text: "Neuen Link in der Hauptnavigation ergänzen" },
        { id: "Ä-02", text: "Banner auf der Startseite austauschen" },
        { id: "Ä-03", text: "Feld „Kostenstelle“ im Antrag ergänzen" },
      ],
    },
  },

  footer: {
    slogan: "Von der Skizze zur fertigen Software.",
    servicesTitle: "Leistungen",
    legalTitle: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutz",
    contactTitle: "Kontakt",
    languageTitle: "Sprache",
  },

  legal: {
    sheetLabel: "Rechtliches",
    imprint: {
      title: "Impressum",
      description: "Impressum und Anbieterkennzeichnung von Coditu.",
      sections: <LegalSection[]>[
        {
          heading: "Angaben gemäß § 5 DDG",
          lines: [
            "[PLACEHOLDER: Name des Unternehmens und Rechtsform]",
            "[PLACEHOLDER: Straße und Hausnummer]",
            "[PLACEHOLDER: PLZ und Ort]",
            "Deutschland",
          ],
        },
        {
          heading: "Vertreten durch",
          lines: ["[PLACEHOLDER: vertretungsberechtigte Person(en)]"],
        },
        {
          heading: "Kontakt",
          lines: [
            { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
            "[PLACEHOLDER: Telefonnummer]",
          ],
        },
        {
          heading: "Registereintrag",
          lines: ["[PLACEHOLDER: Registergericht und Registernummer, falls vorhanden]"],
        },
        {
          heading: "Umsatzsteuer-ID",
          lines: ["[PLACEHOLDER: Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG, falls vorhanden]"],
        },
        {
          heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
          lines: ["[PLACEHOLDER: Name und Anschrift]"],
        },
        {
          heading: "Verbraucherstreitbeilegung",
          lines: ["[PLACEHOLDER: Hinweis zur Teilnahme an Streitbeilegungsverfahren]"],
        },
      ],
    },
    privacy: {
      title: "Datenschutzerklärung",
      description: "Wie Coditu personenbezogene Daten auf dieser Website verarbeitet.",
      sections: <LegalSection[]>[
        {
          heading: "1. Verantwortlicher",
          lines: [
            "[PLACEHOLDER: Name des Unternehmens und Anschrift]",
            { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
          ],
        },
        {
          heading: "2. Hosting",
          lines: [
            "Diese Website wird bei Vercel Inc. gehostet.",
            "[PLACEHOLDER: Anschrift des Anbieters, Rechtsgrundlage, Auftragsverarbeitungsvertrag und Datenübermittlung in Drittländer]",
          ],
        },
        {
          heading: "3. Server-Logdateien",
          lines: [
            "Beim Aufruf der Website verarbeitet der Hosting-Anbieter technisch notwendige Daten, zum Beispiel IP-Adresse, Datum und Uhrzeit sowie die aufgerufene Seite.",
            "[PLACEHOLDER: Umfang, Rechtsgrundlage und Speicherdauer]",
          ],
        },
        {
          heading: "4. Kontakt per E-Mail",
          lines: [
            "Wenn Sie uns schreiben, verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten.",
            "[PLACEHOLDER: Rechtsgrundlage und Speicherdauer]",
          ],
        },
        {
          heading: "5. Cookies, Schriftarten und Analyse",
          lines: [
            "Diese Website setzt keine Cookies und nutzt keine Analyse- oder Tracking-Werkzeuge.",
            "Schriftarten werden von unserem eigenen Server geladen. Es wird keine Verbindung zu Google aufgebaut.",
          ],
        },
        {
          heading: "6. Ihre Rechte",
          lines: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO).",
            "Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO).",
            "[PLACEHOLDER: zuständige Aufsichtsbehörde]",
          ],
        },
        {
          heading: "Stand",
          lines: ["[PLACEHOLDER: Datum]"],
        },
      ],
    },
  },

  notFound: {
    title: "Seite nicht gefunden",
    body: "Diese Seite gibt es nicht.",
    home: "Zur Startseite",
  },

  error: {
    title: "Die Seite konnte nicht geladen werden.",
    body: "Neu laden ist sicher. Wenn der Fehler bleibt, schreiben Sie uns.",
    retry: "Neu laden",
  },
};

export type Messages = typeof de;

export default de;
