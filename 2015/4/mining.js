const inputUtils = require("../utils/input");
const md5 = require("md5");

const part1 = () => {
  inputUtils.getInput().then((inputs) => {
    const key = inputs[0];

    let i = 1,
      answer = 0;
    while (!answer) {
      const hashInput = `${key}${i}`;
      const hash = md5(hashInput);
      if (hash.indexOf("00000") === 0) {
        answer = i;
      }
      i++;
    }

    console.log("Answer:", answer);
  });
};

const part2 = () => {
  inputUtils.getInput().then((inputs) => {
    const key = inputs[0];

    let i = 1,
      answer = 0;
    while (!answer) {
      const hashInput = `${key}${i}`;
      const hash = md5(hashInput);
      if (hash.indexOf("000000") === 0) {
        answer = i;
      }
      i++;
    }

    console.log("Answer:", answer);
  });
};

part2();
