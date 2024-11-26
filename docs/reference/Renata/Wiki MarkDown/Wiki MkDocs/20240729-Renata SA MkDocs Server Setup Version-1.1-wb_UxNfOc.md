# Renata SA MkDocs Server Setup Version-1.1

# Renata SA MkDocs Vollständiger Leitfaden

## Inhaltsverzeichnis
1. [Einführung](#einführung)
2. [Installation](#installation)
3. [Projekt-Setup](#projekt-setup)
4. [Konfiguration](#konfiguration)
5. [Inhaltserstellung](#inhaltserstellung)
6. [Lokale Vorschau und Erstellung](#lokale-vorschau-und-erstellung)
7. [Markdown-Linting](#markdown-linting)
8. [Backup](#backup)
9. [Weiterentwicklung](#weiterentwicklung)
10. [Implementierung eines Login-Portals](#implementierung-eines-login-portals)
11. [Unternehmensanwendung](#unternehmensanwendung)
12. [Dokumentenexport](#dokumentenexport)
13. [Sharing-Funktionalität](#sharing-funktionalität)

## Einführung

Dieser Leitfaden hilft dir bei der Einrichtung, Konfiguration und Wartung der MkDocs-basierten Dokumentationsplattform für das Renata SA ITC Team. Er deckt alles von der Installation bis zur Implementierung erweiterter Funktionen ab.

# Installation

### Schritt 1: Python installieren

1. Geh zur [offiziellen Python-Website](https://www.python.org/downloads/) und lade die neueste Version herunter.
2. Führe den Installer aus. Aktiviere die Option "Add Python to PATH".
3. Überprüfe die Installation:
   ```
   python --version
   ```

### Schritt 2: MkDocs und Plugins installieren

```shell
pip install mkdocs mkdocs-material
pip install mkdocs-minify-plugin pymdown-extensions mkdocs-mermaid2-plugin
npm install -g markdownlint-cli
```

## Projekt-Setup

```shell
mkdocs new renata-sa-dokumentation
cd renata-sa-dokumentation
```

## Konfiguration

Ersetze den Inhalt der `mkdocs.yml` Datei:

```yaml
site_name: 'Renata SA ITC Dokumentation'
site_description: 'Umfassende technische Dokumentation für Renata SA'
site_author: 'Renata SA ITC Team'

theme:
  name: 'material'
  language: 'de'
  palette:
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: 'indigo'
      accent: 'indigo'
      toggle:
        icon: material/brightness-7
        name: In den Dunkelmodus wechseln
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: 'indigo'
      accent: 'indigo'
      toggle:
        icon: material/brightness-4
        name: In den Hellmodus wechseln
  features:
    - navigation.instant
    - navigation.tracking
    - navigation.tabs
    - navigation.top
    - navigation.expand
    - search.suggest
    - search.highlight
    - toc.integrate
    - content.code.annotate
    - content.tabs.link
    - content.code.copy
    - header.autohide

plugins:
  - search:
      lang: de
  - minify:
      minify_html: true
  - mermaid2:
      version: 8.13.5

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - admonition
  - pymdownx.arithmatex:
      generic: true
  - footnotes
  - pymdownx.details
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
  - pymdownx.mark
  - attr_list
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - codehilite
  - meta
  - toc:
      permalink: true
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.keys
  - pymdownx.magiclink
  - pymdownx.smartsymbols
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tilde

extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/renata-sa
    - icon: fontawesome/brands/linkedin
      link: https://www.linkedin.com/company/renata-sa

extra_javascript:
  - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/languages/python.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/languages/javascript.min.js

extra_css:
  - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css
  - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
```

## Inhaltserstellung

Beispiel für `docs/index.md`:

```markdown
# Willkommen zur Renata SA ITC Dokumentation

Herzlich willkommen auf unserer umfassenden Dokumentationsplattform. Hier findest du alle wichtigen Informationen zu unseren IT-Systemen, Prozessen und Best Practices.

## 🚀 Schnellstart

- [Systemanforderungen](./systemanforderungen.md)
- [Installation](./installation.md)
- [Erste Schritte](./erste-schritte.md)

## 📚 Hauptthemen

- [Netzwerkarchitektur](./netzwerk/architektur.md)
- [Sicherheitsrichtlinien](./sicherheit/richtlinien.md)
- [Datenbankverwaltung](./datenbanken/verwaltung.md)
- [Cloud-Services](./cloud/uebersicht.md)

## 🛠 Support und Wartung

- [Ticketsystem](./support/ticketsystem.md)
- [Wartungsplan](./wartung/jahresplan.md)
- [Notfallkontakte](./support/notfallkontakte.md)

## 📅 Aktuelle Updates

- **[NEU]** Implementierung des Zero-Trust-Sicherheitsmodells
- **[UPDATE]** Aktualisierung der Cloud-Infrastruktur auf Version 2.5
- **[GEPLANT]** Einführung eines neuen Monitoringsystems im nächsten Quartal

## 💡 Tipps und Tricks

!!! tip "Wusstest du schon?"
    Nutze die Suchfunktion oben rechts, um schnell spezifische Informationen zu finden.

## 🔗 Nützliche Links

- [Internes Wiki](https://wiki.renata.com)
- [Schulungsportal](https://schulung.renata.com)
- [IT-Helpdesk](https://helpdesk.renata.com)

---

Erstellt und gepflegt vom ITC-Team der Renata SA. Bei Fragen oder Anregungen kontaktiere uns bitte unter [itc@renata.com](mailto:itc@renata.com).
```

## Lokale Vorschau und Erstellung

```shell
mkdocs serve  # Lokale Vorschau
mkdocs build  # Erstellung der statischen Seite
```

## Markdown-Linting

```shell
markdownlint "docs/**/*.md"
```

## Backup

### Methode 1: Manuelle Kopie

Kopiere den Projektordner an einen sicheren Ort.

### Methode 2: Skript-basiertes Backup

Erstelle eine `backup_mkdocs.bat` Datei:

```batch
@echo off
set source=C:\Users\DeinBenutzername\Documents\renata-sa-dokumentation
set destination=D:\Backups\renata-sa-dokumentation-%date:~-4,4%%date:~-10,2%%date:~-7,2%
xcopy "%source%" "%destination%" /E /I /H /Y
echo Backup abgeschlossen: %destination%
pause
```

### Methode 3: Git

```shell
git init
git add .
git commit -m "Initiales Commit"
```

## Weiterentwicklung

1. Nutze Versionskontrolle (z.B. Git).
2. Implementiere CI/CD-Pipelines.
3. Integriere ein Feedback-System.
4. Führe regelmäßige Reviews durch.
5. Biete Schulungen zur Dokumentationserstellung an.

## Implementierung eines Login-Portals

Um den Zugriff auf deine MkDocs-Dokumentation zu kontrollieren, kannst du ein Login-Portal implementieren und es mit LDAP oder Active Directory (AD) integrieren. Hier sind die Schritte zur Implementierung:

### 1. Wahl des Authentifizierungssystems

- **LDAP**: Lightweight Directory Access Protocol, oft in Unternehmen verwendet.
- **Active Directory**: Microsoft's Verzeichnisdienst, weit verbreitet in Windows-Umgebungen.

### 2. Implementierung mit Python

Da MkDocs auf Python basiert, können wir eine Python-basierte Lösung verwenden:

1. Installiere notwendige Pakete:
   ```
   pip install flask flask-ldap3-login
   ```

2. Erstelle eine `app.py` Datei im Hauptverzeichnis deines MkDocs-Projekts:

   ```python
   from flask import Flask, render_template, redirect, url_for, request, session
   from flask_ldap3_login import LDAP3LoginManager
   from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin

   app = Flask(__name__)
   app.secret_key = 'DeinGeheimSchlüssel'  # Ändere dies in einen sicheren Schlüssel

   # LDAP Konfiguration
   app.config['LDAP_HOST'] = 'ldap://your-ldap-server.com'
   app.config['LDAP_BASE_DN'] = 'dc=example,dc=com'
   app.config['LDAP_USER_DN'] = 'ou=users'
   app.config['LDAP_GROUP_DN'] = 'ou=groups'
   app.config['LDAP_USER_RDN_ATTR'] = 'cn'
   app.config['LDAP_USER_LOGIN_ATTR'] = 'uid'
   app.config['LDAP_BIND_USER_DN'] = 'cn=admin,dc=example,dc=com'
   app.config['LDAP_BIND_USER_PASSWORD'] = 'admin_password'

   ldap_manager = LDAP3LoginManager(app)
   login_manager = LoginManager(app)

   class User(UserMixin):
       def __init__(self, dn, username, data):
           self.dn = dn
           self.username = username
           self.data = data

   @login_manager.user_loader
   def load_user(id):
       return User.get(id)

   @app.route('/login', methods=['GET', 'POST'])
   def login():
       if request.method == 'POST':
           username = request.form['username']
           password = request.form['password']
           result = ldap_manager.authenticate(username, password)
           if result.status:
               login_user(result.user)
               return redirect(url_for('protected'))
       return render_template('login.html')

   @app.route('/logout')
   @login_required
   def logout():
       logout_user()
       return redirect(url_for('login'))

   @app.route('/')
   @login_required
   def protected():
       return redirect('/index.html')

   if __name__ == '__main__':
       app.run(debug=True)
   ```

3. Erstelle eine `templates/login.html` Datei:

   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Login</title>
   </head>
   <body>
       <h2>Login</h2>
       <form method="POST">
           <input type="text" name="username" placeholder="Benutzername" required>
           <input type="password" name="password" placeholder="Passwort" required>
           <input type="submit" value="Einloggen">
       </form>
   </body>
   </html>
   ```

### 3. Integration mit MkDocs

1. Erstelle ein Skript `serve_with_auth.py`:

   ```python
   from app import app
   from livereload import Server

   if __name__ == '__main__':
       server = Server(app.wsgi_app)
       server.watch('docs/')
       server.serve(root='site')
   ```

2. Baue deine MkDocs-Seite:

   ```
   mkdocs build
   ```

3. Starte den Server mit Authentifizierung:

   ```
   python serve_with_auth.py
   ```

### 4. Anpassung für Active Directory

Für Active Directory ändere die LDAP-Konfiguration in `app.py`:

```python
app.config['LDAP_HOST'] = 'ldap://your-ad-server.com'
app.config['LDAP_BASE_DN'] = 'dc=yourdomain,dc=com'
app.config['LDAP_USER_DN'] = 'cn=users'
app.config['LDAP_GROUP_DN'] = 'cn=groups'
app.config['LDAP_USER_RDN_ATTR'] = 'sAMAccountName'
app.config['LDAP_USER_LOGIN_ATTR'] = 'sAMAccountName'
```

### Sicherheitshinweise

- Verwende HTTPS für die Produktionsumgebung.
- Speichere sensitive Informationen wie Passwörter sicher (z.B. mit Umgebungsvariablen).
- Implementiere Rollen und Berechtigungen für differenzierten Zugriff.
- Führe regelmäßige Sicherheitsüberprüfungen und Updates durch.

## Unternehmensanwendung

Hier sind einige Möglichkeiten, wie du MkDocs effektiv in einem Unternehmensumfeld einsetzen kannst:

1. **Zentrales Wissensmanagement**: Nutze MkDocs als zentrales Repository für Unternehm

## Unternehmensanwendung

Hier sind einige Möglichkeiten, wie du MkDocs effektiv in einem Unternehmensumfeld einsetzen kannst:

1. **Zentrales Wissensmanagement**: Nutze MkDocs als zentrales Repository für Unternemenswissen, Prozesse und Best Practices.

2. **Onboarding-Dokumentation**: Erstelle umfassende Onboarding-Unterlagen für neue Mitarbeiter.

3. **Technische Dokumentation**: Dokumentiere APIs, Softwarearchitektur und Entwicklungsprozesse.

4. **Projektmanagement**: Verwende MkDocs für Projektdokumentation, Anforderungen und Statusberichte.

5. **Compliance und Richtlinien**: Halte Unternehmensrichtlinien, Compliance-Dokumente und Sicherheitsstandards aktuell und leicht zugänglich.

6. **Internes Training**: Erstelle interaktive Schulungsunterlagen und Lernressourcen.

7. **Change Management**: Dokumentiere Systemänderungen, Updates und deren Auswirkungen.

8. **Kundenportal**: Nutze MkDocs, um ein kundenorientiertes Dokumentationsportal zu erstellen.

9. **Audit-Trail**: Implementiere ein Versionierungssystem (wie Git) für ein vollständiges Audit-Trail aller Dokumentänderungen.

10. **Abteilungsübergreifende Zusammenarbeit**: Fördere die Zusammenarbeit zwischen verschiedenen Abteilungen durch eine zentrale Dokumentationsplattform.

### Audit und Compliance

Für Audit- und Compliance-Zwecke kannst du folgende Maßnahmen ergreifen:

1. **Versionskontrolle**: Nutze Git für eine vollständige Historie aller Änderungen.

2. **Änderungsprotokolle**: Führe detaillierte Änderungsprotokolle für jedes Dokument.

3. **Zugriffskontrollen**: Implementiere rollenbasierte Zugriffskontrollen mit dem Login-Portal.

4. **Regelmäßige Überprüfungen**: Plane quartalsweise Überprüfungen der Dokumentation ein.

5. **Automatisierte Backups**: Stelle sicher, dass regelmäßige Backups erstellt und sicher aufbewahrt werden.

6. **Audit-Logs**: Implementiere Logging für alle Zugriffe und Änderungen an der Dokumentation.

7. **Compliance-Checklisten**: Erstelle Checklisten für verschiedene Compliance-Anforderungen und überprüfe die Dokumentation regelmäßig dagegen.

## Dokumentenexport

Um Dokumente in verschiedene Formate zu exportieren, die in Unternehmen häufig verwendet werden, kannst du folgende Methoden nutzen:

1. **PDF-Export**:
   - Installiere das MkDocs-PDF-Export-Plugin:
     ```
     pip install mkdocs-pdf-export-plugin
     ```
   - Füge es zu deiner `mkdocs.yml` hinzu:
     ```yaml
     plugins:
       - search
       - pdf-export
     ```

2. **Word-Dokument-Export**:
   - Nutze Pandoc, um Markdown in DOCX zu konvertieren:
     ```
     pip install pandoc
     pandoc input.md -o output.docx
     ```

3. **HTML-Export**:
   - MkDocs erstellt standardmäßig statische HTML-Seiten. Nutze den `mkdocs build` Befehl.

4. **Einzelseiten-HTML**:
   - Verwende das MkDocs-with-PDF-Plugin für eine einzelne HTML-Seite:
     ```
     pip install mkdocs-with-pdf
     ```
   - Konfiguriere es in `mkdocs.yml`:
     ```yaml
     plugins:
       - with-pdf
     ```

5. **Markdown-Export**:
   - Die Originaldateien liegen bereits im Markdown-Format vor.

6. **Automatisierter Export**:
   - Erstelle ein Python-Skript, das verschiedene Exportformate generiert:

     ```python
     import os
     import subprocess

     def export_documents():
         # Build MkDocs site
         os.system('mkdocs build')
         
         # Export to PDF (assuming mkdocs-pdf-export-plugin is installed)
         os.system('mkdocs build')
         
         # Export to DOCX using pandoc (for each markdown file)
         for root, dirs, files in os.walk('docs'):
             for file in files:
                 if file.endswith('.md'):
                     input_file = os.path.join(root, file)
                     output_file = os.path.join('exports', file.replace('.md', '.docx'))
                     subprocess.run(['pandoc', input_file, '-o', output_file])

     if __name__ == '__main__':
         export_documents()
     ```



## Sharing-Funktionalität
> [!IMPORTANT]
> In Development

Um eine Sharing-Funktionalität ähnlich wie bei Inkdrop zu implementieren, kannst du folgende Schritte unternehmen:

1. **Serverbasierte Lösung**:
   - Nutze einen Webserver (z.B. Nginx oder Apache) zur Bereitstellung der statischen MkDocs-Seiten.
   - Implementiere ein Benutzerverwaltungssystem mit Flask (wie im Login-Portal-Abschnitt beschrieben).

2. **Zugriffskontrollen**:
   - Erstelle eine Datenbank zur Verwaltung von Benutzerrechten und geteilten Dokumenten.
   - Implementiere feingranulare Zugriffskontrollen auf Dokument- und Abschnittsebene.

3. **Sharing-Funktionen**:
   - **Direkter Link**: Generiere eindeutige URLs für jedes Dokument.
   - **Temporärer Zugriff**: Erstelle zeitlich begrenzte Zugangslinks.
   - **Gruppenfreigabe**: Ermögliche das Teilen mit vordefinierten Gruppen oder Abteilungen.

4. **Kollaborative Bearbeitung**:
   - Integriere ein Echtzeit-Kollaborationstool wie Firepad oder ShareDB.
   - Implementiere ein Versionierungssystem für gleichzeitige Bearbeitungen.

5. **Beispiel-Implementierung**:

   ```python
   from flask import Flask, render_template, request, redirect, url_for
   from flask_sqlalchemy import SQLAlchemy
   from werkzeug.security import generate_password_hash, check_password_hash
   import uuid

   app = Flask(__name__)
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
   db = SQLAlchemy(app)

   class User(db.Model):
       id = db.Column(db.Integer, primary_key=True)
       username = db.Column(db.String(80), unique=True, nullable=False)
       password = db.Column(db.String(120), nullable=False)

   class SharedDocument(db.Model):
       id = db.Column(db.Integer, primary_key=True)
       document_path = db.Column(db.String(200), nullable=False)
       share_token = db.Column(db.String(36), unique=True, nullable=False)
       user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

   @app.route('/share/<path:document_path>')
   def share_document(document_path):
       user_id = get_current_user_id()  # Implementiere diese Funktion
       share_token = str(uuid.uuid4())
       new_share = SharedDocument(document_path=document_path, share_token=share_token, user_id=user_id)
       db.session.add(new_share)
       db.session.commit()
       return f"Dokument geteilt. Zugangslink: {request.host_url}view/{share_token}"

   @app.route('/view/<share_token>')
   def view_shared_document(share_token):
       shared_doc = SharedDocument.query.filter_by(share_token=share_token).first_or_404()
       # Hier Logik zum Anzeigen des Dokuments implementieren
       return render_template('view_document.html', document_path=shared_doc.document_path)

   if __name__ == '__main__':
       db.create_all()
       app.run(debug=True)
   ```

6. **Sicherheitsaspekte**:
   - Implementiere HTTPS für alle Verbindungen.
   - Nutze sichere Methoden zur Tokengenerierung und -validierung.
   - Führe regelmäßige Sicherheitsaudits durch.



```
Options:
  -V, --version         Show the version and exit.
  -q, --quiet           Silence warnings
  -v, --verbose         Enable verbose output
  --color / --no-color  Force enable or disable color and wrapping for the output. Default is auto-detect.
  -h, --help            Show this message and exit.

Commands:
  build      Build the MkDocs documentation.
  get-deps   Show required PyPI packages inferred from plugins in mkdocs.yml.
  gh-deploy  Deploy your documentation to GitHub Pages.
  new        Create a new MkDocs project.
  serve      Run the builtin development server.
```
![DF30C60F-F787-45CA-A050-D73EA1A1DD33](TwGPmrdCB-DF30C60F-F787-45CA-A050-D73EA1A1DD33.jpg)