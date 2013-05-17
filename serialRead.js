var serial = require('serialport').SerialPort;
var port = new serial('/dev/pts/2')
var binary = require('binary')

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
});

