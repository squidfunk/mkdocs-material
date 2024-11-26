# Automatisierte Synchronisation von Inkdrop-Notizen mit MkDocs auf Ubuntu in WSL

![A04D0BB9-4F05-4B2C-94AB-69B6521478BD](mFU9Rw_QC-A04D0BB9-4F05-4B2C-94AB-69B6521478BD.jpg)

1. **WSL mit Ubuntu installiert**:
   - Stelle sicher, dass WSL und Ubuntu auf deinem Windows-System installiert und eingerichtet sind. Folge der [offiziellen Anleitung von Microsoft](https://docs.microsoft.com/en-us/windows/wsl/install), falls nötig.

### Schritt-für-Schritt-Anleitung

#### 1. Abhängigkeiten in WSL installieren

1. **Öffne dein WSL-Terminal** und aktualisiere die Paketlisten:
   ```sh
   sudo apt update && sudo apt upgrade -y
   ```

2. **Installiere Python und pip**:
   ```sh
   sudo apt install python3 python3-pip -y
   ```

3. **Installiere MkDocs und die benötigten Python-Bibliotheken**:
   ```sh
   pip3 install mkdocs requests frontmatter pyyaml
   ```
```text
├── my_mkdocs_project
│   ├── docs
│   │   ├── index.md
│   │   └── (generierte Markdown-Dateien für Notizen)
│   ├── mkdocs.yml
├── setup_mkdocs_sync.py
├── config.yaml
├── systemd
│   └── mkdocs.service
└── crontab
    └── crontab.txt
```
#### 2. Erstellen des Synchronisationsskripts

Erstelle ein Python-Skript namens `setup_mkdocs_sync.py`, das den gesamten Prozess übernimmt, einschließlich Abrufen von Notizen von Inkdrop, Konfigurieren von MkDocs und Erstellen der Website.

1. **Erstelle die Skriptdatei**:
   ```sh
   nano setup_mkdocs_sync.py
   ```

2. **Füge das folgende Skript in die Datei ein**:
   ```python
   import os
   import requests
   import frontmatter
   import yaml

   # Konfigurationsvariablen
   CONFIG_FILE = 'config.yaml'
   MKDOCS_DIR = 'my_mkdocs_project'
   MKDOCS_DOCS_DIR = os.path.join(MKDOCS_DIR, 'docs')
   MKDOCS_CONFIG_FILE = os.path.join(MKDOCS_DIR, 'mkdocs.yml')

   # Benutzerkonfiguration laden
   def load_config():
       with open(CONFIG_FILE, 'r') as file:
           config = yaml.safe_load(file)
       return config['api_token'], config['user_id']

   # Notizen von der Inkdrop-API abrufen
   def fetch_notes(api_token):
       headers = {
           'Authorization': f'token {api_token}',
           'Content-Type': 'application/json'
       }
       response = requests.get('https://api.inkdrop.app/v1/notes', headers=headers)
       if response.status_code == 200:
           return response.json()
       else:
           print('Abrufen der Notizen fehlgeschlagen:', response.status_code)
           return []

   # Notizbücher von der Inkdrop-API abrufen
   def fetch_notebooks(api_token):
       headers = {
           'Authorization': f'token {api_token}',
           'Content-Type': 'application/json'
       }
       response = requests.get('https://api.inkdrop.app/v1/notebooks', headers=headers)
       if response.status_code == 200:
           return response.json()
       else:
           print('Abrufen der Notizbücher fehlgeschlagen:', response.status_code)
           return []

   # Notiz als Markdown-Datei speichern
   def save_note_as_markdown(note, notebook_name):
       metadata = {
           'title': note['title'],
           'created_at': note['createdAt'],
           'updated_at': note['updatedAt']
       }
       content = note['body']
       note_data = frontmatter.Post(content, **metadata)

       notebook_path = os.path.join(MKDOCS_DOCS_DIR, notebook_name)
       os.makedirs(notebook_path, exist_ok=True)

       file_path = os.path.join(notebook_path, f"{note['title'].replace('/', '_')}.md")
       with open(file_path, 'w', encoding='utf-8') as file:
           file.write(frontmatter.dumps(note_data))

   # mkdocs.yml Konfigurationsdatei generieren
   def generate_mkdocs_config(notebooks):
       nav = []
       for notebook in notebooks:
           notebook_name = notebook['name']
           notes = [
               {note['title']: f"{notebook_name}/{note['title'].replace('/', '_')}.md"}
               for note in fetch_notes(api_token) if note['notebookId'] == notebook['id']
           ]
           nav.append({notebook_name: notes})

       config = {
           'site_name': 'Meine Dokumentation',
           'nav': nav,
           'theme': {
               'name': 'readthedocs'
           }
       }

       with open(MKDOCS_CONFIG_FILE, 'w') as file:
           yaml.dump(config, file)

   # Notizen synchronisieren und MkDocs-Site erstellen
   def sync_and_build():
       api_token, user_id = load_config()
       notebooks = fetch_notebooks(api_token)
       notes = fetch_notes(api_token)
       notebook_dict = {notebook['id']: notebook['name'] for notebook in notebooks}

       for note in notes:
           notebook_name = notebook_dict.get(note['notebookId'], 'default')
           save_note_as_markdown(note, notebook_name)

       generate_mkdocs_config(notebooks)
       os.system(f'cd {MKDOCS_DIR} && mkdocs build')

   if __name__ == "__main__":
       if not os.path.exists(MKDOCS_DIR):
           os.system(f'mkdocs new {MKDOCS_DIR}')
       sync_and_build()
       print("Inkdrop-Notizen synchronisiert und MkDocs-Site erstellt")
   ```

3. **Speichern und beenden**:
   - Drücke `CTRL + O`, `Enter`, um die Datei zu speichern, und `CTRL + X`, um den Editor zu verlassen.

#### 3. Erstellen der Konfigurationsdatei

Erstelle eine `config.yaml`-Datei, in die du deinen API-Schlüssel und deine Benutzer-ID eingeben kannst.

1. **Erstelle die Konfigurationsdatei**:
   ```sh
   nano config.yaml
   ```

2. **Füge den folgenden Inhalt hinzu**:
   ```yaml
   api_token: 'DEIN_API_TOKEN'
   user_id: 'DEINE_BENUTZER_ID'
   ```

3. **Speichern und beenden**:
   - Drücke `CTRL + O`, `Enter`, um die Datei zu speichern, und `CTRL + X`, um den Editor zu verlassen.

#### 4. Ausführen des Setup-Skripts

1. **Stelle sicher, dass die Konfigurationsdatei aktualisiert ist**:
   - Ersetze `'DEIN_API_TOKEN'` und `'DEINE_BENUTZER_ID'` durch den tatsächlichen Inkdrop-API-Schlüssel und die Benutzer-ID.

2. **Führe das Skript aus**:
   ```sh
   python3 setup_mkdocs_sync.py
   ```

Dieses Skript wird:
1. **Ein MkDocs-Projekt initialisieren**, falls es nicht existiert.
2. **Notizen und Notizbücher** von der Inkdrop-API abrufen.
3. **Notizen als Markdown-Dateien** in den entsprechenden Verzeichnissen speichern.
4. **Die `mkdocs.yml`-Konfigurationsdatei** dynamisch generieren.
5. **Die MkDocs-Site erstellen**.

#### 5. Automatisierung des Synchronisationsprozesses

Um die Dokumentationsseite aktuell zu halten, richte einen Cron-Job ein, um das Skript regelmäßig auszuführen.

1. **Öffne den Crontab-Editor**:
   ```sh
   crontab -e
   ```

2. **Füge einen neuen Cron-Job hinzu (Beispiel für stündliche Synchronisation)**:
   ```sh
   0 * * * * /usr/bin/python3 /path/to/setup_mkdocs_sync.py
   ```

### Fazit

Dieses umfassende Setup-Skript automatisiert den gesamten Prozess der Einrichtung von MkDocs, des Abrufens von Notizen von Inkdrop und der Konfiguration mit minimalem Benutzereingriff. Dadurch wird sichergestellt, dass die Dokumentation stets auf dem neuesten Stand der Inkdrop-Notizen ist.
