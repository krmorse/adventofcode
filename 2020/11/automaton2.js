const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  return lines.map((line) => line.split(""));
};

const computeNextState = (input, y, x) => {
  let occupiedCount = 0;
  for (let deltaY = -1; deltaY <= 1; deltaY++) {
    for (let deltaX = -1; deltaX <= 1; deltaX++) {
      if (deltaY || deltaX) {
        let currentY = y,
          currentX = x,
          unoccupied = true;
        do {
          currentY += deltaY;
          currentX += deltaX;

          // //make sure in bounds
          // if (input[currentY] && input[currentY][currentX]) {
          //   unoccupied = unoccupied && input[currentcurrentX]
          // }
        } while (input[currentY] && input[currentY][currentX] === ".");
        if (input[currentY] && input[currentY][currentX] === "#") {
          occupiedCount++;
        }
      }
    }
  }

  if (input[y][x] === "L" && !occupiedCount) {
    return "#";
  } else if (input[y][x] === "#" && occupiedCount >= 5) {
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

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const input = parseInput(lines);
    const stable = evolveUntilStable(input);
    const occupiedCount = stable
      .map((row) => row.filter((seat) => seat === "#").length)
      .reduce((accum, val) => accum + val);
    console.log(occupiedCount);
  });
};

part2();
