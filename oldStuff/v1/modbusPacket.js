/**
 * Created User: ventrius
 * On Date: 5/15/13
 * At Time: 9:14 PM
 *
 * Please write a descripton here of what you're writing!
 */

// Import Dependencies
var Put = require('put')
    , buffer = require('buffer')
    , bufferlist = require('buffers')
    , Binary = require('binary')
    , inherits = require('util').inherits
    , serial = require('serialport').SerialPort
    , Put = require('put')
    , crc = require('crc')
    , log = console.log
    , assert = require('assert');


// Constants

// Length of a MODBUS Function Code
const FUNCTION_CODE_LENGTH = 1;

// Exceptions have a high bit set
const EXCEPTION_BIT = 1 << 7;

exports.EXCEPTION_CODES = {
    1 : 'Illegal Function',
    2 : 'Illegal Data Address',
    3 : 'Illegal Data Value',
    4 : 'Slave Device Failure'
};

exports.FUNCTION_CODES = {
    READ_COILS:               1,
    READ_DISCRETE_INPUTS:     2,
    READ_HOLDING_REGISTERS:   3,
    READ_INPUT_REGISTERS:     4,
    WRITE_SINGLE_COIL:        5,
    WRITE_SINGLE_REGISTER:    6,
    READ_EXCEPTION_STATUS:    7, // Serial Line only
    DIAGNOSTICS:              8, // Serial Line only
    PROGRAM_484:              9,
    POLL_484:                 10,
    GET_COMM_EVENT_COUNTER:   11,// Serial Line only
    GET_COMM_EVENT_LOG:       12,// Serial Line only
    PROGRAM_CONTROLLER:       13,
    POLL_CONTROLLER:          14,
    WRITE_MULTIPLE_COILS:     15,
    WRITE_MULTIPLE_REGISTERS: 16,
    REPORT_SLAVE_ID:          17,// Serial Line only
    PROGRAM_884_M84:          18,
    RESET_COMM_LINK:          19,
    READ_FILE_RECORD:         20,
    WRITE_FILE_RECORD:        21,
    MASK_WRITE_REGISTER:      22,
    READ_WRITE_MULTIPLE_REGISTERS:23,
    READ_FIFO_QUEUE:          24,
    ENCAPSULATED_INFERFACE_TRANSPORT:43

};

function formRequestBuffer(slave, fc, register, numRegisters, value){
    /*
        slave -> Address of the slave device. (Number)
        fs -> Function Code that you'd like to use. (Number)
        register -> Starting address of your target Register (Number)
        numRegisters -> Number of registers you'd like to read (Number)
    */
    assert(typeof slave === 'number');
    assert(typeof fc === 'number');
    assert(typeof register === 'number');
    assert(typeof numRegisters === 'number');

    if(fc === 3 || fc === 4){
        // Just Reading a message
        var putMessage = Put()
            .word8(slave)
            .word8(fc)
            .word16be(register)
            .word16be(numRegisters)
            .buffer()
    }

    else if(fc === 6){
        // Write to a register
        assert(typeof value !== 'undefined')
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

exports.formResponseBuffer = formRequestBuffer;

function formResponseBuffer(){}

//foo = formRequestBuffer(4, 3, 123, 1);

////////////////////////////////////
// Parser Function!

exports.modbusParser = function(){
    // Closure for the parsing function!


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
