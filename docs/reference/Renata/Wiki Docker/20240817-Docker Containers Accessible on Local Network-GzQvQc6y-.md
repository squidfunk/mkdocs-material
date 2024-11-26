# Docker Containers Accessible on Local Network

# Docker Containers Accessible on Local Network

## 1. **Stirling-PDF**

- **Container Name**: `stirling-pdf-alt`
- **Access URL**: [http://192.168.11.167:8086](http://192.168.11.167:8086)
- **Description**: Access the Stirling-PDF service.

## 3. **Open WebUI (Ollama)**

- **Container Name**: `open-webui`
- **Access URL**: [http://192.168.11.167:3000](http://192.168.11.167:3000)
- **Description**: Access the Open WebUI interface.

## 4. **Traefik**

- **Container Name**: `traefik`
- **Access URLs**:
  - **HTTP**: [http://192.168.11.167:80](http://192.168.11.167:80)
  - **HTTPS**: [https://192.168.11.167:443](https://192.168.11.167:443)
  - **Dashboard** (if enabled): [http://192.168.11.167:8080](http://192.168.11.167:8080)
- **Description**: Access Traefik, the reverse proxy and load balancer.

## 5. **Portainer**

- **Container Name**: `portainer`
- **Access URL**: [http://192.168.11.167:9000](http://192.168.11.167:9000)
- **Description**: Access the Portainer management interface for Docker.

Command :
systemctl status docker
