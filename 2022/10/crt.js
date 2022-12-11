const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((inputLines) => {
    let x = 1;
    let cycle = 0;
    const values = {};
    inputLines.forEach((instruction) => {
      const [op, val] = instruction.split(' ');
      switch (op) {
        case "noop":
          cycle++;
          break;
        case "addx":
          for (let i = 0; i < 2; i++) {
            if (cycle === 20 || ((cycle - 20) % 40) == 0) {
              values[cycle] = cycle * x;
            }
            cycle++;
          }
          x += parseInt(val, 10);
          break;
        default:
          throw new Error("unsupported instruction:", op);
      }
      if (cycle === 20 || ((cycle - 20) % 40) == 0) {
        values[cycle] = cycle * x;
      }
    });
    console.log(Object.values(values).reduce((accum, val) => accum + val, 0));
  });
};

const part2 = () => {
  inputUtils.getInput().then((inputLines) => {
    let x = 1;
    let cycle = 0;
    let output = "";
    inputLines.forEach((instruction) => {
      const [op, val] = instruction.split(' ');
      switch (op) {
        case "noop":
          cycle++;
          break;
        case "addx":
          for (let i = 0; i < 2; i++) {
            cycle++;
            if (Math.abs(cycle%40 - x) <= 1) {
              output += "#"
            } else {
              output += ".";
            }
            if (cycle % 40 === 39) {
              output += "\n";
            }
          }
          x += parseInt(val, 10);
          break;
        default:
          throw new Error("unsupported instruction:", op);
      }

      if (Math.abs(cycle%40 - x) <= 1) {
        output += "#"
      } else {
        output += ".";
      }
      if (cycle % 40 === 39) {
        output += "\n";
      }
    });
    console.log(output);
  });
};

part2();
