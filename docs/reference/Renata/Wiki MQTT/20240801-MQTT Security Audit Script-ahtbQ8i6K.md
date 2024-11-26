# MQTT Security Audit Script

Script for a full security audit of an MQTT broker. This script includes network vulnerability scanning, authentication testing, data transmission security checks, and more. The results will be compiled into a detailed report.



#### Requirements
1. **Python 3.x**
2. **Libraries**: `nmap`, `paho-mqtt`, `ssl`, `itertools`

Install the necessary libraries:
```sh
pip install nmap paho-mqtt
```

#### The Script

```python
import nmap
import paho.mqtt.client as mqtt
import ssl
import itertools
import datetime
import os

# Settings
BROKER = 'mqtt.example.com'
MQTT_PORT = 1883
SSL_PORT = 8883
OUTPUT_FILE = "mqtt_audit_report.txt"

# Create a new output file
with open(OUTPUT_FILE, 'w') as f:
    f.write(f"MQTT Security Audit Report\n")
    f.write(f"Generated on: {datetime.datetime.now()}\n")
    f.write("="*50 + "\n\n")

# Function to write to output file
def write_to_report(text):
    with open(OUTPUT_FILE, 'a') as f:
        f.write(text + "\n")

# Network Vulnerability Scan
def network_scan(target_ip):
    write_to_report("Network Vulnerability Scan")
    write_to_report("-" * 50)
    scanner = nmap.PortScanner()
    scanner.scan(target_ip, '1-65535', '-sV -sC')
    for host in scanner.all_hosts():
        write_to_report(f'Host: {host} ({scanner[host].hostname()})')
        write_to_report(f'State: {scanner[host].state()}')
        for proto in scanner[host].all_protocols():
            write_to_report(f'Protocol: {proto}')
            lport = scanner[host][proto].keys()
            for port in sorted(lport):
                service = scanner[host][proto][port].get('product', 'Unknown')
                version = scanner[host][proto][port].get('version', '')
                write_to_report(f'Port: {port}\tState: {scanner[host][proto][port]["state"]}\tService: {service} {version}')
    write_to_report("\n")

# Authentication Mechanisms Test
def authentication_test(target_ip):
    write_to_report("Authentication Mechanisms Test")
    write_to_report("-" * 50)
    
    # Test 1: No Authentication
    client = mqtt.Client()
    def on_connect_no_auth(client, userdata, flags, rc):
        if rc == 0:
            write_to_report("Connected to broker without authentication")
        else:
            write_to_report(f"Connection failed with code {rc}")
    client.on_connect = on_connect_no_auth
    try:
        client.connect(target_ip, MQTT_PORT, 60)
        client.loop_start()
        client.loop_stop()
    except Exception as e:
        write_to_report(f"Error connecting without authentication: {e}")
    
    # Test 2: Brute Force Authentication
    usernames = ['admin', 'user', 'test']
    passwords = ['password', '1234', 'admin']
    
    def on_connect_brute_force(client, userdata, flags, rc):
        if rc == 0:
            write_to_report(f"Successful login with {client._username}:{client._password}")
            client.loop_stop()
        else:
            write_to_report(f"Failed login with {client._username}:{client._password}")
    
    for username, password in itertools.product(usernames, passwords):
        client = mqtt.Client()
        client.username_pw_set(username, password)
        client.on_connect = on_connect_brute_force
        try:
            client.connect(target_ip, MQTT_PORT, 60)
            client.loop_start()
            client.loop_stop()
        except Exception as e:
            write_to_report(f"Error connecting with {username}:{password} - {e}")
    write_to_report("\n")

# Data Transmission Security Test
def data_transmission_security_test(target_ip):
    write_to_report("Data Transmission Security Test")
    write_to_report("-" * 50)
    client = mqtt.Client()
    def on_connect_ssl(client, userdata, flags, rc):
        if rc == 0:
            write_to_report("Connected to broker with SSL/TLS")
        else:
            write_to_report(f"Connection failed with code {rc}")
    client.tls_set(cert_reqs=ssl.CERT_NONE, tls_version=ssl.PROTOCOL_TLSv1_2)
    client.tls_insecure_set(True)
    client.on_connect = on_connect_ssl
    try:
        client.connect(target_ip, SSL_PORT, 60)
        client.loop_start()
        client.loop_stop()
    except Exception as e:
        write_to_report(f"Error connecting with SSL/TLS: {e}")
    write_to_report("\n")

# Main function to run all tests
def main():
    target_ip = BROKER
    
    write_to_report("Starting MQTT Security Audit")
    write_to_report("=" * 50 + "\n")
    
    network_scan(target_ip)
    authentication_test(target_ip)
    data_transmission_security_test(target_ip)
    
    write_to_report("MQTT Security Audit Completed")
    write_to_report("=" * 50 + "\n")

    print(f"Audit completed. Report saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
```

### How to Use the Script

1. **Save the Script:**
   Save the script to a file named `mqtt_audit.py`.

2. **Set Up the Environment:**
   Ensure you have the required libraries installed:
   ```sh
   pip install paho-mqtt nmap
   ```

3. **Run the Script:**
   Execute the script on your server:
   ```sh
   python mqtt_audit.py
   ```

4. **Review the Report:**
   After running the script, a detailed report will be generated and saved to `mqtt_audit_report.txt` in the same directory as the script.

