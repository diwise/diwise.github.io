+++
title = "Context Broker"
url = "services/context-broker"
menuPre = "<i class='fas fa-sitemap'></i> "
tags = ["cip"]
+++

## Description

This service is a distribution broker that federates information from multiple underlying NGSI-LD Context Brokers and across domains. It is responsible for implementing selected parts of the NGSI-LD API and limit the exposure of underlying services.

## Architecture

### Diagrams

{{< mermaid >}}
C4Container

    System_Ext(producer, "Context Producer", "An agent that uses the NGSI-LD context provision<br>and/or registration functionality to provide or announce the<br>availability of its context information to an NGSI-LD Context Broker")

    System_Ext(consumer, "Context Consumer", "An agent that uses the query and<br>subscription functionality of NGSI-LD to<br>retrieve context information")

    System_Ext(keycloak, "Keycloak", "Open ID Connect compliant<br>identity and access management")

    Container_Boundary(c1, "Context Broker") {

        Container(context-broker, "context-broker", $techn="Go", "You are here")
        Container_Ext(notifier, "notifier", $techn="Go", "A service that handles notifications")

    }

    Container_Boundary(c2, "Federated Brokers") {
        Container_Ext(brokerA, "Context Broker A", "An architectural component that implements all the NGSI-LD interfaces")
        Container_Ext(brokerB, "Context Broker B", "An architectural component that implements all the NGSI-LD interfaces")
    }

    Rel(producer, context-broker, "creates, updates or deletes<br>entities in", "https, NGSI-LD")
    Rel(consumer, context-broker, "fetches entities<br>from", "https, NGSI-LD")
    Rel(context-broker, notifier, "sends notifi-<br>cations via", "https")

    UpdateRelStyle(producer, context-broker, $offsetX="30", $offsetY="-150")
    UpdateRelStyle(consumer, context-broker, $offsetX="50", $offsetY="-150")
    UpdateRelStyle(context-broker, notifier, $offsetX="-30", $offsetY="-50")

    Rel(context-broker, keycloak, "validates auth tokens", "OIDC")
    UpdateRelStyle(context-broker, keycloak, $offsetX="-130", $offsetY="-50")

    Rel(context-broker, brokerA, "creates, retrieves, updates or<br>deletes entities in", "https, NGSI-LD")
    Rel(context-broker, brokerB, "creates, retrieves, updates or<br>deletes entities in", "https, NGSI-LD")
    UpdateRelStyle(context-broker, brokerA, $offsetX="-180", $offsetY="-40")
    UpdateRelStyle(context-broker, brokerB, $offsetX="-20", $offsetY="-40")

    Rel(notifier, consumer, "notifies registered consumers<br>about entity changes", "https, NGSI-LD")


    UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")

{{< /mermaid >}}

### Endpoints

The context broker implements a subset of the NGSI-LD API. In this section we will document what specific endpoints have been implemented.

#### NGSI-LD

In conformance with the specification, all NGSI-LD endpoints are presented under the root _/ngsi-ld/v1_. This context broker supports the following operations:

| Operation | Spec | Method | Endpoint |
| ---       | ---  | ---    | ---      |
| Create Entity | 6.4.3.1 | POST | /entities |
| Retrieve Entity | 6.5.3.1 | GET | /entities/{entityId} |
| Merge Entity | 6.5.3.4 | PATCH | /entities/{entityId} |
| Update Entity Attributes | 6.6.3.2 | PATCH | /entities/{entityId}/attrs/ |
| Retrieve Temporal Evolution of an Entity | 6.19.3.1 | GET | /temporal/entities/{entityId} |
| Delete Entity | 6.5.3.2 | DELETE | /entities/{entityId} |
| Serve @context | 6.30.3.1 | GET | /jsonldContexts/{contextId} |

#### Probes

A health endpoint, that can be used by kubernetes probes for instance, is exposed on the default port under /health. A future release will move this endpoint to a separate control and monitoring port.

## Links

| Where | Address |
| ----- | ------- |
| Git Hub | https://github.com/diwise/context-broker |
| NGSI-LD API | https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.06.01_60/gs_CIM009v010601p.pdf |

## Run

Since the service is distributed as a container image, it can easily be started using docker or podman with the following command:

```bash
docker run --rm ghcr.io/diwise/context-broker:prod-f84899004e8d3c0b72fa1c4a0803c187f72f90f8
```

To be able to do anything useful though it is dependent on one or more other brokers to federate. See the section on configuration below or checkout the compose file under https://github.com/diwise/diwise/tree/main/deployments/docker for more help on this.

### Configuration

#### Environment variables

| Name | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| CONTEXT_BROKER_CLIENT_DEBUG | boolean | false | More verbose output that can be used for debugging problems. Note that this does *NOT* control the logging level per se. |
| SERVICE_PORT | integer | 8080 | The port to accept incoming connections on |

#### Command line flags

| Flag | Type | Default | Description |
| ---  | ---  | ---     | ---         |
| config | file path | /opt/diwise/config/default.yaml | Path to a configuration file containing federation information. |
| policies | file path | /opt/diwise/config/authz.rego | An authorization policy file. |

#### Configuration files

There are two main configuration files that control the behaviour of the context broker. The first one is the federation configuration for the broker. While other brokers implement the subscription API from NGSI-LD, we have chosen a static configuration model that increase the security and supports the configuration as code methodology.

The other configuration file is the policy file that contains the authorization policy as code. The default policy uses secure defaults by only allowing *GET* requests. See more about this file under the next section.

#### Security

Access to endpoints and individual access to tenants, endpoints and entity types can be configured using an Open Policy Agent policy written in rego. The default policy sets secure defaults by restricting access to only allow GET requests.

An example of how to customize the authorization can be found in the policy file used by default in our docker compose example. See https://github.com/diwise/diwise/blob/main/deployments/docker/configs/diwise/devmgmt-auth.rego.

## Operations

If N organizations deploy their own on premise installations of diwise, they will most likely end up with N (+1?) different configurations due to differences in their infrastructure, policies and regulations. Our services are however built to allow for a large amount of flexibility when it comes to integrating diwise in an organization.

### Observability and Monitoring

Since diwise is based on a microservice architecture it is of upmost importance that we provide easy access to indicators that can help monitoring tools and human beings infer the internal state of our platform.

#### Logging

All logging is sent to stdout in json format so that it can be filtered and redirected to your logging aggregator of choice. In compose, we have chosen to use fluentbit to be able to aggregate the logging output using [Loki](https://grafana.com/oss/loki/).

Our logging framework of choice at the moment is zerolog, but we plan to make a breaking change when the structured logging package slog becomes available in the golang standard library. We really like zerolog, but believe that moving to a standard like slog is a better choice in the long run.

#### Metrics

There are currently no application specific metrics emitted from the broker, but there will be. We promise.

#### Tracing

To be able to connect the dots between different services we have decided to use the open telemetry sdk to create tracing spans with the appropriate tracing baggage. These spans can then be sent to a collector endpoint in the [OTLP](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/otlp.md) format and aggregated in a tool such as [Tempo](https://grafana.com/oss/tempo/).

The following traces are created at the application level:

| Span | Attributes | Created By | Description |
| ---  | ---        | ---        | ---         |
| post | *none* | notifier | Spans the posting of a notification to a registered endpoint. |
| create-entity | ngsild-tenant | ngsild | Spans a create entity operation intitiated via the NGSI-LD api. |
| query-entities | ngsild-tenant | ngsild | Spans a query entities operation intitiated via the NGSI-LD api. |
| retrieve-entity | ngsild-tenant entity-id | ngsild | Spans a retrieve entity operation intitiated via the NGSI-LD api. |
| merge-entity | ngsild-tenant entity-id | ngsild | Spans a merge entity operation intitiated via the NGSI-LD api. |
| update-entity-attributes | ngsild-tenant entity-id | ngsild | Spans an update entity attributes operation intitiated via the NGSI-LD api. |
| delete-entity | ngsild-tenant entity-id | ngsild | Spans a delete entity operation intitiated via the NGSI-LD api. |
| retrieve-temporal-entity | ngsild-tenant entity-id | ngsild | Spans a "retrieve temporal evolution of entity" operation intitiated via the NGSI-LD api. |

The ngsild spans have corresponding subspans that are generated by the context broker client package.

### Run Book

In this section we will list different failure modes for the service, how to detect them based on observability data and how to recover from them.

## FAQ

This section is supposed to list questions that get asked frequently by integrators and developers.

## License

This document is licensed [CC-BY](https://creativecommons.org/licenses/by/3.0/)
