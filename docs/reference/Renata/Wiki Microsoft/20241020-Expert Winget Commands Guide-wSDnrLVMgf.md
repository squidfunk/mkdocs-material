# Expert Winget Commands Guide

## Advanced Installation Commands

### 1. Silent Installation

Install an application silently without any user interface:

```
winget install <app-id> --silent
```

### 2. Install Specific Version

Install a specific version of an application:

```
winget install <app-id> --version <version-number>
```

### 3. Override Installation Arguments

Specify custom installation arguments:

```
winget install <app-id> --override "/SILENT /NORESTART"
```

### 4. Install from Alternate Source

Install from a specific source:

```
winget install <app-id> --source winget
```

## Advanced Management Commands

### 1. Export Installed Packages

Export a list of installed packages to a JSON file:

```
winget export -o <path-to-file.json>
```

### 2. Import and Install Packages

Import and install packages from a JSON file:

```
winget import -i <path-to-file.json>
```

### 3. List with Specific Source

List installed packages from a specific source:

```
winget list --source winget
```

### 4. Upgrade with Specific Source

Upgrade all packages from a specific source:

```
winget upgrade --all --source winget
```

## Advanced Search and Information Commands

### 1. Search with Moniker

Search for packages using their moniker:

```
winget search --moniker <moniker>
```

### 2. Show Package Manifest

Display the manifest of a package:

```
winget show <app-id> --manifest
```

### 3. Search with ID, Name, Moniker, and Tags

Perform a comprehensive search:

```
winget search <query> --id --name --moniker --tag
```

## Automation and Scripting

### 1. Accept Source Agreements Automatically

Automatically accept source agreements in scripts:

```
winget install <app-id> --accept-source-agreements
```

### 2. Disable Interactivity

Disable all interactive prompts for scripting:

```
winget install <app-id> --disable-interactivity
```

### 3. Use Exact Match

Ensure exact matching for app ID to avoid unintended installations:

```
winget install <app-id> --exact
```

## Configuration and Settings

### 1. View Winget Settings

View current Winget settings:

```
winget settings
```

### 2. Change Default Source

Change the default source for Winget:

```
winget source remove winget
winget source add winget https://winget.azureedge.net/cache
```

### 3. Reset Winget Source

Reset Winget source to default:

```
winget source reset winget
```

## Tips for Expert Users

- Use PowerShell scripts to automate complex installation and update processes.
- Combine Winget commands with other PowerShell cmdlets for advanced system management.
- Regularly update the Winget tool itself to access the latest features and improvements.
- Explore community-created tools and scripts that extend Winget's functionality.
- For enterprise environments, consider using Winget in conjunction with other management tools like Microsoft Intune or SCCM.

