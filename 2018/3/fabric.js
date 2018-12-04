const inputUtils = require('../utils/input');
const fabric = [];
const inputRegex = /^\#(\d+) \@ (\d+)\,(\d+)\: (\d+)x(\d+)/;

function parseInputLine(spec) {
    const matches = spec.match(inputRegex);
    return matches.map(function(match) {
        return parseInt(match, 10);
    });
}

function markFabric(input) {
    let count = 0;
    input.forEach(function(spec) {
        const [ , elfNumber, x0, y0, xDelta, yDelta ] = parseInputLine(spec);

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

function findIntact(input) {
    const counts = {};
    fabric.forEach(function(chunk) {
        chunk.forEach(function(piece) {
            counts[piece] = (counts[piece] || 0) + 1;
        });
    });

    let intact;
    input.some(function(spec) {
        const [ , elfNumber, x0, y0, xDelta, yDelta ] = parseInputLine(spec);
        if (counts[elfNumber] === xDelta * yDelta) {
            intact = elfNumber;
            return true;
        }
    });
    return intact;
}

inputUtils.getInput().then(function(input) {
    const count = markFabric(input);
    console.log('Part 1 Answer:', count);

    const intact = findIntact(input);
    console.log('Part 2 Answer:', intact);
});