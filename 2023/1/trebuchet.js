import { getInput } from "../utils/input.js";

const compute = (input) => {
  const onlyNumbers = input.map((line) => line.split('').filter(val => !isNaN(+val)));
  return onlyNumbers.map((arr) => parseInt("" + arr[0] + arr[arr.length-1], 10)).reduce((accum, val) => accum + val, 0);
}

const part1 = async () => {
  const input = await getInput();
  console.log(compute(input));
};

const part2 = async () => {
  const input = await getInput();
  console.log(compute(input.map(line => {
    const first = line
    .match(/(one|two|three|four|five|six|seven|eight|nine|\d)/g)
    .join('')
    .replace(/one/, "1")
    .replace(/two/, "2")
    .replace(/three/, "3")
    .replace(/four/, "4")
    .replace(/five/, "5")
    .replace(/six/, "6")
    .replace(/seven/, "7")
    .replace(/eight/, "8")
    .replace(/nine/, "9");

    const last = line.split('').reverse().join('')
    .match(/(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d)/g)
    .join('')
    .replace(/eno/, "1")
    .replace(/owt/, "2")
    .replace(/eerht/, "3")
    .replace(/ruof/, "4")
    .replace(/evif/, "5")
    .replace(/xis/, "6")
    .replace(/neves/, "7")
    .replace(/thgie/, "8")
    .replace(/enin/, "9");

    return first + last.split('').reverse('').join();
  })));
};

part2();

// answer < 54517
