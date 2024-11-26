# Clause one


Enterprise MQTT Data Processing System
Author: AI Assistant
Version: 1.0
ISO Compliance: ISO/IEC 20922:2016 (MQTT), ISO/IEC 27001:2022 (Security)
Development Environment: VSCode + GitHub Copilot / PyCharm Pro
"""

import os
import json
import logging
import uuid
from datetime import datetime
from typing import Dict, List, Optional, Union
import paho.mqtt.client as mqtt
import duckdb
from dataclasses import dataclass

# Configuration and Schema Definitions


```
@dataclass
class MQTTConfig:
    """Enterprise MQTT Configuration"""
    broker_host: str
    broker_port: int
    username: str
    password: str
    topics: List[str]
    qos: int = 1
    client_id: str = f"enterprise_mqtt_client_{uuid.uuid4()}"

@dataclass
class DatabaseConfig:
    """Enterprise Database Configuration"""
    db_path: str
    max_memory: str = "32GB"
    threads: str = "auto"
    custom_user_agent: str = "EnterpriseIoT/2.0"

class EnterpriseLogger:
    """Enterprise-grade logging system"""
    def __init__(self, log_path: str = "logs"):
        self.log_path = log_path
        os.makedirs(log_path, exist_ok=True)
        
        # Configure logging
        self.logger = logging.getLogger("EnterpriseLogger")
        self.logger.setLevel(logging.INFO)
        
        # File handler for persistent logging
        file_handler = logging.FileHandler(
            os.path.join(log_path, f"mqtt_processing_{datetime.now().strftime('%Y%m%d')}.log")
        )
        file_handler.setFormatter(
            logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        )
        self.logger.addHandler(file_handler)
        
        # Console handler for development
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(
            logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        )
        self.logger.addHandler(console_handler)

class DatabaseHandler:
    """Enterprise database management system"""
    def __init__(self, config: DatabaseConfig, logger: EnterpriseLogger):
        self.config = config
        self.logger = logger.logger
        self.conn = self._initialize_connection()
        self._create_schema()

    def _initialize_connection(self) -> duckdb.DuckDBPyConnection:
        """Initialize DuckDB connection with enterprise configuration"""
        try:
            conn = duckdb.connect(
                database=self.config.db_path,
                config={
                    'allow_unsigned_extensions': True,
                    'max_memory': self.config.max_memory,
                    'threads': self.config.threads,
                    'custom_user_agent': self.config.custom_user_agent
                }
            )
            self.logger.info(f"Successfully connected to database: {self.config.db_path}")
            return conn
        except Exception as e:
            self.logger.error(f"Database connection failed: {str(e)}")
            raise

    def _create_schema(self) -> None:
        """Create enterprise-grade MQTT message schema"""
        try:
            self.conn.execute("""
            CREATE TABLE IF NOT EXISTS mqtt_messages (
                message_id UUID PRIMARY KEY,
                topic_name VARCHAR NOT NULL,
                payload JSON,
                received_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                qos INTEGER CHECK (qos IN (0, 1, 2)),
                retain_flag BOOLEAN DEFAULT FALSE,
                processing_status VARCHAR DEFAULT 'new',
                validation_status BOOLEAN DEFAULT FALSE,
                error_details VARCHAR,
                CONSTRAINT valid_json CHECK (json_valid(payload))
            );
            
            CREATE INDEX IF NOT EXISTS idx_mqtt_topic 
            ON mqtt_messages(topic_name);
            
            CREATE INDEX IF NOT EXISTS idx_mqtt_timestamp 
            ON mqtt_messages(received_timestamp);
            """)
            self.logger.info("Database schema created successfully")
        except Exception as e:
            self.logger.error(f"Schema creation failed: {str(e)}")
            raise

    def store_message(self, topic: str, payload: str, qos: int, retain: bool) -> None:
        """Store MQTT message with proper validation"""
        try:
            # Validate JSON payload
            json_payload = json.loads(payload)
            
            self.conn.execute("""
            INSERT INTO mqtt_messages (
                message_id, topic_name, payload, qos, retain_flag, 
                validation_status
            ) VALUES (?, ?, ?, ?, ?, ?)
            """, (
                uuid.uuid4(), topic, json.dumps(json_payload), qos, 
                retain, True
            ))
            self.logger.info(f"Message stored successfully for topic: {topic}")
        except json.JSONDecodeError as e:
            self.logger.error(f"Invalid JSON payload: {str(e)}")
            self._store_error_message(topic, payload, str(e))
        except Exception as e:
            self.logger.error(f"Message storage failed: {str(e)}")
            self._store_error_message(topic, payload, str(e))

    def _store_error_message(self, topic: str, payload: str, error: str) -> None:
        """Store failed message with error details"""
        try:
            self.conn.execute("""
            INSERT INTO mqtt_messages (
                message_id, topic_name, payload, validation_status, 
                error_details
            ) VALUES (?, ?, ?, ?, ?)
            """, (uuid.uuid4(), topic, payload, False, error))
        except Exception as e:
            self.logger.error(f"Error message storage failed: {str(e)}")

class MQTTHandler:
    """Enterprise MQTT message handler"""
    def __init__(self, mqtt_config: MQTTConfig, db_handler: DatabaseHandler, 
                 logger: EnterpriseLogger):
        self.mqtt_config = mqtt_config
        self.db_handler = db_handler
        self.logger = logger.logger
        self.client = self._initialize_client()

    def _initialize_client(self) -> mqtt.Client:
        """Initialize MQTT client with enterprise configuration"""
        client = mqtt.Client(self.mqtt_config.client_id)
        client.username_pw_set(self.mqtt_config.username, self.mqtt_config.password)
        client.on_connect = self._on_connect
        client.on_message = self._on_message
        client.on_disconnect = self._on_disconnect
        return client

    def _on_connect(self, client: mqtt.Client, userdata: Dict, 
                   flags: Dict, rc: int) -> None:
        """Handle MQTT connection events"""
        if rc == 0:
            self.logger.info("Connected to MQTT broker successfully")
            for topic in self.mqtt_config.topics:
                client.subscribe(topic, qos=self.mqtt_config.qos)
                self.logger.info(f"Subscribed to topic: {topic}")
        else:
            self.logger.error(f"Connection failed with code: {rc}")

    def _on_message(self, client: mqtt.Client, userdata: Dict, 
                   message: mqtt.MQTTMessage) -> None:
        """Process incoming MQTT messages"""
        self.logger.debug(
            f"Received message on {message.topic}: {message.payload.decode()}"
        )
        self.db_handler.store_message(
            message.topic,
            message.payload.decode(),
            message.qos,
            message.retain
        )

    def _on_disconnect(self, client: mqtt.Client, userdata: Dict, 
                      rc: int) -> None:
        """Handle MQTT disconnection events"""
        self.logger.warning(f"Disconnected with code: {rc}")
        if rc != 0:
            self.logger.info("Attempting to reconnect...")
            self.start()

    def start(self) -> None:
        """Start MQTT client with error handling"""
        try:
            self.client.connect(
                self.mqtt_config.broker_host,
                self.mqtt_config.broker_port
            )
            self.client.loop_start()
        except Exception as e:
            self.logger.error(f"MQTT client start failed: {str(e)}")
            raise

class EnterpriseApp:
    """Main enterprise application class"""
    def __init__(self, mqtt_config: MQTTConfig, db_config: DatabaseConfig):
        self.logger = EnterpriseLogger()
        self.db_handler = DatabaseHandler(db_config, self.logger)
        self.mqtt_handler = MQTTHandler(mqtt_config, self.db_handler, self.logger)

    def start(self) -> None:
        """Start the enterprise application"""
        try:
            self.logger.logger.info("Starting Enterprise MQTT Processing System")
            self.mqtt_handler.start()
        except Exception as e:
            self.logger.logger.error(f"Application start failed: {str(e)}")
            raise

```
# Example usage
if __name__ == "__main__":
    # Load configuration from environment or config file
    mqtt_config = MQTTConfig(
        broker_host="localhost",
        broker_port=1883,
        username="enterprise_user",
        password="enterprise_password",
        topics=["enterprise/sensors/#"]
    )
    
    db_config = DatabaseConfig(
        db_path="enterprise_mqtt.db"
    )
    
    # Initialize and start the application
    app = EnterpriseApp(mqtt_config, db_config)
    app.start()
    
    # Keep the application running
    try:
        input("Press Enter to exit\n")
    except KeyboardInterrupt:
        print("Shutting down...")
    finally:
        app.mqtt_handler.client.loop_stop()





No I’m pulling the packers next to other brokers in our company they are storing the data and I’m just collecting a second copy for independent analasys so I can build a second data source using rill and duckdb and I want you to build the local solution as this Matt packets are battery data id like to be able to display and quiry data with rill



