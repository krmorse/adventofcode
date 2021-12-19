const inputUtils = require("../utils/input");

let graph;
let minRisk = Infinity;
let minPath;

const findPath = (path, currentPos) => {
  if (currentPos.y === graph.length-1 && currentPos.x === graph[graph.length-1].length-1) {
    const risk = Object.values(path).reduce((accum, {x, y}) => accum + graph[y][x], 0);
    if (risk < minRisk) {
      minPath = path;
      minRisk = risk;
    }
  } else {
    // const nextPosN = { y: currentPos.y-1, x: currentPos.x };
    const nextPosE = { y: currentPos.y, x: currentPos.x+1};
    const nextPosS = { y: currentPos.y+1, x: currentPos.x};
    // const nextPosW = { y: currentPos.y, x: currentPos.x-1};

    const validNextPositions = [ nextPosE, nextPosS].filter(({ x, y }) => {
      return x >= 0 && y >= 0 && x < graph[0].length && y < graph.length 
        && !path[`${y},${x}`] && !(x == 0 && y == 0);
    });

    validNextPositions.forEach(nextPos => {
      findPath({...path, [`${nextPos.y},${nextPos.x}`]: nextPos}, nextPos);
    });
  }
}

const part1 = () => {
  inputUtils.getInput().then((input) => {
    graph = input.map(line => line.split('').map(n => parseInt(n, 10)));

    const start = { y: 0, x: 0 };
    findPath({}, start);

    console.log(minPath);
    console.log(minRisk);
  });
};

part1();
