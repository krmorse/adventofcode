import { getInput } from "../utils/input.js";

const getLists = (input) => {
  const left = [];
  const right = [];

  input.forEach(line => {
    const [l, r] = line.split('   ');
    left.push(parseInt(l, 10));
    right.push(parseInt(r, 10));
  });

  left.sort();
  right.sort();
  return { left, right };
}

const compute = (lists) => {
  return lists.left.reduce((total, current, i) => {
    return total + (Math.abs(lists.left[i] - lists.right[i]));
  }, 0);
}

const compute2 = (lists) => {
  const counts = lists.right.reduce((accum, val) => {
    accum[val] = (accum[val] || 0) + 1;
    return accum;
  }, {});

  return lists.left.reduce((accum, val) => {
    return accum + (val * (counts[val] || 0));
  }, 0);
}

const part1 = async () => {
  const lists = getLists(await getInput());
  console.log(compute(lists));
};

const part2 = async () => {
  const lists = getLists(await getInput());
  console.log(compute2(lists));
};

part2();

