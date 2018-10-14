var address;
var RAM;
var loc;
function initMem(){ // Initialise memory array with default values (00000000)
  RAM = [];
  for (var i = 0; i < 256; i++){
    RAM.push([0,0,0,0,0,0,0,0]);
  }

}

function getAddress(){ // Get reference to data at address currently on ADDRESSBUS
  loc = ADDRESSBUS.join("");
  loc = parseInt(loc, 2);
  address = RAM[loc];
  if (loc > 255 || loc < 0){ // Prevent use of non existent addresses
    reporting("That memory address does not exist");
    clearInterval(ticks);
  }
}

function outputData(){ // Put data from address onto DATABUS
    updateBus(DATABUS, address);

}

function writeData(){ // Take data from DATABUS and place in address
    for (var i = 0; i < 8; i++){
      RAM[loc, i] = parseInt(DATABUS[i], 10); // deep copy data
    }
    memUpdate(loc); // Update memory UI
}
