# PowerShell Cheat Sheet



## 1. Basic Commands

- **Start PowerShell:**
  ```bash
  powershell
  ```
  Starts a PowerShell session.

- **List Directory Contents:**
  ```bash
  Get-ChildItem
  ```
  Lists files and directories in the current directory (Alias: `ls` or `dir`).

- **Change Directory:**
  ```bash
  Set-Location <path>
  ```
  Changes to the specified directory (Alias: `cd`).

- **Display File Content:**
  ```bash
  Get-Content <file>
  ```
  Displays the contents of a file (Alias: `cat`, `type`).

## 2. Management and Editing

- **Copy File:**
  ```bash
  Copy-Item <source> <destination>
  ```
  Copies a file or directory.

- **Move File:**
  ```bash
  Move-Item <source> <destination>
  ```
  Moves a file or directory.

- **Delete File:**
  ```bash
  Remove-Item <path>
  ```
  Deletes a file or directory.

## 3. System Information and Monitoring

- **Retrieve System Information:**
  ```bash
  Get-ComputerInfo
  ```
  Displays information about the system.

- **Show Processes:**
  ```bash
  Get-Process
  ```
  Lists all running processes.

- **Display Network Adapter Information:**
  ```bash
  Get-NetAdapter
  ```
  Shows information about network adapters.

## 4. Scripting and Automation

- **Run a Script:**
  ```bash
  .\scriptname.ps1
  ```
  Executes a PowerShell script.

- **View Script Execution Policy:**
  ```bash
  Get-ExecutionPolicy
  ```
  Displays the current policy for script execution.

- **Change Script Execution Policy:**
  ```bash
  Set-ExecutionPolicy <policy>
  ```
  Changes the execution policy (e.g., `RemoteSigned` or `Unrestricted`).

## 5. Useful Shortcuts

- **Display Help for a Command:**
  ```bash
  Get-Help <command>
  ```
  Shows the help page for the specified command.

- **Show Aliases for Commands:**
  ```bash
  Get-Alias
  ```
  Lists all aliases for PowerShell commands.

- **View Command History:**
  ```bash
  Get-History
  ```
  Displays the history of recently executed commands.
