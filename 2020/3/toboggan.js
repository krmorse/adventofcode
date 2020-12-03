const inputUtils = require("../utils/input");

const countTrees = (lines, deltaX, deltaY) => {
  let trees = 0;
  for (let y = 0, x = 0; y < lines.length; y += deltaY, x += deltaX) {
    const row = lines[y];
    if (row[x % row.length] === "#") {
      trees++;
    }
  }
  return trees;
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const trees = countTrees(lines, 3, 1);
    console.log("Trees:", trees);
  });
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const slopes = [
      { deltaX: 1, deltaY: 1 },
      { deltaX: 3, deltaY: 1 },
      { deltaX: 5, deltaY: 1 },
      { deltaX: 7, deltaY: 1 },
      { deltaX: 1, deltaY: 2 },
    ];
    const trees = slopes.map(slope => countTrees(lines, slope.deltaX, slope.deltaY));
    const totalTrees = trees.reduce((total, num) => total * num);
    console.log("Trees:", totalTrees);
  });
};

part2();
