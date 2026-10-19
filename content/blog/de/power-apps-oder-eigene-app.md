---
title: "Power Apps oder eigene App: Was passt wann?"
description: "Power Apps passt für einfache Formulare, die Ihr Team selbst pflegt. Eine eigene App lohnt sich, wenn Ablauf, Datenmenge oder Gestaltung darüber hinausgehen."
slug: power-apps-oder-eigene-app
date: 2026-10-19
updated: 2026-10-19
readingTime: 4
tags: [Power Apps, Interne Apps, Microsoft 365]
service: 1
review: "needs Adam"
---

Power Apps passt, wenn Ihr Team ein einfaches Formular oder eine Liste selbst bauen und pflegen will. Eine eigene App passt, wenn die Anwendung genau Ihrem Ablauf folgen muss, viele Daten verarbeitet oder wie Ihr Intranet aussehen soll.

Beide Wege sind gut. Entscheidend sind zwei Fragen: Wer pflegt die App in einem Jahr? Und wie weit soll sie wachsen?

## Was ist Power Apps?

Power Apps ist die Low-Code-Plattform von Microsoft. Apps entstehen im Browser, aus fertigen Bausteinen und Formeln in der Sprache Power Fx. Die Daten kommen über sogenannte Connectoren, zum Beispiel aus SharePoint-Listen, Excel oder Dataverse.

Der Vorteil: Fachabteilungen können ohne Programmierkenntnisse starten. Wer sich einarbeitet, baut ein einfaches Formular selbst.

Zur Lizenz: Mit vielen Microsoft-365-Lizenzen können Sie Power Apps mit Standard-Connectoren nutzen. Premium-Connectoren und Dataverse brauchen eine zusätzliche Lizenz. [TODO: aktuelle Lizenzbedingungen bei Microsoft prüfen, bevor der Artikel live geht.]

## Was ist eine eigene App?

Eine eigene App wird programmiert. Bei uns entsteht sie mit React, Next.js oder Python. Ihre Mitarbeitenden melden sich mit ihrem Microsoft-Konto an, Rechte vergeben wir nach Gruppen. Daten aus Microsoft 365 lesen und schreiben wir über Microsoft Graph.

Sie bekommen genau die Felder, Schritte und Ansichten, die Ihr Ablauf braucht. Nicht mehr und nicht weniger.

## Power Apps und eigene App im Vergleich

| Frage | Power Apps | Eigene App |
|---|---|---|
| Wer baut und pflegt sie? | Ihr Team, nach etwas Einarbeitung | Ein Entwicklerteam |
| Wie startet man? | Sofort im Browser, aus fertigen Bausteinen | Mit einer Skizze; die erste Version braucht bei uns etwa 10–14 Stunden Arbeit |
| Wie frei ist die Gestaltung? | Im Rahmen der Bausteine | Frei, nach Ihrem Design |
| Wie komplex darf der Ablauf sein? | Formeln und Power Automate | Beliebig, im Code |
| Was passiert bei vielen Daten? | Möglich, aber Abfragen haben Grenzen (Stichwort Delegation) | Abfragen werden für Ihre Daten gebaut |
| Welche Lizenzen braucht es? | Je nach Connector, siehe oben | Keine Power-Apps-Lizenz [TODO: Hosting-Kosten eigener Apps klären] |
| Wer ändert etwas? | Ihr Team selbst | Wir; die meisten Änderungen brauchen bei uns höchstens 2 Stunden |

## Wann Power Apps die bessere Wahl ist

Power Apps ist stark, wenn die Aufgabe klein und klar ist.

- Das Formular hat wenige Felder und eine einfache Logik.
- Die Daten liegen schon in einer SharePoint-Liste oder in Excel.
- Jemand in Ihrem Team will die App selbst pflegen und hat Zeit dafür.
- Das Aussehen ist zweitrangig.

Dann sparen Sie Zeit und Geld, wenn Sie selbst bauen. Eine Entwicklerin brauchen Sie dafür nicht.

Welche kleinen Apps sich im Alltag bewähren, zeigen wir in [5 Beispiele für interne Apps](/de/blog/interne-apps-die-mitarbeitende-nutzen).

## Wann eine eigene App die bessere Wahl ist

Eine eigene App lohnt sich, wenn mehrere Menschen in mehreren Schritten zusammenarbeiten.

- Ein Ablauf hat Rollen und Freigaben. Beispiel: Alle dürfen einen Beitrag für die Intranet-News schreiben, aber erst die Kommunikation gibt ihn frei.
- Die App soll aussehen wie Ihr Intranet, nicht wie ein Formular.
- Es gibt viele Einträge oder mehrere Datenquellen.
- Eine bestehende Power-App ist so gewachsen, dass niemand mehr Änderungen wagt.

In diesen Fällen kostet eine eigene App am Anfang mehr Zeit. Dafür passt sie später zu Ihrem Ablauf, statt dass sich der Ablauf der App anpasst.

## Und wenn Sie schon eine Power-App haben?

Eine Power-App, die gut läuft, muss nicht weg. Lassen Sie sie laufen.

Stößt sie an Grenzen, muss sie nicht auf einen Schlag ersetzt werden. Eine eigene App kann dieselben SharePoint-Listen lesen und schreiben. So bleiben die Daten, wo sie sind, und die neue App übernimmt Schritt für Schritt.

## So entscheiden Sie in fünf Minuten

Beantworten Sie drei Fragen.

1. **Wer pflegt die App in einem Jahr?** Wenn Ihr eigenes Team das will und kann, spricht viel für Power Apps.
2. **Wie viele Schritte und Rollen hat der Ablauf?** Ein Formular, eine Liste: Power Apps. Antrag, Prüfung, Freigabe, Benachrichtigung: eher eine eigene App.
3. **Wie wichtig ist das Aussehen?** Soll die App Teil Ihres Intranets sein, mit Ihrem Design, ist eine eigene App einfacher.

Wenn Sie unsicher sind, schicken Sie uns eine Skizze. Ein Foto vom Whiteboard reicht. Wir sagen Ihnen, welcher Weg passt, auch wenn es Power Apps ist.

## So arbeiten wir an einer eigenen App

Zuerst sprechen wir über Ihre Skizze. Dann bauen wir eine erste Version zum Anklicken. Danach arbeiten wir in wöchentlichen Sprints: Jede Woche sehen Sie, was fertig ist, und sagen, was sich ändern soll. Mit einem Kunden arbeiten wir so seit fast einem Jahr.

## Wann wir nicht die richtige Wahl sind

Wenn Power Apps für Ihre Aufgabe reicht, raten wir Ihnen dazu. Eine eigene App kostet Entwicklungszeit, die Sie dann nicht brauchen.

Wir bauen eigene Apps und SharePoint-Webparts, keine Power Apps. Suchen Sie jemanden, der Ihre bestehende Power-App weiterentwickelt, ist ein Power-Platform-Dienstleister die bessere Adresse. [TODO: bestätigen, dass wir keine Power Apps bauen oder betreuen.]
