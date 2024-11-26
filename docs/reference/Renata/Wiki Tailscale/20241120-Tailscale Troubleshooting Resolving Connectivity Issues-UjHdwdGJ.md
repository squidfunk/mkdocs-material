# Tailscale Troubleshooting: Resolving Connectivity Issues


Troubleshoot and resolve issues with Tailscale, specifically when devices cannot be pinged and errors occur, such as:

rename C:\WINDOWS\system32\drivers\etc\hosts.tmp2096714330 C:\WINDOWS\system32\drivers\etc\hosts: Access is denied.

These errors indicate that Tailscale cannot modify the `hosts` file, which is necessary for MagicDNS functionality.

---

## Problem

Devices in the Tailscale network are not reachable, and `tailscale status` shows the devices, but pinging them fails. Additionally, Tailscale logs may show permission errors related to the `hosts` file.

---

## Solution

Follow these steps to resolve the issue:

### 1. Close Tailscale and then Restart windowns Tailscale Service
### 2. Check and Adjust `hosts` File Permissions

1. Locate the `hosts` file:

   C:\WINDOWS\system32\drivers\etc\hosts

2. Check permissions:
   - Right-click on the file, go to Properties, then select the Security tab.
   - Ensure your user account or the `Administrators` group has Full Control.

3. Modify permissions if needed:
   - Click "Edit," add your user or `Administrators`, and grant Full Control.
   - Save the changes.

---

### 2. Disable Antivirus/Endpoint Protection

Antivirus software may block modifications to system files such as `hosts`.

1. Temporarily disable antivirus.
2. Retry Tailscale connection.
3. Whitelist Tailscale in your antivirus settings.

---

### 3. Manually Edit the `hosts` File

1. Open a text editor as Administrator.
2. Navigate to the `hosts` file:

   C:\WINDOWS\system32\drivers\etc\hosts

3. Add Tailscale entries manually:

   100.95.227.43 nordgroot  
   100.88.136.73 dsk-asa01.falcon-polaris.ts.net  
   100.78.58.124 rendev01.falcon-polaris.ts.net  
   100.122.187.27 srv-asa01.falcon-polaris.ts.net

4. Save the file and restart Tailscale.

---

### 4. Restart the Tailscale Service

1. Open PowerShell as Administrator.
2. Restart the Tailscale service:

   net stop Tailscale  
   net start Tailscale

---

### 5. Test Connectivity

1. Use Tailscale ping:

   tailscale ping <hostname or IP>

2. Test direct pinging:

   ping 100.95.227.43

---

## Alternative Solution

If the issue persists:
1. Ensure MagicDNS is enabled in the Tailscale admin panel.
2. Collect and review logs for additional diagnostics:

   tailscale bugreport

3. Contact Tailscale support with the log details.

