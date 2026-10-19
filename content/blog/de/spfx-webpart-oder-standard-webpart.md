---
title: "SPFx-Webparts: Wann lohnt sich eine eigene Lösung statt Standard-Webparts?"
description: "Ein eigener SPFx-Webpart lohnt sich, wenn kein Standard-Webpart Ihre Inhalte so zeigt, wie Ihre Mitarbeitenden sie brauchen. Für Text, Bilder und Links reicht meist der Standard."
slug: spfx-webpart-oder-standard-webpart
date: 2026-10-19
updated: 2026-10-19
readingTime: 4
tags: [SPFx, SharePoint, Webparts]
service: 0
---

Ein eigener SPFx-Webpart lohnt sich, wenn kein Standard-Webpart Ihre Inhalte so zeigt, wie Ihre Mitarbeitenden sie brauchen. Für Text, Bilder, Links und einfache News reichen die Webparts, die SharePoint mitbringt, meist aus.

Die Frage ist also nicht „Standard oder eigene Lösung?“. Die Frage ist: Wo genau reicht der Standard nicht mehr?

## Was ist SPFx?

SPFx steht für SharePoint Framework. Es ist das Entwicklungsmodell von Microsoft, mit dem man eigene Webparts für SharePoint Online baut.

Ein SPFx-Webpart läuft im Browser, direkt auf Ihrer SharePoint-Seite. Er sieht nur, was die angemeldete Person sehen darf. Ihre Redaktion fügt ihn ein wie jeden anderen Webpart und stellt ihn über seine Einstellungen ein.

## Was Standard-Webparts gut können

SharePoint bringt Webparts für die häufigsten Aufgaben mit: Text, Bilder, Links, News, Termine, Personen und Dokumente.

Sie haben drei große Vorteile:

- Sie sind in SharePoint enthalten und kosten nichts extra.
- Microsoft pflegt sie und entwickelt sie weiter.
- Ihre Redaktion kennt sie schon.

Ihre Grenzen liegen dort, wo die Einstellungen enden. Layout, Design und Logik können Sie nur so weit ändern, wie Microsoft es vorgesehen hat.

## Standard-Webpart und eigener Webpart im Vergleich

| Anforderung | Standard-Webpart | Eigener SPFx-Webpart |
|---|---|---|
| Text, Bilder, Links | Reicht | Nicht nötig |
| Gestaltung nach Ihrem Corporate Design | Im Rahmen der Einstellungen | Frei gestaltbar |
| Daten aus mehreren Quellen zusammenführen | Begrenzt | Ja, etwa über Microsoft Graph |
| Eigene Logik, etwa Filter oder Freigaben | Nur was vorgesehen ist | Ja |
| Wartung und Updates | Durch Microsoft | Durch Sie oder Ihren Dienstleister |
| Kosten | In SharePoint enthalten | Entwicklungszeit, bei uns meist 5–10 Stunden pro Webpart |

## Vier Zeichen, dass der Standard nicht mehr reicht

1. **Die Redaktion baut Umwege.** Bilder mit eingebautem Text, Tabellen als Navigation, Links auf Links.
2. **Die Startseite sieht nicht aus wie Ihre Organisation.** Wenn Gestaltung wichtig ist, stoßen die Einstellungen schnell an Grenzen.
3. **Daten liegen an mehreren Orten.** Eine Liste in SharePoint, Profile in Microsoft 365, Termine in einem Kalender: Ein eigener Webpart zeigt sie zusammen.
4. **Dieselbe Lösung wird auf vielen Seiten gebraucht.** Dann lohnt sich ein Baustein, den die Redaktion überall einsetzen und einstellen kann.

## Was ein eigener Webpart mit sich bringt

Ein eigener Webpart ist Software. Das hat Folgen, die Sie vorher kennen sollten.

- **Er braucht Pflege.** Microsoft entwickelt SPFx weiter. Ein eigener Webpart sollte deshalb von Zeit zu Zeit auf eine neue Version gebracht werden.
- **Barrierefreiheit ist Ihre Aufgabe.** Bei einem eigenen Webpart muss sie mitgebaut und geprüft werden.
- **Die Bereitstellung braucht Rechte.** Das Paket wird im App-Katalog Ihres SharePoint freigegeben. Dafür braucht es jemanden mit Admin-Rechten.

Sie müssen sich übrigens nicht für das eine oder das andere entscheiden. Auf einer Seite können Standard-Webparts und eigene nebeneinander stehen.

## Beispiele aus unserer Arbeit

Für eine Organisation haben wir rund 38 Webparts gebaut. Darunter sind eine Hauptnavigation, ein News Center, ein Organigramm, ein Personenverzeichnis, Jubiläen, Umfragen und ein Video-Karussell.

Ein neuer Webpart braucht bei uns meist 5 bis 10 Stunden, also 1 bis 2 Arbeitstage. Die meisten Änderungen danach brauchen höchstens 2 Stunden. Wir arbeiten mit diesem Kunden seit fast einem Jahr in wöchentlichen Sprints.

## Was kostet ein eigener Webpart?

Ein eigener Webpart kostet Entwicklungszeit, keine Lizenz. Wie viel Zeit, hängt vor allem von den Daten, den Einstellungen und der Gestaltung ab.

Welche Faktoren genau den Aufwand treiben, haben wir in einem eigenen Artikel aufgeschrieben: [Was kostet ein SharePoint-Webpart?](/de/blog/was-kostet-ein-sharepoint-webpart)

## Drei Fragen vor der Entscheidung

1. **Haben Sie den Standard-Webpart mit allen Einstellungen ausprobiert?** Manches, was fehlt, ist nur gut versteckt.
2. **Wird der Webpart auf einer Seite gebraucht oder auf vielen?** Für eine einzelne Seite lohnt sich ein eigener Webpart seltener.
3. **Wer kümmert sich um Änderungen?** Ein eigener Webpart braucht jemanden, der ihn betreut, wenn sich Wünsche ändern.

## Wann wir nicht die richtige Wahl sind

Wenn ein Standard-Webpart mit den richtigen Einstellungen reicht, brauchen Sie keinen eigenen. Dann sagen wir Ihnen das.

Wenn es ein fertiges Produkt eines Drittanbieters gibt, das genau passt, ist das oft der schnellere Weg.

Und wenn Sie SharePoint Server im eigenen Rechenzentrum betreiben statt SharePoint Online, klären Sie das bitte zuerst mit uns.
