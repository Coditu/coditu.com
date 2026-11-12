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
    ogAlt: "Coditu — You pick the building blocks, we build your app",
  },

  anchors: {
    services: "services",
    intranet: "intranet",
    baukasten: "baukasten",
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
    blog: "Blog",
    booking: "Book a call",
    themeToggle: "Toggle light / dark mode",
    linkedin: "Coditu on LinkedIn",
    menu: "Menu",
  },

  language: {
    groupLabel: "Language",
    switchTo: "Deutsch",
  },

  panelSection: {
    title: "One web part. Free. In 3 days.",
    fine: "1 web part per client · in up to 3 days",
    cta: "Request it free",
    close: "Close offer",
    subject: "Free small task – Panel",
    body: "Hello Coditu,\n\nour free web part (screenshot or description):\n\n\nWhere it should run (e.g. SharePoint):\n",
  },

  hero: {
    label: "SharePoint · Internal apps",
    // The blue period is added by the component, with no trailing period
    // here so it lands on "app".
    title: "You pick the building blocks. We build your app",
    lead: "We build internal software for small and mid-size companies: ready-made building blocks for your Microsoft 365, in your design, with your login. You see every step on a shared board.",
    cta: "Try us free with a small task",
    freeTask: {
      line: "Send us a small request, we'll build it for free.",
      fine: "1 task per client · one screen or one feature · in up to 3 days",
      subject: "Free small task",
      body: "Hello Coditu,\n\nOur small task (one screen or one feature):\n\n\nWhere it should run (e.g. SharePoint):\n",
    },
    booking: "Book a call",
    request: {
      example: "Example",
      summary: "Example: building blocks become a booking app – with a dashboard, bookings, a calendar and a login.",
      picker: {
        title: "Baukasten",
        hint: "Pick proven blocks",
        blocks: ["Dashboard", "Bookings", "Calendar", "Login"],
        more: ["Form", "Approval", "Directory"],
      },
      app: {
        name: "Room booking",
        /** The logged-in avatar's initials — example data, no real person. */
        initials: "AB",
        live: "Live",
        nav: ["Overview", "Rooms", "Team"],
        newBooking: "New booking",
        stats: [
          { label: "Today", value: "6" },
          { label: "Free rooms", value: "3" },
        ],
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        columns: ["Room", "Time", "Status"],
        confirmed: "Confirmed",
        pending: "Pending",
        rows: [
          { room: "Room 1", time: "09:00", pending: false },
          { room: "Room 2", time: "11:30", pending: false },
          { room: "Hall", time: "14:00", pending: true },
        ],
      },
    },
    facts: [
      { id: "T.01", text: "First app in 1–3 days" },
      { id: "T.02", text: "You see every step on the board" },
      { id: "T.03", text: "Runs in your Microsoft 365" },
    ],
    team: {
      listLabel: "The team",
      line: "Your team · Berlin · Cairo",
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
    intro: "Three examples from real projects, rebuilt with example data.",
    caption: "Rebuild · example data",
    result: "Result",
    more: { label: "Not sure what fits? Send us your sketch.", subject: "Project enquiry" },
    rows: [
      {
        title: "SharePoint web parts",
        problem: "“Our intranet is cluttered and out of date.”",
        text: "Web parts that slot into your existing SharePoint pages and show your lists live.",
        result: "More than 40 web parts for one organisation, mostly 1–2 days per web part.",
        labels: ["Filter by area", "Four weeks at a glance", "Live from SharePoint"],
        summary:
          "Rebuild of a calendar web part on an intranet: a filter by area, four weeks with marked events and, beside them, the next events from a SharePoint list.",
      },
      {
        title: "Internal apps",
        problem: "“We still do this on paper, in Excel and by e-mail.”",
        text: "Small, focused apps built from your sketch — for requests, onboarding or the editorial plan.",
        result: "A first version in 1–2 days, with Microsoft sign-in and rights by group.",
        labels: ["Sign in with Microsoft", "Data in SharePoint", "Status at a glance"],
        summary:
          "Rebuild of an editorial planner: signed in with Microsoft, one week with a row per channel, each post with its area, status and editor.",
      },
      {
        title: "Websites & web apps",
        problem: "“Our website is slow or looks dated.”",
        text: "Fast websites and product pages, built to be found on Google.",
        result: "A page that says straight away what you offer — on a phone as on a desk.",
        labels: ["A clear message", "Product, not stock photos", "One next step"],
        summary:
          "Rebuild of the NVRMiss home page: one headline, one button for beta access and small glimpses of the product — calls, reminders, calendar.",
      },
    ],
    calendar: {
      site: "Intranet",
      page: "Home",
      search: "Search",
      title: "Events",
      filterLabel: "Area",
      filter: "All areas",
      range: "Oct – Nov 2026",
      weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      place: "Where",
      events: [
        { date: "22 Oct", title: "Admin team day", time: "09:00 – 12:00", area: "Admin", place: "Room 2.14" },
        { date: "23 Oct", title: "Apprenticeship evening", time: "17:30 – 19:00", area: "Education", place: "Hall" },
        { date: "27 Oct", title: "First-aid course", time: "All day", area: "Care", place: "House B" },
      ],
    },
    planner: {
      app: "Editorial plan",
      login: "Microsoft",
      initials: "MB",
      today: "Today",
      range: "19–23 Oct 2026",
      add: "Plan a post",
      days: ["Mon 19", "Tue 20", "Wed 21", "Thu 22", "Fri 23"],
      channels: ["Events", "LinkedIn", "Instagram", "Newsletter"],
      statuses: ["Planned", "Draft", "Published"],
      entries: [
        { channel: 0, day: 0, title: "Open day", area: "Education", status: 2, editor: "Jonas B." },
        { channel: 0, day: 3, title: "First-aid course", area: "Care", status: 0, editor: "Jonas B." },
        { channel: 1, day: 1, title: "New day-care opens", area: "Youth", status: 2, editor: "Lena K." },
        { channel: 1, day: 3, title: "We are hiring carers", area: "Care", status: 1, editor: "Mia B." },
        { channel: 2, day: 0, title: "A day in House B", area: "Care", status: 2, editor: "Lena K." },
        { channel: 2, day: 2, title: "Apprenticeship in 60 seconds", area: "Education", status: 1, editor: "Jonas B." },
        { channel: 3, day: 4, title: "October newsletter", area: "Admin", status: 0, editor: "Mia B." },
      ],
    },
    website: {
      brand: "NVRMiss",
      nav: ["Features", "How it works", "Pricing", "FAQ"],
      demo: "Get a demo",
      badge: "Launching soon · open beta",
      headline: ["Never miss a call.", "Never miss a job."],
      lead: "Answers calls around the clock, qualifies the request and books the job — while you focus on the work.",
      cta: "Get beta access",
      secondary: "Watch demo",
      fine: "No credit card · set up in minutes",
      calls: {
        title: "Today's calls",
        rows: [
          { text: "Leaking bathroom", status: "Booked" },
          { text: "Heating quote", status: "Call back" },
        ],
      },
      reminder: { title: "Reminder", text: "AC maintenance", time: "14:30 – 15:30" },
      sync: { title: "Calendar sync", text: "Google · Outlook" },
    },
  },

  intranetSection: {
    title: "Your intranet, modernised",
    intro: "Many SharePoint intranets look dated and are hard to use day to day.",
    caption: "Example · sample data",
    news: [
      {
        title: "New canteen in Building B from 2 November",
        area: "Administration",
        date: "21 Oct 2026",
        by: "Communications",
        teaser: "Lunch will be served from 11:30 to 14:00. The menu goes up here on the intranet every week.",
      },
      {
        title: "First aid courses: new dates",
        area: "Care",
        date: "19 Oct 2026",
        by: "Training",
        teaser: "New dates are open for November and December. Sign up through your manager.",
      },
      {
        title: "Remote working: what changes",
        area: "HR",
        date: "15 Oct 2026",
        by: "HR team",
        teaser: "A new agreement applies from January. We have summed up the main points.",
      },
    ],
    compare: {
      before: "Before",
      after: "After",
      control: "Compare before and after",
      hint: "Drag to compare",
      summary:
        "Example: the same news page twice. Before, a classic SharePoint intranet with a grey bar, a list of links and a small table; after, our design with an area filter and large cards.",
    },
    classic: {
      site: "Intranet",
      suite: ["Sites", "Documents"],
      tabs: ["Browse", "Page"],
      actions: ["Share", "Follow", "Edit"],
      breadcrumb: "Home › News",
      nav: ["Home", "News", "Documents", "Events", "Contacts", "Site contents"],
      heading: "News",
      add: "New item",
      columns: ["Title", "Modified", "Modified by"],
    },
    modern: {
      site: "Intranet",
      nav: ["Home", "News", "Events", "Team"],
      search: "Search",
      heading: "News",
      filters: ["All", "Administration", "Care", "HR"],
      read: "Read more",
      more: "All news",
    },
    admin: {
      app: "News desk",
      login: "Microsoft",
      initials: "LK",
      heading: "Edit post",
      draft: "Draft",
      published: "Published",
      fields: { area: "Area", title: "Title", teaser: "Teaser", date: "Date" },
      post: {
        title: "Flu jabs on site from 3 November",
        area: "HR",
        date: "23 Oct 2026",
        by: "HR team",
        teaser: "The company doctor will vaccinate on three days in Building A. Please sign up by 30 October.",
      },
      save: "Save as draft",
      publish: "Publish",
      done: "Now live on the intranet",
      page: "Home",
      fresh: "New",
      summary:
        "Example: a member of staff edits a news post in our news desk app and publishes it. Next to it, the post appears at the top of the intranet home page.",
    },
    trust: [
      { title: "Stays in your Microsoft 365", text: "Posts, events and pages stay in your SharePoint lists." },
      { title: "Same login & permissions", text: "Your team signs in with their Microsoft account. Your groups decide who may edit what." },
      { title: "Nothing to migrate", text: "Your content stays where it is. We renew the interface." },
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Send a screenshot", text: "A picture of one old web part is enough to start." },
      { title: "We redesign it for free", text: "We redesign it and show you the result, in up to 3 days." },
      { title: "We modernise the rest", text: "If you like it, we renew the rest of your intranet step by step." },
    ],
    cta: "Get one web part redesigned free",
    fine: "Your free small task · 1 per client · in up to 3 days",
    subject: "Free small task – Intranet",
    body: "Hello Coditu,\n\nplease redesign this web part for free (screenshot attached).\n\nWhat bothers us about it:\n\n",
  },

  // See messages/de.ts "baukastenSection" — same shape, same numbers.
  baukastenSection: {
    title: "The Baukasten",
    intro:
      "Our flagship — we call it the Baukasten: a library of building blocks for your Microsoft 365, in your design, with your login, on your own server.",
    points: [
      {
        title: "Blocks that fit together",
        text: "React components in your design that snap together like building blocks — a form, an approval, a dashboard.",
      },
      {
        title: "Sign-in with Microsoft Entra",
        text: "Everyone signs in with their Microsoft account and sees only what their permissions allow.",
      },
      {
        title: "On your own server",
        text: "Runs on your intranet domain. Your data never leaves your system.",
      },
      {
        title: "For requests, approvals and more",
        text: "Forms, approvals, dashboards and directories — built from the same blocks.",
      },
    ],
    proof: {
      label: "In production",
      stat: "6+ apps",
      statText: "at one organisation in Germany",
      types: ["Requests", "Onboarding", "News editing", "Editorial calendar"],
      caption: "Illustrative only, no real client data.",
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
        title: "First version in 1–2 days",
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
      { value: "40+", text: "web parts for one organisation" },
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

  // See docs/02-POSITIONING.md "DSGVO and security claims" for what is
  // confirmed. A fifth point was cut rather than published unconfirmed —
  // add it back once the team confirms it.
  securitySection: {
    title: "What happens to your data",
    intro: "How we handle your data, your access and your code.",
    points: [
      {
        title: "Your data stays in your system",
        text: "We build directly inside your Microsoft 365 and SharePoint. Your data lives with Microsoft, not with us — we have no servers of our own for it.",
      },
      {
        title: "Permissions stay in your hands",
        text: "You grant us access to your Microsoft 365. Your own permission groups control who can see and edit what.",
      },
      {
        title: "A clean handover",
        text: "You get the code, the documentation and full control. There is no lock-in.",
      },
      {
        title: "No passwords in code",
        text: "Keys and passwords live in their own protected store — never in code and never in chat.",
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

  // See messages/de.ts "landingPages" — same shape, same facts, a
  // genuinely different (not translated 1:1) English search phrase. No price
  // figures: see "Prices" in docs/02-POSITIONING.md for why the site states
  // only that rates are below the German market average, never a number.
  landingPages: {
    sharepointWebparts: {
      slug: "sharepoint-web-parts-development",
      meta: {
        title: "SharePoint Web Parts Development",
        description:
          "SharePoint and SPFx web parts for your intranet, in your design, live from your SharePoint lists. Usually 1–2 days per web part, at rates below the German market average.",
      },
      title: "SharePoint Web Parts Development",
      intro:
        "Outdated or rigid web parts in your intranet? We redesign them — in your design, live from your existing SharePoint lists.",
      points: [
        {
          title: "In your design",
          text: "No standard layout. Every web part is designed to match your brand and your intranet.",
        },
        {
          title: "Live from SharePoint",
          text: "No copy of your data. Your lists stay the source; the web part just shows them differently.",
        },
        {
          title: "Usually 1–2 days",
          text: "A single web part rarely takes longer — see the numbers below, from a real project.",
        },
      ],
      proofLabel: "From a real project",
      priceLine: "The price depends on the amount of work — our rates sit below the German market average.",
      cta: "Get one web part redesigned free",
      subject: "Free small task – SharePoint Web Parts",
      body: "Hello Coditu,\n\nplease redesign this web part for free (screenshot attached).\n\nWhat bothers us about it:\n\n",
    },
    spfxDeveloper: {
      slug: "spfx-developer",
      meta: {
        title: "SPFx Developer",
        description: "SPFx development for SharePoint and Microsoft 365: one team, no subcontractors, weekly sprints, at rates below the German market average.",
      },
      title: "SPFx Developer",
      intro:
        "Looking for SPFx development for your SharePoint? We own the concept, the build and what comes after — as one team, not a subcontractor.",
      points: [
        {
          title: "One team, no subcontractors",
          text: "The same people from the first sketch to the operation after. Nothing gets handed off.",
        },
        {
          title: "Weekly sprints",
          text: "Every week we show what's done, on a shared board. You tell us what should change.",
        },
        {
          title: "Berlin · Cairo",
          text: "Your fixed contact is based in Berlin. Berlin and Cairo are at most one hour apart.",
        },
      ],
      proofLabel: "From a real project",
      priceLine: "We bill by effort — hourly, or at a fixed price per web part or project, at rates below the German market average.",
      cta: "Try us free with a small task",
      subject: "Free small task – SPFx",
      body: "Hello Coditu,\n\nOur small task (one screen or one feature):\n\n\nWhere it should run (e.g. SharePoint):\n",
    },
    berlin: {
      slug: "sharepoint-development-berlin",
      meta: {
        title: "SharePoint Development Berlin",
        description: "SharePoint and SPFx development with a fixed contact based in Berlin. Weekly sprints, at rates below the German market average.",
      },
      title: "SharePoint Development Berlin",
      intro:
        "Looking for SharePoint or SPFx development with a contact based in Berlin? Your fixed contact sits in Berlin; the development team works remotely from Cairo — as one team, not a subcontractor.",
      points: [
        {
          title: "A contact based in Berlin",
          text: "Adam Nafie is your fixed contact, from the first sketch to the operation after.",
        },
        {
          title: "Weekly sprints",
          text: "Every week we show what's done, on a shared board. You tell us what should change.",
        },
        {
          title: "One team, no subcontractors",
          text: "The same people from the first sketch to the operation after. Nothing gets handed off.",
        },
      ],
      proofLabel: "From a real project",
      priceLine: "The price depends on the amount of work — our rates sit below the German market average.",
      cta: "Try us free with a small task",
      subject: "Free small task – Berlin",
      body: "Hello Coditu,\n\nOur small task (one screen or one feature):\n\n\nWhere it should run (e.g. SharePoint):\n",
    },
    bavaria: {
      slug: "sharepoint-development-bavaria",
      meta: {
        title: "SharePoint Development Bavaria",
        description:
          "SharePoint and SPFx development for companies in Bavaria. Projects may qualify for the Digitalbonus.Bayern public funding programme. Rates below the German market average.",
      },
      title: "SharePoint Development Bavaria",
      intro:
        "Looking for SharePoint or SPFx development for your company in Bavaria? We build web parts, internal apps and websites — as one team, from the first sketch to the operation after.",
      points: [
        {
          title: "Eligible for Digitalbonus.Bayern funding",
          text: "Bavarian SMEs with up to 249 staff can apply for the public Digitalbonus.Bayern grant, which runs until the end of 2027. Check whether your project qualifies directly with the Free State of Bavaria.",
        },
        {
          title: "Weekly sprints",
          text: "Every week we show what's done, on a shared board. You tell us what should change.",
        },
        {
          title: "Berlin · Cairo",
          text: "Your fixed contact is based in Berlin. Berlin and Cairo are at most one hour apart.",
        },
      ],
      proofLabel: "From a real project",
      priceLine: "The price depends on the amount of work — our rates sit below the German market average.",
      cta: "Try us free with a small task",
      subject: "Free small task – Bavaria",
      body: "Hello Coditu,\n\nOur small task (one screen or one feature):\n\n\nWhere it should run (e.g. SharePoint):\n",
    },
    nrw: {
      slug: "sharepoint-development-nrw",
      meta: {
        title: "SharePoint Development North Rhine-Westphalia",
        description: "SharePoint and SPFx development for companies in North Rhine-Westphalia. Weekly sprints, at rates below the German market average.",
      },
      title: "SharePoint Development North Rhine-Westphalia",
      intro:
        "Looking for SharePoint or SPFx development for your company in North Rhine-Westphalia? We build web parts, internal apps and websites — as one team, from the first sketch to the operation after.",
      points: [
        {
          title: "Remote from Berlin and Cairo",
          text: "No travel needed for an on-site visit: your fixed contact is based in Berlin, the team works remotely from Cairo — for companies across North Rhine-Westphalia.",
        },
        {
          title: "Weekly sprints",
          text: "Every week we show what's done, on a shared board. You tell us what should change.",
        },
        {
          title: "One team, no subcontractors",
          text: "The same people from the first sketch to the operation after. Nothing gets handed off.",
        },
      ],
      proofLabel: "From a real project",
      priceLine: "The price depends on the amount of work — our rates sit below the German market average.",
      cta: "Try us free with a small task",
      subject: "Free small task – NRW",
      body: "Hello Coditu,\n\nOur small task (one screen or one feature):\n\n\nWhere it should run (e.g. SharePoint):\n",
    },
  },

  // TODO(team): see messages/de.ts — taking over an existing project is open.
  faqSection: {
    title: "Common questions",
    intro: "Short answers on cost, speed, working together and your code.",
    items: [
      {
        question: "What does a project cost?",
        answer:
          "The price depends on the amount of work – our rates sit well below the German market average for SharePoint development. Larger projects get a discount, plus a little extra on top. Before we start, you get an estimate from us.",
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
        answer: "You do. You get the code, the documentation and full control. There is no lock-in.",
      },
      {
        question: "What happens after go-live?",
        answer: "We stay on hand for changes and maintenance when you need them. Billed per request.",
      },
    ],
  },

  contactSection: {
    title: "Send us your request",
    intro: "A few sentences are enough. If you have a sketch or files, attach them.",
    email: {
      label: "Write an email",
      subject: "Project request",
      body: "Hello Coditu,\n\nOur idea in a few sentences:\n\n\nWe are happy to attach a photo of our sketch.\n",
      or: "Or straight to",
    },
    booking: "Book a call",
    reply: "You get a personal reply from Adam in Berlin.",
    contactTitle: "Your contact in Berlin",
    contactText: "From the first call to go-live, you talk to the same person.",
    teamTitle: "Your team in Cairo",
  },

  blog: {
    title: "Blog",
    description: "Answers to the questions clients ask us about SharePoint, SPFx web parts, Power Apps and internal apps.",
    intro: "Short answers to the questions that come before a project: SharePoint, web parts and internal apps.",
    all: "All articles",
    updated: "Updated",
    readingTime: "{minutes} min read",
    draft: "Draft",
    draftNote: "Visible on previews only, not live. Open: {review}.",
    tableLabel: "Table, scrolls sideways",
    end: {
      title: "Does this fit your project?",
      text: "Send us a few sentences or a sketch. Before we start, you get an estimate from us.",
      cta: "Send a request",
      service: "Service: {service}",
      reference: "Our reference",
    },
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
    linkedin: "LinkedIn",
  },

  legal: {
    sheetLabel: "Legal",
    imprint: {
      title: "Legal notice",
      description: "Legal notice and provider identification for Coditu.",
      sections: <LegalSection[]>[
        {
          heading: "Information according to § 5 DDG",
          lines: ["1TO1 Consultancy & Management Services", "18 Merghany Street", "Heliopolis, Cairo, Egypt"],
        },
        {
          heading: "Represented by",
          lines: ["Ahmed Nafie, Managing Director", { label: "+20 115 532 0685", href: "tel:+201155320685" }],
        },
        {
          heading: "Contact",
          lines: [{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }],
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
    body: "A reload won't cause any harm. If the error persists, write to us.",
    retry: "Reload",
  },
};

export default en;
