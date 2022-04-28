---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

Om sakerna omkring dig kunde prata, vad skulle de säga?

## Introduktion Diwise
diwise är en IoT-kommunikationsplattform för att ta emot sensordata och reglera fysiska styrsystem som innebär att verksamhetssystem frikopplas från både kommunikationsgränssnitt och olika sensortyper.

## Dokumentation
Här på denna yta kommer vi publicera teknisk information samt dokumentation gällande plattformen Diwise. 

## Kontakt
Behöver du komma i kontakt med oss eller vill du veta mer om vad vi kan erbjuda? Läs mer på vår webbplats, [diwise.io](https://diwise.io/)

{% mermaid %}
flowchart LR
    subgraph diwise
        direction LR
        subgraph Samla in 
            direction LR
            a1(iot-agent) 
            
        end    
        subgraph Beräkna
            direction LR
            b1(iot-core)
        end
        subgraph Berika
        direction LR
            c1(iot-core)
        end
        subgraph Transformera
            direction LR
            d1(iot-transform-fiware)
        end    

        a1<--http-->a2(iot-device-mgmt)
    end
    subgraph CiP
        direction LR
        context-broker --> orion(Orion-LD) & api(api-*)
        orion-->mongo-db[(mongo-db)]
        api --> postgre[(postgreSql)]
    end

    s1([sensor]) --mqtt-->a1
    s2([sensor]) --nb-iot-->a1
    s3([sensor]) --?-->a1        
    a1==mq==>b1
    
    b1==mq==>c1
    c1==mq==>d1
    d1--http-->context-broker
 
    style s1 fill:#f9f,stroke:#333,stroke-width:4px
    style s2 fill:#f9f,stroke:#333,stroke-width:4px
    style s3 fill:#f9f,stroke:#333,stroke-width:4px
{% endmermaid %}
