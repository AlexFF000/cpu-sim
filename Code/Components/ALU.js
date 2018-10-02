//Arithmetic Logic Unit Simulator


var outList = [];
var val1 = [];
var val2 = [];
var subtract;
function getVal(value){
  if (value == 1){
    val = val1;
  }
  else{
    val = val2;
  }
  for (i = 0; i < 8; i++){
    val[i] = parseInt(DATABUS[i], 10);
  }

}


function addition(){
  reporting("Beginning addition");
  var len = val1.length;
  outList = [];
  var carry = 0;
  for (i = 0; i < val1.length; i++){
    console.log("loop");
    var sum = val1[len - 1] + val2[len - 1] + carry;
    if (sum == 0){
      outList.unshift(0);
      carry = 0;
      console.log("o0, c0")
    }
    else if (sum == 1){
      outList.unshift(1);
      carry = 0;
      console.log("o1, c0")
      }
    else if (sum > 1){
      outList.unshift(0)
      carry = 1;
      console.log("o0, c1")
    }
    len--;
    console.log(JSON.stringify(len));
    if (carry == 1 && len == 0){
      console.log("len is 0, but there is another carry")
      // outList.unshift(1);
      CONTROLBUS.flags = [3, 1]; // Set carry flag
    }
    reporting("Added")
    console.log(JSON.stringify(outList))

    if (outList[0] != val1[0] && outList !=val2[0]){ // This may or may not work // Overflow is only for signed operations
      CONTROLBUS.flags = [2, 1]; // Set overflow flag
    }

    }
    return outList;
    }



function and(){
  // Bitwise AND
  outList = [];
  for (i=0; i < val1.length; i++){
    if ((val1[i] + val2[i]) == 2){
      outList.push(1);
    }
    else{
      outList.push(0);
    }
  }
  return outList;

}

function or(){
  // Bitwise OR
  outList = [];
  for (i=0; i < val1.length; i++){
    if (val1[i] == 1){
      outList.push(1);
    }
    else if (val2[i] == 1) {
        outList.push(1);
    }
    else {
      outList.push(0);
    }

}
return outList;
}


function xor(){
  // Bitwise XOR
  outList = [];
  for (i = 0; i < val1.length; i++){
    if ((val1[i] + val2[i]) == 1){
      outList.push(1);
    }
    else {
      outList.push(0);
    }
  }
  return outList;
}

function not(){
  console.log("Starting NOT function");
  // Bitwise NOT
  outList = [];
  for (i=0; i < val1.length; i++){
    if (val1[i] == 0){
      outList.push(1);
    }
    else{
      outList.push(0);
    }

  }
  console.log("returning number");
  console.log(JSON.stringify(outList));
  return outList;
  }

  function twosComplement(){
    not();
    val1 = outList;
    val2 = [0,0,0,0,0,0,0,1];
    addition();
  }
