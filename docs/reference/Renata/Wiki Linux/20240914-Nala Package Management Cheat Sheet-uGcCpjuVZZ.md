# Nala Package Management Cheat Sheet



## 1. Basic Commands

- **Update Package Lists:**
  ```bash
  sudo nala update
  ```
  Updates the list of available packages from the repositories.

- **Upgrade All Installed Packages:**
  ```bash
  sudo nala upgrade
  ```
  Upgrades all installed packages to the latest version.

- **Install a Package:**
  ```bash
  sudo nala install <package-name>
  ```
  Installs the specified package.

- **Remove a Package:**
  ```bash
  sudo nala remove <package-name>
  ```
  Removes the package but keeps its configuration files.

- **Purge a Package (Remove Configuration Files):**
  ```bash
  sudo nala purge <package-name>
  ```
  Completely removes the package and its configuration files.

## 2. Advanced Package Management

- **Search for a Package:**
  ```bash
  nala search <package-name>
  ```
  Searches for a package in the repositories.

- **List Upgradable Packages:**
  ```bash
  nala list --upgradable
  ```
  Lists all packages that can be upgraded.

- **Remove Unused Packages:**
  ```bash
  sudo nala autoremove
  ```
  Removes packages that were automatically installed to satisfy dependencies and are no longer needed.

## 3. System Maintenance

- **Clean Package Cache:**
  ```bash
  sudo nala clean
  ```
  Removes all downloaded package files from the local cache.

- **Fix Broken Dependencies:**
  ```bash
  sudo nala fix
  ```
  Repairs missing dependencies caused by incomplete installations.

## 4. Package Sources and Repositories

- **Add a Repository to Package Sources:**
  ```bash
  sudo nala add-repo <repository-url>
  ```
  Adds a new repository to the package sources.

- **Update Package List from a Specific Repository:**
  ```bash
  sudo nala update
  ```
  Updates the package lists from all configured sources.

## 5. Useful Options and Parameters

- **Update Only the Package Lists (No Installation):**
  ```bash
  sudo nala update
  ```
  Performs a package list update without installing packages.

- **Show Details During Installation:**
  ```bash
  sudo nala install <package-name> -y
  ```
  Automatically answers "yes" to all questions during installation.

- **Simulate Installation (Without Installing):**
  ```bash
  sudo nala install --simulate <package-name>
  ```
  Shows what would happen if the package were installed, without actually installing it.
