# DEB Package Management Cheat Sheet



## 1. Basic Package Management Commands

- **Install a `.deb` Package:**
  ```bash
  sudo dpkg -i /path/to/package.deb
  ```
  Installs a `.deb` package from a local file.

- **Fix Missing Dependencies After Installation:**
  ```bash
  sudo apt --fix-broken install
  ```
  Repairs dependency issues caused by installing a `.deb` package.

- **Remove an Installed Package (Keep Configuration Files):**
  ```bash
  sudo dpkg --remove <package-name>
  ```
  Removes an installed package but keeps the configuration files.

- **Purge a Package (Remove Configuration Files):**
  ```bash
  sudo dpkg --purge <package-name>
  ```
  Completely removes an installed package and all its associated configuration files.

## 2. Package Information and Queries

- **List All Installed Packages:**
  ```bash
  dpkg -l
  ```
  Lists all packages installed on the system.

- **Show Information About a Specific Package:**
  ```bash
  dpkg -s <package-name>
  ```
  Displays detailed information about an installed package.

- **List Files Belonging to an Installed Package:**
  ```bash
  dpkg -L <package-name>
  ```
  Lists all files that belong to an installed package.

## 3. Working with `.deb` Files

- **View Contents of a `.deb` Package:**
  ```bash
  dpkg-deb --contents /path/to/package.deb
  ```
  Displays the contents of a `.deb` file without installing it.

- **Extract a `.deb` Package:**
  ```bash
  dpkg-deb -x /path/to/package.deb /target-directory
  ```
  Extracts the contents of a `.deb` package to a target directory.

- **Create a `.deb` Package:**
  ```bash
  dpkg-deb --build /path/to/directory/
  ```
  Creates a `.deb` package from a directory.

## 4. Advanced Package Management

- **Force-Remove a Broken Package:**
  ```bash
  sudo dpkg --remove --force-remove-reinstreq <package-name>
  ```
  Forcefully removes a broken or partially installed package.

- **Clean Up Configuration Files:**
  ```bash
  dpkg -l | grep '^rc' | awk '{print $2}' | xargs sudo dpkg --purge
  ```
  Removes all remaining configuration files from previously removed packages.

- **Reconfigure Package Information:**
  ```bash
  sudo dpkg-reconfigure <package-name>
  ```
  Re-runs the configuration for an installed package.
