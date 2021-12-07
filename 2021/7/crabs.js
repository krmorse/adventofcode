const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((input) => {
    let crabs = input[0].split(",").map((f) => parseInt(f, 10));
    const min = Math.min(...crabs);
    const max = Math.max(...crabs);
    const fuelTotals = []

    for (let i = min; i <= max; i++) {
      fuelTotals[i] = crabs.map(crab => Math.abs(crab - i)).reduce((accum, val) => accum + val, 0);
    }

    console.log(Math.min(...fuelTotals));

  });
};

const part2 = () => {
  inputUtils.getInput().then((input) => {
    let crabs = input[0].split(",").map((f) => parseInt(f, 10));
    const min = Math.min(...crabs);
    const max = Math.max(...crabs);
    const fuelTotals = []

    for (let i = min; i <= max; i++) {
      fuelTotals[i] = crabs.map(crab => {
        const diff = Math.abs(crab - i);
        return (diff * (diff+1)) / 2;
      }).reduce((accum, val) => accum + val, 0);
    }

    console.log(Math.min(...fuelTotals));

  });
};

part2();
