const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const input = lines[0];
    let total = 0;
    for (let i = 0; i < input.length; i++) {
      const cur = parseInt(input[i], 10);
      const next = parseInt(input[(i+1)%input.length], 10);

      if (cur === next) {
        total += cur;
      }
    }

    console.log('Solution:', total);
  });
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const input = lines[0];
    let total = 0;
    for (let i = 0; i < input.length; i++) {
      const cur = parseInt(input[i], 10);
      const next = parseInt(input[(i+input.length/2)%input.length], 10);

      if (cur === next) {
        total += cur;
      }
    }

    console.log('Solution:', total);
  });
};

part2();
