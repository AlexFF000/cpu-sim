import * as buses from "buses.js";
function init(){
  PC = [0,0,0,0,0,0,0,0];
  CIR = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  MAR = [0,0,0,0,0,0,0,0];
  MDR = [0,0,0,0,0,0,0,0];
  ACC = [0,0,0,0,0,0,0,0];
}

function update(register){
  register = buses.DATABUS;
}

function incrementPC(){
  var val1 = PC;
  var val2 = [0,0,0,0,0,0,0,1]
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
    PC = outList;

}
