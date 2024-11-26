# Full Battery Testing Process JSON Reference



This document provides a comprehensive overview of the original JSON messages used in the battery testing process, organized by key categories for ease of reference.

## 1. Inspection Results JSON

The inspection results pertain to an individual battery, identified by `orderId` and `itemId`. The payload contains 20 inspection readings, each of which includes the fields `limitMax`, `limitMin`, `uom`, `value`, and `result`.

### Specific Battery Example

Below is the complete JSON message for a specific battery identified by `orderId` 10041663 and `itemId` 40200:

```json
{
  "id": "message_07f7cd5b-1fcb-4357-9580-404cbfbd591d",
  "createdAt": "2024-11-07 18:11:13:262",
  "out": false,
  "payload": {
    "orderId": 10041663,
    "itemId": 40200,
    "inspection1": {
      "limitMax": 0,
      "limitMin": 0,
      "value": 0,
      "uom": "%",
      "result": true,
      "timestamp": 1730999369935
    },
    "inspection2": {
      "limitMax": 1.87,
      "limitMin": 1.67,
      "value": 1.827,
      "uom": "mm",
      "result": true,
      "timestamp": 1730999374007
    },
    "inspection3": {
      "limitMax": 80,
      "limitMin": 5,
      "value": 10,
      "uom": "%px",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection4": {
      "limitMax": 80,
      "limitMin": 5,
      "value": 14,
      "uom": "%px",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection5": {
      "limitMax": 80,
      "limitMin": 5,
      "value": 15,
      "uom": "%px",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection6": {
      "limitMax": 50,
      "limitMin": 5,
      "value": 15,
      "uom": "%px",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection7": {
      "limitMax": 50,
      "limitMin": 5,
      "value": 17,
      "uom": "%px",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection8": {
      "limitMax": 50,
      "limitMin": 5,
      "value": 17,
      "uom": "%px",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection9": {
      "limitMax": 0,
      "limitMin": 0,
      "value": -0.174,
      "uom": "mm",
      "result": true,
      "timestamp": 1730999375461
    },
    "inspection10": {
      "limitMax": 0,
      "limitMin": 0,
      "value": -0.158,
      "uom": "mm",
      "result": true,
      "timestamp": 1730999375461
    },
    "inspection11": {
      "limitMax": 0.2,
      "limitMin": -0.2,
      "value": -0.016,
      "uom": "mm",
      "result": true,
      "timestamp": 1730999375461
    },
    "inspection12": {
      "limitMax": 2.3,
      "limitMin": 1.7,
      "value": 2.02,
      "uom": "mm",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection13": {
      "limitMax": 10.8,
      "limitMin": 10,
      "value": 10.5,
      "uom": "mm",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection14": {
      "limitMax": 10.8,
      "limitMin": 10,
      "value": 10.45,
      "uom": "mm",
      "result": true,
      "timestamp": 1730999375739
    },
    "inspection15": {
      "limitMax": 1.7,
      "limitMin": 1.57,
      "value": 1.588,
      "uom": "V",
      "result": true,
      "timestamp": 1730999457192
    },
    "inspection16": {
      "limitMax": 1.52,
      "limitMin": 1.36,
      "value": 1.415,
      "uom": "V",
      "result": true,
      "timestamp": 1730999457192
    },
    "inspection17": {
      "limitMax": 30,
      "limitMin": 0,
      "value": 18.339,
      "uom": "V",
      "result": true,
      "timestamp": 1730999457192
    },
    "inspection18": {
      "limitMax": 100,
      "limitMin": 0,
      "value": 31.1,
      "uom": "V",
      "result": true,
      "timestamp": 1730999457192
    },
    "inspection19": {
      "limitMax": 0,
      "limitMin": 0,
      "value": 0,
      "uom": "true/false",
      "result": false,
      "timestamp": 1730999457192
    },
    "inspection20": {
      "limitMax": 0,
      "limitMin": 0,
      "value": 0,
      "uom": "true/false",
      "result": false,
      "timestamp": 1730999457192
    }
  },
  "qos": 2,
  "retain": false,
  "topic": "RenataBatteriesSA/Itingen/ASA/inspection-results",
  "meta": {
    "msgType": "JSON"
  },
  "connectionId": "6e6a3755-7999-4add-9e98-2c106aa2e5ba"
}
```

## 2. Material Consumption JSON

The following JSON message details material consumption data collected during the battery testing process.

```json
{
  "id": "message_572ce28a-1676-4131-ae73-f679020b42a3",
  "createdAt": "2024-11-07 18:11:30:612",
  "out": false,
  "payload": {
    "orderId": 10041663,
    "type": 1,
    "materialId": 2002420,
    "quantity": 0.12,
    "uom": "m",
    "timestamp": 1730999486593
  },
  "qos": 2,
  "retain": false,
  "topic": "RenataBatteriesSA/Itingen/ASA/quantities",
  "meta": {
    "msgType": "JSON"
  },
  "connectionId": "6e6a"
}
```

## 3. Status Updates JSON

This section contains JSON messages representing the status updates of the ASA system during the production phase for a given order.

```json
{
  "id": "message_572ce28a-1676-4131-ae73-f679020b42a3",
  "createdAt": "2024-11-07 21:06:10:975",
  "out": false,
  "payload": {
    "orderId": 10041663,
    "newStatus": 5,
    "oldStatus": 6,
    "timestamp": 1731009966404,
    "operator": "",
    "interruptionReasonNr": 0,
    "interruptionReasonMsg": ""
  },
  "qos": 2,
  "retain": false,
  "topic": "RenataBatteriesSA/Itingen/ASA/status-updates",
  "meta": {
    "msgType": "JSON"
  },
  "connectionId": "6e6a"
}

// Additional status update messages...
```

## Single Battery Message Summary

Below is a summary of a single battery inspection, illustrating the relevant message fields and values:

- **Order ID**: 10041663
- **Item ID**: 40200
- **Number of Inspections**: 20
- **Sample Inspection Result**:
  - **Inspection 1**: DMC Quality Check
    - **Limit Max**: 0
    - **Limit Min**: 0
    - **Value**: 0
    - **Unit of Measure**: %
    - **Result**: Pass

## Notes

- **QoS (Quality of Service)**: The QoS level is set to `2`, ensuring reliable message delivery with guaranteed acknowledgment.
- **Topics**: The topics used include `inspection-results

