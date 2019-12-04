const inputUtils = require('../utils/input');

const HAS_DOUBLE_REGEX = /([^1]|^)11([^1]|$)|([^2]|^)22([^2]|$)|([^3]|^)33([^3]|$)|([^4]|^)44([^4]|$)|([^5]|^)55([^5]|$)|([^6]|^)66([^6]|$)|([^7]|^)77([^7]|$)|([^8]|^)88([^8]|$)|([^9]|^)99([^9]|$)/;

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
