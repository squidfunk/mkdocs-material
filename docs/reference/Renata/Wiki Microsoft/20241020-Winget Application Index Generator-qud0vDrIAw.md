# Winget Application Index Generator


This PowerShell script generates a comprehensive index of all applications registered with Winget, organizing them alphabetically and providing links to their installation commands.

## Script

```powershell
<#
.SYNOPSIS
    Generates an index of all applications available through Winget.

.DESCRIPTION
    This script queries Winget for all available packages, sorts them alphabetically,
    and generates a markdown file with a clickable index and installation commands.

.PARAMETER OutputFile
    The path where the markdown file will be saved. Default is "WingetAppIndex.md" in the current directory.

.EXAMPLE
    .\GenerateWingetIndex.ps1
    .\GenerateWingetIndex.ps1 -OutputFile "C:\Path\To\CustomIndex.md"
#>

param (
    [string]$OutputFile = "WingetAppIndex.md"
)

function Write-Log {
    param ([string]$Message)
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss'): $Message"
}

function Get-WingetPackages {
    Write-Log "Fetching all Winget packages..."
    $packages = winget search | Out-String
    $lines = $packages -split "`n"
    $startIndex = $lines.IndexOf(($lines -match '^-+' | Select-Object -First 1)) + 1
    $packageData = $lines[$startIndex..($lines.Count - 1)] | Where-Object { $_ -match '\S' }

    $result = @()
    foreach ($package in $packageData) {
        $parts = $package -split '\s+', 4
        if ($parts.Count -ge 3) {
            $result += [PSCustomObject]@{
                Name = $parts[0]
                Id = $parts[1]
                Version = $parts[2]
            }
        }
    }
    return $result | Sort-Object Name
}

function Generate-MarkdownIndex {
    param ([array]$Packages, [string]$OutputFile)

    Write-Log "Generating markdown index..."
    $content = "# Winget Application Index`n`n"
    $content += "This index was generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n`n"
    $content += "## Table of Contents`n`n"

    $alphabet = 'A'..'Z'
    foreach ($letter in $alphabet) {
        $content += "- [$letter](#$letter)`n"
    }

    $content += "`n## Applications`n`n"

    $currentLetter = ''
    foreach ($package in $Packages) {
        $firstLetter = $package.Name.Substring(0, 1).ToUpper()
        if ($firstLetter -ne $currentLetter) {
            $currentLetter = $firstLetter
            $content += "### $currentLetter`n`n"
        }
        $content += "- **$($package.Name)** (ID: $($package.Id), Version: $($package.Version))`n"
        $content += "  ```powershell`n  winget install $($package.Id)`n  ````n`n"
    }

    $content | Out-File -FilePath $OutputFile -Encoding utf8
    Write-Log "Index generated and saved to $OutputFile"
}

# Main execution
try {
    $packages = Get-WingetPackages
    Generate-MarkdownIndex -Packages $packages -OutputFile $OutputFile
    Write-Log "Process completed successfully."
}
catch {
    Write-Log "An error occurred: $_"
}
```

## How to Use

1. Save the script as `GenerateWingetIndex.ps1` on your computer.
2. Open PowerShell and navigate to the directory containing the script.
3. Run the script using one of the following commands:

   - To use the default output file name in the current directory:
     ```
     .\GenerateWingetIndex.ps1
     ```

   - To specify a custom output file location:
     ```
     .\GenerateWingetIndex.ps1 -OutputFile "C:\Path\To\CustomWingetIndex.md"
     ```

4. The script will generate a markdown file containing an alphabetical index of all applications available through Winget.

## Output Format

The generated markdown file will have the following structure:

1. A title and generation timestamp
2. A table of contents with alphabetical links
3. The main list of applications, organized alphabetically
4. Each application entry includes:
   - The application name
   - Its Winget ID
   - The current version
   - A copyable Winget install command

## Note

- This script may take several minutes to run, depending on your internet connection and the number of packages available through Winget.
- The generated index can be quite large, potentially containing thousands of entries.
- You can open the resulting markdown file in any markdown viewer or editor for easy navigation and searching.

This script provides a valuable resource for exploring the full range of software available through Winget, making it easier to discover and install applications.
