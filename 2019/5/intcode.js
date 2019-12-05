const inputUtils = require('../utils/input');

const compute = async (program) => {
    let index = 0, done = false;
    while(!done) {
        switch(program[index]) {
            case 99:
                done = true;
                break;
            case 1:
                program[program[index+3]] = program[program[index+1]] + program[program[index+2]];
                index += 4;
                break;
            case 2:
                program[program[index+3]] = program[program[index+1]] * program[program[index+2]];
                index += 4;
                break;
            case 3:
                const input = inputUtils.prompt('Input: ');
                program[program[index+1]] = parseInt(input, 10);
                index += 2;
            case 4:
                console.log('Output:', program[program[index+1]]);
                index += 2;
        }
    }
    return program[0];
}

inputUtils.getInput().then((input) => {
    const program = input[0].split(',').map(code => parseInt(code, 10));
    compute(program);
});
