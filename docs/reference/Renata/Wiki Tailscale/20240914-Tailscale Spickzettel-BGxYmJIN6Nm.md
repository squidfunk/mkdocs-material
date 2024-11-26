# Tailscale Spickzettel



## 1. Grundlegende Befehle

- **Tailscale installieren:**
  Laden Sie Tailscale herunter und installieren Sie es für Ihr System (Linux, Windows). Folgen Sie den Anweisungen auf [tailscale.com](https://tailscale.com/download).

- **Tailscale starten:**
  ```bash
  sudo tailscale up
  ```
  Startet Tailscale und verbindet das Gerät mit Ihrem Tailscale-Netzwerk.

- **Tailscale-Status anzeigen:**
  ```bash
  tailscale status
  ```
  Zeigt den aktuellen Status von Tailscale und die verbundenen Peers an.

- **Tailscale trennen:**
  ```bash
  sudo tailscale down
  ```
  Trennt das Gerät vom Tailscale-Netzwerk.

## 2. Verwaltung und Konfiguration

- **IP-Adresse des Tailscale-Geräts anzeigen:**
  ```bash
  tailscale ip
  ```
  Zeigt die zugewiesene Tailscale-IP-Adresse des Geräts an.

- **Gerät autorisieren (Admin erforderlich):**
  Melden Sie sich bei Ihrem Tailscale-Konto an und autorisieren Sie neue Geräte im Admin-Dashboard.

- **Gerät abmelden:**
  ```bash
  sudo tailscale logout
  ```
  Meldet das Gerät vom Tailscale-Konto ab.

## 3. Erweiterte Nutzung

- **Subnetz-Routing aktivieren:**
  Um Subnetze in Ihrem Tailscale-Netzwerk zu verwenden, konfigurieren Sie Subnet-Routing im Admin-Dashboard.

- **Magic DNS aktivieren:**
  Aktivieren Sie Magic DNS, um einfache Namen anstelle von IP-Adressen innerhalb Ihres Tailscale-Netzwerks zu verwenden.

## 4. Nützliche Tipps

- **Tailscale-Aktualisierungen überprüfen:**
  Halten Sie Tailscale aktuell, um die neuesten Sicherheitsupdates und Funktionen zu erhalten.
  
- **Fehlerbehebung:**
  Verwenden Sie `tailscale bugreport` und `tailscale netcheck`, um Diagnoseberichte zu erstellen und Verbindungsprobleme zu prüfen.
