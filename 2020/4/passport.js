const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  const cleanedInput = lines.join('||').split('||||').map(l => l.replace(/\|\|/g, ' '));
  const passports = cleanedInput.map(p => {
    const tokens = p.split(' ');
    return tokens.reduce((passport, token) => {
      const fieldAndVal = token.split(':');
      passport[fieldAndVal[0]] = fieldAndVal[1];
      return passport;
    }, {});
  });
  return passports;
}

const requiredFieldsPresent = (passport) => {
  const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
  return requiredFields.every(val => !!passport[val]);
};

const validations = {
  byr: (passport) => {
    const birthYear = parseInt(passport.byr, 10);
    return birthYear >= 1920 && birthYear <= 2002;
  },
  iyr: (passport) => {
    const issueYear = parseInt(passport.iyr, 10);
    return issueYear >= 2010 && issueYear <= 2020;
  },
  eyr: (passport) => {
    const expirationYear = parseInt(passport.eyr, 10);
    return expirationYear >= 2020 && expirationYear <= 2030;
  },
  hgt: (passport) => {
    const metric = passport.hgt.match(/(\d+)cm/);
    const freedom = passport.hgt.match(/(\d+)in/);
    if (metric) {
      const cm = parseInt(metric[1], 10);
      return cm >= 150 && cm <= 193;
    } else if (freedom) {
      const freedomUnits = parseInt(freedom[1], 10);
      return freedomUnits >= 59 && freedomUnits <= 76;
    } else {
      return false;
    }
  },
  hcl: (passport) => {
    return /^#[0-9|a-f]{6}$/.test(passport.hcl);
  },
  ecl: (passport) => {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl);
  },
  pid: (passport) => {
    return /^\d{9}$/.test(passport.pid);
  }
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const passports = parseInput(lines);
    const validPassports = passports.filter(requiredFieldsPresent);
    console.log('Valid count:', validPassports.length);
  });
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const passports = parseInput(lines);
    const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
    const validPassports = passports.filter(passport => {
      return requiredFields.every(val => !!passport[val])
        && Object.values(validations).every(v => v(passport));
    });
    console.log('Valid count:', validPassports.length);
  });
}

part2();
