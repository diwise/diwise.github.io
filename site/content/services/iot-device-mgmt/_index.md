+++
title = "IoT Device Management"
url = "services/iot-device-mgmt"
menuPre = "<i class='fas fa-list'></i> "
tags = ["iot"]
+++

## Description

The iot-device-mgmt service is responsible for managing all the registered devices.

## Architecture

### Diagrams

{{< mermaid >}}
C4Component

    Container_Ext(keycloak, "Keycloak", "")

    Container_Boundary(b1, "iot-device-mgmt") {

        Container_Boundary(api, "API") {
            Component(api, "API", "", "handles incoming<br>requests")
        }

        Container_Boundary(events, "Events") {
            Component(db, "In Memory Database", "", "contains all registered<br>devices")
            Component(cloudevt, "Cloud Event Generator", "", "generates cloud events to<br>registered subscribers")            
        }

        Container_Boundary(monitor, "Monitoring") {
            Component(watchdog, "Watchdog", "", "monitors liveliness of<br>registered devices")
        }

    }

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="3")

{{< /mermaid >}}

### Endpoints

#### Application

This service exposes the following application endpoints:

| Operation | Method | Endpoint | Description |
| ---       | ---    | ---      | ---         |
| Query Devices | GET | /api/v0/devices | Returns a list of all the registered devices that the client has access to. |
| Retrieve Device | GET | /api/v0/devices/{deviceId} | Retrieve information about a specific device. |
| Event Subscription | GET | /api/v0/events | Subscribe to server sent events (SSE) about all device status changes. |

#### Probes

A health endpoint, that can be used by kubernetes probes for instance, is exposed on the default port under /health. A future release will move this endpoint to a separate control and monitoring port.

## Links

| Where | Address |
| ----- | ------- |
| Git Hub | https://github.com/diwise/iot-device-mgmt |

## Run

Since the service is distributed as a container image, it can be started using docker or podman. Do note that you must specify a couple of required environment variables though. See the configuration section below for more details.

This service has a runtime dependency on Keycloak for token management and RabbitMQ for internal messaging. The latter can optionally be disabled for testing purposes.

Refer to the default docker compose configuration in https://github.com/diwise/diwise for details on how to start this service in concert with the rest of the platform.

### Configuration

#### Environment variables

| Name | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| OAUTH2_TOKEN_URL | url | **required** | URL to an Open ID Connect token provider. |
| OAUTH2_CLIENT_ID | string | **required** | The client credentials id to use when requesting a token. |
| OAUTH2_CLIENT_SECRET | string | **required** | The client secret (password) to use when requesting a token. |
| SERVICE_PORT | integer | 8080 | The port to accept incoming connections on |

#### Command line flags

| Flag | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| devices | directory path | /opt/diwise/config/data | Path to a configuration directory containing device information. |
| policies | file path | /opt/diwise/config/authz.rego | An authorization policy file. |
| notifications | file path | /opt/diwise/config/notifications.yaml | Path to a configuration file containing information about notification endpoints. |

#### Configuration files

**TODO:** Document the configuration files ...

#### Security

Access to the published endpoints is controlled with the help of an Open Policy Agent rego policy that should be mounted as part of the deployment. The granularity and level of this security is up to the administrator of this service.

## Operations

### Observability and Monitoring

The documented metrics and tracing data below will be generated if the environment variable OTEL_EXPORTER_OTLP_ENDPOINT is set to a valid OTLP collector endpoint such as open telemetry collector.

#### Logging

All logging is sent to stdout in a structured json format so that it can be filtered and redirected to your logging aggregator of choice. If tracing is enabled the log output will be decorated with the corresponding traceID for easier correlation.

#### Metrics

This service does not, yet, expose any application level metrics.

#### Tracing

The following traces are created at the application level:

| Span | Attributes | Created By | Description |
| ---  | ---        | ---        | ---         |
| query-devices | *none* | api | Spans the operation of retreiving the device list and returning it to a caller. |
| retrieve-device | _none_ | api | Spans the operation of retrieving information about a device and returning it to the caller. |
| check-auth | *none* | auth | Spans the operation of checking authorization status based on token contents. |

### Run Book

In this section we will list different failure modes for the service, how to detect them based on observability data and how to recover from them.

## FAQ

This section is supposed to list questions that get asked frequently by integrators and developers.

## License

This document is licensed [CC-BY](https://creativecommons.org/licenses/by/3.0/)
