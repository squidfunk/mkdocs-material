# PowerManagment Win 10 and 11

1. **PowerShell als Administrator öffnen**:

   - Klicke mit der rechten Maustaste auf das **Startmenü** und wähle **Windows PowerShell (Administrator)**.

2. **Energieplan auf „Höchstleistung“ setzen**: Führe den folgenden Befehl aus, um den Höchstleistungs-Energieplan zu aktivieren:

   ```
   powershell
   Copy code
   powercfg /setactive SCHEME_MAX
   ```

Dieser Befehl aktiviert den **Höchstleistungs-Energieplan**, der den Computer so einstellt, dass er eine maximale Leistung erbringt, auch wenn das bedeutet, dass er mehr Energie verbraucht.

3. **Zusätzliche Optimierungen**:

   - Stelle sicher, dass unnötige Hintergrundprozesse deaktiviert sind.

   - Aktualisiere deine Treiber regelmäßig, insbesondere Grafik- und Netzwerktreiber.

   - Deaktiviere visuelle Effekte, die die Leistung beeinträchtigen könnten:

     ```
     powershell
     Copy code
     SystemPropertiesPerformance
     ```

     Gehe im geöffneten Fenster auf „**Leistung**“ und wähle „**Für optimale Leistung anpassen**
4. **Netzwerkadapter immer aktiv halten (allgemein für alle Adapter)**:

Dieser Befehl stellt sicher, dass kein Netzwerkadapter abgeschaltet wird, wenn das System in den Energiesparmodus wechselt oder gesperrt ist:

```plaintext
powershellCopy codeGet-NetAdapter | ForEach-Object { 
    Set-NetAdapterPowerManagement -Name $_.Name -AllowComputerToTurnOff $false -DeviceSleepOnDisconnect $false
}
```

- `-AllowComputerToTurnOff $false`: Verhindert, dass der Computer den Adapter ausschaltet.
- `-DeviceSleepOnDisconnect $false`: Stellt sicher, dass der Adapter im Schlafmodus nicht abgeschaltet wird.

5. **Verhindern des Ruhezustands und der Netzwerktrennung**:

Um zu verhindern, dass der Computer in den Ruhezustand geht und die Netzwerkverbindung unterbricht, kannst du den Energieplan auf "Höchstleistung" setzen und den Standby deaktivieren:

```plaintext
powershellCopy codepowercfg /setactive SCHEME_MAX
powercfg /change standby-timeout-ac 0
powercfg /change standby-timeout-dc 0
```

6. **Verhindern, dass sich die Festplatte abschaltet**:

Wenn auch Festplattenaktivität erforderlich ist, kannst du verhindern, dass die Festplatte abgeschaltet wird:

```plaintext
powershellCopy codepowercfg /change disk-timeout-ac 0
powercfg /change disk-timeout-dc 0
```

7. **Monitor nicht abschalten**:

Falls auch der Monitor aktiv bleiben soll, kannst du dies so konfigurieren:

```plaintext
powershellCopy codepowercfg /change monitor-timeout-ac 0
powercfg /change monitor-timeout-dc 0
```
