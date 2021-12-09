const inputUtils = require("../utils/input");

const getLowPoints = (map) => {
  const lowPoints = [];

  map.forEach((row, y) => {
    row.forEach((val, x) => {
      const lowerThanN = y === 0 || val < map[y-1][x];
      const lowerThanE = x === row.length-1 || val < map[y][x+1];
      const lowerThanS = y === map.length-1 || val < map[y+1][x];
      const lowerThanW = x === 0 || val < map[y][x-1];

      if (lowerThanN && lowerThanE && lowerThanS && lowerThanW) {
        lowPoints.push({ x, y, val });
      }
    })
  });

  return lowPoints;
}

const part1 = () => {
  inputUtils.getInput().then((input) => {

    const map = input.map(line => line.split('').map(d => parseInt(d, 10)));
    const lowPoints = getLowPoints(map);
    console.log(lowPoints.map(l => l.val+1).reduce((accum, val) => accum + val, 0));
  });
};

const part2 = () => {
  inputUtils.getInput().then((input) => {

    const map = input.map(line => line.split('').map(d => parseInt(d, 10)));
    const lowPoints = getLowPoints(map);
    const basins = lowPoints.map(lowPoint => {
      const basin = {};
      const toProcess = {[`${lowPoint.y},${lowPoint.x}`]: lowPoint };
      const processed = {};
      while(Object.keys(toProcess).length) {
        const currentKey = Object.keys(toProcess)[0];
        const currentPoint = toProcess[currentKey];
        delete toProcess[currentKey];
        basin[currentKey] = currentPoint;
        
        const neighborN = { y: currentPoint.y-1, x: currentPoint.x };
        const neighborE = { y: currentPoint.y, x: currentPoint.x+1 };
        const neighborS = { y: currentPoint.y+1, x: currentPoint.x };
        const neighborW = { y: currentPoint.y, x: currentPoint.x-1 };
        const neighbors = [ neighborN, neighborE, neighborS, neighborW];

        neighbors.forEach(neighbor => {
          const val = map[neighbor.y] && map[neighbor.y][neighbor.x];
          const neighborKey = `${neighbor.y},${neighbor.x}`;
          if (isNaN(val) || val === 9) {
            processed[neighborKey] = neighbor;
          } else if (!basin[neighborKey] && !processed[neighborKey]) { 
            toProcess[neighborKey] = neighbor;
          }
        });
      }

      return basin;
    });

    basins.sort((a, b) => { 
      return Object.keys(b).length - Object.keys(a).length;
    });
    console.log(Object.keys(basins[0]).length * Object.keys(basins[1]).length * Object.keys(basins[2]).length);
  });
};

part2();
