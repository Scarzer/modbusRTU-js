/**
 * Created User: ventrius
 * On Date: 5/27/13
 * At Time: 3:29 PM
 *
 * Example Client Program using the modbusPacket
 *
 */

// Important Dependencies

var modbus = require('./modbusPacket.js').formResponseBuffer()
    , rts = require('serialport').SerialPort
    , log = console.log()
    , serialPortEntry = process.argv[2]
    , inverter = new rts(serialPortEntry, {
        parser: modbus.modbusParser()
    });

function sendModbusMessage(){

}


