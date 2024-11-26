# Voraussetzungen für die Bereitstellung von Outlook-Signatur-Skripten über Gruppenrichtlinien



## Domänencontroller
- Active Directory-Domänendienste (AD DS) müssen konfiguriert und funktionsfähig sein
- Mindestens ein Domänencontroller mit der Rolle "Gruppenrichtlinien-Verwaltung"
- Zugriff auf die Gruppenrichtlinienverwaltung (Group Policy Management Console)
- PowerShell Version 3.0 oder höher auf dem Domänencontroller

## Benutzer-PCs
- Die Benutzer-PCs müssen Mitglied der Active Directory-Domäne sein
- Windows 10 oder Windows 11 als Betriebssystem
- PowerShell Version 3.0 oder höher auf den Benutzer-PCs
- Microsoft Outlook 2013, 2016, 2019 oder Outlook im Rahmen von Microsoft 365 Apps for Enterprise (ehemals Office 365 ProPlus)
- Die Benutzer müssen über ein gültiges Active Directory-Benutzerkonto verfügen

## Netzwerk
- Stabile Netzwerkverbindung zwischen den Benutzer-PCs und dem Domänencontroller
- Die Benutzer-PCs müssen in der Lage sein, die Gruppenrichtlinien vom Domänencontroller abzurufen

## Berechtigungen
- Der Administrator, der die Gruppenrichtlinien konfiguriert, benötigt entsprechende Berechtigungen zum Erstellen und Bearbeiten von GPOs
- Die Benutzer müssen über die erforderlichen Berechtigungen verfügen, um die PowerShell-Skripte auszuführen und auf die benötigten Ressourcen (z. B. Active Directory-Attribute) zuzugreifen

## Skriptanforderungen
- Die PowerShell-Skripte "RenataSignature_MDM_2024.ps1" und "RenataSignature_Default.ps1" müssen auf dem Domänencontroller in einem freigegebenen Ordner gespeichert werden, auf den die Benutzer-PCs zugreifen können
- Die Skripte müssen mit der verwendeten PowerShell-Version kompatibel sein

## Zusätzliche Überlegungen
- Stellen Sie sicher, dass die Ausführung von PowerShell-Skripten auf den Benutzer-PCs nicht durch Sicherheitsrichtlinien oder Antiviren-Software blockiert wird
- Testen Sie die Skripte gründlich in einer Testumgebung, bevor Sie sie in der Produktionsumgebung einsetzen
- Informieren und schulen Sie die Benutzer über die Änderungen an den Outlook-Signaturen und den Grund für die Bereitstellung über Gruppenrichtlinien

Beachten Sie, dass die spezifischen Anforderungen von Ihrer bestehenden IT-Infrastruktur und -Umgebung abhängen können. Es ist wichtig, die Kompatibilität und Funktionalität der Skripte und der Gruppenrichtlinienbereitstellung im Renata Netzwerk zu überprüfen, bevor Sie sie in der Produktionsumgebung implementieren.