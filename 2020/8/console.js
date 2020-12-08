const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  return lines.map((line, i) => {
    const tokens = line.split(" ");
    return {
      operation: tokens[0],
      argument: parseInt(tokens[1], 10),
      index: i,
    };
  });
};

const runProgram = (program) => {
  const instructions = {};
  let accum = 0,
    pointer = 0;
  let done = false;
  while (!done) {
    if (instructions[pointer]) {
      throw new Error(`Infinite loop detected. Accum=${accum}`);
    } else {
      instructions[pointer] = true;
      if (pointer === program.length - 1) {
        done = true;
      }
      switch (program[pointer].operation) {
        case "acc":
          accum += program[pointer].argument;
          pointer++;
          break;
        case "jmp":
          pointer += program[pointer].argument;
          break;
        case "nop":
          pointer++;
          break;
      }
    }
  }

  return accum;
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const program = parseInput(lines);
    try {
      runProgram(program);
    } catch (e) {
      console.log(e);
    }
  });
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const program = parseInput(lines);
    for (let i = 0; i < program.length; i++) {
      try {
        const modifiedProgram = parseInput(lines);
        if (program[i].operation === "jmp") {
          modifiedProgram[i].operation = "nop";
        } else if (program[i].operation === "nop") {
          modifiedProgram[i].operation = "jmp";
        }

        let accum = runProgram(modifiedProgram);
        console.log("accum", accum);
      } catch (e) {
      }
    }
  });
};

part2();
