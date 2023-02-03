+++
title = "Add a device"
url = "getting-started/how-to/add-device"
description = "How to add a known device"
menuPre = "<i class='fas fa-plus-square'></i> "
tags = ["usage", "configuration", "how-to"]
+++

{{% notice style="primary" title="Heads up!" icon="skull-crossbones" %}}
The device/sensor that should be added need to be of a known type, that is, a decoder for the type of sensor must already exist and the device/sensor should be provisioned within the LoRa application server.
{{% /notice %}}

## How to add a new sensor

### Add device metadata

Device metadata is stored in iot-device-mgmt. When iot-device-mgmt starts up it load data from *csv*-files and adds information to its database.

The file *30.devices.csv* contains data about sensors.

```csv
devEUI;internalID;lat;lon;where;types;decoder;name;description;active;tenant;interval
a1b2bc3d4e5f6;intern-a1b2bc3d4e5f6;0;0;air;urn:oma:lwm2m:ext:3303;tem_lab_14ns;;;true;default;0
```

| Column | Description |
| ------ | ----------- |
| devEUI | Physical ID of sensor |
| internalID | DeviceID used in diwise |
| lat | Latitude |
| lon | Longitude |
| where | [Environments]({{< relref "/intro/environments" >}}) |
| types | [type of measurements]({{< relref "/intro/measurements" >}}) |
| decoder | name of the decoder to use, [supported sensor types]({{< relref "/intro/supported-sensor-types" >}}) |
| name | Display name to be used i dashboard |
| description | Description to be used in dashboard |
| active | true or false, only active sensors will pubslish output |
| tenant | name of tenant |
| interval | 0 |

### Compose override

Ensure that your [Development environment]({{< relref "/getting-started/how-to/devenvironment" >}}) is set up accordantly.

Then create an [docker compose override file](https://docs.docker.com/compose/extends/) with your custom settings and modified *30.devices.csv* with your added sensor.  

```yaml
version: '3'
services:
  iot-agent:
    environment:
      MQTT_DISABLED: 'false'
      MQTT_HOST: 'your.mqtt.host'
      MQTT_PORT: '1883'
      MQTT_USER: '<mqtt-user>'
      MQTT_PASSWORD: '<mqtt-password>'
      MQTT_TOPIC_0: '<mqtt-topic>'      

  iot-device-mgmt:
    image: 'diwise/iot-device-mgmt:latest'
    volumes:
      - ./path/to/custom/data:/opt/diwise/config/data

```

Compose up the environment with the following command

```bash
docker compose -f deployments/docker/docker-compose.yaml -f /path/to/docker-compose.override.yaml up
```

If everything is set up correct diwise should start and begin to listen to incoming payloads.

## Background

{{< mermaid >}}
%%{init:{"theme":"neutral", "sequence":{"showSequenceNumbers":true}}}%%
sequenceDiagram
    LoRa->>iot-agent: uplink message
    loop
        iot-agent->>iot-agent: POST to /api/v0/messages
    end
    iot-agent-->>iot-device-mgmt: device metadata lookup
    iot-device-mgmt-->>iot-agent: deviceID, sensor type
    iot-agent->>iot-core: measurements
    iot-core-->>iot-device-mgmt: device metadata lookup
    iot-device-mgmt-->>iot-core: environment, position, more
    iot-core->>iot-transform-fiware: PUBLISH output
{{< /mermaid >}}

### Uplink message

This is a example payload that comes from a *tem_lab_14ns* sensor.

```json {{% include file="getting-started/how-to/incoming-payload.json" %}}
```

From this payload iot-agent will use *devEUI* to lookup metadata about the sensor **(3)**. SensorType that is in the payload is **not** used for anything within diwise.

### Device metadata (iot-device-mgmt)

The response **(4)** from iot-device-mgmt contains information about the device.

```json {{% include file="getting-started/how-to/response.json" %}}
```

For now we're interested the following attributes:

| Attribute   | Description |
| ----------- | ----------- |
| deviceID    | The internal ID that will be used by diwise |
| sensorType  | the type of sensor, see [Supported sensor types]({{< relref "/intro/supported-sensor-types" >}}). Used to select a decoder to decode the sensor payload |
| active      | only active sensors will send measurements. |
| types       | type of measurement that the sensor will provide, see [type of measurements]({{< relref "/intro/measurements" >}}) |
| environment | additional information about the sensor, see [environments]({{< relref "/intro/environments" >}}) |

### Output

The decoded payload is converted to one or many measurements by [iot-agent]({{< relref "/services/iot-agent" >}}) **(3-5)**, enriched in [iot-core]({{< relref "/services/iot-core" >}}) **(6, 7)** and finally serialized as [SenML](https://www.rfc-editor.org/rfc/rfc8428) and published **(8)** on a rabbitMQ topic.

In the output we find sensorID = deviceID. The *pack* is divided into several *records*, the first record contains the type of measurement, `bn`, and a timestamp in unix time,  `bt`.

```json {{% include file="getting-started/how-to/senml.json" %}}
```

The second record contains the measurement value, in this case it's a *SensorValue*. The type [urn:oma:lwm2m:ext:3303](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/3303.xml) is a temperature measurement.

```json
        {
            "n": "5700",
            "v": -5.8
        }
```

This *record* shows that a sensor value (`"n": "5700"`) of type float has the value *-5.8*. See the [SenML](https://www.rfc-editor.org/rfc/rfc8428) specification for more information.
