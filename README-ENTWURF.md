# TOP SPORTS Club-Cockpit – erster Entwurf

## Funktionsumfang
- Kacheln für Magicline, Mywellness, Outlook, Vertragszahlen, Lead Management und Microsoft 365.
- Zentrale Verwaltung: Kacheln hinzufügen, bearbeiten, entfernen und über Pfeile anordnen.
- Bearbeitbare Namen, Beschreibungen, HTTPS-Links, Symbole und Farben.
- Standortauswahl für sechs Clubs; nur diese Gerätepräferenz liegt im Browser.
- Monatsübersicht und Standortvergleich; Vertragszahlen, Ziele und Abgänge zentral bearbeitbar.
- Gemeinsame Datenbank, automatische Aktualisierung alle 20 Sekunden bei sichtbaren Seiten und beim erneuten Fokussieren.
- Schreibzugriff wird serverseitig geprüft; Versionskonflikte verhindern das Überschreiben neuerer Änderungen.

## Datenstand
Die vorbelegten Zahlen stammen aus der vom Nutzer bereitgestellten Branchenradar-Tabelle vom 15.09.2026. Es sind keine Live-Daten. Das Monatsziel ergibt sich jeweils aus Neuverträgen plus noch fehlenden Verträgen. Magicline, Mywellness und Lead Management benötigen noch die tatsächlichen Club-URLs. Für Outlook und Microsoft 365 sind allgemeine Einstiegsseiten hinterlegt.

## Lokale Vorschau
Die Vorschau läuft auf http://localhost:5173/ (nur dieser Rechner).
Projekt: Vinext/React, D1/SQLite. Zum erneuten Start nach Installation: `npm run dev`.
Die lokale Anmeldung verwendet ausschließlich die vom Sites-Starter bereitgestellte Testidentität. Sie ist im Produktionsbuild nicht enthalten.

## Online-Status und nächster Schritt
Das private Sites-Projekt wurde registriert; die Online-Veröffentlichung wurde noch nicht durchgeführt. Die Sites-Erweiterung und ihr Veröffentlichungswerkzeug waren am Ende der Arbeit nicht mehr am angegebenen Installationsort vorhanden. Die Identität des registrierten Projekts steht in `.openai/hosting.json`; dieses Projekt bei Fortsetzung wiederverwenden, kein Duplikat erstellen.

Nach Wiederherstellung der Sites-Erweiterung den vorhandenen Build mit dem Sites-Veröffentlichungsablauf veröffentlichen. D1-Migrationen in `drizzle/` werden dabei angewendet. Die Erstveröffentlichung muss privat bleiben. Der erste authentifizierte Aufruf initialisiert den Eigentümer als Administrator. Erst nach diesem ersten Aufruf die erlaubten Club-Zugänge einrichten. Die Freigabe für Club-Mitarbeiter und ggf. ein anderer Unternehmens-Login sind noch abzustimmen. Keine offene öffentliche Freigabe für die internen Zahlen verwenden.

## Geprüft
- TypeScript-Prüfung und Produktionsbuild erfolgreich.
- Desktop und mobile Darstellung im Browser kontrolliert.
- Neue Kachel im Editor angelegt und zentral gespeichert.
- Zweite unabhängige Sitzung liest Änderungen.
- Veraltete Speicherversuche werden mit Versionskonflikt abgewiesen.
- Unsichere Link-Protokolle und anonyme Datenzugriffe werden abgewiesen.
- Vorübergehende lokale Prüfdaten anschließend entfernt und die Ausgangszahlen wiederhergestellt.

## Enthaltene Dateien
Der Quellcode enthält keine Passwörter, Zugangstoken oder Laufzeitdatenbank. Abhängigkeiten und erzeugte Build-Dateien sind nicht im ZIP. Änderungen an den synchronisierten Projektquellen unter `sources/` wurden nicht vorgenommen.

## Gestaltung aktualisiert
Dunkles TOP SPORTS Design gemäß Nutzerwunsch: anthrazitfarbene Flächen, Original-Logo von topsports.fitness und Markenorange #f9a72b. Bestehende Bedienung und gespeicherte Daten bleiben erhalten. Auch die Verwaltungs- und Eingabeflächen sind dunkel gestaltet.

## Berechtigungen und Symbole
- 25 Symbole mit Vorschau, gruppiert nach Verwaltung, Fitness, Zeit & Termine sowie Wissen.
- Nur der hinterlegte Administrator kann Kacheln und Zahlen verändern. Andere angemeldete Benutzer erhalten ausschließlich Lesezugriff.
- Entzug der Bearbeitungsrolle schließt beim nächsten Datenabruf die Verwaltung.
- Rollenprüfung der API mit isolierter Testdatenbank geprüft: Lesezugriff erlaubt, Änderungen durch Nicht-Admins abgewiesen, alle 25 Symbole durch Admin speicherbar.
- Die lokale Vorschau verwendet weiterhin eine gemeinsame Admin-Testidentität; die echten Club-Konten werden beim Onlinebetrieb eingerichtet.

## CÜ (Clubübersicht) und News
- Die neue CÜ-Kachel öffnet eine eigenständige Erfassung für angemeldete Mitarbeiter. Die Bearbeitung von Kacheln, Zielen und News bleibt beim Admin.
- Pro Eintrag genau ein Abschluss: ausdrücklich gewählter Standort, Mitarbeitername, Vertragsreferenz und Abschlussdatum. Keine Vorbelegung aus dem Dashboard-Standortfilter; abschließende Bestätigung nennt den Club erneut.
- Standort-IDs werden serverseitig validiert. Zählung und Eintragslisten sind nach Club getrennt. Mitarbeiter sehen ihre eigenen Einträge, der Admin alle Einträge des gewählten Clubs (letzte 100 im Berichtsmonat).
- Vertragsreferenzen sind innerhalb eines Standorts eindeutig. Wiederholte Übertragung derselben Anfrage zählt nicht erneut. Eine Referenz bleibt auch nach Stornierung reserviert.
- Zielerreichung = Ausgangsstand + nicht stornierte CÜ-Einträge im Berichtsmonat nach dem Ausgangsdatum. Eingaben vor/auf dem Ausgangsdatum, in anderen Berichtsmonaten oder in der Zukunft werden abgewiesen.
- Wird der Ausgangsstand auf einen späteren Tag verschoben, müssen die Basiszahlen alle Abschlüsse bis einschließlich dieses Tages enthalten. Diese Einträge werden dann nicht nochmals addiert. Zum Monatswechsel Berichtsmonat, Ausgangsdatum, Basiszahlen und Ziele gemeinsam aktualisieren (für einen leeren Monat Basis 0 und Ausgangsdatum letzter Tag des Vormonats).
- Nur Admins können neue CÜ-Fehleinträge stornieren. Bereits im Ausgangsstand enthaltene Einträge sind darüber nicht stornierbar; dann ist der Basiswert zu korrigieren.
- News: ein zentraler Meldungsbereich mit optionaler Überschrift, Text, Ein-/Ausschalter und Auswahl „Statisch“ oder „Laufschrift“. Statisch über den Tools; Laufschrift orange mit schwarzem Text, Pausefunktion und Rücksicht auf reduzierte Bewegung. Keine Meldung voreingestellt.
- Neue Migration: `drizzle/0001_wooden_joshua_kane.sql`, lokal angewendet. Fügt die Mitgliedschaftstabelle und bei bestehenden Dashboards einmalig die CÜ-Kachel hinzu. Bei späterer Veröffentlichung zusammen mit der ersten Migration anwenden.
- Supabase wurde nicht eingerichtet. Daten liegen in der vorhandenen lokalen D1/SQLite-Vorschau. Erst die spätere Online-Anbindung ermöglicht den produktiven gemeinsamen Zugriff der Club-Rechner. Die lokale Testidentität unterscheidet noch keine echten Mitarbeiterkonten.
- Tests: `npm run test:memberships` prüft die echten API-Funktionen gegen eine isolierte SQLite-Datenbank, inklusive Standorttrennung, Doppelmeldungen, Basisstand, Stornierung, Rollen und News. Zusätzlich wurden die CÜ-Erfassung und beide News-Modi in der Browseroberfläche geprüft. Temporäre Prüfdaten wurden entfernt.

## Integrierte Werkzeuge und orange News
- Statische News verwenden wie die Laufschrift einen orangenen Hintergrund (#f9a72b) mit schwarzer Schrift (#111).
- TOP SPORTS Editor als mitgelieferte Anwendung unter `public/modules/design-studio`, übernommen aus dem vorhandenen lokalen Design-Studio-Projekt. Vorlagen, Ebenen, Text-/Bildbearbeitung, QR-Codes, Formen, Drucken und PDF-/PNG-Export bleiben enthalten.
- Firmen-/Vereinsfitness als mitgelieferte Partnerverwaltung unter `public/modules/partnerverwaltung`, übernommen aus https://github.com/RewitzerTS/ChallengeTSCan, Commit 08c0ba976361ba6e55e91a4ade57e80cf9ed5c34.
- Beide Module laufen in eigenen eingebetteten Ansichten innerhalb des Dashboards mit „Zur Clubübersicht“. Es werden lokale Anwendungskopien ausgeliefert, keine externen Webseiten verlinkt. Die eingebetteten Ansichten bleiben beim Wechsel geladen, damit der Arbeitsstand erhalten bleibt. Browser-Neuladen ersetzt kein Speichern des Editorprojekts.
- Partnerverwaltung nutzt unverändert ihre bereits vorhandene Supabase-Verbindung, Rollen und Anmeldung. Das Dashboard selbst wurde nicht auf Supabase umgestellt. Kein gemeinsames Login eingerichtet, keine Partnerdaten exportiert, keine RLS-Regeln oder Benutzerkonten geändert. Nur Browser-Publishable-Key im übernommenen Frontend; keine Serverfunktionen oder Konfigurationsgeheimnisse veröffentlicht.
- Benutzerverwaltung, Archiv und weitere Partnerfunktionen bleiben wie im Ursprungsprojekt enthalten und unterliegen dessen Rollen. Der Login bleibt vor dem Zugriff auf Daten erforderlich.
- Neue Datenmigrationen 0002 und 0003 ergänzen die zwei Kacheln einmalig in bestehenden Dashboards, ohne sonstige Einstellungen oder News zu überschreiben. Für neue Dashboards sind sie ebenfalls in den Standardkacheln enthalten.
- Browserprüfung: Editor initialisiert 24 Ebenen, Text hinzufügen/Rückgängig getestet. Partner-Anmeldemaske startet ohne Konsolenfehler. Authentifizierter Partnerdatenzugriff wurde mangels Anmeldung nicht getestet; keine Echt-Daten verändert.
- Quellkopien sind fest eingebunden. Spätere Änderungen im Ursprungsrepository/Editor werden nicht automatisch übernommen, sondern müssen gezielt synchronisiert werden.

## CÜ als Tagesbericht (ersetzt die bisherige Einzelerfassung)
Die CÜ-Kachel öffnet jetzt einen geführten Dialog mit sechs Schritten: Standort ausdrücklich bestätigen; Tag wählen; neun Tarifzahlen erfassen; davon online erfassen; Gesamtzahl mit Ja/Nein bestätigen; Vor- und Nachname eingeben und speichern. Nein führt zurück zu den Tarifzahlen, alle Eingaben bleiben erhalten.
Tarife: Basic, All-In und FiFi, jeweils 1/12/24 Monate. Die Summe aller neun Tarifzahlen ist die Gesamtzahl. Online ist laut Nutzer bereits enthalten und wird nur separat ausgewiesen (0 bis Gesamtzahl), nicht addiert. Leere Zählfelder entsprechen 0; Nullmeldungen sind erlaubt.
Tagesberichte liegen getrennt in club_reports, inklusive Tarifaufteilung, Online-Anteil, berechnetem Gesamtwert, Vor-/Nachname, Konto-ID und Erfassungszeit. Migration 0004_mean_hiroim.sql ist lokal angewendet. Ein eindeutiger Index erlaubt genau eine aktive CÜ je Club und Datum. Wiederholtes Speichern derselben Anfrage ist idempotent. Bestehende Einzeleinträge bleiben erhalten; aktive Einzeleinträge und Tagesberichte für denselben Club/Tag können nicht gemeinsam neu erfasst werden, um Doppelzählungen zu vermeiden.
Die Zielerreichung summiert die Tages-Gesamtzahlen, nicht die Zahl der Berichte. Der bestehende Ausgangsstand/Stichtag bleibt gültig. Im aktuellen Berichtsmonat kann der Admin auf dem Datumsschritt eine fehlerhafte CÜ stornieren und danach neu erfassen; alte, bereits im Ausgangsstand enthaltene Berichte sind hiervon ausgeschlossen.
Tests mit isolierter SQLite-Datenbank prüfen Tarifsumme, Online-Teilmenge, ungültige Werte, fehlende Bestätigung/Namen, Clubtrennung, Tagesduplikate, Nullmeldung, Stornierung und Wiedererfassung. Browserprüfung bestätigt alle sechs Schritte und den Nein-Zweig, ohne einen Testbericht in den Nutzerdaten zu speichern.

## Vertragszahlen-Popup
Der Vergleichsbereich auf der Startseite wurde entfernt. Die Kachel Vertragszahlen und der Button im Monatsüberblick öffnen ein Dialogfenster mit allen sechs Standorten, Neuverträgen, Monatszielen, Zielerreichung, Restziel und Abgängen. Berechnete CÜ-Summen bleiben enthalten. Dialog, Schließen und Darstellung im Browser geprüft.
