var memUi, paused, inputType;
var input_box, program_counter, memaddr_reg, memdat_reg, acc_reg, currinst_reg, pause_but, start_but;
var addr_bus, dat_bus, mem_table, stat_table, output_field, info_field;

function getOutputs(){
  // Contains DOM IDs of elements on HTML page
  input_box = "instructionBox"; // Input for entering instructions
  program_counter = "PCbox"; // Output field for program counter
  memaddr_reg = "MARbox"; // Output field for memory address register
  memdat_reg = "MDRbox";  // Output field for memory data register
  acc_reg = "ACCbox"; // Output field for accumulator
  currinst_reg = "CIRbox"; // Output field for current instruction register
  addr_bus = "addressBox"; // Output field for address bus
  dat_bus = "dataBox"; // Output field for data bus
  cont_bus = "controlBox"; // Output field for control bus
  mem_table = "memTable"; // Table containing memory addresses
  stat_table = "statReg"; // Table for status register
  output_field = "outBox"; // Field for outputting data to user
  info_field = "reportBox"; // Field for outputting information and errors to user
  pause_but = "playPause"; // Pause / resume button
  start_but = "load"; // Start button
  speed_field = "clockSpeed"; // Clock speed field
}
function start(){
  memUi = document.getElementById(mem_table).rows;  // For use in uiUpdate later
  document.getElementById(start_but).disabled = true;
  document.getElementById(pause_but).disabled = false;
  var speed = document.getElementById(speed_field).value;
  var usrInput = document.getElementById(input_box).value;
  var instructions = [];
  if (inputType == 0){
    usrInput = usrInput.replace(/[^A-Z0-9]/ig, ""); // Remove all but letters and numbers
    var quantity = usrInput.length / 7;
    for (var i = 0; i < quantity; i++){
      var instStr = usrInput.slice(0, 3);
      if (commands){}

    }
  }

  var quantity = usrInput.length / 14;
  for (var i = 0; i < quantity; i++){
    var commandStr = usrInput.slice(0, 14);
    var command = [];
    for (var x = 0; x < 14; x++){
      let commandNum = parseInt(commandStr[x], 10);
      command.push(commandNum);
    }
    instructions.push(command);
    usrInput = usrInput.substr(14);
  }
  control(instructions, speed);
}

function formatEntry(type){
  getOutputs();
  var inBox = document.getElementById(input_box);
  inBox.disabled = false;
  inBox.value = "";
  document.getElementById(start_but).disabled = false;
  
  if (type == 0){ // Assembly code
    inputType = 0;
  }
  else {
    inputType = 1;
  }
}

function uiUpdate(){
  document.getElementById(program_counter).value = PC.join("");
  document.getElementById(memaddr_reg).value = MAR.join("");
  document.getElementById(memdat_reg).value = MDR.join("");
  document.getElementById(acc_reg).value = ACC.join("");
  document.getElementById(currinst_reg).value = CIR.join("");
  document.getElementById(addr_bus).value = ADDRESSBUS.join("");
  document.getElementById(dat_bus).value = DATABUS.join("");
  statUIUpdate();
  busUIUpdate();
}

function memUpdate(addr){
  let row = parseInt(addr / 16);
  let col = addr % 16;
  let table = memUi[row].cells;
  table[col].innerHTML = RAM[addr].join("");
}

function statUIUpdate(){
  let tab = document.getElementById(stat_table).rows;
  let row = tab[0].cells;
  row[1].innerHTML = STATUS[0];
  row = tab[1].cells;
  row[1].innerHTML = STATUS[1];
  row = tab[2].cells;
  row[1].innerHTML = STATUS[2];
  row = tab[3].cells;
  row[1].innerHTML = STATUS[3];
}

function cBusUpdate(){
  var uiCBus = document.getElementById(cont_bus).children;
  if (CONTROLBUS.clock == 1){
    uiCBus[0].style.backgroundColor = "blue";
  }
  else {uiCBus[0].style.backgroundColor = "grey";}
  if (CONTROLBUS.request == 1){
    uiCBus[1].style.backgroundColor = "blue";
  }
  else {uiCBus[1].style.backgroundColor = "grey";}
  if (CONTROLBUS.grant == 1){uiCBus[2].style.backgroundColor = "blue";}
  else {uiCBus[2].style.backgroundColor = "grey";}
  if (CONTROLBUS.write == 1){uiCBus[3].style.backgroundColor = "blue";}
  else {uiCBus[3].style.backgroundColor = "grey";}
  if (CONTROLBUS.read == 1){uiCBus[4].style.backgroundColor = "blue";}
  else {uiCBus[4].style.backgroundColor = "grey";}
  if (CONTROLBUS.flags[0] == 1){uiCBus[5].style.backgroundColor = "blue";}
  else{uiCBus[5].style.backgroundColor = "grey";}
  if (CONTROLBUS.flags[1] == 1){uiCBus[6].style.backgroundColor = "blue";}
  else{uiCBus[6].style.backgroundColor = "grey";}
}

function busUIUpdate(){
  var uiDBus = document.getElementById(dat_bus).children;
  var uiABus = document.getElementById(addr_bus).children;

  for (var i = 0; i < 8; i++){
    if (DATABUS[i] == 1){
      uiDBus[i].style.backgroundColor = "blue";
    }
    else {
      uiDBus[i].style.backgroundColor = "grey";
    }

    if (ADDRESSBUS[i] == 1){
      uiABus[i].style.backgroundColor = "blue";
    }
    else{
      uiABus[i].style.backgroundColor = "grey";
    }
  }
  cBusUpdate();
}


function outputToUser(){
  document.getElementById(output_field).value = DATABUS.join("");
}

function playPause(){
  if (paused != true){
    document.getElementById(pause_but).value = "Resume";
    pause();
  }
  else{
    document.getElementById(pause_but).value = "Pause";
    resume();
  }
}

function convert(){
  let convert_Opcode = document.getElementById("pickOpc").value;
  let convert_Mode = document.getElementById("pickMode").value;
  var convert_Operand = document.getElementById("pickOper").value;
  convert_Operand = parseInt(convert_Operand, 10);
  convert_Operand = convert_Operand.toString(2);
  let addBits = 8 - convert_Operand.length;
  for (addBits > 0; addBits--;){
    convert_Operand = "0" + convert_Operand;
  }
  let convert_Combine = convert_Opcode + convert_Mode + convert_Operand;
  document.getElementById("convertBox").value = convert_Combine;
}
