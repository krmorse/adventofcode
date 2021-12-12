const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((input) => {
    const board = input.map((line) =>
      line.split("").map((n) => parseInt(n, 10))
    );

    let flashes = 0;
    for (let gen = 0; gen < 100; gen++) {

      //add 1
      const toFlash = {};
      board.forEach((row, y) => {
        row.forEach((o, x) => {
          board[y][x]++;
          if (board[y][x] > 9) {
            toFlash[`${y},${x}`] = {y, x};
          }
        });
      });

      //flashy stuff
      let flashed = {};
      while (Object.keys(toFlash).length) {
        const key = Object.keys(toFlash)[0];
        const point = toFlash[key];
        delete toFlash[key];

        board[point.y][point.x] = NaN;
        flashed[`${point.y},${point.x}`] = point;

        //neighbors
        for (let y = point.y - 1; y <= point.y + 1; y++) {
          for (let x = point.x - 1; x <= point.x + 1; x++) {
            if ((x !== point.x || y !== point.y) &&
              y >= 0 &&
              y < board.length &&
              x >= 0 &&
              x < board[y].length
            ) {
              board[y][x]++;
              if (board[y][x] > 9 && !toFlash[`${y},${x}`]) {
                toFlash[`${y},${x}`] = {y, x};
              }
            }
          }
        }
      }

      //reset all flashes to 0
      flashes += Object.keys(flashed).length;
      Object.values(flashed).forEach(point => {
        board[point.y][point.x] = 0;
      });
      flashed = {};
    }

    console.log(flashes);
  });
};


const part2 = () => {
  inputUtils.getInput().then((input) => {
    const board = input.map((line) =>
      line.split("").map((n) => parseInt(n, 10))
    );

    let flashes = 0;
    let allFlashed = false;
    for (let gen = 0; gen < 1000 && !allFlashed; gen++) {

      //add 1
      const toFlash = {};
      board.forEach((row, y) => {
        row.forEach((o, x) => {
          board[y][x]++;
          if (board[y][x] > 9) {
            toFlash[`${y},${x}`] = {y, x};
          }
        });
      });

      //flashy stuff
      let flashed = {};
      while (Object.keys(toFlash).length) {
        const key = Object.keys(toFlash)[0];
        const point = toFlash[key];
        delete toFlash[key];

        board[point.y][point.x] = NaN;
        flashed[`${point.y},${point.x}`] = point;

        //neighbors
        for (let y = point.y - 1; y <= point.y + 1; y++) {
          for (let x = point.x - 1; x <= point.x + 1; x++) {
            if ((x !== point.x || y !== point.y) &&
              y >= 0 &&
              y < board.length &&
              x >= 0 &&
              x < board[y].length
            ) {
              board[y][x]++;
              if (board[y][x] > 9 && !toFlash[`${y},${x}`]) {
                toFlash[`${y},${x}`] = {y, x};
              }
            }
          }
        }
      }

      //reset all flashes to 0
      flashes += Object.keys(flashed).length;
      Object.values(flashed).forEach(point => {
        board[point.y][point.x] = 0;
      });

      if (Object.keys(flashed).length === board[0].length * board.length) {
        allFlashed = true;
        console.log(gen + 1);
      } 
      flashed = {};
    }

  });
};

part2();
