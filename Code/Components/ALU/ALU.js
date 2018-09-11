//Arithmetic Logic Unit Simulator



function add(val1, val2){
  var len = val1.length;
  var outList = [];
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
    console.log(JSON.stringify(outList))
    }
    return outList;
    }





function sub(val1, val2){
checkTypes(val1, val2);
  // Subtract values
  numList = [val1, val2];
  var outList = [];
  for (i=0; i < numlist[0].length; i++){
    outList.push(numList[0][0] - numList[1][0]);
    numList[0].splice(0);
    numList[1].splice(0);
}
  return outList;
}

function AND(val1, val2){
  checkTypes(val1, val2);
  // Bitwise AND
  var outList = [];
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

function OR(val1, val2){
  checkTypes(val1, val2);
  // Bitwise OR
  var outList = [];
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


function XOR(val1, val2){
  checkTypes(val1, val2);
  // Bitwise XOR
  var outList = [];
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

function NOT(val1){
  console.log("Starting NOT function");
  checkTypes(val1, 0);
  // Bitwise NOT
  var outList = [];
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

console.log(JSON.stringify(add([1,0,0,1,1], [1,0,0,1,0])));
