const inputUtils = require("../utils/input");

const parseInput = (input) => {
  return input.map(i => {
    const [left, right] = i.split(',');
    const [leftStart, leftEnd] = left.split('-').map(x => parseInt(x, 10));
    const [rightStart, rightEnd] = right.split('-').map(x => parseInt(x, 10));
    return [{ start: leftStart, end: leftEnd }, { start: rightStart, end: rightEnd }];
  });
}

const part1 = () => {
  inputUtils.getInput().then((input) => {
    const pairs = parseInput(input);
    console.log(pairs.filter(([left, right]) => {
      return (left.start >= right.start && left.end <= right.end) ||
        (right.start >= left.start && right.end <= left.end)
    }).length);
  });
};

const part2 = () => {
  inputUtils.getInput().then((input) => {
    const pairs = parseInput(input);
    console.log(pairs.filter(([left, right]) => {
      return (left.start <= right.start && left.end >= right.start) ||
        (right.start <= left.start && right.end >= left.start)
    }).length);
  });
};

part2();
