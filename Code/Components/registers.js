var PC;
var CIR;
var MAR;
var MDR;
var ACC;
var STATUS;
var cirarray = [];
function initReg(){
  PC = [0,0,0,0,0,0,0,0];
  CIR = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  MAR = [0,0,0,0,0,0,0,0];
  MDR = [0,0,0,0,0,0,0,0];
  ACC = [0,0,0,0,0,0,0,0];
  STATUS = {"zero": 0,
            "negative": 0,
            "overflow": 0,
            "carry": 0
          }
}

function update(register){
  for (i = 0; i < 8; i++){ // Deep copy values
    register[i] = parseInt(DATABUS[i], 2);
  }
}

function cirUpdate(part){

  if (part == 1){
    cirarray = [];
    updateBus(cirarray, DATABUS)
    // cirarray = DATABUS;
  }
  else if (part == 2){
       // Push last 6 bits from DB to cirarray // Here is the culprit!!! Databus is just a reference to MDR
    cirarray = cirarray.concat(DATABUS.slice(2, 8));
    CIR = cirarray; // MDR gets updated as well (nvm it gets updated before this)
  }
}

function increment(reg){
  if (reg == PC){
    var val1 = PC;
    var val2 = [0,0,0,0,0,0,1,0];
  }
  else if (reg == MAR){
    var val1 = MAR;
    var val2 = [0,0,0,0,0,0,0,1];
  }
  var outList = [];
  var carry = 0;
  len = 8;
  for (i = 0; i < 8; i++){
    var sum = val1[len - 1] + val2[len - 1] + carry;
    if (sum == 0){
      outList.unshift(0);
      carry = 0;
    }
    else if (sum == 1){
      outList.unshift(1);
      carry = 0;
      }
    else if (sum > 1){
      outList.unshift(0)
      carry = 1;
    }
    len--;
    if (carry == 1 && len == 0){
      outList.unshift(1);
    }
    }
    if (reg == PC){
      PC = outList;
  }
    else if (reg == MAR){
      MAR = outList;
  }
}
