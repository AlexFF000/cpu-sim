import * as buses from "buses.js";
import * as memory from "memory.js";
import * as alu from "ALU.js";
import * as registers from "registers.js";
var commands = [
   add(),
   sub(),
   and(),
   or(),
   not(),
   read(),
   write(),
   goto(),
   goto_ifPos(),
   goto_ifNeg(),
   goto_ifZero(),
   clear(), // Useless, remove
   output(),
   end()
]
var opcode;
var mode;
var operand;
var ticks;

var queue = []; // Points to functions for each command
var subqueue = []; // Merges into queue to add next instruction


function control(instructions, frequency){ // Recieve instructions, load into memory, start simulation
  registers.init();
  buses.init();
  memory.init();
  for (i = 0; i < instructions.length; i++){
    memory.RAM[i] = instructions[i];
  }
  queue.push(fetch());
  clock(frequency);
}

function add(mode, operand){
    subqueue = [
      buses.dataRequest(),
      busGrant(),
      buses.DATABUS = operand,
      alu.getVal(1),
      buses.dataRequest(),
      busGrant(),
      buses.DATABUS = registers.ACC,
      alu.add(),
      buses.dataRequest(),
      busGrant(),
      buses.DATABUS = ALU.outList,
      registers.update(ACC)
    ]

  }


function sub(mode, operand){
  
}

function and(mode, operand){
  subqueue = [
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = registers.MDR,
    alu.getVal(1),
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = registers.ACC,
    alu.getVal(2),
    alu.and(),
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = alu.outList,
    registers.update(ACC)

  ]
}

function or(mode, operand){
  subqueue = [
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = registers.MDR,
    alu.getVal(1),
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = registers.ACC,
    alu.getVal(2),
    alu.or(),
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = alu.outList,
    registers.update(ACC)
  ]
}

function not(){
  subqueue = [
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = registers.MDR,
    alu.getVal(1),
    alu.not(),
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = alu.outList,
    registers.update(ACC),
  ]
}

function read(operand){

    // Request bus permissions, put on address bus, get operand from memory, perms, data on data bus, put into accumulator
    subqueue =[
      buses.ADDRESSBUS = registers.MDR,
      memory.getAddress(),
      buses.dataRequest(),
      busGrant(),
      memory.outputData(),
      registers.update(ACC)
    ]
}

function write(operand){
    // Request bus permissions, put on address bus, get data from accumulator, perms, data on data bus, write to memory
    subqueue = [
      buses.ADDRESSBUS = register.MDR,
      memory.getAddress(),
      buses.dataRequest(),
      busGrant(),
      memory.writeData()
    ]
}

function goto(mode, operand){
  subqueue = [
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = registers.MDR,
    registers.update(PC)
  ]
}

function goto_ifPos(mode, operand){
  var accContents = registers.ACC.join("");
  accContents = parseInt(accContents, 2);
  if (accContents >= 0){
    goto()
  }
}

function goto_ifNeg(mode, operand){
  var accContents = registers.ACC.join("");
  accContents = parseInt(accContents, 2); // May not work if twos complement
  if (accContents < 0){
    goto();
  }
}

function goto_ifZero(mode, operand){
  var accContents = registers.ACC.join("");
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
  buses.CONTROLBUS.grant = 1;
  buses.CONTROLBUS.request = 0;
}

function fetch(){
  subqueue = [
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = registers.PC,
    registers.update(MAR),
    buses.ADDRESSBUS = MAR,
    memory.getAddress(),
    buses.dataRequest(),
    busGrant(),
    memory.outputData(),
    registers.update(MDR),
    registers.incrementPC(),
    buses.dataRequest(),
    busGrant(),
    buses.DATABUS = MDR,
    registers.update(CIR),
    decode()
  ]
  queue = queue.concat(subqueue);

}

function decode(){
  function getOperand(){ // Potential scope issues (will be run by clock, is part of decode)
    if (mode == "01"){ // Operand is memory address, actual data must be fetched
      subqueue = [
        buses.MAR = operand,
        memory.getAddress(),
        buses.dataRequest(),
        busGrant(),
        memory.outputData(),
        registers.update(MDR)
      ]

  }
  else{
    subqueue = [ // Operand is the data to be operated on
      buses.dataRequest(),
      busGrant(),
      buses.DATABUS = operand,
      registers.update(MDR)
    ]
  }
  subqueue.push(registers.update(MDR))
  queue = queue.concat(subqueue);
  }
  subqueue = [
    opcode = registers.CIR.slice(0, 4).join(""),
    mode = registers.CIR.slice(4, 6).join(""),
    operand = registers.CIR.slice(6, 15),
    getOperand(),
    execute()
  ]
  queue = queue.concat(subqueue);
}

function execute(){
    operand = parseInt(operand.join(""), 2);
    commands[operand]();
    queue = queue.concat(subqueue);
    queue.push(fetch());


}

function clock(frequency){
  function runProcesses(){
    function clockOff(){
      buses.CONTROLBUS.clock = 0;
    }
    buses.CONTROLBUS.clock = 1;
    eval(queue[0]);
    queue.shift();
    setTimeout(clockOff, frequency);
  }
  ticks = setInterval(runProcesses, frequency); // Must be pausable
  }
