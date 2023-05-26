+++
title = "IoT Platform"
url = "architecture/iot"
description = "Aggregates data from different platforms."
menuPre = "<i class='fas fa-cubes'></i> "
weight = 3
tags = ["arch", "iot"]
+++

## Container Diagram

{{< mermaid >}}
C4Container

    Person(admin, "Administrator")
    System_Ext(keycloak, "Keycloak", "Open ID Connect compliant identity and access management")
    SystemQueue_Ext(mqtt, "MQTT", "Message bus to interact with underlying IoT platform")

    Container(dev-mgmt-web, "Device Management UI", $techn="JavaScript, React", "Presents devicemanagement capabilities to users.")
    System_Ext(cip-p, "City Information Platform", "Stores and provides current and<br>historical city information")

    Container_Boundary(c1, "IoT Platform") {
                
        Container(iot-dev-mgmt, "iot-device-mgmt", $techn="Go", "Backend service for device management")
        Container(iot-agent, "iot-agent", $techn="Go", "Decodes and translates incoming messages")
        Container(iot-tr-fw, "iot-transform-fiware", $tech="Go", "Transforms accepted messages into<br>corresponding datamodels known<br>to the City Information Platform")
        Container(iot-events, "iot-events", $tech="Go", "Publishing events to UI, cloudevents and more")
        Container(iot-core, "iot-core", $tech="Go", "Decorates received messages and accepts<br>them for further processing")
        
        ContainerDb_Ext(pgsql, "PostgreSQL Database", "SQL Database", "To be used for storing information<br>about device types and tenants.")

        SystemQueue_Ext(rmq, "RabbitMQ", "Message bus used for internal<br>publish/subscribe between services.")
    }

    Rel(admin, dev-mgmt-web, "Uses", "https")
    Rel(admin, keycloak, "Login", "OAuth2, Code+PKCE")

    UpdateRelStyle(admin, dev-mgmt-web, $offsetX="-50", $offsetY="-10")
    UpdateRelStyle(admin, keycloak, $offsetX="-40", $offsetY="20")

    Rel(dev-mgmt-web, keycloak, "Get JWT access token", "OAuth2")
    Rel(dev-mgmt-web, iot-dev-mgmt, "Manage devices", "https, REST")
    Rel(dev-mgmt-web, iot-events, "Live updates", "https, SSE")

    UpdateRelStyle(dev-mgmt-web, keycloak, $offsetX="30", $offsetY="-20")
    UpdateRelStyle(dev-mgmt-web, iot-dev-mgmt, $offsetX="-110", $offsetY="-50")

    Rel(iot-agent, mqtt, "subscribe to incoming<br>message payloads", "amqp")
    Rel(iot-agent, iot-dev-mgmt, "validate and<br>identify device", "https, OAuth2")
    Rel(iot-agent, iot-core, "event:<br>message.received", "queue: iot-core")

    Rel(iot-events, iot-core, "event:<br>message.received", "queue: iot-core")
    Rel(iot-events, iot-dev-mgmt, "event:<br>#", "queue: #")
    Rel(iot-events, iot-agent, "event:<br>device-status", "queue: iot-agent")


    UpdateRelStyle(iot-agent, mqtt, $offsetX="50", $offsetY="-50")
    UpdateRelStyle(iot-agent, iot-dev-mgmt, $offsetX="-40", $offsetY="-50")
    UpdateRelStyle(iot-agent, iot-core, $offsetX="10", $offsetY="-10")

    Rel(iot-core, iot-dev-mgmt, "fetch enrichment<br>details from", "https, OAuth2")
    Rel(iot-core, iot-tr-fw, "publish", "topic: message.accepted")

    UpdateRelStyle(iot-core, iot-dev-mgmt, $offsetX="-90", $offsetY="10")

    Rel(iot-tr-fw, cip-p, "Updates", "https, NGSI-LD")

    UpdateRelStyle(iot-tr-fw, cip-p, $offsetX="50", $offsetY="-30")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

{{< /mermaid >}}
