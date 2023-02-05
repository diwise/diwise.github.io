+++
title = "IoT Transform Fiware"
url = "services/iot-transform-fiware"
menuPre = "<i class='fas fa-random'></i> "
tags = ["iot"]
+++

## Description

The iot-transform-fiware service is responsible for transforming incoming sensor data to corresponding fiware entities, if any.

## Architecture

### Diagrams

{{< mermaid >}}
C4Component

    Component_Ext(rabbitmq, "RabbitMQ", "", " ")
    Component_Ext(broker, "Context Broker", "", " ")

    Container_Boundary(b1, "iot-transform-fiware") {

        Container_Boundary(msgp, "Application") {
            Component(mp, "Message Processor", "", "processes incoming<br>messages")
            Component(transreg, "Registry", "", "contains all available<br>transformers")
            Component(transformer, "Transformer", "", "transforms a given payload<br>to a specific entity type")
        }

        Container_Boundary(bc, "Context Broker Client") {
            Component(client, "Client", "", "abstracts the broker's<br>NGSI-LD API")
        }

    }

    Rel(rabbitmq, mp, "delivers messages to", "topic: message.accepted")
    UpdateRelStyle(rabbitmq, mp, $offsetX="0", $offsetY="-90")

    Rel(mp, transreg, "finds<br>transformer<br>in")
    UpdateRelStyle(mp, transreg, $offsetX="-25", $offsetY="-30")

    Rel(mp, transformer, "forwards message<br>to")
    UpdateRelStyle(mp, transformer, $offsetX="10", $offsetY="0")

    Rel(transformer, client, "uses")

    Rel(client, broker, "creates or updates entities in broker", "https, NGSI-LD")
    UpdateRelStyle(client, broker, $offsetX="-30", $offsetY="-90")

    UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="3")

{{< /mermaid >}}

### Endpoints

#### Application

This service does not expose any application endpoints.

#### Probes

A health endpoint, that can be used by kubernetes probes for instance, is exposed on the default port under /health. A future release will move this endpoint to a separate control and monitoring port.

## Links

| Where | Address |
| ----- | ------- |
| Git Hub | https://github.com/diwise/iot-transform-fiware |

## Run

Since the service is distributed as a container image, it can be started using docker or podman. It has a runtime dependency on a running context broker to be able to create or update entities. The url to this broker is specified via an environment variabel. See configuration below.

Refer to the default docker compose configuration in https://github.com/diwise/diwise for details on how to start this service in concert with the rest of the platform.

### Configuration

#### Environment variables

| Name | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| NGSI_CB_URL | url | **required** | URL to a service exposing the NGSI-LD API. Typically an instance of context-broker. |
| SERVICE_PORT | integer | 8080 | The port to accept incoming connections on |

#### Command line flags

This service has no command line flags.

#### Configuration files

This service has no configuration files.

## Operations

### Observability and Monitoring

The documented metrics and tracing data below will be generated if the environment variable OTEL_EXPORTER_OTLP_ENDPOINT is set to a valid OTLP collector endpoint such as open telemetry collector.

#### Logging

All logging is sent to stdout in a structured json format so that it can be filtered and redirected to your logging aggregator of choice. If tracing is enabled the log output will be decorated with the corresponding traceID for easier correlation.

#### Metrics

This service does not emit any application level metrics, yet.

#### Tracing

The following traces are created at the application level:

| Span | Attributes | Created By | Description |
| ---  | ---        | ---        | ---         |
| <<queue name>> receive | *none* | messaging | Span containing the handling of an incoming message from the message.accepted topic. |
| create-entity | ngsild-tenant | context broker client | Spans a create entity operation intitiated via the context broker client. |
| merge-entity | ngsild-tenant entity-id | context broker client | Spans a merge entity operation intitiated via the context broker client. |
| update-entity-attributes | ngsild-tenant entity-id | context broker client | Spans an update entity attributes operation intitiated via the context broker client. |

### Run Book

In this section we will list different failure modes for the service, how to detect them based on observability data and how to recover from them.

## FAQ

This section is supposed to list questions that get asked frequently by integrators and developers.

## License

This document is licensed [CC-BY](https://creativecommons.org/licenses/by/3.0/)
