var CONTROLBUS;
var ADDRESSBUS = [];
var DATABUS = [];
function initBus(){
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

function interruptRequest(){
  CONTROLBUS.irq = 1;
}

function dataRequest(){
  CONTROLBUS.request = 1;
  reporting("Requesting use of data bus");
}

function updateBus(bus, register){
  for (var i = 0; i < register.length; i++){
    bus[i] = register[i];
  }
}

function changeFlag(flagArray){
  updateBus(CONTROLBUS.flags, flagArray);
  statusUpdate();
}
