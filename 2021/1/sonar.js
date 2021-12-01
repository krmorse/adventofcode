const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((depths) => {
    console.log(depths.map(d => parseInt(d, 10))
      .filter((d, i) => i > 0 && d > depths[i-1]).length);
  });
};

const part2 = () => {
  inputUtils.getInput().then((depths) => {
      let increases = 0, lastTotal = Infinity;
      depths.map(d => parseInt(d, 10))
      .forEach((d, i, ds) => {
        const currentTotal = ds[i] + ds[i+1] + ds[i+2];
        if (currentTotal > lastTotal) {
          increases++;
        }
        lastTotal = currentTotal;
      });
      console.log(increases);
  });
};

part2();
