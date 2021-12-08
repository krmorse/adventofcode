const inputUtils = require("../utils/input");

const areSetsEqual = (a, b) => {
  return a.size === b.size &&
      [...a].every(el => b.has(el));
};

const intersection = (a, b) => {
  return new Set([...a].filter(el => b.has(el)));
}

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

const part2 = () => {
  inputUtils.getInput().then((input) => {
    const results = input.map((line) => {
      const [digitString, outputString] = line.split("|").map((s) => s.trim());
      const digits = digitString.split(" ");

      const one = new Set(digits.find((digit) => digit.length === 2));
      const seven = new Set(digits.find((digit) => digit.length === 3));
      const four = new Set(digits.find((digit) => digit.length === 4));
      const eight = new Set(digits.find((digit) => digit.length === 7));

      //9,6,0 all have length 6
      const nineSixZero = digits.filter((digit) => digit.length === 6).map(d => new Set(d));
      const six = nineSixZero.find(nsz => intersection(nsz, seven).size === 2);
      const nine = nineSixZero.find(nsz => intersection(nsz, four).size === 4);
      const zero = nineSixZero.find(nsz => !areSetsEqual(six, nsz) && !areSetsEqual(nine, nsz));

      //5,2,3 all have length 5
      const fiveTwoThree = digits.filter((digit) => digit.length === 5).map(d => new Set(d));
      const three = fiveTwoThree.find(ftt => intersection(ftt, one).size == 2);
      const five = fiveTwoThree.find(ftt => intersection(ftt, six).size === 5);
      const two = fiveTwoThree.find(ftt => !areSetsEqual(five, ftt) && !areSetsEqual(three, ftt));

      const numbers = [zero, one, two, three, four, five, six, seven, eight, nine];

      const outputs = outputString.split(" ").map((output) => new Set(output));
      const retVal = outputs.map(o => numbers.findIndex(s => areSetsEqual(o, s)));
      return parseInt(retVal.join(''), 10);
    });

    console.log(results.reduce((accum, val) => accum + val, 0));
  });
};

part2();
