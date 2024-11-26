# VSCode Change PowerShell Execution Policy

### 1. **Change PowerShell Execution Policy in VSCode**
You can change the execution policy for PowerShell specifically in the VSCode terminal by running this command directly in the VSCode terminal:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope Process
```

- **Process**: This change will only apply to the current terminal session in VSCode and will not affect your system-wide or user-wide settings.

### 2. **Change Default Shell in VSCode (if desired)**
If you're working in PowerShell but would prefer using another shell (like Command Prompt), you can switch the default shell in VSCode:
- Open the command palette (`Ctrl+Shift+P`).
- Search for **Terminal: Select Default Profile**.
- Choose **Command Prompt**, **Git Bash**, or **PowerShell** depending on what you prefer.

Then, open a new terminal with the new shell.

### 3. **Update PowerShell Execution Policy Permanently**
If you want to change the execution policy permanently while working in VSCode, you can modify it as described earlier:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This will persist outside of the current terminal session and will affect any other PowerShell session launched from VSCode.

### 4. **Running PowerShell with Bypass**
If you don’t want to change the execution policy permanently but need to execute a script, you can bypass the policy for that script by running:

```powershell
powershell -ExecutionPolicy Bypass -File beatbear.ps1"
```

This command allows you to run the script with the **Bypass** execution policy without changing the system settings.

### 5. **Restart VSCode**
After changing the execution policy, it's sometimes necessary to restart Visual Studio Code for the 