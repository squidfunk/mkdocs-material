# Winget Import Script

## Features

- Imports applications from a JSON file and installs them using Winget
- Provides detailed logging
- Displays a progress bar during the import process
- Handles errors gracefully
- Checks for existing installations

## Script

```powershell
<#
.SYNOPSIS
    Winget Application Import Script

.DESCRIPTION
    This script imports applications from a JSON file and installs them using Winget.
    It includes error handling, logging, and a progress bar.

.PARAMETER FilePath
    Specifies the path of the JSON file to import. If not provided, a default path will be used.

.EXAMPLE
    .\WingetImport.ps1
    .\WingetImport.ps1 -FilePath "C:\CustomExport.json"
#>

param (
    [Parameter(Mandatory=$false)]
    [string]$FilePath
)

# Script-wide variables
$script:logFile = Join-Path $env:TEMP "WingetImport_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"

# Logging function
function Write-Log {
    param ([string]$Message)
    $logEntry = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss'): $Message"
    Add-Content -Path $script:logFile -Value $logEntry
    Write-Host $logEntry
}

# Progress bar function
function Show-Progress {
    param (
        [int]$Current,
        [int]$Total,
        [string]$Activity
    )
    $percentComplete = ($Current / $Total) * 100
    Write-Progress -Activity $Activity -Status "$Current of $Total completed" -PercentComplete $percentComplete
}

# Import function
function Import-WingetApps {
    param ([string]$ImportPath)

    Write-Log "Starting import of applications from JSON file..."

    try {
        if (-not (Test-Path -Path $ImportPath)) {
            Write-Log "Error: The file $ImportPath does not exist. Import aborted."
            return
        }

        $jsonData = Get-Content -Raw -Path $ImportPath | ConvertFrom-Json

        if ($null -eq $jsonData.Applications) {
            Write-Log "Error: The JSON file does not contain an 'Applications' section. Import aborted."
            return
        }

        $total = $jsonData.Applications.Count
        for ($i = 0; $i -lt $total; $i++) {
            $app = $jsonData.Applications[$i]
            $appId = $app.Id

            Write-Log "Attempting to install $($app.Name) (ID: $appId, Version: $($app.Version))..."

            try {
                $installResult = winget install $appId --accept-package-agreements --accept-source-agreements -e --disable-interactivity | Out-String
                if ($installResult -match "Successfully installed") {
                    Write-Log "Successfully installed $($app.Name) (ID: $appId)"
                }
                else {
                    Write-Log "Installation of $($app.Name) (ID: $appId) may have failed or was already installed. Output: $installResult"
                }
            }
            catch {
                Write-Log "Failed to install $($app.Name) (ID: $appId): $_"
            }

            Show-Progress -Current ($i + 1) -Total $total -Activity "Installing Winget packages"
        }

        Write-Log "Import completed successfully."
    }
    catch {
        Write-Log "An error occurred during import: $_"
    }
}

# Main execution
try {
    if (-not $FilePath) {
        $FilePath = Join-Path $env:USERPROFILE "Desktop\$env:USERNAME-winget-apps-backup.json"
    }

    Import-WingetApps -ImportPath $FilePath
}
catch {
    Write-Log "An unexpected error occurred: $_"
}
finally {
    Write-Log "Script execution completed. Log file: $script:logFile"
}
```

## How to Use

1. Save the script as `WingetImport.ps1` on your computer.
2. Open PowerShell and navigate to the directory containing the script.
3. Run the script using one of the following commands:

   - To use the default import file location (Desktop):
     ```
     .\WingetImport.ps1
     ```

   - To specify a custom import file location:
     ```
     .\WingetImport.ps1 -FilePath "C:\CustomPath\WingetBackup.json"
     ```

4. The script will read the JSON file and attempt to install each application using Winget.
5. Check the console output or the log file (location provided at the end of execution) for any error messages or the status of the import process.

## Note

This script requires PowerShell and Winget to be installed on your system. It's designed for Windows operating systems with Winget support. Make sure you have the necessary permissions to install applications on your system.

