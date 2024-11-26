# Tailscale Engineering-Level Spickzettel für Linux und Docker



## 1. Installation und Konfiguration auf Linux

- **Tailscale installieren:**
  Verwenden Sie den Paketmanager Ihrer Linux-Distribution (z.B. `apt`, `yum`, `dnf`), um Tailscale zu installieren:
  ```bash
  curl -fsSL https://tailscale.com/install.sh | sh
  ```

- **Tailscale über die Befehlszeile aktivieren:**
  Führen Sie den folgenden Befehl aus, um Tailscale zu starten und das Gerät zu verbinden:
  ```bash
  sudo tailscale up --authkey=<Ihr_Auth_Key> --advertise-routes=<subnetz>
  ```

- **Tailscale als Dienst aktivieren:**
  Aktivieren Sie Tailscale als Dienst, um es beim Booten automatisch zu starten:
  ```bash
  sudo systemctl enable tailscaled
  sudo systemctl start tailscaled
  ```

## 2. Verwendung von Tailscale mit Docker

- **Docker-Container über Tailscale verbinden:**
  Starten Sie den Docker-Container mit der Netzwerkkonfiguration `host`, um den Tailscale-Zugriff zu ermöglichen:
  ```bash
  docker run --network host <container_name>
  ```

- **Tailscale innerhalb eines Docker-Containers installieren:**
  Erstellen Sie ein Docker-Image mit Tailscale-Installation:
  ```Dockerfile
  FROM ubuntu:latest
  RUN apt-get update && apt-get install -y tailscale
  ENTRYPOINT ["/usr/sbin/tailscaled"]
  CMD ["tailscale up --authkey=<Ihr_Auth_Key>"]
  ```

## 3. Erweiterte Netzwerk- und Sicherheitsfunktionen

- **Subnetz-Routing einrichten:**
  Aktivieren Sie Subnetz-Routing, um den Zugriff auf Geräte außerhalb des lokalen Netzwerks zu ermöglichen:
  ```bash
  sudo tailscale up --advertise-routes=<subnetz1>,<subnetz2>
  ```

- **Firewall-Konfiguration anpassen:**
  Stellen Sie sicher, dass die Firewall Tailscale-Datenverkehr zulässt. Verwenden Sie `iptables` oder `firewalld`, um Regeln festzulegen.

## 4. Diagnose und Fehlerbehebung

- **Tailscale-Verbindung testen:**
  Verwenden Sie `tailscale ping`, um die Verbindung zu einem Peer zu testen:
  ```bash
  tailscale ping <peer-ip>
  ```

- **Netzwerkverbindungsprobleme überprüfen:**
  Verwenden Sie `tailscale netcheck`, um die Verbindungsqualität zu prüfen:
  ```bash
  tailscale netcheck
  ```

- **Fehlerberichte erstellen:**
  Erstellen Sie einen Fehlerbericht für die Fehlerbehebung:
  ```bash
  tailscale bugreport
  ```

## 5. Kubernetes und Cloud-Integrationen

- **Tailscale in Kubernetes integrieren:**
  Verwenden Sie den Tailscale DaemonSet, um sichere Verbindungen zwischen Pods und externen Diensten herzustellen:
  ```bash
  kubectl apply -f https://raw.githubusercontent.com/tailscale/tailscale-k8s/main/deploy.yaml
  ```

- **Integration mit AWS VPCs:**
  Verwenden Sie Tailscale, um VPCs sicher zu verbinden und Subnetz-Routing zwischen verschiedenen AWS-Regionen zu ermöglichen.
