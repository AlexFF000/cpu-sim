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
  for (var i = 0; i < 8; i++){
    val[i] = parseInt(DATABUS[i], 10);
  }

}


function addition(){
  reporting("Beginning addition");
  var len = val1.length;
  outList = [];
  var carry = 0;
  for (var i = 0; i < val1.length; i++){
    console.log("loop");
    var sum = val1[len - 1] + val2[len - 1] + carry; // if 3 then 1 carry 1, not 0 carry 1
    if (val1[len - 1] == 0 && val2[len - 1] == 0){
      if (carry == 1){
        outList.unshift(1);
        carry = 0;
      }
      else{
        outList.unshift(0);
        carry = 0;
        console.log("o0, c0");
    }
    }
    else if ((val1[len - 1] == 1 && val2[len - 1] == 0) ||
    (val1[len - 1] == 0 && val2[len - 1] == 1)){
      if (carry == 1){
        outList.unshift(0);
        carry = 1;
      }
      else{
        outList.unshift(1);
        carry = 0;
        console.log("o1, c0")
      }
      }
    else if (val1[len - 1] == 1 && val2[len - 1] == 1){
      if (carry == 1){
        outList.unshift(1);
        carry = 1;
      }
      else {
      outList.unshift(0);
      carry = 1;
      console.log("o0, c1");
    }
    }

    len--;
    console.log(JSON.stringify(len));
    if (carry == 1 && len == 0){
      console.log("len is 0, but there is another carry")
      // outList.unshift(1);
      changeFlag([3, 1]); // Set carry flag
    }
    else {
      changeFlag([3, 0]);
    }
    reporting("Added");
    console.log(JSON.stringify(outList));
    }
    if (outList[0] != val1[0] && outList[0] !=val2[0]){ // This may or may not work // Overflow is only for signed operations
      changeFlag([2, 1]); // Set overflow flag
    }
    else {
      changeFlag([2, 0]);
    }

    isZeroOrNeg();
    }



function and(){
  // Bitwise AND
  outList = [];
  for (var i = 0; i < val1.length; i++){
    if (val1[i] == 1 && val2[i] == 1){
      outList.push(1);
    }
    else{
      outList.push(0);
    }
  }
  isZeroOrNeg();

}

function or(){
  // Bitwise OR
  outList = [];
  for (var i = 0; i < val1.length; i++){
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
isZeroOrNeg();
}


function xor(){
  // Bitwise XOR
  outList = [];
  for (var i = 0; i < val1.length; i++){
    if ((val1[i] == 1 && val2[i] == 0) || (val1[i] == 0 && val2[i] == 1)){
      outList.push(1);
    }
    else {
      outList.push(0);
    }
  }
  isZeroOrNeg();
}

function not(){
  console.log("Starting NOT function");
  // Bitwise NOT
  outList = [];
  for (var i = 0; i < val1.length; i++){
    if (val1[i] == 0){
      outList.push(1);
    }
    else{
      outList.push(0);
    }

  }
  console.log("returning number");
  console.log(JSON.stringify(outList));
  isZeroOrNeg();
  }

  function twosComplement(){
    not();
    val1 = outList;
    val2 = [0,0,0,0,0,0,0,1];
    addition();
  }

  function isZeroOrNeg(){
    var allZero = true;  // is output zero?
    for (var i = 0; i < 8; i++){
      if (outList[i] != 0){
        allZero = false;
        break;
      }
    }
    if (allZero){
      changeFlag([0, 1]); // Set zero flag
    }
    else {
      changeFlag([0, 0]);
    }
    if (outList[0] == 1){  // is output negative?
      changeFlag([1, 1]); // set negative flag
    }
    else{
      changeFlag([1, 0]);
    }
  }
