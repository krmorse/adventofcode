const inputUtils = require('../utils/input');

function manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function calculateDistances(input) {
    const grid = [];
    let maxX = 0, maxY = 0;
    const coords = input.reduce((accum, point, i) => {
        const coords = point.split(',');
        const x = parseInt(coords[0], 10);
        const y = parseInt(coords[1], 10);

        if (x > maxX) {
            maxX = x;
        }
        if (y > maxY) {
            maxY = y;
        }

        accum[i] = { x, y };
        return accum;
    }, {});
    
    for (let x = 0; x <= maxX; x++) {
        grid[x] = grid[x] || [];
        for (let y = 0; y <= maxY; y++) {
            const distances = Object.keys(coords).map((coord) => {
                const coord1 = {x, y};
                const coord2 = coords[coord];
                const dist = manhattanDistance(coord1, coord2);
                return { coord, dist };
            }).sort((a, b) => a.dist - b.dist);
            
            const min = distances[0];
            if (min.dist !== distances[1].dist) {
                grid[x][y] = min.coord; //parseInt?
            }
        }
    }
    return grid;
}

function findMax(grid) {
    const infiniteCoords = {};
    const counts = grid.reduce((accum, vals, x) => {
        vals.forEach((val, y) => {
            if (x === 0 || x === grid.length - 1 ||
                y === 0 || y == val.length - 1) {
                    infiniteCoords[val] = true;
                }
            if (val) {
                accum[val] = (accum[val] || 0) + 1;
            }
        });
        return accum;
    }, {});

    Object.keys(infiniteCoords).forEach((infiniteCoord) => {
        delete counts[infiniteCoord];
    });

    const max = Math.max(...Object.values(counts));
    return max;
}

inputUtils.getInput().then((input) => {
    const grid = calculateDistances(input);
    const max = findMax(grid);
    console.log('Part 1 Answer:', max);
});