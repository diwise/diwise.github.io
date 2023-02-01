+++
title = "Add a device"
url = "getting-started/how-to/add-device"
description = "How to add a known device"
menuPre = "<i class='fas fa-plus-square'></i> "
tags = ["usage,docs"]
+++

{{% notice style="primary" title="Heads up!" icon="skull-crossbones" %}}
The device/sensor that should be added need to be of a known type, that is, a decoder for the type of sensor must already exist and the device/sensor should be provisioned within the LoRa application server.
{{% /notice %}}

{{< mermaid >}}
%%{init:{"theme":"neutral", "sequence":{"showSequenceNumbers":true}}}%%
sequenceDiagram
    LoRa->>IoT-Agent: mqtt
    loop
        IoT-Agent->>IoT-Agent: POST to /api/v0/messages
    end
    IoT-Agent-->>iot-device-mgmt: device metadata lookup
    iot-device-mgmt-->>IoT-Agent: sensor type
    IoT-Agent->>IoT-Core: Send on rabbitMQ
{{< /mermaid >}}

### Incoming payload

This is a example payload that comes from a *tem_lab_14ns* sensor.

```json {{% include file="getting-started/how-to/incoming-payload.json" %}}
```

From this payload iot-agent will use *devEUI* to lookup metadata about the sensor **(3)**. SensorType that is in the payload is **not** used for anything within diwise.

### Device Management (iot-device-mgmt)

The response **(4)** from iot-device-mgmt contains information about the device.

```json {{% include file="getting-started/how-to/response.json" %}}
```

For now we're interested the following attributes:

| Attribute  | Description |
| ---------- | ----------- |
| deviceID   | The internal ID that will be used by diwise |
| sensorType | the type of sensor, see [Supported sensor types]({{< ref "/intro/supported-sensor-types" >}}) |
| active     | extension to be used for dest files. |
| types      | type of measurement that the sensor will provide, see [type of measurements]({{< ref "/intro/measurements" >}}) |
