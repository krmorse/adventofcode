const inputUtils = require("../utils/input");

const parse = (line) => {
  const tokens = line.split(" ");
  const range = tokens[0].split("-");

  return {
    min: parseInt(range[0], 10),
    max: parseInt(range[1], 10),
    char: tokens[1].substring(0, 1),
    pass: tokens[2]
  };
};

const isValid = (rule) => {
  const regex = new RegExp(rule.char, "g");
  const matches = (rule.pass.match(regex) || []).length;
  const valid = matches >= rule.min && matches <= rule.max;
  console.log("regex:", regex, "pass:", rule.pass, "valid:", valid);
  
  return valid;
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const rules = lines.map(parse);
    const valid = rules.filter(isValid);
    console.log('Valid passwords:', valid.length);
  });
};

const isValid2 = (rule) => {
  const firstRuleValid = rule.pass.charAt(rule.min-1) === rule.char.charAt(0);
  const secondRuleValid = rule.pass.charAt(rule.max-1) === rule.char.charAt(0);
  // console.log("regex:", regex, "pass:", rule.pass, "valid:", valid);
  
  return firstRuleValid ^ secondRuleValid;
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const rules = lines.map(parse);
    const valid = rules.filter(isValid2);
    console.log('Valid passwords:', valid.length);
  });
};

part2();
