---
title: "How much does a SharePoint web part cost?"
description: "A SharePoint web part costs the hours it takes to build. For us that is usually 5 to 10 hours. These are the factors that drive the effort."
slug: sharepoint-web-part-cost
translationOf: was-kostet-ein-sharepoint-webpart
date: 2026-10-19
updated: 2026-10-19
readingTime: 4
tags: [SharePoint, SPFx, Cost]
service: 0
---

A SharePoint web part costs as much as the hours it takes to build. For a new web part that is usually 5 to 10 hours for us, or 1 to 2 working days.

Whether it ends up closer to 5 or to 10 hours depends on a handful of factors. It's worth knowing them before you compare quotes.

## What is a SharePoint web part?

A web part is a building block on a SharePoint page. SharePoint comes with its own web parts, for text, images, links and news, for example. Custom web parts are built with the SharePoint Framework (SPFx), Microsoft's development model for SharePoint Online.

A custom web part is built once and deployed to your SharePoint app catalog. After that your editors add it to any page, like any other web part.

## What drives the effort

Six questions decide the hours. The table shows what tends to mean less effort and what tends to mean more.

| Factor | Less effort | More effort |
|---|---|---|
| Data | Fixed content or one SharePoint list | Several sources, such as Microsoft Graph or an external system |
| Settings | None or a few | Editors should be able to configure a lot themselves |
| Design | SharePoint's own style (Fluent UI) | A custom design with several variants |
| Interaction | Displaying content | Filtering, searching, paging, filling in forms |
| Permissions | Everyone sees the same | Content depends on the group |
| Languages | One language | Several languages |

A notice banner with fixed text sits at the low end. A news centre that filters posts from several sources and shows them by group sits at the high end.

## What else takes time

Besides the build itself, three items are often forgotten.

- **Alignment.** The clearer your sketch, the fewer rounds it takes. A drawing on paper is enough.
- **Deployment.** Someone with admin rights has to approve the package in the app catalog. Find out early who that is on your side.
- **Testing in your environment.** A web part should be tested with your real content and permissions before it goes live.

## What a web part doesn't cost

SPFx web parts don't need an extra Microsoft licence. They run in your existing SharePoint Online. Further costs only arise if a web part uses an external service, such as a dedicated server.

## Our numbers

We have built around 38 web parts for one organisation, in weekly sprints for almost a year. These figures come from that work:

- A new web part usually takes 5 to 10 hours.
- Most change requests take 2 hours or less.

We bill by effort. Before we start, you get an estimate from us.

- New web part: {{price:webPart}}
- Small change: {{price:change}}

## What an estimate should include

Two quotes with the same price can contain very different things. Ask before you compare:

- **Which hours are included?** Only the build, or also alignment, testing and deployment?
- **How are changes billed?** Requests almost always come in after launch. It helps to know up front what a small change costs.
- **Who owns the code at the end?** And do you get documentation that lets someone else carry on the work?
- **How do you see progress?** With us, every task sits on a shared board. You see what's in progress and what's waiting for your feedback.

## How to keep costs down

The cheapest hour is the one that isn't needed.

1. **Check the standard web parts first.** Many requirements can be met with the settings SharePoint already has. When a custom web part pays off is covered in [SPFx web parts: when is a custom solution worth it?](/en/blog/spfx-web-part-vs-standard-web-part)
2. **Send a sketch.** A photo of a whiteboard saves a round of alignment.
3. **One web part with settings instead of three similar ones.** If only the colour or content differs, one web part your editors can adjust is often enough.
4. **Plan for changes.** Requests almost always come in after launch. Small changes are quick when they are collected into one sprint.

## When we are not the right choice

If a standard web part meets your requirement, you don't need a custom one. We'll tell you so.

We're also not the right fit if you mainly want pages created and content maintained. That doesn't need development.

And if you're putting a complete intranet out to tender at a fixed price, our model doesn't fit: we work in weekly sprints and bill by effort.
