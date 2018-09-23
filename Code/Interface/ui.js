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
  memUi[row].cells[col].innerHtml = RAM[addr];
}
