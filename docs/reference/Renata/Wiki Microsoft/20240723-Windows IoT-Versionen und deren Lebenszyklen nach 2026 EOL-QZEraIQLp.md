# Windows IoT-Versionen und deren Lebenszyklen nach 2026 EOL

#### Windows 10 IoT Enterprise LTSC
- **LTSC 2016 (1607)**
  - **Ende des Supports**: 13. Oktober 2026
- **LTSC 2019 (1809)**
  - **Ende des Supports**: 9. Januar 2029
- **LTSC 2021 (21H2)**
  - **Ende des Supports**: 13. Januar 2032

#### Windows 11 IoT Enterprise
- **Version 21H2**
  - **Ende des Supports**: 8. Oktober 2024
- **Version 22H2**
  - **Ende des Supports**: 14. Oktober 2025
- **Version 23H2**
  - **Ende des Supports**: 10. November 2026
- **Version 24H2** (geplante Veröffentlichung)
  - **Erwartetes Ende des Supports**: Wahrscheinlich Ende 2027 oder Anfang 2028

#### Zukünftige Entwicklungen
Microsoft ist weiterhin bestrebt, die Unterstützung und Weiterentwicklung von Windows IoT zu gewährleisten. Zukünftige Versionen und Updates werden weiterhin auf die Bedürfnisse der Branchen abgestimmt, die auf IoT-Lösungen angewiesen sind. Der Long-Term Servicing Channel (LTSC) wird seinen 10-jährigen Support-Lebenszyklus beibehalten, um langfristige Stabilität und Sicherheit für Unternehmensbereitstellungen zu gewährleisten.

Für detaillierte und aktuelle Informationen können Sie die offizielle Microsoft-Dokumentation einsehen:
- Windows 10 IoT Enterprise Lebenszyklus
- Windows 11 IoT Enterprise Lebenszyklus


### Die Anweisungen gelten sowohl für Windows 10 IoT Enterprise als auch für Windows 10 IoT Core.

#### Voraussetzungen:
- Stellen Sie sicher, dass Ihr Windows IoT-Gerät mit dem Internet verbunden ist.
- Stellen Sie sicher, dass Sie über administrative Berechtigungen auf dem Gerät verfügen.

### Installationsschritte für Windows 10 IoT Enterprise:

1. **Tailscale-Installer herunterladen:**
   - Besuchen Sie die Tailscale-Website und laden Sie den Windows-Installer herunter.
   - Der Installer ist normalerweise in Form einer .msi-Datei verfügbar.

2. **Den Installer auf das IoT-Gerät übertragen:**
   - Verwenden Sie ein USB-Laufwerk, ein Netzwerk-Share oder eine andere Methode, um den Tailscale-Installer auf Ihr Windows IoT-Gerät zu übertragen.

3. **Den Installer ausführen:**
   - Öffnen Sie auf Ihrem Windows IoT-Gerät die Eingabeaufforderung mit administrativen Rechten.
   - Navigieren Sie zu dem Verzeichnis, in dem sich der Installer befindet.
   - Führen Sie den Installer mit folgendem Befehl aus:
     ```cmd
     msiexec /i Pfad\zu\TailscaleSetup.msi
     ```

4. **Tailscale anmelden und konfigurieren:**
   - Nach der Installation sehen Sie das Tailscale-Symbol in Ihrer Taskleiste. Klicken Sie darauf und wählen Sie „Anmelden“.
   - Authentifizieren Sie sich mit einem unterstützten Single Sign-On (SSO) Identitätsanbieter-Konto. Dies erstellt Ihr privates Tailscale-Netzwerk (tailnet).

5. **Geräte konfigurieren:**
   - Fügen Sie andere Geräte zu Ihrem tailnet hinzu, indem Sie Tailscale auf jedem Gerät installieren und sich mit demselben Konto anmelden. Jedes Gerät wird in der Tailscale-Admin-Konsole zur Verwaltung angezeigt.

### Installationsschritte für Windows 10 IoT Core:

Windows 10 IoT Core ist ein leichtgewichtiges Betriebssystem und erfordert möglicherweise zusätzliche Schritte, um Software wie Tailscale zu installieren. Sie können Tailscale jedoch über Fernzugriff verwalten.

1. **Geräteportal aktivieren:**
   - Öffnen Sie das Windows Device Portal auf Ihrem IoT Core-Gerät.
   - Gehen Sie zu `Einstellungen > Geräte` und aktivieren Sie „Geräteportal“.

2. **PowerShell aus der Ferne verwenden:**
   - Öffnen Sie PowerShell auf Ihrem Windows 10-PC und verwenden Sie den folgenden Befehl, um sich zu verbinden:
     ```powershell
     Enter-PSSession -ComputerName <IhreGeräteIP> -Credential <IhreGeräteAdminAnmeldedaten>
     ```

3. **Tailscale-Installer herunterladen und übertragen:**
   - Laden Sie den Tailscale-Installer von der Tailscale-Website herunter.
   - Übertragen Sie den Installer mit dem Windows Device Portal oder einer anderen Methode auf Ihr Windows IoT Core-Gerät.

4. **Tailscale installieren:**
   - Führen Sie den Installer aus der Ferne über PowerShell aus:
     ```powershell
     msiexec /i Pfad\zu\TailscaleSetup.msi
     ```

5. **Anmelden und konfigurieren:**
   - Folgen Sie den gleichen Schritten, um sich anzumelden und Tailscale zu konfigurieren, wie für Windows 10 IoT Enterprise beschrieben.

### Zusätzliche Konfiguration:
Um sicherzustellen, dass Tailscale auch bei nicht angemeldetem Benutzer ausgeführt wird, aktivieren Sie den „Run Unattended“-Modus. Dies kann während der Installation oder über die Einstellungen der Tailscale-Admin-Konsole konfiguriert werden.