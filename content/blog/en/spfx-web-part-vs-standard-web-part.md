---
title: "SPFx web parts: when is a custom solution worth it over standard web parts?"
description: "A custom SPFx web part pays off when no standard web part shows your content the way your staff need it. For text, images and links the standard ones are usually enough."
slug: spfx-web-part-vs-standard-web-part
translationOf: spfx-webpart-oder-standard-webpart
date: 2026-10-19
updated: 2026-10-19
readingTime: 4
tags: [SPFx, SharePoint, Web parts]
service: 0
review: "needs Adam"
---

A custom SPFx web part pays off when no standard web part shows your content the way your staff need it. For text, images, links and simple news, the web parts that come with SharePoint are usually enough.

So the question isn't "standard or custom?". The question is: where exactly does the standard stop being enough?

## What is SPFx?

SPFx stands for SharePoint Framework. It's Microsoft's development model for building custom web parts for SharePoint Online.

An SPFx web part runs in the browser, directly on your SharePoint page. It only sees what the signed-in person is allowed to see. Your editors add it like any other web part and configure it through its settings.

## What standard web parts do well

SharePoint comes with web parts for the most common tasks: text, images, links, news, events, people and documents.

They have three big advantages:

- They're included in SharePoint and cost nothing extra.
- Microsoft maintains them and keeps developing them.
- Your editors already know them.

Their limits are where the settings end. You can only change layout, design and logic as far as Microsoft intended.

## Standard and custom web parts compared

| Requirement | Standard web part | Custom SPFx web part |
|---|---|---|
| Text, images, links | Enough | Not needed |
| Design to your corporate identity | Within the settings | Fully customisable |
| Combining data from several sources | Limited | Yes, for example via Microsoft Graph |
| Custom logic, such as filters or approvals | Only what's built in | Yes |
| Maintenance and updates | By Microsoft | By you or your service provider |
| Cost | Included in SharePoint | Development time, usually 5–10 hours per web part with us |

## Four signs the standard is no longer enough

1. **Your editors build workarounds.** Images with text baked in, tables used as navigation, links to links.
2. **The home page doesn't look like your organisation.** When design matters, the settings quickly hit their limits.
3. **Data lives in several places.** A list in SharePoint, profiles in Microsoft 365, events in a calendar: a custom web part shows them together.
4. **The same solution is needed on many pages.** Then a building block your editors can place and configure anywhere pays off.

## What a custom web part brings with it

A custom web part is software. That has consequences you should know about up front.

- **It needs maintenance.** Microsoft keeps developing SPFx. A custom web part should therefore be moved to a new version from time to time.
- **Accessibility is your job.** With a custom web part it has to be built in and tested.
- **Deployment needs permissions.** The package is approved in your SharePoint app catalog. That takes someone with admin rights.

You don't have to choose one or the other, by the way. Standard and custom web parts can sit side by side on the same page.

## Examples from our work

We have built around 38 web parts for one organisation. They include a main navigation, a news centre, an org chart, a people directory, work anniversaries, polls and a video carousel.

A new web part usually takes us 5 to 10 hours, or 1 to 2 working days. Most changes after that take 2 hours or less. We have worked with this client in weekly sprints for almost a year.

The most common reason for a custom web part there was: [TODO: Adam — häufigsten Grund bestätigen (Gestaltung, Daten aus mehreren Quellen oder eigene Logik?).]

## How much does a custom web part cost?

A custom web part costs development time, not a licence. How much time depends mainly on the data, the settings and the design.

We have written up exactly which factors drive the effort in a separate article: [How much does a SharePoint web part cost?](/en/blog/sharepoint-web-part-cost)

## Three questions before you decide

1. **Have you tried the standard web part with all its settings?** Some of what seems missing is just well hidden.
2. **Is the web part needed on one page or on many?** For a single page, a custom web part pays off less often.
3. **Who takes care of changes?** A custom web part needs someone to look after it when requirements change.

## When we are not the right choice

If a standard web part with the right settings is enough, you don't need a custom one. We'll tell you so.

If there's a ready-made third-party product that fits exactly, that's often the faster route.

And if you run SharePoint Server in your own data centre rather than SharePoint Online, please check that with us first. [TODO: bestätigen, ob wir SPFx-Webparts für SharePoint Server umsetzen.]
