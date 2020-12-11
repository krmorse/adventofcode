const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  return lines.map((line) => line.split(""));
};

const computeNextState = (input, y, x) => {
  let occupiedCount = 0;
  for (let neighborY = y - 1; neighborY <= y + 1; neighborY++) {
    for (let neighborX = x - 1; neighborX <= x + 1; neighborX++) {
      if (neighborY !== y || neighborX !== x) {
        occupiedCount +=
          input[neighborY] && input[neighborY][neighborX] === "#" ? 1 : 0;
      }
    }
  }

  if (input[y][x] === "L" && !occupiedCount) {
    return "#";
  } else if (input[y][x] === "#" && occupiedCount >= 4) {
    return "L";
  } else {
    return input[y][x];
  }
};

const evolveUntilStable = (input) => {
  let stable = false;
  let currentGen = input;
  while (!stable) {
    stable = true;
    let nextGen = currentGen.map((row) => row.slice());
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        const nextState = computeNextState(currentGen, y, x);
        stable = stable && nextState === currentGen[y][x];
        nextGen[y][x] = nextState;
      }
    }
    currentGen = nextGen;
  }

  return currentGen;
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const input = parseInput(lines);
    const stable = evolveUntilStable(input);
    const occupiedCount = stable
      .map((row) => row.filter((seat) => seat === "#").length)
      .reduce((accum, val) => accum + val);
    console.log(occupiedCount);
  });
};

part1();
