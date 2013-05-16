# ModbusRTU - js (alpha)
Javascript implementation for the Modbus protocol!
Draws heavely from too-tall-nate's modbus stack and minimalmodbus from python!

Allows for the mapping of individual device registers!


## RTU Modbud Frame Format
A request using RTU is at least 4 bytes long.

_Frame_
[Slave Address] + [Function Code] + [Data] + [CRC]


