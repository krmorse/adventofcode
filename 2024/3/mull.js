import { getInput } from "../utils/input.js";

const compute = (input) => {
  return input.match(/mul\(\d{1,3}\,\d{1,3}\)/g).map((match) => {
    const [,a,b] = /mul\((\d+)\,(\d+)\)/.exec(match);
    return parseInt(a, 10) * parseInt(b, 10);
  }).reduce((accum, val) => accum + val, 0);
}

const compute2 = (input) => {
  let start = input.indexOf("don't()");
  while(start >= 0) {
    const end = input.indexOf("do()", start);
    if (end >= 0) {
      const replace = input.substring(start, end);
      input = input.replace(replace, '');
    }
    start = input.indexOf("don't()");
  }

  return compute(input);
}

const part1 = async () => {
  console.log(compute((await getInput()).join('')));
};

const part2 = async () => {
  console.log(compute2((await getInput()).join('')));
};

part2();

