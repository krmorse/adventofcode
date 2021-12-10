const inputUtils = require("../utils/input");

const closingChars = [ ')', ']', '}', '>'];
const openingChars = [ '(', '[', '{', '<'];
const charPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const part1 = () => {
  inputUtils.getInput().then((input) => {
  const illegalChars = input.reduce((accum, line)=> {
      let stack = [];
      line.split('').every(char => {
        if (openingChars.includes(char)) {
          stack.push(char);
        } else if (closingChars.includes(char)) {
          const expectedClosingChar = closingChars[openingChars.indexOf(stack[stack.length-1])];
          if (char === expectedClosingChar) {
            stack.pop();
          } else {
            console.log(`${line} - Expected ${expectedClosingChar}, but found ${char} instead.`);
            accum.push(char);
            return false;
          }
        }

        return true;
      });

      return accum;
    }, []);

    const score = illegalChars.reduce((accum, val) => accum + charPoints[val], 0);
    console.log(score);
  });
};

const completionPoints = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

const part2 = () => {
  inputUtils.getInput().then((input) => {
  const completions = input.reduce((accum, line) => {
      let stack = [];
      if(line.split('').every(char => {
        if (openingChars.includes(char)) {
          stack.push(char);
        } else if (closingChars.includes(char)) {
          const expectedClosingChar = closingChars[openingChars.indexOf(stack[stack.length-1])];
          if (char === expectedClosingChar) {
            stack.pop();
          } else {
            return false;
          }
        }

        return true;
      })) {
        if (stack.length > 0) {
          const fixed = stack.map(char => closingChars[openingChars.indexOf(char)]).reverse();
          console.log(`${line} - Complete by adding ${fixed.join('')}`);
          accum.push(fixed);
        }
      }

      return accum;
    }, []);

    const scores = completions.map(val => {
      let score = 0;
      val.forEach(char => {
        score *= 5;
        score += completionPoints[char];
      });
      return score;
    }, 0);

    scores.sort((a, b) => a - b);
    console.log(scores[Math.floor(scores.length/2)]);
  });
};

part2();
