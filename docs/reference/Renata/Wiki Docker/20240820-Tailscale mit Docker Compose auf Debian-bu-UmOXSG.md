# Tailscale mit Docker Compose auf Debian

Sie haben Recht, Tailscale bietet ein offizielles Docker-Image an. Lassen Sie uns die Anleitung entsprechend anpassen und das offizielle Tailscale Docker-Image verwenden.

# Schritt-für-Schritt-Anleitung: Tailscale mit Docker Compose auf Debian

## Voraussetzungen

- Ein Debian-Server (z.B. Debian 11 "Bullseye")
- Root-Zugriff auf den Server
- Ein Tailscale-Konto

## Schritt 1: Docker installieren

1. Aktualisieren Sie die Paketlisten und installieren Sie notwendige Pakete:
   ```bash
   sudo apt update
   sudo apt install -y ca-certificates curl gnupg lsb-release
   ```

2. Fügen Sie den offiziellen GPG-Schlüssel von Docker hinzu:
   ```bash
   curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

3. Richten Sie das stabile Repository ein:
   ```bash
   echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

4. Aktualisieren Sie erneut die Paketlisten und installieren Sie Docker:
   ```bash
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io
   ```

5. Überprüfen Sie die Docker-Installation:
   ```bash
   sudo docker run hello-world
   ```

## Schritt 2: Docker Compose installieren

1. Laden Sie die aktuelle stabile Version von Docker Compose herunter:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

2. Setzen Sie die Berechtigungen für die Docker Compose Binärdatei:
   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. Überprüfen Sie die Docker Compose Installation:
   ```bash
   docker-compose --version
   ```

## Schritt 3: Tailscale Auth-Key generieren

1. Melden Sie sich bei der [Tailscale Admin-Konsole](https://login.tailscale.com/admin) an.
2. Navigieren Sie zu "Keys" und klicken Sie auf "Generate auth key".
3. Kopieren Sie den generierten Auth-Key.

## Schritt 4: Docker Compose Projekt erstellen

1. Erstellen Sie ein neues Verzeichnis für Ihr Projekt und wechseln Sie in das Verzeichnis:
   ```bash
   mkdir tailscale-docker-compose
   cd tailscale-docker-compose
   ```

2. Erstellen Sie eine `docker-compose.yml` Datei mit folgendem Inhalt:
   ```yaml
   version: '3'

   services:
     tailscale:
       image: tailscale/tailscale
       container_name: tailscale
       volumes:
         - /var/lib/tailscale:/var/lib/tailscale
         - /dev/net/tun:/dev/net/tun
       network_mode: host
       privileged: true
       restart: unless-stopped
       environment:
         - TS_AUTHKEY=${TS_AUTHKEY}
         - TS_ACCEPT_DNS=true
       command: tailscaled

     web-app:
       image: nginx:alpine
       container_name: web-app
       network_mode: service:tailscale
       volumes:
         - ./web-content:/usr/share/nginx/html
       depends_on:
         - tailscale
   ```

3. Erstellen Sie eine `.env` Datei im selben Verzeichnis und fügen Sie den zuvor generierten Auth-Key ein:
   ```
   TS_AUTHKEY=tskey-auth-key-hier-einfügen
   ```

4. Erstellen Sie einen `web-content` Ordner und eine `index.html` Datei:
   ```bash
   mkdir web-content
   echo "Hallo Welt über Tailscale!" > web-content/index.html
   ```

## Schritt 5: Docker Compose starten

1. Starten Sie die Container mit Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. Überprüfen Sie den Status der Container:
   ```bash
   docker-compose ps
   ```

3. Überprüfen Sie die Tailscale-Verbindung:
   ```bash
   docker-compose exec tailscale tailscale status
   ```

## Schritt 6: Web-App über Tailscale aufrufen

1. Gehen Sie in der Tailscale Admin-Konsole zu "Machines".
2. Finden Sie die Tailscale IP-Adresse Ihres Debian-Servers.
3. Öffnen Sie einen Webbrowser und navigieren Sie zu `http://<tailscale-ip>`.
   Ersetzen Sie `<tailscale-ip>` durch die tatsächliche IP-Adresse.
4. Sie sollten "Hallo Welt über Tailscale!" sehen.

## Schritt 7: ACLs konfigurieren (optional)

1. In der Tailscale Admin-Konsole, navigieren Sie zu "Access controls".
2. Fügen Sie eine neue ACL hinzu, um den Zugriff auf die Web-App zu steuern:
   ```json
   {
     "action": "accept",
     "users": ["*"],
     "ports": ["tcp:80"]
   }
   ```
3. Speichern Sie die ACL.

## Schritt 8: DNS-Einstellungen (optional)

1. In der Tailscale Admin-Konsole, navigieren Sie zu "DNS".
2. Fügen Sie einen benutzerdefinierten Nameserver für Ihre Domain hinzu.
3. Konfigurieren Sie Split-DNS, um interne Hostnamen aufzulösen.

## Schritt 9: Automatische Updates mit Watchtower (optional)

1. Fügen Sie den Watchtower-Dienst zu Ihrer `docker-compose.yml` Datei hinzu:
   ```yaml
   watchtower:
     image: containrrr/watchtower
     volumes:
       - /var/run/docker.sock:/var/run/docker.sock
     command: --interval 86400 --cleanup
     restart: unless-stopped
   ```

2. Starten Sie die Container neu:
   ```bash
   docker-compose up -d
   ```

Watchtower wird jetzt täglich nach Updates für Ihre Container suchen und diese automatisch anwenden.

---

[](https://hub.docker.com/r/tailscale/tailscale)

[Using Tailscale with Docker · Tailscale Docs](https://tailscale.com/kb/1282/docker)



### Github

[Package tailscale · GitHub](https://github.com/tailscale/tailscale/pkgs/container/tailscale)

[Tailscale · GitHub](https://github.com/tailscale)
