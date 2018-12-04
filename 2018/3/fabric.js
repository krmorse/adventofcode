const inputUtils = require('../utils/input');
const fabric = [];
const inputRegex = /^\#(\d+) \@ (\d+)\,(\d+)\: (\d+)x(\d+)/;

function markFabric(input) {
    let count = 0;
    input.forEach(function(spec) {
        const matches = spec.match(inputRegex);
        const [ , elfNumber, x0, y0, xDelta, yDelta ] = matches.map(function(match) {
            return parseInt(match, 10);
        });

        fabric[y0] = fabric[y0] || [];
        for (let y = y0; y < (y0 + yDelta); y++) {
            fabric[y] = fabric[y] || [];
            for (let x = x0; x < (x0 + xDelta); x++) {
                if (fabric[y][x]) {
                    if (fabric[y][x] !== 'X') {
                        count++;
                    }
                    fabric[y][x] = 'X';
                } else {
                    fabric[y][x] = elfNumber;
                }
            }
        }
    });

    return count;
}

inputUtils.getInput().then(function(input) {
    const count = markFabric(input);
    
    console.log('Answer:', count);
});