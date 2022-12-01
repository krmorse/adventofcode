const inputUtils = require("../utils/input");

const aggregateElfCalories = (elfSnacks) => {
  return elfSnacks.join('|').split('||').map(elfSnackString => {
    return elfSnackString.split('|').map(c => parseInt(c, 10)).reduce((accum, val) => accum + val, 0);
  });
};
const part1 = () => {
  inputUtils.getInput().then((elfSnacks) => {
    const caloriesPerElf = aggregateElfCalories(elfSnacks);
    console.log(Math.max(...caloriesPerElf));
  });
};

const part2 = () => {
  inputUtils.getInput().then((elfSnacks) => {
    const caloriesPerElf = aggregateElfCalories(elfSnacks);
    caloriesPerElf.sort((a, b) => b - a);
    console.log(caloriesPerElf[0] + caloriesPerElf[1] + caloriesPerElf[2]);
  });
};

part2();
