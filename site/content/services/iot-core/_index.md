+++
title = "IoT Core"
url = "services/iot-core"
menuPre = "<i class='fas fa-arrows-alt'></i> "
tags = ["iot"]
+++

## Description

The iot-core service is responsible for enriching and accepting incoming messages for further processing.

## Architecture

### Diagrams

{{< mermaid >}}
C4Component

    Container_Boundary(b1, "iot-core") {

        Container_Boundary(infra, "infrastructure") {
            Component(listener, "Queue Listener", "", "listens for commands posted to<br>the iot-core queue")
        }
        
        Container_Boundary(app, "application") {
            Component(processor, "Message Processor", "", "processes received messages, enriches<br>and accepts them for further processing")
        }
    }

    Container_Boundary(b3, "iot-device-mgmt") {
        Container_Ext(devmgmt, "Device Management", "", "manages information about<br>connected devices")
    }

    Container_Boundary(b2, "messaging") {
        Container_Ext(rabbitmq, "Rabbit MQ", "", "distributes internal messages within<br>the IoT platform")
    }

    Rel(processor, devmgmt, "fetches device information from")
    UpdateRelStyle(processor, devmgmt, $offsetX="60", $offsetY="30")

    Rel(rabbitmq, listener, "delivers message.received event<br>queue: iot-core")
    UpdateRelStyle(rabbitmq, listener, $offsetX="-190", $offsetY="-10")

    Rel(listener, processor, "forwards msgs<br>to")
    UpdateRelStyle(listener, processor, $offsetX="-40", $offsetY="-30")

    Rel(processor, rabbitmq, "posts accepted message<br>topic: message.accepted")
    UpdateRelStyle(processor, rabbitmq, $offsetX="80", $offsetY="-10")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="2")

{{< /mermaid >}}

### Endpoints

#### Application

This service does not expose any application endpoints
#### Probes

A health endpoint, that can be used by kubernetes probes for instance, is exposed on the default port under /health. A future release will move this endpoint to a separate control and monitoring port.

## Links

| Where | Address |
| ----- | ------- |
| Git Hub | https://github.com/diwise/iot-core |

## Run

Since the service is distributed as a container image, it can be started using docker or podman. Do note that you must specify a couple of required environment variables though. See the configuration section below for more details.

This service has a runtime dependency on Keycloak for token management, iot-device-mgmt for device information and RabbitMQ for internal messaging. The latter can optionally be disabled for testing purposes.

Refer to the default docker compose configuration in https://github.com/diwise/diwise for details on how to start this service in concert with the rest of the platform.

### Configuration

#### Environment variables

| Name | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| DEV_MGMT_URL | url | **required** | URL to a service exposing the device management API. Typically an instance of iot-device-mgmt. |
| OAUTH2_TOKEN_URL | url | **required** | URL to an Open ID Connect token provider. |
| OAUTH2_CLIENT_ID | string | **required** | The client credentials id to use when requesting a token. |
| OAUTH2_CLIENT_SECRET | string | **required** | The client secret (password) to use when requesting a token. |
| SERVICE_PORT | integer | 8080 | The port to accept incoming connections on |

#### Command line flags

This service has no command line flags.

#### Configuration files

This service has no configuration files.

#### Security

Communication with device management requires a valid access token that will be requested via the OAuth2 token url specified in the configuration.

## Operations

### Observability and Monitoring

The documented metrics and tracing data below will be generated if the environment variable OTEL_EXPORTER_OTLP_ENDPOINT is set to a valid OTLP collector endpoint such as open telemetry collector.

#### Logging

All logging is sent to stdout in a structured json format so that it can be filtered and redirected to your logging aggregator of choice. If tracing is enabled the log output will be decorated with the corresponding traceID for easier correlation.

#### Metrics

There are currently no application specific metrics emitted from this service, but there will be. We promise.

#### Tracing

The following traces are created at the application level:

| Span | Attributes | Created By | Description |
| ---  | ---        | ---        | ---         |
| rcv-cmd | *none* | main | Spans the handling of an incoming command on the iot-core queue. |

### Run Book

In this section we will list different failure modes for the service, how to detect them based on observability data and how to recover from them.

## FAQ

This section is supposed to list questions that get asked frequently by integrators and developers.

## License

This document is licensed [CC-BY](https://creativecommons.org/licenses/by/3.0/)
