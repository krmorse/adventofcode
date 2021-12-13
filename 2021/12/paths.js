const inputUtils = require("../utils/input");

let graph = {};
let paths = {};

const findPaths = (path) => {
  const currentNode = path[path.length - 1];
  if (currentNode === "end") {
    if (!paths[path.join(",")]) {
      paths[path.join(",")] = true;
    }
  } else {
    const nextNodes = graph[currentNode];
    nextNodes.forEach((nextNode) => {
      if (
        /[A-Z]/.test(nextNode) ||
        nextNode === "end" ||
        !path.includes(nextNode)
      ) {
        findPaths(path.concat(nextNode));
      }
    });
  }
};

const part1 = () => {
  inputUtils.getInput().then((input) => {
    input.forEach((line) => {
      const [from, to] = line.split("-");
      graph[from] = graph[from] || [];
      graph[from].push(to);
      graph[to] = graph[to] || [];
      graph[to].push(from);
    });

    findPaths(["start"]);
    console.log(Object.keys(paths).length);
  });
};

const findPaths2 = (path) => {
  const currentNode = path[path.length - 1];
  if (currentNode === "end") {
    if (!paths[path.join(",")]) {
      paths[path.join(",")] = true;
    }
  } else {
    const nextNodes = graph[currentNode];
    nextNodes.forEach((nextNode) => {
      const smallCaves = path.filter((p) => p !== "start" && /[a-z]/.test(p));
      const smallCaveCounts = smallCaves.reduce((accum, val) => {
        accum[val] = (accum[val] || 0) + 1;
        return accum;
      }, {});
      const smallCaveCountValues = Object.values(smallCaveCounts);
      smallCaveCountValues.sort((a, b) => b - a);

      if (
        nextNode !== 'start' && ( 
        /[A-Z]/.test(nextNode) ||
        nextNode === "end" ||
        !path.includes(nextNode) ||
        (!smallCaveCountValues.length || smallCaveCountValues[0] < 2))
      ) {
        findPaths2(path.concat(nextNode));
      }
    });
  }
};

const part2 = () => {
  inputUtils.getInput().then((input) => {
    input.forEach((line) => {
      const [from, to] = line.split("-");
      graph[from] = graph[from] || [];
      graph[from].push(to);
      graph[to] = graph[to] || [];
      graph[to].push(from);
    });

    findPaths2(["start"]);
    console.log(Object.keys(paths).length);
  });
};

part2();
