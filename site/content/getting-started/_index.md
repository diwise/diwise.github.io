+++
archetype = "chapter"
title = "Getting Started"
url = "getting-started"
weight = 4
menuPre = "<i class='fas fa-wrench'></i> "
+++

#### Prerequisites
* git
* docker

Provided that you have git installed and the ability to run docker on your local machine, the first step to getting started with diwise is to check out the [main repository](https://github.com/diwise/diwise) from github.com.


#### Preparations
The docker compose environment assumes that you have modified your hosts file to add local DNS entries for diwise.local and iam.diwise.local.

##### MacOSX:

Edit your /private/etc/hosts file to include the two lines:
    
    127.0.0.1 diwise.local
    127.0.0.1 iam.diwise.local

Then invoke the following command to allow the mappings to take effect:

    sudo killall -HUP mDNSResponder

##### Windows:
Edit your C:\Windows\System32\drivers\etc\hosts file to include the two lines:

    127.0.0.1 diwise.local
    127.0.0.1 iam.diwise.local

#### Running and sending test data
Once you have sorted the prerequisites you can use the command below to start the composed environment:

##### To run the compose environment
    docker compose -f deployments/docker/docker-compose.yaml up

##### Sending data packets
While the compose environment is up and running, data packets can be ingested using curl or another tool of your choice by posting data to https://diwise.local:8443/api/v0/messages.

##### To clean up environment after testing
    docker compose -f deployments/docker/docker-compose.yaml down -v --remove-orphans

#### Observability
To run diwise with log, metric and trace aggregation enabled using tools like fluent-bit, loki, otel-collector and tempo. These are set up in a separate docker compose for performance reasons and must be explicitly included when starting the environment.

    docker compose -f deployments/docker/docker-compose.yaml -f deployments/docker/docker-compose.o11y.yaml up

Once started the data collected by these tools will be accessible via https://diwise.local:8443/grafana/

#### Configure MQTT
On docker compose up, the services will start with MQTT disabled. The recommended way to add configuration parameters is to create a docker-compose.override.yaml file containing user or project specific settings/secrets that should not be pushed to the repo. For extra protection, this file name is added to the .gitignore file to reduce the likelihood that settings are pushed to GitHub.

An example configuration looks like this:

    version: '3'
    services:

        iot-agent:
            environment:
                MQTT_DISABLED: 'false'
                MQTT_HOST: 'your.mqtt.server'
                MQTT_USER: '<mqtt-user>'
                MQTT_PASSWORD: '<mqtt-password>'
                MQTT_TOPIC_0: '<mqtt-topic>'

And is merged with the default configuration by adding a -f argument to compose like so:

    docker compose -f deployments/docker/docker-compose.yaml -f deployments/docker/docker-compose.override.yaml up
