# Use MQTT to create an IoT device client  Azure IoT 

* Source: <https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt>

# Tutorial - Use MQTT to develop an IoT device client without using a device SDK

* Article
* 04/05/2024
* 2 contributors

Feedback

## In this article

1. [Prerequisites](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#prerequisites)
2. [Set up your environment](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#set-up-your-environment)
3. [Clone the sample repository](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#clone-the-sample-repository)
4. [Build the C samples](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#build-the-c-samples)
5. [Send telemetry](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#send-telemetry)
6. [Receive a cloud-to-device message](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#receive-a-cloud-to-device-message)
7. [Update a device twin](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#update-a-device-twin)
8. [Clean up resources](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#clean-up-resources)
9. [Next steps](https://learn.microsoft.com/en-us/azure/iot/tutorial-use-mqtt#next-steps)

Show 5 more

You should use one of the Azure IoT Device SDKs to build your IoT device clients if at all possible. However, in scenarios such as using a memory constrained device, you may need to use an MQTT library to communicate with your IoT hub.

The samples in this tutorial use the [Eclipse Mosquitto](http://mosquitto.org/) MQTT library.

In this tutorial, you learn how to:

* Build the C language device client sample applications.
* Run a sample that uses the MQTT library to send telemetry.
* Run a sample that uses the MQTT library to process a cloud-to-device message sent from your IoT hub.
* Run a sample that uses the MQTT library to manage the device twin on the device.

You can use either a Windows or Linux development machine to complete the steps in this tutorial.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) before you begin.



## Prerequisites



### Prepare your environment for the Azure CLI

* Use the Bash environment in [Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/overview). For more information, see [Quickstart for Bash in Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/quickstart).

  [![](https://learn.microsoft.com/en-us/azure/reusable-content/azure-cli/media/hdi-launch-cloud-shell.png)](https://shell.azure.com/)

* If you prefer to run CLI reference commands locally, [install](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) the Azure CLI. If you're running on Windows or macOS, consider running Azure CLI in a Docker container. For more information, see [How to run the Azure CLI in a Docker container](https://learn.microsoft.com/en-us/cli/azure/run-azure-cli-docker).

  * If you're using a local installation, sign in to the Azure CLI by using the [az login](https://learn.microsoft.com/en-us/cli/azure/reference-index#az-login) command. To finish the authentication process, follow the steps displayed in your terminal. For other sign-in options, see [Sign in with the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli).
  * When you're prompted, install the Azure CLI extension on first use. For more information about extensions, see [Use extensions with the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/azure-cli-extensions-overview).
  * Run [az version](https://learn.microsoft.com/en-us/cli/azure/reference-index?#az-version) to find the version and dependent libraries that are installed. To upgrade to the latest version, run [az upgrade](https://learn.microsoft.com/en-us/cli/azure/reference-index?#az-upgrade).



### Development machine prerequisites

If you're using Windows:

1. Install [Visual Studio (Community, Professional, or Enterprise)](https://visualstudio.microsoft.com/downloads). Be sure to enable the **Desktop development with C++** workload.
2. Install [CMake](https://cmake.org/download/). Enable the **Add CMake to the system PATH for all users** option.
3. Install the **x64 version** of [Mosquitto](https://mosquitto.org/download/).

If you're using Linux:

1. Run the following command to install the build tools:

   Bash Copy

   ```bash
   sudo apt install cmake g++
   ```

2. Run the following command to install the Mosquitto client library:

   Bash Copy

   ```bash
   sudo apt install libmosquitto-dev
   ```



## Set up your environment

If you don't already have an IoT hub, run the following commands to create a free-tier IoT hub in a resource group called `mqtt-sample-rg`. The command uses the name `my-hub` as an example for the name of the IoT hub to create. Choose a unique name for your IoT hub to use in place of `my-hub`:

Azure CLI Copy Open Cloud Shell

```azurecli
az group create --name mqtt-sample-rg --location eastus
az iot hub create --name my-hub --resource-group mqtt-sample-rg --sku F1 
```

Make a note of the name of your IoT hub, you need it later.

Register a device in your IoT hub. The following command registers a device called `mqtt-dev-01` in an IoT hub called `my-hub`. Be sure to use the name of your IoT hub:

Azure CLI Copy Open Cloud Shell

```azurecli
az iot hub device-identity create --hub-name my-hub --device-id mqtt-dev-01
```

Use the following command to create a SAS token that grants the device access to your IoT hub. Be sure to use the name of your IoT hub:

.NET CLI Copy

```dotnetcli
az iot hub generate-sas-token --device-id mqtt-dev-01 --hub-name my-hub --du 7200
```

Make a note of the SAS token the command outputs as you need it later. The SAS token looks like `SharedAccessSignature sr=my-hub.azure-devices.net%2Fdevices%2Fmqtt-dev-01&sig=%2FnM...sNwtnnY%3D&se=1677855761`

Tip

By default, the SAS token is valid for 60 minutes. The `--du 7200` option in the previous command extends the token duration to two hours. If it expires before you're ready to use it, generate a new one. You can also create a token with a longer duration. To learn more, see [az iot hub generate-sas-token](https://learn.microsoft.com/en-us/cli/azure/iot/hub#az-iot-hub-generate-sas-token).



## Clone the sample repository

Use the following command to clone the sample repository to a suitable location on your local machine:

Windows Command Prompt Copy

```cmd
git clone https://github.com/Azure-Samples/IoTMQTTSample.git
```

The repository also includes:

* A Python sample that uses the `paho-mqtt` library.
* Instructions for using the `mosquitto_pub` CLI to interact with your IoT hub.



## Build the C samples

Before you build the sample, you need to add the IoT hub and device details. In the cloned IoTMQTTSample repository, open the *mosquitto/src/config.h* file. Add your IoT hub name, device ID, and SAS token as follows. Be sure to use the name of your IoT hub:

C Copy

```c
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

#define IOTHUBNAME "my-hub"
#define DEVICEID   "mqtt-dev-01"
#define SAS_TOKEN  "SharedAccessSignature sr=my-hub.azure-devices.net%2Fdevices%2Fmqtt-dev-01&sig=%2FnM...sNwtnnY%3D&se=1677855761"

#define CERTIFICATEFILE CERT_PATH "IoTHubRootCA.crt.pem"
```

Note

The *IoTHubRootCA.crt.pem* file includes the CA root certificates for the TLS connection.

Save the changes to the *mosquitto/src/config.h* file.

To build the samples, run the following commands in your shell:

Bash Copy

```bash
cd mosquitto
cmake -Bbuild
cmake --build build
```

In Linux, the binaries are in the *./build* folder underneath the *mosquitto* folder.

In Windows, the binaries are in the *.\build\Debug* folder underneath the *mosquitto* folder.



## Send telemetry

The *mosquitto_telemetry* sample shows how to send a device-to-cloud telemetry message to your IoT hub by using the MQTT library.

Before you run the sample application, run the following command to start the event monitor for your IoT hub. Be sure to use the name of your IoT hub:

Azure CLI Copy Open Cloud Shell

```azurecli
az iot hub monitor-events --hub-name my-hub
```

Run the *mosquitto_telemetry* sample. For example, on Linux:

Bash Copy

```bash
./build/mosquitto_telemetry
```

The `az iot hub monitor-events` generates the following output that shows the payload sent by the device:

text Copy

```text
Starting event monitor, use ctrl-c to stop...
{
    "event": {
        "origin": "mqtt-dev-01",
        "module": "",
        "interface": "",
        "component": "",
        "payload": "Bonjour MQTT from Mosquitto"
    }
}
```

You can now stop the event monitor.



### Review the code

The following snippets are taken from the *mosquitto/src/mosquitto_telemetry.cpp* file.

The following statements define the connection information and the name of the MQTT topic you use to send the telemetry message:

C Copy

```c
#define HOST IOTHUBNAME ".azure-devices.net"
#define PORT 8883
#define USERNAME HOST "/" DEVICEID "/?api-version=2020-09-30"

#define TOPIC "devices/" DEVICEID "/messages/events/"
```

The `main` function sets the user name and password to authenticate with your IoT hub. The password is the SAS token you created for your device:

C Copy

```c
mosquitto_username_pw_set(mosq, USERNAME, SAS_TOKEN);
```

The sample uses the MQTT topic to send a telemetry message to your IoT hub:

C Copy

```c
int msgId  = 42;
char msg[] = "Bonjour MQTT from Mosquitto";

// once connected, we can publish a Telemetry message
printf("Publishing....\r\n");
rc = mosquitto_publish(mosq, &msgId, TOPIC, sizeof(msg) - 1, msg, 1, true);
if (rc != MOSQ_ERR_SUCCESS)
{
    return mosquitto_error(rc);
}
printf("Publish returned OK\r\n");
```

To learn more, see [Sending device-to-cloud messages](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub#sending-device-to-cloud-messages).



## Receive a cloud-to-device message

The *mosquitto_subscribe* sample shows how to subscribe to MQTT topics and receive a cloud-to-device message from your IoT hub by using the MQTT library.

Run the *mosquitto_subscribe* sample. For example, on Linux:

Bash Copy

```bash
./build/mosquitto_subscribe
```

Run the following command to send a cloud-to-device message from your IoT hub. Be sure to use the name of your IoT hub:

Azure CLI Copy Open Cloud Shell

```azurecli
az iot device c2d-message send --hub-name my-hub --device-id mqtt-dev-01 --data "hello world"
```

The output from *mosquitto_subscribe* looks like the following example:

text Copy

```text
Waiting for C2D messages...
C2D message 'hello world' for topic 'devices/mqtt-dev-01/messages/devicebound/%24.mid=d411e727-...f98f&%24.to=%2Fdevices%2Fmqtt-dev-01%2Fmessages%2Fdevicebound&%24.ce=utf-8&iothub-ack=none'
Got message for devices/mqtt-dev-01/messages/# topic
```



### Review the code

The following snippets are taken from the *mosquitto/src/mosquitto_subscribe.cpp* file.

The following statement defines the topic filter the device uses to receive cloud to device messages. The `#` is a multi-level wildcard:

C Copy

```c
#define DEVICEMESSAGE "devices/" DEVICEID "/messages/#"
```

The `main` function uses the `mosquitto_message_callback_set` function to set a callback to handle messages sent from your IoT hub and uses the `mosquitto_subscribe` function to subscribe to all messages. The following snippet shows the callback function:

C Copy

```c
void message_callback(struct mosquitto* mosq, void* obj, const struct mosquitto_message* message)
{
    printf("C2D message '%.*s' for topic '%s'\r\n", message->payloadlen, (char*)message->payload, message->topic);

    bool match = 0;
    mosquitto_topic_matches_sub(DEVICEMESSAGE, message->topic, &match);

    if (match)
    {
        printf("Got message for " DEVICEMESSAGE " topic\r\n");
    }
}
```

To learn more, see [Use MQTT to receive cloud-to-device messages](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub#receiving-cloud-to-device-messages).



## Update a device twin

The *mosquitto_device_twin* sample shows how to set a reported property in a device twin and then read the property back.

Run the *mosquitto_device_twin* sample. For example, on Linux:

Bash Copy

```bash
./build/mosquitto_device_twin
```

The output from *mosquitto_device_twin* looks like the following example:

text Copy

```text
Setting device twin reported properties....
Device twin message '' for topic '$iothub/twin/res/204/?$rid=0&$version=2'
Setting device twin properties SUCCEEDED.

Getting device twin properties....
Device twin message '{"desired":{"$version":1},"reported":{"temperature":32,"$version":2}}' for topic '$iothub/twin/res/200/?$rid=1'
Getting device twin properties SUCCEEDED.
```



### Review the code

The following snippets are taken from the *mosquitto/src/mosquitto_device_twin.cpp* file.

The following statements define the topics the device uses to subscribe to device twin updates, read the device twin, and update the device twin:

C Copy

```c
#define DEVICETWIN_SUBSCRIPTION  "$iothub/twin/res/#"
#define DEVICETWIN_MESSAGE_GET   "$iothub/twin/GET/?$rid=%d"
#define DEVICETWIN_MESSAGE_PATCH "$iothub/twin/PATCH/properties/reported/?$rid=%d"
```

The `main` function uses the `mosquitto_connect_callback_set` function to set a callback to handle messages sent from your IoT hub and uses the `mosquitto_subscribe` function to subscribe to the `$iothub/twin/res/#` topic.

The following snippet shows the `connect_callback` function that uses `mosquitto_publish` to set a reported property in the device twin. The device publishes the message to the `$iothub/twin/PATCH/properties/reported/?$rid=%d` topic. The `%d` value is incremented each time the device publishes a message to the topic:

C Copy

```c
void connect_callback(struct mosquitto* mosq, void* obj, int result)
{
    // ... other code ...  

    printf("\r\nSetting device twin reported properties....\r\n");

    char msg[] = "{\"temperature\": 32}";
    char mqtt_publish_topic[64];
    snprintf(mqtt_publish_topic, sizeof(mqtt_publish_topic), DEVICETWIN_MESSAGE_PATCH, device_twin_request_id++);

    int rc = mosquitto_publish(mosq, NULL, mqtt_publish_topic, sizeof(msg) - 1, msg, 1, true);
    if (rc != MOSQ_ERR_SUCCESS)

    // ... other code ...  
}
```

The device subscribes to the `$iothub/twin/res/#` topic and when it receives a message from your IoT hub, the `message_callback` function handles it. When you run the sample, the `message_callback` function gets called twice. The first time, the device receives a response from the IoT hub to the reported property update. The device then requests the device twin. The second time, the device receives the requested device twin. The following snippet shows the `message_callback` function:

C Copy

```c
void message_callback(struct mosquitto* mosq, void* obj, const struct mosquitto_message* message)
{
    printf("Device twin message '%.*s' for topic '%s'\r\n", message->payloadlen, (char*)message->payload, message->topic);

    const char patchTwinTopic[] = "$iothub/twin/res/204/?$rid=0";
    const char getTwinTopic[]   = "$iothub/twin/res/200/?$rid=1";

    if (strncmp(message->topic, patchTwinTopic, sizeof(patchTwinTopic) - 1) == 0)
    {
        // Process the reported property response and request the device twin
        printf("Setting device twin properties SUCCEEDED.\r\n\r\n");

        printf("Getting device twin properties....\r\n");

        char msg[] = "{}";
        char mqtt_publish_topic[64];
        snprintf(mqtt_publish_topic, sizeof(mqtt_publish_topic), DEVICETWIN_MESSAGE_GET, device_twin_request_id++);

        int rc = mosquitto_publish(mosq, NULL, mqtt_publish_topic, sizeof(msg) - 1, msg, 1, true);
        if (rc != MOSQ_ERR_SUCCESS)
        {
            printf("Error: %s\r\n", mosquitto_strerror(rc));
        }
    }
    else if (strncmp(message->topic, getTwinTopic, sizeof(getTwinTopic) - 1) == 0)
    {
        // Process the device twin response and stop the client
        printf("Getting device twin properties SUCCEEDED.\r\n\r\n");

        mosquitto_loop_stop(mosq, false);
        mosquitto_disconnect(mosq); // finished, exit program
    }
}
```

To learn more, see [Use MQTT to update a device twin reported property](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub#update-device-twins-reported-properties) and [Use MQTT to retrieve a device twin property](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub#retrieving-a-device-twins-properties).



## Clean up resources

If you plan to continue with more device developer articles, you can keep and reuse the resources you used in this article. Otherwise, you can delete the resources you created in this article to avoid more charges.

You can delete both the hub and registered device at once by deleting the entire resource group with the following Azure CLI command. Don't use this command if these resources are sharing a resource group with other resources you want to keep.

Azure CLI Copy Open Cloud Shell

```azurecli
az group delete --name <YourResourceGroupName>
```

To delete just the IoT hub, run the following command using Azure CLI:

Azure CLI Copy Open Cloud Shell

```azurecli
az iot hub delete --name <YourIoTHubName>
```

To delete just the device identity you registered with your IoT hub, run the following command using Azure CLI:

Azure CLI Copy Open Cloud Shell

```azurecli
az iot hub device-identity delete --hub-name <YourIoTHubName> --device-id <YourDeviceID>
```

You may also want to remove the cloned sample files from your development machine.



## Next steps

Now that you've learned how to use the Mosquitto MQTT library to communicate with IoT Hub, a suggested next step is to review:

[Communicate with your IoT hub using the MQTT protocol](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub)

[MQTT Application samples](https://github.com/Azure-Samples/MqttApplicationSamples)
