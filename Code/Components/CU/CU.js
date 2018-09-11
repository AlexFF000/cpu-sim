var commands = {
  0000: add(),
  0001: sub(),
  0010: and(),
  0011: or(),
  0100: not(),
  0101: read(),
  0110: write(),
  0111: goto(),
  1000: clear(),
  1001: output()
}

var queue = []; // Points to functions for each command

function control(instruction){
  var opcode = instruction.slice(0, 4);
  var mode = instruction[4, 5];
  var operand = instruction.slice(6, 15);
  commands.opcode(mode, operand);
}

function add(mode, operand){
  if (mode == 00){
    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, add() to accumulator
  }
  else if (mode == 01){
    // Request bus permissions, put on address bus, get data from specified memory address, perms, data on data bus, add() to accumulator
  }
}

function sub(mode, operand){
  if (mode == 00){
    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, subtract() to accumulator
  }
  else if (mode == 01){
    // Request bus permissions, put on address bus, get data from specified memory address, perms, data on data bus, subtract() to accumulator
  }
}

function and(mode, operand){
  if (mode == 00){
    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, AND with accumulator
  }
  else if (mode == 01){
    // Request bus permissions, put on address bus, get data from specified memory address, perms, data on data bus, AND with accumulator
  }
}

function or(mode, operand){
  if (mode == 00){
    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, OR with accumulator
  }
  else if (mode == 01){
    // Request bus permissions, put on address bus, get data from specified memory address, perms, data on data bus, OR with accumulator
  }
}

function not(mode, operand){
  if (mode == 00){
    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, put into accumulator, NOT
  }
  else if (mode == 01){
    // Request bus permissions, put on address bus, get data from specified memory address, perms, data on data bus, put into accumulator, NOT
  }
}

function read(operand){

    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, put into accumulator
}

function write(operand){
    // Request bus permissions, put on address bus, get data from accumulator, perms, data on data bus, write to memory
}

function goto(mode, operand){
  if (mode == 00){
    // Request bus permissions, put on address bus, get data from memory, perms, data bus, place in program counter
  }
  else if (mode == 01){
    // Request bus perms, put on address bus, get address from memory, perms, put on address bus, get data from memory, place in program counter
  }
}

function clear(){
  // Change all memory values to 0, change all registers to 0
}

function output(){
  // UI output function(accumulator contents)
}
