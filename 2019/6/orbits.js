const inputUtils = require('../utils/input');

const count = (orbits, planet) => {
    if (planet === 'COM') {
        return 0;
    } else {
        return 1 + count(orbits, orbits[planet]);
    }
};

const countOrbits = (orbits) => {
    return Object.keys(orbits)
        .map(planet => count(orbits, planet))
        .reduce((accum, val) => accum + val, 0);
};

inputUtils.getInput().then((input) => {
    const orbits = {};
    input.forEach(o => {
        const planetTokens = o.split(')'),
            planet1 = planetTokens[0],
            planet2 = planetTokens[1];
        orbits[planet2] = planet1;
    });
    
    console.log('Total orbits:', countOrbits(orbits));
});
