const inputUtils = require('../utils/input');
let frequencyDeltas;

function findFirstPassFrequency() {
  return frequencyDeltas.reduce(function(accum, value) {
    return value + accum;
  }, 0);
}

function findFirstFrequencyDupe() {
  let dupeFound = false;
  let index = 0;
  let frequency = 0;
  let frequencies = {};

  while (!dupeFound) {
    if (frequencies[frequency]) {
      dupeFound = true;
    } else {
      frequencies[frequency] = true;
      frequency += frequencyDeltas[index % frequencyDeltas.length]
      index++;
    }
  }

  return frequency;
}  

inputUtils.getInput().then(function(input) {
  frequencyDeltas = input.map(function (line) {
    return parseInt(line, 10);
  });
  
  const firstPassFrequency = findFirstPassFrequency();
  console.log('\nFrequency after first pass:', firstPassFrequency);
  
  const firstDupe = findFirstFrequencyDupe();
  console.log('\nFirst frequency dupe:', firstDupe);
});
