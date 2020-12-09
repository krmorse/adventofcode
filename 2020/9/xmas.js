const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  return lines.map((line) => parseInt(line, 10));
};

const hasPair = (addends, result) => {
  return addends.some((num) => {
    const pair = result - num;
    return pair !== num && addends.includes(pair);
  });
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const input = parseInput(lines);
    const preambleLength = 25;
    for (let i = preambleLength; i < input.length; i++) {
      const numbersToCheck = input.slice(i - preambleLength, i);
      const number = input[i];
      for (let j = 0; j < numbersToCheck.length; j++) {
        if (!hasPair(numbersToCheck, number)) {
          console.log(number);
          break;
        }
      }
    }
  });
};

const sumsTo = (numbers, total) => {
  let sum = 0;
  for(let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    if (sum > total) {
      return null;
    } else if(sum === total) {
      return numbers.slice(0, i+1);
    }
  }
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const input = parseInput(lines);
    const invalidNumber = 31161678;
    for (let i = 0; i < input.length; i++) {
      const sumToSet = sumsTo(input.slice(i), invalidNumber);
      if (sumToSet) {
        sumToSet.sort();
        console.log(sumToSet[0] + sumToSet[sumToSet.length-1]);
        break;
      }
    }
  });
};

part2();
