const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((nums) => {
    let gamma = '', epsilon = '';
    for(let i = 0; i < nums[0].length; i++) {
      const oneBits = nums.filter((num) => num.charAt(i) === '1');
      if (oneBits.length > nums.length / 2) {
        gamma += '1';
        epsilon += '0';
      } else {
        gamma += '0';
        epsilon += '1';
      }
    }

    const answer = parseInt(gamma, 2) * parseInt(epsilon, 2);
    console.log(answer);
  
  });
};

const part2 = () => {
  inputUtils.getInput().then((nums) => {
    let oxygenRatingNums = nums.slice();
    for (let i = 0; i < oxygenRatingNums[0].length && oxygenRatingNums.length > 1; i++) {
      const oneBits = oxygenRatingNums.filter((num) => num.charAt(i) === '1');
      const mostCommonBit = oneBits.length >= oxygenRatingNums.length / 2 ? '1' : '0';
      oxygenRatingNums = oxygenRatingNums.filter((num) => num.charAt(i) === mostCommonBit);
    }

    let co2ScrubberNums = nums.slice();
    for (let i = 0; i < co2ScrubberNums[0].length && co2ScrubberNums.length > 1; i++) {
      const oneBits = co2ScrubberNums.filter((num) => num.charAt(i) === '1');
      const leastCommonBit = oneBits.length >= co2ScrubberNums.length / 2 ? '0' : '1';
      co2ScrubberNums = co2ScrubberNums.filter((num) => num.charAt(i) === leastCommonBit);
    }
   
    console.log(parseInt(oxygenRatingNums[0], 2) * parseInt(co2ScrubberNums[0], 2));
  
  });
};

part2();
