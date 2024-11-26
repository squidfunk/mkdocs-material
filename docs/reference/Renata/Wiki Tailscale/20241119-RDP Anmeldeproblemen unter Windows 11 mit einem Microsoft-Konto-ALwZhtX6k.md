# RDP Anmeldeproblemen unter Windows 11 mit einem Microsoft-Konto

## Problem

Beim Versuch, sich über Remote Desktop (RDP) auf einem Windows 11-PC mit dem Microsoft-Konto `mostrub@live.de` anzumelden, wird die Anmeldung verweigert, obwohl die Anmeldeinformationen korrekt sind.

## Lösung

Um dieses Problem zu beheben, führe die folgenden Schritte aus:

### 1. Lokale Synchronisierung des Microsoft-Konto-Passworts

Stelle sicher, dass dein Microsoft-Konto-Passwort lokal zwischengespeichert ist:

- Öffne die Eingabeaufforderung:
  - Drücke `Win + R`, gib `cmd` ein und drücke `Enter`.
- Führe den folgenden Befehl aus:
  ```shell
  runas /u:MicrosoftAccount\mostrub@live.de cmd.exe
  ```
- Gib das Passwort deines Microsoft-Kontos ein, wenn du dazu aufgefordert wirst.
- Ein neues Eingabeaufforderungsfenster sollte sich öffnen, was darauf hinweist, dass die Anmeldeinformationen erfolgreich zwischengespeichert wurden.

Dieser Vorgang stellt sicher, dass dein Microsoft-Konto-Passwort lokal zwischengespeichert wird, was für die RDP-Authentifizierung erforderlich ist. 

### 2. Versuch der RDP-Verbindung

Versuche nun, über Remote Desktop eine Verbindung zu deinem Windows 11-PC herzustellen:

- Öffne den Remote Desktop-Client.
- Gib die folgenden Anmeldeinformationen ein:
  - **Benutzername**: `MicrosoftAccount\mostrub@live.de`
  - **Passwort**: Dein Microsoft-Konto-Passwort

Stelle sicher, dass du das korrekte Passwort verwendest, das mit deinem Microsoft-Konto verknüpft ist.

## Alternative Lösung

Falls das Problem weiterhin besteht, kannst du ein lokales Konto auf dem Remote-PC erstellen und diese Anmeldeinformationen für den RDP-Zugriff verwenden. Dieser Ansatz kann manchmal Authentifizierungsprobleme im Zusammenhang mit Microsoft-Konten umgehen. 

Durch Befolgen dieser Schritte solltest du in der Lage sein, eine Remote-Desktop-Verbindung mit deinen Microsoft-Konto-Anmeldeinformationen herzustellen, ohne den Remote-PC neu starten zu müssen. 