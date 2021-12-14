const inputUtils = require("../utils/input");

const part1 = () => {
  const coords = {};

  return inputUtils.getInput().then((input) => {
    input.forEach((line) => {
      if (line.split(",").length === 2) {
        const [x, y] = line.split(",").map((n) => parseInt(n, 10));
        coords[`${x},${y}`] = { x, y };
      } else if (line.match(/^fold along/)) {
        const [, , instruction] = line.split(" ");
        const [axis, val] = instruction.split("=");
        if (axis === "y") {
          const yReflectionVal = parseInt(val, 10);
          Object.keys(coords).forEach((key) => {
            const point = coords[key];
            if (point.y > yReflectionVal) {
              const newPoint = {
                x: point.x,
                y: point.y - 2 * (point.y - yReflectionVal),
              };
              delete coords[key];
              coords[`${newPoint.x},${newPoint.y}`] = newPoint;
            }
          });
        } else if (axis === "x") {
          const xReflectionVal = parseInt(val, 10);
          Object.keys(coords).forEach((key) => {
            const point = coords[key];
            if (point.x > xReflectionVal) {
              const newPoint = {
                x: point.x - 2 * (point.x - xReflectionVal),
                y: point.y,
              };
              delete coords[key];
              coords[`${newPoint.x},${newPoint.y}`] = newPoint;
            }
          });
        }

        console.log(Object.keys(coords).length);
      }
    });

    return coords;
  });
};

const part2 = () => {
  part1().then((coords) => {
    const yMax = Math.max(...Object.values(coords).map((coord) => coord.y));
    const xMax = Math.max(...Object.values(coords).map((coord) => coord.x));

    for (let y = 0; y <= yMax; y++) {
      const row = [];
      for (let x = 0; x <= xMax; x++) {
        if (coords[`${x},${y}`]) {
          row.push('#');
        } else {
          row.push(' ');
        }
      }
      console.log(row.join(''));
    }
  });
};

part2();
