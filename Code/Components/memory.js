var address;
var RAM;
var loc;
function initMem(){
  RAM = [];
  for (var i = 0; i < 256; i++){
    RAM.push([0,0,0,0,0,0,0,0]);
  }

}

function getAddress(){
  loc = ADDRESSBUS.join("");
  loc = parseInt(loc, 2);
  address = RAM[loc];
}

function outputData(){
    updateBus(DATABUS, address);

}

function writeData(){
    updateBus(address, DATABUS)
    // address = DATABUS;
    memUpdate(loc); // Update memory UI
}
