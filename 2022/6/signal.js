const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((inputLines) => {
    let i = 0;
    const input = inputLines[0];
    while(new Set(input.substring(i, i+4)).size !== 4) {
      i++;
    }
    console.log(i+4);
  });
};

const part2 = () => {
  inputUtils.getInput().then((inputLines) => {
    let i = 0;
    const input = inputLines[0];
    while(new Set(input.substring(i, i+14)).size !== 14) {
      i++;
    }
    console.log(i+14);
  });
};

part2();
