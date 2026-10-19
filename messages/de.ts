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
    security: "sicherheit",
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
    blog: "Blog",
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

  /** Hero. ENTWURF — Adam überarbeitet den Text. */
  hero: {
    label: "SharePoint · Interne Apps",
    /** The blue period is added by the component. */
    title: "Von der Skizze zur fertigen Software",
    lead: "Wir bauen Software für soziale Organisationen, Vereine und den Mittelstand. Aus Ihrer Skizze wird eine App, die im Alltag funktioniert. Jeden Schritt sehen Sie auf einem gemeinsamen Board.",
    cta: "Projekt anfragen",
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
        { slug: "mohamed-tamer", hub: "cairo" as const, name: "Mohamed Tamer", role: "Frontend Lead" },
        { slug: "abdelrahman-elkhateeb", hub: "cairo" as const, name: "Abdelrahman Elkhateeb", role: "Frontend Engineer" },
        { slug: "ahmed-yehia", hub: "cairo" as const, name: "Ahmed Yehia", role: "Backend & DevOps" },
        { slug: "adam-nafie", hub: "berlin" as const, name: "Adam Nafie", role: "Kundenbetreuung & Partnerschaften" },
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
        facts: "Kleine Änderungen meist unter 2 Stunden Aufwand",
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
    /** Detail 03 shows `referenceSection.projects`. */
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

  /**
   * How we work: an example board, then the four steps. The board is example
   * data, marked „Beispiel“. Columns in order: Skizze, In Arbeit (active),
   * Review, Live (done). The weekly-sprint proof lives here, not in Services.
   */
  processSection: {
    title: "So arbeiten wir – und Sie sehen jeden Schritt",
    intro:
      "Jede Aufgabe steht auf einem gemeinsamen Board. Sie sehen, was gerade entsteht, was auf Ihr Feedback wartet und was live ist.",
    board: {
      label: "Projektboard",
      example: "Beispiel",
      footer: ["Alle Angaben beispielhaft", "Ansicht für Kunden · nur lesen"],
      columns: [
        {
          name: "Skizze",
          tasks: [
            { title: "Redaktionsplan", tag: "App", who: "Adam Nafie" },
            { title: "Feld „Kostenstelle“ im Antrag", tag: "Änderung", who: "Ahmed Yehia" },
          ],
        },
        {
          name: "In Arbeit",
          tasks: [{ title: "Onboarding-Checkliste", tag: "App", who: "Abdelrahman Elkhateeb" }],
        },
        {
          name: "Review",
          tasks: [
            { title: "Neuer Link in der Hauptnavigation", tag: "Webpart", who: "Mohamed Tamer" },
            { title: "Banner auf der Startseite", tag: "Webpart", who: "Mohamed Tamer" },
          ],
        },
        {
          name: "Live",
          tasks: [{ title: "Intranet-News mit Freigabe", tag: "Webpart", who: "Abdelrahman Elkhateeb" }],
        },
      ],
    },
    proofLabel: "Aus der Praxis",
    steps: [
      {
        title: "Skizze & Gespräch",
        text: "Sie schicken uns eine Skizze, ein Foto oder ein paar Sätze. Im Gespräch klären wir, was die App können muss.",
      },
      {
        title: "Erste Version in wenigen Tagen",
        text: "Zuerst bekommen Sie etwas zum Anklicken. Eine erste App-Version braucht bei uns etwa 10 bis 14 Stunden Arbeit.",
      },
      {
        title: "Wöchentlicher Sprint & Feedback",
        text: "Jede Woche zeigen wir, was fertig ist, und Sie sagen, was sich ändern soll. Das Board zeigt, woran wir gerade arbeiten.",
        proof: "Seit fast einem Jahr wöchentliche Sprints mit demselben Kunden",
      },
      {
        title: "Livegang & Wartung",
        text: "Wenn alles passt, geht die App live. Danach bleiben wir ansprechbar – für Änderungen und Wartung, wenn Sie sie brauchen.",
      },
    ],
  },

  /**
   * Our work: one case study, then two smaller projects. The client stays
   * anonymous — no name, no logo, no screenshot of theirs. Every number is
   * real data from that project; add none. The page drawing is our own,
   * marked „Beispiel“, and shows kinds of web parts, not the client's content.
   */
  referenceSection: {
    title: "Ein Intranet, Woche für Woche gebaut",
    intro:
      "Für eine Organisation in Deutschland bauen und betreuen wir das SharePoint-Intranet. Seit fast einem Jahr, in wöchentlichen Sprints.",
    titleBlock: [
      { label: "Kunde", value: "Eine Organisation in Deutschland" },
      { label: "Projekt", value: "SharePoint-Intranet" },
      { label: "Zeitraum", value: "Fast ein Jahr · wöchentliche Sprints" },
    ],
    footer: ["Kunde anonym", "Abbildung beispielhaft"],
    factsLabel: "Aus dem Projekt",
    facts: [
      { value: "ca. 38", text: "Webparts für eine Organisation" },
      { value: "5–10 Std.", text: "für einen neuen Webpart, meist 1–2 Tage" },
      { value: "10–14 Std.", text: "für die erste Version einer internen App" },
      { value: "≤ 2 Std.", text: "für die meisten Änderungswünsche" },
    ],
    built: [
      {
        title: "Webparts",
        text: "Bausteine, aus denen sich die Seiten des Intranets zusammensetzen.",
        items: ["News & Kommunikation", "Navigation & Suche", "Personen & Organigramm", "Seitenaufbau", "Medien & Umfragen"],
      },
      {
        title: "Interne Apps",
        text: "Eigenständige Apps im Intranet – für die Redaktion und für neue Kolleginnen und Kollegen.",
        items: ["News-Editor", "Redaktionsplan", "Onboarding"],
      },
    ],
    /** Our own drawing of an intranet home page built from web parts. */
    page: {
      example: "Beispiel",
      caption: "Beispiel: eine Intranet-Startseite aus Webparts. Eigene Darstellung, keine Kundendaten.",
      parts: {
        nav: "Hauptnavigation",
        news: "News Center",
        links: "Quick Links",
        people: "Jubiläen",
        events: "Kalender",
      },
    },
    moreTitle: "Weitere Projekte",
    /**
     * Real projects, public/work/thumbs/<slug>.webp. `line` says only what the
     * screenshot shows.
     * TODO(team): NVRMiss — stack, public link and status (live or beta) are
     * not written down anywhere. Add them once confirmed.
     * TODO(team): Nile Atelier — docs/00-CONTEXT.md calls it a "partner portal"
     * (partner onboarding, document routing), but the screenshot is a fashion
     * label's website. Confirm which, plus stack and public link.
     */
    projects: [
      {
        slug: "nvrmiss",
        name: "NVRMiss",
        kind: "Produktseite",
        line: "Produktseite für eine B2B-Software für Servicebetriebe: Funktionen, Ablauf, Preise, FAQ.",
        alt: "Startseite von NVRMiss",
      },
      {
        slug: "nile-atelier",
        name: "Nile Atelier",
        kind: "Website",
        line: "Website für eine ägyptische Modemarke, mit Kollektion und Journal.",
        alt: "Startseite von Nile Atelier",
      },
    ],
  },

  /**
   * Security & data: five points and our own drawing of where the work lives.
   * TODO(team): none of the five points is written down in docs/ yet, so each
   * one carries a visible „[TODO: bestätigen]“ and production refuses to deploy
   * while any is left (scripts/deploy-production.sh). Confirm a point, then
   * delete its marker — or delete the point. Do not soften the wording instead.
   *  1. No client data on Coditu servers — true for every project, not only SPFx?
   *  2. Access only through accounts the client grants, revocable at any time.
   *  3. GDPR, and an AVV signed on request — who signs, which template?
   *  4. Code, docs and full control handed over; no lock-in — in every contract?
   *  5. Keys and passwords in a secret store, never in code or chat — which one?
   */
  securitySection: {
    title: "Was mit Ihren Daten passiert",
    intro: "Wie wir mit Ihren Daten, Ihren Zugängen und Ihrem Code umgehen.",
    points: [
      {
        title: "Ihre Daten bleiben in Ihrem System",
        text: "[TODO: bestätigen] Wo es geht, bauen wir direkt in Ihrem Microsoft 365 und SharePoint. Ihre Daten wandern nicht auf unsere Server.",
      },
      {
        title: "Zugriff nur, wo nötig",
        text: "[TODO: bestätigen] Wir nutzen die Zugänge, die Sie uns geben, und nur für die Arbeit. Sie können sie jederzeit wieder entziehen.",
      },
      {
        title: "DSGVO und AVV",
        text: "[TODO: bestätigen] Wir arbeiten nach der DSGVO. Wenn nötig, schließen wir mit Ihnen einen Auftragsverarbeitungsvertrag (AVV).",
      },
      {
        title: "Saubere Übergabe",
        text: "[TODO: bestätigen] Sie bekommen den Code, die Dokumentation und die volle Kontrolle. Sie sind nicht an uns gebunden.",
      },
      {
        title: "Keine Passwörter im Code",
        text: "[TODO: bestätigen] Schlüssel und Passwörter liegen in einem geschützten Speicher dafür – nie im Code und nie im Chat.",
      },
    ],
    /** Our own drawing: the web parts and apps sit inside the client's tenant. */
    tenant: {
      example: "Beispiel",
      tenant: "Ihr Microsoft 365",
      site: "SharePoint Online",
      parts: ["Webparts", "Interne Apps"],
      us: "Coditu",
      build: "Umsetzung",
      caption: "Beispiel: Webparts und Apps laufen in Ihrem SharePoint. Eigene Darstellung.",
    },
  },

  /**
   * FAQ. Every answer repeats what Services, How we work and Security already
   * say — no new promises. Also the FAQPage JSON-LD, so plain text only.
   * TODO(team): no prices or hourly rate anywhere in docs/, so the cost answer
   * names none. Add a range here once the team decides to publish one.
   * TODO(team): „Wem gehört der Code?“ is Security point 4 — confirm both together.
   * TODO(team): taking over an existing project is not written down anywhere.
   * Confirm the answer or delete the question.
   */
  faqSection: {
    title: "Häufige Fragen",
    intro: "Kurze Antworten zu Kosten, Tempo, Zusammenarbeit und Ihrem Code.",
    items: [
      {
        question: "Was kostet ein Projekt?",
        answer:
          "Wir rechnen nach Aufwand ab. Vor dem Start bekommen Sie von uns eine Schätzung. Kleine Änderungen brauchen meist unter 2 Stunden.",
      },
      {
        question: "Wie schnell gibt es eine erste Version?",
        answer:
          "Ein neuer Webpart braucht meist 1–2 Tage. Die erste Version einer internen App steht in wenigen Tagen.",
      },
      {
        question: "Arbeiten Sie nur mit SharePoint und Microsoft 365?",
        answer:
          "Nein. Wir bauen SharePoint-Webparts, interne Apps, Websites und Frontends – und betreuen sie nach dem Start.",
      },
      {
        question: "Wie läuft die Zusammenarbeit ab?",
        answer:
          "Wir arbeiten in wöchentlichen Sprints. Jede Woche zeigen wir, was fertig ist, und Sie sagen, was sich ändern soll. Dabei haben Sie einen festen Ansprechpartner.",
        link: { section: "process" as const, label: "So arbeiten wir" },
      },
      {
        question: "Sie sitzen in Berlin und Kairo. Wie funktioniert das?",
        answer:
          "Ihr fester Ansprechpartner ist Adam Nafie in Berlin. Zwischen Berlin und Kairo liegt höchstens eine Stunde Zeitunterschied. Gespräche führen wir auf Deutsch oder Englisch.",
      },
      {
        question: "Wem gehört der Code?",
        answer:
          "[TODO: bestätigen] Ihnen. Sie bekommen den Code, die Dokumentation und die volle Kontrolle. Sie sind nicht an uns gebunden.",
      },
      {
        question: "Übernehmen Sie auch ein bestehendes Projekt?",
        answer:
          "[TODO: bestätigen] Das klären wir im Einzelfall. Zuerst sehen wir uns den bestehenden Code an. Dann sagen wir Ihnen, ob wir ihn übernehmen können und mit welchem Aufwand.",
      },
      {
        question: "Was passiert nach dem Livegang?",
        answer:
          "Wir bleiben ansprechbar – für Änderungen und Wartung, wenn Sie sie brauchen. Abgerechnet wird pro Anfrage.",
      },
    ],
  },

  /**
   * Contact: the last section. No form — there is no backend to send it to.
   * TODO(team): the reply time is not written down anywhere. Confirm it or
   * delete the line.
   */
  contactSection: {
    title: "Schicken Sie uns Ihre Anfrage",
    intro: "Ein paar Sätze reichen. Haben Sie eine Skizze oder Dateien, hängen Sie sie gern an.",
    email: {
      label: "E-Mail schreiben",
      subject: "Projektanfrage",
      body: "Hallo Coditu,\n\nunsere Idee in ein paar Sätzen:\n\n\nGern hängen wir auch ein Foto unserer Skizze an.\n",
      or: "Oder direkt an",
    },
    booking: "20-Minuten-Gespräch buchen",
    reply: "[TODO: bestätigen] Antwort in der Regel innerhalb von 1 Werktag.",
    contactTitle: "Ihr Ansprechpartner in Berlin",
    contactText: "Vom ersten Gespräch bis zum Livegang sprechen Sie mit derselben Person.",
    teamTitle: "Ihr Team in Kairo",
  },

  /**
   * The blog: index, article page and the box at the end of each post. The
   * posts themselves are Markdown files in content/blog/de/.
   */
  blog: {
    title: "Blog",
    description:
      "Antworten auf Fragen, die uns Kunden zu SharePoint, SPFx-Webparts, Power Apps und internen Apps stellen.",
    intro: "Kurze Antworten auf die Fragen, die vor einem Projekt kommen: zu SharePoint, Webparts und internen Apps.",
    all: "Alle Artikel",
    updated: "Aktualisiert",
    readingTime: "{minutes} Min. Lesezeit",
    draft: "Entwurf",
    /** Only on previews: production never shows a post under review. */
    draftNote: "Nur in der Vorschau sichtbar, nicht live. Offen: {review}.",
    tableLabel: "Tabelle, seitlich scrollbar",
    end: {
      title: "Passt das zu Ihrem Vorhaben?",
      text: "Schicken Sie uns ein paar Sätze oder eine Skizze. Vor dem Start bekommen Sie von uns eine Schätzung.",
      cta: "Anfrage senden",
      service: "Leistung: {service}",
      reference: "Unsere Referenz",
    },
    /** `{{price:…}}` in a post. The amounts and the switch are in lib/site-config.ts. */
    prices: { webPart: "ab {price}", change: "{price} pro Stunde", onRequest: "Preis auf Anfrage" },
  },

  footer: {
    description: "SharePoint-Webparts, interne Apps und Websites. Ein Team von der Skizze bis zum Betrieb.",
    sectionsTitle: "Übersicht",
    sections: [
      { section: "services" as const, label: "Leistungen" },
      { section: "process" as const, label: "Arbeitsweise" },
      { section: "reference" as const, label: "Referenz" },
      { section: "security" as const, label: "Sicherheit & Daten" },
      { section: "faq" as const, label: "Häufige Fragen" },
      { section: "contact" as const, label: "Kontakt" },
    ],
    locations: "Berlin · Kairo",
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
