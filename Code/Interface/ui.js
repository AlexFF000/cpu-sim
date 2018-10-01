var memUi;
function start(){
  memUi = document.getElementById("memTable").rows;  // For use in uiUpdate later
  var usrInput = document.getElementById("instructions").value;
  var instructions = [];
  var quantity = usrInput.length / 14;
  for (i = 0; i < quantity; i++){
    var commandStr = usrInput.slice(0, 14);
    var command = [];
    for (x = 0; x < 14; x++){
      let commandNum = parseInt(commandStr[x], 10);
      command.push(commandNum);
    }
    instructions.push(command);
    usrInput = usrInput.substr(14);
  }
  control(instructions, 100);
}

function uiUpdate(){
  document.getElementById("PCbox").value = PC.join("");
  document.getElementById("MARbox").value = MAR.join("");
  document.getElementById("MDRbox").value = MDR.join("");
  document.getElementById("ACCbox").value = ACC.join("");
  document.getElementById("CIRbox").value = CIR.join("");
  document.getElementById("addressBox").value = ADDRESSBUS.join("");
  document.getElementById("dataBox").value = DATABUS.join("");
}

function memUpdate(addr){
  let row = parseInt(addr / 16);
  let col = addr % 16;
  let table = memUi[row].cells;
  table[col].innerHTML = RAM[addr].join("");
}

function outputToUser(){
  document.getElementById("outBox").value = DATABUS.join("");
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
