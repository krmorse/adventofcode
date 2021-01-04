const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  return lines.map((line) => {
    const tokens = line.split(" (contains ");
    return {
      ingredients: tokens[0].split(" "),
      allergens: tokens[1].replace(")", "").split(", "),
    };
  });
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const food = parseInput(lines);
  });
};

part1();
