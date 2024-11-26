# Tailscale Engineering-Level Support Spickzettel



## 1. Häufige Probleme und Lösungen

- **Problem: Gerät verbindet sich nicht mit dem Tailscale-Netzwerk**
  - **Lösung:** 
    - Überprüfen Sie die Netzwerkverbindung des Geräts.
    - Führen Sie `tailscale status` aus, um den aktuellen Verbindungsstatus zu überprüfen.
    - Nutzen Sie `tailscale ping <peer-ip>`, um die Erreichbarkeit anderer Peers zu testen.
    - Überprüfen Sie, ob die Firewall-Einstellungen die Tailscale-Ports und -Protokolle zulassen.

- **Problem: Keine Kommunikation zwischen Peers**
  - **Lösung:**
    - Stellen Sie sicher, dass beide Geräte im Tailscale-Netzwerk online und autorisiert sind.
    - Führen Sie `tailscale netcheck` auf beiden Geräten aus, um Verbindungsprobleme zu diagnostizieren.
    - Überprüfen Sie die ACLs (Access Control Lists) im Admin-Dashboard auf mögliche Einschränkungen.

## 2. Diagnosewerkzeuge und -befehle

- **Tailscale-Status prüfen:**
  ```bash
  tailscale status
  ```
  Zeigt den aktuellen Verbindungsstatus und die verbundene Peers an.

- **Netzwerkverbindung testen:**
  ```bash
  tailscale ping <peer-ip>
  ```
  Testet die Erreichbarkeit eines Peers im Tailscale-Netzwerk.

- **Verbindungsqualität überprüfen:**
  ```bash
  tailscale netcheck
  ```
  Überprüft die Qualität der Verbindung zum Tailscale-Netzwerk und erkennt NAT-Typen, Firewalls und andere Hindernisse.

- **Fehlerbericht erstellen:**
  ```bash
  tailscale bugreport
  ```
  Generiert einen Fehlerbericht zur Analyse und Fehlerbehebung.

## 3. Sicherheits- und Netzwerkkonfiguration

- **Subnetz-Routing konfigurieren:**
  Überprüfen Sie die Subnetz-Routing-Einstellungen, um sicherzustellen, dass die Konfiguration korrekt ist:
  ```bash
  tailscale up --advertise-routes=<subnetz>
  ```

- **Exit-Node-Einstellungen prüfen:**
  Stellen Sie sicher, dass die Geräte ordnungsgemäß als Exit-Nodes konfiguriert sind:
  ```bash
  tailscale up --advertise-exit-node
  ```

- **DNS-Probleme diagnostizieren:**
  Verwenden Sie Magic DNS und prüfen Sie die DNS-Konfiguration, um sicherzustellen, dass die Namensauflösung korrekt funktioniert:
  ```bash
  tailscale up --accept-dns
  ```

## 4. Verwaltung von Geräten und Authentifizierung

- **Geräteautorisierung prüfen:**
  Überprüfen Sie im Admin-Dashboard, ob das Gerät autorisiert ist. Nicht autorisierte Geräte müssen genehmigt werden, bevor sie eine Verbindung herstellen können.

- **Geräte aus dem Netzwerk entfernen:**
  Verwenden Sie das Admin-Dashboard, um nicht autorisierte oder nicht mehr benötigte Geräte zu entfernen.

- **Zwei-Faktor-Authentifizierung (2FA) aktivieren:**
  Aktivieren Sie 2FA unter **Einstellungen > Sicherheit** für zusätzliche Sicherheit.

## 5. Tipps zur Fehlerbehebung

- **Protokolle regelmäßig überprüfen:**
  Überwachen Sie regelmäßig die Tailscale-Logs, um unerwartete Aktivitäten oder Verbindungsprobleme zu erkennen:
  ```bash
  tailscale log
  ```

- **Netzwerk- und Firewall-Einstellungen anpassen:**
  Stellen Sie sicher, dass die Netzwerkeinstellungen und die Firewall die notwendigen Ports und Protokolle für Tailscale zulassen.
