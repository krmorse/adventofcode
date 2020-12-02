const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const result = lines
      .map((line) => {
        const values = line.split("\t").map((val) => parseInt(val, 10));
        return Math.max(...values) - Math.min(...values);
      })
      .reduce((total, val) => total + val, 0);

    console.log("Checksum:", result);
  });
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const result = lines
      .map((line) => {
        const values = line
          .split("\t")
          .map((val) => parseInt(val, 10))
          .sort((a, b) => b - a);

        for (let i = 0; i < values.length; i++) {
          for (let j = i + 1; j < values.length; j++) {
            if (values[i] % values[j] === 0) {
              return values[i] / values[j];
            }
          }
        }
      })
      .reduce((total, val) => total + val, 0);

    console.log("Checksum:", result);
  });
};

part2();
