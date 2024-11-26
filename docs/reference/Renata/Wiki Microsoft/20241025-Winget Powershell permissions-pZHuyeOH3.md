# Winget Powershell permissions

### 1. **Change Execution Policy to RemoteSigned**
You can change the execution policy to **RemoteSigned**, which is a safer setting. It allows scripts to run, but only those that are created on your local machine or are digitally signed by a trusted publisher.

To change the policy for the current user:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- **CurrentUser**: This change will only apply to the current user and won’t affect system-wide settings.
  
After doing this, you can check if the policy was successfully changed by running:

```powershell
Get-ExecutionPolicy -Scope CurrentUser
```

### 2. **Temporary Bypass (One Session)**
If you don't want to permanently change the execution policy, you can bypass it for the current session:

```powershell
powershell -ExecutionPolicy Bypass
```

This will start a new PowerShell session with the **Bypass** execution policy for that session only. You can then run the `winget` command within this session.

### 3. **Revert the Execution Policy (Optional)**
If you want to revert to the **Restricted** policy after completing your task, you can do so with:

```powershell
Set-ExecutionPolicy Restricted -Scope CurrentUser
```

