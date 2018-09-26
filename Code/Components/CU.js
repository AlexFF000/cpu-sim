
var commands;
var opcode;
var mode;
var operand;
var ticks;

var queue = []; // Points to functions for each command
var subqueue = []; // Merges into queue to add next instruction


function control(instructions, frequency){ // Recieve instructions, load into memory, start simulation
  initMem();
  initBus();
  initReg();
  commands = [
     add,
     sub,
     bitwiseAnd,
     bitwiseOr,
     bitwiseXor,
     bitwiseNot,
     read,
     write,
     goto,
     goto_ifPos,
     goto_ifNeg,
     goto_ifZero,
     clear, // Useless, remove
     output,
     end
  ]
  reporting("Loading instructions into memory");
  var x = 0;  // Instructions are 14 bits long but RAM supports only 8 bits
  for (i = 0; i < instructions.length; i++){
    RAM[x] = instructions[i].slice(0, 8); // Instructions are split into two parts
    memUpdate(x)
    x++;
    let tmp = [0, 0];
    tmp = tmp.concat(instructions[i].slice(8, 15)) // With two zeroes added to the second (6 bit) part to make 8 bits
    RAM[x] = tmp;  // Then placed into two consecutive memory addresses
    memUpdate(x); // Update memory UI
    x++;
  }
  queue.push("fetch()");
  clock(frequency);
}

function add(){
    subqueue = [
      "dataRequest()",
      "busGrant()",
      "updateBus(DATABUS, operand)",
      "getVal(1)",
      "dataRequest()",
      "busGrant()",
      "updateBus(DATABUS, ACC)",  // PAss by reference changes val1 to acc
      "getVal(2)",
      "addition()",
      "dataRequest()",
      "busGrant()",
      "updateBus(DATABUS, outList)",
      "update(ACC)"
    ]

  }


function sub(mode, operand){

}

function bitwiseAnd(){
  subqueue = [
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
  subqueue = [
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
  subqueue = [
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

}

function read(operand){

    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, put into accumulator
    subqueue =[
      "updateBus(ADDRESSBUS, MDR)",
      "getAddress()",
      "dataRequest()",
      "busGrant()",
      "outputData()",
      "update(ACC)"
    ]
}

function write(operand){
    // Request bus permissions, put on address bus, get data from accumulator, perms, data on data bus, write to memory
    subqueue = [
      "updateBus(ADDRESSBUS, MDR)",
      "getAddress()",
      "dataRequest()",
      "busGrant()",
      "writeData()"
    ]
}

function goto(mode, operand){
  subqueue = [
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, MDR)",
    "update(PC)"
  ]
}

function goto_ifPos(mode, operand){
  var accContents = ACC.join("");
  accContents = parseInt(accContents, 2);
  if (accContents >= 0){
    goto()
  }
}

function goto_ifNeg(mode, operand){
  var accContents = ACC.join("");
  accContents = parseInt(accContents, 2); // May not work if twos complement
  if (accContents < 0){
    goto();
  }
}

function goto_ifZero(mode, operand){
  var accContents = ACC.join("");
  accContents = parseInt(accContents, 2);
  if (accContents == 0){
    goto();
  }
}

function clear(){
  subqueue = [

  ]
}

function output(){
  // UI output function(accumulator contents)
}

function end(){
  queue = [];
  subqueue = [];
  clearInterval(ticks);
}

function busGrant(){
  CONTROLBUS.grant = 1;
  CONTROLBUS.request = 0;
  reporting("Granted use of data bus");
}

function fetch(){
  subqueue = [ // Get data pt1 from ram > cirupdate > data pt2 from ram > decode()
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, PC)",
    "update(MAR)",
    "updateBus(ADDRESSBUS, MAR)",
    "getAddress()",
    "dataRequest()",
    "busGrant()",
    "outputData()",
    "update(MDR)",
    "dataRequest()",
    "busGrant()",
    "updateBus(DATABUS, MDR)",
    "cirUpdate(1)",
    "increment(MAR)",
    "updateBus(ADDRESSBUS, MAR)",
    "getAddress()",
    "outputData()",
    "cirUpdate(2)",
    "increment(PC)",
    "decode()"
  ]
  queue = queue.concat(subqueue);

}

function getOperand(){ // Potential scope issues (will be run by clock, is part of decode)
  if (mode == "01"){ // Operand is memory address, actual data must be fetched
    subqueue = [
      "updateBus(MAR, operand)",
      "getAddress()",
      "dataRequest()",
      "busGrant()",
      "outputData()",
      "update(MDR)"
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
subqueue.push("execute()");
queue = queue.concat(subqueue);
}

function decode(){
  function getOperand(){ // Potential scope issues (will be run by clock, is part of decode)
    if (mode == "01"){ // Operand is memory address, actual data must be fetched
      subqueue = [
        "updateBus(MAR, operand)",
        "getAddress()",
        "dataRequest()",
        "busGrant()",
        "outputData()",
        "update(MDR)"
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
  // subqueue.push(update(MDR)) Will execute before above statements, seems useless
  queue = queue.concat(subqueue);
  }
  subqueue = [
    'opcode = CIR.slice(0, 4).join("")',
    'mode = CIR.slice(4, 6).join("")',
    'operand = CIR.slice(6, 14)',
    'getOperand()', // Being done in wrong order, must be placed before execute
  ]
  queue = queue.concat(subqueue);
}

function execute(){
    opcode = parseInt(opcode, 2);
    commands[opcode]();
    queue = queue.concat(subqueue);
    queue.push("fetch()");


}

function clock(frequency){
  function runProcesses(){
    function clockOff(){
      CONTROLBUS.clock = 0;
    }
    CONTROLBUS.clock = 1;
    eval(queue[0]);
    queue.shift();
    uiUpdate();
    setTimeout(clockOff, frequency);
  }
  ticks = setInterval(runProcesses, frequency); // Must be pausable
  }
