const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((inputs) => {
    const niceStrings = inputs.filter((str) => {
      const vowels = str.match(/[aeiou]/g);
      const has3Vowels = vowels && vowels.length >= 3;
      const hasDoubleChars = !!str.match(/(.)\1{1,}/g);
      const hasAb = str.includes("ab");
      const hasCd = str.includes("cd");
      const hasPq = str.includes("pq");
      const hasXy = str.includes("xy");

      return has3Vowels && hasDoubleChars && !hasAb && !hasCd && !hasPq && !hasXy;
    });

    console.log("Nice strings:", niceStrings.length);
  });
};

const part2 = () => {
  inputUtils.getInput().then((inputs) => {
    const niceStrings = inputs.filter((str) => {
      const hasRepeatingPair = !!str.match(/(.)(.).*\1{1}\2{1}/g);
      const hasSandwich = !!str.match(/(.).\1{1}/g);

      return hasRepeatingPair && hasSandwich;
    });

    console.log("Nice strings:", niceStrings.length);
  });
};

part2();
