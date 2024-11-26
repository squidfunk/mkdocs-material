# Tailscale Cheat Sheet



## 1. Basic Commands

- **Install Tailscale:**
  Download and install Tailscale for your system (Linux, Windows). Follow the instructions on [tailscale.com](https://tailscale.com/download).

- **Start Tailscale:**
  ```bash
  sudo tailscale up
  ```
  Starts Tailscale and connects the device to your Tailscale network.

- **Show Tailscale Status:**
  ```bash
  tailscale status
  ```
  Displays the current status of Tailscale and the connected peers.

- **Disconnect Tailscale:**
  ```bash
  sudo tailscale down
  ```
  Disconnects the device from the Tailscale network.

## 2. Management and Configuration

- **Show Tailscale IP Address:**
  ```bash
  tailscale ip
  ```
  Shows the assigned Tailscale IP address of the device.

- **Authorize Device (Admin Required):**
  Log in to your Tailscale account and authorize new devices in the admin dashboard.

- **Log Out Device:**
  ```bash
  sudo tailscale logout
  ```
  Logs the device out of the Tailscale account.

## 3. Advanced Usage

- **Enable Subnet Routing:**
  To use subnets in your Tailscale network, configure subnet routing in the admin dashboard.

- **Enable Magic DNS:**
  Enable Magic DNS to use easy-to-remember names instead of IP addresses within your Tailscale network.

## 4. Useful Tips

- **Check for Tailscale Updates:**
  Keep Tailscale updated to get the latest security patches and features.

- **Troubleshooting:**
  Use `tailscale bugreport` and `tailscale netcheck` to generate diagnostic reports and check for connectivity issues.
