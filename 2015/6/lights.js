const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((inputs) => {
    const lights = {};
    inputs.forEach((instruction) => {
      const details = instruction.split(" ");
      let startCoords, endCoords, op;
      let startX, startY, endX, endY;
      if (details[0] === "toggle") {
        op = details[0];
        startCoords = details[1];
        endCoords = details[3];
      } else {
        op = details[1];
        startCoords = details[2];
        endCoords = details[4];
      }

      [startX, startY] = startCoords.split(",").map((num) => parseInt(num, 10));
      [endX, endY] = endCoords.split(",").map((num) => parseInt(num, 10));

      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          if (op === "toggle") {
            lights[`${x},${y}`] = !lights[`${x},${y}`];
          } else if (op === "off") {
            lights[`${x},${y}`] = false;
          } else if (op === "on") {
            lights[`${x},${y}`] = true;
          }
        }
      }
    });

    console.log(
      "Lights on:",
      Object.keys(lights).filter((coord) => !!lights[coord]).length
    );
  });
};

const part2 = () => {
  inputUtils.getInput().then((inputs) => {
    const lights = {};
    inputs.forEach((instruction) => {
      const details = instruction.split(" ");
      let startCoords, endCoords, op;
      let startX, startY, endX, endY;
      if (details[0] === "toggle") {
        op = details[0];
        startCoords = details[1];
        endCoords = details[3];
      } else {
        op = details[1];
        startCoords = details[2];
        endCoords = details[4];
      }

      [startX, startY] = startCoords.split(",").map((num) => parseInt(num, 10));
      [endX, endY] = endCoords.split(",").map((num) => parseInt(num, 10));

      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          if (op === "toggle") {
            lights[`${x},${y}`] = (lights[`${x},${y}`] || 0) + 2;
          } else if (op === "off") {
            lights[`${x},${y}`] = Math.max((lights[`${x},${y}`] || 0) - 1, 0);
          } else if (op === "on") {
            lights[`${x},${y}`] = (lights[`${x},${y}`] || 0) + 1;
          }
        }
      }
    });

    console.log(
      "Total brightness:",
      Object.values(lights).reduce((accum, val) => accum + val, 0)
    );
  });
};

part2();
