const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((parens) => {
    const total = parens[0].split('').map(paren => paren === '(' ? 1 : -1)
      .reduce((accum, val) => accum + val, 0);

    console.log('End floor:', total);
  });
};

const part2 = () => {
  inputUtils.getInput().then((parens) => {
    const increments = parens[0].split('').map(paren => paren === '(' ? 1 : -1);

    let floor = 0;
    const firstBasement = increments.findIndex((val) => {
      floor += val;
      return floor < 0;
    });

    console.log('First basement index:', (firstBasement+1));
  });
};

part2();
