//Arithmetic Logic Unit Simulator


function checkTypes(val1, val2){
  // Check values are numerical and binary
  if (val1 !== 0 || val1 !== 1 || val2 !== 0 || val2 !== 1){
    // Report error
  }
  }


function splitNumbers(val1, val2){
  console.log("Splitting number into list");
  // Split values into arrays of indvidual digits
  function backToNum(tmp){
    // Convert array of strings back to numbers
    console.log("Turning strings to numbers");
    console.dir(tmp);
    var arr = [];
    for(i=0; i < tmp.length; i++){
      arr.push(Number(tmp[0]));
      tmp.splice(0);
      console.log("Strings are now numbers");
      console.dir(arr);
      return arr;

    }

  }
  var tmp = val1.toString().split("");
  console.log("Splitting strings");
  var numList1 = backToNum(tmp);

  tmp = val2.toString().split("");
  var numList2 = backToNum(tmp);

  var numList = [numList1, numList2];
  console.dir(numList1);
  return numList;
}

function toNumber(arry){
  // Convert array back to number
  console.log("Returning array to number")
  arry = arry.join();
  arry.replace(/'/g, "");
  arry.replace(/,/g, "");
  arry = Number(arry)
  console.log("Returning number")
  return arry;
}

function add(val1, val2){
  checkTypes(val1, val2);
  // add values
  numList = splitNumbers(val1, val2);
  var outList = [];
  for (i=0; i < numlist[0].length; i++){
    outList.push(numList[0][0] + numList[1][0]);
    numList[0].splice(0);
    numList[1].splice(0);
}
  return toNumber(outList);
}



function sub(val1, val2){
checkTypes(val1, val2);
  // Subtract values
  numList = splitNumbers(val1, val2);
  var outList = [];
  for (i=0; i < numlist[0].length; i++){
    outList.push(numList[0][0] - numList[1][0]);
    numList[0].splice(0);
    numList[1].splice(0);
}
  return toNumber(outList);
}

function AND(val1, val2){
  checkTypes(val1, val2);
  // Bitwise AND
  var numList = splitNumbers(val1, val2);
  var outList = [];
  for (i=0; i < numlist[0].length; i++){
    if (numList[0][0] == numList[1][0]){
      outList.push(1);
    }
    else{
      outList.push(0);
    }
    numList[0].splice(0);
    numList[1].splice(0);
  }
  return toNumber(outList);

}

function OR(val1, val2){
  checkTypes(val1, val2);
  // Bitwise OR
  var numList = splitNumbers(val1, val2);
  var outList = [];
  for (i=0; i < numlist[0].length; i++){
    if (numList[0][0] == 1){
      outList.push(1);
    }
    else if (numlist[1][0] == 1) {
        outList.push(1);
    }
    else {
      outList.push(0);
    }
    numList[0].splice(0);
    numList[1].splice(0);
}
return toNumber(outList);
}


function XOR(val1, val2){
  checkTypes(val1, val2);
  // Bitwise XOR
  var numList = splitNumbers(val1, val2);
  var outList = [];
  for (i=0; i < numlist[0].length; i++){
    if ((numList[0][0] + numList[1][0]) == 1){
      outList.push(1);
    }
    else {
      outList.push(0);
    }
    numList[0].splice(0);
    numList[1].splice(0);
    }
    return toNumber(outList);
    }

function NOT(val1){
  console.log("Starting NOT function");
  checkTypes(val1, 0);
  // Bitwise NOT
  var numList = splitNumbers(val1, 0);
  var outList = []
  for (i=0; i < numList[0].length; i++){
    if (numList[0][0] == 0){
      outList.push(1);
    }
    else{
      outList.push(0);
    }
    numList[0].splice(0)
  }
  console.log("returning number");
  console.log(outList);
  return toNumber(outList);
  }
splitNumbers(0110, 1001);
