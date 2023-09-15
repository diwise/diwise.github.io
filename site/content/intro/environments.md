+++
title = "Environments"
url = "intro/environments"
description = ""
menuPre = "<i class='fas fa-map'></i> "
tags = ["intro", "configuration"]
weight = 3
+++

{{% notice style="primary" title="MVP Warning!" icon="skull-crossbones" %}}
This feature implementation is an MVP and will be changed in an upcoming PR.
{{% /notice %}}

| Environment | Description |
|----------------|-------------|
| | It's possible to omit this value |
| air | If a sensor is placed within air |
| indoors | Indoor sensor |
| lifebuoy | Special case, if a presence sensor is used to detect presence of a  lifebuoy |
| soil | for sensors placed in soil |
| water | sensors placed in water |

## Functions

| Type | SubType | Description |
|-|-|-|
| building | vp | |
| building | w | |
| counter | door | |
| level | filling | |
| presence | desk | |
| presence | lifebouy | |
| timer | overflow | |
| waterquality | beach | |

## Mappings

| Name | Lwm2m | Environment | Type | SubType | Smart data model |
|-|-|-|-|-|-|
AirQuality | urn:oma:lwm2m:ext:3428 | x | x | x | AirQualityObserved |
AirQuality | urn:oma:lwm2m:ext:3428 | indoors | x | x | IndoorEnvironmentObserved |
Conductivity | urn:oma:lwm2m:ext:3327 | soil | x | x | GreenspaceRecord |
DigitalInput | urn:oma:lwm2m:ext:3200 | x | x | x | x |
Distance | urn:oma:lwm2m:ext:3330 | x | level | x | x |
Energy | urn:oma:lwm2m:ext:3328 | x | building | power | x |
Humidity | urn:oma:lwm2m:ext:3304 | indoors | x | x | IndoorEnvironmentObserved |
Illuminance | urn:oma:lwm2m:ext:3301 | x | x | x | x |
PeopleCount | urn:oma:lwm2m:ext:3434 | x | x | x | x |
Power | urn:oma:lwm2m:ext:3331 | x | building | energy | x |
Presence | urn:oma:lwm2m:ext:3302 | x | x | x | Device |
Presence | urn:oma:lwm2m:ext:3302 | x | presence | desk | Device |
Presence | urn:oma:lwm2m:ext:3302 | x | presence | lifebuoy | Lifebuoy |
Presence | urn:oma:lwm2m:ext:3302 | x | timer | x | x |
Pressure | urn:oma:lwm2m:ext:3323 | soil | x | x | GreenspaceRecord |
Temperature | urn:oma:lwm2m:ext:3303 | air | x | x | WeatherObserved |
Temperature | urn:oma:lwm2m:ext:3303 | indoors | x | x | IndoorEnvironmentObserved |
Temperature | urn:oma:lwm2m:ext:3303 | x | waterquality | x | WaterQualityObserved |
Watermeter | urn:oma:lwm2m:ext:3424 | x | x | x | WaterConsumptionObserved |

## Configure

Available environments are configured in a [iot-device-mgmt]({{< relref "/services/iot-device-mgmt" >}}) configuration file. To connect a sensor to an environment, add a supported value in the *where* column of the *device.csv* file as described [here]({{< relref "/getting-started/how-to/add-device#add-device-metadata" >}})

## Usages

The environment value is added to the [output]({{< relref "/getting-started/how-to/add-device#output" >}}) from [iot-core]({{< relref "/services/iot-core" >}}) and could be used be other services.

One service that uses the environment value is [iot-transform-fiware]({{< relref "/services/iot-transform-fiware" >}}). The [measurement type]({{< relref "/intro/measurements" >}}) in combination with environment is used to decide which Smart Data Model to create or update.

## Data transformations

{{< mermaid >}}

sequenceDiagram
    sensor->>application server: Raw sensor data
    application server->>iot-agent: json payload
    iot-agent->>iot-agent: lwm2m
    iot-agent->>iot-core: senML via MQ
    iot-core->>iot-events: senML via MQ
    iot-core->>iot-transform-fiware: senML via MQ
    iot-transform-fiware->>context-broker: Smart Data Model via http
    iot-events->>integrations: cloudevents via http 

{{< /mermaid >}}

Sensors send data in its own format to an application server (Chirpstack or Netmore). The application server sends data as JSon to [iot-agent]({{< relref "/services/iot-agent" >}}) containing the sensor payload as either an string hex characters or an base64 encoded hex string.

[iot-agent]({{< relref "/services/iot-agent" >}}) decodes the sensor data and converts it into an [lwm2m](https://technical.openmobilealliance.org/OMNA/LwM2M/LwM2MRegistry.html) datamodel(s). The data model(s) is serialized using [senML](https://www.rfc-editor.org/rfc/rfc8428.html) format (json) and sent to [iot-core]({{< relref "/services/iot-core" >}}). After [iot-core]({{< relref "/services/iot-core" >}}) has enriched the data with metadata it's published on a MQ topic. 

[iot-events]({{< relref "/services/iot-events" >}}) subscribes on that topic and pushes data to other endpoints, for example the web frontend and any other intergraion that is registerd as an [cloudevent](https://cloudevents.io/) subscriber. 

[iot-transform-fiware]({{< relref "/services/iot-transform-fiware" >}}) is another service that subscribes to the topic. This service is responsible to transform data into [Smart Data Models](https://smartdatamodels.org/) (FIWARE) and post to a [context-broker]({{< relref "/services/context-broker" >}}).