# Tail to dara

To build an app that continuously pulls data from your EMQX broker, stores it in DuckDB, and can be accessed or processed later, follow these steps to structure and implement the app:

Project Structure

1. App Directory

mqtt_data_app/
├── app.py
├── mqtt_handler.py
├── db_handler.py
├── requirements.txt
└── config.json



Step-by-Step Implementation

1. requirements.txt:

List the dependencies needed for the app.

paho-mqtt
duckdb
jsonschema  # For validating configurations (optional)

2. config.json:

Store your configuration settings like broker details and topics.

{
    "broker_ip": "tailscale_ip_of_emqx_broker",
    "broker_port": 1883,
    "username": "your_username",
    "password": "your_password",
    "topics": ["your/topic"],
    "db_path": "mqtt_data.db"
}

3. mqtt_handler.py:

Define the MQTT client functionality.

import paho.mqtt.client as mqtt
import json
from db_handler import store_message

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to EMQX broker")
        for topic in userdata['topics']:
            client.subscribe(topic)
    else:
        print("Failed to connect, return code:", rc)

def on_message(client, userdata, msg):
    payload = msg.payload.decode()
    print(f"Received message on {msg.topic}: {payload}")
    store_message(userdata['db_path'], msg.topic, payload)

def start_mqtt_client(config):
    client = mqtt.Client("EMQX_App_Client")
    client.on_connect = on_connect
    client.on_message = on_message
    client.user_data_set(config)

    client.username_pw_set(config['username'], config['password'])
    client.connect(config['broker_ip'], config['broker_port'], 60)
    client.loop_start()

4. db_handler.py:

Define functions to interact with DuckDB.

import duckdb

def init_db(db_path):
    conn = duckdb.connect(db_path)
    conn.execute('''
    CREATE TABLE IF NOT EXISTS mqtt_messages (
        topic STRING,
        payload STRING,
        received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    conn.close()

def store_message(db_path, topic, payload):
    conn = duckdb.connect(db_path)
    conn.execute("INSERT INTO mqtt_messages (topic, payload) VALUES (?, ?)", (topic, payload))
    conn.close()

5. app.py:

Main entry point to initialize the database and start the MQTT client.

import json
from mqtt_handler import start_mqtt_client
from db_handler import init_db

# Load configuration
with open('config.json') as config_file:
    config = json.load(config_file)

# Initialize the database
init_db(config['db_path'])

# Start the MQTT client
start_mqtt_client(config)

# Keep the app running
try:
    while True:
        pass  # Replace with better event handling if needed
except KeyboardInterrupt:
    print("Stopping the app.")

Running the App

1. Install Dependencies: Run this command in your project directory:

pip install -r requirements.txt


2. Start the App: Run the main app script:

python app.py



Next Steps

Enhance Security: Configure TLS for secure communication with EMQX if needed.

Data Analysis: Use DuckDB's SQL capabilities to query and process the data.

Integrate with Rill: Point Rill to mqtt_data.db for real-time visualization and analysis.


This app will continuously pull data from your EMQX broker, store it in DuckDB, and be ready for visualization or further analysis in Rill.

