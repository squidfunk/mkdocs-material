# Bereitstellung von Outlook-Signatur-Skripten über Gruppenrichtlinien

## Voraussetzungen
- PowerShell-Skripte "RenataSignature_MDM_2024.ps1" und "RenataSignature_Default.ps1"
- Zugriff auf die Gruppenrichtlinienverwaltung (Group Policy Management Console) auf dem Domänencontroller
- Entsprechende Berechtigungen für die Ausführung der Skripte und den Zugriff auf benötigte Ressourcen

## Schritte zur Implementierung

1. **Skripte auf dem Domänencontroller speichern**
   - Erstelle einen neuen Ordner auf dem Domänencontroller, z. B. "C:\Scripts"
   - Speichere die PowerShell-Skripte "RenataSignature_MDM_2024.ps1" und "RenataSignature_Default.ps1" in diesem Ordner

2. **Gruppenrichtlinienverwaltung öffnen**
   - Öffne die Gruppenrichtlinienverwaltung (Group Policy Management Console) auf dem Domänencontroller

3. **Neues GPO erstellen oder vorhandenes GPO bearbeiten**
   - Erstelle ein neues GPO oder bearbeite ein vorhandenes GPO, das auf die gewünschten Benutzer oder Computer angewendet wird

4. **Skript-Einstellungen konfigurieren**
   - Navigiere zu "Benutzerkonfiguration" -> "Richtlinien" -> "Windows-Einstellungen" -> "Skripts (Anmeldung/Abmeldung)"
   - Doppelklicke auf "Anmeldung", um das Fenster "Eigenschaften von Anmeldung" zu öffnen
   - Klicke auf "Hinzufügen" und dann auf "Durchsuchen"
   - Navigiere zu dem Ordner, in dem du die PowerShell-Skripte gespeichert hast (z. B. "C:\Scripts")
   - Wähle nacheinander die Skripte "RenataSignature_MDM_2024.ps1" und "RenataSignature_Default.ps1" aus
   - Klicke auf "Öffnen" und dann auf "OK"

5. **Skript-Reihenfolge überprüfen**
   - Stelle sicher, dass die Skripte in der richtigen Reihenfolge ausgeführt werden
   - Verwende die Schaltflächen "Nach oben" und "Nach unten", um die Reihenfolge anzupassen

6. **Änderungen speichern und GPO-Verwaltung schließen**
   - Klicke auf "OK", um die Änderungen zu speichern und das Fenster zu schließen
   - Schließe die Gruppenrichtlinienverwaltung

7. **Gruppenrichtlinien aktualisieren**
   - Führe den Befehl `gpupdate /force` auf den Zielcomputern aus, um die Gruppenrichtlinien sofort zu aktualisieren
   - Alternativ warte, bis die Gruppenrichtlinien automatisch aktualisiert werden

## Fehlerbehebung
- Überprüfe die Ereignisanzeige auf den Zielcomputern, um mögliche Fehler bei der Ausführung der Skripte zu identifizieren und zu beheben
- Stellt sicher, dass die Benutzer über die erforderlichen Berechtigungen verfügen, um die Skripte auszuführen und auf die benötigten Ressourcen zuzugreifen

Durch die Ausführung der PowerShell-Skripte über Gruppenrichtlinien werden die Outlook-Signaturen bei der Anmeldung der Benutzer automatisch konfiguriert, ohne dass eine manuelle Intervention erforderlich ist.



