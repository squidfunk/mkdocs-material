# Tailscale Engineering-Level Spickzettel für Windows



## 1. Installation und Konfiguration

- **Tailscale herunterladen und installieren:**
  Laden Sie den Tailscale-Installer für Windows von der [offiziellen Website](https://tailscale.com/download) herunter und führen Sie die Installation aus.

- **Tailscale über die Eingabeaufforderung aktivieren:**
  Öffnen Sie die Eingabeaufforderung mit Administratorrechten und führen Sie aus:
  ```bash
  tailscale up --authkey=<Ihr_Auth_Key> --advertise-routes=<subnetz>
  ```
  Aktiviert Tailscale mit einem Authentifizierungsschlüssel und konfiguriert Subnetz-Routing.

## 2. Erweiterte Funktionen

- **Tailscale als Windows-Dienst einrichten:**
  Tailscale läuft standardmäßig als Dienst unter Windows. Verwenden Sie den Befehl:
  ```bash
  net start tailscale
  ```
  Um den Tailscale-Dienst zu starten.

- **Subnetz-Routing und Exit-Node einrichten:**
  Nutzen Sie Tailscale als Exit-Node oder für Subnetz-Routing:
  ```bash
  tailscale up --advertise-exit-node --advertise-routes=<subnetz>
  ```

- **Integration mit PowerShell-Skripten:**
  Erstellen Sie PowerShell-Skripte, um Tailscale-Befehle auszuführen, wie z.B.:
  ```powershell
  Start-Process "tailscale.exe" -ArgumentList "up --authkey=<Ihr_Auth_Key>"
  ```

## 3. Diagnose und Fehlerbehebung

- **Tailscale-Diagnosebefehle:**
  Führen Sie Diagnosebefehle über die Eingabeaufforderung aus:
  ```bash
  tailscale status
  tailscale ping <peer-ip>
  ```

- **Fehlerprotokoll erstellen:**
  Generieren Sie ein Fehlerprotokoll zur Fehlerbehebung:
  ```bash
  tailscale bugreport
  ```

- **Firewall-Konfiguration prüfen:**
  Stellen Sie sicher, dass die Windows-Firewall Tailscale-Datenverkehr zulässt. Verwenden Sie:
  ```bash
  netsh advfirewall firewall add rule name="Tailscale" dir=in action=allow program="C:\Program Files\Tailscale\tailscale.exe" enable=yes
  ```

## 4. Integration mit Active Directory

- **Benutzer- und Geräteverwaltung:**
  Nutzen Sie Tailscale in Kombination mit Active Directory, um Benutzer und Geräte zu authentifizieren.

- **Automatisierte Gruppenrichtlinien:**
  Verwenden Sie Gruppenrichtlinien, um die Tailscale-Installation und -Konfiguration in einer Domänenumgebung zu automatisieren.
