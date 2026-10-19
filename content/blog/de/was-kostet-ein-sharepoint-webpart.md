---
title: "Was kostet ein SharePoint-Webpart?"
description: "Ein SharePoint-Webpart kostet so viel, wie seine Entwicklung an Stunden braucht. Bei uns sind das meist 5 bis 10 Stunden. Welche Faktoren den Aufwand bestimmen."
slug: was-kostet-ein-sharepoint-webpart
date: 2026-10-19
updated: 2026-10-19
readingTime: 4
tags: [SharePoint, SPFx, Kosten]
service: 0
review: "needs Adam"
---

Ein SharePoint-Webpart kostet so viel, wie seine Entwicklung an Stunden braucht. Bei uns sind das für einen neuen Webpart meist 5 bis 10 Stunden, also 1 bis 2 Arbeitstage.

Ob es eher 5 oder eher 10 Stunden werden, hängt von wenigen Faktoren ab. Diese Faktoren sollten Sie kennen, bevor Sie ein Angebot vergleichen.

## Was ist ein SharePoint-Webpart?

Ein Webpart ist ein Baustein auf einer SharePoint-Seite. SharePoint bringt eigene Webparts mit, etwa für Text, Bilder, Links und News. Eigene Webparts entstehen mit dem SharePoint Framework (SPFx), dem Entwicklungsmodell von Microsoft für SharePoint Online.

Ein eigener Webpart wird einmal gebaut und im App-Katalog Ihres SharePoint bereitgestellt. Danach fügt Ihre Redaktion ihn auf jeder Seite ein, wie jeden anderen Webpart.

## Was den Aufwand bestimmt

Sechs Fragen entscheiden über die Stunden. Die Tabelle zeigt, was eher wenig und was eher viel Aufwand bedeutet.

| Faktor | Weniger Aufwand | Mehr Aufwand |
|---|---|---|
| Daten | Feste Inhalte oder eine SharePoint-Liste | Mehrere Quellen, etwa Microsoft Graph oder ein externes System |
| Einstellungen | Keine oder wenige | Die Redaktion soll vieles selbst einstellen |
| Gestaltung | Im Stil von SharePoint (Fluent UI) | Eigenes Design mit mehreren Varianten |
| Bedienung | Inhalte anzeigen | Filtern, suchen, blättern, Formulare ausfüllen |
| Rechte | Alle sehen dasselbe | Inhalte je nach Gruppe |
| Sprachen | Eine Sprache | Mehrere Sprachen |

Ein Hinweis-Banner mit festem Text liegt am unteren Ende. Ein News Center, das Beiträge aus mehreren Quellen filtert und je nach Gruppe anzeigt, am oberen.

## Was zusätzlich Zeit kostet

Neben dem Bauen selbst gibt es drei Posten, die oft vergessen werden.

- **Abstimmung.** Je klarer Ihre Skizze, desto weniger Runden braucht es. Eine Zeichnung auf Papier reicht.
- **Bereitstellung.** Jemand mit Admin-Rechten muss das Paket im App-Katalog freigeben. Klären Sie früh, wer das bei Ihnen ist.
- **Testen in Ihrer Umgebung.** Ein Webpart sollte mit Ihren echten Inhalten und Rechten getestet werden, bevor er live geht.

## Was ein Webpart nicht kostet

Für SPFx-Webparts brauchen Sie keine zusätzliche Microsoft-Lizenz. Sie laufen in Ihrem bestehenden SharePoint Online. Weitere Kosten entstehen nur, wenn ein Webpart einen externen Dienst nutzt, zum Beispiel einen eigenen Server.

## Unsere Zahlen

Für eine Organisation haben wir rund 38 Webparts gebaut, in wöchentlichen Sprints seit fast einem Jahr. Daraus kommen diese Werte:

- Ein neuer Webpart braucht meist 5 bis 10 Stunden.
- Die meisten Änderungswünsche brauchen höchstens 2 Stunden.

Wir rechnen nach Aufwand ab. Vor dem Start bekommen Sie von uns eine Schätzung.

- Neuer Webpart: {{price:webPart}}
- Kleine Änderung: {{price:change}}

## Was in einer Schätzung stehen sollte

Zwei Angebote mit demselben Preis können sehr Verschiedenes enthalten. Fragen Sie nach, bevor Sie vergleichen:

- **Welche Stunden sind eingerechnet?** Nur das Bauen, oder auch Abstimmung, Tests und Bereitstellung?
- **Wie werden Änderungen abgerechnet?** Nach dem Start kommen fast immer Wünsche. Gut, wenn vorher klar ist, was eine kleine Änderung kostet.
- **Wem gehört der Code am Ende?** Und bekommen Sie eine Dokumentation, mit der auch jemand anderes weiterarbeiten kann?
- **Wie sehen Sie den Fortschritt?** Bei uns steht jede Aufgabe auf einem gemeinsamen Board. Sie sehen, was in Arbeit ist und was auf Ihr Feedback wartet.

## So halten Sie die Kosten klein

Die günstigste Stunde ist die, die nicht gebraucht wird.

1. **Prüfen Sie zuerst die Standard-Webparts.** Viele Anforderungen lassen sich mit den Einstellungen lösen, die SharePoint schon mitbringt. Wann sich ein eigener Webpart lohnt, lesen Sie in [SPFx-Webparts: Wann lohnt sich eine eigene Lösung?](/de/blog/spfx-webpart-oder-standard-webpart)
2. **Schicken Sie eine Skizze.** Ein Foto vom Whiteboard spart eine Abstimmungsrunde.
3. **Ein Webpart mit Einstellungen statt drei ähnlicher.** Wenn sich nur Farbe oder Inhalt unterscheidet, reicht oft ein Webpart, den die Redaktion anpasst.
4. **Planen Sie Änderungen ein.** Nach dem Start kommen fast immer Wünsche. Kleine Änderungen sind schnell erledigt, wenn sie gesammelt in einem Sprint landen.

## Wann wir nicht die richtige Wahl sind

Wenn ein Standard-Webpart Ihre Anforderung erfüllt, brauchen Sie keinen eigenen. Dann sagen wir Ihnen das.

Auch wenn Sie vor allem Seiten anlegen und Inhalte pflegen lassen wollen, sind wir nicht die Richtigen. Dafür braucht es keine Entwicklung.

Und wenn Sie ein komplettes Intranet zum Festpreis ausschreiben, passt unser Modell nicht: Wir arbeiten in wöchentlichen Sprints und rechnen nach Aufwand ab. [TODO: bestätigen, dass wir keine Festpreise anbieten.]
