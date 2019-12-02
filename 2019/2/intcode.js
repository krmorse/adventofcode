const inputUtils = require('../utils/input');

let program;

inputUtils.getInput().then((input) => {
    program = input[0].split(',').map(code => parseInt(code, 10));
   
    let index = 0, done = false;
    while(!done) {
        switch(program[index]) {
            case 99:
                done = true;
                break;
            case 1:
                program[program[index+3]] = program[program[index+1]] + program[program[index+2]];
                break;
            case 2:
                program[program[index+3]] = program[program[index+1]] * program[program[index+2]];
                break;
        }
        index += 4;
    }
    console.log('Result:', program[0]);
    console.log('Final state:', program);
});
