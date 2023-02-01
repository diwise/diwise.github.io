+++
title = "IoT Agent"
url = "services/iot-agent"
menuPre = "<i class='fas fa-satellite-dish'></i> "
tags = ["iot"]
+++

## Description

The iot-agent service is responsible for connecting to an underlying platform via MQTT and ingest messages from the topics it subscribes to.

## Architecture

### Diagrams

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

### Endpoints

#### Application

This service exposes the following application endpoints:

| Operation | Method | Endpoint | Description |
| ---       | ---    | ---      | ---         |
| Incoming Message | POST | /api/v0/messages | Accepts incoming message payloads for further processing |

#### Probes

A health endpoint, that can be used by kubernetes probes for instance, is exposed on the default port under /health. A future release will move this endpoint to a separate control and monitoring port.

## Links

| Where | Address |
| ----- | ------- |
| Git Hub | https://github.com/diwise/iot-agent |

## Run

Since the service is distributed as a container image, it can be started using docker or podman. Do note that you must specify a couple of required environment variables though. See the configuration section below for more details.

This service has a runtime dependency on Keycloak for token management, iot-device-mgmt for device information and RabbitMQ for internal messaging. The latter can optionally be disabled for testing purposes.

Refer to the default docker compose configuration in https://github.com/diwise/diwise for details on how to start this service in concert with the rest of the platform.

### Configuration

#### Environment variables

| Name | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| DEV_MGMT_URL | url | **required** | URL to a service exposing the device management API. Typically an instance of iot-device-mgmt. |
| MSG_FWD_ENDPOINT | url | **required** | An endpoint that incoming messages should be forwarded to. Typically this is /api/v0/messages on the same service. |
| OAUTH2_TOKEN_URL | url | **required** | URL to an Open ID Connect token provider. |
| OAUTH2_CLIENT_ID | string | **required** | The client credentials id to use when requesting a token. |
| OAUTH2_CLIENT_SECRET | string | **required** | The client secret (password) to use when requesting a token. |
| APPSERVER_FACADE | string | chirpstack | Configures how to interpret incoming message payloads. |
| MQTT_HOST | hostname | **required** | Specify the MQTT host to connect to. |
| MQTT_USER | string |  | The username (if any) used to authenticate with the MQTT server. |
| MQTT_PASSWORD | string |  | The password (if any) used to authenticate with the MQTT server. |
| MQTT_TOPIC_[x] | string | at least one required | Any number of zero indexed MQTT topics that should be subscribed to on successful connect. |
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

All logging is sent to stdout in a structured json format so that it can be filtered and redirected to your logging aggregator of choice. If tracing is enabled the log outut will be decorated with the corresponding traceID for easier correlation.

#### Metrics

| Name | Type | Description |
| ---  | ---  | ---         |
| mqtt.messages | counter | Total number of received mqtt messages |

#### Tracing

The following traces are created at the application level, provided that :

| Span | Attributes | Created By | Description |
| ---  | ---        | ---        | ---         |
| forward-message | *none* | messagehandler | Spans the operation from the time the MQTT message handler recieves a message handler, until the forwarding endpoint returns a result. |
| incoming-message | _none_ | api | Spans the operation of processing an incoming message payload. |

### Run Book

In this section we will list different failure modes for the service, how to detect them based on observability data and how to recover from them.

## FAQ

This section is supposed to list questions that get asked frequently by integrators and developers.

## License

This document is licensed [CC-BY](https://creativecommons.org/licenses/by/3.0/)
