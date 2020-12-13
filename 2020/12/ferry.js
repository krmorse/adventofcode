const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  return lines.map((line) => {
    const tokens = line.match(/^([A-Z])(\d+)$/);
    return {
      command: tokens[0],
      op: tokens[1],
      arg: parseInt(tokens[2]),
    };
  });
};

const deltas = {
  N: {
    deltaX: 0,
    deltaY: 1,
    heading: 0,
  },
  E: {
    deltaX: 1,
    deltaY: 0,
    heading: 90,
  },
  S: {
    deltaX: 0,
    deltaY: -1,
    heading: 180,
  },
  W: {
    deltaX: -1,
    deltaY: 0,
    heading: 270,
  },
};

const headings = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const input = parseInput(lines);
    let direction = "E",
      x = 0,
      y = 0;
    for (let i = 0; i < input.length; i++) {
      console.log(`direction: ${direction}, x: ${x}, y: ${y}, nextOp: ${input[i].command}`);
      switch (input[i].op) {
        case "F":
          x += deltas[direction].deltaX * input[i].arg;
          y += deltas[direction].deltaY * input[i].arg;
          console.log(`moving forward. newX: ${x}, newY: ${y}`);
          break;
        case "R":
          let currentHeading = deltas[direction].heading;
          let newHeading = (currentHeading + input[i].arg) % 360;
          direction = headings[newHeading];
          console.log(`turning right ${input[i].arg}. newDirection: ${direction}`);
          break;
        case "L":
          let curHead = deltas[direction].heading;
          let newHead = curHead - input[i].arg;
          if (newHead < 0) { newHead += 360; }
          direction = headings[newHead];
          console.log(`turning left ${input[i].arg}. newDirection: ${direction}`);
          break;
        default:
          const dir = input[i].op;
          x += deltas[dir].deltaX * input[i].arg;
          y += deltas[dir].deltaY * input[i].arg;
          console.log(`moving... direction: ${dir}, x: ${x}, y: ${y}`);
      }
    }

    console.log("x", x, "y", y, "distance:", Math.abs(x) + Math.abs(y));
  });
};

part1();
