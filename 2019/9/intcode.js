
const inputUtils = require('../utils/input');

let relativeBase = 0;

const get = (program, index) => program[index||0] || 0;

const readValue = (program, index, mode) => {
    if (mode === 1) {
        return index;
    } else if (mode === 2) {
        return get(program, relativeBase + index);
    } else {
        return get(program, index);
    }
};

const writeValue = (program, index, mode, value) => {
    if (mode === 2) {
        program[relativeBase + index] = value;
    } else {
        program[index] = value;
    }
};

const compute = (program) => {
    let index = 0, done = false;
    relativeBase = 0;
    while(!done) {
        const opCode = get(program, index) % 100;
        const paramModes = get(program, index).toString().split('').reverse().slice(2).map(p => parseInt(p, 10));
        let value;
        switch(opCode) {
            case 99:
                done = true;
                break;
            case 1:
                value = readValue(program, get(program, index+1), paramModes[0]) + 
                    readValue(program, get(program, index+2), paramModes[1]);
                writeValue(program, get(program, index+3), paramModes[2], value);
                index += 4;
                break;
            case 2:
                value = readValue(program, get(program, index+1), paramModes[0]) * 
                    readValue(program, get(program, index+2), paramModes[1]);
                writeValue(program, get(program, index+3), paramModes[2], value);
                index += 4;
                break;
            case 3:
                const input = inputUtils.prompt('Input: ');
                writeValue(program, get(program, index+1), paramModes[0], parseInt(input, 10));
                index += 2;
                break;
            case 4:
                console.log('Output:', readValue(program, get(program, index+1), paramModes[0]));
                index += 2;
                break;
            case 5:
                value = readValue(program, get(program, index+1), paramModes[0]);
                if (value) {
                    index = readValue(program, get(program, index+2), paramModes[1]);
                } else {
                    index += 3;
                }
                break;
            case 6:
                value = readValue(program, get(program,index+1), paramModes[0]);
                if (!value) {
                    index = readValue(program, get(program, index+2), paramModes[1]);
                } else {
                    index += 3;
                }
                break;
            case 7:
                value = readValue(program, get(program, index+1), paramModes[0]);
                const value2 = readValue(program, get(program, index+2), paramModes[1]);
                writeValue(program, get(program, index+3), paramModes[2], value < value2 ? 1 : 0)
                index += 4;
                break;
            case 8:
                value = readValue(program, get(program, index+1), paramModes[0]);
                const val2 = readValue(program, get(program, index+2), paramModes[1]);
                writeValue(program, get(program, index+3), paramModes[2], value === val2 ? 1 : 0)
                index += 4;
                break;
            case 9:
                relativeBase += get(program, index+1);
                index += 2;
                break;
        }
    }
    return program[0];
}

module.exports = {
    compute
};