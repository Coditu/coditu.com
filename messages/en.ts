/**
 * Every English string on the site. Same shape as `messages/de.ts`, which is
 * the primary language. DRAFT — translated from the German draft.
 */
import { CONTACT_EMAIL } from "@/lib/site-config";

import type { LegalSection, Messages } from "./de";

const en: Messages = {
  locale: "en-GB",

  meta: {
    title: "Coditu — SharePoint web parts and internal apps",
    description:
      "Coditu builds SharePoint and SPFx web parts and internal apps for organisations in Germany. One team from sketch to operation.",
    ogAlt: "Coditu — From sketch to finished software",
  },

  anchors: {
    services: "services",
    process: "how-we-work",
    reference: "reference",
    team: "team",
    faq: "faq",
    contact: "contact",
  },

  skipLink: "Skip to content",

  nav: {
    homeLabel: "Coditu home",
    mainLabel: "Main navigation",
    links: [
      { section: "services", label: "Services" },
      { section: "process", label: "How we work" },
      { section: "reference", label: "Reference" },
      { section: "team", label: "Team" },
      { section: "contact", label: "Contact" },
    ],
    booking: "Book a call",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menu: "Menu",
  },

  language: {
    groupLabel: "Language",
    switchTo: "Deutsch",
  },

  services: [
    "SharePoint & SPFx web parts",
    "Internal apps",
    "Websites & frontend",
  ],

  hero: {
    meta: ["Sheet 01 · Home", "Rev. A"],
    label: "SharePoint · Internal apps",
    title: "From sketch to finished software",
    lead: "We build software for social organisations, associations and mid-sized companies. Your sketch becomes an app that works in your day-to-day. You see every step on a shared board.",
    cta: {
      label: "Request a project",
      subject: "Project request",
      body: "Hello Coditu,\n\nOur idea in a few sentences:\n\n\nWe are happy to attach a photo of our sketch.\n",
    },
    secondary: "How we work",
    facts: [
      { id: "T.01", text: "From sketch to app in a few days" },
      { id: "T.02", text: "You see every step on the board" },
      { id: "T.03", text: "Runs in your Microsoft 365" },
    ],
    team: {
      listLabel: "The team",
      line: "Your team · Berlin · Cairo",
      photos: "[PLACEHOLDER: team photos]",
      members: [
        { slug: "mohamed-tamer", name: "Mohamed Tamer", role: "Frontend Lead" },
        { slug: "abdelrahman-elkhateeb", name: "Abdelrahman Elkhateeb", role: "Frontend Engineer" },
        { slug: "ahmed-yehia", name: "Ahmed Yehia", role: "Backend & DevOps" },
        { slug: "adam-nafie", name: "Adam Nafie", role: "Client partnerships" },
      ],
    },
    demo: {
      sheet: { label: "Sheet 01 · Example", value: "Training request" },
      compareLabel: "Compare sketch / result",
      sketch: { label: "Training request", id: "A-01", caption: "A · Sketch", button: "Send request" },
      live: { title: "Training request", status: "Live", caption: "B · Result", button: "Send request" },
      fields: [
        { label: "Name", hint: "Text · required", value: "Jana Example" },
        { label: "Course", hint: "Text · required", value: "Counselling conversations" },
        { label: "Dates", hint: "Date from – to", value: "03.11. – 07.11.2026" },
        { label: "Cost", hint: "Amount · €", value: "€480" },
        { label: "Reason", hint: "Text · multi-line", value: "For the team's new parent counselling" },
      ],
      stepsLabel: "Process",
      steps: ["Sketch", "Board", "Live"],
      duration: "a few days",
      caption: "Example — this is how a sketch becomes an app with us.",
    },
  },

  footer: {
    slogan: "From sketch to finished software.",
    servicesTitle: "Services",
    legalTitle: "Legal",
    imprint: "Legal notice",
    privacy: "Privacy policy",
    contactTitle: "Contact",
    languageTitle: "Language",
    sheet: "Sheet 07 / 07 · Rev. A",
  },

  legal: {
    sheetLabel: "Legal",
    imprint: {
      title: "Legal notice",
      description: "Legal notice and provider identification for Coditu.",
      sections: <LegalSection[]>[
        {
          heading: "Information according to § 5 DDG",
          lines: [
            "[PLACEHOLDER: company name and legal form]",
            "[PLACEHOLDER: street and number]",
            "[PLACEHOLDER: postcode and city]",
            "Germany",
          ],
        },
        {
          heading: "Represented by",
          lines: ["[PLACEHOLDER: authorised representative(s)]"],
        },
        {
          heading: "Contact",
          lines: [
            { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
            "[PLACEHOLDER: phone number]",
          ],
        },
        {
          heading: "Register entry",
          lines: ["[PLACEHOLDER: register court and number, if any]"],
        },
        {
          heading: "VAT ID",
          lines: ["[PLACEHOLDER: VAT identification number according to § 27a UStG, if any]"],
        },
        {
          heading: "Responsible for content according to § 18 (2) MStV",
          lines: ["[PLACEHOLDER: name and address]"],
        },
        {
          heading: "Consumer dispute resolution",
          lines: ["[PLACEHOLDER: statement on participation in dispute resolution]"],
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      description: "How Coditu processes personal data on this website.",
      sections: <LegalSection[]>[
        {
          heading: "1. Controller",
          lines: [
            "[PLACEHOLDER: company name and address]",
            { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
          ],
        },
        {
          heading: "2. Hosting",
          lines: [
            "This website is hosted by Vercel Inc.",
            "[PLACEHOLDER: provider address, legal basis, data processing agreement and transfers to third countries]",
          ],
        },
        {
          heading: "3. Server log files",
          lines: [
            "When you open the website, the hosting provider processes technically necessary data, for example IP address, date and time, and the page requested.",
            "[PLACEHOLDER: scope, legal basis and retention period]",
          ],
        },
        {
          heading: "4. Contact by email",
          lines: [
            "When you write to us, we process your details to answer your request.",
            "[PLACEHOLDER: legal basis and retention period]",
          ],
        },
        {
          heading: "5. Cookies, fonts and analytics",
          lines: [
            "This website sets no cookies and uses no analytics or tracking tools.",
            "Fonts are loaded from our own server. No connection to Google is made.",
          ],
        },
        {
          heading: "6. Your rights",
          lines: [
            "You have the right of access, rectification, erasure, restriction of processing, data portability and objection (Art. 15–21 GDPR).",
            "You can lodge a complaint with a data protection supervisory authority (Art. 77 GDPR).",
            "[PLACEHOLDER: competent supervisory authority]",
          ],
        },
        {
          heading: "Last updated",
          lines: ["[PLACEHOLDER: date]"],
        },
      ],
    },
  },

  notFound: {
    title: "Page not found",
    body: "This page does not exist.",
    home: "Go to the home page",
  },

  error: {
    title: "The page could not be loaded.",
    body: "Reloading is safe. If the error persists, write to us.",
    retry: "Reload",
  },
};

export default en;
