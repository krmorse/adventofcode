const inputUtils = require('../utils/input');

const compute = (program) => {
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
    return program[0];
}

inputUtils.getInput().then((input) => {
    const initialState = input[0].split(',').map(code => parseInt(code, 10));

    let answer = -1;
    for (let noun = 0; noun < 100 && answer === -1; noun++ ) {
        for(let verb = 0; verb < 100 && answer === -1; verb++) {
            const program = initialState.slice(0);
            program[1] = noun;
            program[2] = verb;
            
            console.log(`Running program [noun=${noun},verb=${verb}]...`)
            const result = compute(program);

            if (result === 19690720) {
                answer = 100 * noun + verb;
                console.log('Result: ', answer);
            }
        }
    }
});
