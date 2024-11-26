# Erweiterter Spickzettel für GitHub



## 1. Erweiterte Repository-Verwaltung

- **Branches schützen:**
  - Gehen Sie zu **Settings > Branches** und konfigurieren Sie Schutzregeln, um Commits zu bestimmten Branches zu verhindern, ohne dass eine Überprüfung stattfindet.

- **Releases erstellen:**
  - Erstellen Sie Versionen Ihrer Software, indem Sie auf **Releases** klicken und eine neue Version mit Tags und Release-Notizen hinzufügen.

- **Webhook einrichten:**
  - Richten Sie Webhooks unter **Settings > Webhooks** ein, um benutzerdefinierte Benachrichtigungen oder Aktionen bei bestimmten Ereignissen zu erstellen.

## 2. Erweiterte Zusammenarbeit und Reviews

- **Code-Review-Prozess verbessern:**
  - Verwenden Sie **GitHub Code Review-Tools** wie Kommentare, Reviews und Vorschläge, um die Codequalität zu verbessern.

- **Teams und Organisationen verwalten:**
  - Erstellen und verwalten Sie Teams in Ihrer Organisation, um Zugriffsrechte und Berechtigungen effizient zu steuern.

## 3. Automatisierung mit GitHub Actions

- **Erstellen Sie benutzerdefinierte Workflows:**
  - Schreiben Sie benutzerdefinierte Workflow-Dateien in `.github/workflows` mit YAML, um CI/CD-Prozesse zu automatisieren.
  - Beispiel für eine Workflow-Datei:
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install
      - run: npm test
  ```

## 4. Sicherheit und Compliance

- **Geheime Umgebungsvariablen verwalten:**
  - Speichern Sie geheime Schlüssel und Tokens unter **Settings > Secrets** und verwenden Sie diese in Ihren Workflows.

- **Dependabot verwenden:**
  - Aktivieren Sie **Dependabot**, um Abhängigkeiten automatisch zu aktualisieren und Sicherheitslücken zu schließen.

## 5. Erweiterte Nutzung von GitHub Packages

- **Private Pakete veröffentlichen:**
  - Verwenden Sie GitHub Packages, um private Pakete zu hosten und zu verwalten, die nur innerhalb Ihrer Organisation verfügbar sind.

## 6. Tipps für Fortgeschrittene

- **Verwenden Sie GitHub CLI:**
  - Nutzen Sie die GitHub-CLI, um Aufgaben direkt über die Befehlszeile auszuführen:
  ```bash
  gh repo create <repo-name>
  ```
