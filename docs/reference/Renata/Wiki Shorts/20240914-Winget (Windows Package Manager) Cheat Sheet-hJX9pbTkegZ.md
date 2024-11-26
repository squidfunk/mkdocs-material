# Winget (Windows Package Manager) Cheat Sheet



## 1. Basic Commands

- **Install Winget:**
  Winget comes pre-installed with Windows 10 and 11. If not, you can install it via the App Installer package from the Microsoft Store.

- **Search for a Package:**
  ```bash
  winget search <package-name>
  ```
  Searches for a package in the Winget repository.

- **Install a Package:**
  ```bash
  winget install <package-name>
  ```
  Installs the specified package.

- **Uninstall a Package:**
  ```bash
  winget uninstall <package-name>
  ```
  Uninstalls the specified package.

## 2. Managing and Updating Packages

- **List Installed Packages:**
  ```bash
  winget list
  ```
  Lists all packages installed via Winget.

- **Upgrade a Package:**
  ```bash
  winget upgrade <package-name>
  ```
  Upgrades the specified package to the latest version.

- **Upgrade All Packages:**
  ```bash
  winget upgrade --all
  ```
  Upgrades all installed packages to their latest versions.

## 3. Advanced Management

- **Show Package Details:**
  ```bash
  winget show <package-name>
  ```
  Displays detailed information about a specific package.

- **Export All Installed Packages to a File:**
  ```bash
  winget export --output path/to/installed-software.md
  ```
  Exports a list of all installed packages to a Markdown file.

- **Import and Install Packages from a File:**
  ```bash
  winget import --import path/to/installed-software.md
  ```
  Installs all packages listed in the export file.

## 4. Useful Options and Parameters

- **Force Install a Package:**
  ```bash
  winget install <package-name> --force
  ```
  Forces the installation of a package, even if it's already installed.

- **Suppress Prompts During Installation:**
  ```bash
  winget install <package-name> --silent
  ```
  Installs the package without user interaction.

- **Update Winget Sources:**
  ```bash
  winget source update
  ```
  Updates the package sources for Winget.
