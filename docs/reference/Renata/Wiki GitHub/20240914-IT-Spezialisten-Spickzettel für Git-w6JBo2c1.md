# IT-Spezialisten-Spickzettel für Git

## 1. Erweiterte Verwaltung von Repositories

- **Bare Repositories erstellen:**

  - Verwenden Sie ein `bare` Repository für Server-Speicherorte:

  ```bash
  git init --bare <repository-name>.git
  ```

- **Verwalten von Hooks:**

  - Schreiben und verwalten Sie Git-Hooks (z. B. `pre-commit`, `post-merge`), um benutzerdefinierte Aktionen auszuführen:
  - Beispiel für einen `pre-commit` Hook:

  ```bash
  #!/bin/sh
  # Verhindern Sie Commits mit leeren Nachrichten
  if test -z "$(git log -1 --pretty=%B)"; then
    echo "Commit message darf nicht leer sein." >&2
    exit 1
  fi
  ```

- **Remote Repository Verwaltung:**
  - Verwalten und konfigurieren Sie mehrere Remotes:
  ```bash
  git remote set-url --add <name> <new-url>
  ```

## 2. Sicherheits- und Compliance-Verwaltung

- **SSH-Zugriff und Authentifizierung:**

  - Verwenden Sie SSH-Schlüssel für eine sichere Authentifizierung:

  ```bash
  ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  ```

- **Signierte Commits erstellen:**

  - Verwenden Sie `GPG` zum Signieren von Commits:

  ```bash
  git commit -S -m "Signierter Commit"
  ```

- **Audit-Trails und Protokollierung:**
  - Konfigurieren Sie erweiterte Protokollierung und Audit-Trails mit `git log` und benutzerdefinierten Hooks.

## 3. Performance-Optimierung

- **Grosse Repositories verwalten:**

  - Verwenden Sie `git-lfs` (Large File Storage) für große Binärdateien:

  ```bash
  git lfs install
  git lfs track "*.psd"
  ```

- **Rebase anstelle von Merge verwenden:**

  - Minimieren Sie die Anzahl der Merges durch den Einsatz von `git rebase`.

- **Effiziente Branch-Strategien:**
  - Implementieren Sie effiziente Branch-Strategien wie **Git Flow** oder **Trunk-Based Development**.

## 4. Disaster Recovery und Backup

- **Regelmäßige Backups des Git-Servers:**

  - Implementieren Sie Backup-Strategien mit Tools wie `rsync` oder `git bundle`:

  ```bash
  git bundle create <backup-file>.bundle --all
  ```

- **Wiederherstellung verlorener Commits:**
  - Verwenden Sie `git reflog`, um verlorene Commits und Änderungen wiederherzustellen:
  ```bash
  git reflog
  git checkout <commit-hash>
  ```

## 5. Support und Wartung

- **Erstellung von Git-Server-Architekturen:**

  - Planen und implementieren Sie Git-Server-Architekturen für Hochverfügbarkeit und Lastverteilung.

- **Schulung und Dokumentation für Entwickler:**

  - Entwickeln Sie Schulungen und Dokumentationen für Entwickler, um Best Practices für die Verwendung von Git sicherzustellen.

- **Regelmäßige Sicherheitsüberprüfungen:**
  - Führen Sie regelmäßige Sicherheitsüberprüfungen durch, um Schwachstellen im Repository-Setup zu identifizieren.
