# Web App Installation and Windows Integration via Microsoft Edge

## **Overview**

> [!NOTE]
> This document provides a comprehensive, technical explanation of how a **Progressive Web App (PWA)** is installed and registered in **Windows** when using **Microsoft Edge**. It outlines the steps Edge takes after a user installs a web app, detailing the shortcut creation, file management, registry updates, and the interaction with the Windows operating system.


## **Step-by-Step Technical Breakdown**

### **1. Registering the Web App in Windows**

Once the installation process starts, **Microsoft Edge** performs several key actions to **register** the web app with the Windows system.

#### **1.1. Shortcut Creation**

- **Shortcut Files**: Edge creates shortcuts for the web app in standard Windows locations:
  - **Start Menu**: The app appears like any other installed application in the Windows **Start Menu**.
  - **Desktop**: If the user chooses this option, a desktop shortcut is created.
  - **Taskbar**: The app can also be pinned to the **taskbar** for easier access.

- **Shortcut Directory**: These shortcuts are stored in the following directory:
  - `C:\Users\<YourUserName>\AppData\Local\Microsoft\Edge\User Data\Default\Web Applications\`
  - The directory contains application-specific details, including:
    - The web app’s **icon**.
    - The **JSON file** with metadata like start URLs and app permissions.

- **Command Line Arguments**: 
  - The shortcuts are configured to point to a specific **Edge executable** (`msedge.exe`) with the argument `--app=<app URL>`. This argument ensures that the web app is opened in a **standalone window** without the normal browser interface (no address bar, tabs, or menu).
  - Example: 
    ```plaintext
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --app=https://example.com
    ```

#### **1.2. File and Folder Creation**

Once the app is installed, Edge creates specific directories and files for it:
- **Icons and Metadata**: 
  - The **icons** defined in the web app's manifest are stored locally for use in the Start Menu, Taskbar, and Desktop shortcuts.
  - A **JSON file** is generated that stores key information about the app, including the app’s `start_url`, any granted permissions (e.g., notifications), and display settings.
  
- **App Directory**: 
  - Located in the user’s AppData folder, the app directory includes all the files Edge needs to manage and launch the web app independently of the main browser session.
  - Example location: 
    ```plaintext
    C:\Users\<YourUserName>\AppData\Local\Microsoft\Edge\User Data\Default\Web Applications\<app_id>
    ```

#### **1.3. Windows Registry Entries**

**Microsoft Edge** registers the web app in the **Windows Registry**, ensuring it is treated as a fully integrated application by the OS.

- **Registry Path**: 
  - The app is registered under the `HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall` registry key. This ensures that the app appears in **Settings > Apps & Features**.
  - The key includes:
    - **App Name**: Displayed in Windows' app lists.
    - **Executable Path**: Points to Edge’s executable with the necessary flags to open the app.
    - **Icon Location**: Location of the app’s icon file used in the Start Menu and Taskbar.
    - **Uninstall Command**: Points to the method Edge uses to remove the app.
  
- **Example Registry Entry**:
  ```plaintext
  [HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall\<app_id>]
  "DisplayName"="<App Name>"
  "DisplayIcon"="C:\\Users\\<YourUserName>\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Web Applications\\<app_id>\\icons\\icon.png"
  "UninstallString"="C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe --uninstall --app-id=<app_id>"
  ```

#### **1.4. File Type & Protocol Associations (Optional)**

If the web app supports specific file types or protocols, Edge can create **associations** in Windows:

- **File Handlers**: If the web app declares file type handlers in its manifest (`"file_handlers"`), Edge registers the app to handle certain file types. For example:
  - A web app for a document editor might register as the default handler for `.docx` files.
  
- **Protocol Handlers**: If the web app supports custom URL schemes (`"protocol_handlers"`), Edge can register the app to handle certain protocols. For instance:
  - A web mail app can be set to handle `mailto:` links.

These associations are also managed via the Windows Registry and allow the web app to be recognized for these tasks by the operating system.



### **2. Web App Behavior in Windows**

Once the app is installed, it operates independently within the Windows ecosystem, though it still relies on the **Edge browser** in the background.

#### **2.1. Standalone Window Experience**
- The web app opens in a **standalone window**, free of normal browser controls like tabs, address bars, and menus.
- The app’s window behaves like a typical application window with its own **icon** and **taskbar presence**, making it distinct from Edge browser windows.

#### **2.2. Taskbar and Start Menu Integration**
- The app appears in the **Windows Taskbar** and **Start Menu**, behaving like any native Windows application.
- **Pinning**: Users can pin the web app to the Start Menu or Taskbar for quick access.

#### **2.3. Notification Integration**
- If the web app supports **push notifications**, it integrates with **Windows’ native notification system**:
  - Notifications from the app are delivered through **Windows Action Center**.
  - The app’s **Service Worker** ensures notifications can be received even when the app is closed, as long as Edge is running in the background.

#### **2.4. Offline Access**
- If the app has **offline capabilities** (enabled via **Service Workers**), it can store specific resources (pages, images, data) for offline use.
  - This allows the app to function even when there’s no internet connection, providing a more native-like experience.



### **3. Updating and Uninstalling the Web App**

#### **3.1. Automatic Updates**
- Web apps installed through Edge are automatically updated when their **web content** or **manifest** changes. Edge checks for updates periodically:
  - If a change is detected (e.g., a new version of the app or an updated manifest), the app is automatically updated without user intervention.
  
- **Service Worker Updates**: If the app uses a **Service Worker**, the update process is managed by the worker, ensuring the user always has the latest app version.

#### **3.2. Uninstallation Process**
- The web app can be uninstalled from:
  1. **Start Menu**: Right-click on the app and select **Uninstall**.
  2. **Settings > Apps & Features**: The app is listed in the Windows **Apps & Features** section, where it can be uninstalled like any other application.
  3. **Edge App Management**: In Edge, navigate to `edge://apps`, select the web app, and choose **Uninstall**.

- **What Happens During Uninstallation?**
  - All **shortcuts** (from the Start Menu, Desktop, and Taskbar) are removed.
  - The **registry entries** related to the app are deleted.
  - The **files** and **data** stored in the Edge User Data Directory are removed.



### **4. Differences from Native Applications**

Although web apps installed via Microsoft Edge behave like native apps in many respects, there are important differences:

#### **4.1. Resource Usage**
- Web apps generally consume **fewer system resources** (RAM, CPU) compared to native applications because they run in the browser context.
- They don’t require large installations since they rely on the browser to access resources from the web.

#### **4.2. Sandboxing**
- Web apps are **sandboxed** within the browser’s security model. This means they are isolated from critical system components unless granted specific permissions by the user (e.g., accessing files or hardware).

#### **4.3. Limited Access to System Resources**
- Web apps can’t access the file system, hardware, or other OS-level resources in the same way that native applications can. Permissions such as geolocation, notifications, and storage are managed through Edge’s permission model.

#### **4.4. Lightweight Installation**
- The size of the installed web app is relatively small since the bulk of the app’s resources are served over the web, and the **Service Worker** handles caching data locally.

> [!TIP]
**Conclusion**

Microsoft Edge’s installation process for web apps allows them to behave similarly to native Windows applications. This includes integration into the Start Menu, Taskbar, and system notifications, as well as handling files and protocols. However, unlike native apps, web apps remain sandboxed within the browser environment, offering a lightweight, secure alternative for users. 

This combination of **browser-based functionality** with **OS-level integration** makes Edge web apps a powerful tool for users who want the flexibility of web technologies with the convenience of native-like access and control. 
>

---
## Backup: Installed Web Apps

### **Step 1: Backup Installed Web Apps**

1. **Backup Edge User Data Directory**:
   - All web apps are stored in the **User Data** directory of Edge. The path is usually:
     ```plaintext
     C:\Users\<YourUserName>\AppData\Local\Microsoft\Edge\User Data\Default\Web Applications\
     ```
   - You will need to back up the **`Web Applications`** folder and the **`Shortcuts`** from the desktop and taskbar (if applicable).

2. **Copy the Registry Entries** (Optional):
   - The web apps are also registered in the **Windows Registry**. To restore these exact associations, you may also back up the registry entries for each app.
   - Export the registry keys from this location:
     ```plaintext
     HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall
     ```
   - Look for keys that correspond to the web apps you have installed (they usually contain the app name or ID). Right-click on the keys and select **Export**.

3. **Backup Custom File/Protocol Handlers** (if applicable):
   - If your web apps handle specific file types or protocols, you should also back up any registry entries related to those handlers.



### **Step 2: Import Web Apps to the New PC**

1. **Copy the Files to the New PC**:
   - On the new PC, install **Microsoft Edge** if it’s not already installed.
   - Copy the backed-up **`Web Applications`** folder to the equivalent path on the new PC:
     ```plaintext
     C:\Users\<YourUserName>\AppData\Local\Microsoft\Edge\User Data\Default\Web Applications\
     ```
   - If you saved any **Desktop or Taskbar shortcuts**, recreate them by copying them back to the appropriate places on the new machine.

2. **Import Registry Entries** (if applicable):
   - If you exported the registry entries, double-click the **.reg** files on the new PC to import the registry entries for the web apps.
   - This ensures that the web apps will appear in **Settings > Apps & Features** and behave like they did on your previous machine.

3. **Verify Web App Functionality**:
   - Launch Microsoft Edge and go to `edge://apps/` to verify that the web apps have been restored and are listed correctly.
   - Test launching the web apps to ensure they open in standalone windows and function as expected.


### **Alternative Approach: Microsoft Account Sync**

If you're signed in to **Microsoft Edge** with a **Microsoft account**, certain aspects of your browsing experience (including installed apps) may sync across devices. However, full app installation data is **not** always included in the sync process. For that reason, manual backup and restoration as described above may still be necessary for full fidelity when moving to a new PC.

---
# PowerShell: Backup and Restore


### Backup Web Apps

### **PowerShell Script : Backup Web Apps**

This script will:
- Backup the **Web Applications** folder from the user data directory.
- Export the relevant **Registry entries** for the installed Web Apps.

```powershell
# PowerShell Script to Backup Microsoft Edge Web Apps

# Define paths for backup
$EdgeWebAppsPath = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Web Applications"
$BackupPath = "C:\EdgeWebAppsBackup"  # Adjust this path to where you want to store the backup
$RegistryBackupPath = "$BackupPath\RegistryBackup.reg"

# Create backup directory if it doesn't exist
if (-not (Test-Path -Path $BackupPath)) {
    New-Item -Path $BackupPath -ItemType Directory
}

# Copy Web Applications directory
Write-Host "Backing up Web Applications..."
Copy-Item -Path $EdgeWebAppsPath -Destination $BackupPath\WebApplications -Recurse -Force

# Export Registry Keys for the installed Web Apps
Write-Host "Exporting registry keys for installed Web Apps..."
reg export "HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall" $RegistryBackupPath /y

Write-Host "Backup completed. Files saved to $BackupPath"
```
### Restore Web Apps

### **PowerShell Script 2: Restore Web Apps**

This script will:
- Restore the **Web Applications** folder to the appropriate user data directory on the new PC.
- Import the **Registry entries** to re-register the Web Apps in Windows.

```powershell
# PowerShell Script to Restore Microsoft Edge Web Apps

# Define paths for restore
$RestorePath = "C:\EdgeWebAppsBackup"  # Path where backup is located
$EdgeWebAppsPath = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Web Applications"
$RegistryBackupPath = "$RestorePath\RegistryBackup.reg"

# Check if the backup path exists
if (-not (Test-Path -Path $RestorePath)) {
    Write-Host "Backup folder does not exist at $RestorePath. Exiting script."
    exit
}

# Restore Web Applications directory
Write-Host "Restoring Web Applications..."
Copy-Item -Path "$RestorePath\WebApplications" -Destination $EdgeWebAppsPath -Recurse -Force

# Import Registry Keys for Web Apps
Write-Host "Importing registry keys for installed Web Apps..."
reg import $RegistryBackupPath

Write-Host "Restore completed. Web Apps should be re-registered in Edge."
```

### **Instructions to Run the Scripts**

1. **Save the scripts**:
   - Save the **backup** script as `BackupEdgeWebApps.ps1`.
   - Save the **restore** script as `RestoreEdgeWebApps.ps1`.

2. **Run the Backup Script**:
   - Open PowerShell as **Administrator**.
   - Run the backup script to back up your web apps:
     ```powershell
     .\BackupEdgeWebApps.ps1
     ```

3. **Transfer the Backup to the New PC**:
   - Copy the `C:\EdgeWebAppsBackup` folder (or wherever you saved your backup) to the new PC.

4. **Run the Restore Script on the New PC**:
   - On the new PC, place the backup folder in the same location (or update the script with the new path).
   - Open PowerShell as **Administrator**.
   - Run the restore script:
     ```powershell
     .\RestoreEdgeWebApps.ps1
     ```

### **Important Notes**:
- **Registry Permissions**: Ensure you are running PowerShell as an **Administrator** to allow changes to the registry.
- **Backup Location**: Update `$BackupPath` and `$RestorePath` in the scripts to a location that works for your setup.
- **Cross-User Installations**: These scripts are specific to the current user (`HKCU`). If you need to back up for another user, adjust the registry paths accordingly.

These scripts automate the process of backing up and restoring your Microsoft Edge Web Apps, including both the app data and the necessary registry entries.