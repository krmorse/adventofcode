const inputUtils = require('../utils/input');

function countChars(word) {
    const chars = [...word];
    return chars.reduce(function(accum, c) {
        accum[c] = (accum[c] || 0) + 1;
        return accum;
    }, {});
}

function computeChecksum(input) {
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

    return twos * threes;
}

function findCommonId(input) {
    let diff;
    input.some(function(str1, i) {
        if (diff) {
            return true;
        }
        input.some(function(str2, j) {
            if (diff) {
                return true;
            }

            const str1Chars = [...str1];
            const str2Chars = [...str2];
            let position = 0;
            const diffs = str1Chars.reduce(function(accum, letter, index) {
                if (str1Chars[index] !== str2Chars[index]) {
                    accum++;
                    position = index;
                }
                return accum;
            }, 0);

            if (diffs === 1) {
                diff = str1.substring(0, position) + str1.substring(position+1);
            }
        });
    });

    return diff;
}

inputUtils.getInput().then(function(input) {
    const checksum = computeChecksum(input);
    console.log('Checksum:', checksum);

    const id = findCommonId(input);
    console.log('Common ID:', id);
});