# Debian OS Cheat Sheet



## 1. Basic System Commands

- **Update System:**
  ```bash
  sudo apt update && sudo apt upgrade
  ```
  Updates the list of available packages and installs the latest versions of installed packages.

- **Reboot System:**
  ```bash
  sudo reboot
  ```
  Reboots the system.

- **Shutdown System:**
  ```bash
  sudo shutdown -h now
  ```
  Shuts down the system immediately.

- **Check Debian Version:**
  ```bash
  lsb_release -a
  ```
  Displays the installed Debian version and details.

## 2. Package Management

- **Install a Package:**
  ```bash
  sudo apt install <package-name>
  ```
  Installs the specified package.

- **Remove a Package:**
  ```bash
  sudo apt remove <package-name>
  ```
  Removes the specified package but keeps the configuration files.

- **Remove All Unused Packages:**
  ```bash
  sudo apt autoremove
  ```
  Removes all automatically installed packages that are no longer needed.

## 3. System Monitoring and Information

- **Display System Information:**
  ```bash
  uname -a
  ```
  Shows basic system information like kernel version and architecture.

- **Monitor Memory Usage:**
  ```bash
  free -h
  ```
  Displays memory usage in a human-readable format.

- **Show Disk Usage:**
  ```bash
  df -h
  ```
  Shows disk usage for all file systems.

## 4. User and Permissions Management

- **Add a New User:**
  ```bash
  sudo adduser <username>
  ```
  Creates a new user on the system.

- **Add User to sudo Group:**
  ```bash
  sudo usermod -aG sudo <username>
  ```
  Adds the user to the "sudo" group.

- **List Files and Directories (with Permissions):**
  ```bash
  ls -l
  ```
  Lists files and directories with detailed information and permissions.

## 5. Network Management

- **Show Network Configuration:**
  ```bash
  ip a
  ```
  Displays the configuration of all network interfaces.

- **Ping Command for Network Testing:**
  ```bash
  ping -c 4 google.com
  ```
  Sends 4 packets to google.com to check network connectivity.

- **Check Firewall Status:**
  ```bash
  sudo ufw status
  ```
  Displays the status of UFW (Uncomplicated Firewall).
