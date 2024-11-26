# RDP Win setup 

To enable Remote Desktop Protocol (RDP) access on your Windows 11 Pro PC via PowerShell, follow these steps:

1. **Enable Remote Desktop:**
   ```powershell
   Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -Name "fDenyTSConnections" -Value 0
   ```
   This disables the setting that prevents Remote Desktop connections.

2. **Allow RDP through the Windows Firewall:**
   ```powershell
   Enable-NetFirewallRule -DisplayGroup "Remote Desktop"
   ```

3. **Check if Network Level Authentication (NLA) is enabled (optional but recommended for security):**
   ```powershell
   Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp' -Name "UserAuthentication" -Value 1
   ```

These commands should allow you to access your PC over the LAN using RDP. Make sure that the PC has a static IP or is easily identifiable within the LAN.