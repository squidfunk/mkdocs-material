# Enabling HTTPS on Tailscale for Windows 11

## Introduction

This guide provides a step-by-step process to enable HTTPS on a Windows 11 machine using Tailscale. By following these instructions, you will secure your machine with a TLS certificate, ensuring encrypted communications within your Tailscale network.

## Prerequisites

- **Tailscale Account**: Ensure you have an active Tailscale account.
- **Tailscale Installed**: Tailscale should be installed on your Windows 11 machine. If not, download and install it from the [Tailscale website](https://tailscale.com/download).
- **Administrative Privileges**: You must have administrative rights on the Windows machine to execute certain commands.

## Steps to Enable HTTPS

1. **Enable MagicDNS in Tailscale**

   - Log in to the [Tailscale Admin Console](https://login.tailscale.com/admin).
   - Navigate to the **DNS** settings.
   - Enable **MagicDNS** if it's not already activated.

   _MagicDNS simplifies device communication within your tailnet by allowing the use of device names instead of IP addresses._

2. **Enable HTTPS Certificates**

   - In the same **DNS** settings page, locate the **HTTPS Certificates** section.
   - Click on **Enable HTTPS**.
   - Acknowledge the prompt about your machine names and tailnet name being published on a public ledger.

   _Enabling HTTPS allows Tailscale to provision TLS certificates for your devices, facilitating secure HTTPS connections._

3. **Obtain a TLS Certificate for Your Machine**

   - Open **Command Prompt** with administrative privileges:
     - Press `Win + X` and select **Command Prompt (Admin)** or **Windows PowerShell (Admin)**.
   - Execute the following command to generate a TLS certificate:

     ```bash
     tailscale cert pcgroot1.falcon-rohu.ts.net
     ```

     _Replace `pcgroot1.falcon-rohu.ts.net` with your machine's full domain name as listed in the Tailscale Admin Console._

   - The command will generate the certificate and key files, typically saved in the directory where the command was executed.

4. **Configure the Application to Use the TLS Certificate**

   - Depending on the application you intend to secure (e.g., a web server), configure it to use the obtained TLS certificate and key.
   - Refer to the application's documentation for instructions on setting up TLS/SSL certificates.

## Important Considerations

- **Certificate Transparency**: All TLS certificates are recorded in a public Certificate Transparency (CT) log, which includes the fully qualified domain name of your devices. Ensure that your machine names do not contain sensitive information.

- **Certificate Renewal**: TLS certificates issued by Let's Encrypt have a 90-day validity period. You are responsible for renewing these certificates before they expire.

- **Security**: Always handle your certificate and key files securely. Do not share them publicly or store them in unsecured locations.