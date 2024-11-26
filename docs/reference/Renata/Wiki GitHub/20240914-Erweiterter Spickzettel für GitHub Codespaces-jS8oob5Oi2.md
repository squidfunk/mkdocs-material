# Erweiterter Spickzettel für GitHub Codespaces



## 1. Erweiterte Container-Konfiguration

- **Verwendung von devcontainer.json:**
  - Passen Sie die Entwicklungsumgebung an, indem Sie eine `.devcontainer/devcontainer.json`-Datei hinzufügen:
  ```json
  {
    "name": "Meine Umgebung",
    "image": "mcr.microsoft.com/vscode/devcontainers/python:3",
    "extensions": [
      "ms-python.python",
      "ms-azuretools.vscode-docker"
    ],
    "settings": {
      "terminal.integrated.shell.linux": "/bin/bash"
    }
  }
  ```

- **Docker-Compose für Multi-Container-Umgebungen:**
  - Verwenden Sie `docker-compose.yml`, um mehrere Container zu definieren, die in Ihrer Entwicklungsumgebung laufen:
  ```yaml
  version: '3'
  services:
    web:
      image: nginx
      ports:
        - "80:80"
    db:
      image: postgres
  ```

## 2. Leistung und Ressourcenoptimierung

- **Größe und Typ des Codespaces festlegen:**
  - Wählen Sie die geeignete Größe und den Typ des Codespaces basierend auf den Anforderungen Ihres Projekts.

- **Benutzerdefinierte Umgebungen erstellen:**
  - Nutzen Sie vorkonfigurierte Images oder erstellen Sie Ihre eigenen Docker-Images, um die Entwicklungsumgebung zu optimieren.

## 3. Erweiterte Zusammenarbeit und Sharing

- **Gäste in Live Share einladen:**
  - Verwenden Sie **Live Share**-Einstellungen, um Gastentwickler einzuladen und deren Zugriffsrechte zu konfigurieren.

- **Codespaces vorab konfigurieren:**
  - Nutzen Sie `.github/codespaces`-Ordner, um Standard-Settings und -Workflows für Ihre Organisation zu definieren.

## 4. Automatisierung und CI/CD

- **Automatisierte Workflows mit GitHub Actions:**
  - Integrieren Sie GitHub Actions, um automatische Tests und Deployments direkt aus dem Codespace durchzuführen.

- **Custom Dotfiles verwenden:**
  - Konfigurieren Sie Dotfiles, um benutzerdefinierte Umgebungen und Einstellungen zu synchronisieren.

## 5. Erweiterte Sicherheitsrichtlinien

- **Netzwerkzugriff und Firewalls konfigurieren:**
  - Definieren Sie Netzwerksicherheitsrichtlinien, um den Zugriff auf Ihre Codespaces zu steuern.

- **Sichere Geheimnisse verwalten:**
  - Verwenden Sie GitHub Secrets, um API-Schlüssel und andere sensible Informationen zu schützen.

## 6. Tipps für Fortgeschrittene

- **Verwenden Sie VS Code Remote Extensions:**
  - Nutzen Sie **Remote-SSH** oder **Remote-Containers**, um die lokale Entwicklung zu erweitern.

- **Automatisierte Wartungsaufgaben einrichten:**
  - Planen Sie regelmäßige Wartungsaufgaben wie das Bereinigen von Containern oder das Aktualisieren von Abhängigkeiten.
