# cpu-sim
Basic CPU simulator
Copyright Alex Redmond (All rights reserved)

Instruction Set:

The processor receives 14 bit instructions in the following format:
0000|00|00000000
first 4 bits = opcode; next 2 bits = addressing mode; final 8 bits = operand

Opcodes:
0000 = Add
0001 = Subtract
0010 = Bitwise AND
0011 = Bitwise OR
0100 = Bitwise NOT contents of accumulator
0101 = Read from a memory address to accumulator
0110 = Write contents of accumulator to memory address
0111 = Jump to instruction at specified address
1000 = Go to instruction at specified address if the value in the accumulator is positive
1001 = Go to instruction at specified address if the value in the accumulator is negative
1010 = Go to instruction at specified address if the value in the accumulator is 0
1011 = Clear memory and all registers
1100 = Output contents of accumulator
--Redo this list
Addressing Modes:
00 = Operand is the data to be worked on
01 = Operand is the memory address of the data to be worked on
