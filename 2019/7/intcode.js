const inputUtils = require('../utils/input');

const readValue = (program, value, mode) => {
    return !!mode ? value : program[value];
};

const writeValue = (program, index, mode, value) => {
    program[index] = value;
};

const createComputer = (program) => {

    let index = 0, done = false, output;

    return (inputs) => {
        let inputsUsed = 0;
        while(!done) {
            const opCode = program[index] % 100;
            const paramModes = program[index].toString().split('').reverse().slice(2).map(p => parseInt(p, 10));
            let value;
            switch(opCode) {
                case 99:
                    done = true;
                    break;
                case 1:
                    value = readValue(program, program[index+1], paramModes[0]) + 
                        readValue(program, program[index+2], paramModes[1]);
                    writeValue(program, program[index+3], paramModes[2], value);
                    index += 4;
                    break;
                case 2:
                    value = readValue(program, program[index+1], paramModes[0]) * 
                        readValue(program, program[index+2], paramModes[1]);
                    writeValue(program, program[index+3], paramModes[2], value);
                    index += 4;
                    break;
                case 3:
                    if (inputsUsed >= inputs.length) {
                        return {output, done};
                    }
                    writeValue(program, program[index+1], 0, inputs[inputsUsed]);
                    index += 2;
                    inputsUsed++;
                    break;
                case 4:
                    output = readValue(program, program[index+1], paramModes[0]);
                    index += 2;
                    break;
                case 5:
                    value = readValue(program, program[index+1], paramModes[0]);
                    if (value) {
                        index = readValue(program, program[index+2], paramModes[1]);
                    } else {
                        index += 3;
                    }
                    break;
                case 6:
                    value = readValue(program, program[index+1], paramModes[0]);
                    if (!value) {
                        index = readValue(program, program[index+2], paramModes[1]);
                    } else {
                        index += 3;
                    }
                    break;
                case 7:
                    value = readValue(program, program[index+1], paramModes[0]);
                    const value2 = readValue(program, program[index+2], paramModes[1]);
                    writeValue(program, program[index+3], paramModes[2], value < value2 ? 1 : 0)
                    index += 4;
                    break;
                case 8:
                    value = readValue(program, program[index+1], paramModes[0]);
                    const val2 = readValue(program, program[index+2], paramModes[1]);
                    writeValue(program, program[index+3], paramModes[2], value === val2 ? 1 : 0)
                    index += 4;
                    break;
            }
        }
        return {output, done};
    };
}

module.exports = {
    createComputer
};
