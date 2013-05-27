/*
    Parse the output of any serial message, and convert it into a Modbus message!
    This is the startings of a SerialPort parser/modbusRTU slave server device


 */
var serial = require('serialport').SerialPort;
var binary = require('binary')
var repl = require('repl')
serialPortEntry = process.argv[2];
var port = new serial(serialPortEntry, function(err){
    if(err) throw new Error("Please pass a serial port")
    });


if(typeof serialPortEntry === 'undefined') throw new Error("Please pass a port!");
console.log("Started MODBUS server on port " + serialPortEntry)

port.on('data', function(data){
    console.log(data);
    var output = binary.parse(data)
                    .word8('address')
                    .word8('function')
                    .word16bu('RegisterAddr')
                    .word16bu('numRegisters')
                    .word16bu('crc')
                    .vars
    output['crc'] = output['crc'].toString(16)
    console.log(output);


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
});


// repl.start("modbusRTU> ");
