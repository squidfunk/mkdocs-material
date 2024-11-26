# Tailscale Engineering-Level Cheat Sheet for Windows



## 1. Installation and Configuration

- **Download and Install Tailscale:**
  Download the Tailscale installer for Windows from the [official website](https://tailscale.com/download) and run the installation.

- **Activate Tailscale via Command Prompt:**
  Open Command Prompt with administrative privileges and run:
  ```bash
  tailscale up --authkey=<your_auth_key> --advertise-routes=<subnet>
  ```
  Activates Tailscale with an authentication key and configures subnet routing.

## 2. Advanced Features

- **Set Up Tailscale as a Windows Service:**
  Tailscale runs as a service on Windows by default. Use the command:
  ```bash
  net start tailscale
  ```
  To start the Tailscale service.

- **Configure Subnet Routing and Exit Node:**
  Use Tailscale as an exit node or for subnet routing:
  ```bash
  tailscale up --advertise-exit-node --advertise-routes=<subnet>
  ```

- **Integration with PowerShell Scripts:**
  Create PowerShell scripts to execute Tailscale commands, such as:
  ```powershell
  Start-Process "tailscale.exe" -ArgumentList "up --authkey=<your_auth_key>"
  ```

## 3. Diagnostics and Troubleshooting

- **Tailscale Diagnostic Commands:**
  Run diagnostic commands via Command Prompt:
  ```bash
  tailscale status
  tailscale ping <peer-ip>
  ```

- **Generate Bug Report:**
  Create a bug report for troubleshooting:
  ```bash
  tailscale bugreport
  ```

- **Check Firewall Configuration:**
  Ensure Windows Firewall allows Tailscale traffic. Use:
  ```bash
  netsh advfirewall firewall add rule name="Tailscale" dir=in action=allow program="C:\Program Files\Tailscale\tailscale.exe" enable=yes
  ```

## 4. Integration with Active Directory

- **User and Device Management:**
  Use Tailscale in conjunction with Active Directory to authenticate users and devices.

- **Automated Group Policies:**
  Use Group Policies to automate Tailscale installation and configuration in a domain environment.
