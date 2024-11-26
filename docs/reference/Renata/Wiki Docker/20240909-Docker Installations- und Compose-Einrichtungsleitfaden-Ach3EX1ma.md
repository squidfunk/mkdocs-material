# Docker Installations- und Compose-Einrichtungsleitfaden

## 1. Installation von Docker auf Debian 12

1. Aktualisieren Sie Ihre Systempakete:

   ```
   sudo apt update
   sudo apt upgrade
   ```

2. Installieren Sie die erforderlichen Pakete:

   ```
   sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
   ```

3. Fügen Sie den offiziellen GPG-Schlüssel von Docker hinzu:

   ```
   curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

4. Richten Sie das stabile Docker-Repository ein:

   ```
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. Aktualisieren Sie die Paketdatenbank mit Docker-Paketen:

   ```
   sudo apt update
   ```

6. Installieren Sie Docker Engine und containerd:

   ```
   sudo apt install docker-ce docker-ce-cli containerd.io
   ```

7. Überprüfen Sie, ob Docker korrekt installiert ist:

   ```
   sudo docker run hello-world
   ```

8. (Optional) Um Docker-Befehle ohne sudo auszuführen, fügen Sie Ihren Benutzer zur docker-Gruppe hinzu:

   ```
   sudo usermod -aG docker $USER
   ```

   Melden Sie sich ab und wieder an, damit diese Änderung wirksam wird.

9. Aktivieren Sie Docker, damit es beim Booten startet:
   ```
   sudo systemctl enable docker
   ```

## 2. Einrichten von Docker Compose

1. Erstellen Sie ein neues Verzeichnis für Ihr Docker Compose-Projekt:

   ```
   mkdir docker_services
   cd docker_services
   ```

2. Erstellen Sie eine Docker Compose-Datei:

   ```
   nano docker-compose.yml
   ```

3. Kopieren Sie den folgenden Inhalt in die Datei:

```yaml
version: "3"

services:
  stirling-pdf:
    image: frooodle/s-pdf:latest
    container_name: stirling-pdf-alt
    ports:
      - "8086:8080"
    volumes:
      - ./stirling-pdf-data:/usr/share/stirling-pdf/data
    restart: unless-stopped

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "3000:8080"
    volumes:
      - ./open-webui-data:/app/backend/data
    restart: unless-stopped

  traefik:
    image: traefik:v2.10
    container_name: traefik
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik-config:/etc/traefik
    restart: unless-stopped

  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    ports:
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./portainer-data:/data
    restart: unless-stopped

networks:
  default:
    name: my_network
```

4. Speichern Sie die Datei und verlassen Sie den Editor (in nano drücken Sie Strg+X, dann Y, dann Enter).

5. Starten Sie die Dienste:

   ```
   docker-compose up -d
   ```

6. Überprüfen Sie, ob alle Dienste laufen:
   ```
   docker-compose ps
   ```

## 3. Zugriff auf die Dienste

- Stirling-PDF: http://localhost:8086
- Open WebUI (Ollama): http://localhost:3000
- Traefik Dashboard: http://localhost:8080
- Portainer: http://localhost:9000

## 4. Verwaltung der Dienste

- Um alle Dienste zu stoppen:

  ```
  docker-compose down
  ```

- Um die Logs eines bestimmten Dienstes anzuzeigen (z.B. stirling-pdf):

  ```
  docker-compose logs stirling-pdf
  ```

- Um einen bestimmten Dienst neu zu starten:
  ```
  docker-compose restart service_name
  ```

Denken Sie daran, `localhost` durch die IP-Adresse Ihres Servers zu ersetzen, wenn Sie auf diese Dienste von einem anderen Gerät in Ihrem Netzwerk zugreifen.
