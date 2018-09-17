function init(){
  var RAM = [];
  for (i = 0; i < 256; i++){
    RAM.push([0,0,0,0,0,0,0,0]);
  }
  var address;
}

function getAddress(){
  var location = ADDRESSBUS.toString();
  address = ram[location];
}

function outputData(){
  for (i = 0; i < 8; i++){
    DATABUS[i] = address[i];
  }
}

function writeData(){
  for (i = 0; i < 8; i++){
    address[i] = DATABUS[i];
  }
}
