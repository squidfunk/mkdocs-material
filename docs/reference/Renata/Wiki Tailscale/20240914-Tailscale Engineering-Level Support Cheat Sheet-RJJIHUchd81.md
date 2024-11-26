# Tailscale Engineering-Level Support Cheat Sheet



## 1. Common Issues and Solutions

- **Issue: Device Not Connecting to Tailscale Network**
  - **Solution:**
    - Check the network connection of the device.
    - Run `tailscale status` to check the current connection status.
    - Use `tailscale ping <peer-ip>` to test the reachability of other peers.
    - Verify that firewall settings allow Tailscale ports and protocols.

- **Issue: No Communication Between Peers**
  - **Solution:**
    - Ensure both devices are online and authorized in the Tailscale network.
    - Run `tailscale netcheck` on both devices to diagnose connectivity problems.
    - Check the ACLs (Access Control Lists) in the admin dashboard for any restrictions.

## 2. Diagnostic Tools and Commands

- **Check Tailscale Status:**
  ```bash
  tailscale status
  ```
  Displays the current connection status and connected peers.

- **Test Network Connectivity:**
  ```bash
  tailscale ping <peer-ip>
  ```
  Tests the reachability of a peer in the Tailscale network.

- **Check Connection Quality:**
  ```bash
  tailscale netcheck
  ```
  Checks the quality of the connection to the Tailscale network and identifies NAT types, firewalls, and other obstacles.

- **Generate Bug Report:**
  ```bash
  tailscale bugreport
  ```
  Generates a bug report for analysis and troubleshooting.

## 3. Security and Network Configuration

- **Configure Subnet Routing:**
  Verify subnet routing settings to ensure proper configuration:
  ```bash
  tailscale up --advertise-routes=<subnet>
  ```

- **Check Exit Node Settings:**
  Ensure devices are properly configured as exit nodes:
  ```bash
  tailscale up --advertise-exit-node
  ```

- **Diagnose DNS Issues:**
  Use Magic DNS and check DNS configuration to ensure correct name resolution:
  ```bash
  tailscale up --accept-dns
  ```

## 4. Device Management and Authentication

- **Check Device Authorization:**
  Verify in the admin dashboard if the device is authorized. Unauthorized devices need to be approved before connecting.

- **Remove Devices from Network:**
  Use the admin dashboard to remove unauthorized or no longer needed devices.

- **Enable Two-Factor Authentication (2FA):**
  Enable 2FA under **Settings > Security** for additional security.

## 5. Troubleshooting Tips

- **Regularly Review Logs:**
  Monitor Tailscale logs regularly to detect unexpected activities or connectivity problems:
  ```bash
  tailscale log
  ```

- **Adjust Network and Firewall Settings:**
  Ensure network settings and firewall allow the necessary ports and protocols for Tailscale.
