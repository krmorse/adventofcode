const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const mem = {};
    let mask;
    lines.forEach(line => {
      const maskInstruction = line.match(/^mask = ([X10]{36})$/);
      if (maskInstruction) {
        mask = maskInstruction[1];
      } else {
        const memInstruction = line.match(/^mem\[(\d+)\] = (\d+)$/);
        const address = parseInt(memInstruction[1], 10);
        const value = parseInt(memInstruction[2], 10);
        const valueBits = value.toString(2).padStart(36, "0");
        const newValueBits = mask.split('').map((bit, i) => {
          return bit === "X" ? valueBits[i] : bit;
        }).join('');
        mem[address] = newValueBits;
      }
    });

    console.log(Object.values(mem).reduce((accum, val) => accum + parseInt(val, 2), 0));
  });
};

part1();
