const inputUtils = require('../utils/input');

function countChars(word) {
    const chars = [...word];
    return chars.reduce(function(accum, c) {
        accum[c] = (accum[c] || 0) + 1;
        return accum;
    }, {});
}

inputUtils.getInput().then(function(input) {
    const counts = input.map(countChars);
    
    let twos = 0;
    let threes = 0;

    counts.forEach(function(count) {
        const countString = Object.values(count).join('');
        if (countString.indexOf('3') >= 0) {
            threes++;
        }
        if (countString.indexOf('2') >= 0) {
            twos++;
        }
    });

    console.log('Checksum:', twos * threes);
});