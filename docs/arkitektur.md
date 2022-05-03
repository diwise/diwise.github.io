---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
---

UTKAST!


# Målarkitektur
## Bakgrund
[Målarkitektur för IoT och dataplattform](https://smartstad.stockholm/wp-content/uploads/sites/10/2021/05/M%C3%A5larkitektur-f%C3%B6r-IoT-och-dataplattform.pdf)
Detta dokument beskriver övergripande vad som krävs
för realisering av en Internet of Things (IoT) och dataarkitektur som
ligger till grund för en del av realiseringen av strategin för
en smart och uppkopplad stad

## Förmågor och funktioner
!['Förmågor och funktioner'](/assets/img/formagorochfunktioner.png)

### Implementation i diwise
!['diwise'](/assets/img/diwise.png)

1. data från sensor, t.ex. LoRaWAN
2. integration med externa datakäller, t.ex. http
3. data från applikationsserver, ofta json via mqtt
4. hämta information om sensortypen
5. normaliserat data skickas till iot-core
6. data berikas med t.ex. position
7. data skickas till transformeringstjänsten som transformerar data till Smart Data Models (FIWARE)
8. data POST:as via http till en distribuerad [context-broker](https://github.com/diwise/context-broker)
9. beroende på b.la. modelltyp väljs en underliggande context-broker, t.ex. Orion-LD
10. data kan hämtas och lämnas via NGSI API. 
11. externa system och konsumenter kommunicerar via API Gateway

### Samla in
!['Samla in'](/assets/img/samlain.png)

När det gäller datainsamling finns det många olika källor som
arkitekturen behöver stödja, framförallt nya enheter som samlar in
data och kommunicerar på ett effektivt och standardiserat sätt. Det
finns idag också befintliga sensorer som producerar rådata vilkas
data också behöver kunna fångas upp och behandlas, tillsammans
med externa datakällor vars information kan vara lika viktig att
komplettera dessa dataflöden med.

#### Implementation i diwise
[iot-agent](https://github.com/diwise/iot-agent) har som uppgift att samla in data från olika producenter av data (sensorer, IoT-plattformar och andra externa datakällor). 
Insamling sker via mqtt och http.

<img src="/assets/img/github.png" alt="GitHub" width="34" height="31" title="GitHub">[iot-agent](https://github.com/diwise/iot-agent)

### Berarbeta och berika
!['Bearbeta och berika'](/assets/img/bearbetaberika.png)
#### Berabeta
Förmågan att bearbeta innefattar att kunna ta emot meddelanden
och göra intelligenta beslut om var detta meddelande ska ta vägen
härnäst, t.ex. om något måste hanteras omgående eller om data
endast ska lagras eller båda. I bearbetningen kan viss transformering
av dataströmmarna vara löst kopplade från varandra via kanaler för
att kunna utnyttjas av samtliga förmågor oberoende av varandra.
Det data som hantereras i plattformen behöver normaliseras, tvättas
och kategoriseras. Detta sker genom olika typer av underförmågor
som:
 - Aggregering: Möjlighet att kunna kombinera data från enheter till
hanterbar information som t.ex. medelvärde över tid eller
medelvärde för flera sensorer.
 - Kvalitetssäkring: genom att kunna använda t.ex. gränsvärden kan
viss kvalitetssäkring göras genom att kunna ta bort brus i
dataströmmarna, dvs. värden från trasiga eller felaktiga sensorer
inte används.
 - Skapa händelser: Genom bearbetning av data i dataströmmarna kan
nytt data uppstå genom händelser. Detta kan vara t.ex. om felaktigt
data skickas från en enhet under längre tid kan en händelse skapas
för att larma/felanmäla enheten

#### Berika
Berika möjliggör att med hjälp av metadata och masterdata från
andra källor eller från enhetshanteringen kunna skapa en kontext till
sensordata.
För att effektivt kunna utnyttja Analysförmågan i IoT-plattformen
krävs någon form av berikning för att beskriva i vilket sammanhang
data har uppstått.
Typiska berikande funktioner är:
 - Addera data om enhetens placering, temperatur eller status
 - Geografiskt data som typ av omgivning (park, gata, sjö)
 - Väderdata
 - Enhetskonfiguration (mätnoggrannhet, enhet, periodicitet)

#### Implementation i diwise
[iot-core](https://github.com/diwise/iot-core) har som uppgift att ...

<img src="/assets/img/github.png" alt="GitHub" width="34" height="31" title="GitHub">[iot-core](https://github.com/diwise/iot-core)

### Transformera 
!['Transformera'](/assets/img/transformera.png)

Transformera strömmande data i plattformen till förbestämda
modeller för att möjliggöra och optimera användningen av data av
övriga förmågor inom Plattformen. Att transformera insamlat data
till en hanterbar struktur ökar värdet och möjligheten att använda
data för plattformen. Exempel på transformering kan t.ex. vara att
kunna ta emot samma information från flera olika typer av enheter i
olika format och transformera dessa till samma modell för att
effektivare kunna utnyttja analysmodeller, utvecklingsverktyg,
testning och lagring.
Transformeringen ska ta bort en del av komplexiteten för
bearbetning och analys. Det kommer att krävas flera olika modeller
att både kunna transformera data från och till men plattformen ska i
så stor utsträckning som möjligt hålla sig till standarder för de
verksamheter sådana finns. Transformeringen kan också förbereda
data genom normalisering och annan formatering för att kunna
användas av Machine learning och direkt kunna delas via
tillgängliggörande i en enhetlig modell.
Exempel på datamodeller kan vara [FIWARE](https://www.fiware.org/smart-data-models/), TALQ, OSCP eller
andra av Staden använda standardmodeller per domän

#### Implementation i diwise
[iot-transform-fiware](https://github.com/diwise/iot-transform-fiware) har som uppgift att transformera data till [Smart Data Models](https://www.fiware.org/smart-data-models/) ...

<img src="/assets/img/github.png" alt="GitHub" width="34" height="31" title="GitHub">[iot-transform-fiware](https://github.com/diwise/iot-transform-fiware)

### Hantera enheter 
!['Hantera enheter'](/assets/img/hanteraenheter.png)

text ...

<img src="/assets/img/github.png" alt="GitHub" width="34" height="31" title="GitHub">[iot-device-mgmt](https://github.com/diwise/iot-device-mgmt)

### Lagra
!['Lagra'](/assets/img/lagra.png)

text ...