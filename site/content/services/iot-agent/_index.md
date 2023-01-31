+++
title = "IoT Agent"
url = "services/iot-agent"
menuPre = "<i class='fas fa-satellite-dish'></i> "
tags = ["iot"]
+++

## Architecture

{{< mermaid >}}
C4Component

    Container_Boundary(b1, "iot-agent") {

        Container_Boundary(apib, "API") {
            Component(api, "API", "", "handles incoming messagessss")
        }

        Container_Boundary(msgp, "Message Processor") {
            Component(decoderreg, "Decoder Registry", "", "contains all available decoders")
            Component(decoder, "Decoder", "", "decodes incoming sensor specific<br>payloads to internal format")
            Component(converterreg, "Converter registry", "", "contains all available converters")
            Component(converter, "Converter", "", "converts internal format<br>to LWM2M SenML")
        }

        Container_Boundary(evts, "Event Sender") {
            Component(sender, "Sender")
        }

        Component(mqtt-client, "MQTT Client")

    }

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="3")

{{< /mermaid >}}

## Observability

### Metrics

| Name | Type | Description |
| ---  | ---  | ---         |
| mqtt.messages | counter | Total number of received mqtt messages |
