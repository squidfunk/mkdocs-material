# Docker Home Environment Setup and Tailscale  Script Ubuntu 24.04

# Docker Home Environment Setup Documentation

This documentation covers two scripts: the main Docker setup script and the Tailscale setup script.

## 1. Main Docker Setup Script

### Overview
This script sets up a home Docker environment with Portainer, Traefik, and Watchtower.

### Features
- Installs Docker and Docker Compose if not present
- Sets up Portainer for Docker management
- Configures Traefik as a reverse proxy
- Implements Watchtower for automatic container updates
- Generates a comprehensive markdown file with setup information

### Usage
1. Save the script as `docker_setup.sh`
2. Make it executable: `chmod +x docker_setup.sh`
3. Run the script with sudo: `sudo ./docker_setup.sh`

### What the Script Does
1. Checks for and installs Docker if necessary
2. Verifies Docker Compose installation
3. Pulls required Docker images (Portainer, Traefik, Watchtower)
4. Creates a custom Docker network
5. Removes any existing containers with conflicting names
6. Creates a Traefik configuration file
7. Runs Portainer, Traefik, and Watchtower containers
8. Generates a markdown file (`docker_services_info.md`) with service information

### After Running
- Portainer will be accessible at `https://<YOUR_IP>:9443`
- Traefik dashboard will be at `http://<YOUR_IP>:8080`
- Watchtower will run in the background, updating containers automatically

## 2. Tailscale Setup Script

### Overview
This script sets up Tailscale for secure remote access to your Docker services.

### Features
- Pulls and runs the Tailscale Docker container
- Provides the Tailscale authentication link directly in the terminal
- Checks Tailscale authentication status
- Updates the main documentation with Tailscale information

### Usage
1. Save the script as `tailscale_setup.sh`
2. Make it executable: `chmod +x tailscale_setup.sh`
3. Run the script with sudo after running the main setup script: `sudo ./tailscale_setup.sh`

### What the Script Does
1. Pulls the Tailscale Docker image
2. Removes any existing Tailscale container
3. Runs a new Tailscale container
4. Initializes Tailscale and provides an authentication URL
5. Waits for user to complete authentication
6. Checks Tailscale status and displays the Tailscale IP
7. Updates the `docker_services_info.md` file with Tailscale information

### After Running
- You'll see a Tailscale authentication URL in the terminal
- Visit this URL to authenticate Tailscale
- The script will display your Tailscale IP upon successful authentication
- Use the Tailscale IP to access your Docker services remotely

## Important Notes
1. Both scripts should be run with sudo privileges
2. Run the main Docker setup script before the Tailscale setup script
3. Ensure proper security measures if exposing services to the internet
4. Regularly backup your Docker volumes
5. The `docker_services_info.md` file contains detailed information about your setup

## Troubleshooting
- If Tailscale authentication fails, you can manually run:
  ```
  sudo docker exec tailscale tailscale up
  ```
- To check Tailscale status:
  ```
  sudo docker exec tailscale tailscale status
  ```
- For any issues, check Docker logs:
  ```
  sudo docker logs [container_name]
  ```

Remember to keep your system and Docker images updated for optimal security and performance.

---
## Main Docker Setup Script

```shell
#!/bin/bash

# Define variables
PORTAINER_PORT=9443
NETWORK_NAME="home_network"
PORTAINER_CONTAINER_NAME="portainer"
PORTAINER_IMAGE="portainer/portainer-ce:latest"
TRAEFIK_HTTP_PORT=80
TRAEFIK_HTTPS_PORT=443
TRAEFIK_DASHBOARD_PORT=8080
TRAEFIK_IMAGE="traefik:v2.10"
TRAEFIK_CONFIG_FILE="traefik.yml"
WATCHTOWER_IMAGE="containrrr/watchtower:latest"

# Function to check and report errors
check_error() {
    if [ $? -ne 0 ]; then
        echo "Error occurred: $1"
        exit 1
    fi
}

# Update and install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing Docker..."
    sudo apt update
    sudo apt install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo systemctl enable docker
    sudo systemctl start docker
    check_error "Failed to install Docker"
else
    echo "Docker is already installed."
fi

# Verify Docker Compose installation
if ! docker compose version &> /dev/null; then
    echo "Docker Compose plugin not found. Please ensure you have the latest version of Docker installed."
    exit 1
else
    echo "Docker Compose plugin is installed."
fi

# Pull the required Docker images
for IMAGE in $PORTAINER_IMAGE $TRAEFIK_IMAGE $WATCHTOWER_IMAGE; do
    echo "Pulling $IMAGE..."
    sudo docker pull $IMAGE
    check_error "Failed to pull $IMAGE"
done

# Create a custom Docker network if it doesn't exist
if ! sudo docker network ls | grep -q "$NETWORK_NAME"; then
    echo "Creating Docker network '$NETWORK_NAME'..."
    sudo docker network create $NETWORK_NAME
    check_error "Failed to create Docker network"
else
    echo "Docker network '$NETWORK_NAME' already exists."
fi

# Remove any existing containers
for CONTAINER in $PORTAINER_CONTAINER_NAME traefik watchtower; do
    if sudo docker ps -a --format '{{.Names}}' | grep -q "^$CONTAINER$"; then
        echo "Removing existing $CONTAINER container..."
        sudo docker rm -f $CONTAINER
        check_error "Failed to remove $CONTAINER container"
    fi
done

# Create Traefik configuration file
echo "Creating Traefik configuration file..."
cat <<EOF > $TRAEFIK_CONFIG_FILE
api:
  dashboard: true 
  insecure: true

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: $NETWORK_NAME

log:
  level: INFO

accessLog: {}
EOF
check_error "Failed to create Traefik configuration file"

# Run Portainer container
echo "Running Portainer container..."
sudo docker run -d \
    -p $PORTAINER_PORT:9443 \
    --name $PORTAINER_CONTAINER_NAME \
    --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    --network $NETWORK_NAME \
    --label "traefik.enable=true" \
    --label "traefik.http.routers.portainer.rule=Host(\`portainer.localhost\`)" \
    --label "traefik.http.routers.portainer.entrypoints=websecure" \
    --label "traefik.http.routers.portainer.tls=true" \
    --label "traefik.http.services.portainer.loadbalancer.server.port=9000" \
    $PORTAINER_IMAGE
check_error "Failed to start Portainer container"

# Run Traefik container
echo "Running Traefik container..."
sudo docker run -d \
    -p $TRAEFIK_HTTP_PORT:80 \
    -p $TRAEFIK_HTTPS_PORT:443 \
    -p $TRAEFIK_DASHBOARD_PORT:8080 \
    --name traefik \
    --restart always \
    -v $PWD/$TRAEFIK_CONFIG_FILE:/etc/traefik/traefik.yml \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --network $NETWORK_NAME \
    $TRAEFIK_IMAGE
check_error "Failed to start Traefik container"

# Run Watchtower container
echo "Running Watchtower container..."
sudo docker run -d \
    --name watchtower \
    --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --network $NETWORK_NAME \
    $WATCHTOWER_IMAGE
check_error "Failed to start Watchtower container"

# Generate Markdown file with service information
IP_ADDRESS=$(hostname -I | awk '{print $1}')
MARKDOWN_FILE="docker_services_info.md"

echo "Generating service information file: $MARKDOWN_FILE"

cat <<EOF > $MARKDOWN_FILE
# Home Docker Services Information

This document provides a quick reference for all the Docker services set up in your home environment.

## Network Information

- **Docker Network Name**: $NETWORK_NAME

## Portainer

Portainer provides a web interface for managing your Docker environment.

- **URL**: https://$IP_ADDRESS:$PORTAINER_PORT
- **Username**: Set during first login
- **Password**: Set during first login

## Traefik

Traefik is a modern HTTP reverse proxy and load balancer.

- **HTTP Port**: $TRAEFIK_HTTP_PORT
- **HTTPS Port**: $TRAEFIK_HTTPS_PORT
- **Dashboard URL**: http://$IP_ADDRESS:$TRAEFIK_DASHBOARD_PORT
- **Note**: The Traefik dashboard is currently set to insecure mode for ease of access in a home environment.

**Important**: If you plan to expose Traefik to the internet, make sure to secure the dashboard and change the configuration.

## Watchtower

Watchtower automatically updates your Docker containers to the latest available image.

- Watchtower is running in the background and will automatically update your containers.

## Important Notes

1. If you plan to expose these services to the internet, set up proper security measures
2. Regular backups of your Docker volumes are recommended
3. To set up Tailscale for remote access, run the separate Tailscale setup script
EOF

echo "Service information has been saved to $MARKDOWN_FILE"
echo "Setup completed successfully!"
echo "Portainer is running and can be accessed at https://$IP_ADDRESS:$PORTAINER_PORT"
echo "Traefik dashboard can be accessed at http://$IP_ADDRESS:$TRAEFIK_DASHBOARD_PORT"
echo "Watchtower is running and will automatically update your containers"
echo ""
echo "IMPORTANT NOTES:"
echo "1. If you plan to expose these services to the internet, set up proper security measures"
echo "2. Regular backups of your Docker volumes are recommended"
echo "3. To set up Tailscale for remote access, run the separate Tailscale setup script"
echo "4. Refer to the $MARKDOWN_FILE for detailed service information"
```
---
# 2 Tailscale Setup Script

### Installation Script for Tailscale on Ubuntu

**Filename**: `install_tailscale.sh`

```Shell
#!/bin/bash

# Function to check and report errors
check_error() {
    if [ $? -ne 0 ]; then
        echo "Error occurred: $1"
        exit 1
    fi
}

# Add Tailscale’s package signing key and repository
echo "Adding Tailscale's package signing key and repository..."
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/focal.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
check_error "Failed to add Tailscale's package signing key"

curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/focal.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list
check_error "Failed to add Tailscale's repository"

# Update package list and install Tailscale
echo "Updating package list..."
sudo apt-get update
check_error "Failed to update package list"

echo "Installing Tailscale..."
sudo apt-get install -y tailscale
check_error "Failed to install Tailscale"

echo "Tailscale installation completed successfully."
```

##### Instructions for Running the Installation Script

1. **Save the Installation Script to a File** (e.g., `install_tailscale.sh`):
   ```bash
   nano install_tailscale.sh
   ```

2. **Copy and paste the installation script into the file**.

3. **Make the installation script executable**:
   ```bash
   chmod +x install_tailscale.sh
   ```

4. **Run the installation script**:
   ```bash
   ./install_tailscale.sh
   ```

---

# 2.1 Script to Run Tailscale up Command and Authenticate

**Filename**: `authenticate_tailscale.sh`

```bash
#!/bin/bash

# Function to check and report errors
check_error() {
    if [ $? -ne 0 ]; then
        echo "Error occurred: $1"
        exit 1
    fi
}

# Start and authenticate Tailscale
echo "Starting and authenticating Tailscale..."
sudo tailscale up &

# Wait for the authentication URL to be available
sleep 5

# Extract the authentication URL
auth_url=$(sudo tailscale up 2>&1 | grep -oP 'https://login.tailscale.com/\S+')

if [ -n "$auth_url" ]; then
    echo "Opening browser for Tailscale authentication..."
    xdg-open "$auth_url" || open "$auth_url" || sensible-browser "$auth_url"
else
    echo "Failed to retrieve authentication URL. Please run 'sudo tailscale up' manually to authenticate."
fi

echo "To check Tailscale status, run the following command:"
echo "tailscale status"
```

##### Instructions for Running the Authentication Script

1. **Save the Authentication Script to a File** (e.g., `authenticate_tailscale.sh`):
   ```bash
   nano authenticate_tailscale.sh
   ```

2. **Copy and paste the authentication script into the file**.

3. **Make the authentication script executable**:
   ```bash
   chmod +x authenticate_tailscale.sh
   ```

4. **Run the authentication script**:
   ```bash
   ./authenticate_tailscale.sh
   ```
---
# SSH local 
info sysdev office

### ssh GrootDev1