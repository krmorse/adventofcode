const inputUtils = require("../utils/input");

const part1 = () => {
  // const input = [0,3,6];
  const input = [12, 1, 16, 3, 11, 0];
  for (let i = input.length; i < 2021; i++) {
    const lastNum = input[i - 1];
    const lastSpokenIndex = input
      .slice(0, input.length - 1)
      .lastIndexOf(lastNum);
    if (lastSpokenIndex >= 0) {
      input[i] = i - 1 - lastSpokenIndex;
    } else {
      input[i] = 0;
    }
  }

  console.log(input[2019]);
};

const playGame = (input, numTurns) => {
  const numbers = {};
  input.forEach((num, i) => {
    numbers[num] = [i + 1];
  });

  let lastNum = input[input.length - 1];
  let curNum;
  for (let i = input.length + 1; i <= numTurns; i++) {
    const lastSpokenIndexes = numbers[lastNum];
    if (lastSpokenIndexes.length === 1) {
      curNum = 0;
    } else {
      curNum =
        lastSpokenIndexes[lastSpokenIndexes.length - 1] -
        lastSpokenIndexes[lastSpokenIndexes.length - 2];
    }
    numbers[curNum] = numbers[curNum] || [];
    numbers[curNum].push(i);
    lastNum = curNum;
  }

  return lastNum;
};

const part2 = () => {
  const input = [12, 1, 16, 3, 11, 0];
  const answer = playGame(input, 30000000);
  console.log(answer);
};

part2();
