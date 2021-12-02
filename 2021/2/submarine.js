const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((directions) => {
    let x = 0,
      y = 0;
    directions.forEach((direction) => {
      const [dir, amt] = direction.split(" ");
      switch (dir) {
        case "forward":
          x += parseInt(amt, 10);
          break;
        case "up":
          y -= parseInt(amt, 10);
          break;
        case "down":
          y += parseInt(amt, 10);
          break;
        default:
          throw new Error("unknown instruction:", direction);
      }
    });

    console.log(x * y);
  });
};

const part2 = () => {
  inputUtils.getInput().then((directions) => {
    let x = 0,
      y = 0,
      aim = 0;
    directions.forEach((direction) => {
      const [dir, amt] = direction.split(" ");
      switch (dir) {
        case "forward":
          x += parseInt(amt, 10);
          y += aim * parseInt(amt, 10);
          break;
        case "up":
          aim -= parseInt(amt, 10);
          break;
        case "down":
          aim += parseInt(amt, 10);
          break;
        default:
          throw new Error("unknown instruction:", direction);
      }
    });

    console.log(x * y);
  });
};

part2();
