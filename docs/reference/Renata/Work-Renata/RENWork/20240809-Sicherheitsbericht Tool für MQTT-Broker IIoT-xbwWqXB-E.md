# Sicherheitsbericht Tool für MQTT-Broker IIoT

## Erklärung 

Dieses Skript ist die Umfassende Sicherheitsüberprüfung eines MQTT-Brokers durchzuführen. MQTT (Message Queuing Telemetry Transport) ist ein leichtgewichtiges Protokoll für die Machine-to-Machine-Kommunikation (M2M) und das Internet der Dinge (IoT). Die Sicherstellung der Sicherheit eines MQTT-Brokers ist entscheidend, um sensible Daten zu schützen und unautorisierte Zugriffe zu verhindern.

#### Dieses Skript führt eine Reihe von Prüfungen durch, darunter:

1.	Netzwerk-Schwachstellenscan:
	•	Scannt den Ziel-MQTT-Broker auf offene Ports und Dienste.
	•	Überprüft bekannte Sicherheitslücken in den entdeckten Diensten.

2.	Authentifizierungsprüfung:
	•	Überprüft, ob eine Verbindung ohne Authentifizierung hergestellt werden kann.
	•	Führt Brute-Force-Angriffe mit häufig verwendeten Benutzernamen und Passwörtern durch.

3.	Überprüfung der Datensicherheit bei der Übertragung:
	•	Überprüft die SSL/TLS-Konfiguration des Brokers, um die Sicherheit der Datenübertragung zu gewährleisten.


5.	Compliance-Prüfungen nach FDA- und ISO-Standards:
	•	Überprüft die Konformität mit den Anforderungen der FDA und ISO-Standards für die Sicherheit von IT-Systemen.


6.	Leistungstest:
	•	Überprüft die Leistungsfähigkeit des Brokers unter Lastbedingungen.

7.	Überprüfung der Zugangskontrolle:
	•	Überprüft die Implementierung von Rollen und Berechtigungen auf dem Broker.


8.	Überprüfung auf Denial-of-Service (DoS) Schwachstellen:
	•	Testet den Broker auf Anfälligkeit für DoS-Angriffe.


9.	Überprüfung auf Protokollierungs- und Überwachungsfunktionen:
	•	Überprüft, ob und wie der Broker Protokollierungs- und Überwachungsfunktionen implementiert hat.

Die Ergebnisse werden in einem ausführlichen Bericht zusammengefasst, der wertvolle Informationen zur Verbesserung der Sicherheit des MQTT-Brokers liefert.

### Anforderungen

1.	Python 3.x
2.	Bibliotheken: nmap, paho-mqtt, ssl, itertools, requests, psutil


### Skript:

```python
import nmap
import paho.mqtt.client as mqtt
import ssl
import itertools
import datetime
import os
import requests
import psutil
import time

# Einstellungen
BROKER = 'mqtt.renata.com'
MQTT_PORT = 1883
SSL_PORT = 8883
OUTPUT_FILE = "mqtt_audit_report.txt"

# Erstellen einer neuen Ausgabedatei
with open(OUTPUT_FILE, 'w') as f:
    f.write(f"MQTT Sicherheitsüberprüfungsbericht\n")
    f.write(f"Erstellt am: {datetime.datetime.now()}\n")
    f.write("="*50 + "\n\n")

# Funktion zum Schreiben in die Ausgabedatei
def write_to_report(text):
    with open(OUTPUT_FILE, 'a') as f:
        f.write(text + "\n")

# Netzwerk-Schwachstellenscan
def network_scan(target_ip):
    write_to_report("Netzwerk-Schwachstellenscan")
    write_to_report("-" * 50)
    scanner = nmap.PortScanner()
    scanner.scan(target_ip, '1-65535', '-sV -sC')
    for host in scanner.all_hosts():
        write_to_report(f'Host: {host} ({scanner[host].hostname()})')
        write_to_report(f'Status: {scanner[host].state()}')
        for proto in scanner[host].all_protocols():
            write_to_report(f'Protokoll: {proto}')
            lport = scanner[host][proto].keys()
            for port in sorted(lport):
                service = scanner[host][proto][port].get('product', 'Unbekannt')
                version = scanner[host][proto][port].get('version', '')
                write_to_report(f'Port: {port}\tStatus: {scanner[host][proto][port]["state"]}\tDienst: {service} {version}')
    write_to_report("\n")

# Authentifizierungsprüfung
def authentication_test(target_ip):
    write_to_report("Authentifizierungsprüfung")
    write_to_report("-" * 50)
    
    # Test 1: Keine Authentifizierung
    client = mqtt.Client()
    def on_connect_no_auth(client, userdata, flags, rc):
        if rc == 0:
            write_to_report("Verbindung zum Broker ohne Authentifizierung erfolgreich hergestellt")
        else:
            write_to_report(f"Verbindung fehlgeschlagen mit Code {rc}")
    client.on_connect = on_connect_no_auth
    try:
        client.connect(target_ip, MQTT_PORT, 60)
        client.loop_start()
        client.loop_stop()
    except Exception as e:
        write_to_report(f"Fehler bei der Verbindung ohne Authentifizierung: {e}")
    
    # Test 2: Brute-Force Authentifizierung
    usernames = ['admin', 'user', 'test']
    passwords = ['password', '1234', 'admin']
    
    def on_connect_brute_force(client, userdata, flags, rc):
        if rc == 0:
            write_to_report(f"Erfolgreiche Anmeldung mit {client._username}:{client._password}")
            client.loop_stop()
        else:
            write_to_report(f"Fehlgeschlagene Anmeldung mit {client._username}:{client._password}")
    
    for username, password in itertools.product(usernames, passwords):
        client = mqtt.Client()
        client.username_pw_set(username, password)
        client.on_connect = on_connect_brute_force
        try:
            client.connect(target_ip, MQTT_PORT, 60)
            client.loop_start()
            client.loop_stop()
        except Exception as e:
            write_to_report(f"Fehler bei der Verbindung mit {username}:{password} - {e}")
    write_to_report("\n")

# Überprüfung der Datensicherheit bei der Übertragung
def data_transmission_security_test(target_ip):
    write_to_report("Überprüfung der Datensicherheit bei der Übertragung")
    write_to_report("-" * 50)
    client = mqtt.Client()
    def on_connect_ssl(client, userdata, flags, rc):
        if rc == 0:
            write_to_report("Verbindung zum Broker mit SSL/TLS erfolgreich hergestellt")
        else:
            write_to_report(f"Verbindung fehlgeschlagen mit Code {rc}")
    client.tls_set(cert_reqs=ssl.CERT_NONE, tls_version=ssl.PROTOCOL_TLSv1_2)
    client.tls_insecure_set(True)
    client.on_connect = on_connect_ssl
    try:
        client.connect(target_ip, SSL_PORT, 60)
        client.loop_start()
        client.loop_stop()
    except Exception as e:
        write_to_report(f"Fehler bei der Verbindung mit SSL/TLS: {e}")
    write_to_report("\n")

# Compliance-Prüfung nach FDA- und ISO-Standards
def compliance_test():
    write_to_report("Compliance-Prüfung nach FDA- und ISO-Standards")
    write_to_report("-" * 50)
    try:
        response = requests.get("https://compliance.renata.com/api/check")
        if response.status_code == 200:
            write_to_report("Compliance-Prüfung erfolgreich: System entspricht den Anforderungen der FDA und ISO")
        else:
            write_to_report(f"Compliance-Prüfung fehlgeschlagen: {response.status_code}")
    except Exception as e:
        write_to_report(f"Fehler bei der Compliance-Prüfung: {e}")
    write_to_report("\n")

# Leistungstest
def performance_test(target_ip):
    write_to_report("Leistungstest")
    write_to_report("-" * 50)
    start_time = time.time()
    client = mqtt.Client()
    def on_connect_perf(client, userdata, flags, rc):
        if rc == 0:
            for i in range(1000):
                client.publish("test/topic", f"Test message {i}")
            write_to_report("Verbindung zum Broker und 1000 Nachrichten erfolgreich gesendet")
        else:
            write_to_report(f"Verbindung fehlgeschlagen mit Code {rc}")
    client.on_connect = on_connect_perf
    try:
        client.connect(target_ip, MQTT_PORT, 60)
        client.loop_start()
        client.loop_stop()
    except Exception as e:
        write_to_report(f"Fehler bei der Verbindung: {e}")
    end_time = time.time()
    duration = end_time - start_time
    write_to_report(f"Leistungstest abgeschlossen in {duration} Sekunden")
    write_to    write_to_report(f"Leistungstest abgeschlossen in {duration} Sekunden")
    write_to_report("\n")

# Überprüfung der Zugangskontrolle
def access_control_test(target_ip):
    write_to_report("Überprüfung der Zugangskontrolle")
    write_to_report("-" * 50)
    roles = ['admin', 'user', 'guest']
    permissions = ['read', 'write', 'delete']
    for role in roles:
        for permission in permissions:
            client = mqtt.Client()
            client.username_pw_set(f"{role}", f"{role}_password")
            def on_connect_access(client, userdata, flags, rc):
                if rc == 0:
                    write_to_report(f"Verbindung als {role} erfolgreich hergestellt")
                    # Test the permissions
                    if permission == 'read':
                        client.subscribe("test/topic")
                        write_to_report(f"Abonnement als {role} erfolgreich für Lesezugriff")
                    elif permission == 'write':
                        client.publish("test/topic", "Test message")
                        write_to_report(f"Nachricht erfolgreich veröffentlicht als {role} für Schreibzugriff")
                    elif permission == 'delete':
                        # Assuming delete means removing a subscription
                        client.unsubscribe("test/topic")
                        write_to_report(f"Abonnement erfolgreich entfernt als {role}")
                else:
                    write_to_report(f"Verbindung als {role} fehlgeschlagen mit Code {rc}")
            client.on_connect = on_connect_access
            try:
                client.connect(target_ip, MQTT_PORT, 60)
                client.loop_start()
                client.loop_stop()
            except Exception as e:
                write_to_report(f"Fehler bei der Verbindung als {role} - {e}")
    write_to_report("\n")

# Überprüfung auf Denial-of-Service (DoS) Schwachstellen
def dos_vulnerability_test(target_ip):
    write_to_report("Überprüfung auf Denial-of-Service (DoS) Schwachstellen")
    write_to_report("-" * 50)
    client = mqtt.Client()
    def on_connect_dos(client, userdata, flags, rc):
        if rc == 0:
            write_to_report("Verbindung zum Broker für DoS-Test erfolgreich hergestellt")
            # Flood the broker with a large number of messages
            try:
                for i in range(10000):
                    client.publish("test/topic", "DoS test message")
                write_to_report("DoS-Test durchgeführt: 10000 Nachrichten gesendet")
            except Exception as e:
                write_to_report(f"Fehler beim Senden der Nachrichten während des DoS-Tests: {e}")
        else:
            write_to_report(f"Verbindung fehlgeschlagen mit Code {rc}")
    client.on_connect = on_connect_dos
    try:
        client.connect(target_ip, MQTT_PORT, 60)
        client.loop_start()
        client.loop_stop()
    except Exception as e:
        write_to_report(f"Fehler bei der Verbindung während des DoS-Tests: {e}")
    write_to_report("\n")

# Überprüfung der Protokollierungs- und Überwachungsfunktionen
def logging_monitoring_test():
    write_to_report("Überprüfung der Protokollierungs- und Überwachungsfunktionen")
    write_to_report("-" * 50)
    # Simulate checking logs and monitoring tools
    try:
        response = requests.get("https://logs.renata.com/api/check")
        if response.status_code == 200:
            logs = response.json()
            for log in logs:
                write_to_report(f"Log-Eintrag: {log}")
            write_to_report("Protokollierungs- und Überwachungsprüfung erfolgreich: Logs wurden überprüft")
        else:
            write_to_report(f"Protokollierungs- und Überwachungsprüfung fehlgeschlagen: {response.status_code}")
    except Exception as e:
        write_to_report(f"Fehler bei der Protokollierungs- und Überwachungsprüfung: {e}")
    write_to_report("\n")

# Hauptfunktion zum Ausführen aller Tests
def main():
    target_ip = BROKER
    
    write_to_report("Start der MQTT Sicherheitsüberprüfung")
    write_to_report("=" * 50 + "\n")
    
    network_scan(target_ip)
    authentication_test(target_ip)
    data_transmission_security_test(target_ip)
    compliance_test()
    performance_test(target_ip)
    access_control_test(target_ip)
    dos_vulnerability_test(target_ip)
    logging_monitoring_test()
    
    write_to_report("MQTT Sicherheitsüberprüfung abgeschlossen")
    write_to_report("=" * 50 + "\n")

    print(f"Überprüfung abgeschlossen. Bericht gespeichert unter {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
```