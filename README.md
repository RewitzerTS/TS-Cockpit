# TS Cockpit

TOP SPORTS Club-Cockpit: zentrale Browser-Startseite für die Clubs.

**Eigenständiger Entwurf:** https://rewitzerts.github.io/TS-Cockpit/

GitHub Pages liefert das vollständige Cockpit als statische Anwendung aus – ohne ChatGPT-Anmeldung und ohne Supabase. Editor einschließlich Kursplan im Querformat, Partner-Beispieldaten, Clubauswahl und Monatsansicht sind enthalten. Die Kennzahlen und News stammen aus dem gespeicherten Entwurfsstand. CÜ ist eine ausdrücklich gekennzeichnete Simulation ohne Speicherung. Verwaltung ist im öffentlichen Entwurf deaktiviert; es gibt keinen unsicheren Browser-Adminzugang.

Jeder Push nach `main` baut und veröffentlicht den Entwurf über `.github/workflows/pages.yml`. In Settings → Pages ist **GitHub Actions** als Quelle eingestellt. Lokal: `npm run build:pages` und `npm run preview:pages`.

Die bisherige servergestützte Variante bleibt im Quellcode erhalten. Die folgenden Abschnitte beschreiben diese Variante und ihre spätere Backend-Anbindung, nicht den GitHub-Pages-Entwurf.

**Bisherige Sites-Instanz:** https://top-sports-club-cockpit.r-rewitzer.chatgpt.site

## Funktionen

- Zentral verwaltete Tool-Kacheln mit 25 Symbolen und anpassbarer Reihenfolge.
- News als statischer Hinweis oder Laufschrift, orange mit schwarzem Text.
- Vertragszahlen mit Monatsauswahl, Monatszielen und Standortzuordnung.
- CÜ-Erfassung in sechs Schritten: Standort, Datum, neun Tarife, Online-Anteil, Bestätigung und Mitarbeitername. Online-Abschlüsse sind bereits in den Tarifzahlen enthalten.
- Integrierter TOP SPORTS Editor.
- Firmen-/Vereinsfitness mit zwölf ausdrücklich fiktiven Beispielpartnern für sechs Standorte.

## Aktueller Betriebsmodus

Die veröffentlichte Seite ist für alle mit dem Link erreichbar. Ohne Anmeldung lässt sich die CÜ als Simulation ausprobieren; dabei werden keine Einträge gespeichert. Angemeldete Besucher können CÜ-Einträge speichern. Nur der Administrator darf Kacheln, News und Ausgangszahlen ändern oder CÜ-Einträge stornieren.

Die Administration wird beim ersten passenden Login anhand der serverseitigen Umgebungsvariable `DASHBOARD_OWNER_EMAIL` und des vertrauenswürdigen Sites-Identitätsheaders an die Benutzer-ID gebunden. Der erste beliebige Besucher erhält keine Administrationsrechte.

Die Partnerverwaltung läuft vorübergehend ohne Supabase-Anmeldung. Ihre Beispiele erscheinen ausschließlich im Vorschaumodus. Für die spätere Wiederanbindung sind ein neues Supabase-Projekt samt Tabellen, Rollen, RLS, Funktionen und Benutzerkonten erforderlich. Danach `public/modules/partnerverwaltung/connection-config.js` mit Projekt-URL und **Publishable Key** konfigurieren und den Modus auf `supabase` ändern. Niemals Secret-/Service-Role-Schlüssel im Browsercode hinterlegen.

## Technik und lokaler Start

Node.js ab 22.13, React/Vinext, TypeScript, Vite, Cloudflare D1/SQLite. Die veröffentlichte Anwendung nutzt die Sites-Identitätsheader; sie ist nicht als reine GitHub-Pages-Seite ausgelegt.

```sh
npm ci
npm run dev
```

Die lokale Vorschau läuft normalerweise unter http://localhost:5173/. Lokale Testidentitäten ersetzen keine produktive Anmeldung. Datenbankmigrationen liegen in `drizzle/`; beim Sites-Deployment werden sie angewendet. Für eine neue lokale Datenbank die Migrationen mit der zum Starter gehörenden lokalen D1-Konfiguration einspielen.

```sh
npm run build
npm run test:memberships
node tests/partner-auth.cjs
```

## Projektstruktur

- `app/`: Dashboard, CÜ-Dialog, Monatsauswertung und API-Routen.
- `lib/` und `db/`: Datenmodelle, Validierung und Datenbankzugriff.
- `drizzle/`: Datenbankmigrationen.
- `public/modules/design-studio/`: integrierter Editor.
- `public/modules/partnerverwaltung/`: Partnerverwaltung und Beispieldaten.
- `.openai/hosting.json`: bestehende Sites-Projektzuordnung, keine Zugangsschlüssel.
- `tests/`: Prüfungen für Berechnung, Rollen und Datenzuordnung.

## Daten und Veröffentlichung

Der Quellcode enthält den Ausgangsstand der Vertragszahlen und die Startkonfiguration. Laufende Änderungen und CÜ-Einträge werden in D1 gespeichert und sind nicht Bestandteil dieses Repositorys. GitHub sichert deshalb den Code, nicht die Live-Datenbank.

Lokale Datenbanken, `.env`-Dateien, Abhängigkeiten und temporäre Arbeitsverzeichnisse sind ausgeschlossen. Das bestehende Sites-Projekt beim Veröffentlichen wiederverwenden. Eine Übertragung nach GitHub allein aktualisiert die gehostete Seite nicht automatisch.
