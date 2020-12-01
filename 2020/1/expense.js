const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((nums) => {
    const numbers = nums.map((num) => parseInt(num, 10));
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === 2020) {
          console.log("Result:", numbers[i] * numbers[j]);
        }
      }
    }
  });
};

const part2 = () => {
  inputUtils.getInput().then((nums) => {
    const numbers = nums.map((num) => parseInt(num, 10));
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        for (let k = j + 1; k < numbers.length; k++) {
          if (numbers[i] + numbers[j] + numbers[k] === 2020) {
            console.log("Result:", numbers[i] * numbers[j] * numbers[k]);
          }
        }
      }
    }
  });
};

part2();
