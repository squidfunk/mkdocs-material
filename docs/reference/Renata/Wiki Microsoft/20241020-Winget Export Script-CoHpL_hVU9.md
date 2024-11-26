# Winget Export Script


This PowerShell script allows you to export a list of all applications installed via Winget to a JSON file. It includes error handling, logging, and a progress bar for a smooth user experience.

## Features

- Exports all Winget-installed applications to a JSON file
- Includes metadata such as user, OS version, and export date
- Provides detailed logging
- Displays a progress bar during the export process
- Handles errors gracefully

## Script

```powershell
<#
.SYNOPSIS
    Winget Application Export Script

.DESCRIPTION
    This script exports all applications installed via Winget to a JSON file.
    It includes error handling, logging, and a progress bar.

.PARAMETER FilePath
    Specifies the path for the JSON file. If not provided, a default path will be used.

.EXAMPLE
    .\WingetExport.ps1
    .\WingetExport.ps1 -FilePath "C:\CustomExport.json"
#>

param (
    [Parameter(Mandatory=$false)]
    [string]$FilePath
)

# Script-wide variables
$script:logFile = Join-Path $env:TEMP "WingetExport_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"

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

# Function to get Winget packages
function Get-WingetPackages {
    $packages = winget list --source winget --accept-source-agreements | Out-String
    $lines = $packages -split "`n"
    $startIndex = $lines.IndexOf(($lines -match '^-+' | Select-Object -First 1)) + 1
    $endIndex = $lines.IndexOf(($lines -match '^$' | Select-Object -Last 1)) - 1
    $packageData = $lines[$startIndex..$endIndex] | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }

    $result = @()
    foreach ($package in $packageData) {
        $parts = $package -split '\s+', 4
        if ($parts.Count -ge 4) {
            $result += [PSCustomObject]@{
                Name = $parts[0]
                Id = $parts[1]
                Version = $parts[2]
                Source = $parts[3]
            }
        }
    }
    return $result
}

# Export function
function Export-WingetApps {
    param ([string]$ExportPath)

    Write-Log "Starting export of installed applications..."

    try {
        $wingetPackages = Get-WingetPackages

        if ($wingetPackages.Count -eq 0) {
            Write-Log "No applications found to export."
            return
        }

        $jsonObject = @{
            User = $env:USERNAME
            OS_Version = (Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion").ProductName
            Export_Date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            Applications = @()
        }

        $total = $wingetPackages.Count
        for ($i = 0; $i -lt $total; $i++) {
            $package = $wingetPackages[$i]
            $jsonObject.Applications += @{
                Name = $package.Name
                Id = $package.Id
                Version = $package.Version
                Source = $package.Source
            }
            Show-Progress -Current ($i + 1) -Total $total -Activity "Exporting Winget packages"
        }

        $jsonObject | ConvertTo-Json -Depth 3 | Out-File -FilePath $ExportPath -Encoding utf8 -Force
        Write-Log "Export completed successfully. File saved to: $ExportPath"
    }
    catch {
        Write-Log "An error occurred during export: $_"
    }
}

# Main execution
try {
    if (-not $FilePath) {
        $FilePath = Join-Path $env:USERPROFILE "Desktop\$env:USERNAME-winget-apps-backup.json"
    }

    Export-WingetApps -ExportPath $FilePath
}
catch {
    Write-Log "An unexpected error occurred: $_"
}
finally {
    Write-Log "Script execution completed. Log file: $script:logFile"
}
```

## How to Use

1. Save the script as `WingetExport.ps1` on your computer.
2. Open PowerShell and navigate to the directory containing the script.
3. Run the script using one of the following commands:

   - To use the default export location (Desktop):
     ```
     .\WingetExport.ps1
     ```

   - To specify a custom export location:
     ```
     .\WingetExport.ps1 -FilePath "C:\CustomPath\WingetBackup.json"
     ```

4. The script will create a JSON file with the list of installed Winget applications.
5. Check the console output or the log file (location provided at the end of execution) for any error messages or the status of the export process.

## Note

This script requires PowerShell and Winget to be installed on your system. It's designed for Windows operating systems with Winget support.
