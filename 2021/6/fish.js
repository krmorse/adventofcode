const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((input) => {
    let fish = input[0].split(",").map((f) => parseInt(f, 10));

    for (let day = 0; day < 80; day++) {
      console.log(day);
      let nextGenFish = fish.slice();
      fish.forEach((f, i) => {
        if (f === 0) {
          nextGenFish[i] = 6;
          nextGenFish.push(8);
        } else {
          nextGenFish[i]--;
        }
      });
      fish = nextGenFish;
      console.log(`After ${day + 1}:`, nextGenFish.join(","));
    }

    console.log(fish.length);
  });
};

const part2 = () => {
  inputUtils.getInput().then((input) => {
    const fish = input[0].split(",").map((f) => parseInt(f, 10));

    let fishCounts = fish.reduce((accum, val) => {
      accum[val] = (accum[val] || 0) + 1;
      return accum;
    }, {});

    for (let day = 0; day < 256; day++) {
      const nextGenFishCounts = {};
      for (let age = 8; age >= 0; age--) {
        nextGenFishCounts[age - 1] = fishCounts[age] || 0;
      }
      nextGenFishCounts[8] = nextGenFishCounts[-1];
      nextGenFishCounts[6] = (nextGenFishCounts[6] || 0) + nextGenFishCounts[-1];
      delete nextGenFishCounts[-1];

      console.log(`After ${day + 1}:`, nextGenFishCounts);
      fishCounts = nextGenFishCounts;
    }

    console.log(Object.values(fishCounts).reduce((accum, val) => accum + val, 0));
  });
};

part2();
