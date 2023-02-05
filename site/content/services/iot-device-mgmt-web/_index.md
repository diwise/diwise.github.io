+++
title = "IoT Device Dashboard"
url = "services/iot-device-mgmt-web"
menuPre = "<i class='fas fa-tablet-alt'></i> "
tags = ["iot"]
+++

## Description

The iot-device-mgmt-web service is responsible for providing a status view of the registered devices.

## Architecture

### Diagrams

{{< mermaid >}}
C4Component

    Container_Ext(keycloak, "Keycloak", "", "")
    Person_Ext(user, "Administrator")

    Container_Boundary(b1, "iot-device-mgmt-web") {
        Component(app, "React App", "", "displays information about registered devices")
    }

    Container_Boundary(b3, "iot-device-mgmt") {
        Container_Ext(devmgmt, "Device Management", "", "manages information about<br>connected devices")
    }

    Rel(app, keycloak, "fetches access<br>token from")
    UpdateRelStyle(app, keycloak, $offsetX="-120", $offsetY="-50")

    Rel(user, keycloak, "logs in via")
    UpdateRelStyle(user, keycloak, $offsetX="-20", $offsetY="-30")

    Rel(user, app, "uses")
    UpdateRelStyle(user, app, $offsetX="75", $offsetY="-50")

    BiRel(app, devmgmt, "fetches device status from <br>https and server push")
    UpdateRelStyle(app, devmgmt, $offsetX="30", $offsetY="-30")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

{{< /mermaid >}}

### Endpoints

#### Application

This service is a frontend client, and does not expose any application endpoints of its own.
#### Probes

A health endpoint, that can be used by kubernetes probes for instance, is exposed on the default port under /health. A future release will move this endpoint to a separate control and monitoring port.

## Links

| Where | Address |
| ----- | ------- |
| Git Hub | https://github.com/diwise/iot-device-mgmt-web |

## Run

Since the service is distributed as a container image, it can easily be started using docker or podman.

This service has a runtime dependency on Keycloak for token management and iot-device-mgmt for device information. Consult the source repository for information on how best to start this service for development purposes.

Refer to the default docker compose configuration in https://github.com/diwise/diwise for details on how to start this service in concert with the rest of the platform.

### Configuration

#### Environment variables

This service does not use environment variables for configuration.

#### Command line flags

This service has no command line flags.

#### Configuration files

The behavior of the device management frontend is primarily configured by two files.

/config/keycloak.json should include a keycloak adapter configuration file. See the [keycloak documentation](https://www.keycloak.org/docs/latest/securing_apps/) for information about its contents.

```json
{
    "realm": "<realm-name>",
    "auth-server-url": "<url to keycloak server>",
    "ssl-required": "external",
    "resource": "<name given to the frontend client in keycloak>",
    "public-client": true
}
```

/config/env-config.js allows the injection of variables into the running frontend application. At the moment this only supports changing the customer logotype on the dashboard, but more customizations will be available as we move along.

```js
window._env_ = {
  CUSTOMER_LOGO_URL: "https://some.customer.site/images/logo.svg",
}
```

#### Security

Communication with device management requires a valid access token that will be requested via configured keycloak instance.

## Operations

### Run Book

In this section we will list different failure modes for the service, how to detect them based on observability data and how to recover from them.

## FAQ

This section is supposed to list questions that get asked frequently by integrators and developers.

## License

This document is licensed [CC-BY](https://creativecommons.org/licenses/by/3.0/)
