const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  const state = {};

  lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (char === '#') {
        state[`z=0,y=${y},x=${x}`] = true;
      }
    });
  });
  
  return {
    zMin: 0, 
    yMin: 0,
    xMin: 0,
    zMax: 0, 
    yMax: lines.length-1,
    xMax: lines[0].length-1,
    state
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    let state = parseInput(lines);

    for(let i = 1; i <= 6; i++) {
      let nextState = {

      };
      // for (let z = -();zMin - i, z < lines.length + i)
    }
  });
};

part1();
