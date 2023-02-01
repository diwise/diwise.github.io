+++
title = "Set up development environment"
url = "getting-started/how-to/dev-environment"
menuPre = "<i class='fas fa-satellite-dish'></i> "
tags = ["usage,docs"]
weight = 1
+++

### Prerequisites
* [git](https://git-scm.com/downloads)
* [docker](https://docs.docker.com/get-docker/)
* [visual studio code](https://code.visualstudio.com/download) or an IDE of your own choosing.

Provided that you have all the prerequisites installed on your computer, the first step to getting started with diwise is to check out the [main repository](https://github.com/diwise/diwise) from github.com. Copy and paste the line below into your terminal, then press enter:


```bash 
    git clone git@github.com:diwise/diwise.git
```

You can now open the project in your IDE and familiarise yourself with it.

### Preparations
The docker compose environment assumes that you have modified your hosts file to add local DNS entries for diwise.local and iam.diwise.local.

##### MacOSX:

Edit your /private/etc/hosts file to include the two lines:

```bash 
    127.0.0.1 diwise.local
    127.0.0.1 iam.diwise.local
```

Then invoke the following command to allow the mappings to take effect:

```bash
    sudo killall -HUP mDNSResponder
```

##### Windows:
Edit your C:\Windows\System32\drivers\etc\hosts file to include the two lines:

```bash 
    127.0.0.1 diwise.local
    127.0.0.1 iam.diwise.local
```

### Running and testing
You can use the commands below to start, test and take down the composed environment. The commands assume you are standing at the root of the project directory.

##### Run the compose environment
```bash
    docker compose -f deployments/docker/docker-compose.yaml up
```

##### Sending data packets
While the compose environment is up and running, data packets can be ingested using curl or another tool of your choice by posting data to https://diwise.local:8443/api/v0/messages.

##### Clean up environment after testing
```bash 
    docker compose -f deployments/docker/docker-compose.yaml down -v --remove-orphans
```

### Observability
To run diwise with log, metric and trace aggregation enabled using tools like [fluent-bit](https://fluentbit.io), [loki](https://grafana.com/oss/loki/), [otel-collector](https://opentelemetry.io/docs/collector/) and [tempo](https://grafana.com/oss/tempo/). These are set up in a separate docker compose for performance reasons and must be explicitly included when starting the environment.

```bash 
    docker compose -f deployments/docker/docker-compose.yaml -f deployments/docker/docker-compose.o11y.yaml up
```

Once started the data collected by these tools will be accessible via https://diwise.local:8443/grafana/


### Additional configuration
##### Configure MQTT
On docker compose up, the services will start with MQTT disabled. The recommended way to add configuration parameters is to create a docker-compose.override.yaml file containing user or project specific settings/secrets that should not be pushed to the repo. For extra protection, this file name is added to the [.gitignore](.gitignore) file to reduce the likelihood that settings are pushed to GitHub.

An example configuration looks like this:

```bash 
    version: '3'
    services:

        iot-agent:
            environment:
                MQTT_DISABLED: 'false'
                MQTT_HOST: 'your.mqtt.server'
                MQTT_USER: '<mqtt-user>'
                MQTT_PASSWORD: '<mqtt-password>'
                MQTT_TOPIC_0: '<mqtt-topic>'
```

And is merged with the default configuration by adding a -f argument to compose like so:

```bash 
    docker compose -f deployments/docker/docker-compose.yaml -f deployments/docker/docker-compose.override.yaml up
```
