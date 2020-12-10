const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  return lines.map((line) => parseInt(line, 10)).sort((a, b) => a - b);
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const input = parseInput(lines);
    const joltDeltas = { 1: 0, 2: 0, 3: 1 };
    let joltage = 0;
    for (let i = 0; i < input.length; i++) {
      const adapterJoltage = input[i];
      const joltageDelta = adapterJoltage - joltage;
      joltDeltas[joltageDelta]++;
      joltage = adapterJoltage;
    }
    console.log(joltDeltas[1] * joltDeltas[3]);
  });
};

let total = 0;
const count = (tree, joltage, path, terminator) => {
  const currentPath = `${path} --> ${joltage}`;
  if (joltage === terminator) {
    // console.log(currentPath);
    total++;
  } else {
    const children = tree[joltage];
    for (let i = 0; i < children.length; i++) {
      count(tree, children[i], currentPath, terminator);
    }
  }
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const input = parseInput(lines);
    input.push(input[input.length - 1] + 3);
    const adapterTree = { 0: [] };
    for (let i = 0; i < input.length; i++) {
      adapterTree[input[i]] = [];
      for (let delta = 1; delta <= 3; delta++) {
        const adapterNode = input[i] - delta;
        if (adapterTree[adapterNode]) {
          adapterTree[adapterNode].push(input[i]);
        }
      }
    }
    count(adapterTree, 0, "", input[input.length - 1]);
    console.log(total);
  });
};

//129586085429248
const cheating = () => {
  inputUtils.getInput().then((lines) => {
    const jolts = parseInput(lines);
    jolts.unshift(0);
    jolts.push(jolts[jolts.length - 1] + 3);
    const numRoutes = Object.fromEntries(jolts.map((j) => [j, 0]));
    const reversedJolts = [...jolts].reverse();

    numRoutes[reversedJolts[0]] = 1;

    reversedJolts.forEach((jolt) => {
      const possibleJumps = jolts.filter(
        (jump) => jump > jolt && jump - jolt <= 3
      );

      numRoutes[jolt] += possibleJumps.reduce(
        (totalRoutes, jump) => totalRoutes + numRoutes[jump],
        0
      );
    });

    console.log(numRoutes[0]);
  });
};

cheating();
