var memUi;
var program_counter, memaddr_reg, memdat_reg, acc_reg, currinst_reg;
var addr_bus, dat_bus, mem_table, stat_table, output_field, info_field;

function getOutputs(){
  // Contains DOM IDs of elements on HTML page
  program_counter = "PCbox"; // Output field for program counter
  memaddr_reg = "MARbox"; // Output field for memory address register
  memdat_reg = "MDRbox";  // Output field for memory data register
  acc_reg = "ACCbox"; // Output field for accumulator
  currinst_reg = "CIRbox"; // Output field for current instruction register
  addr_bus = "addressBox"; // Output field for address box
  dat_bus = "dataBox"; // Output field for data box
  mem_table = "memTable"; // Table containing memory addresses
  stat_table = "statReg"; // Table for status register
  output_field = "outBox"; // Field for outputting data to user
  info_field = "reportBox"; // Field for outputting information and errors to user
}
function start(){
  getOutputs();
  memUi = document.getElementById(mem_table).rows;  // For use in uiUpdate later
  var usrInput = document.getElementById("instructions").value;
  var instructions = [];
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
  control(instructions, 100);
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

function outputToUser(){
  document.getElementById(output_field).value = DATABUS.join("");
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
