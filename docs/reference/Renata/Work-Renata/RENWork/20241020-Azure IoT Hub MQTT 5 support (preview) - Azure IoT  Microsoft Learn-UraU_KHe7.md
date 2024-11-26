# Azure IoT Hub MQTT 5 support (preview) - Azure IoT | Microsoft Learn

* Source: <https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview>

# IoT Hub MQTT 5 support (deprecated)

* Article
* 04/08/2024
* 3 contributors

Feedback

## In this article

1. [Prerequisites](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#prerequisites)
2. [Level of support and limitations](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#level-of-support-and-limitations)
3. [Connection lifecycle](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#connection-lifecycle)
4. [Operations](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#operations)
5. [Recommendations](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#recommendations)
6. [Migration](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#migration)
7. [Examples](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#examples)
8. [Next steps](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#next-steps)

Show 4 more

**Version:** 2.0 **api-version:** 2020-10-01-preview

This document defines IoT Hub data plane API over MQTT version 5.0 protocol. See [API Reference](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview-reference) for complete definitions in this API.

Note

MQTT 5 support in IoT Hub is deprecated and IoT Hub has limited feature support for MQTT. If your solution needs MQTT v3.1.1 or v5 support, we recommend [MQTT support in Azure Event Grid](https://learn.microsoft.com/en-us/azure/event-grid/mqtt-overview). For more information, see [Compare MQTT support in IoT Hub and Event Grid](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub#compare-mqtt-support-in-iot-hub-and-event-grid).



## Prerequisites

* Create a brand new IoT hub with preview mode enabled. MQTT 5 is only available in preview mode, and you can't switch an existing IoT hub to preview mode. For more information, see [Enable preview mode](https://learn.microsoft.com/en-us/azure/iot-hub/iot-hub-preview-mode)
* Prior knowledge of [MQTT 5 specification](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html).



## Level of support and limitations

IoT Hub support for MQTT 5 is in preview and limited in following ways (communicated to client via `CONNACK` properties unless explicitly noted otherwise):

* No official [Azure IoT device SDKs](https://learn.microsoft.com/en-us/azure/iot/iot-sdks) support yet.
* Subscription identifiers aren't supported.
* Shared subscriptions aren't supported.
* `RETAIN` isn't supported.
* `Maximum QoS` is `1`.
* `Maximum Packet Size` is `256 KiB` (subject to further restrictions per operation).
* Assigned Client IDs aren't supported.
* `Keep Alive` is limited to `19 min` (max delay for liveness check – `28.5 min`).
* `Topic Alias Maximum` is `10`.
* `Response Information` isn't supported; `CONNACK` doesn't return `Response Information` property even if `CONNECT` contains `Request Response Information` property.
* `Receive Maximum` (maximum number of allowed outstanding unacknowledged `PUBLISH` packets (in client-server direction) with `QoS: 1`) is `16`.
* Single client can have no more than `50` subscriptions. If a client reaches the subscription limit, `SUBACK` returns `0x97` (Quota exceeded) reason code for subscriptions.



## Connection lifecycle



### Connection

To connect a client to IoT Hub using this API, establish connection per MQTT 5 specification. Client must send `CONNECT` packet within 30 seconds following successful TLS handshake, or the server closes the connection. Here's an example of `CONNECT` packet:

YAML Copy

```yaml
-> CONNECT
    Protocol_Version: 5
    Clean_Start: 0
    Client_Id: D1
    Authentication_Method: SAS
    Authentication_Data: {SAS bytes}
    api-version: 2020-10-10
    host: abc.azure-devices.net
    sas-at: 1600987795320
    sas-expiry: 1600987195320
    client-agent: artisan;Linux
```

* `Authentication Method` property is required and identifies which authentication method is used. For more information about authentication method, see [Authentication](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#authentication).
* `Authentication Data` property handling depends on `Authentication Method`. If `Authentication Method` is set to `SAS`, then `Authentication Data` is required and must contain valid signature. For more information about authentication data, see [Authentication](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#authentication).
* `api-version` property is required and must be set to API version value provided in this specification's header for this specification to apply.
* `host` property defines host name of the tenant. It's required unless SNI extension was presented in Client Hello record during TLS handshake
* `sas-at` defines time of connection.
* `sas-expiry` defines expiration time for the provided SAS.
* `client-agent` optionally communicates information about the client creating the connection.

Note

`Authentication Method` and other properties throughout the specification with capitalized names are first-class properties in MQTT 5 - they are described in details in MQTT 5 specification. `api-version` and other properties in dash case are user properties specific to IoT Hub API.

IoT Hub responds with `CONNACK` packet once it finishes with authentication and fetching data to support the connection. If connection is established successfully, `CONNACK` looks like:

YAML Copy

```yaml
<- CONNACK
    Session_Present: 1
    Reason_Code: 0x00
    Session_Expiry_Interval: 0xFFFFFFFF # included only if CONNECT specified value less than 0xFFFFFFFF and more than 0x00
    Receive_Maximum: 16
    Maximum_QoS: 1
    Retain_Available: 0
    Maximum_Packet_Size: 262144
    Topic_Alias_Maximum: 10
    Subscription_Identifiers_Available: 0
    Shared_Subscriptions_Available: 0
    Server_Keep_Alive: 1140 # included only if client did not specify Keep Alive or if it specified a bigger value
```

These `CONNACK` packet properties follow [MQTT 5 specification](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#\_Toc3901080). They reflect IoT Hub's capabilities.



### Authentication

The `Authentication Method` property on `CONNECT` client defines what kind of authentication it uses for this connection:

* `SAS` - Shared Access Signature is provided in `CONNECT`'s `Authentication Data` property,
* `X509` - client relies on client certificate authentication.

Authentication fails if authentication method doesn't match the client's configured method in IoT Hub.

Note

This API requires `Authentication Method` property to be set in `CONNECT` packet. If `Authentication Method` property isn't provided, connection fails with `Bad Request` response.

Username/password authentication used in previous API versions isn't supported.



#### SAS

With SAS-based authentication, a client must provide the signature of the connection context. The signature proves authenticity of the MQTT connection. The signature must be based on one of two authentication keys in the client's configuration in IoT Hub. Or it must be based on one of two shared access keys of a [shared access policy](https://learn.microsoft.com/en-us/azure/iot-hub/iot-hub-dev-guide-sas).

String to sign must be formed as follows:

text Copy

```text
{host name}\n
{Client Id}\n
{sas-policy}\n
{sas-at}\n
{sas-expiry}\n
```

* `host name` is derived either from SNI extension (presented by client in Client Hello record during TLS handshake) or `host` user property in `CONNECT` packet.
* `Client Id` is Client Identifier in `CONNECT` packet.
* `sas-policy` - if present, defines IoT Hub access policy used for authentication. It's encoded as user property on `CONNECT` packet. Optional: omitting it means authentication settings in device registry are used instead.
* `sas-at` - if present, specifies time of connection - current time. It's encoded as user property of `time` type on `CONNECT` packet.
* `sas-expiry` defines expiration time for the authentication. It's a `time`-typed user property on `CONNECT` packet. This property is required.

For optional parameters, if omitted, empty string MUST be used instead in string to sign.

HMAC-SHA256 is used to hash the string based on one of device's symmetric keys. Hash value is then set as value of `Authentication Data` property.



#### X509

If `Authentication Method` property is set to `X509`, IoT Hub authenticates the connection based on the provided client certificate.



#### Reauthentication

If SAS-based authentication is used, we recommend using short-lived authentication tokens. To keep connection authenticated and prevent disconnection because of expiration, client must reauthenticate by sending `AUTH` packet with `Reason Code: 0x19` (reauthentication):

YAML Copy

```yaml
-> AUTH
    Reason_Code: 0x19
    Authentication_Method: SAS
    Authentication_Data: {SAS bytes}
    sas-at: {current time}
    sas-expiry: {SAS expiry time}
```

Rules:

* `Authentication Method` must be the same as the one used for initial authentication
* if connection was originally authenticated using SAS based on Shared Access Policy, signature used in reauthentication must be based on the same policy.

If reauthentication succeeds, IoT Hub sends `AUTH` packet with `Reason Code: 0x00` (success). Otherwise, IoT Hub sends `DISCONNECT` packet with `Reason Code: 0x87` (Not authorized) and closes the connection.



### Disconnection

Server can disconnect client for a few reasons, including:

* client misbehaves in a way that is impossible to respond to with negative acknowledgment (or response) directly,
* server fails to keep state of the connection up to date,
* another client connects with the same identity.

Server may disconnect with any reason code defined in MQTT 5.0 specification. Notable mentions:

* `135` (Not authorized) when reauthentication fails, current SAS token expires, or device's credentials change.
* `142` (Session taken over) when new connection with the same client identity has been opened.
* `159` (Connection rate exceeded) when connection rate for the IoT hub exceeds the limit.
* `131` (Implementation-specific error) is used for any custom errors defined in this API. `status` and `reason` properties are used to communicate further details about the cause for disconnection (see [Response](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#response) for details).



## Operations

All functionalities in this API are expressed as operations. Here's an example of Send Telemetry operation:

YAML Copy

```yaml
-> PUBLISH
    QoS: 1
    Packet_Id: 3
    Topic: $iothub/telemetry
    Payload: Hello

<- PUBACK
    Packet_Id: 3
    Reason_Code: 0
```

For complete specification of operations in this API, see [IoT Hub data plane MQTT 5 API reference](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview-reference).

Note

All the samples in this specification are shown from client's perspective. Sign `->` means client sending packet, `<-` - receiving.



### Message topics and subscriptions

Topics used in operations' messages in this API start with `$iothub/`. MQTT broker semantics don't apply to these operations (see "[Topics beginning with $](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#\_Toc3901246)" for details). Topics starting with `$iothub/` that aren't defined in this API aren't supported:

* Sending messages to undefined topic results in `Not Found` response (see [Response](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview#response) for details),
* Subscribing to undefined topic results in `SUBACK` with `Reason Code: 0x8F` (Topic Filter Invalid).

Topic names and property names are case-sensitive and must be exact match. For example, `$iothub/telemetry/` isn't supported while `$iothub/telemetry` is.

Note

Wildcards in subscriptions under `$iothub/..` aren't supported. That is, a client can't subscribe to `$iothub/+` or `$iothub/#`. Attempting to do so results in `SUBACK` with `Reason Code: 0xA2` (Wildcard Subscriptions not supported). Only single-segment wildcards (`+`) are supported instead of path parameters in topic name for operations that have them.



### Interaction types

All the operations in this API are based on one of two interaction types:

* Message with optional acknowledgment (MessageAck)
* Request-Response (ReqRep)

Operations also vary by direction (determined by direction of initial message in exchange):

* Client-to-Server (c2s)
* Server-to-Client (s2c)

For example, Send Telemetry is Client-to-Server operation of "Message with acknowledgment" type, while Handle Direct Method is Server-to-Client operation of Request-Response type.



#### Message-acknowledgement interactions

Message with optional Acknowledgment (MessageAck) interaction is expressed as an exchange of `PUBLISH` and `PUBACK` packets in MQTT. Acknowledgment is optional and sender can choose to not request it by sending `PUBLISH` packet with `QoS: 0`.

Note

If properties in `PUBACK` packet must be truncated due to `Maximum Packet Size` declared by the client, IoT Hub will retain as many User properties as it can fit within the given limit. User properties listed first have higher chance to be sent than those listed later; `Reason String` property has the least priority.



##### Example of simple MessageAck interaction

Message:

YAML Copy

```yaml
PUBLISH
    QoS: 1
    Packet_Id: 34
    Topic: $iothub/{request.path}
    Payload: <any>
```

Acknowledgment (success):

YAML Copy

```yaml
PUBACK
    Packet_Id: 34
    Reason_Code: 0
```



#### Request-Response Interactions

In Request-Response (ReqRep) interactions, both Request and Response translate into `PUBLISH` packets with `QoS: 0`.

`Correlation Data` property must be set in both and is used to match Response packet to Request packet.

This API uses single response topic `$iothub/responses` for all ReqRep operations. Subscribing to / unsubscribing from this topic for client-to-server operations isn't required - server assumes all clients to be subscribed.



##### Example of simple ReqRep interaction

Request:

YAML Copy

```yaml
PUBLISH
    QoS: 0
    Topic: $iothub/{request.path}
    Correlation_Data: 0x01 0xFA
    Payload: ...
```

Response (success):

YAML Copy

```yaml
PUBLISH
    QoS: 0
    Topic: $iothub/responses
    Correlation_Data: 0x01 0xFA
    Payload: ...
```

ReqRep interactions don't support `PUBLISH` packets with `QoS: 1` as request or response messages. Sending Request `PUBLISH` results in `Bad Request` response.

Maximum length supported in `Correlation Data` property is 16 bytes. If `Correlation Data` property on `PUBLISH` packet is set to a value longer than 16 bytes, IoT Hub sends `DISCONNECT` with `Bad Request` outcome, and closes the connection. This behavior only applies to packets exchanged within this API.

Note

Correlation Data is an arbitrary byte sequence, e.g. it isn't guaranteed to be UTF-8 string.

ReqRep use predefined topics for response; Response Topic property in Request `PUBLISH` packet (if set by the sender) is ignored.

IoT Hub automatically subscribes client to response topics for all client-to-server ReqRep operations. Even if client explicitly unsubscribes from response topic, IoT Hub reinstates the subscription automatically. For server-to-client ReqRep interactions, it's still necessary for device to subscribe.



### Message Properties

Operation properties - system or user-defined - are expressed as packet properties in MQTT 5.

User property names are case-sensitive and must be spelled exactly as defined. For example, `Trace-ID` isn't supported while `trace-id` is.

Requests with User properties outside specification and without prefix `@` result in error.

System properties are encoded either as first class properties (for example, `Content Type`) or as User properties. Specification provides exhaustive list of supported system properties. All first class properties are ignored unless support for them is explicitly stated in the specification.

Where user-defined properties are allowed, their names must follow the format `@{property name}`. User-defined properties only support valid UTF-8 string values. for example, `MyProperty1` property with value `15` must be encoded as User property with name `@MyProperty` and value `15`.

If IoT Hub doesn't recognize User property, it's considered an error, and IoT Hub responds with `PUBACK` with `Reason Code: 0x83` (Implementation-specific error) and `status: 0100` (Bad Request). If acknowledgment wasn't requested (QoS: 0), `DISCONNECT` packet with the same error is sent back and connection is terminated.

This API defines following data types besides `string`:

* `time`: number of milliseconds since `1970-01-01T00:00:00.000Z`. for example, `1600987195320` for `2020-09-24T22:39:55.320Z`,
* `u32`: unsigned 32-bit integer number,
* `u64`: unsigned 64-bit integer number,
* `i32`: signed 32-bit integer number.



### Response

Interactions can result in different outcomes: `Success`, `Bad Request`, `Not Found`, and others. Outcomes are distinguished from each other by `status` user property. `Reason Code` in `PUBACK` packets (for MessageAck interactions) matches `status` in meaning where possible.

Note

If client specifies `Request Problem Information: 0` in CONNECT packet, no user properties will be sent on `PUBACK` packets to comply with MQTT 5 specification, including `status` property. In this case, client can still rely on `Reason Code` to determine whether acknowledge is positive or negative.

Every interaction has a default (or success). It has `Reason Code` of `0` and `status` property of "not set". Otherwise:

* For MessageAck interactions, `PUBACK` gets `Reason Code` other than 0x0 (Success). `status` property may be present to further clarify the outcome.
* For ReqRep interactions, Response `PUBLISH` gets `status` property set.
* Since there's no way to respond to MessageAck interactions with `QoS: 0` directly, `DISCONNECT` packet is sent instead with response information, followed by disconnect.

Examples:

Bad Request (MessageAck):

YAML Copy

```yaml
PUBACK
    Reason_Code: 131
    status: 0100
    reason: Unknown property `test`
```

Not Authorized (MessageAck):

YAML Copy

```yaml
PUBACK
    Reason_Code: 135
    status: 0101
```

Not Authorized (ReqRep):

YAML Copy

```yaml
PUBLISH
    QoS: 0
    Topic: $iothub/responses
    Correlation_Data: ...
    status: 0101
```

When needed, IoT Hub sets the following user properties:

* `status` - IoT Hub's extended code for operation's status. This code can be used to differentiate outcomes.
* `trace-id` – trace ID for the operation; IoT Hub may keep more diagnostics concerning the operation that could be used for internal investigation.
* `reason` - human-readable message providing further information on why operation ended up in a state indicated by `status` property.

Note

If client sets `Maximum Packet Size` property in CONNECT packet to a very small value, not all user properties may fit and would not appear in the packet.

`reason` is meant only for people and should not be used in client logic. This API allows for messages to be changed at any point without warning or change of version.

If client sends `RequestProblemInformation: 0` in CONNECT packet, user properties won't be included in acknowledgements per [MQTT 5 specification](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#\_Toc3901053).



#### Status code

`status` property carries status code for operation. It's optimized for machine reading efficiency. It consists of two-byte unsigned integer encoded as hex in string like `0501`. Code structure (bit map):

text Copy

```text
7 6 5 4 3 2 1 0 | 7 6 5 4 3 2 1 0
0 0 0 0 0 R T T | C C C C C C C C
```

First byte is used for flags:

* bits 0 and 1 indicate type of outcomes:

  * `00` - success
  * `01` - client error
  * `10` - server error

* bit 2: `1` indicates error is retryable

* bits 3 through 7 are reserved and must be set to `0`

Second byte contains actual distinct response code. Error codes with different flags can have the same second byte value. For example, there can be `0001`, `0101`, `0201`, `0301` error codes having distinct meaning.

For example, `Too Many Requests` is a client, retryable error with own code of `1`. Its value is `0000 0101 0000 0001` or `0x0501`.

Clients may use type bits to identify whether operation concluded successfully. Clients may also use retryable bit to decide whether it's sensible to retry operation.



## Recommendations



### Session management

`CONNACK` packet carries `Session Present` property to indicate whether server restored previously created session. Use this property to figure out whether to subscribe to topics or skip subscribing since subscription was done earlier.

To rely on `Session Present`, client must keep track of subscriptions it's made (that is, sent `SUBSCRIBE` packet and received `SUBACK` with successful reason code), or make sure to subscribe to all topics in a single `SUBSCRIBE`/`SUBACK` exchange. Otherwise, if client sends two `SUBSCRIBE` packets, and the server processes only one of them successfully, the server communicates `Session Present: 1` in `CONNACK` while having only part of client's subscriptions accepted.

To prevent the case where an older version of client didn't subscribe to all the topics, it's better to subscribe unconditionally when client behavior changes (for example, as part of firmware update). Also, to ensure no stale subscriptions are left behind (taking from maximum allowed number of subscriptions), explicitly unsubscribe from subscriptions that are no longer in use.



### Batching

There's no special format to send a batch of messages. To reduce overhead of resource-intensive operations in TLS and networking, bundle packets (`PUBLISH`, `PUBACK`, `SUBSCRIBE`, and so no) together before handing them over to underlying TLS/TCP stack. Also, client can make topic alias easier within the "batch":

* Put complete topic name in the first `PUBLISH` packet for the connection and associate topic alias with it,
* Put following packets for the same topic with empty topic name and topic alias property.



## Migration

This section lists the changes in the API compared to [previous MQTT support](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub).

* Transport protocol is MQTT 5. Previously - MQTT 3.1.1.

* Context information for SAS Authentication is contained in `CONNECT` packet directly instead of being encoded along with signature.

* Authentication Method is used to indicate authentication method used.

* Shared Access Signature is put in Authentication Data property. Previously Password field was used.

* Topics for operations are different:

  * Telemetry: `$iothub/telemetry` instead of `devices/{Client Id}/messages/events`,
  * Commands: `$iothub/commands` instead of `devices/{Client Id}/messages/devicebound`,
  * Patch Twin Reported: `$iothub/twin/patch/reported` instead of `$iothub/twin/PATCH/properties/reported`,
  * Notify Twin Desired State Changed: `$iothub/twin/patch/desired` instead of `$iothub/twin/PATCH/properties/desired`.

* Subscription for client-server request-response operations' response topic isn't required.

* User properties are used instead of encoding properties in topic name segment.

* property names are spelled in "dash-case" naming convention instead of abbreviations with special prefix. User-defined properties now require prefix instead. For instance, `$.mid` is now `message-id`, while `myProperty1` becomes `@myProperty1`.

* Correlation Data property is used to correlate request and response messages for request-response operations instead of `$rid` property encoded in topic.

* `iothub-connection-auth-method` property is no longer stamped on telemetry events.

* C2D commands aren't purged in absence of subscription from device. They remain queued up until device subscribes or they expire.



## Examples



### Send telemetry

Message:

YAML Copy

```yaml
-> PUBLISH
    QoS: 1
    Packet_Id: 31
    Topic: $iothub/telemetry
    @myProperty1: My String Value # optional
    creation-time: 1600987195320 # optional
    @ No_Rules-ForUser-PROPERTIES: Any UTF-8 string value # optional
    Payload: <data>
```

Acknowledgment:

YAML Copy

```yaml
<- PUBACK
    Packet_Id: 31
    Reason_Code: 0
```

Alternative acknowledgment (throttled):

YAML Copy

```yaml
<- PUBACK
    Packet_Id: 31
    Reason_Code: 151
    status: 0501
```

***



### Send get twin's state

Request:

YAML Copy

```yaml
-> PUBLISH
    QoS: 0
    Topic: $iothub/twin/get
    Correlation_Data: 0x01 0xFA
    Payload: <empty>
```

Response (success):

YAML Copy

```yaml
<- PUBLISH
    QoS: 0
    Topic: $iothub/responses
    Correlation_Data: 0x01 0xFA
    Payload: <twin/desired state>
```

Response (not allowed):

YAML Copy

```yaml
<- PUBLISH
    QoS: 0
    Topic: $iothub/responses
    Correlation_Data: 0x01 0xFA
    status: 0102
    reason: Operation not allowed for `B2` SKU
    Payload: <empty>
```

***



### Handle direct method call

Request:

YAML Copy

```yaml
<- PUBLISH
    QoS: 0
    Topic: $iothub/methods/abc
    Correlation_Data: 0x0A 0x10
    Payload: <data>
```

Response (success):

YAML Copy

```yaml
-> PUBLISH
    QoS: 0
    Topic: $iothub/responses
    Correlation_Data: 0x0A 0x10
    response-code: 200 # user defined response code
    Payload: <data>
```

Note

`status` isn't set - it's a success response.

Device Unavailable Response:

YAML Copy

```yaml
-> PUBLISH
    QoS: 0
    Topic: $iothub/responses
    Correlation_Data: 0x0A 0x10
    status: 0603
```

***



### Error while using QoS 0, part 1

Request:

YAML Copy

```yaml
-> PUBLISH
    QoS: 0
    Topic: $iothub/twin/gett # misspelled topic name - server won't recognize it as Request-Response interaction
    Correlation_Data: 0x0A 0x10
    Payload: <data>
```

Response:

YAML Copy

```yaml
<- DISCONNECT
    Reason_Code: 144
    reason: "Unsupported topic: `$iothub/twin/gett`"
```

***



### Error while using QoS 0, part 2

Request:

YAML Copy

```yaml
-> PUBLISH # missing Correlation Data
    QoS: 0
    Topic: $iothub/twin/get
    Payload: <data>
```

Response:

YAML Copy

```yaml
<- DISCONNECT
    Reason_Code: 131
    status: 0100
    reason: "`Correlation Data` property is missing"
```



## Next steps

* To review the MQTT 5 preview API reference, see [IoT Hub data plane MQTT 5 API reference (preview)](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-5-preview-reference).
* To follow a C# sample, see [GitHub sample repository](https://github.com/Azure-Samples/iot-hub-mqtt-5-preview-samples-csharp).
