# Tailscale Advanced Cheat Sheet



## 1. Advanced Commands and Management

- **Set Up Subnet Routing:**
  Enable subnet routing to reach devices outside your local network:
  ```bash
  sudo tailscale up --advertise-routes=<subnet1>,<subnet2>
  ```
  Allows access to specified subnets via the Tailscale network.

- **Enable Magic DNS:**
  Enable Magic DNS to use easy names instead of IP addresses:
  ```bash
  sudo tailscale up --advertise-routes --accept-dns
  ```
  Allows using DNS names within the Tailscale network.

- **Configure Tailscale as an Exit Node:**
  Allows routing all internet traffic through a Tailscale device:
  ```bash
  sudo tailscale up --advertise-exit-node
  ```
  The device acts as an exit node for all connected peers.

## 2. Security Features

- **Enable Two-Factor Authentication (2FA):**
  Go to your Tailscale account and enable 2FA under **Settings > Security** to protect your account.

- **Manage ACLs (Access Control Lists):**
  Define rules to control access between devices in the Tailscale network:
  - Edit `tailnet-policy.json` in the admin dashboard to create specific rules for devices or users.

## 3. Diagnostics and Troubleshooting

- **Diagnose Connection Issues:**
  Use `tailscale netcheck` to analyze network connectivity problems:
  ```bash
  tailscale netcheck
  ```

- **Generate Bug Reports:**
  Create a bug report for troubleshooting:
  ```bash
  tailscale bugreport
  ```

- **View Logs:**
  Check Tailscale logs for detailed information:
  ```bash
  tailscale log
  ```

## 4. Network Extensions and Integrations

- **Kubernetes Integration:**
  Integrate Tailscale into a Kubernetes cluster to establish secure connections between pods and external services. Install the Tailscale DaemonSet:
  ```bash
  kubectl apply -f https://raw.githubusercontent.com/tailscale/tailscale-k8s/main/deploy.yaml
  ```

- **Assign Device Alias:**
  Assign a memorable alias to a device:
  ```bash
  sudo tailscale set --hostname <alias-name>
  ```

## 5. Tips for Optimization

- **Optimize Performance:**
  Use direct connections whenever possible to minimize latency.
  
- **Regular Monitoring:**
  Regularly monitor your Tailscale network to detect unusual activities or connectivity issues.
