# Flatpak Software Management Cheat Sheet



## 1. Basic Commands

- **Install Flatpak:**
  ```bash
  sudo apt install flatpak
  ```
  Installs Flatpak on the system.

- **Add Flatpak Repository:**
  ```bash
  flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
  ```
  Adds the Flathub repository, which provides most Flatpak applications.

- **Install a Flatpak Application:**
  ```bash
  flatpak install flathub <application-name>
  ```
  Installs the specified application from Flathub.

## 2. Managing and Updating Applications

- **List Installed Flatpak Applications:**
  ```bash
  flatpak list
  ```
  Lists all installed Flatpak applications.

- **Update Flatpak Applications:**
  ```bash
  flatpak update
  ```
  Updates all installed Flatpak applications to the latest version.

- **Uninstall a Flatpak Application:**
  ```bash
  flatpak uninstall <application-name>
  ```
  Uninstalls the specified Flatpak application.

## 3. Additional Useful Commands

- **Show Detailed Information for a Flatpak Application:**
  ```bash
  flatpak info <application-name>
  ```
  Displays detailed information about an installed Flatpak application.

- **Change Flatpak Application Permissions:**
  ```bash
  flatpak override <application-name> --<permission>
  ```
  Changes the permissions for a Flatpak application.

- **Search for Flatpak Applications:**
  ```bash
  flatpak search <search-term>
  ```
  Searches for applications in the Flathub repository.

## 4. Flatpak System Management

- **Remove Unused Flatpak Runtime Versions:**
  ```bash
  flatpak uninstall --unused
  ```
  Removes all unused Flatpak runtime versions.

- **Clean Up Flatpak System Resources:**
  ```bash
  flatpak remove --unused
  ```
  Removes unnecessary data and cleans up disk space.

- **Show All Configured Flatpak Remotes:**
  ```bash
  flatpak remotes
  ```
  Lists all configured Flatpak remotes.
