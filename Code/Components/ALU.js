//Arithmetic Logic Unit Simulator


var outList = [];
var val1 = [];
var val2 = [];
function getVal(value){
  if (value == 1){
    val1 = DATABUS;
  }
  else if (value == 2){
    val2 = DATABUS;
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
      outList.unshift(1);
    }
    reporting("Added")
    console.log(JSON.stringify(outList))
    }
    return outList;
    }





function sub(){
checkTypes(val1, val2);
  // Subtract values
  numList = [val1, val2];
  outList = [];
  for (i=0; i < numlist[0].length; i++){
    outList.push(numList[0][0] - numList[1][0]);
    numList[0].splice(0);
    numList[1].splice(0);
}
  return outList;
}

function and(val1, val2){
  checkTypes(val1, val2);
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

function or(val1, val2){
  checkTypes(val1, val2);
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


function xor(val1, val2){
  checkTypes(val1, val2);
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

function not(val1){
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
