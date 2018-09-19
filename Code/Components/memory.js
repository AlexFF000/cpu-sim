import * as buses from 'buses.js';
function init(){
  var RAM = [];
  for (i = 0; i < 256; i++){
    RAM.push([0,0,0,0,0,0,0,0]);
  }
  var address;
}

function getAddress(){
  let location = buses.ADDRESSBUS.join("");
  location = parseInt(location, 2);
  address = RAM[location];
}

function outputData(){
    buses.DATABUS = address;

}

function writeData(){
    address = buses.DATABUS;
}
