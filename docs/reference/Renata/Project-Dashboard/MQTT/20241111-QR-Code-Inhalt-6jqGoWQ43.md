# QR-Code-Inhalt

QR-Code für jede Batterie generieren und sicherstellen, dass die `itemId` als eindeutige Kennung sowohl im QR-Code als auch in den MQTT-Nachrichten genutzt wird.

Python-Code, der den QR-Code mit der `itemId` generiert und die entsprechende MQTT-Nachricht formatiert:

### 1. QR-Code-Generierung mit `itemId`

Dieser Code generiert den QR-Code basierend auf den JSON-Daten und speichert ihn als PNG-Datei:

```python
import qrcode
import json
import time

# MQTT-Nachricht
order_id = "123456789012345"          # Fertigungsauftragsnummer
item_id = 568456874458                # Batterie-ID

# JSON-Daten, die in den QR-Code eingefügt werden
data = {
    "orderId": order_id,
    "itemId": item_id,
    "inspection1": {
        "limitMax": 0,
        "limitMin": 0,
        "value": 0,
        "uom": "%",
        "result": True,
        "timestamp": int(time.time() * 1000)  # aktueller Zeitstempel in Millisekunden
    }
}

# QR-Code aus JSON-Daten generieren
qr = qrcode.make(json.dumps(data))
qr_path = f"battery_qr_{item_id}.png"
qr.save(qr_path)
print(f"QR-Code gespeichert als {qr_path}")
```

### 2. Erstellung der MQTT-Nachricht

# Diese Struktur kann direkt an einem MQTT-Broker gesendet werden: needs fixing

```python
import paho.mqtt.client as mqtt

# MQTT-Broker-Konfiguration
broker = "your-mqtt-broker-url"  # URL des MQTT-Brokers
port = 1883                      # MQTT-Port (oder 8883 für TLS)
topic = f"RenataBatteriesSA/Itingen/ASA/inspection-results"

# MQTT-Nachricht basierend auf den gleichen Daten wie im QR-Code
mqtt_message = {
    "orderId": order_id,
    "itemId": item_id,
    "inspection1": {
        "limitMax": 0,
        "limitMin": 0,
        "value": 0,
        "uom": "%",
        "result": True,
        "timestamp": int(time.time() * 1000)
    }
}

# MQTT-Verbindung herstellen und Nachricht senden
client = mqtt.Client()
client.connect(broker, port)
client.publish(topic, json.dumps(mqtt_message))
client.disconnect()
print(f"MQTT-Nachricht an {topic} gesendet: {json.dumps(mqtt_message)}")
```

### Erklärungen
# 1. **QR-Code-Generierung**: Der `data`-Dictionary enthält die gleiche `itemId` und relevante Inspektionsdaten. Der QR-Code wird als Bild gespeichert und kann auf die Batterie gelasert oder gedruckt werden.eeds fixing
2. **MQTT-Nachricht senden**: Die `mqtt_message` enthält dieselbe `itemId`, die als Referenz zum QR-Code dient. Diese Nachricht wird über den `paho-mqtt`-Client an den Broker gesendet.

### Voraussetzungen
- Die Bibliotheken `qrcode` und `paho-mqtt` müssen installiert sein:
  ```bash
  pip install qrcode[pil] paho-mqtt
  ```
  
Mit diesem Setup sind die `itemId` im QR-Code und der MQTT-Nachricht verknüpft und konsistent.