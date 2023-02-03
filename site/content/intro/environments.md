+++
title = "Environments"
url = "intro/environments"
description = ""
menuPre = "<i class='fas fa-map'></i> "
tags = ["usage", "docs"]
weight = 3
+++

{{% notice style="primary" title="MVP Warning!" icon="skull-crossbones" %}}
This is a feature implementation is an MVP and will be changed in an upcoming PR.
{{% /notice %}}

| Environment | Description |
|----------------|-------------|
| | It's possible to omit this value |
| air | If a sensor is placed within air |
| indoors | Indoor sensor |
| lifebuoy | Special case, if a presence sensor is used to detect presence of a  lifebuoy |
| soil | for sensors placed in soil |
| water | sensors placed in water |

## Configure

Available environments are configured in a [iot-device-mgmt]({{< relref "/services/iot-device-mgmt" >}}) configuration file. To connect a sensor to an environment, add a supported value in the *where* column of the *device.csv* file as described [here]({{< relref "/getting-started/how-to/add-device#add-device-metadata" >}})

## Usages

The environment value is added to the [output]({{< relref "/getting-started/how-to/add-device#output" >}}) from [iot-core]({{< relref "/services/iot-core" >}}) and could be used be other services.

One service that uses the environment value is [iot-transform-fiware]({{< relref "/services/iot-transform-fiware" >}}). The [measurement type]({{< relref "/intro/measurements" >}}) in combination with environment is used to decide which Smart Data Model to create or update.
