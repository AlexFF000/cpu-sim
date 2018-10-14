var PC;
var CIR;
var MAR;
var MDR;
var ACC;
var STATUS;
var cirarray = [];
function initReg(){ // Initialise register arrays
  PC = [0,0,0,0,0,0,0,0];
  CIR = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  MAR = [0,0,0,0,0,0,0,0];
  MDR = [0,0,0,0,0,0,0,0];
  ACC = [0,0,0,0,0,0,0,0];
  STATUS = [ 0, // Zero
             0, // Negative
             0, // Overflow
             0 // Carry
          ];
}

function update(register){ // Put contents of DATABUS into given array
  for (var i = 0; i < 8; i++){ // Deep copy values
    register[i] = parseInt(DATABUS[i], 2);
  }
}

function cirUpdate(part){ // Update CIR to contain instruction ready to be decoded
 // Due to 14 bit instructions, but only 8 bit word size- instructions are stored in two consecutive memory addresses
 // The cir is updated in two parts, from two addresses
  if (part == 1){
    cirarray = [];
    updateBus(cirarray, DATABUS); // Put first half of instruction into CIR array
    // cirarray = DATABUS;
  }
  else if (part == 2){
       // Push last 6 bits from DB to cirarray
    cirarray = cirarray.concat(DATABUS.slice(2, 8)); // First two bits of part 2 are meaningless zeros because instruction is 14 bit. These bits are discarded and the remaining 6 added to end of cir array
    CIR = cirarray; // Contents of cir array placed in CIR
  }
}

function statusUpdate(){ // Update status register from flags register
  var flag = CONTROLBUS.flags[0]; // First flag line indicates which flag is to be updated, second line indicated what it is changed to
  if (CONTROLBUS.flags[1] == 0){
    STATUS[flag] = 0;
  }
  else {
    STATUS[flag] = 1;
  }
  }

function increment(reg){ // Update PC or MAR ready for next instruction
  if (reg == PC){
    var val1 = PC;
    var val2 = [0,0,0,0,0,0,1,0]; // Add two to PC (not 1 becuase each instuction takes 2 addresses)
  }
  else if (reg == MAR){
    var val1 = MAR;
    var val2 = [0,0,0,0,0,0,0,1]; // Update MAR by 1 to get part two of instuction
  }
  var outList = [];
  var carry = 0;
  len = 8;
  for (var i = 0; i < 8; i++){
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
      if (sum == 3){
        outList.unshift(1);
        carry = 1;
      }
      else{
      outList.unshift(0)
      carry = 1;
    }
    }
    len--;
    if (carry == 1 && len == 0){
      outList.unshift(1);
    }
    }
    if (reg == PC){ // Update registers to new value
      PC = outList;
  }
    else if (reg == MAR){
      MAR = outList;
  }
}
