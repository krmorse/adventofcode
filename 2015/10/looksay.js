const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((input) => {
    let str = input[0].trim();

    for (let count = 0; count < 50; count++) {
      let newStr = "";

      while (str.length) {
        const nums = str.match(/^(\d)\1+/);
        const match = (nums && nums[0]) || str.substring(0, 1);

        newStr += match.length;
        newStr += match[0];
        str = str.substring(match.length);
      }
      str = newStr;
    }

    console.log(str.length);
  });
};

part1();
