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

const shortestPath = (orbitGraph, pathSoFar, currentNode, to) => {
    if (currentNode.name === to) {
        return [to];
    }

    const validPaths = {};
    for(let i = 0; i < currentNode.adjacent.length; i++) {
        const node = orbitGraph[currentNode.adjacent[i]];
        if (!pathSoFar.includes(node.name)) {
            const path = shortestPath(orbitGraph, pathSoFar.concat([node.name]), node, to);
            if (path) {
                validPaths[node.name] = path;
            }
        }
    }

    const shortest = Object.values(validPaths).sort((a, b) => a.length - b.length)[0];
    return shortest && [currentNode.name].concat(shortest);
};

const computeShortestPath = (orbitGraph, from, to) => {
    const startPath = [from];
    return shortestPath(orbitGraph, startPath, orbitGraph[from], to);
};

inputUtils.getInput().then((input) => {
    const orbits = {};
    const orbitGraph = {};
    input.forEach(o => {
        const planetTokens = o.split(')'),
            planet1 = planetTokens[0],
            planet2 = planetTokens[1];
        orbits[planet2] = planet1;

        orbitGraph[planet1] = orbitGraph[planet1] || { name: planet1, adjacent: [] };
        orbitGraph[planet2] = orbitGraph[planet2] || { name: planet2, adjacent: [] };
        orbitGraph[planet1].adjacent.push(planet2);
        orbitGraph[planet2].adjacent.push(planet1);
    });
    
    console.log('Total orbits:', countOrbits(orbits));

    const shortestPath = computeShortestPath(orbitGraph, 'YOU', 'SAN');
    console.log('Shortest path:', shortestPath.length - 3);
});
