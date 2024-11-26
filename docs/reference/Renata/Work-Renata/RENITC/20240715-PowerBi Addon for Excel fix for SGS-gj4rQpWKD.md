# PowerBi Addon for Excel fix for SGS

# PowerBi Addon for Excel fix for SGS


### Schritte zur Verwendung des Skripts:

   Öffne PowerShell mit administrativen Rechten.
   Kopiere das Skript und füge es in das PowerShell-Fenster ein.
   Führe das Skript aus, um den Wert von "LoadBehavior" auf 3 zu überprüfen und zu setzen.
   
   
```powershell
   # Definiere den Registrierungspfad und den Schlüsselnamen
$regPath = "HKCU:\Software\Microsoft\Office\Excel\AddIns\SapExcelAddIn"
$regKeyName = "LoadBehavior"

# Funktion, um LoadBehavior auf 3 zu setzen
function Set-LoadBehavior {
    # Überprüfen, ob der Registrierungspfad existiert
    if (Test-Path $regPath) {
        # Setze den LoadBehavior-Wert auf 3
        Set-ItemProperty -Path $regPath -Name $regKeyName -Value 3
        Write-Output "LoadBehavior wurde erfolgreich auf 3 gesetzt."
    } else {
        Write-Output "Registrierungspfad nicht gefunden. Schlüssel wird erstellt und LoadBehavior auf 3 gesetzt."
        # Erstelle den Registrierungspfad, falls er nicht existiert und setze LoadBehavior auf 3
        New-Item -Path $regPath -Force | Out-Null
        New-ItemProperty -Path $regPath -Name $regKeyName -Value 3 -PropertyType DWORD | Out-Null
        Write-Output "LoadBehavior erfolgreich auf 3 gesetzt."
    }
}

# Funktion ausführen
Set-LoadBehavior   
```
---
# LoadBehavior 

1. **Create a Scheduled Task with Administrative Privileges:**
   - This ensures the `LoadBehavior` setting is reapplied regularly.
   - The task should be created by an administrator but will run under the user's context.

2. **Provide the User with a Way to Manually Run the Script:**
   - This allows the user to reapply the setting if needed without requiring administrative rights.

### Step-by-Step Guide

#### Step 1: Create the PowerShell Script

Save the following PowerShell script as `SetLoadBehavior.ps1` in a known directory (e.g., `C:\Scripts`):

```powershell
# Define the registry path and key name
$regPath = "HKCU:\Software\Microsoft\Office\Excel\AddIns\SapExcelAddIn"
$regKeyName = "LoadBehavior"

# Function to set LoadBehavior to 3
function Set-LoadBehavior {
    # Check if the registry path exists
    if (Test-Path $regPath) {
        # Set the LoadBehavior value to 3
        Set-ItemProperty -Path $regPath -Name $regKeyName -Value 3
        Write-Output "LoadBehavior wurde erfolgreich auf 3 gesetzt."
    } else {
        Write-Output "Registrierungspfad nicht gefunden. Schlüssel wird erstellt und LoadBehavior auf 3 gesetzt."
        # Create the registry path if it doesn't exist and set LoadBehavior to 3
        New-Item -Path $regPath -Force | Out-Null
        New-ItemProperty -Path $regPath -Name $regKeyName -Value 3 -PropertyType DWORD | Out-Null
        Write-Output "LoadBehavior erfolgreich auf 3 gesetzt."
    }
}

# Execute the function
Set-LoadBehavior
```

#### Step 2: Create a Scheduled Task

An administrator needs to create a scheduled task that runs the PowerShell script with the highest privileges. This task will ensure the `LoadBehavior` setting is applied regularly.

1. **Open Task Scheduler as Administrator:**
   - Press `Windows + X` and select `Windows PowerShell (Admin)` or `Command Prompt (Admin)`.
   - Type `taskschd.msc` and press `Enter`.

2. **Create a New Task:**
   - Click on `Create Task` in the right-hand pane.

3. **General Tab:**
   - Name: Set LoadBehavior for Excel Add-in
   - Description: Ensures the LoadBehavior value is set to 3 for the Excel add-in.
   - Select `Run with highest privileges`.
   - Configure for: Windows 10 (or your version of Windows).

4. **Triggers Tab:**
   - Click `New`.
   - Begin the task: At log on.
   - (Optionally) Repeat task every: 1 hour for a duration of: Indefinitely.

5. **Actions Tab:**
   - Click `New`.
   - Action: Start a program.
   - Program/script: `powershell.exe`.
   - Add arguments: `-File "C:\Scripts\SetLoadBehavior.ps1"` (replace `C:\Scripts` with the actual path to the script).

6. **Conditions Tab:**
   - Adjust any conditions if necessary (default settings are usually fine).

7. **Settings Tab:**
   - Ensure `Allow task to be run on demand` is checked.
   - Ensure `Run task as soon as possible after a scheduled start is missed` is checked.
   - Click `OK` to save the task.

#### Step 3: Provide the User with a Manual Script Shortcut

Create a shortcut that allows the user to manually run the script if needed.

1. **Create a Shortcut to the Script:**
   - Right-click on the desktop and select `New > Shortcut`.
   - Enter the location of PowerShell and the script:
     ```
     powershell.exe -ExecutionPolicy Bypass -File "C:\Scripts\SetLoadBehavior.ps1"
     ```
     (Replace `C:\Scripts` with the actual path to the script.)

2. **Name the Shortcut:**
   - Give the shortcut a meaningful name, such as `Run Excel Add-in Fix`.

3. **Place the Shortcut in a Convenient Location:**
   - Move the shortcut to a location easily accessible to the user, such as their desktop or Start menu.

---
#  E-Mail to Swatch Support Team

**Subject:** Request for GPO Exception/Exclusion for Excel Add-in LoadBehavior Setting


**CC:** IT Support, Helpdesk, User Support Team

**Dear GPO Team,**

I am writing to request your assistance in creating an exception or exclusion within our Group Policy Objects (GPOs) to ensure the persistence of a critical registry setting for an Excel add-in. The specific registry key in question is responsible for the `LoadBehavior` of the `SapExcelAddIn` and needs to be set to a value of `3` to remain functional.

### Background

Our users have been experiencing issues with the `SapExcelAddIn` for Excel, where the add-in gets disabled upon closing and reopening Excel. The required registry key `LoadBehavior` is located at:

```
HKCU:\Software\Microsoft\Office\Excel\AddIns\SapExcelAddIn
```

The `LoadBehavior` key needs to be set to `3` to ensure the add-in loads correctly every time Excel is launched. This setting is crucial for our operations as it directly impacts productivity by ensuring the necessary add-in is always available for use.

### Current Issue

Despite setting the `LoadBehavior` to `3`, the value reverts upon closing and reopening Excel. This behavior suggests that a GPO might be resetting this value periodically, likely during user logon or background policy refreshes.

### Request

To resolve this issue, we request the following actions:

1. **Identify the GPO:**
   - Locate any GPOs that modify the `LoadBehavior` setting for Excel add-ins, specifically `SapExcelAddIn`.

2. **Create an Exception/Exclusion:**
   - Create an exception or exclusion within the identified GPO(s) to prevent the `LoadBehavior` setting from being modified for the `SapExcelAddIn`.
   - Alternatively, create an exception group for users who require this add-in, ensuring the GPO does not overwrite their registry settings.

### Suggested Implementation

- **Option 1: Exclusion in GPO:**
  - Exclude the `HKCU:\Software\Microsoft\Office\Excel\AddIns\SapExcelAddIn\LoadBehavior` key from the GPO policies that enforce registry settings.

- **Option 2: Exception Group:**
  - Create a security group (e.g., `ExcelAddInExceptionGroup`) and exclude this group from the GPO that enforces the registry settings.
  - Add affected users to the `ExcelAddInExceptionGroup`.

### Justification

Implementing this exception is essential to maintain the functionality of the `SapExcelAddIn`, which is critical for our users. Ensuring this setting persists will prevent the add-in from being disabled, thereby avoiding interruptions in workflow and maintaining productivity.

### Steps Taken So Far

To mitigate this issue temporarily, we have implemented the following steps:
1. **Scheduled Task:** Created a scheduled task to reset the `LoadBehavior` value periodically.
2. **User Script:** Provided users with a script to manually reset the `LoadBehavior` value.

However, these measures are not foolproof and rely on user intervention, which is not an ideal long-term solution.
We appreciate your prompt attention to this matter and look forward to your assistance in creating a robust solution that ensures the persistence of the `LoadBehavior` setting for the `SapExcelAddIn`. If further information or a meeting is required to discuss this request, please let us know at your earliest convenience.

Thank you for your support.

---

# Email to Stefan


Hallo Stefan,**

ich hoffe, dir geht's gut. Ich wollte dich kurz darüber informieren, was wir wegen des Problems mit dem `SapExcelAddIn` für Excel unternehmen, das immer wieder deaktiviert wird.

### Temporäre Lösung

Um das Add-In aktiv zu halten, habe ich ein PowerShell-Skript erstellt, das den `LoadBehavior`-Wert auf `3` setzt. Dieses Skript wird automatisch regelmäßig ausgeführt, damit der Wert korrekt bleibt. Für den Fall, dass das Add-In wieder deaktiviert wird, kannst du das Skript auch manuell ausführen.

Hier sind die Schritte, um das Skript manuell auszuführen:
1. **Speichern des Skripts:** Das Skript ist als `SetLoadBehavior.ps1` in einem bekannten Verzeichnis (z.B. `C:\Scripts`) gespeichert.
2. **Verknüpfung erstellen:** Ich habe eine Verknüpfung zur Skriptdatei erstellt, die du bei Bedarf ausführen kannst.

### Langfristige Lösung

Um das Problem dauerhaft zu lösen, habe ich eine Anfrage an das GPO-Team geschickt. Sie sollen eine Ausnahme in den Gruppenrichtlinien (GPOs) erstellen oder dich in eine Ausnahmegruppe aufnehmen, damit der `LoadBehavior`-Wert nicht mehr zurückgesetzt wird.

Ich möchte die temporäre Lösung nächste Woche mit dir testen, um sicherzustellen, dass alles reibungslos läuft. Wann hättest du Zeit dafür? Montag wäre ungünstig, aber jeder andere Tag passt mir.

Danke für deine Geduld und Unterstützung!

Viele Grüsse,  
Marc

---
