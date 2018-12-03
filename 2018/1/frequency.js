const readline = require('readline');
let frequency = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
    const currentFrequency = frequency;
    frequency += parseInt(line, 10);
    console.log(`Current frequency: ${currentFrequency}, change of ${line}; resulting frequency: ${frequency}.`)
});