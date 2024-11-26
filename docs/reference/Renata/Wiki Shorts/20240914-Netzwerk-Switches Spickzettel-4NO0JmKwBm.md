# Netzwerk-Switches Spickzettel



## 1. Grundlegende Begriffe zu Netzwerk-Switches

- **Netzwerk-Switch:**
  Ein Gerät, das Computer und andere Geräte in einem lokalen Netzwerk (LAN) verbindet und Datenpakete zwischen ihnen weiterleitet.

- **Managed Switch:**
  Ein Switch, der konfigurierbar ist und Netzwerkadministratoren ermöglicht, den Netzwerkverkehr zu überwachen und zu steuern.

- **Unmanaged Switch:**
  Ein Plug-and-Play-Switch ohne Konfigurationsoptionen, der für einfache Netzwerke verwendet wird.

- **PoE (Power over Ethernet):**
  Ein Switch, der Strom über Ethernet-Kabel an angeschlossene Geräte wie IP-Kameras und VoIP-Telefone liefert.

## 2. Wichtige Konfigurationen für Managed Switches

- **IP-Adresse des Switches konfigurieren:**
  Zugriff auf den Switch über die Konsolenschnittstelle oder Weboberfläche und Festlegen einer statischen IP-Adresse:
  ```bash
  configure terminal
  interface vlan 1
  ip address <ip-adresse> <subnetzmaske>
  ```

- **VLAN (Virtual Local Area Network) konfigurieren:**
  VLANs erstellen, um Netzwerksegmente zu trennen:
  ```bash
  configure terminal
  vlan <vlan-id>
  name <vlan-name>
  ```

- **Port-Sicherheit einrichten:**
  Festlegen, wie viele MAC-Adressen pro Port zulässig sind:
  ```bash
  switchport port-security
  switchport port-security maximum <anzahl>
  switchport port-security violation restrict
  ```

## 3. Fehlerbehebung und Wartung

- **Aktuelle Switch-Konfiguration anzeigen:**
  ```bash
  show running-config
  ```
  Zeigt die aktuelle Konfiguration des Switches an.

- **Aktive VLANs anzeigen:**
  ```bash
  show vlan brief
  ```
  Zeigt alle konfigurierten und aktiven VLANs auf dem Switch an.

- **Port-Status überprüfen:**
  ```bash
  show interfaces status
  ```
  Zeigt den Status aller Switch-Ports an.

## 4. Nützliche Tools und Befehle

- **Netzwerkverkehr auf einem Port spiegeln:**
  Port-Mirroring einrichten, um Datenverkehr zu überwachen:
  ```bash
  monitor session 1 source interface <interface>
  monitor session 1 destination interface <interface>
  ```

- **MAC-Adresstabelle anzeigen:**
  ```bash
  show mac address-table
  ```
  Zeigt die MAC-Adresstabelle an, die dem Switch bekannt ist.

- **Switch neustarten:**
  ```bash
  reload
  ```
  Startet den Switch neu.
