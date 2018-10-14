
var commands;
var opcode;
var mode;
var operand;
var ticks;
var freq;
var queue = []; // Points to functions for each command
var subqueue = []; // Merges into queue to add next instruction


function control(instructions, frequency){ // Recieve instructions, load into memory, start simulation
  freq = 1000 / frequency;
  initMem();
  initBus();
  initReg();
  commands = [ // Array of functions for each opcode
     add,
     sub,
     bitwiseAnd,
     bitwiseOr,
     bitwiseXor,
     bitwiseNot,
     read,
     write,
     goto,
     branch_ifZero,
     branch_ifNeg,
     branch_ifOverflow,
     branch_ifCarry,
     output,
     end
  ];
  // Load instructions into memory
  reporting("Loading instructions into memory");
  var x = 0;  // Instructions are 14 bits long but RAM supports only 8 bits
  for (var i = 0; i < instructions.length; i++){
    RAM[x] = instructions[i].slice(0, 8); // Instructions are split into two parts
    memUpdate(x)
    x++;
    let tmp = [0, 0];
    tmp = tmp.concat(instructions[i].slice(8, 15)) // With two zeroes added to the second (6 bit) part to make 8 bits
    RAM[x] = tmp;  // Then placed into two consecutive memory addresses
    memUpdate(x); // Update memory UI
    x++;
  }
  queue.push("fetch()"); // Add fetch to operations queue
  clock(); // Start clock
}

function add(){ // Operations for addition instruction
    subqueue = [
      "dataRequest()",
      "busGrant()",
      "getVal(1)",
      "dataRequest()",
      "busGrant()",
      "updateBus(DATABUS, ACC)",
      "getVal(2)",
      "addition()",
      "dataRequest()",
      "busGrant()",
      "updateBus(DATABUS, outList)",
      "update(ACC)"
    ]

  }


function sub(){
  subqueue = [ // Operations for subtraction instruction
    "getVal(1)",
    "twosComplement()",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, outList)",
    "getVal(1)",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, ACC)",
    "getVal(2)",
    "subtract = true",
    "addition()",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, outList)",
    "update(ACC)"
  ]
}

function bitwiseAnd(){
  subqueue = [ // Operations for and instruction
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, MDR)",
    "getVal(1)",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, ACC)",
    "getVal(2)",
    "and()",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, outList)",
    "update(ACC)"

  ]
}

function bitwiseOr(){
  subqueue = [ // Operations for or instruction
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, MDR)",
    "getVal(1)",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, ACC)",
    "getVal(2)",
    "or()",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, outList)",
    "update(ACC)"
  ]
}

function bitwiseNot(){
  subqueue = [ // Operations for not instruction
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, ACC)",
    "getVal(1)",
    "not()",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, outList)",
    "update(ACC)",
  ]
}

function bitwiseXor(){
  subqueue = [ // Operations for xor instruction
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, MDR)",
    "getVal(1)",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, ACC)",
    "getVal(2)",
    "xor()",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, outList)",
    "update(ACC)"
  ]

}

function read(){

    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, put into accumulator
    subqueue =[ // Operations for read instruction
      "CONTROLBUS.read = 1",
      "updateBus(ADDRESSBUS, MDR)",
      "getAddress()",
      "dataRequest()",
      "busGrant()",
      "outputData()",
      "update(ACC)",
      "CONTROLBUS.read = 0"
    ]
}

function write(){
    // Request bus permissions, put on address bus, get data from accumulator, perms, data on data bus, write to memory
    subqueue = [ // Operations for write instruction
      "CONTROLBUS.write = 1",
      "updateBus(ADDRESSBUS, MDR)",
      "getAddress()",
      "dataRequest()",
      "busGrant()",
      "updateBus(DATABUS, ACC)",
      "writeData()",
      "CONTROLBUS.write = 0"
    ]
}

function goto(){
  subqueue = [ // Operations for goto instruction
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, MDR)",
    "update(PC)"
  ]
}

function branch_ifZero(){ // If zero flag is set, perform a goto instruction
  if (STATUS[0] == 1){
    reporting("Zero flag is set, branching");
    goto();
  }
  else {
    reporting("Zero flag is not set");
    subqueue = []; // If condition is not met, the operations queue is cleared to skip to next instruction
  }
}

function branch_ifNeg(){ // If negative flag is set, perform a goto instruction
  if (STATUS[1] == 1){
    reporting("Negative flag is set, branching")
    goto();
  }
  else{
    reporting("Negative flag is not set");
    subqueue = [];
  }
}

function branch_ifOverflow(){ // If overflow flag is set, perform a goto instruction
  if (STATUS[2] == 1){
    reporting("Overflow flag is set, branching");
    goto();
  }
  else {
    reporting("Overflow flag is not set");
    subqueue = [];
  }
}

function branch_ifCarry(){ // If carry flag is set, perform a goto instruction
  if (STATUS[3] == 1){
    reporting("Carry flag is set, branching");
    goto()
  }
  else{
    reporting("Carry flag is not set");
    subqueue = [];
  }
}






function output(){ // Operations for output instruction
  if (mode == "01"){ // If addressing mode is 1 (address), data in MDR is outputted
    subqueue = [
    "updateBus(DATABUS, MDR)",
    "outputToUser()"
  ]
  }
  else {
    subqueue = [ // Output contents of accumulator to user
      "updateBus(DATABUS, ACC)",
      "outputToUser()"
    ]
  }
}

function end(){
  queue = []; // Clear operations queue
  subqueue = [];
  clearInterval(ticks); // Stop clock ticking to stop operations being performed
  endProgram(); // Prepare UI to allow CPU to be restarted
  reporting("Finishing program");
}


function busGrant(){ // Grant the use of the databus
  CONTROLBUS.grant = 1;
  CONTROLBUS.request = 0;
  reporting("Granted use of data bus");
}

function fetch(){ // Get instuction from memory and load into the correct registers and update program counter
  subqueue = [ // Get data pt1 from ram > cirupdate > data pt2 from ram > decode()
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, PC)",
    "update(MAR)",
    "CONTROLBUS.read = 1",
    "updateBus(ADDRESSBUS, MAR)",
    "getAddress()",
    "dataRequest()",
    "busGrant()",
    "outputData()",
    "update(MDR)",
    "CONTROLBUS.read = 0",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, MDR)",
    "cirUpdate(1)",
    "increment(MAR)",
    "CONTROLBUS.read = 1",
    "updateBus(ADDRESSBUS, MAR)",
    "getAddress()",
    "outputData()",
    "cirUpdate(2)",
    "CONTROLBUS.read = 0",
    "increment(PC)",
    "decode()"
  ]
  queue = queue.concat(subqueue); // Add subqueue to end of queue to be run by clock

}

function getOperand(){ // Put operand data into MDR ready for instruction execution
  if (mode == "01"){ // Operand is memory address, actual data must be fetched
    subqueue = [
      "CONTROLBUS.read = 1",
      "updateBus(MAR, operand)",
      "updateBus(ADDRESSBUS, operand)",
      "getAddress()",
      "dataRequest()",
      "busGrant()",
      "outputData()",
      "update(MDR)",
      "CONTROLBUS.read = 0"
    ]

}
else{
  subqueue = [ // Operand is the data to be operated on
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, operand)",
    "update(MDR)"
  ]
}
subqueue.push("execute()"); // Add execute to queue to perform execute function after decode
queue = queue.concat(subqueue);
}

function decode(){ // Separate instruction into opcode, addressing mode and operand
  subqueue = [
    'opcode = CIR.slice(0, 4).join("")',
    'mode = CIR.slice(4, 6).join("")',
    'operand = CIR.slice(6, 14)',
    'getOperand()', // Place correct operand data in MDR ready for use during execution
  ]
  queue = queue.concat(subqueue);
}

function execute(){ // Add correct operations to queue to perform instruction
    opcode = parseInt(opcode, 2);
    commands[opcode](); // Get list of operations for instruction
    queue = queue.concat(subqueue); // Add list to operations queue
    queue.push("fetch()"); // Add fetch to end of queue to run next instruction


}

function pause(){ // Freeze CPU
  paused = true;
  clearInterval(ticks); // Stop the clock
}

function resume(){ // Un-freeze CPU
  paused = false;
  clock(); // Start clock
}



function clock(){ // Run one operation in queue every clock pulse
  var frequency = freq / 2;
  function runProcesses(){
    function clockOff(){
      CONTROLBUS.clock = 0;
      cBusUpdate();
    }
    CONTROLBUS.clock = 1;
    eval(queue[0]);
    queue.shift();
    uiUpdate();
    setTimeout(clockOff, frequency);
  }
  ticks = setInterval(runProcesses, frequency); // Start clock pulses
  }
