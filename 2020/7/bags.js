const inputUtils = require("../utils/input");

const bagGraph = {};

const parseInput = (lines) => {
  lines.forEach((line) => {
    const color = line.match(/^([a-z]+ [a-z]+) bags contain/)[1];
    const subBags = line.match(/(\d+ [a-z]+ [a-z]+)/g);
    const subBagCounts = {};
    if (subBags) {
      subBags.forEach((subBag) => {
        const tokens = subBag.split(" ");
        subBagCounts[tokens[1] + " " + tokens[2]] = parseInt(tokens[0], 10);
      });
    }
    bagGraph[color] = subBagCounts;
  });
};

const canContainShinyGold = (bag) => {
  if (bag['shiny gold']) {
    return true;
  } else {
    return Object.keys(bag).some(color => canContainShinyGold(bagGraph[color]));
  }
}

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    parseInput(lines);
    const yesColors = Object.keys(bagGraph).filter(color => {
      return canContainShinyGold(bagGraph[color]);
    });
    console.log(yesColors.length);
  });
};

const countBags = (bag) => {
  if (Object.keys(bag).length === 0) {
    return 0;
  } else {
    let subBags = 0;
    Object.keys(bag).forEach(color => {
      const subBagCount = countBags(bagGraph[color]);
      subBags += (bag[color] * subBagCount) + bag[color];
    });
    return subBags;
  }
}

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    parseInput(lines);
    const totalBags = countBags(bagGraph['shiny gold']);
    console.log(totalBags);
  });
}

part2();
