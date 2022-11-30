+++
archetype = "chapter"
title = "Arkitektur"
weight = 2
menuPre = "<i class='far fa-compass'></i> "
+++

## Innehåll
## Sammanfattning
## Summering
### Bakgrund och omfattning
För att ta tillvara på möjligheterna som digitaliseringen ger och
starta förflyttningen mot en smart stad krävs (tekniska) förutsättningar i form av 
arbetssätt, plattformar, riktlinjer och standarder. 

En del av de tekniska förutsättningarna är en målarkitektur som
beskriver vilka förmågor som behöver finnas i gemensamma
plattformar och vilka styrande principer, standarder och arbetssätt
som ska användas vid framtagande av lösningar som använder
förmågorna. Detta dokument beskriver övergripande vad som krävs
för realisering av en Internet of Things (IoT) och dataarkitektur

Dokument beskriver en övergripande nivå av en arkitektur som kan
användas för att detaljera respektive område i ytterligare
lösningsarkitekturbeskrivningar. 

### Mål och avgränsningar
I detta dokument beskrivs vilka nödvändiga förutsättningar som
krävs av en gemensam arkitektur för insamling av olika dataströmmar i realtid samt möjlighet att kunna påverka och styra
de uppkopplade tingen i omvärlden. Arkitekturen beskriver också
hur hanteringen och övervakning av enheter, Enhetshantering, samt
hur delning av ting och dess dataströmmar ska fungera.

#### Avgränsningar
Anvisningar och vilka tekniska standarder som ska användas
beskrivs inte i detalj i detta dokument utan endast vägledningar i
hur dessa kan formuleras och beskrivas i verksamhetslösningar.

## Inledning 
### Varför behövs en målarkitektur? 
Syftet med målarkitekturen är att beskriva en riktning, ett
långsiktigt mål och väsentliga val för att kunna skapa en
uppkopplad stad.

Målarkitekturen ger stöd i hur lösningar ska utformas både vid
verksamhetsutveckling och förvaltningsaktiviteter. Den ska vara
tillräckligt konkret för att kunna ge arkitekturstöd för planering,
styrning och uppföljning av insatser som leder till målet utan att
samtliga detaljer har beskrivits i förväg.

IoT-arkitektur och teknologier innebär alltid maskin- till
maskininteraktion. För att denna information ska ge nytta måste
interaktion med människor skapas. Denna interaktion kräver
integration med verksamhetssystem, ting, enheter, visualisering av
information och digitala platser för tillgängliggörande av
information och insikter t.ex. portaler, appar. Det är därför viktigt
att principer och riktlinjer sätts för att befintliga eller nya ting kan
samverka effektivt för att skapa den nytta som både IoT och
datainsamling innebär.

IoT-arkitektur är komplex och påverkar eller interagerar med många
delar av befintlig it-arkitektur samt skapar behov av nya förmågor
inom närliggande områden och arbetssätt. Det innebär nya sätt för
integrations- och kommunikationslösningar, nya förmågor för
analys samt påverkan på befintlig säkerhetsarkitektur. Denna
arkitektur delas därför upp i områden för att kunna utvecklas och
förändras i olika steg och hastighet till viss del oberoende av
varandra. Den största utmaningen med en IoT-arkitektur är inte att
sätta den på plats utan att kunna utveckla och förvalta den när den
växer.

En grundläggande faktor i arkitekturen är möjligheten att samla in
data från omvärlden för att få eller skapa nya insikter och
information till underlag för beslut och styrning av den smarta
staden. En avgörande förändring i arbetssätt är förkortningen av
tiden mellan en förändring i staden och analysen av resultatet till
nya insikter och möjligheten till påverkan i form av ytterligare
förbättringar i anslutning till förändringen. Detta tillsammans med
noggrannheten i informationen t.ex. genom att faktiskt mäta saker
som tidigare inte mättes eller mättes sällan och med hjälp av mera
data gör att beslutsprocesser kan bli effektivare. Eftersom
möjligheter skapas att direkt efter en förändring samla in nytt data
gör att tiden mellan analysen och insikten av förändringen kan gå
från i värsta fall är år eller månader till veckor och dagar.

### Strukturen innehåller principer istället för detaljer
Eftersom teknologin, verksamheternas behov och omvärlden
förändras i allt snabbare takt, speciellt inom områden rörande
datainsamling, informationshantering och Smart Stad beskriver
arkitekturen övergripande principer och strukturer snarare än
detaljer och riktlinjer. 

Inom centrala delar beskrivs ett antal förmågor i mer detalj för att
dels exemplifiera vad som avses med förmågan dels eftersom
förmågorna anses särskilt viktiga att prioritera för införandet att
arkitekturen.

### Syfte med arkitekturen
Målarkitekturen har fler syften men i huvudsak:
- Underlag i diskussioner med olika beslutsfattare
- Referensarkitektur för framtida lösningsarkitekturer och detaljering av verksamhetslösningar
- Stödja framtagandet av viktiga principer, riktlinjer och standarder
- Motivering till val av principer och inriktningar

Arkitekturen är på relativt hög abstraktionsnivå och i många
stycken generaliserande. Delar av arkitekturen kan utgöra
referensarkitektur för andra projekt och uppdrag inom samma
områden i realiseringen av den smarta staden.

### Målgrupp
...
## Arkitektur – logisk indelning
### Den smarta stadens arkitektur
### Komplexitet i den smarta staden
### Styrande principer
### Övergripande förmågor
### Uppdelning
## Uppdelning av arkitekturen och begrepp 
### Konceptuella dataflöde  
### Begreppsmodell för arkitekturen 
## Edge
### Enheter
### Infrastruktur och kommunikation
### Säkerhet i Edge
### Enhetshantering
### Funktion i Edge och Edge computing 
## Centrala förmågor för IoT och datahantering 
### Händelsestyrd arkitektur för datahantering 
### Förmågor och funktioner 
### Datainsamling och enhetskommunikation
### Hantera data och meddelande
### Lagring 
### Dataarkitektur
### Enhetshantering
### Förhållande till övriga plattformar i staden
