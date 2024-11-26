# Update Script Docker

# fixed main script

```bash
#!/bin/bash

# Define variables
PORTAINER_PORT=9443
PORTAINER_HTTP_PORT=9000
NETWORK_NAME="home_network"
PORTAINER_CONTAINER_NAME="portainer"
PORTAINER_IMAGE="portainer/portainer-ce:latest"
TRAEFIK_HTTP_PORT=80
TRAEFIK_HTTPS_PORT=443
TRAEFIK_DASHBOARD_PORT=8080
TRAEFIK_IMAGE="traefik:v2.10"
TRAEFIK_CONFIG_FILE="traefik.yml"
HOST_STORAGE_BASE="/path/to/host/storage"  # Change this to your preferred host storage path

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
for IMAGE in $PORTAINER_IMAGE $TRAEFIK_IMAGE; do
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
for CONTAINER in $PORTAINER_CONTAINER_NAME traefik; do
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

# Create host storage directories
PORTAINER_STORAGE="$HOST_STORAGE_BASE/portainer"
TRAEFIK_STORAGE="$HOST_STORAGE_BASE/traefik"
sudo mkdir -p $PORTAINER_STORAGE $TRAEFIK_STORAGE

# Run Portainer container
echo "Running Portainer container..."
sudo docker run -d \
    -p $PORTAINER_PORT:9443 \
    -p $PORTAINER_HTTP_PORT:9000 \
    --name $PORTAINER_CONTAINER_NAME \
    --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $PORTAINER_STORAGE:/data \
    --network $NETWORK_NAME \
    --label "traefik.enable=true" \
    --label "traefik.http.routers.portainer.rule=Host(\`portainer.localhost\`)" \
    --label "traefik.http.routers.portainer.entrypoints=web,websecure" \
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
    -v $TRAEFIK_STORAGE:/letsencrypt \
    --network $NETWORK_NAME \
    $TRAEFIK_IMAGE
check_error "Failed to start Traefik container"

# Generate Markdown file with service information
IP_ADDRESS=$(hostname -I | awk '{print $1}')
MARKDOWN_FILE="docker_services_info.md"

echo "Generating service information file: $MARKDOWN_FILE"

cat <<EOF > $MARKDOWN_FILE
# Home Docker Services Information

This document provides a quick reference for all the Docker services set up in your home environment.

## Network Information

- **Docker Network Name**: $NETWORK_NAME
- **Host IP Address**: $IP_ADDRESS

## Portainer

Portainer provides a web interface for managing your Docker environment.

- **HTTPS URL**: https://$IP_ADDRESS:$PORTAINER_PORT
- **HTTP URL**: http://$IP_ADDRESS:$PORTAINER_HTTP_PORT
- **Traefik URL**: http://portainer.localhost
- **Username**: Set during first login
- **Password**: Set during first login
- **Persistent Storage**: $PORTAINER_STORAGE

## Traefik

Traefik is a modern HTTP reverse proxy and load balancer.

- **HTTP Port**: $TRAEFIK_HTTP_PORT
- **HTTPS Port**: $TRAEFIK_HTTPS_PORT
- **Dashboard URL**: http://$IP_ADDRESS:$TRAEFIK_DASHBOARD_PORT
- **Persistent Storage**: $TRAEFIK_STORAGE
- **Note**: The Traefik dashboard is currently set to insecure mode for ease of access in a home environment.

**Important**: Ensure that your Tailscale setup is properly configured for secure remote access.

## Important Notes

1. Services are accessible on the host's network interface and via Tailscale
2. Regular backups of your Docker volumes are recommended
3. To add new containers, use the separate add_containers.sh script
4. Ensure Tailscale is properly set up for secure remote access
EOF

echo "Service information has been saved to $MARKDOWN_FILE"
echo "Setup completed successfully!"
echo "Portainer is running and can be accessed at:"
echo "- HTTPS: https://$IP_ADDRESS:$PORTAINER_PORT"
echo "- HTTP: http://$IP_ADDRESS:$PORTAINER_HTTP_PORT"
echo "Traefik dashboard can be accessed at http://$IP_ADDRESS:$TRAEFIK_DASHBOARD_PORT"
echo ""
echo "IMPORTANT NOTES:"
echo "1. Services are accessible on the host's network interface and via Tailscale"
echo "2. Regular backups of your Docker volumes are recommended"
echo "3. To add new containers, use the separate add_containers.sh script"
echo "4. Ensure Tailscale is properly set up for secure remote access"
echo "5. Refer to the $MARKDOWN_FILE for detailed service information"
```

To use this script:

1. Save it as a file (e.g., `docker_setup.sh`).
2. Edit the `HOST_STORAGE_BASE` variable to point to your preferred host storage path.
3. Make it executable: `chmod +x docker_setup.sh`
4. Run it with sudo: `sudo ./docker_setup.sh`

---

# add_containers.sh

````bash
#!/bin/bash

# Define variables
NETWORK_NAME="home_network"
INFO_MARKDOWN_FILE="docker_services_info.md"
ADD_CONTAINERS_FILE="Add_Containers.md"
HOST_STORAGE_BASE="/path/to/host/storage"  # Change this to your preferred host storage path
START_PORT=8000  # Starting port number for automatic assignment

# Function to check if a port is in use
is_port_in_use() {
    netstat -tuln | grep -q ":$1 "
}

# Function to find the next available port
find_next_port() {
    local port=$START_PORT
    while is_port_in_use $port || is_port_in_use $((port+1)); do
        port=$((port+2))
    done
    echo $port
}

# Function to update the code block in docker_services_info.md
update_info_code_block() {
    local temp_file=$(mktemp)
    local in_code_block=false
    local found_code_block=false

    # Read the current content of the file
    while IFS= read -r line; do
        if [[ "$line" == '```json' && "$in_code_block" == false ]]; then
            in_code_block=true
            found_code_block=true
            echo "$line" >> "$temp_file"
            echo "$1" >> "$temp_file"
        elif [[ "$line" == '```' && "$in_code_block" == true ]]; then
            in_code_block=false
            echo "$line" >> "$temp_file"
        elif [[ "$in_code_block" == false ]]; then
            echo "$line" >> "$temp_file"
        fi
    done < "$INFO_MARKDOWN_FILE"

    # If code block wasn't found, add it at the end
    if [[ "$found_code_block" == false ]]; then
        echo -e "\n## Container Information\n" >> "$temp_file"
        echo '```json' >> "$temp_file"
        echo "$1" >> "$temp_file"
        echo '```' >> "$temp_file"
    fi

    # Replace the original file with the updated content
    mv "$temp_file" "$INFO_MARKDOWN_FILE"
}

# Function to add a new container
add_container() {
    local IMAGE=$1
    local NAME=$(echo $IMAGE | cut -d "/" -f2 | cut -d ":" -f1)
    local HTTP_PORT=$(find_next_port)
    local HTTPS_PORT=$((HTTP_PORT+1))

    # Pull the Docker image
    echo "Pulling Docker image: $IMAGE"
    sudo docker pull $IMAGE

    # Create host storage directory
    local HOST_VOLUME_PATH="$HOST_STORAGE_BASE/$NAME"
    sudo mkdir -p "$HOST_VOLUME_PATH"

    echo "Adding new container: $NAME"
    sudo docker run -d \
        --name $NAME \
        --restart always \
        -p $HTTP_PORT:80 \
        -p $HTTPS_PORT:443 \
        -v "$HOST_VOLUME_PATH:/data" \
        --network $NETWORK_NAME \
        --label "traefik.enable=true" \
        --label "traefik.http.routers.$NAME.rule=Host(\`$NAME.localhost\`)" \
        --label "traefik.http.routers.$NAME.entrypoints=web,websecure" \
        --label "traefik.http.services.$NAME.loadbalancer.server.port=80" \
        $IMAGE

    if [ $? -ne 0 ]; then
        echo "Error: Failed to start $NAME container"
        return 1
    fi

    echo "Container $NAME added successfully"
    echo "It can be accessed at:"
    echo "  - HTTP:  http://$NAME.localhost or http://localhost:$HTTP_PORT"
    echo "  - HTTPS: https://$NAME.localhost or https://localhost:$HTTPS_PORT"
    echo "Persistent storage is mounted at $HOST_VOLUME_PATH on the host"

    # Update the info Markdown file
    local IP_ADDRESS=$(hostname -I | awk '{print $1}')

    # Create or update the JSON code block
    local json_content=$(cat "$INFO_MARKDOWN_FILE" | sed -n '/```json/,/```/p' | sed '1d;$d')
    if [ -z "$json_content" ]; then
        json_content="{}"
    fi
    local new_container_info="{\"name\":\"$NAME\",\"image\":\"$IMAGE\",\"http_port\":$HTTP_PORT,\"https_port\":$HTTPS_PORT,\"host_volume\":\"$HOST_VOLUME_PATH\"}"
    json_content=$(echo "$json_content" | jq ". + {\"$NAME\": $new_container_info}")
    update_info_code_block "$json_content"

    # Add detailed information after the code block
    cat <<EOF >> "$INFO_MARKDOWN_FILE"

## $NAME

- **HTTP URL**: http://$IP_ADDRESS:$HTTP_PORT
- **HTTPS URL**: https://$IP_ADDRESS:$HTTPS_PORT
- **Traefik HTTP URL**: http://$NAME.localhost
- **Traefik HTTPS URL**: https://$NAME.localhost
- **Image**: $IMAGE
- **Persistent Storage**: $HOST_VOLUME_PATH
EOF
}

# Function to remove a container
remove_container() {
    local NAME=$1

    # Remove the Docker container
    sudo docker rm -f "$NAME"

    if [ $? -ne 0 ]; then
        echo "Error: Failed to remove $NAME container"
        return 1
    fi

    echo "Container $NAME removed successfully"

    # Update the JSON code block
    local json_content=$(cat "$INFO_MARKDOWN_FILE" | sed -n '/```json/,/```/p' | sed '1d;$d')
    json_content=$(echo "$json_content" | jq "del(.$NAME)")
    update_info_code_block "$json_content"

    # Remove the detailed information section
    sed -i "/^## $NAME$/,/^$/d" "$INFO_MARKDOWN_FILE"
}

# Main script execution
echo "Docker Container Management Script"
echo "=================================="
echo "Reading containers to add/remove from $ADD_CONTAINERS_FILE"

# Check if Add_Containers.md exists
if [ ! -f "$ADD_CONTAINERS_FILE" ]; then
    echo "Error: $ADD_CONTAINERS_FILE not found. Please create this file with a list of Docker images to add."
    exit 1
fi

# Read Add_Containers.md and add/remove containers
IN_CODE_BLOCK=false
while IFS= read -r line || [ -n "$line" ]; do
    # Check for the start and end of the code block
    if [[ "$line" == '```' ]]; then
        if [ "$IN_CODE_BLOCK" = false ]; then
            IN_CODE_BLOCK=true
        else
            break  # Exit the loop when we reach the end of the code block
        fi
        continue
    fi

    # Process lines only when we're inside the code block
    if [ "$IN_CODE_BLOCK" = true ]; then
        # Skip empty lines and comments
        if [[ -z "$line" || "$line" == \#* ]]; then
            continue
        fi

        # Check if it's a removal (starts with -)
        if [[ "$line" == -* ]]; then
            NAME=$(echo "$line" | sed -e 's/^-[[:space:]]*//' -e 's/[[:space:]]*$//')
            remove_container "$NAME"
        else
            # It's an addition
            IMAGE=$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
            if [ -n "$IMAGE" ]; then
                add_container "$IMAGE"
            fi
        fi
        echo
    fi
done < "$ADD_CONTAINERS_FILE"

# Add a note about Tailscale access to the info Markdown file
echo "Updating $INFO_MARKDOWN_FILE with Tailscale information..."
cat <<EOF >> "$INFO_MARKDOWN_FILE"

## Tailscale Access

All services can be accessed securely via Tailscale using your Tailscale IP address.
Ensure Tailscale is properly configured on both your host machine and the device you're accessing from.

## Important Notes

1. Services are accessible on the host's network interface and via Tailscale
2. Regular backups of your Docker volumes are recommended
3. Ensure Tailscale is properly set up for secure remote access
EOF

echo "All container operations have been completed successfully."
echo "Please check $INFO_MARKDOWN_FILE for updated service information."
echo
echo "IMPORTANT NOTES:"
echo "1. Services are accessible on the host's network interface and via Tailscale"
echo "2. Regular backups of your Docker volumes are recommended"
echo "3. Ensure Tailscale is properly set up for secure remote access"
echo "4. Refer to the $INFO_MARKDOWN_FILE for detailed service information"

````
