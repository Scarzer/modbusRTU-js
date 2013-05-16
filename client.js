/**
 * Created User: ventrius
 * On Date: 5/15/13
 * At Time: 9:14 PM
 *
 * Please write a descripton here of what you're writing!
 */

// Import Dependencies
var Put = require('put')
    , Buffer = require('buffers')
    , Binary = require('binary')
    , inherits = require('util').inherits
    , serial = require('serialport').SerialPort
    , crc = require('crc')
    , log = console.log;


// Constants

// Length of a MODBUS Function Code
const FUNCTION_CODE_LENGTH = 1;

// Exceptions have a high bit set
// i.e (0x80)
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

function formRequestBuffer(slave, fc, register, numRegisters){
}

function formResponseBuffer(){}

