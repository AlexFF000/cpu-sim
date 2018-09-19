function splitNumbers(val1, val2){
  console.log("1", "Splitting number into array");
  // Split values into arrays of indvidual digits
  function backToNum(tmp){
    // Convert array of strings back to numbers
    console.log("4", "Turning strings to numbers");
    console.dir("5", JSON.stringify(tmp));
    var arr = [];
    var len = tmp.length;
    console.log("6", JSON.stringify(len));
    for(i = 0; i < len; i++){
      arr.push(Number(tmp[i]));
      //tmp.splice(0);
      console.log("7", "Strings are now numbers");
      console.dir("8", JSON.stringify(arr));
    }
    return arr;
  }

  var tmp = val1.split("");
  console.log("2", JSON.stringify(tmp));
  console.log("3", "Splitting strings");
  var numList1 = backToNum(tmp);

  tmp = val2.toString().split("");
  var numList2 = backToNum(tmp);

  var numList = [numList1, numList2];
  console.log("The values have been returned")
  console.dir("9", JSON.stringify(numList));
  return numList;
}

function tString(arry){
  // Convert array back to number
  console.log("Returning array to number")
  arry = arry.join();
  console.log("Joined: ", JSON.stringify(arry))
  arry = arry.replace(/'/g, "");
  arry = arry.replace(/,/g, "");
  console.log("Replaced: ", JSON.stringify(arry))
  console.log("Returning number")
  return arry;
}
