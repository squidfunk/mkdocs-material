# Debian 12 System Management Cheat Sheet



## 1. Package Management with `dpkg`

- **List All Installed Packages:**
  ```bash
  dpkg -l | grep ^ii
  ```
  Lists all installed packages on the system.

- **Check if a Package is Installed:**
  ```bash
  dpkg -l | grep <package-name>
  ```
  Replace `<package-name>` with the name of the package you want to check.

- **Install a `.deb` Package:**
  ```bash
  sudo dpkg -i /path/to/package.deb
  ```
  Installs a `.deb` package from a file.

- **Remove a Package (Keep Config Files):**
  ```bash
  sudo dpkg --remove <package-name>
  ```
  Removes the package while keeping its configuration files.

- **Purge a Package (Remove Config Files):**
  ```bash
  sudo dpkg --purge <package-name>
  ```
  Removes the package and its configuration files.

- **Fix Broken Dependencies:**
  ```bash
  sudo apt --fix-broken install
  ```
  Repairs broken dependencies caused by incomplete installations.

## 2. Package Management with `apt`

- **Update Package List:**
  ```bash
  sudo apt update
  ```
  Updates the list of available packages from repositories.

- **Upgrade All Installed Packages:**
  ```bash
  sudo apt upgrade
  ```
  Upgrades all installed packages to the latest version.

- **Full Upgrade (Including Dependencies):**
  ```bash
  sudo apt full-upgrade
  ```
  Upgrades packages, including dependencies, to new versions.

- **Search for a Package:**
  ```bash
  apt search <package-name>
  ```
  Searches for a package in the repositories.

- **Remove Unused Packages:**
  ```bash
  sudo apt autoremove
  ```
  Removes packages that were automatically installed to satisfy dependencies and are no longer needed.

## 3. Advanced Package Management

- **Find and Remove Manually Installed Packages:**
  ```bash
  comm -23 <(apt-mark showmanual | sort) <(apt-cache pkgnames | sort)
  ```
  Lists packages that were manually installed and can potentially be removed.

- **Force Remove a Problematic Package:**
  ```bash
  sudo dpkg --purge --force-all <package-name>
  ```
  Forcibly removes a package and all of its files.

- **Clean Up the Package Cache:**
  ```bash
  sudo apt clean
  ```
  Clears out the local repository of retrieved package files.

## 4. System Cleanup and Maintenance

- **Clean Up Residual Config Files:**
  ```bash
  dpkg -l | grep '^rc' | awk '{print $2}' | xargs sudo dpkg --purge
  ```
  Removes residual configuration files from previously removed packages.

- **View Disk Usage:**
  ```bash
  df -h
  ```
  Shows disk usage of all file systems in a human-readable format.

- **Find and Remove Large Files:**
  ```bash
  sudo find / -type f -size +100M
  ```
  Finds all files larger than 100MB to identify and potentially remove large files.

## 5. System Information and Monitoring

- **Check System Information:**
  ```bash
  lsb_release -a
  ```
  Displays detailed information about the Debian version.

- **Monitor System Resources:**
  ```bash
  top
  ```
  Real-time system monitor showing CPU and memory usage of processes.

- **Show Detailed System Status:**
  ```bash
  htop
  ```
  An improved, interactive version of `top` (requires installation: `sudo apt install htop`).

- **View Disk Usage by Directory:**
  ```bash
  du -sh /*
  ```
  Shows disk usage for each directory at the root level.

## 6. Managing Services and Systemd

- **List All Running Services:**
  ```bash
  systemctl list-units --type=service
  ```
  Lists all active services managed by `systemd`.

- **Start/Stop/Restart a Service:**
  ```bash
  sudo systemctl start|stop|restart <service-name>
  ```
  Start, stop, or restart a service (replace `<service-name>` with the actual service name).

- **Enable/Disable a Service at Boot:**
  ```bash
  sudo systemctl enable|disable <service-name>
  ```
  Enables or disables a service to start at boot.

## 7. User Management

- **Add a New User:**
  ```bash
  sudo adduser <username>
  ```
  Adds a new user to the system.

- **Delete a User:**
  ```bash
  sudo deluser <username>
  ```
  Deletes a user while keeping their home directory.

- **Delete a User and Their Home Directory:**
  ```bash
  sudo deluser --remove-home <username>
  ```
  Deletes a user and their home directory.

## 8. File and Directory Management

- **Change Ownership of a File/Directory:**
  ```bash
  sudo chown <user>:<group> /path/to/file_or_directory
  ```
  Changes the ownership of a file or directory.

- **Change Permissions of a File/Directory:**
  ```bash
  sudo chmod 755 /path/to/file_or_directory
  ```
  Changes the permissions of a file or directory.

## 9. Network Management

- **Show Network Configuration:**
  ```bash
  ip a
  ```
  Displays all network interfaces and their configuration.

- **Restart Networking Service:**
  ```bash
  sudo systemctl restart networking
  ```
  Restarts the networking service.

- **Test Network Connectivity:**
  ```bash
  ping -c 4 google.com
  ```
  Sends 4 packets to `google.com` to check network connectivity.

## 10. Security and System Updates

- **Update and Upgrade System Securely:**
  ```bash
  sudo apt update && sudo apt upgrade
  ```
  Ensures all packages are up-to-date and securely patched.

- **Check for Available Security Updates:**
  ```bash
  apt list --upgradable | grep -i security
  ```
  Lists only the security updates that are available.

## Helpful Tools to Consider Installing

- **GDebi**: A lightweight tool to install `.deb` files and automatically resolve dependencies.
  ```bash
  sudo apt install gdebi
  ```

- **Aptitude**: A more advanced, user-friendly terminal-based package manager.
  ```bash
  sudo apt install aptitude
  ```

- **HTop**: An interactive process viewer and system monitor.
  ```bash
  sudo apt install htop
  ```

- **Stacer**: A graphical system optimizer and monitor.
  ```bash
  sudo apt install stacer
  ```
