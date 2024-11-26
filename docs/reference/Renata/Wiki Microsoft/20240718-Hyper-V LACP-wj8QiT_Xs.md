# Hyper-V LACP

## PowerShell als Administrator


#### Verfügbare Netzwerkkarten auflisten:
Identifiziere die Netzwerkkarten, die du in das NIC-Team aufnehmen möchtest.

```powershell
Get-NetAdapter
```

#### NIC-Team erstellen:
Erstelle ein NIC-Team mit dem `New-NetLbfoTeam-Cmdlet`. Angenommen, die inaktiven NICs heißen "OT1" und "OT2" und sollen ins Team aufgenommen werden, während die aktiven NICs ignoriert werden:

```powershell
New-NetLbfoTeam -Name "OT-Team" -TeamMembers "OT1", "OT2" -TeamingMode LACP -LoadBalancingAlgorithm Dynamic
```

#### Status des NIC-Teams überprüfen:
Überprüfe den Status des neu erstellten NIC-Teams, um sicherzustellen, dass es aktiv und korrekt konfiguriert ist.

```powershell
Get-NetLbfoTeam
```

#### Virtuellen Switch konfigurieren:
Wenn dieses NIC-Team für Hyper-V eingerichtet werden soll, musst du den virtuellen Switch an das NIC-Team binden.

```powershell
New-VMSwitch -Name "VMSwitch-OT" -NetAdapterName "OT-Team" -AllowManagementOS $true
```
* * *
#### Fehlersuche bei Problemen:

1. **Vorhandene Teams überprüfen**: Stelle sicher, dass das NIC-Team existiert.
    ```powershell
    Get-NetLbfoTeam
    ```

2. **Vorhandene virtuelle Switches überprüfen**: Stelle sicher, dass kein Konflikt mit bestehenden virtuellen Switches besteht.
    ```powershell
    Get-VMSwitch
    ```

3. **Virtuellen Switch erstellen**: Versuche erneut, den Switch zu erstellen und überprüfe spezifische Fehlermeldungen.
    ```powershell
    New-VMSwitch -Name "VMSwitch-OT" -NetAdapterName "OT-Team" -AllowManagementOS $true
    ```
---
### Wichtige Hinweise:
- Stelle sicher, dass dein Netzwerkadministrator die entsprechenden LACP-Einstellungen auf dem physischen Cisco-Switch konfiguriert hat.
- Überwache die Netzwerkleistung und die Redundanz, um sicherzustellen, dass die LACP-Konfiguration wie erwartet funktioniert.

---
