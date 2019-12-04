const inputUtils = require('../utils/input');

const plotWire = (wireLabel, wire, coords) => {
    let x = 0;
    let y = 0;
    
    let steps = 0;
    for(let i = 0; i < wire.length; i++) {
        const section = wire[i];
        for(let j = 0; j < section.length; j++) {
            coords[`${x},${y}`] = coords[`${x},${y}`] || { steps: {}, size: 0, distance: Math.abs(x) + Math.abs(y)};
            if (!coords[`${x},${y}`].steps[wireLabel]) {
                coords[`${x},${y}`].steps[wireLabel] = steps;
                coords[`${x},${y}`].size++;
            }
           
            switch(section.direction) {
                case 'R':
                    x++;
                    break;
                case 'L':
                    x--;
                    break;
                case 'U':
                    y++;
                    break;
                case 'D':
                    y--;
                    break;
            }
            steps++;
        }
    }
};

const parseWire = (input) => input.split(',').map(w => ({ direction: w.substring(0, 1), length: parseInt(w.substring(1), 10) }));

inputUtils.getInput().then((wires) => {
    const wire1 = parseWire(wires[0]);
    const wire2 = parseWire(wires[1]);
    const coords = {};
    
    wires.forEach((wire, i) => plotWire(`wire${i+1}`, parseWire(wire), coords));
    delete coords['0,0'];
    
    const result = Object.values(coords)
    .filter(coord => coord.size === wires.length)
    .map(coord => {
        coord.totalSteps = Object.values(coord.steps).reduce((accum, val) => accum + val, 0)
        return coord;
    })
    .sort((a, b) => {
        return a.totalSteps - b.totalSteps;
    });
    
    console.log('total steps:', result[0].totalSteps);
});
