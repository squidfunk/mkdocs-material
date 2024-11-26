# Automating Inkdrop Notes Synchronization with MkDocs on Ubuntu in WSL

This guide is for setting up MkDocs and synchronizing it with Inkdrop on an Ubuntu instance running under Windows Subsystem for Linux (WSL). Here’s a complete guide to automate the setup process.

### Prerequisites
1. **WSL with Ubuntu Installed**:
   Ensure WSL and Ubuntu are installed and set up on your Windows system. You can follow [Microsoft's official guide](https://docs.microsoft.com/en-us/windows/wsl/install) if needed.

### Step-by-Step Guide

#### 1. **Install Dependencies in WSL**

1. **Open your WSL terminal** and update the package lists:
   ```sh
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Python and pip**:
   ```sh
   sudo apt install python3 python3-pip -y
   ```

3. **Install MkDocs and Required Python Libraries**:
   ```sh
   pip3 install mkdocs requests frontmatter pyyaml
   ```

#### 2. **Create the Synchronization Script**

Create a Python script named `setup_mkdocs_sync.py` that will handle the entire setup, including fetching notes from Inkdrop, configuring MkDocs, and building the site.

1. **Create the script file**:
   ```sh
   nano setup_mkdocs_sync.py
   ```

2. **Paste the following script into the file**:
   ```python
   import os
   import requests
   import frontmatter
   import yaml

   # Configuration variables
   CONFIG_FILE = 'config.yaml'
   MKDOCS_DIR = 'my_mkdocs_project'
   MKDOCS_DOCS_DIR = os.path.join(MKDOCS_DIR, 'docs')
   MKDOCS_CONFIG_FILE = os.path.join(MKDOCS_DIR, 'mkdocs.yml')

   # Load user configuration
   def load_config():
       with open(CONFIG_FILE, 'r') as file:
           config = yaml.safe_load(file)
       return config['api_token'], config['user_id']

   # Fetch notes from Inkdrop API
   def fetch_notes(api_token):
       headers = {
           'Authorization': f'token {api_token}',
           'Content-Type': 'application/json'
       }
       response = requests.get('https://api.inkdrop.app/v1/notes', headers=headers)
       if response.status_code == 200:
           return response.json()
       else:
           print('Failed to fetch notes:', response.status_code)
           return []

   # Fetch notebooks from Inkdrop API
   def fetch_notebooks(api_token):
       headers = {
           'Authorization': f'token {api_token}',
           'Content-Type': 'application/json'
       }
       response = requests.get('https://api.inkdrop.app/v1/notebooks', headers=headers)
       if response.status_code == 200:
           return response.json()
       else:
           print('Failed to fetch notebooks:', response.status_code)
           return []

   # Save note as Markdown file
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

   # Generate mkdocs.yml configuration file
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
           'site_name': 'My Documentation',
           'nav': nav,
           'theme': {
               'name': 'readthedocs'
           }
       }

       with open(MKDOCS_CONFIG_FILE, 'w') as file:
           yaml.dump(config, file)

   # Sync notes and build MkDocs site
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
       print("Synced Inkdrop notes and built MkDocs site")
   ```

3. **Save and Exit**:
   - Press `CTRL + O`, `Enter` to save the file, and `CTRL + X` to exit the editor.

#### 3. **Create the Configuration File**

Create a `config.yaml` file where users will input their API token and user ID.

1. **Create the config file**:
   ```sh
   nano config.yaml
   ```

2. **Add the following content**:
   ```yaml
   api_token: 'YOUR_API_TOKEN'
   user_id: 'YOUR_USER_ID'
   ```

3. **Save and Exit**:
   - Press `CTRL + O`, `Enter` to save the file, and `CTRL + X` to exit the editor.

#### 4. **Run the Setup Script**

1. **Ensure the Configuration File is Updated**:
   - Replace `'YOUR_API_TOKEN'` and `'YOUR_USER_ID'` with the actual Inkdrop API token and user ID.

2. **Run the Script**:
   ```sh
   python3 setup_mkdocs_sync.py
   ```

This script will:
1. **Initialize an MkDocs project** if it doesn't exist.
2. **Fetch notes and notebooks** from the Inkdrop API.
3. **Save notes as Markdown files** in the appropriate directories.
4. **Generate the `mkdocs.yml` configuration file** dynamically.
5. **Build the MkDocs site**.

#### 5. **Automate the Sync Process**

To keep the documentation site updated, set up a cron job to run the script periodically.

1. **Open Crontab Editor**:
   ```sh
   crontab -e
   ```

2. **Add a New Cron Job (example for hourly sync)**:
   ```sh
   0 * * * * /usr/bin/python3 /path/to/setup_mkdocs_sync.py
   ```

![DAD3182C-98DD-4D79-828E-D14CF5288162](7KAQF7B4S-DAD3182C-98DD-4D79-828E-D14CF5288162.jpg)
