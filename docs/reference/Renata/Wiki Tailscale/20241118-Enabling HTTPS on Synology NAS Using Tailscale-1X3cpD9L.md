# Enabling HTTPS on Synology NAS Using Tailscale

Enabling HTTPS on Synology NAS Using Tailscale
This guide provides step-by-step instructions to secure your Synology NAS with HTTPS using Tailscale.

Prerequisites
Synology NAS: Ensure your NAS is running DSM 7.0 or later.
Tailscale Account: Sign up if you haven't already.
Administrative Access: You need admin rights on both Synology DSM and Tailscale.

1. Install Tailscale on Synology NAS
   Access Package Center:

Log in to your Synology NAS.
Open the Package Center.
Install Tailscale:

Search for "Tailscale".
Click Install.
Note: If Tailscale isn't available in the Package Center, refer to Tailscale's official documentation for manual installation.

2. Enable MagicDNS and HTTPS in Tailscale
   Log in to Tailscale Admin Console:

Visit the Tailscale Admin Console.
Enable MagicDNS:

Navigate to the DNS settings.
Toggle on MagicDNS.
Enable HTTPS Certificates:

In the DNS settings, locate the HTTPS Certificates section.
Click Enable HTTPS.
Acknowledge the prompt about publishing machine names and your tailnet name on a public ledger.
Enabling HTTPS allows Tailscale to provision TLS certificates for your devices, facilitating secure HTTPS connections.
SIM642

3. Obtain a TLS Certificate for Synology NAS
   Access Synology DSM:

Log in to your Synology NAS.
Open Task Scheduler:

Go to Control Panel > Task Scheduler.
Create a Scheduled Task:

Click Create > Scheduled Task > User-defined script.
Configure the Task:

General:
Task: Enter a name, e.g., "Tailscale Certificate".
User: Select root.
Schedule:
Set to run monthly, e.g., on the first Monday.
Task Settings:
In the User-defined script section, enter:
bash
Copy code
tailscale configure synology-cert
Save and Run the Task:

Click OK to save.
Right-click the task and select Run to execute it immediately.
This command configures your Synology NAS to use the TLS certificate provided by Tailscale.
SIM642

4. Configure Synology Services to Use the Tailscale Certificate
   Access Certificate Settings:

Go to Control Panel > Security > Certificate.
Set the Default Certificate:

Locate the certificate for your Tailscale domain (e.g., your-nas-name.ts.net).
Right-click and select Edit.
Check Set as default certificate.
Click OK.
Assign Certificate to Services:

Click Configure in the Certificate section.
Assign the Tailscale certificate to the desired services (e.g., DSM, File Station).
Click OK to apply.
Assigning the certificate ensures that your Synology services use HTTPS for secure connections.

5. Access Your Synology NAS Securely
   Use the Tailscale-assigned domain to access your NAS securely:
   arduino
   Copy code
   https://your-nas-name.ts.net
   Replace your-nas-name with your actual NAS name as configured in Tailscale.
   Important Considerations
   Certificate Renewal: Let's Encrypt certificates are valid for 90 days. The scheduled task created in Step 3 ensures automatic renewal.

Public Ledger Disclosure: Enabling HTTPS will publish your machine names and tailnet name in the Certificate Transparency public ledger. Ensure that your machine names do not contain sensitive information.

By following these steps, you can secure your Synology NAS with HTTPS using Tailscale, ensuring encrypted and authenticated access within your network.

Sources

You said:
id like you to use my stuff not exmaples
ChatGPT said:
ChatGPT
Enabling HTTPS on Synology NAS moonraker02 Using Tailscale
This guide provides step-by-step instructions to secure your Synology NAS moonraker02 with HTTPS using Tailscale.

Prerequisites
Synology NAS: Ensure moonraker02 is running DSM 7.0 or later.
Tailscale Account: Sign up if you haven't already.
Administrative Access: You need admin rights on both Synology DSM and Tailscale.

1. Install Tailscale on Synology NAS
   Access Package Center:

Log in to your Synology NAS moonraker02.
Open the Package Center.
Install Tailscale:

Search for "Tailscale".
Click Install.
Note: If Tailscale isn't available in the Package Center, refer to Tailscale's official documentation for manual installation.

2. Enable MagicDNS and HTTPS in Tailscale
   Log in to Tailscale Admin Console:

Visit the Tailscale Admin Console.
Enable MagicDNS:

Navigate to the DNS settings.
Toggle on MagicDNS.
Enable HTTPS Certificates:

In the DNS settings, locate the HTTPS Certificates section.
Click Enable HTTPS.
Acknowledge the prompt about publishing machine names and your tailnet name on a public ledger.
Enabling HTTPS allows Tailscale to provision TLS certificates for your devices, facilitating secure HTTPS connections.
TAILSCALE

3. Obtain a TLS Certificate for Synology NAS
   Access Synology DSM:

Log in to your Synology NAS moonraker02.
Open Task Scheduler:

Go to Control Panel > Task Scheduler.
Create a Scheduled Task:

Click Create > Scheduled Task > User-defined script.
Configure the Task:

General:
Task: Enter a name, e.g., "Tailscale Certificate".
User: Select root.
Schedule:
Set to run monthly, e.g., on the first Monday.
Task Settings:
In the User-defined script section, enter:
bash
Copy code
tailscale configure synology-cert
Save and Run the Task:

Click OK to save.
Right-click the task and select Run to execute it immediately.
This command configures your Synology NAS to use the TLS certificate provided by Tailscale.
SIM642

4. Configure Synology Services to Use the Tailscale Certificate
   Access Certificate Settings:

Go to Control Panel > Security > Certificate.
Set the Default Certificate:

Locate the certificate for your Tailscale domain moonraker02.falcon-rohu.ts.net.
Right-click and select Edit.
Check Set as default certificate.
Click OK.
Assign Certificate to Services:

Click Configure in the Certificate section.
Assign the Tailscale certificate to the desired services (e.g., DSM, File Station).
Click OK to apply.
Assigning the certificate ensures that your Synology services use HTTPS for secure connections.

5. Access Your Synology NAS Securely
   Use the Tailscale-assigned domain to access your NAS securely:
   arduino
   Copy code
   https://moonraker02.falcon-rohu.ts.net
   Important Considerations
   Certificate Renewal: Let's Encrypt certificates are valid for 90 days. The scheduled task created in Step 3 ensures automatic renewal.
