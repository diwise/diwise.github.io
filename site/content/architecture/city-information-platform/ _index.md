+++
title = "City Information Platform"
url = "architecture/cip"
description = "How we integrate different smart city components into a greater whole."
menuPre = "<i class='fas fa-city'></i> "
weight = 2
tags = ["arch", "cip"]
+++

## Container Diagram

{{< mermaid >}}
C4Container

    System_Ext(dataportal, "dataportal.se", "Harvests meta data about open API:s")
    System_Ext(iot-p, "IoT Platform", "Stores and provides current and<br>historical city information")
    System_Ext(keycloak, "Keycloak", "Open ID Connect compliant<br>identity and access management")
    System(opendata, "Open Data", "Provides open data via REST API:s")
    System(batch, "Batch Job", "Extracts data periodically")
    System(integrations, "Integrations", "Fetches data from external services and<br>integrates it into the CIP")

    Container_Boundary(c1, "City Information Platform") {

        Container_Ext(orion-ld, "Orion-LD", $techn="C++", "Orion-LD is a Context Broker and CEF<br>building block for context data management<br>which supports both the<br>NGSI-LD and the NGSI-v2 APIs.")

        Container(context-broker, "context-broker", $techn="Go", "Federating context broker")

        Container_Ext(mintaka, "Mintaka", $techn="Java/Micronaut", "Mintaka is an implementation of the<br>NGSI-LD temporal retrieval api.<br>It relies on the Orion-LD Context Broker<br>to provide the underlying database.")

        ContainerDb_Ext(mongo, "MongoDB Database", "Document Database", "")
        ContainerDb_Ext(timescale, "Timescale Database", "Time series database", "")
    }

    Rel(dataportal, opendata, "harvests metadata from", "https, DCAT-AP-SE")
    UpdateRelStyle(dataportal, opendata, $offsetX="-150", $offsetY="-10")

    Rel(batch, context-broker, "retrieves entities from", "https, NGSI-LD, OAuth2")
    UpdateRelStyle(batch, context-broker, $offsetX="-170", $offsetY="-80")

    Rel(opendata, context-broker, "retrieves entities from", "https, NGSI-LD")
    UpdateRelStyle(opendata, context-broker, $offsetX="-260", $offsetY="-80")

    Rel(iot-p, context-broker, "creates or updates entities in", "NGSI-LD, OAuth2")
    UpdateRelStyle(iot-p, context-broker, $offsetX="-200", $offsetY="-170")

    Rel(integrations, context-broker, "creates or updates entities in", "NGSI-LD")
    UpdateRelStyle(integrations, context-broker, $offsetX="90", $offsetY="-80")

    Rel(context-broker, orion-ld, "delegates non<br>temporal reqs to", "NGSI-LD")
    Rel(context-broker, mintaka, "delegate temporal<br>API requests to", "NGSI-LD")
    Rel(context-broker, keycloak, "validates JWT token via", "OIDC")
    UpdateRelStyle(context-broker, orion-ld, $offsetX="-45", $offsetY="-40")
    UpdateRelStyle(context-broker, mintaka, $offsetX="-47", $offsetY="-40")
    UpdateRelStyle(context-broker, keycloak, $offsetX="-75", $offsetY="-170")

    Rel(orion-ld, mongo, "CRUD", "mongo")
    Rel(orion-ld, timescale, "store details about temporal<br>evolution of entities in", "pgsql")
    UpdateRelStyle(orion-ld, mongo, $offsetX="-60", $offsetY="-10")

    Rel(mintaka, timescale, "reads temporal data from", "pgsql")
    UpdateRelStyle(mintaka, timescale, $offsetX="60", $offsetY="0")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

{{< /mermaid >}}
