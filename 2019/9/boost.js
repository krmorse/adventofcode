const inputUtils = require('../utils/input');
const intCode = require('./intcode');

inputUtils.getInput().then((input) => {
    const program = input[0].split(',').map(code => parseInt(code, 10));
    intCode.compute(program);
});