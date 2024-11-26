# Tailscale Selbstüberprüfungs-Spickzettel für Anbieter



## 1. Vor der Kontaktaufnahme durchzuführende Schritte

- **Überprüfen Sie die Netzwerkverbindung:**
  - Stellen Sie sicher, dass das Gerät mit einem stabilen Netzwerk verbunden ist.
  - Prüfen Sie, ob andere Netzwerkdienste ordnungsgemäß funktionieren.

- **Tailscale-Status überprüfen:**
  - Führen Sie den folgenden Befehl aus, um den Status von Tailscale zu prüfen:
  ```bash
  tailscale status
  ```
  - Stellen Sie sicher, dass das Gerät als "Connected" angezeigt wird.

- **Verbindungsprobleme zwischen Peers testen:**
  - Verwenden Sie den Befehl, um die Erreichbarkeit zu überprüfen:
  ```bash
  tailscale ping <peer-ip>
  ```
  - Testen Sie die Verbindung zu mehreren Peers, um festzustellen, ob das Problem nur mit einem bestimmten Peer auftritt.

## 2. Grundlegende Fehlerbehebungsmaßnahmen

- **Tailscale neu starten:**
  - Versuchen Sie, den Tailscale-Dienst neu zu starten:
  ```bash
  sudo systemctl restart tailscaled
  ```

- **Aktualisieren Sie auf die neueste Version:**
  - Stellen Sie sicher, dass Sie die neueste Version von Tailscale verwenden:
  ```bash
  sudo tailscale update
  ```

- **Fehlerbericht generieren:**
  - Erstellen Sie einen Fehlerbericht, um ihn an das Support-Team zu senden:
  ```bash
  tailscale bugreport
  ```

## 3. Überprüfung der Netzwerkkonfiguration

- **Subnetz-Routing und DNS-Konfiguration prüfen:**
  - Überprüfen Sie, ob die Subnetz-Routing- und DNS-Einstellungen korrekt konfiguriert sind:
  ```bash
  tailscale up --advertise-routes=<subnetz> --accept-dns
  ```

- **Firewall und Sicherheitsrichtlinien:**
  - Stellen Sie sicher, dass alle Tailscale-bezogenen Ports (z.B. UDP 41641) und Protokolle von Ihrer Firewall zugelassen werden.

## 4. Selbstüberprüfung der Gerätekonfiguration

- **Geräteautorisierung bestätigen:**
  - Überprüfen Sie, ob das Gerät im Tailscale Admin-Dashboard autorisiert ist.

- **Exit-Node-Einstellungen überprüfen:**
  - Stellen Sie sicher, dass Exit-Node-Einstellungen korrekt konfiguriert sind, falls verwendet:
  ```bash
  tailscale up --advertise-exit-node
  ```

## 5. Informationen für den Support bereitstellen

- **Bereiten Sie die folgenden Informationen vor:**
  - Fehlerberichte (`tailscale bugreport`).
  - Genaue Beschreibung des Problems und der betroffenen Peers.
  - Informationen über die verwendete Tailscale-Version und Systemumgebung.
