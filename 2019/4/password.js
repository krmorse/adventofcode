const inputUtils = require('../utils/input');

const HAS_DOUBLE_REGEX = /11|22|33|44|55|66|77|88|99|00/;

const hasDouble = (password) => HAS_DOUBLE_REGEX.test(password.toString());

const isIncreasing = (password) => {
    const passwordDigits = password.toString().split('').map(digit => parseInt(digit, 10));
    let compareTo = 0;
    for(let i = 0; i < passwordDigits.length; i++) {
        if (passwordDigits[i] < compareTo) {
            return false;
        }
        compareTo = passwordDigits[i];
    }
    return true;
};

const isValidPassword = (password) => {
    return hasDouble(password) && isIncreasing(password);
};

const generatePasswords = (lower, upper) => {
    const validPasswords = [];

    for(let i = lower; i < upper; i++) {
        if (isValidPassword(i)) {
            validPasswords.push(i);
        }
    }

    return validPasswords;
};

inputUtils.getInput().then((range) => {
    const rangeTokens = range[0].split('-');
    const lower = parseInt(rangeTokens[0], 10);
    const upper = parseInt(rangeTokens[1], 10);
    
    const passwords = generatePasswords(lower, upper);
    
    console.log('total passwords:', passwords.length);
});
