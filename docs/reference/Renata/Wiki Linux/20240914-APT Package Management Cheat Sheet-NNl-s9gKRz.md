# APT Package Management Cheat Sheet



## 1. Basic Commands

- **Update Package Lists:**
  ```bash
  sudo apt update
  ```
  Updates the list of available packages from the repositories.

- **Upgrade All Installed Packages:**
  ```bash
  sudo apt upgrade
  ```
  Upgrades all installed packages to the latest version.

- **Full Upgrade (Including Dependencies):**
  ```bash
  sudo apt full-upgrade
  ```
  Performs a full upgrade, including packages and dependencies.

- **Install a Package:**
  ```bash
  sudo apt install <package-name>
  ```
  Installs the specified package.

- **Remove a Package:**
  ```bash
  sudo apt remove <package-name>
  ```
  Removes the package but keeps its configuration files.

- **Purge a Package (Remove Configuration Files):**
  ```bash
  sudo apt purge <package-name>
  ```
  Completely removes the package and its configuration files.

## 2. Advanced Package Management

- **Search for a Package:**
  ```bash
  apt search <package-name>
  ```
  Searches for a package in the repositories.

- **Show Package Information:**
  ```bash
  apt show <package-name>
  ```
  Displays detailed information about a package.

- **List Upgradable Packages:**
  ```bash
  apt list --upgradable
  ```
  Lists all packages that can be upgraded.

- **Remove Unused Packages:**
  ```bash
  sudo apt autoremove
  ```
  Removes packages that were automatically installed to satisfy dependencies and are no longer needed.

## 3. System Maintenance

- **Clean Package Cache:**
  ```bash
  sudo apt clean
  ```
  Removes all downloaded package files from the local cache.

- **Remove Obsolete Packages:**
  ```bash
  sudo apt autoclean
  ```
  Removes only obsolete package files from the local cache.

- **Fix Broken Dependencies:**
  ```bash
  sudo apt --fix-broken install
  ```
  Repairs missing dependencies caused by incomplete installations.

## 4. Package Sources and Repositories

- **Add a Repository to Package Sources:**
  ```bash
  sudo add-apt-repository <repository-url>
  ```
  Adds a new repository to the package sources.

- **Update Package List from a Specific Repository:**
  ```bash
  sudo apt update
  ```
  Updates the package lists from all configured sources.

## 5. Useful Options and Parameters

- **Update Only the Package Lists (No Installation):**
  ```bash
  sudo apt update
  ```
  Performs a package list update without installing packages.

- **Show Details During Installation:**
  ```bash
  sudo apt install <package-name> -y
  ```
  Automatically answers "yes" to all questions during installation.

- **Simulate Installation (Without Installing):**
  ```bash
  sudo apt install --simulate <package-name>
  ```
  Shows what would happen if the package were installed, without actually installing it.
