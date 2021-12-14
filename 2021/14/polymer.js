const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((input) => {
    let polymer = input.shift();
    input.shift();
    const rules = {};
    input.forEach((line) => {
      const [pattern, sub] = line.split(" -> ");
      rules[pattern] = sub;
    });

    for (let round = 0; round < 10; round++) {
      let newPolymer = "";
      for (let i = 0; i < polymer.length - 1; i++) {
        const substr = polymer.substr(i, 2);
        if (rules[substr]) {
          newPolymer += `${substr[0]}${rules[substr]}`;
        } else {
          throw new Error("blargity");
        }
      }
      polymer = newPolymer + polymer[polymer.length - 1];

      const counts = polymer.split("").reduce((accum, val) => {
        accum[val] = (accum[val] || 0) + 1;
        return accum;
      }, {});
      console.log(counts);

      const values = Object.values(counts).sort((a, b) => b - a);
      // console.log(values[0] - values[values.length - 1]);
    }
  });
};

part1();
