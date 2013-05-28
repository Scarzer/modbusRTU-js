/*
    Parse the output of any serial message, and convert it into a Modbus message!
    This is the startings of a SerialPort parser/modbusRTU slave server device


 */
var serial = require('serialport').SerialPort;
var binary = require('binary')
var Put = require('put')
var modbus = require('./modbusPacket.js').formResponseBuffer()
var repl = require('repl')
serialPortEntry = process.argv[2];

exports.modbusParser = function(deviceName){
    // Closure for the parsing function!

    var deviceMap = require('./'+deviceName+'.js')

    return function(emitter, buffer){
        var output = binary.parse(buffer)
            .word8('address')
            .word8('function')
            .word16bu('RegisterAddr')
            .word16bu('numRegisters')
            .word16bu('crc')
            .vars

        emitter.emit('data', output);

    }
}

var port = new serial(serialPortEntry, {

    parser: exports.modbusParser()
    });

console.log("Started MODBUS server on port " + serialPortEntry)

port.on('data', function(data){
    port.write()
});
//    console.log(data);
//    var output = binary.parse(data)
//                    .word8('address')
//                    .word8('function')
//                    .word16bu('RegisterAddr')
//                    .word16bu('numRegisters')
//                    .word16bu('crc')
//                    .vars
//    output['crc'] = output['crc'].toString(16)
//    console.log(output);
port.on('data', function(data){
    var resMessage = Put()
        .word8(data['slave'])
        .word8(data['function'])
        .buffer()
    port.write(resMessage)
    console.log(data);
})

    // TODO
    // 1) Write up a code that will send a response built in a modbus format
    // 2) Make either a database or better yet, a JSON register map!
    // registerMap{
    //      543 : {
    //          value : 3423123
    //          size : 16bit
    //          type : holding register
    //          permission : 777
    //      }
    //  }


// repl.start("modbusRTU> ");
