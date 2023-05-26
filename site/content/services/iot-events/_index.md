+++
title = "IoT Events"
url = "services/iot-events"
menuPre = "<i class='fas fa-arrows-alt'></i> "
tags = ["iot"]
+++

## Description

The iot-events service is responsible to listen to and forward events to subscribers. For now two subscribers exists, one that pushes messages using a SSE connection and another that POST cloudevents to a configured endpoint. Device Management UI subscribes to updates using an SSE subscriber.

## Architecture

The service subscribes to, by default, all Rabbit MQ topics within diwise. When an event is received, using the mediator pattern, it is pushed to its subscribers for processing.

### Diagrams

{{< mermaid >}}
C4Component

    Container_Boundary(b2, "messaging") {
        Container_Ext(rabbitmq, "Rabbit MQ", "", "distributes internal messages within<br>the IoT platform")
    }

    Container_Boundary(b1, "iot-events") {

        Container_Boundary(infra, "infrastructure") {
            Component(listener, "Queue Listener", "", "listens for events posted to<br> all queues")
        }
        
        Container_Boundary(app, "application") {
            Component(mediator, "Mediator", "", "publish messages to internal<br>subscribers for processing")
        }

        Container_Boundary(subscribers, "subscribers") {
            Component(sse, "SSE", "", "publish messages to internal<br>subscribers for processing")
            Component(cloudevents, "Cloudevents", "", "publish messages to internal<br>subscribers for processing")
            
        }        
    }

    Container_Boundary(b3, "iot-device-mgmt-web") {
        Container_Ext(devmgmt, "Device Management UI", "", "manages information about<br>connected devices")
    }



    Container_Boundary(b4, "external") {
        Container_Ext(external, "External system", "", "subscribes to cloudevents")
    }

    Rel(mediator, sse, "subscribes to events")
    Rel(mediator, cloudevents, "subscribes to events")


    Rel(sse, devmgmt, "push events to")
    UpdateRelStyle(sse, devmgmt, $offsetX="5", $offsetY="10")

    Rel(cloudevents, external, "push events to")
    UpdateRelStyle(cloudevents, external, $offsetX="5", $offsetY="10")

    Rel(rabbitmq, listener, "delivers message.received event<br>queue: iot-core")
    UpdateRelStyle(rabbitmq, listener, $offsetX="-190", $offsetY="-10")

    Rel(listener, mediator, "forwards msgs<br>to")
    UpdateRelStyle(listener, mediator, $offsetX="-40", $offsetY="-30")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="2")

{{< /mermaid >}}

### Endpoints

#### Application

This service exposes the following application endpoints:

| Operation | Method | Endpoint | Description |
| ---       | ---    | ---      | ---         |
| Request | GET | /api/v0/events | Opens a SSE keep alive connection for receiving events |

#### Probes

A health endpoint, that can be used by kubernetes probes for instance, is exposed on the default port under /health. A future release will move this endpoint to a separate control and monitoring port.

## Links

| Where | Address |
| ----- | ------- |
| Git Hub | <https://github.com/diwise/iot-events> |

## Run

Since the service is distributed as a container image, it can be started using docker or podman.

Refer to the default docker compose configuration in <https://github.com/diwise/diwise> for details on how to start this service in concert with the rest of the platform.

### Configuration

#### Environment variables

| Name | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| SERVICE_PORT | integer | 8080 | The port to accept incoming connections on |
| RABBITMQ_TOPIC | string | # | topic to listen to |

#### Command line flags

| Name | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| cloudevents | file path | /opt/diwise/config/cloudevents.yaml | Configuration for cloudevent subscribers |
| policies | file path | /opt/diwise/config/authz.rego | Open Policy Agent configuration file |

#### Configuration files

##### cloudevents

```yaml
subscribers:
  - id: qalcosonic
    name: Qalcosonic W1 StatusCodes
    type: device.statusUpdated
    endpoint: http://example.com/api/cloudevents
    source: github.com/diwise/iot-device-mgmt
    eventType: diwise.statusmessage
    tenants:
      - default
      - test
    entities:
      - idPattern: ^urn:ngsi-ld:Device:.+
```

| Name | Description |
| ---  | ---         |
| id | ID for subscribtion, must be unique |  
| name | Name for describing the subscription |  
| type | type of event to foward |  
| endpoint | POST cloudevent to this endpoint |  
| source | source of event |  
| eventType | event type set in cloudevent |  
| tenants | filter event for tenants |  
| entities | filter entites by id pattern. Emtpty will allow all ID's |  

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

### Run Book

In this section we will list different failure modes for the service, how to detect them based on observability data and how to recover from them.

## FAQ

This section is supposed to list questions that get asked frequently by integrators and developers.

## License

This document is licensed [CC-BY](https://creativecommons.org/licenses/by/3.0/)
