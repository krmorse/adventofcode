const inputUtils = require('../utils/input');

const sum = (accum, value) => accum + value;

const calculateFuel = (mass) => Math.floor(parseInt(mass, 10) / 3) - 2;

const calculateAllFuel = (mass) => {
    const initialFuel = calculateFuel(mass),
        fuels = [];
    
    let currentFuel = initialFuel;    
    while (currentFuel > 0) {
        fuels.push(currentFuel);
        currentFuel = calculateFuel(currentFuel);
    }

    return fuels.reduce(sum, 0);
};

inputUtils.getInput().then((moduleMasses) => {
    const totalFuel = moduleMasses
        .map(calculateAllFuel)
        .reduce(sum, 0);

    console.log('Total fuel:', totalFuel);
});
