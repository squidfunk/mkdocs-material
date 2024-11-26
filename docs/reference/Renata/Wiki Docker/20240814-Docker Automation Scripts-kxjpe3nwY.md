# Docker Automation Scripts

## Overview

1. `docker_setup.sh`: Initial setup script
2. `add_containers.sh`: Script for adding or removing containers
3. `Add_Containers.md`: File for specifying containers to add or remove
4. `docker_services_info.md`: Auto-generated documentation of your Docker setup

## 1. docker_setup.sh

This script is responsible for the initial setup of your Docker environment.

### Key Functions:

1. **Docker Installation**:

   - Checks if Docker is installed
   - If not, installs Docker and Docker Compose

2. **Network Creation**:

   - Creates a custom Docker network named "home_network"

3. **Portainer Setup**:

   - Pulls the Portainer image
   - Creates a Portainer container for easy Docker management via web UI

4. **Traefik Setup**:

   - Pulls the Traefik image
   - Creates a Traefik configuration file
   - Sets up a Traefik container for reverse proxy and load balancing

5. **Documentation Generation**:
   - Creates `docker_services_info.md` with details about the setup
   - Includes a JSON code block with container information

### Automation Features:

- Automatic port assignment for Portainer and Traefik
- Creation of persistent storage volumes
- Network configuration for inter-container communication
- Auto-generation of Traefik configuration
- Creation of detailed documentation

## 2. add_containers.sh

This script is used for adding new containers or removing existing ones after the initial setup.

### Key Functions:

1. **Reading Container Specifications**:

   - Reads the `Add_Containers.md` file for container specifications

2. **Adding Containers**:

   - Pulls specified Docker images
   - Creates containers with appropriate settings
   - Assigns available ports automatically
   - Sets up persistent storage

3. **Removing Containers**:

   - Removes specified containers
   - Cleans up associated resources

4. **Documentation Update**:
   - Updates the JSON code block in `docker_services_info.md`
   - Adds or removes detailed information for each container

### Automation Features:

- Automatic port assignment for new containers
- Creation of persistent storage volumes
- Integration with existing Docker network
- Traefik configuration for each new container
- Auto-update of documentation

## 3. Add_Containers.md

This is a user-editable file where you specify which containers to add or remove.

### Usage:

- To add a container, simply list the Docker image name
- To remove a container, prefix the container name with a minus sign (-)

Example:

```
influxdb
nextcloud
-oldcontainer
```

## 4. docker_services_info.md

This is an auto-generated file that provides comprehensive information about your Docker setup.

### Contents:

- Network information
- JSON code block with container details
- Detailed information for each container
- Access URLs and ports
- Persistent storage locations

## Automation Workflow

1. Run `docker_setup.sh` for initial setup
2. Edit `Add_Containers.md` to specify containers
3. Run `add_containers.sh` to apply changes
4. Review `docker_services_info.md` for updated setup information

## Key Automation Features

1. **One-Command Setup**: Initial environment setup with a single command
2. **Easy Container Management**: Add or remove containers by editing a simple file
3. **Automatic Port Management**: Avoids port conflicts by auto-assigning available ports
4. **Persistent Storage**: Automatically creates and manages persistent storage for containers
5. **Network Integration**: All containers are automatically added to the same Docker network
6. **Reverse Proxy Configuration**: Traefik is automatically configured for each new container
7. **Auto-Documentation**: Setup details are automatically documented and updated
8. **Consistent Environment**: Ensures all containers are set up with consistent settings

## Benefits

- Simplifies Docker management for home servers
- Reduces human error in configuration
- Provides easy scalability
- Maintains up-to-date documentation of the setup
- Enables easy backup and restore of container data

---

# Docker-Automatisierungsskripte

## Überblick

1. `docker_setup.sh`: Skript für die Ersteinrichtung
2. `add_containers.sh`: Skript zum Hinzufügen oder Entfernen von Containern
3. `Add_Containers.md`: Datei zur Spezifikation der hinzuzufügenden oder zu entfernenden Container
4. `docker_services_info.md`: Automatisch generierte Dokumentation Ihres Docker-Setups

## 1. docker_setup.sh

Dieses Skript ist für die Ersteinrichtung Ihrer Docker-Umgebung verantwortlich.

### Hauptfunktionen:

1. **Docker-Installation**:

   - Überprüft, ob Docker installiert ist
   - Falls nicht, installiert Docker und Docker Compose

2. **Netzwerkerstellung**:

   - Erstellt ein benutzerdefiniertes Docker-Netzwerk namens "home_network"

3. **Portainer-Setup**:

   - Lädt das Portainer-Image herunter
   - Erstellt einen Portainer-Container für einfache Docker-Verwaltung über Web-UI

4. **Traefik-Setup**:

   - Lädt das Traefik-Image herunter
   - Erstellt eine Traefik-Konfigurationsdatei
   - Richtet einen Traefik-Container für Reverse Proxy und Lastausgleich ein

5. **Dokumentationsgenerierung**:
   - Erstellt `docker_services_info.md` mit Details zum Setup
   - Enthält einen JSON-Codeblock mit Container-Informationen

### Automatisierungsfunktionen:

- Automatische Portzuweisung für Portainer und Traefik
- Erstellung von persistenten Speicher-Volumes
- Netzwerkkonfiguration für Container-Kommunikation
- Automatische Generierung der Traefik-Konfiguration
- Erstellung desdfasdfasdftaillierter Dokumentation

## 2. add_containers.sh

Dieses Skript wird verwendet, um nach der Ersteinrichtung neue Container hinzuzufügen oder bestehende zu entfernen.

### Hauptfunktionen:

1. **Lesen der Container-Spezifikationen**:

   - Liest die `Add_Containers.md`-Datei für Container-Spezifikationen

2. **Hinzufügen von Containern**:

   - Lädt spezifizierte Docker-Images herunter
   - Erstellt Container mit entsprechenden Einstellungen
   - Weist automatisch verfügbare Ports zu
   - Richtet persistenten Speicher ein

3. **Entfernen von Containern**:

   - Entfernt spezifizierte Container
   - Bereinigt zugehörige Ressourcen

4. **Dokumentations-Update**:
   - Aktualisiert den JSON-Codeblock in `docker_services_info.md`
   - Fügt detaillierte Informationen für jeden Container hinzu oder entfernt sie

### Automatisierungsfunktionen:

- Automatische Portzuweisung für neue Container
- Erstellung von persistenten Speicher-Volumes
- Integration in bestehendes Docker-Netzwerk
- Traefik-Konfiguration für jeden neuen Container
- Automatische Aktualisierung der Dokumentation

## 3. Add_Containers.md

Dies ist eine vom Benutzer editierbare Datei, in der Sie angeben, welche Container hinzugefügt oder entfernt werden sollen.

### Verwendung:

- Um einen Container hinzuzufügen, listen Sie einfach den Docker-Image-Namen auf
- Um einen Container zu entfernen, setzen Sie ein Minuszeichen (-) vor den Container-Namen

Beispiel:

```JSON
influxdb
nextcloud
-oldcontainer
```

## 4. docker_services_info.md

Dies ist eine automatisch generierte Datei, die umfassende Informationen über Ihr Docker-Setup bereitstellt.

### Inhalt:

- Netzwerkinformationen
- JSON-Codeblock mit Container-Details
- Detaillierte Informationen für jeden Container
- Zugriffs-URLs und Ports
- Persistente Speicherorte

## Automatisierungs-Workflow

1. Führen Sie `docker_setup.sh` für die Ersteinrichtung aus
2. Bearbeiten Sie `Add_Containers.md`, um Container zu spezifizieren
3. Führen Sie `add_containers.sh` aus, um Änderungen anzuwenden
4. Überprüfen Sie `docker_services_info.md` für aktualisierte Setup-Informationen

## Wichtige Automatisierungsfunktionen

1. **Einrichtung mit einem Befehl**: Ersteinrichtung der Umgebung mit einem einzigen Befehl
2. **Einfache Container-Verwaltung**: Hinzufügen oder Entfernen von Containern durch Bearbeiten einer einfachen Datei
3. **Automatische Port-Verwaltung**: Vermeidet Port-Konflikte durch automatische Zuweisung verfügbarer Ports
4. **Persistenter Speicher**: Erstellt und verwaltet automatisch persistenten Speicher für Container
5. **Netzwerk-Integration**: Alle Container werden automatisch zum selben Docker-Netzwerk hinzugefügt
6. **Reverse-Proxy-Konfiguration**: Traefik wird automatisch für jeden neuen Container konfiguriert
7. **Auto-Dokumentation**: Setup-Details werden automatisch dokumentiert und aktualisiert
8. **Konsistente Umgebung**: Stellt sicher, dass alle Container mit konsistenten Einstellungen eingerichtet sind

## Vorteile

- Vereinfacht die Docker-Verwaltung für Heimserver
- Reduziert menschliche Fehler bei der Konfiguration
- Bietet einfache Skalierbarkeit
- Pflegt eine aktuelle Dokumentation des Setups
- Ermöglicht einfache Sicherung und Wiederherstellung von Container-Daten


## docker_setup.sh
```Bash
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
INFO_MARKDOWN_FILE="docker_services_info.md"

# Function to check and report errors
check_error() {
    if [ $? -ne 0 ]; then
        echo "Error occurred: $1"
        exit 1
    fi
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

# Generate JSON content for docker_services_info.md
IP_ADDRESS=$(hostname -I | awk '{print $1}')
JSON_CONTENT=$(cat <<EOF
{
  "portainer": {
    "name": "portainer",
    "image": "$PORTAINER_IMAGE",
    "http_port": $PORTAINER_HTTP_PORT,
    "https_port": $PORTAINER_PORT,
    "host_volume": "$PORTAINER_STORAGE"
  },
  "traefik": {
    "name": "traefik",
    "image": "$TRAEFIK_IMAGE",
    "http_port": $TRAEFIK_HTTP_PORT,
    "https_port": $TRAEFIK_HTTPS_PORT,
    "dashboard_port": $TRAEFIK_DASHBOARD_PORT,
    "host_volume": "$TRAEFIK_STORAGE"
  }
}
EOF
)

# Update the JSON code block in docker_services_info.md
update_info_code_block "$JSON_CONTENT"

# Generate Markdown content for docker_services_info.md
echo "Generating service information file: $INFO_MARKDOWN_FILE"

cat <<EOF > $INFO_MARKDOWN_FILE
# Home Docker Services Information

This document provides a quick reference for all the Docker services set up in your home environment.

## Network Information

- **Docker Network Name**: $NETWORK_NAME
- **Host IP Address**: $IP_ADDRESS

## Container Information

\`\`\`json
$JSON_CONTENT
\`\`\`

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

## Tailscale Access

All services can be accessed securely via Tailscale using your Tailscale IP address.
Ensure Tailscale is properly configured on both your host machine and the device you're accessing from.

## Important Notes

1. Services are accessible on the host's network interface and via Tailscale
2. Regular backups of your Docker volumes are recommended
3. To add new containers, use the separate add_containers.sh script
4. Ensure Tailscale is properly set up for secure remote access
EOF

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
echo "5. Refer to the $INFO_MARKDOWN_FILE for detailed service information"

```

## add_containers.sh
```Bash
#!/bin/bash

# Define variables
ADD_CONTAINERS_FILE="Add_Containers.md"
NETWORK_NAME="home_network"

echo "Docker Container Addition Script"
echo "================================"

# Check if Add_Containers.md exists
if [ ! -f "$ADD_CONTAINERS_FILE" ]; then
    echo "Error: $ADD_CONTAINERS_FILE not found. Please create this file with a list of Docker pull commands."
    exit 1
fi

# Create network if it doesn't exist
docker network create $NETWORK_NAME 2>/dev/null

# Read Add_Containers.md and execute docker commands
while IFS= read -r line || [ -n "$line" ]; do
    # Skip empty lines and comments
    if [[ -z "$line" || "$line" == \#* ]]; then
        continue
    fi

    echo "Executing: $line"
    eval "$line"

    # Extract image name and run container
    if [[ "$line" == docker\ pull* ]]; then
        image_name=$(echo "$line" | awk '{print $NF}')
        container_name=$(echo "$image_name" | cut -d: -f1 | cut -d/ -f2)
        
        echo "Starting container: $container_name"
        docker run -d --name "$container_name" --network $NETWORK_NAME "$image_name"
    fi

    echo "---"
done < "$ADD_CONTAINERS_FILE"

echo "All operations completed."
```




# Docker Automation Instructions

This document provides instructions on how to use the Docker automation scripts to manage your containers.

## Overview

1. `docker_setup.sh`: Initial setup script (run this first)
2. `add_containers.sh`: Script for adding or removing containers
3. `Add_Containers.md`: File for specifying containers to add or remove
4. `docker_services_info.md`: Auto-generated documentation of your Docker setup

## Initial Setup

1. Run the `docker_setup.sh` script to set up your initial Docker environment:
   ```
   bash docker_setup.sh
   ```
   This will install Docker (if not already installed), set up Portainer and Traefik, and create the necessary network and storage structures.

## Adding or Removing Containers

To add or remove containers, follow these steps:

1. Edit the `Add_Containers.md` file
2. Run the `add_containers.sh` script

### Editing Add_Containers.md

The `Add_Containers.md` file is where you specify which containers to add or remove. Here's how to format it:

```markdown
# Containers to Add or Remove

Add your containers below. Use `docker pull` commands to add containers, and a minus sign (-) followed by the container name to remove containers.

```
# Add the latest version of bash
docker pull bash

# Add a specific version of nginx
docker pull nginx:1.21

# Add PostgreSQL version 13
docker pull postgres:13

# Remove an old container
-oldcontainer

# Add the official Python image
docker pull python:3.9

# You can also use full image paths
docker pull docker.io/library/redis:alpine

# Add Grafana
docker pull grafana/grafana:latest
```

Remember to save this file after making changes.
```

### Running add_containers.sh

After editing `Add_Containers.md`, run the script:

```
bash add_containers.sh
```

This script will:
1. Read the `Add_Containers.md` file
2. Pull specified Docker images
3. Create containers with appropriate settings
4. Remove specified containers
5. Update the `docker_services_info.md` file with new information

## Checking Container Information

After running the scripts, check the `docker_services_info.md` file for detailed information about your containers, including:

- Container names
- Image versions
- Access URLs
- Port mappings
- Storage locations

## Important Notes

1. Ensure you have sudo privileges, as the scripts use sudo for Docker operations.
2. The scripts create a custom Docker network named "home_network". All containers are added to this network.
3. Persistent storage is automatically set up for each container in the specified host storage base directory.
4. The scripts use Traefik for reverse proxy, so containers are accessible via [containername].localhost URLs.
5. Regular backups of your Docker volumes are recommended.
6. If you're using Tailscale, ensure it's properly configured for secure remote access.

## Troubleshooting

If you encounter issues:
1. Check that all required files (`add_containers.sh`, `Add_Containers.md`, `docker_services_info.md`) are in the same directory.
2. Ensure `Add_Containers.md` is formatted correctly with the code block (``` ```) syntax.
3. Verify that you have the necessary permissions to run Docker commands and modify the script files.
4. Check the console output for any error messages when running the scripts.