const inputUtils = require("../utils/input");

/*
[V]     [B]                     [C]
[C]     [N] [G]         [W]     [P]
[W]     [C] [Q] [S]     [C]     [M]
[L]     [W] [B] [Z]     [F] [S] [V]
[R]     [G] [H] [F] [P] [V] [M] [T]
[M] [L] [R] [D] [L] [N] [P] [D] [W]
[F] [Q] [S] [C] [G] [G] [Z] [P] [N]
[Q] [D] [P] [L] [V] [D] [D] [C] [Z]
 1   2   3   4   5   6   7   8   9
 */
const STACKS = [
  ['Q', 'F', 'M', 'R', 'L', 'W', 'C', 'V'],
  ['D', 'Q', 'L'],
  ['P', 'S', 'R', 'G', 'W', 'C', 'N', 'B'],
  ['L', 'C', 'D', 'H', 'B', 'Q', 'G'],
  ['V', 'G', 'L', 'F', 'Z', 'S'],
  ['D', 'G', 'N', 'P'],
  ['D', 'Z', 'P', 'V', 'F', 'C', 'W'],
  ['C', 'P', 'D', 'M', 'S'],
  ['Z', 'N', 'W', 'T', 'V', 'M', 'P', 'C']
];

const part1 = () => {
  inputUtils.getInput().then((input) => {
    input.forEach(step => {
      const [, moveNum, , fromStack, , toStack] = step.split(' ');
      for (let i = 1; i <= parseInt(moveNum, 10); i++) {
        STACKS[parseInt(toStack, 10) - 1].push(STACKS[parseInt(fromStack, 10) - 1].pop());
      }
    });
    console.log(STACKS.map(stack => stack[stack.length - 1]).join(''));
  });
};

const part2 = () => {
  inputUtils.getInput().then((input) => {
    input.forEach(step => {
      const [, moveNum, , fromStackCount, , toStackCount] = step.split(' ');
      const fromStack = STACKS[parseInt(fromStackCount, 10) - 1];
      const toStack = STACKS[parseInt(toStackCount, 10) - 1];
      STACKS[parseInt(toStackCount, 10) - 1] = toStack.concat(fromStack.splice(fromStack.length - parseInt(moveNum, 10), parseInt(moveNum, 10)));
    });
    console.log(STACKS.map(stack => stack[stack.length - 1]).join(''));
  });
};

part2();
