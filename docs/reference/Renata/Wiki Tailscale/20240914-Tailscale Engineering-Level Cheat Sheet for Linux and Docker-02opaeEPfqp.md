# Tailscale Engineering-Level Cheat Sheet for Linux and Docker



## 1. Installation and Configuration on Linux

- **Install Tailscale:**
  Use your Linux distribution's package manager (e.g., `apt`, `yum`, `dnf`) to install Tailscale:
  ```bash
  curl -fsSL https://tailscale.com/install.sh | sh
  ```

- **Activate Tailscale via Command Line:**
  Run the following command to start Tailscale and connect the device:
  ```bash
  sudo tailscale up --authkey=<your_auth_key> --advertise-routes=<subnet>
  ```

- **Enable Tailscale as a Service:**
  Enable Tailscale as a service to start it automatically on boot:
  ```bash
  sudo systemctl enable tailscaled
  sudo systemctl start tailscaled
  ```

## 2. Using Tailscale with Docker

- **Connect Docker Containers via Tailscale:**
  Start the Docker container with the `host` network configuration to enable Tailscale access:
  ```bash
  docker run --network host <container_name>
  ```

- **Install Tailscale Inside a Docker Container:**
  Create a Docker image with Tailscale installation:
  ```Dockerfile
  FROM ubuntu:latest
  RUN apt-get update && apt-get install -y tailscale
  ENTRYPOINT ["/usr/sbin/tailscaled"]
  CMD ["tailscale up --authkey=<your_auth_key>"]
  ```

## 3. Advanced Networking and Security Features

- **Set Up Subnet Routing:**
  Enable subnet routing to allow access to devices outside the local network:
  ```bash
  sudo tailscale up --advertise-routes=<subnet1>,<subnet2>
  ```

- **Adjust Firewall Configuration:**
  Ensure the firewall allows Tailscale traffic. Use `iptables` or `firewalld` to set rules.

## 4. Diagnostics and Troubleshooting

- **Test Tailscale Connection:**
  Use `tailscale ping` to test connectivity to a peer:
  ```bash
  tailscale ping <peer-ip>
  ```

- **Check Network Connectivity Issues:**
  Use `tailscale netcheck` to check the quality of the connection:
  ```bash
  tailscale netcheck
  ```

- **Generate Bug Reports:**
  Create a bug report for troubleshooting:
  ```bash
  tailscale bugreport
  ```

## 5. Kubernetes and Cloud Integrations

- **Integrate Tailscale with Kubernetes:**
  Use the Tailscale DaemonSet to establish secure connections between pods and external services:
  ```bash
  kubectl apply -f https://raw.githubusercontent.com/tailscale/tailscale-k8s/main/deploy.yaml
  ```

- **Integration with AWS VPCs:**
  Use Tailscale to securely connect VPCs and enable subnet routing between different AWS regions.
