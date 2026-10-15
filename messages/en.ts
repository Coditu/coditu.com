/**
 * Every English string on the site. Same shape as `messages/de.ts`, which is
 * the primary language. DRAFT — translated from the German draft.
 */
import { CONTACT_EMAIL } from "@/lib/site-config";

import type { LegalSection, Messages } from "./de";

const en: Messages = {
  locale: "en-GB",

  meta: {
    title: "Coditu — SharePoint web parts, internal apps and AI assistants",
    description:
      "Coditu builds SharePoint and SPFx web parts, internal apps and RAG-based AI assistants for organisations in Germany. One team from sketch to operation.",
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
    "AI assistants (RAG)",
    "Websites & frontend",
  ],

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
