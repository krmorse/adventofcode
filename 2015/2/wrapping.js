const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((dimensions) => {
    const presents = dimensions.map(dim => {
      const lwh = dim.split('x');
      return [parseInt(lwh[0], 10), parseInt(lwh[1], 10), parseInt(lwh[2], 10)].sort((a, b) => a - b);
    });

    const total = presents.map(present => {
      return (2 * present[0] * present[1]) + (2 * present[1] * present[2]) + (2 * present[0] * present[2]) + (present[0] * present[1]);
    })
    .reduce((accum, val) => accum + val, 0);

    console.log('Total:', total);
  });
};


const part2 = () => {
  inputUtils.getInput().then((dimensions) => {
    const presents = dimensions.map(dim => {
      const lwh = dim.split('x');
      return [parseInt(lwh[0], 10), parseInt(lwh[1], 10), parseInt(lwh[2], 10)].sort((a, b) => a - b);
    });

    const total = presents.map(present => {
      return present[0] + present[0] + present[1] + present[1] + (present[0] * present[1] * present[2]);
    })
    .reduce((accum, val) => accum + val, 0);

    console.log('Total:', total);
  });
};

part2();
