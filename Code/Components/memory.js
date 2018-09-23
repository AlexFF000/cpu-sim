var address;
var RAM;
var loc;
function initMem(){
  RAM = [];
  for (i = 0; i < 256; i++){
    RAM.push([0,0,0,0,0,0,0,0]);
  }

}

function getAddress(){
  loc = ADDRESSBUS.join("");
  loc = parseInt(loc, 2);
  address = RAM[loc];
}

function outputData(){
    DATABUS = address;

}

function writeData(){
    address = DATABUS;
    memUpdate(loc); // Update memory UI
}
