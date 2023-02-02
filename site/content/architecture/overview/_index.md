+++
title = "Overview"
url = "architecture/overview"
description = "Describes the two main logical components of diwise."
weight = 1
menuPre = "<i class='fas fa-satellite'></i> "
+++


## System Context Diagram

{{< mermaid >}}
C4Context

    Boundary(boutputs, "egresses", "Integrations") {
        System_Ext(subs, "Subscribers")
    }

    Boundary(b0, "diwise", "Software System") {
    
        System(iot-p, "IoT Platform", "Manages devices and aggregates<br>information from different platforms.")
        System(cip-p, "City Information Platform", "Stores and provides current and<br>historical city information.")

    }

    Boundary(binputs, "ingresses", "Integrations") {
        SystemQueue_Ext(mqtt, "MQTT")
        System(integration, "Integration", "Fetches data from external services<br>and stores them in CiP")
    }

    Boundary(bonline, "Third Party Services", "") {
        System_Ext(ext-iot-p, "External IoT Platform")
        System_Ext(exts, "External Services")
    }

    Rel(iot-p, mqtt, "pub/sub", "amqp")
    Rel(cip-p, subs, "Notifies", "https, NGSI-LD Notification")
    Rel(iot-p, cip-p, "Updates", "https, NGSI-LD")
    Rel(iot-p, subs, "Notifies", "https, Cloud Event")
    Rel(ext-iot-p, mqtt, "pub/sub", "amqp")

    Rel(integration, exts, "Fetches telemetry and data")
    Rel(integration, cip-p, "Updates", "NGSI-LD")

    UpdateRelStyle(iot-p, mqtt, $offsetX="-60", $offsetY="-40")
    UpdateRelStyle(cip-p, subs, $offsetX="30", $offsetY="-50")
    UpdateRelStyle(iot-p, cip-p, $offsetX="-40", $offsetY="30")
    UpdateRelStyle(iot-p, subs, $offsetX="-120", $offsetY="-50")

    UpdateRelStyle(integration, cip-p, $offsetX="25", $offsetY="-40")
    UpdateRelStyle(integration, exts, $offsetX="50", $offsetY="5")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
{{< /mermaid >}}
