+++
title = "Supported sensor types"
url = "intro/supported-sensor-types"
description = ""
menuPre = "<i class='fas fa-microchip'></i> "
tags = ["intro", "configuration", "sensors"]
weight = 1
+++

| Sensor type ID | Description |
|----------------|-------------|
| qalcosonic | Qalcosonic W1 (w1e, w1h, w1t), [ultrasonic meter for cold and hot water](https://www.ambiductor.se/en/products/water-meters/ultrasonic/qalcosonic-w1) |
| presence | Same as strips_lora_ms_h |
| elsys_codec | Use with [Elsys ERS](https://www.elsys.se/en/ers/) sensors |
| enviot | |
| tem_lab_14ns | [SenlabT](https://sensing-labs.com/lorawan-devices/remote-temperature-monitoring/) |
| strips_lora_ms_h | [Sensative Strips](https://sensative.com/sensors/strips-sensors-for-lorawan/) |
| cube02 | [Sensfarm](https://www.sensefarm.com/products/soil-moisture-sensor/) soil moisture sensor |
| milesight_am100 | [Milesight](https://www.milesight-iot.com/lorawan/sensor/am103/) AM series sensors |

#### qalcosonic

- Volume (incl. timestamp)
- Temperature (w1t) -
- Status (codes & messages)

#### elsys_codec

- Temperature
- ExternalTemperature
- Vdd
- CO2
- Humidity
- Light
- Motion
- Occupancy
- DigitalInput
- DigitalInputCounter

Depends on the [Generic Javascript decoder](https://www.elsys.se/en/elsys-payload/) being installed in the LoRaWAN application server

#### enviot

- Battery
- Humidity
- SensorStatus
- SnowHeight  
- Temperature

 Depends on external javascript decoder being installed in LoRaWAN application server

#### milesight_am100

- Temperature
- Humidity
- CO2
- Battery

 Depends on external [decoder](https://github.com/Milesight-IoT/SensorDecoders/tree/main/AM_Series/AM100_Series) being installed in the LoRaWAN application server

#### tem_lab_14ns

- Temperature

#### presence / strips_lora_ms_h

- BatteryLevel
- Temperature
- Humidity
- DoorReport
- DoorAlarm
- Presence

#### cube02

- BatteryVoltage
- Resistances
- SoilMoistures  
- Temperature
