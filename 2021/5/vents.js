const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((input) => {
    const coords = {};

    input.forEach((line) => {
      const [coord1, coord2] = line.split("->").map((a) => a.trim());
      const [x1, y1] = coord1.split(",").map((a) => parseInt(a, 10));
      const [x2, y2] = coord2.split(",").map((a) => parseInt(a, 10));

      if (x1 === x2) {
        //vertical
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          coords[`${x1},${y}`] = (coords[`${x1},${y}`] || 0) + 1;
        }
      } else if (y1 === y2) {
        //horizontal
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          coords[`${x},${y1}`] = (coords[`${x},${y1}`] || 0) + 1;
        }
      } else {
        //diagonal
        const deltaX = x1 < x2 ? 1 : -1;
        const deltaY = y1 < y2 ? 1 : -1;
        let x = x1,
          y = y1;
        for (let i = 0; i <= Math.abs(x1 - x2); i++) {
          coords[`${x + i * deltaX},${y + i * deltaY}`] =
            (coords[`${x + i * deltaX},${y + i * deltaY}`] || 0) + 1;
        }
      }
    });

    console.log(Object.values(coords).filter((val) => val >= 2).length);
  });
};

part1();
