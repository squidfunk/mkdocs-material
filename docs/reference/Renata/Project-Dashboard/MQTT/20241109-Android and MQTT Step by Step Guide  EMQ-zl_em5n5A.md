# Android and MQTT: Step by Step Guide | EMQ

[MQTT](https://www.emqx.com/en/blog/the-easiest-guide-to-getting-started-with-mqtt) is a lightweight and flexible protocol for exchanging IoT messages and delivering data. It is used to achieve a balance between flexibility and hardware/internet resources for IoT developers.

[Kotlin](https://kotlinlang.org/) is a programming language developed by JetBrains. Kotlin is based on the JVM, so developers can easily use it for Android development, and it supports mixed writing of Kotlin and Java.

This article mainly introduces how to use Kotlin in the Android platform for using MQTT.

## Project Initialization

Open Android Studio, create a new project, select Kotlin as the language, and then Android Studio will automatically create the related configurations to Kotlin. If you need to configure the existing projects, can refer to [Add Kotlin to an existing app](https://developer.android.com/kotlin/add-kotlin).

### Add dependency

Open `build.gradle` of the project, add dependencies [Eclipse Paho Java Client](https://www.eclipse.org/paho/clients/java/) and [Eclipse Paho Android Service](https://www.eclipse.org/paho/clients/android/) to the section `dependencies`.

```groovy
dependencies {
    implementation 'org.eclipse.paho:org.eclipse.paho.client.mqttv3:1.2.4'
    implementation 'org.eclipse.paho:org.eclipse.paho.android.service:1.1.1' 
}
```

### Configure `AndroidManifest.xml`

Android Service is a backend service, based on Android and developed by Eclipse. We need to register it to the file AndroidManifest.xml. Meanwhile, we also need to register the permission.

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application
   ...
   <service android:name="org.eclipse.paho.android.service.MqttService" />
</application>
```

## Using MQTT

### Create MQTT client

```kotlin
private lateinit var mqttClient: MqttAndroidClient
// TAG
companion object {
    const val TAG = "AndroidMqttClient"
}
```

### Connect to the MQTT broker

This article will use the [MQTT broker](https://www.emqx.com/en/mqtt/public-mqtt5-broker) which is operated and maintained by EMQX [MQTT Cloud](https://www.emqx.com/en/cloud). EMQX Cloud is the MQTT IoT cloud service platform released by [EMQ](https://www.emqx.com/en), it provides the service for accessing **MQTT 5.0** with all-in-one operation and maintenance and unique isolation environment.

* Broker: **broker.emqx.io**
* TCP Port: **1883**
* Websocket Port: **8083**

![Open Manufacturing Hub](https://assets.emqx.com/images/b4cff1e553053873a87c4fa8713b99bc.png)

A Practical Guide to MQTT Broker Selection

Download this practical guide and learn what to consider when choosing an MQTT broker.

[Get the eBook →](https://www.emqx.com/en/resources/a-practical-guide-to-mqtt-broker-selection?utm_campaign=embedded-a-practical-guide-to-mqtt-broker-selection\&from=blog-android-connects-mqtt-using-kotlin)

```kotlin
fun connect(context: Context) {
        val serverURI = "tcp://broker.emqx.io:1883"
        mqttClient = MqttAndroidClient(context, serverURI, "kotlin_client")
        mqttClient.setCallback(object : MqttCallback {
            override fun messageArrived(topic: String?, message: MqttMessage?) {
                Log.d(TAG, "Receive message: ${message.toString()} from topic: $topic")
            }

            override fun connectionLost(cause: Throwable?) {
                Log.d(TAG, "Connection lost ${cause.toString()}")
            }

            override fun deliveryComplete(token: IMqttDeliveryToken?) {

            }
        })
        val options = MqttConnectOptions()
        try {
            mqttClient.connect(options, null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "Connection success")
                }

                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.d(TAG, "Connection failure")
                }
            })
        } catch (e: MqttException) {
            e.printStackTrace()
        }

    }
```

The interface `MqttCallback` includes three methods:

1. messageArrived: receive new messages from the broker
2. connectionLost: lost the connection to the broker
3. deliveryComplete: complete message delivery to the broker

`MqttConnectOptions` is used to configure connection settings including users' password, timeout configuration, etc. Please view its function for details.

### Create an MQTT subscription

Subscribe topic

```kotlin
fun subscribe(topic: String, qos: Int = 1) {
        try {
            mqttClient.subscribe(topic, qos, null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "Subscribed to $topic")
                }

                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.d(TAG, "Failed to subscribe $topic")
                }
            })
        } catch (e: MqttException) {
            e.printStackTrace()
        }
    }
```

### Unsubscription

```kotlin
fun unsubscribe(topic: String) {
        try {
            mqttClient.unsubscribe(topic, null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "Unsubscribed to $topic")
                }

                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.d(TAG, "Failed to unsubscribe $topic")
                }
            })
        } catch (e: MqttException) {
            e.printStackTrace()
        }
    }
```

### Publish messages

```kotlin
fun publish(topic: String, msg: String, qos: Int = 1, retained: Boolean = false) {
        try {
            val message = MqttMessage()
            message.payload = msg.toByteArray()
            message.qos = qos
            message.isRetained = retained
            mqttClient.publish(topic, message, null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "$msg published to $topic")
                }

                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.d(TAG, "Failed to publish $msg to $topic")
                }
            })
        } catch (e: MqttException) {
            e.printStackTrace()
        }
    }
```

### Disconnect from the MQTT Broker

```kotlin
fun disconnect() {
        try {
            mqttClient.disconnect(null, object : IMqttActionListener {
                override fun onSuccess(asyncActionToken: IMqttToken?) {
                    Log.d(TAG, "Disconnected")
                }

                override fun onFailure(asyncActionToken: IMqttToken?, exception: Throwable?) {
                    Log.d(TAG, "Failed to disconnect")
                }
            })
        } catch (e: MqttException) {
            e.printStackTrace()
        }
    }
```

## Test

Firstly, you need to connect the Android client to the MQTT broker then subscribe topic: `a/b`, and then you can see the log of successfully connecting and subscribing.

![MQTT connect and subscribe](https://assets.emqx.com/images/7711763b664ee9c6f0860b50bb0934c4.png?imageMogr2/thumbnail/1520x)

We test with [MQTT 5.0 client tool - MQTTX](https://mqttx.app/), publish messages to the topic: `a/b`, and then we can see the log of receiving messages on the client.

![MQTT 5.0 Client Tool  MQTTX](https://assets.emqx.com/images/041917427b461f7d633faf3ff205b69d.png?imageMogr2/thumbnail/1520x)

![receive MQTT messages](https://assets.emqx.com/images/8451743b47f3e31fbb87377dcc0111d5.png?imageMogr2/thumbnail/1520x)

We publish messages on the client to the topic: `a/b`. Because we subscribed to this topic, we will also receive the message at the same time. Finally, we disconnect the client from the MQTT broker. The log is as below:

![publish mqtt message and disconnect](https://assets.emqx.com/images/150e861f4c2375ab938adf4dd01e7ab6.png?imageMogr2/thumbnail/1520x)

## Summary

So far, we have finished the construction of the [MQTT client](https://www.emqx.com/en/mqtt-client-sdk) on the Android and implemented the connection between the client and MQTT broker, subscribing topics, messaging, etc.

MQTT can provide real-time and reliable message service for connecting remote devices, only with a few codes and limited bandwidth. Since it is a kind of low-cost, low-bandwidth occupancy instant communicating protocol, it is widely used for IoT, small-size equipment, mobile applications, etc.

Next, you can check out [The Easy-to-understand Guide to MQTT Protocol](https://www.emqx.com/en/mqtt-guide) series of articles provided by EMQ to learn about MQTT protocol features, explore more advanced applications of MQTT, and get started with MQTT application and service development.

Try EMQX Cloud for Free

No credit card required

[Get Started →](https://accounts.emqx.com/signup?continue=https://cloud-intl.emqx.com/console/deployments/0?oper=new)
