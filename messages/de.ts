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
    title: "Coditu — SharePoint-Webparts, interne Apps und KI-Assistenten",
    description:
      "Coditu entwickelt SharePoint- und SPFx-Webparts, interne Apps und KI-Assistenten mit RAG für Organisationen in Deutschland. Ein Team von der Skizze bis zum Betrieb.",
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
    "KI-Assistenten (RAG)",
    "Websites & Frontend",
  ],

  footer: {
    slogan: "Von der Skizze zur fertigen Software.",
    servicesTitle: "Leistungen",
    legalTitle: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutz",
    contactTitle: "Kontakt",
    languageTitle: "Sprache",
    sheet: "Blatt 07 / 07 · Rev. A",
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
