# Docker Installation and Compose Setup Guide Debian 12

## 1. Installing Docker on Debian 12

1. Update your system packages:

   ```
   sudo apt update
   sudo apt upgrade
   ```

2. Install required packages:

   ```
   sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
   ```

3. Add Docker's official GPG key:

   ```
   curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

4. Set up the stable Docker repository:

   ```
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. Update the package database with Docker packages:

   ```
   sudo apt update
   ```

6. Install Docker Engine and containerd:

   ```
   sudo apt install docker-ce docker-ce-cli containerd.io
   ```

7. Verify that Docker is installed correctly:

   ```
   sudo docker run hello-world
   ```

8. (Optional) To run Docker commands without sudo, add your user to the docker group:

   ```
   sudo usermod -aG docker $USER
   ```

   Log out and back in for this change to take effect.

9. Enable Docker to start on boot:
   ```
   sudo systemctl enable docker
   ```

## 2. Setting up Docker Compose

1. Create a new directory for your Docker Compose project:

   ```
   mkdir docker_services
   cd docker_services
   ```

2. Create a Docker Compose file:

   ```
   nano docker-compose.yml
   ```

3. Copy and paste the following content into the file:

```yaml
version: "3"

services:
  stirling-pdf:
    image: frooodle/s-pdf:latest
    container_name: stirling-pdf-alt
    ports:
      - "8086:8080"
    volumes:
      - ./stirling-pdf-data:/usr/share/stirling-pdf/data
    restart: unless-stopped

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "3000:8080"
    volumes:
      - ./open-webui-data:/app/backend/data
    restart: unless-stopped

  traefik:
    image: traefik:v2.10
    container_name: traefik
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik-config:/etc/traefik
    restart: unless-stopped

  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    ports:
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./portainer-data:/data
    restart: unless-stopped

networks:
  default:
    name: my_network
```

4. Save the file and exit the editor (in nano, press Ctrl+X, then Y, then Enter).

5. Start the services:

   ```
   docker-compose up -d
   ```

6. Verify that all services are running:
   ```
   docker-compose ps
   ```

## 3. Accessing the Services

- Stirling-PDF: http://localhost:8086
- Open WebUI (Ollama): http://localhost:3000
- Traefik Dashboard: http://localhost:8080
- Portainer: http://localhost:9000

## 4. Managing the Services

- To stop all services:

  ```
  docker-compose down
  ```

- To view logs of a specific service (e.g., stirling-pdf):

  ```
  docker-compose logs stirling-pdf
  ```

- To restart a specific service:
  ```
  docker-compose restart service_name
  ```

Remember to replace `localhost` with your server's IP address if accessing these services from another machine on your network.
