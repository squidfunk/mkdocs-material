# Renata SA MkDocs Local Setup Version-1.1

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

## Installation

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
mkdocs serve  # Lokale Vorschau oder loop ip only
mkdocs serve --dev-addr 192.168.13.248:8000 auf die Netwerk IP Laptop oder Server
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

![7F3B6701-B12F-4572-818D-B19673B2F372](EdsNQuOUq-7F3B6701-B12F-4572-818D-B19673B2F372.jpg)