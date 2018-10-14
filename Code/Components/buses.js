var CONTROLBUS;
var ADDRESSBUS = [];
var DATABUS = [];
function initBus(){ // Initialize bus arrays with default values
    CONTROLBUS = {
      "request": 0,
      "grant": 0,
      "write": 0,
      "read": 0,
      "clock": 0,
      "flags": [0,0]
    }

    var ADDRESSBUS = [0,0,0,0,0,0,0,0];
    var DATABUS = [0,0,0,0,0,0,0,0];
}


function dataRequest(){ // Announce intention to use data bus
  CONTROLBUS.request = 1;
  reporting("Requesting use of data bus");
}

function updateBus(bus, register){ // Update bus array from given array
  for (var i = 0; i < register.length; i++){
    bus[i] = register[i];
  }
}

function changeFlag(flagArray){ // Change flag lines on control bus and update status register
  updateBus(CONTROLBUS.flags, flagArray);
  statusUpdate(); // Update status register with data on flag lines
}
