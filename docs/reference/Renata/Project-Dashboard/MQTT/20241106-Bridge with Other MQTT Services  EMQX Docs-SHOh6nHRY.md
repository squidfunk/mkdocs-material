# Bridge with Other MQTT Services | EMQX Docs



# Bridge with Other MQTT Services [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#bridge-with-other-mqtt-services)

MQTT Broker data integration provides EMQX with functionality to connect to another EMQX cluster or another MQTT service for message bridge, enabling cross-network, cross-service data interaction and communication. This page introduces the working principle of the MQTT message bridge in EMQX and offers practical guidance on creating and verifying message bridges.

## How It Works [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#how-it-works)

During bridging, EMQX establishes an MQTT connection with the target service as a client, achieving bidirectional message transmission through the publish-subscribe model:

* Outgoing Messages (Sink): Publishes messages from local topics to specified topics on the remote MQTT service.
* Incoming Messages (Source): Subscribes to topics on the remote MQTT service and forwards their messages to EMQX locally.

EMQX supports configuring multiple bridging rules on the same connection, each with different topic mappings and message transformation rules, implementing a function similar to message routing. During bridging, you can also process messages through the Rule Engine to filter, enrich, and transform messages before forwarding.

The diagram below shows a typical architecture of data integration between EMQX and other MQTT services:

![EMQX Integration MQTT](https://docs.emqx.com/assets/emqx-integration-mqtt.GWErCFWR.png)

## Features and Benefits [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#features-and-benefits)

#### The MQTT Broker data integration has the following features and benefits:

* **Extensive Compatibility**: It uses the standard MQTT protocol, allowing it to bridge to various IoT platforms, including AWS IoT Core, Azure IoT Hubs, and also supports open-source or other industry MQTT brokers and IoT platforms. This enables seamless integration and communication with a variety of devices and platforms.
* **Bidirectional Data Flow**: It supports bidirectional data flow, enabling the publishing of messages from EMQX locally to remote MQTT services, and also subscribing to messages from MQTT services and publishing them locally. This bidirectional communication capability makes data transfer between different systems more flexible and controllable.
* **Flexible Topic Mapping**: Based on the MQTT publish-subscribe model, the MQTT broker data integration implements flexible topic mapping. It supports adding prefixes to topics and dynamically constructing topics using the client's contextual information (such as client ID, username, etc.). This flexibility allows for customized processing and routing of messages according to specific needs.
* **High Performance**: It offers performance optimization options like connection pooling and shared subscriptions to reduce the load on individual bridging clients, achieving lower bridging latency and higher message throughput. These optimization measures enhance the overall system performance and scalability.
* **Payload Transformation**: It allows for the processing of message payloads by defining SQL rules. This means that during message transmission, operations such as data extraction, filtering, enrichment, and transformation can be performed on the payload. For example, real-time metrics can be extracted from the payload and transformed and processed before the message is delivered to the remote MQTT Broker.
* **Metrics Monitoring**: The runtime metrics monitoring is provided for each Sink/Source. It allows viewing of total message count, success/failure counts, current rates, etc., helping users to monitor and assess the performance and health of the Sink/Source in real-time.

## Prepare MQTT Connection Information [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#prepare-mqtt-connection-information)

Prerequisites

Make sure you know the following:

* [Rule Engine](https://docs.emqx.com/en/emqx/latest/data-integration/rules.html)
* [Data Integration](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridges.html)

Before creating an MQTT Broker data integration, you need to obtain the connection information for the remote MQTT service, including:

* **MQTT Service Address**: The address and port of the target MQTT service, for example, `broker.emqx.io:1883`.
* **Username**: The username required for the connection. If the target service does not require authentication, this can be left blank.
* **Password**: The password required for the connection. If the target service does not require authentication, this can also be left blank.
* **Protocol Type**: It is important to determine whether the target service has enabled TLS and whether it is using MQTT over TCP/TLS protocol. Note that the EMQX MQTT bridge currently does not support protocols like MQTT over WebSocket and MQTT over QUIC.
* **Protocol Version**: The protocol version used by the target MQTT service. EMQX supports MQTT 3.1, 3.1.1, and MQTT 5.0.

The data integration provides good compatibility and support for EMQX or other standard MQTT servers. If you need to connect to other types of MQTT services, you can refer to their relevant documentation to obtain the connection information. Generally, most IoT platforms provide standard MQTT access methods, and you can convert device information into the aforementioned MQTT connection information based on their guidance.

Note

When EMQX is running in cluster mode or when a connection pool is enabled, using the same client ID to connect multiple nodes to the same MQTT service usually leads to device conflicts. Therefore, the MQTT message bridge currently does not support setting a fixed client ID.

## Create a Connector [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#create-a-connector)

This section guides you on how to configure a connection with a remote MQTT server, using EMQX's [online MQTT server](https://www.emqx.com/en/mqtt/public-mqtt5-broker) as an example.

1. Go to the **Integration** -> **Connector** page on the Dashboard.

2. Click **Create** at the top right corner of the page.

3. Select **MQTT Broker** from the list of connector types and click **Next**.

4. Enter a **name** for the connector, which must be a combination of upper/lower case letters and numbers, for example, `my_mqtt_bridge`.

5. Configure the connection information:

   * **MQTT Broker**: Only supports MQTT over TCP/TLS. Set this to `broker.emqx.io:1883`.
   * **ClientID Prefix**: This can be left blank. In actual use, specifying a client ID prefix can facilitate client management. EMQX will automatically generate client IDs based on the client ID prefix and the size of the connection pool.
   * **Username** and **Password**: These can be left blank, as authentication is not required for this server.

Leave the other configurations as default and click the **Create** button to complete the creation of the Connector. The Connector can be used for both Sink and Source. Next, you can create data bridge rules based on this Connector.

### Connection Pool and Client ID Generation Rules [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#connection-pool-and-client-id-generation-rules)

EMQX enables multiple clients to simultaneously connect to the bridged MQTT service. When creating a Connector, you can set up an MQTT client connection pool and configure its size to indicate the number of client connections in the pool. The connection pool maximizes server resources for greater message throughput and better concurrent performance, which is crucial for handling high-load, high-concurrency scenarios.

As the MQTT protocol requires clients connected to an MQTT server to have a unique client ID, and since EMQX can be deployed in a cluster, each client in MQTT bridging is assigned a unique client ID. EMQX automatically generates client IDs according to the following pattern:

bash

```bash
[Client ID Prefix]:{Connector Name}{8-digit Random String}:{Connection Sequence Number in the Pool}
```

For example, if the client ID prefix is `myprefix` and the Connector name is `foo`, an actual client ID might be:

bash

```bash
myprefix:foo2bd61c44:1
```

Starting from version 5.4.1, EMQX has limited the MQTT client ID length to 23 bytes. If the client ID exceeds this length, it will be replaced with a hashed value. This can result in a poor user experience when the prefix or connector name is too long.

To address this issue, from version 5.7.1 onwards, EMQX has implemented the following rules:

* **No prefix**: Behavior remains unchanged; EMQX will hash the long (> 23 bytes) client ID into a 23-byte space.

* **With prefix**:

  * **Prefix up to 19 bytes**: The prefix is preserved, and the remainder of the client ID is hashed into a 4-byte space capping the length within 23 bytes.
  * **Prefix of 20 bytes or more**: EMQX will use the configured prefix, and no longer attempts to shorten the client ID.

## Create a Rule with MQTT Broker Sink [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#create-a-rule-with-mqtt-broker-sink)

This section demonstrates how to create a rule for specifying data to be forwarded to a remote MQTT service.

1. Go to the Dashboard **Integration** -> **Rules** page.

2. Click **Create** at the top right of the page.

3. Enter the rule ID `my_rule`.

4. In the **SQL Editor**, enter the rule to store MQTT messages from the `t/#` topic to the remote MQTT server. The rule SQL is as follows:

   **sql**

   ```sql
   SELECT
     *
   FROM
     "t/#"
   ```

5. Add an action by selecting `MQTT Broker` from the **Action Type** dropdown list. Keep the **Action** dropdown as the default `Create Action` option. This demonstration creates a new Sink and adds it to the rule.

6. Enter the name and description for the Sink in the form below.

7. Select the `my_mqtt_bridge` connector you just created from the **Connector** dropdown. You can also create a new connector by clicking the create button next to the dropdown, using the configuration parameters in [Create a Connector](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#create-a-connector).

8. Configure the Sink information for publishing messages from EMQX to the external MQTT service:

   * **Topic**: The topic to publish to the external MQTT service, supporting `${var}` placeholders. Enter `pub/${topic}` here, meaning the original topic will be prefixed with `pub/` for forwarding. For example, if the original message topic is `t/1`, the topic forwarded to the external MQTT service will be `pub/t/1`.
   * **QoS**: The QoS for message publishing. Select from the dropdown options: `0`, `1`, `2`, or `${qos}`, or enter a placeholder to set QoS from another field. Here, select `${qos}` to follow the QoS of the original message.
   * **Retain**: Select `true`, `false`, or `${flags.retain}` to decide whether to publish the message as retained, or enter a placeholder to set the retain flag from other fields. Here, select `${flags.retain}` to follow the retain flag of the original message.
   * **Payload**: The template used to generate the payload for the forwarded message. Leave blank by default, which means forwarding the rule output result. Here, you can enter `${payload}` to forward only the payload.

9. Use default values for other configurations and click the **Create** button to complete the creation of the Sink. Once created, you will be directed back to the Create Rule page, and the new Sink will be added to the Action Outputs of the rule.

10. On the Create Rule page, click the **Create** button at the bottom to complete the rule creation.

You have now successfully created the rule. You can see the newly created rule on the **Integration** -> **Rules** page. Click the **Actions(Sink)** tab and you can see the new MQTT Broker Sink.

You can also click **Integration** -> **Flow Designer** to view the topology. The topology visually represents how messages under the topic `t/#` are sent to the remote MQTT Broker after being processed by the rule `my_rule`.

## Test the Rule with MQTT Broker Sink [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#test-the-rule-with-mqtt-broker-sink)

You can use the [MQTTX CLI](https://mqttx.app/zh/cli) to test the Rule for bridging messages published from the `t/#` topic in EMQX to the `pub/${topic}` topic in the external MQTT service. By publishing a message to `t/1` topic in EMQX, the message should be forwarded to the `pub/t/1` topic in the external MQTT service.

1. Subscribe to the `pub/#` topic in the external MQTT Service:

   bash

   ```bash
   mqttx sub -t pub/# -q 1 -h broker.emqx.io -v
   ```

2. Publish a message to the `t/1` topic using MQTTX:

   bash

   ```bash
   mqttx pub -t t/1 -m "hello world" -r
   ```

3. You can subscribe to the `pub/t/1` topic in MQTTX to receive the message, indicating that the message has been successfully forwarded from EMQX to the external MQTT service:

   bash

   ```bash
   [2024-1-31] [16:43:13] › topic: pub/t/1
   payload: hello world
   ```

4. Repeat Step 1, and you should see the retained message from the `pub/t/1` topic in MQTTX:

   bash

   ```bash
   [2024-1-31] [16:44:29] › topic: pub/t/1
   payload: hello world
   retain: true
   ```

## Create a Rule with MQTT Broker Source [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#create-a-rule-with-mqtt-broker-source)

This section demonstrates how to create a rule for forwarding data from a remote MQTT service to the local EMQX. You need to create an MQTT Source and a message republish action to achieve a subscription from the remote MQTT service to EMQX and forward the subscribed data.

### Create MQTT Broker Source and Add It to Rule [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#create-mqtt-broker-source-and-add-it-to-rule)

1. Go to the Dashboard **Integration** -> **Rules** page.

2. Click **Create** in the top right corner of the page.

3. Enter the rule ID `my_rule_source`.

4. Configure the trigger source (data input) for the rule. On the right side of the page, under the **Data Inputs** tab, delete the default **Message** type input and click **Add Input** to create an MQTT Source.

5. In the **Add Input** popup, select `MQTT Broker` from the **Input Type** dropdown, and keep the Source dropdown at the default `Create Source` option. This demonstration creates a new Source and adds it to the rule.

6. Enter a name and description for the Source in the form below.

7. Select the previously created `my_mqtt_bridge` Connector from the dropdown. Alternatively, you can create a new Connector by clicking the create button next to the dropdown box, using the configuration parameters in [Create a Connector](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#create-a-connector).

8. Configure the Source information to complete the subscription from the external MQTT service to EMQX:

   * **Topic**: The subscription topic, supporting the use of `+` and `#` wildcards.

     TIP

     When EMQX is running in cluster mode or the Connector is configured with a connection pool, shared subscriptions must be used to avoid duplicate messages.

     Here you can enter `$share/1/f/#`, indicating a subscription to all messages matching the `f/#` topic.

   * **QoS**: The subscription QoS, select `0` or `1` from the dropdown.

9. Use the default settings for other configurations and click the **Create** button to complete the Source creation, adding the Source to the rule data input. You will also notice that the rule SQL has changed to:

   sql

   ```sql
   SELECT
     *
   FROM
     "$bridges/mqtt:my_source"
   ```

   The rule SQL can extract the following fields from the MQTT Source, and you can adjust the SQL for data processing operations. The default SQL is sufficient for this example.

   | Field Name                    | Description                                                                                              |
   | ----------------------------- | -------------------------------------------------------------------------------------------------------- |
   | topic                         | Originating message topic                                                                                |
   | server                        | Server address of the connected Source                                                                   |
   | retain                        | Whether the message is a retained message, value is false                                                |
   | qos                           | Message Quality of Service                                                                               |
   | pub_props                     | MQTT 5.0 message properties object, including user property pairs, user properties, and other attributes |
   | pub_props.User-Property-Pairs | Array of user property pairs, each containing a key-value pair, e.g., `{"key":"foo", "value":"bar"}`     |
   | pub_props.User-Property       | User property object, containing a key-value pair, e.g., `{"foo":"bar"}`                                 |
   | pub_props.*                   | Other included message property key-value pairs, e.g., `Content-Type: JSON`                              |
   | payload                       | Message content                                                                                          |
   | message_received_at           | Message reception timestamp, in milliseconds                                                             |
   | id                            | Message ID                                                                                               |
   | dup                           | Whether the message is a duplicate                                                                       |

Now you have completed the creation of the MQTT Source, but the subscribed data will not be directly published to EMQX locally. Next, you to create a message republish action to forward the messages subscribed by the Source to EMQX locally.

### Create a Republish Action [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#create-a-republish-action)

1. Configure the rule action by switching to the **Action Outputs** tab on the right side of the Create Rule page and clicking the **Add Action** button. Select the `Republish` action from the **Type of Action** dropdown list.

2. Configure the following fields for message republish:

   * **Topic**: Enter `sub/${topic}`, which means adding a `sub/` prefix to the original topic for forwarding. For example, when the original message topic is `f/1`, the topic forwarded to EMQX will be `sub/f/1`.

   * **QoS**: Select from `0`, `1`, `2`, or `${qos}`. You can also use placeholders to set QoS from other fields. Here, select `${qos}` to follow the QoS of the original message.

   * **Retain**: Select `true` or `false` to confirm whether to publish the message as a retained message. You can also use placeholders to set the retain flag from other fields. In this case, you can select `false`.

     * Since the data source is MQTT Source, the `${flags.retain}` option is not applicable here.
     * You can also enter `${retain}` to follow the retain flag of the original message, but it only works when the message is retained through the external MQTT service's retention mechanism, not when the original message is published to EMQX locally.

   * **Payload**: Used to generate the payload of the forwarded message. Leave it blank by default to forward the rule output result. Here, you can enter `${payload}` to only forward the Payload.

3. Click the **Add** button to complete the action creation. You will be directed back to the Create Rule page and the new action will be added under the **Action Outputs** tab.

4. On the Create Rule page, click the **Create** button at the bottom to complete the rule creation.

Now you have successfully created the rule. You can go to **Integration** -> **Rules** to see the newly created rule, and on the **Source** tab, you can see the newly created MQTT Source.

You can also click **Integration** -> **Flow Designer** to view the topology. From the topology, you can see that the messages from MQTT Source are republished to `sub/${topic}` through the republish action.

## Test the Rule with MQTT Broker Source [​](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridge-mqtt.html#test-the-rule-with-mqtt-broker-source)

You can use [MQTTX CLI](https://mqttx.app/zh/cli) to test the configured rule for bridging messages from the `f/#` topic in the external MQTT service to the `sub/${topic}` topic in EMQX. By publishing a message to the `f/1` topic in the external MQTT service, it should be forwarded to the `sub/f/1` topic in EMQX

1. Subscribe to the EMQX `sub/#` topic:

   bash

   ```bash
   mqttx sub -t sub/# -q 1 -v
   ```

2. Use MQTTX to publish a message to the `f/1` topic in the external MQTT service:

   bash

   ```bash
   mqttx pub -t f/1 -m "I'm from broker.emqx.io" -r -h broker.emqx.io
   ```

3. You can see the message published to the `sub/f/1` topic in MQTTX, indicating that the message has been successfully forwarded from the external MQTT service to EMQX:

   bash

   ```bash
   [2024-1-31] [16:49:22] › topic: sub/f/1
   payload: I'm from broker.emqx.io
   ```
