//Arithmetic Logic Unit Simulator


function checkTypes(val1, val2){
  // Check values are numerical
  if typeof val1 == "number" AND typeof val2 == "number"{

  }
}

function splitNumbers(val1, val2){
  // Split values into arrays of indvidual digits
  function backToNum(tmp){
    // Convert array of strings back to numbers
    var arr = []
    for(i=0, i < tmp.length, i++){
      arr.push(number(tmp[0]))
      tmp.splice(0)
      return arr

    }

  }
  var tmp = val1.toString().split("")
  numList1 = backToNum(tmp)

  tmp = val2.toString().split("")
  numList2 = backToNum(tmp)
}

function add(val1, val2){
  // add values
  return val1 + val2
}

function sub(val1, val2){
  return val1 - val2
}


function AND(val1, val2){
  splitNumbers(val1, val2)
  
}
