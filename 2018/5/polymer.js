const inputUtils = require('../utils/input');
const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function shrink(original) {
    let polymer, newPolymer = original;
    while (polymer !== newPolymer) {
        polymer = newPolymer;
        alphabet.forEach(function(letter) {
            newPolymer = newPolymer.replace(new RegExp(letter + letter.toLowerCase(), 'g'), '')
                .replace(new RegExp(letter.toLowerCase() + letter, 'g'), '');
        });
    }

    return polymer;
}

function superShrink(original) {
    return Math.min(...alphabet.map(function(letter) {
        return shrink(original.replace(new RegExp(letter, "ig"), '')).length;
    }, []));
}

inputUtils.getInput().then(function(input) {
    const polymer = shrink(input[0]);
    console.log('Part 1 Answer: ', polymer.length);
    console.log('Part 2 Answer:', superShrink(input[0]));
});