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
    security: "security",
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
    themeToggle: "Toggle light / dark mode",
    menu: "Menu",
  },

  language: {
    groupLabel: "Language",
    switchTo: "Deutsch",
  },

  hero: {
    label: "SharePoint · Internal apps",
    title: "From sketch to finished software",
    lead: "We build software for social organisations, associations and mid-sized companies. Your sketch becomes an app that works in your day-to-day. You see every step on a shared board.",
    cta: "Request a project",
    secondary: "How we work",
    request: {
      request: "Request by email",
      example: "Example",
      live: "Live",
      summary: "Example: a request in a few sentences becomes a finished app.",
      scenarios: [
        {
          request: "New colleagues should get an [Onboarding checklist] – with [Start date], [Team] and [Contact person].",
          values: ["03 Nov 2026", "Consulting", "Sarah Weber"],
          button: "Create",
        },
        {
          request: "We plan our intranet topics by email. We need an [Editorial calendar] with [Topic], [Date] and [Owner].",
          values: ["New canteen", "14 Nov 2026", "Communications team"],
          button: "Schedule",
        },
        {
          request: "Everyone should be able to write [Intranet news] – with [Title], [Image] and [Approval] by communications.",
          values: ["Summer party on 12 June", "summer-party.jpg", "Approved"],
          button: "Publish",
        },
      ],
    },
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
        { slug: "mohamed-tamer", hub: "cairo", name: "Mohamed Tamer", role: "Frontend Lead" },
        { slug: "abdelrahman-elkhateeb", hub: "cairo", name: "Abdelrahman Elkhateeb", role: "Frontend Engineer" },
        { slug: "ahmed-yehia", hub: "cairo", name: "Ahmed Yehia", role: "Backend & DevOps" },
        { slug: "adam-nafie", hub: "berlin", name: "Adam Nafie", role: "Client partnerships" },
      ],
    },
  },

  servicesSection: {
    title: "What we build — and the problem it solves",
    intro: "Each service starts with the sentence clients bring to us. Below it: what we build, and with what.",
    facts: "From practice",
    example: "Example",
    more: { label: "Not sure what fits? Send us your sketch.", subject: "Project request" },
    rows: [
      {
        title: "SharePoint web parts",
        problem: "“Our intranet is cluttered and out of date.”",
        text: "Web parts that fit into your existing SharePoint pages.",
        facts: "More than 35 web parts for one organisation · usually 1–2 days per web part",
        tags: ["SharePoint", "SPFx", "React", "TypeScript", "Fluent UI"],
      },
      {
        title: "Internal apps",
        problem: "“We still do this on paper, in Excel and by email.”",
        text: "Small, focused apps from your sketch — for requests, onboarding or the editorial calendar. With Microsoft sign-in and permissions by group.",
        facts: "First version in a few days",
        tags: ["React", "Next.js", "Python", "Microsoft Graph"],
      },
      {
        title: "Websites & frontend",
        problem: "“Our website is slow or looks dated.”",
        text: "Fast websites and frontends, built to be found on Google.",
        tags: ["Next.js", "React", "Core Web Vitals", "Technical SEO"],
      },
      {
        title: "Care after launch",
        problem: "“And who looks after it afterwards?”",
        text: "Maintenance when you need it, billed per request.",
        facts: "Small changes usually under 2 hours of work",
        tags: ["Maintenance", "Changes", "Support"],
      },
    ],
    catalogue: {
      label: "Catalogue · selection",
      groups: [
        {
          name: "News & communication",
          items: ["News centre", "Banner with news", "News part", "Social corner", "Instagram/LinkedIn feed", "Notice banner"],
        },
        {
          name: "Navigation & search",
          items: ["Main navigation", "Quick links", "Link carousel", "Link tiles", "Shortcuts", "Finder", "Search banner"],
        },
        { name: "People", items: ["Org chart", "People directory", "Anniversaries", "Contact cards"] },
        {
          name: "Page layout",
          items: ["Tabs", "Tabs with cards", "Accordion", "Heading & divider", "Banner", "Process & timeline", "Key figures"],
        },
        {
          name: "Media & engagement",
          items: ["Video carousel", "Interactive video", "Slides", "Poll", "Feedback", "Calendar"],
        },
      ],
    },
    app: {
      sketch: { label: "Request", id: "A-02", caption: "A · Sketch", button: "Send request" },
      live: { title: "Request", login: "Sign-in with Microsoft", caption: "B · Result", button: "Send request" },
      fields: [
        { label: "Subject", hint: "Text · required", value: "Laptop for a new colleague" },
        { label: "Team", hint: "Choice · group", value: "Counselling" },
      ],
    },
    changelog: {
      label: "Change log",
      from: "Change",
      to: "Done",
      tickets: [
        { id: "C-01", text: "Add a new link to the main navigation" },
        { id: "C-02", text: "Replace the banner on the home page" },
        { id: "C-03", text: "Add a “cost centre” field to the request" },
      ],
    },
  },

  processSection: {
    title: "How we work — and you see every step",
    intro:
      "Every task sits on a shared board. You see what is being built, what is waiting for your feedback and what is live.",
    board: {
      label: "Project board",
      example: "Example",
      footer: ["All data is illustrative", "Client view · read-only"],
      columns: [
        {
          name: "Sketch",
          tasks: [
            { title: "Editorial calendar", tag: "App", who: "Adam Nafie" },
            { title: "“Cost centre” field in the request", tag: "Change", who: "Ahmed Yehia" },
          ],
        },
        {
          name: "In progress",
          tasks: [{ title: "Onboarding checklist", tag: "App", who: "Abdelrahman Elkhateeb" }],
        },
        {
          name: "Review",
          tasks: [
            { title: "New link in the main navigation", tag: "Web part", who: "Mohamed Tamer" },
            { title: "Banner on the home page", tag: "Web part", who: "Mohamed Tamer" },
          ],
        },
        {
          name: "Live",
          tasks: [{ title: "Intranet news with approval", tag: "Web part", who: "Abdelrahman Elkhateeb" }],
        },
      ],
    },
    proofLabel: "From practice",
    steps: [
      {
        title: "Sketch & call",
        text: "You send us a sketch, a photo or a few sentences. On a call we work out what the app has to do.",
      },
      {
        title: "First version in a few days",
        text: "First you get something to click through. A first app version takes us about 10 to 14 hours of work.",
      },
      {
        title: "Weekly sprint & feedback",
        text: "Every week we show what is done and you tell us what should change. The board shows what we are working on.",
        proof: "Weekly sprints with the same client for almost a year",
      },
      {
        title: "Go live & maintenance",
        text: "When everything fits, the app goes live. After that we stay on hand for changes and maintenance when you need them.",
      },
    ],
  },

  referenceSection: {
    title: "One intranet, built week by week",
    intro:
      "For an organisation in Germany we build and maintain its SharePoint intranet. For almost a year, in weekly sprints.",
    titleBlock: [
      { label: "Client", value: "An organisation in Germany" },
      { label: "Project", value: "SharePoint intranet" },
      { label: "Period", value: "Almost a year · weekly sprints" },
    ],
    footer: ["Client anonymous", "Illustration only"],
    factsLabel: "From the project",
    facts: [
      { value: "~38", text: "web parts for one organisation" },
      { value: "5–10 h", text: "for a new web part, mostly 1–2 days" },
      { value: "10–14 h", text: "for the first version of an internal app" },
      { value: "≤ 2 h", text: "for most change requests" },
    ],
    built: [
      {
        title: "Web parts",
        text: "The building blocks the intranet's pages are made of.",
        items: ["News & communication", "Navigation & search", "People & org chart", "Page layout", "Media & polls"],
      },
      {
        title: "Internal apps",
        text: "Standalone apps inside the intranet — for the editorial team and for new colleagues.",
        items: ["News editor", "Editorial calendar", "Onboarding"],
      },
    ],
    page: {
      example: "Example",
      caption: "Example: an intranet home page made of web parts. Our own drawing, no client data.",
      parts: {
        nav: "Main navigation",
        news: "News center",
        links: "Quick links",
        people: "Anniversaries",
        events: "Calendar",
      },
    },
    moreTitle: "More projects",
    // TODO(team): see messages/de.ts — NVRMiss and Nile Atelier details to confirm.
    projects: [
      {
        slug: "nvrmiss",
        name: "NVRMiss",
        kind: "Product site",
        line: "Product site for B2B software for service businesses: features, how it works, pricing, FAQ.",
        alt: "NVRMiss home page",
      },
      {
        slug: "nile-atelier",
        name: "Nile Atelier",
        kind: "Website",
        line: "Website for an Egyptian fashion label, with collection and journal.",
        alt: "Nile Atelier home page",
      },
    ],
  },

  // TODO(team): see messages/de.ts — none of the five points is confirmed yet.
  securitySection: {
    title: "What happens to your data",
    intro: "How we handle your data, your access and your code.",
    points: [
      {
        title: "Your data stays in your system",
        text: "[TODO: confirm] Where possible, we build inside your own Microsoft 365 and SharePoint. Your data does not move to our servers.",
      },
      {
        title: "Access only as needed",
        text: "[TODO: confirm] We use the access you give us, and only for the work. You can remove it at any time.",
      },
      {
        title: "GDPR and a DPA",
        text: "[TODO: confirm] We work under the GDPR. When it is needed, we sign a data processing agreement (DPA) with you.",
      },
      {
        title: "A clean handover",
        text: "[TODO: confirm] You get the code, the documentation and full control. There is no lock-in.",
      },
      {
        title: "No passwords in code",
        text: "[TODO: confirm] Keys and passwords live in a proper secret store — never in code and never in chat.",
      },
    ],
    tenant: {
      example: "Example",
      tenant: "Your Microsoft 365",
      site: "SharePoint Online",
      parts: ["Web parts", "Internal apps"],
      us: "Coditu",
      build: "Build",
      caption: "Example: web parts and apps run in your SharePoint. Our own drawing.",
    },
  },

  // TODO(team): see messages/de.ts — prices, code ownership and takeover are open.
  faqSection: {
    title: "Common questions",
    intro: "Short answers on cost, speed, working together and your code.",
    items: [
      {
        question: "What does a project cost?",
        answer:
          "We bill by effort. Before we start, you get an estimate from us. Small changes usually take under 2 hours.",
      },
      {
        question: "How soon is there a first version?",
        answer: "A new web part usually takes 1–2 days. The first version of an internal app is ready in a few days.",
      },
      {
        question: "Do you only work with SharePoint and Microsoft 365?",
        answer: "No. We build SharePoint web parts, internal apps, websites and frontends — and look after them after launch.",
      },
      {
        question: "What does working together look like?",
        answer:
          "We work in weekly sprints. Every week we show what is done and you tell us what should change. You have one fixed contact.",
        link: { section: "process" as const, label: "How we work" },
      },
      {
        question: "You are in Berlin and Cairo. How does that work?",
        answer:
          "Your fixed contact is Adam Nafie in Berlin. Berlin and Cairo are at most one hour apart. We talk with you in German or English.",
      },
      {
        question: "Who owns the code?",
        answer:
          "[TODO: confirm] You do. You get the code, the documentation and full control. There is no lock-in.",
      },
      {
        question: "Can you take over an existing project?",
        answer:
          "[TODO: confirm] We decide that case by case. First we look at the existing code. Then we tell you whether we can take it over, and with how much effort.",
      },
      {
        question: "What happens after go-live?",
        answer: "We stay on hand for changes and maintenance when you need them. Billed per request.",
      },
    ],
  },

  // TODO(team): see messages/de.ts — the reply time is not confirmed.
  contactSection: {
    title: "Send us your request",
    intro: "A few sentences are enough. If you have a sketch or files, attach them.",
    email: {
      label: "Write an email",
      subject: "Project request",
      body: "Hello Coditu,\n\nOur idea in a few sentences:\n\n\nWe are happy to attach a photo of our sketch.\n",
      or: "Or straight to",
    },
    booking: "Book a 20-minute call",
    reply: "[TODO: confirm] We usually reply within 1 working day.",
    contactTitle: "Your contact in Berlin",
    contactText: "From the first call to go-live, you talk to the same person.",
    teamTitle: "Your team in Cairo",
  },

  footer: {
    description: "SharePoint web parts, internal apps and websites. One team from sketch to operation.",
    sectionsTitle: "Overview",
    sections: [
      { section: "services", label: "Services" },
      { section: "process", label: "How we work" },
      { section: "reference", label: "Reference" },
      { section: "security", label: "Security & data" },
      { section: "faq", label: "Common questions" },
      { section: "contact", label: "Contact" },
    ],
    locations: "Berlin · Cairo",
    legalTitle: "Legal",
    imprint: "Legal notice",
    privacy: "Privacy policy",
    contactTitle: "Contact",
    languageTitle: "Language",
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
