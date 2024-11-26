# Tailscale Self-Check Cheat Sheet for Vendors



## 1. Steps to Perform Before Contacting Support

- **Check Network Connection:**
  - Ensure the device is connected to a stable network.
  - Verify that other network services are functioning correctly.

- **Check Tailscale Status:**
  - Run the following command to check the Tailscale status:
  ```bash
  tailscale status
  ```
  - Ensure the device shows as "Connected."

- **Test Connectivity Issues Between Peers:**
  - Use the command to check reachability:
  ```bash
  tailscale ping <peer-ip>
  ```
  - Test connectivity to multiple peers to determine if the issue is specific to one peer.

## 2. Basic Troubleshooting Steps

- **Restart Tailscale:**
  - Try restarting the Tailscale service:
  ```bash
  sudo systemctl restart tailscaled
  ```

- **Update to the Latest Version:**
  - Ensure you are using the latest version of Tailscale:
  ```bash
  sudo tailscale update
  ```

- **Generate Bug Report:**
  - Create a bug report to send to the support team:
  ```bash
  tailscale bugreport
  ```

## 3. Check Network Configuration

- **Verify Subnet Routing and DNS Configuration:**
  - Ensure that subnet routing and DNS settings are correctly configured:
  ```bash
  tailscale up --advertise-routes=<subnet> --accept-dns
  ```

- **Firewall and Security Policies:**
  - Ensure all Tailscale-related ports (e.g., UDP 41641) and protocols are allowed by your firewall.

## 4. Self-Check of Device Configuration

- **Confirm Device Authorization:**
  - Verify that the device is authorized in the Tailscale admin dashboard.

- **Check Exit Node Settings:**
  - Ensure exit node settings are correctly configured if in use:
  ```bash
  tailscale up --advertise-exit-node
  ```

## 5. Information to Provide to Support

- **Prepare the Following Information:**
  - Bug reports (`tailscale bugreport`).
  - Detailed description of the issue and affected peers.
  - Information about the Tailscale version and system environment being used.
