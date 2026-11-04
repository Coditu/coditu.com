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
    ogAlt: "Coditu — Sie wählen die Bausteine, wir bauen Ihre App",
  },

  /** Section ids on the home page. Language-specific, so URLs stay German. */
  anchors: {
    services: "leistungen",
    intranet: "intranet",
    baukasten: "baukasten",
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
    themeToggle: "Hell / Dunkel umschalten",
    linkedin: "Coditu auf LinkedIn",
    menu: "Menü",
  },

  language: {
    groupLabel: "Sprache",
    /** The other language's name, in that language. */
    switchTo: "English",
  },

  /**
   * The intent-triggered offer panel (components/site/offer-panel.client.tsx):
   * bottom-right on desktop, a sticky bar on mobile, shown once per visitor
   * after 40 % scroll, 25 s, or exit-intent, never again once dismissed. The
   * one public offer, unchanged everywhere it appears — docs/02-POSITIONING.md
   * "The offer panel" and "The free offer". Reuses the free-task mailto flow
   * (see `hero.freeTask`), marked „Panel" the way the intranet section marks
   * its own copy „Intranet".
   */
  panelSection: {
    title: "Ein Webpart. Kostenlos. In 3 Tagen.",
    fine: "1 Webpart pro Kunde · in bis zu 3 Tagen",
    cta: "Kostenlos anfragen",
    close: "Angebot schließen",
    subject: "Kleine Aufgabe gratis – Panel",
    body: "Hallo Coditu,\n\nunser kostenloses Webpart (Screenshot oder Beschreibung):\n\n\nWo es laufen soll (z. B. SharePoint):\n",
  },

  /**
   * Hero. ENTWURF — Adam überarbeitet den Text.
   * docs/02-POSITIONING.md: the Baukasten headline, not a workflow claim —
   * the only line a competitor cannot copy by rewriting their own headline.
   */
  hero: {
    label: "SharePoint · Interne Apps",
    /**
     * The blue period is added by the component, after whatever is here —
     * written with no trailing period so it lands on "App".
     */
    title: "Sie wählen die Bausteine. Wir bauen Ihre App",
    lead: "Wir bauen interne Software für kleine und mittlere Unternehmen: fertige Bausteine für Ihr Microsoft 365, in Ihrem Design, mit Ihrem Login. Jeden Schritt sehen Sie auf einem gemeinsamen Board.",
    /**
     * The free small task: one per client, one screen or one feature, in up to
     * 3 days. Not a demo: we build what they ask for. The CTA opens a mail
     * whose subject sets these requests apart from „Projektanfrage“.
     */
    cta: "Kleine Aufgabe gratis sichern",
    freeTask: {
      line: "Schicken Sie uns eine kleine Anfrage, wir setzen sie kostenlos um.",
      fine: "1 Aufgabe pro Kunde · ein Screen oder eine Funktion · in bis zu 3 Tagen",
      subject: "Kleine Aufgabe gratis",
      body: "Hallo Coditu,\n\nunsere kleine Aufgabe (ein Screen oder eine Funktion):\n\n\nWo sie laufen soll (z. B. SharePoint):\n",
    },
    booking: "Gespräch buchen",
    /**
     * The hero picture: you pick building blocks, they become a booking app.
     * Example data, marked „Beispiel“; close to a kind of app we really built
     * (NVRMiss: booking and calendar) and to the real Baukasten (see
     * `baukastenSection`) — "Dashboard", "Freigabe" etc. are real block
     * categories named there too, not invented for this picture.
     */
    request: {
      example: "Beispiel",
      summary: "Beispiel: Aus Bausteinen entsteht eine Buchungs-App – mit Dashboard, Buchungen, Kalender und Login.",
      picker: {
        title: "Baukasten",
        hint: "Bausteine wählen",
        /**
         * The four blocks you "pick"; they fly into the app, in this order:
         * its page title, the bookings table, the calendar card, the
         * sign-in. Exactly four — the app has four places.
         */
        blocks: ["Dashboard", "Buchungen", "Kalender", "Login"],
        /** More of the catalogue, shown but never picked — texture, not story. */
        more: ["Formular", "Freigabe", "Verzeichnis"],
      },
      app: {
        name: "Raumbuchung",
        /** The logged-in avatar's initials — example data, no real person. */
        initials: "AB",
        live: "Live",
        nav: ["Übersicht", "Räume", "Team"],
        newBooking: "Neue Buchung",
        stats: [
          { label: "Heute", value: "6" },
          { label: "Freie Räume", value: "3" },
        ],
        /** Monday to Friday; the calendar card marks Thursday as today. */
        days: ["Mo", "Di", "Mi", "Do", "Fr"],
        columns: ["Raum", "Zeit", "Status"],
        confirmed: "Bestätigt",
        pending: "Offen",
        rows: [
          { room: "Raum 1", time: "09:00", pending: false },
          { room: "Raum 2", time: "11:30", pending: false },
          { room: "Saal", time: "14:00", pending: true },
        ],
      },
    },
    facts: [
      { id: "T.01", text: "Erste App in 1–3 Tagen" },
      { id: "T.02", text: "Sie sehen jeden Schritt im Board" },
      { id: "T.03", text: "Läuft in Ihrem Microsoft 365" },
    ],
    team: {
      listLabel: "Das Team",
      line: "Ihr Team · Berlin · Kairo",
      members: [
        { slug: "mohamed-tamer", hub: "cairo" as const, name: "Mohamed Tamer", role: "Frontend Lead" },
        { slug: "abdelrahman-elkhateeb", hub: "cairo" as const, name: "Abdelrahman Elkhateeb", role: "Frontend Engineer" },
        { slug: "ahmed-yehia", hub: "cairo" as const, name: "Ahmed Yehia", role: "Backend & DevOps" },
        { slug: "adam-nafie", hub: "berlin" as const, name: "Adam Nafie", role: "Kundenbetreuung & Partnerschaften" },
      ],
    },
  },

  /**
   * Services: one card per kind of work, each with a coded mockup of a real
   * project, rebuilt with example data (no client names, no real people).
   * `rows[0]` and `rows[1]` are linked from blog posts (`service:` in
   * content/blog) — keep that order. `labels` are the callouts on the mockup,
   * in the order the component pins them. The one number here is from real
   * sprint data — add none.
   */
  servicesSection: {
    title: "Was wir bauen – und welches Problem es löst",
    intro: "Drei Beispiele aus echten Projekten, nachgebaut mit Beispieldaten.",
    caption: "Nachbau · Beispieldaten",
    result: "Ergebnis",
    more: { label: "Nicht sicher, was passt? Schicken Sie uns Ihre Skizze.", subject: "Projektidee" },
    rows: [
      {
        title: "SharePoint-Webparts",
        problem: "„Unser Intranet ist unübersichtlich und veraltet.“",
        text: "Webparts, die sich in Ihre bestehenden SharePoint-Seiten einfügen und Ihre Listen live zeigen.",
        result: "Über 40 Webparts für eine Organisation, meist 1–2 Tage pro Webpart.",
        labels: ["Filter nach Bereich", "Vier Wochen im Blick", "Live aus SharePoint"],
        summary:
          "Nachbau eines Kalender-Webparts im Intranet: ein Filter nach Bereich, vier Wochen mit markierten Terminen und daneben die nächsten Termine aus einer SharePoint-Liste.",
      },
      {
        title: "Interne Apps",
        problem: "„Das läuft bei uns noch über Papier, Excel und E-Mail.“",
        text: "Kleine, fokussierte Apps nach Ihrer Skizze – für Anträge, Onboarding oder den Redaktionsplan.",
        result: "Erste Version in 1–2 Tagen, mit Microsoft-Login und Rechten nach Gruppen.",
        labels: ["Login mit Microsoft", "Daten in SharePoint", "Status auf einen Blick"],
        summary:
          "Nachbau eines Redaktionsplans: angemeldet mit Microsoft, eine Woche mit einer Zeile je Kanal, jeder Beitrag mit Bereich, Status und Redakteurin.",
      },
      {
        title: "Websites & Web-Apps",
        problem: "„Unsere Website ist langsam oder wirkt veraltet.“",
        text: "Schnelle Websites und Produktseiten, gebaut, um bei Google gefunden zu werden.",
        result: "Eine Seite, die sofort sagt, was Sie anbieten – auf dem Handy wie am Schreibtisch.",
        labels: ["Klare Botschaft", "Produkt statt Stockfoto", "Ein nächster Schritt"],
        summary:
          "Nachbau der Startseite von NVRMiss: eine Überschrift, ein Button für den Beta-Zugang und kleine Einblicke ins Produkt – Anrufe, Erinnerungen, Kalender.",
      },
    ],
    /** Mockup 01: the SPFx calendar web part. Day numbers and dots are in the component. */
    calendar: {
      site: "Intranet",
      page: "Startseite",
      search: "Suchen",
      title: "Termine",
      filterLabel: "Bereich",
      filter: "Alle Bereiche",
      range: "Okt. – Nov. 2026",
      weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
      place: "Ort",
      events: [
        { date: "22.10.", title: "Teamtag Verwaltung", time: "09:00 – 12:00", area: "Verwaltung", place: "Raum 2.14" },
        { date: "23.10.", title: "Infoabend Ausbildung", time: "17:30 – 19:00", area: "Bildung", place: "Aula" },
        { date: "27.10.", title: "Erste-Hilfe-Kurs", time: "Ganztägig", area: "Pflege", place: "Haus B" },
      ],
    },
    /** Mockup 02: the editorial planner. `channel` and `day` index the lists, `status` indexes `statuses`. */
    planner: {
      app: "Redaktionsplan",
      login: "Microsoft",
      initials: "MB",
      today: "Heute",
      range: "19.–23. Okt. 2026",
      add: "Beitrag planen",
      days: ["Mo 19.", "Di 20.", "Mi 21.", "Do 22.", "Fr 23."],
      channels: ["Veranstaltungen", "LinkedIn", "Instagram", "Newsletter"],
      statuses: ["Geplant", "Entwurf", "Veröffentlicht"],
      entries: [
        { channel: 0, day: 0, title: "Tag der offenen Tür", area: "Bildung", status: 2, editor: "Jonas B." },
        { channel: 0, day: 3, title: "Erste-Hilfe-Kurs", area: "Pflege", status: 0, editor: "Jonas B." },
        { channel: 1, day: 1, title: "Neue Kita eröffnet", area: "Jugend", status: 2, editor: "Lena K." },
        { channel: 1, day: 3, title: "Wir suchen Pflegekräfte", area: "Pflege", status: 1, editor: "Mia B." },
        { channel: 2, day: 0, title: "Ein Tag in Haus B", area: "Pflege", status: 2, editor: "Lena K." },
        { channel: 2, day: 2, title: "Ausbildung in 60 Sekunden", area: "Bildung", status: 1, editor: "Jonas B." },
        { channel: 3, day: 4, title: "Newsletter Oktober", area: "Verwaltung", status: 0, editor: "Mia B." },
      ],
    },
    /** Mockup 03: the NVRMiss home page, in our German rendering. */
    website: {
      brand: "NVRMiss",
      nav: ["Funktionen", "Ablauf", "Preise", "FAQ"],
      demo: "Demo anfragen",
      badge: "Bald verfügbar · Offene Beta",
      headline: ["Kein Anruf verpasst.", "Kein Auftrag verpasst."],
      lead: "Nimmt Anrufe rund um die Uhr an, prüft die Anfrage und bucht den Termin – während Sie arbeiten.",
      cta: "Beta-Zugang sichern",
      secondary: "Demo ansehen",
      fine: "Ohne Kreditkarte · in Minuten eingerichtet",
      calls: {
        title: "Anrufe heute",
        rows: [
          { text: "Wasserschaden Bad", status: "Gebucht" },
          { text: "Angebot Heizung", status: "Rückruf" },
        ],
      },
      reminder: { title: "Erinnerung", text: "Wartung Klimaanlage", time: "14:30 – 15:30" },
      sync: { title: "Kalender-Sync", text: "Google · Outlook" },
    },
  },

  /**
   * The intranet offer, our flagship: old SharePoint web parts redesigned, an
   * admin app for news, data stays in the client's Microsoft 365. Mockups are
   * example data (no client, no real people), modelled on a news web part and
   * news admin we really built. The CTA is the hero's free small task, with
   * the same subject plus „Intranet“: one offer, not two.
   */
  intranetSection: {
    title: "Ihr Intranet, neu gedacht",
    intro: "Viele SharePoint-Intranets wirken veraltet und sind im Alltag mühsam zu bedienen.",
    caption: "Beispiel · Beispieldaten",
    /** The three posts on the news page, before and after, and on the live intranet under the new one. */
    news: [
      {
        title: "Neue Kantine in Haus B ab 2. November",
        area: "Verwaltung",
        date: "21.10.2026",
        by: "Kommunikation",
        teaser: "Mittagessen gibt es dann von 11:30 bis 14:00 Uhr. Die Speisekarte steht jede Woche hier im Intranet.",
      },
      {
        title: "Erste-Hilfe-Kurse: neue Termine",
        area: "Pflege",
        date: "19.10.2026",
        by: "Fortbildung",
        teaser: "Für November und Dezember gibt es neue Termine. Die Anmeldung läuft über Ihre Leitung.",
      },
      {
        title: "Mobiles Arbeiten: Was sich ändert",
        area: "Personal",
        date: "15.10.2026",
        by: "Personalabteilung",
        teaser: "Ab Januar gilt eine neue Vereinbarung. Die wichtigsten Punkte haben wir kurz zusammengefasst.",
      },
    ],
    compare: {
      before: "Vorher",
      after: "Nachher",
      control: "Vorher und Nachher vergleichen",
      hint: "Zum Vergleichen ziehen",
      summary:
        "Beispiel: dieselbe News-Seite zweimal. Vorher ein klassisches SharePoint-Intranet mit grauer Leiste, Linkliste und kleiner Tabelle, nachher unser Design mit Bereichsfilter und großen Karten.",
    },
    /** The „before“: generic classic SharePoint, no Microsoft names or marks. */
    classic: {
      site: "Intranet",
      suite: ["Websites", "Dokumente"],
      tabs: ["Durchsuchen", "Seite"],
      actions: ["Freigeben", "Folgen", "Bearbeiten"],
      breadcrumb: "Startseite › Neuigkeiten",
      nav: ["Startseite", "Neuigkeiten", "Dokumente", "Termine", "Kontakte", "Websiteinhalte"],
      heading: "Neuigkeiten",
      add: "Neues Element",
      columns: ["Titel", "Geändert", "Geändert von"],
    },
    modern: {
      site: "Intranet",
      nav: ["Start", "Aktuelles", "Termine", "Team"],
      search: "Suchen",
      heading: "Aktuelles",
      filters: ["Alle", "Verwaltung", "Pflege", "Personal"],
      read: "Weiterlesen",
      more: "Alle News",
    },
    /** Staff publish a post in the admin; it appears on the intranet next to it. */
    admin: {
      app: "News-Redaktion",
      login: "Microsoft",
      initials: "LK",
      heading: "Beitrag bearbeiten",
      draft: "Entwurf",
      published: "Veröffentlicht",
      fields: { area: "Bereich", title: "Titel", teaser: "Teaser", date: "Datum" },
      post: {
        title: "Grippeimpfung im Haus ab 3. November",
        area: "Personal",
        date: "23.10.2026",
        by: "Personalabteilung",
        teaser: "Der Betriebsarzt impft an drei Tagen in Haus A. Bitte melden Sie sich bis zum 30. Oktober an.",
      },
      save: "Als Entwurf speichern",
      publish: "Veröffentlichen",
      done: "Jetzt im Intranet sichtbar",
      page: "Startseite",
      fresh: "Neu",
      summary:
        "Beispiel: Eine Mitarbeiterin bearbeitet in unserer Redaktions-App einen News-Beitrag und veröffentlicht ihn. Daneben erscheint er oben auf der Startseite des Intranets.",
    },
    trust: [
      { title: "Bleibt in Ihrem Microsoft 365", text: "Beiträge, Termine und Seiten liegen weiter in Ihren SharePoint-Listen." },
      { title: "Gleicher Login, gleiche Rechte", text: "Ihr Team meldet sich mit dem Microsoft-Konto an. Wer was bearbeiten darf, regeln Ihre Gruppen." },
      { title: "Keine Migration nötig", text: "Ihre Inhalte bleiben, wo sie sind. Wir erneuern die Oberfläche." },
    ],
    stepsTitle: "So läuft es ab",
    steps: [
      { title: "Screenshot schicken", text: "Ein Bild von einem alten Webpart genügt für den Anfang." },
      { title: "Kostenlos neu gestalten", text: "Wir gestalten es neu und zeigen Ihnen das Ergebnis, in bis zu 3 Tagen." },
      { title: "Den Rest modernisieren", text: "Gefällt es Ihnen, erneuern wir Schritt für Schritt Ihr ganzes Intranet." },
    ],
    cta: "Webpart kostenlos neu gestalten lassen",
    fine: "Ihre kleine Gratis-Aufgabe · 1 pro Kunde · in bis zu 3 Tagen",
    subject: "Kleine Aufgabe gratis – Intranet",
    body: "Hallo Coditu,\n\nbitte gestalten Sie dieses Webpart kostenlos neu (Screenshot im Anhang).\n\nWas uns daran stört:\n\n",
  },

  /**
   * The Baukasten: our flagship offer (docs/02-POSITIONING.md "Baukasten
   * permissions" — full anonymised description cleared by the team). The
   * client stays anonymous — no name, no logo — per docs/00-CONTEXT.md rule
   * 5 (the EVIM mark is third-party and does not go on the public site
   * without their written permission). "6+ apps" and the four app types are
   * real, from docs/02-POSITIONING.md; add nothing beyond them.
   */
  baukastenSection: {
    title: "Der Baukasten",
    intro:
      "Unser Flaggschiff: eine Bibliothek aus Bausteinen für Ihr Microsoft 365 – in Ihrem Design, mit Ihrem Login, auf Ihrem Server.",
    points: [
      {
        title: "Bausteine, die zusammenpassen",
        text: "React-Komponenten in Ihrem Design, die sich wie Bausteine zusammenstecken lassen – ein Formular, eine Freigabe, ein Dashboard.",
      },
      {
        title: "Anmeldung mit Microsoft Entra",
        text: "Jede Person meldet sich mit ihrem Microsoft-Konto an und sieht nur, was ihre Rechte erlauben.",
      },
      {
        title: "Auf Ihrem eigenen Server",
        text: "Läuft auf Ihrer Intranet-Domain. Ihre Daten verlassen Ihr System nicht.",
      },
      {
        title: "Für Anträge, Freigaben und mehr",
        text: "Formulare, Freigaben, Dashboards und Verzeichnisse – aus denselben Bausteinen zusammengesetzt.",
      },
    ],
    proof: {
      label: "Im Einsatz",
      stat: "6+ Apps",
      statText: "bei einer Organisation in Deutschland",
      types: ["Anfragen", "Onboarding", "News-Redaktion", "Redaktionskalender"],
      caption: "Nur beispielhaft, keine echten Kundendaten.",
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
        title: "Erste Version in 1–2 Tagen",
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
      { value: "über 40", text: "Webparts für eine Organisation" },
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
   * Security & data: four confirmed points and our own drawing of where the
   * work lives. See docs/02-POSITIONING.md "DSGVO and security claims" for
   * what is confirmed. A fifth point was cut rather than published
   * unconfirmed — add it back once the team confirms it.
   */
  securitySection: {
    title: "Was mit Ihren Daten passiert",
    intro: "Wie wir mit Ihren Daten, Ihren Zugängen und Ihrem Code umgehen.",
    points: [
      {
        title: "Ihre Daten bleiben in Ihrem System",
        text: "Wir bauen direkt in Ihrem Microsoft 365 und SharePoint. Ihre Daten liegen bei Microsoft, nicht bei uns – wir haben keine eigenen Server dafür.",
      },
      {
        title: "Rechte bleiben in Ihrer Hand",
        text: "Sie geben uns Zugriff auf Ihr Microsoft 365. Wer was sehen und bearbeiten darf, regeln Ihre eigenen Berechtigungsgruppen.",
      },
      {
        title: "Saubere Übergabe",
        text: "Sie bekommen den Code, die Dokumentation und die volle Kontrolle. Sie sind nicht an uns gebunden.",
      },
      {
        title: "Keine Passwörter im Code",
        text: "Schlüssel und Passwörter liegen in einem eigenen, geschützten Speicher – nie im Code und nie im Chat.",
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
   * Keyword landing pages (app/[lang]/services/[slug]/page.tsx) —
   * docs/02-POSITIONING.md "Search" phase 2, from the playbook's move #7:
   * "one landing page each for terms like 'SPFx Entwickler' and
   * 'SharePoint Webparts entwickeln lassen'". `slug` is per language, on
   * purpose a real localized URL segment — the keyword IS the point here.
   * Every fact repeats what's already published elsewhere (servicesSection,
   * referenceSection) — invent nothing new for SEO's sake. No price figures:
   * see "Prices" in docs/02-POSITIONING.md for why the site states only that
   * rates are below the German market average, never a number.
   * Add a new key here, its slug in both files, and its entry in
   * `lib/landing-pages.ts`'s registry, to add a page.
   */
  landingPages: {
    sharepointWebparts: {
      slug: "sharepoint-webparts-entwickeln-lassen",
      meta: {
        title: "SharePoint-Webparts entwickeln lassen",
        description:
          "SharePoint- und SPFx-Webparts für Ihr Intranet, in Ihrem Design, live aus Ihren SharePoint-Listen. Meist 1–2 Tage pro Webpart, zu Sätzen unter dem deutschen Marktdurchschnitt.",
      },
      title: "SharePoint-Webparts entwickeln lassen",
      intro:
        "Veraltete oder starre Webparts in Ihrem Intranet? Wir gestalten sie neu – in Ihrem Design, live aus Ihren bestehenden SharePoint-Listen.",
      points: [
        {
          title: "In Ihrem Design",
          text: "Kein Standard-Layout. Jedes Webpart wird nach Ihrer Marke und Ihrem Intranet gestaltet.",
        },
        {
          title: "Live aus SharePoint",
          text: "Keine Kopie der Daten. Ihre Listen bleiben die Quelle, das Webpart zeigt sie nur neu an.",
        },
        {
          title: "Meist 1–2 Tage",
          text: "Ein einzelnes Webpart braucht selten länger – siehe die Zahlen unten, aus einem echten Projekt.",
        },
      ],
      proofLabel: "Aus einem echten Projekt",
      priceLine: "Der Preis richtet sich nach dem Aufwand – unsere Sätze liegen unter dem deutschen Marktdurchschnitt.",
      cta: "Webpart kostenlos neu gestalten lassen",
      subject: "Kleine Aufgabe gratis – SharePoint Webparts",
      body: "Hallo Coditu,\n\nbitte gestalten Sie dieses Webpart kostenlos neu (Screenshot im Anhang).\n\nWas uns daran stört:\n\n",
    },
    spfxDeveloper: {
      slug: "spfx-entwickler",
      meta: {
        title: "SPFx-Entwickler",
        description:
          "SPFx-Entwicklung für SharePoint und Microsoft 365: ein Team, keine Subunternehmer, wöchentliche Sprints, zu Sätzen unter dem deutschen Marktdurchschnitt.",
      },
      title: "SPFx-Entwickler",
      intro:
        "Auf der Suche nach SPFx-Entwicklung für Ihr SharePoint? Wir übernehmen Konzept, Umsetzung und Betrieb – als ein Team, nicht als Subunternehmer.",
      points: [
        {
          title: "Ein Team, keine Subunternehmer",
          text: "Dieselben Leute von der ersten Skizze bis zum Betrieb danach. Nichts wird weitergereicht.",
        },
        {
          title: "Wöchentliche Sprints",
          text: "Jede Woche zeigen wir, was fertig ist, auf einem gemeinsamen Board. Sie sagen, was sich ändern soll.",
        },
        {
          title: "Berlin · Kairo",
          text: "Ihr fester Ansprechpartner sitzt in Berlin. Zwischen Berlin und Kairo liegt höchstens eine Stunde Zeitunterschied.",
        },
      ],
      proofLabel: "Aus einem echten Projekt",
      priceLine: "Wir rechnen nach Aufwand ab – stundenweise oder zum Festpreis je Webpart oder Projekt, zu Sätzen unter dem deutschen Marktdurchschnitt.",
      cta: "Kleine Aufgabe gratis sichern",
      subject: "Kleine Aufgabe gratis – SPFx",
      body: "Hallo Coditu,\n\nunsere kleine Aufgabe (ein Screen oder eine Funktion):\n\n\nWo sie laufen soll (z. B. SharePoint):\n",
    },
    berlin: {
      slug: "sharepoint-entwicklung-berlin",
      meta: {
        title: "SharePoint-Entwicklung Berlin",
        description: "SharePoint- und SPFx-Entwicklung mit festem Ansprechpartner in Berlin. Wöchentliche Sprints, zu Sätzen unter dem deutschen Marktdurchschnitt.",
      },
      title: "SharePoint-Entwicklung Berlin",
      intro:
        "Auf der Suche nach SharePoint- oder SPFx-Entwicklung mit einem Ansprechpartner in Berlin? Ihr fester Kontakt sitzt in Berlin, das Entwicklungsteam arbeitet remote aus Kairo – als ein Team, nicht als Subunternehmer.",
      points: [
        {
          title: "Ansprechpartner in Berlin",
          text: "Adam Nafie ist Ihr fester Ansprechpartner, von der ersten Skizze bis zum Betrieb danach.",
        },
        {
          title: "Wöchentliche Sprints",
          text: "Jede Woche zeigen wir, was fertig ist, auf einem gemeinsamen Board. Sie sagen, was sich ändern soll.",
        },
        {
          title: "Ein Team, keine Subunternehmer",
          text: "Dieselben Leute von der ersten Skizze bis zum Betrieb danach. Nichts wird weitergereicht.",
        },
      ],
      proofLabel: "Aus einem echten Projekt",
      priceLine: "Der Preis richtet sich nach dem Aufwand – unsere Sätze liegen unter dem deutschen Marktdurchschnitt.",
      cta: "Kleine Aufgabe gratis sichern",
      subject: "Kleine Aufgabe gratis – Berlin",
      body: "Hallo Coditu,\n\nunsere kleine Aufgabe (ein Screen oder eine Funktion):\n\n\nWo sie laufen soll (z. B. SharePoint):\n",
    },
    bavaria: {
      slug: "sharepoint-entwicklung-bayern",
      meta: {
        title: "SharePoint-Entwicklung Bayern",
        description:
          "SharePoint- und SPFx-Entwicklung für Unternehmen in Bayern. Projekte können über das Förderprogramm Digitalbonus.Bayern förderfähig sein. Sätze unter dem deutschen Marktdurchschnitt.",
      },
      title: "SharePoint-Entwicklung Bayern",
      intro:
        "Auf der Suche nach SharePoint- oder SPFx-Entwicklung für Ihr Unternehmen in Bayern? Wir bauen Webparts, interne Apps und Websites – als ein Team, von der ersten Skizze bis zum Betrieb danach.",
      points: [
        {
          title: "Förderfähig über Digitalbonus.Bayern",
          text: "Für bayerische KMU mit bis zu 249 Mitarbeitenden gibt es das öffentliche Förderprogramm Digitalbonus.Bayern, das noch bis Ende 2027 läuft. Ob Ihr Projekt förderfähig ist, prüfen Sie direkt beim Freistaat Bayern.",
        },
        {
          title: "Wöchentliche Sprints",
          text: "Jede Woche zeigen wir, was fertig ist, auf einem gemeinsamen Board. Sie sagen, was sich ändern soll.",
        },
        {
          title: "Berlin · Kairo",
          text: "Ihr fester Ansprechpartner sitzt in Berlin. Zwischen Berlin und Kairo liegt höchstens eine Stunde Zeitunterschied.",
        },
      ],
      proofLabel: "Aus einem echten Projekt",
      priceLine: "Der Preis richtet sich nach dem Aufwand – unsere Sätze liegen unter dem deutschen Marktdurchschnitt.",
      cta: "Kleine Aufgabe gratis sichern",
      subject: "Kleine Aufgabe gratis – Bayern",
      body: "Hallo Coditu,\n\nunsere kleine Aufgabe (ein Screen oder eine Funktion):\n\n\nWo sie laufen soll (z. B. SharePoint):\n",
    },
    nrw: {
      slug: "sharepoint-entwicklung-nrw",
      meta: {
        title: "SharePoint-Entwicklung Nordrhein-Westfalen",
        description: "SharePoint- und SPFx-Entwicklung für Unternehmen in Nordrhein-Westfalen. Wöchentliche Sprints, zu Sätzen unter dem deutschen Marktdurchschnitt.",
      },
      title: "SharePoint-Entwicklung Nordrhein-Westfalen",
      intro:
        "Auf der Suche nach SharePoint- oder SPFx-Entwicklung für Ihr Unternehmen in Nordrhein-Westfalen? Wir bauen Webparts, interne Apps und Websites – als ein Team, von der ersten Skizze bis zum Betrieb danach.",
      points: [
        {
          title: "Remote aus Berlin und Kairo",
          text: "Kein Pendeln für einen Vor-Ort-Termin nötig: Ihr fester Ansprechpartner sitzt in Berlin, das Team arbeitet remote aus Kairo – für Unternehmen in ganz Nordrhein-Westfalen.",
        },
        {
          title: "Wöchentliche Sprints",
          text: "Jede Woche zeigen wir, was fertig ist, auf einem gemeinsamen Board. Sie sagen, was sich ändern soll.",
        },
        {
          title: "Ein Team, keine Subunternehmer",
          text: "Dieselben Leute von der ersten Skizze bis zum Betrieb danach. Nichts wird weitergereicht.",
        },
      ],
      proofLabel: "Aus einem echten Projekt",
      priceLine: "Der Preis richtet sich nach dem Aufwand – unsere Sätze liegen unter dem deutschen Marktdurchschnitt.",
      cta: "Kleine Aufgabe gratis sichern",
      subject: "Kleine Aufgabe gratis – NRW",
      body: "Hallo Coditu,\n\nunsere kleine Aufgabe (ein Screen oder eine Funktion):\n\n\nWo sie laufen soll (z. B. SharePoint):\n",
    },
  },

  /**
   * FAQ. Every answer repeats what Services, How we work and Security already
   * say — no new promises. Also the FAQPage JSON-LD, so plain text only.
   * TODO(team): taking over an existing project is not written down anywhere
   * (docs/02-POSITIONING.md, "still open"). Confirm the answer, then add the
   * question back — do not guess at it meanwhile.
   */
  faqSection: {
    title: "Häufige Fragen",
    intro: "Kurze Antworten zu Kosten, Tempo, Zusammenarbeit und Ihrem Code.",
    items: [
      {
        question: "Was kostet ein Projekt?",
        answer:
          "Der Preis richtet sich nach dem Aufwand – unsere Sätze liegen deutlich unter dem deutschen Marktdurchschnitt für SharePoint-Entwicklung. Bei größeren Projekten gibt es Rabatt und kleine Extras obendrauf. Vor dem Start bekommen Sie von uns eine Schätzung.",
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
        answer: "Ihnen. Sie bekommen den Code, die Dokumentation und die volle Kontrolle. Sie sind nicht an uns gebunden.",
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
    booking: "Gespräch buchen",
    reply: "Sie bekommen eine persönliche Antwort von Adam in Berlin.",
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
    linkedin: "LinkedIn",
  },

  legal: {
    sheetLabel: "Rechtliches",
    imprint: {
      title: "Impressum",
      description: "Impressum und Anbieterkennzeichnung von Coditu.",
      sections: <LegalSection[]>[
        {
          heading: "Angaben gemäß § 5 DDG",
          lines: ["1TO1 Consultancy & Management Services", "18 Merghany Street", "Heliopolis, Kairo, Ägypten"],
        },
        {
          heading: "Vertreten durch",
          lines: ["Ahmed Nafie, Geschäftsführer", { label: "+20 115 532 0685", href: "tel:+201155320685" }],
        },
        {
          heading: "Kontakt",
          lines: [{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }],
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
