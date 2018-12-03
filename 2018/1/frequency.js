const readline = require('readline');
const frequencyDeltas = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  frequencyDeltas.push(parseInt(line, 10));
});

rl.on('close', function () {
  const firstPassFrequency = findFirstPassFrequency();
  console.log('\nFrequency after first pass:', firstPassFrequency);

  const firstDupe = findFirstFrequencyDupe();
  console.log('\nFirst frequency dupe:', firstDupe);
});

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
