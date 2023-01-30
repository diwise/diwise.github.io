var relearn_search_index=[{content:`An introduction to development, installation and deployment.
`,description:"",tags:null,title:"Introduction",uri:"/intro/index.html"},{content:'System Context Diagram C4Context Boundary(boutputs, "egresses", "Integrations") { System_Ext(subs, "Subscribers") } Boundary(b0, "diwise", "Software System") { System(iot-p, "IoT Platform", "Manages devices and aggregates\u003cbr\u003einformation from different platforms.") System(cip-p, "City Information Platform", "Stores and provides current and\u003cbr\u003ehistorical city information.") } Boundary(binputs, "ingresses", "Integrations") { SystemQueue_Ext(mqtt, "MQTT") System(integration, "Integration", "Fetches data from external services\u003cbr\u003eand stores them in CiP") } Boundary(bonline, "Third Party Services", "") { System_Ext(ext-iot-p, "External IoT Platform") System_Ext(exts, "External Services") } Rel(iot-p, mqtt, "pub/sub", "amqp") Rel(cip-p, subs, "Notifies", "https, NGSI-LD Notification") Rel(iot-p, cip-p, "Updates", "https, NGSI-LD") Rel(iot-p, subs, "Notifies", "https, Cloud Event") Rel(ext-iot-p, mqtt, "pub/sub", "amqp") Rel(integration, exts, "Fetches telemetry and data") Rel(integration, cip-p, "Updates", "NGSI-LD") UpdateRelStyle(iot-p, mqtt, $offsetX="-60", $offsetY="-40") UpdateRelStyle(cip-p, subs, $offsetX="30", $offsetY="-50") UpdateRelStyle(iot-p, cip-p, $offsetX="-40", $offsetY="30") UpdateRelStyle(iot-p, subs, $offsetX="-120", $offsetY="-50") UpdateRelStyle(integration, cip-p, $offsetX="25", $offsetY="-40") UpdateRelStyle(integration, exts, $offsetX="50", $offsetY="5") UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1") ',description:"",tags:null,title:"Overview",uri:"/architecture/overview/index.html"},{content:`Contents Under construction, pardon the mess…
City Information Platform IoT Platform Overview `,description:"",tags:null,title:"Architecture",uri:"/architecture/index.html"},{content:'Container Diagram C4Container System_Ext(dataportal, "dataportal.se", "Harvests meta data about open API:s") System_Ext(iot-p, "IoT Platform", "Stores and provides current and\u003cbr\u003ehistorical city information") System_Ext(keycloak, "Keycloak", "Open ID Connect compliant\u003cbr\u003eidentity and access management") System(opendata, "Open Data", "Provides open data via REST API:s") System(batch, "Batch Job", "Extracts data periodically") System(integrations, "Integrations", "Fetches data from external services and\u003cbr\u003eintegrates it into the CIP") Container_Boundary(c1, "City Information Platform") { Container_Ext(orion-ld, "Orion-LD", $techn="C++", "Orion-LD is a Context Broker and CEF\u003cbr\u003ebuilding block for context data management\u003cbr\u003ewhich supports both the\u003cbr\u003eNGSI-LD and the NGSI-v2 APIs.") Container(context-broker, "context-broker", $techn="Go", "Federating context broker") Container_Ext(mintaka, "Mintaka", $techn="Java/Micronaut", "Mintaka is an implementation of the\u003cbr\u003eNGSI-LD temporal retrieval api.\u003cbr\u003eIt relies on the Orion-LD Context Broker\u003cbr\u003eto provide the underlying database.") ContainerDb_Ext(mongo, "MongoDB Database", "Document Database", "") ContainerDb_Ext(timescale, "Timescale Database", "Time series database", "") } Rel(dataportal, opendata, "harvests metadata from", "https, DCAT-AP-SE") UpdateRelStyle(dataportal, opendata, $offsetX="-150", $offsetY="-10") Rel(batch, context-broker, "retrieves entities from", "https, NGSI-LD, OAuth2") UpdateRelStyle(batch, context-broker, $offsetX="-170", $offsetY="-80") Rel(opendata, context-broker, "retrieves entities from", "https, NGSI-LD") UpdateRelStyle(opendata, context-broker, $offsetX="-260", $offsetY="-80") Rel(iot-p, context-broker, "creates or updates entities in", "NGSI-LD, OAuth2") UpdateRelStyle(iot-p, context-broker, $offsetX="-200", $offsetY="-170") Rel(integrations, context-broker, "creates or updates entities in", "NGSI-LD") UpdateRelStyle(integrations, context-broker, $offsetX="90", $offsetY="-80") Rel(context-broker, orion-ld, "delegates non\u003cbr\u003etemporal reqs to", "NGSI-LD") Rel(context-broker, mintaka, "delegate temporal\u003cbr\u003eAPI requests to", "NGSI-LD") Rel(context-broker, keycloak, "validates JWT token via", "OIDC") UpdateRelStyle(context-broker, orion-ld, $offsetX="-45", $offsetY="-40") UpdateRelStyle(context-broker, mintaka, $offsetX="-47", $offsetY="-40") UpdateRelStyle(context-broker, keycloak, $offsetX="-75", $offsetY="-170") Rel(orion-ld, mongo, "CRUD", "mongo") Rel(orion-ld, timescale, "store details about temporal\u003cbr\u003eevolution of entities in", "pgsql") UpdateRelStyle(orion-ld, mongo, $offsetX="-60", $offsetY="-10") Rel(mintaka, timescale, "reads temporal data from", "pgsql") UpdateRelStyle(mintaka, timescale, $offsetX="60", $offsetY="0") UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1") ',description:"",tags:null,title:"City Information Platform",uri:"/architecture/cip/index.html"},{content:'Container Diagram C4Container Person(admin, "Administrator") System_Ext(keycloak, "Keycloak", "Open ID Connect compliant identity and access management") SystemQueue_Ext(mqtt, "MQTT", "Message bus to interact with underlying IoT platform") Container(dev-mgmt-web, "Device Management UI", $techn="JavaScript, React", "Presents devicemanagement capabilities to users.") System_Ext(cip-p, "City Information Platform", "Stores and provides current and\u003cbr\u003ehistorical city information") Container_Boundary(c1, "IoT Platform") { Container(iot-dev-mgmt, "iot-device-mgmt", $techn="Go", "Backend service for device management") Container(iot-agent, "iot-agent", $techn="Go", "Decodes and translates incoming messages") Container(iot-tr-fw, "iot-transform-fiware", $tech="Go", "Transforms accepted messages into\u003cbr\u003ecorresponding datamodels known\u003cbr\u003eto the City Information Platform") ContainerDb_Ext(pgsql, "PostgreSQL Database", "SQL Database", "To be used for storing information\u003cbr\u003eabout device types and tenants.") Container(iot-core, "iot-core", $tech="Go", "Decorates received messages and accepts\u003cbr\u003ethem for further processing") SystemQueue_Ext(rmq, "RabbitMQ", "Message bus used for internal\u003cbr\u003epublish/subscribe between services.") } Rel(admin, dev-mgmt-web, "Uses", "https") Rel(admin, keycloak, "Login", "OAuth2, Code+PKCE") UpdateRelStyle(admin, dev-mgmt-web, $offsetX="-50", $offsetY="-10") UpdateRelStyle(admin, keycloak, $offsetX="-40", $offsetY="20") Rel(dev-mgmt-web, keycloak, "Get JWT access token", "OAuth2") Rel(dev-mgmt-web, iot-dev-mgmt, "Manage devices", "https, REST") UpdateRelStyle(dev-mgmt-web, keycloak, $offsetX="30", $offsetY="-20") UpdateRelStyle(dev-mgmt-web, iot-dev-mgmt, $offsetX="-110", $offsetY="-50") Rel(iot-agent, mqtt, "subscribe to incoming\u003cbr\u003emessage payloads", "amqp") Rel(iot-agent, iot-dev-mgmt, "validate and\u003cbr\u003eidentify device", "https, OAuth2") Rel(iot-agent, iot-core, "event:\u003cbr\u003emessage.received", "queue: iot-core") UpdateRelStyle(iot-agent, mqtt, $offsetX="50", $offsetY="-50") UpdateRelStyle(iot-agent, iot-dev-mgmt, $offsetX="-40", $offsetY="-50") UpdateRelStyle(iot-agent, iot-core, $offsetX="10", $offsetY="-10") Rel(iot-core, iot-dev-mgmt, "fetch enrichment\u003cbr\u003edetails from", "https, OAuth2") Rel(iot-core, iot-tr-fw, "publish", "topic: message.accepted") UpdateRelStyle(iot-core, iot-dev-mgmt, $offsetX="-90", $offsetY="10") Rel(iot-tr-fw, cip-p, "Updates", "https, NGSI-LD") UpdateRelStyle(iot-tr-fw, cip-p, $offsetX="50", $offsetY="-30") UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1") ',description:"",tags:null,title:"IoT Platform",uri:"/architecture/iot/index.html"},{content:`Documentation regarding deployment and use of our included services.
Context Broker IoT Agent `,description:"",tags:null,title:"Microservices",uri:"/services/index.html"},{content:`Information on how to get started.
`,description:"",tags:null,title:"Getting Started",uri:"/getting-started/index.html"},{content:`More detailed information and help with configuration.
`,description:"",tags:null,title:"Configuration",uri:"/configuration/index.html"},{content:"",description:"",tags:null,title:"Categories",uri:"/categories/index.html"},{content:"",description:"",tags:null,title:"cip",uri:"/tags/cip/index.html"},{content:`Test Under construction, pardon the mess…
`,description:"",tags:["cip"],title:"Context Broker",uri:"/services/context-broker/index.html"},{content:`If the things around you could talk, what would they say?
Introduction Diwise diwise is an IoT communication platform that receives data from sensors and regulates physical control systems, which means that business systems are separated from both communication interfaces and different sensor types.
Documentation On these pages we will publish technical information and documentation regarding the platform.
Contact If you want to get in touch with us or learn more about what we can offer, check out our website diwise.se.
`,description:"",tags:null,title:"Diwise",uri:"/index.html"},{content:"",description:"",tags:null,title:"iot",uri:"/tags/iot/index.html"},{content:' C4Component Container_Boundary(b1, "iot-agent") { Container_Boundary(apib, "API") { Component(api, "API", "", "handles incoming messages") } Container_Boundary(msgp, "Message Processor") { Component(decoderreg, "Decoder Registry", "", "contains all available decoders") Component(decoder, "Decoder", "", "decodes incoming sensor specific\u003cbr\u003epayloads to internal format") Component(converterreg, "Converter registry", "", "contains all available converters") Component(converter, "Converter", "", "converts internal format\u003cbr\u003eto LWM2M SenML") } Container_Boundary(evts, "Event Sender") { Component(sender, "Sender") } Component(mqtt-client, "MQTT Client") } UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="3") ',description:"",tags:["iot"],title:"IoT Agent",uri:"/services/iot-agent/index.html"},{content:"",description:"",tags:null,title:"Tags",uri:"/tags/index.html"}]