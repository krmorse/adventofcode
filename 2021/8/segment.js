const inputUtils = require("../utils/input");

const areSetsEqual = (a, b) => {
  return a.size === b.size &&
      [...a].every(el => b.has(el));
};

const part1 = () => {
  inputUtils.getInput().then((input) => {
    let digitsInOutput = 0;
    input.forEach((line) => {
      const [digitString, outputString] = line.split("|").map((s) => s.trim());
      const digits = digitString.split(" ");

      const one = new Set(digits.find((digit) => digit.length === 2));
      const seven = new Set(digits.find((digit) => digit.length === 3));
      const four = new Set(digits.find((digit) => digit.length === 4));
      const eight = new Set(digits.find((digit) => digit.length === 7));

      const outputs = outputString.split(" ").map((output) => new Set(output));
      digitsInOutput += outputs.filter(
        (o) =>
          areSetsEqual(one, o) ||
          areSetsEqual(seven, o) ||
          areSetsEqual(four, o) ||
          areSetsEqual(eight, o)
      ).length;
    });

    console.log(digitsInOutput);
  });
};

part1();
