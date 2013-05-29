/**
 *
 * Created User: ventrius
 * On Date: 5/28/13
 * At Time: 1:18 PM
 *
 * Please write a descripton here of what you're writing!
 */

// Import Dependecies
var Put = require('put')
    , buffer = require('buffer')
    , bufferlist = require('buffers') /* Note the difference */
    , Binary = require('binary')
    , crc = require('crc')
    , assert = require('assert')
    , rtu = require('serialport').SerialPort
    , repl = require('repl');

// Parser Function

var parserFunction = function(){
    var b = bufferlist();
    var bufferLim = 7;
    var response = {};

    return function(emitter, buffer){
        b.push(buffer)
        //console.log(b)
        if(b.length > 7){
            response = Binary.parse(b)
                .word8('address')
                .word8('function')
                .word8('byteCount')
                .word16bu('value')
                .word16bu('crc')
                .vars
            emitter.emit('data', response)
            b.length = 0;
            b.buffer = [];
        }
    }
}

// Options and commands

var inverterPort = process.argv[2]
    , slaveAddr = parseInt(process.argv[3])
    , device = new rtu(inverterPort, {
        baudrate: 38400,
        parser: parserFunction()
    });

// Preliminary Device Map
var deviceMap = {
    700 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}
    },
    701 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    702 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    703 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    704 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    705 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    706 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    800 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    801 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    802 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    803 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    804 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    805 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    806 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    807 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    808 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    809 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    810 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    811 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    812 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    813 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    814 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    815 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    816 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    817 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    818 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    819 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    820 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    821 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    822 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    823 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    824 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    825 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    },
    826 : {
        name : "",
        value : 0,
        setter : function(){} ,
        getter : function(){}

    }
}


// formation function

function formRequestBuffer(slave, fc, register, value){
    assert(typeof slave === 'number')
    assert(typeof fc === 'number')
    assert(typeof register === 'number')
    if(typeof value !== 'undefined') assert(typeof value === 'number')

    if(fc === 3 || fc === 4){
        // Just read a register
        var putMessage = Put()
            .word8(slave)
            .word8(fc)
            .word16be(register)
            .word16be(1)
            .buffer()
    }

    else if(fc === 6){
        // Write to a register
        var putMessage = Put()
            .word8(slave)
            .word8(fc)
            .word16be(register)
            .word16be(value)
            .buffer()
    }

    var finalMessage = bufferlist()

    finalMessage.push(putMessage)
    finalMessage.push(Put().word16le(crc.crcModbusHex(putMessage)).buffer())
    return finalMessage.slice();
}


////// Necesarry Functions

function setInverterState(state){
    // Turn it on or off
    // 1 - on
    // 0 - off
    // 700
    device.write(formRequestBuffer(slaveAddr,6,700,state))
}

function getInverterState(){
    // 700
    device.write(formRequestBuffer(slaveAddr,3,700))
}

function setInverterReset(reset){
    // Reset the inverter
    // 1 - reset
    // 0 - do Nothing
}

function setPowerCommand(power){
    // set the power
    // min - -100
    // max - 100
    device.write(formRequestBuffer(slaveAddr,6,702, power))
}

function getPowerCommand(power){
    device.write(formRequestBuffer(slaveAddr,3,702))

}

// Monitoring

function getACVoltage(){

    device.write(formRequestBuffer(slaveAddr,3,800))

}

function getACVoltageAnalogLow(){

    device.write(formRequestBuffer(slaveAddr,3,801))
}

function getACVoltageAnalogHigh(){

    device.write(formRequestBuffer(slaveAddr,3,802))

}

function getGridVoltageAB(){

    device.write(formRequestBuffer(slaveAddr,3,803))

}

function getGridVoltageBC(){

    device.write(formRequestBuffer(slaveAddr,3,804))

}

function getGridVoltageCA(){

    device.write(formRequestBuffer(slaveAddr,3,805))

}
function getGridVoltageAnalogLow(){

    device.write(formRequestBuffer(slaveAddr,3,806))

}

function getGridVoltageAnalogHigh(){

    device.write(formRequestBuffer(slaveAddr,3,807))

}

function getInverterDCVoltage(){

    device.write(formRequestBuffer(slaveAddr,3,808))

}

function getInverterDCVoltageAnalogLow(){

    device.write(formRequestBuffer(slaveAddr,3,809))

}

function getInverterDCVoltageAnalogHigh(){

    device.write(formRequestBuffer(slaveAddr,3,810))

}

function getInverterACCurrent(){

    device.write(formRequestBuffer(slaveAddr,3,811))

}

function getInverterACCurrentAnalogLow(){

    device.write(formRequestBuffer(slaveAddr,3,812))

}

function getInverterACCurrentAnalogHigh(){

    device.write(formRequestBuffer(slaveAddr,3,813))

}

function getGridACCurrent(){

    device.write(formRequestBuffer(slaveAddr,3,814))

}

function getGridACCurrentAnalogLow(){

    device.write(formRequestBuffer(slaveAddr,3,815))

}

function getGridACCurrentAnalogHigh(){

    device.write(formRequestBuffer(slaveAddr,3,816))

}

function getInverterDCCurrent(){

    device.write(formRequestBuffer(slaveAddr,3,817))

}

function getInverterDCCurrentAnalogLow(){

    device.write(formRequestBuffer(slaveAddr,3,818))

}

function getInverterDCCurrentAnalogHigh(){

    device.write(formRequestBuffer(slaveAddr,3,819))

}

function getCentralCapVoltage(){

    device.write(formRequestBuffer(slaveAddr,3,820))

}

function getInverterACPower(){

    device.write(formRequestBuffer(slaveAddr,3,821))

}

function getInverterACPowerAnalogLow(){

    device.write(formRequestBuffer(slaveAddr,3,822))

}

function getInverterACPowerAnalogHigh(){

    device.write(formRequestBuffer(slaveAddr,3,823))

}

function getInverterDCPower(){

    device.write(formRequestBuffer(slaveAddr,3,824))

}

function getInverterDCPowerAnalogLow(){

    device.write(formRequestBuffer(slaveAddr,3,825))

}

function getInverterDCPowerAnalogHigh(){

    device.write(formRequestBuffer(slaveAddr,3,826))

}



device.on('data', function(data){
    console.log(data)
})

setInterval(function(){getPowerCommand()}, 2000)

//repl.start('DeVice Input> ')

