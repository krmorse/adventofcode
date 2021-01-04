const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  const inputParts = lines.join("\n").split("\n\n");
  const strings = inputParts[1].split("\n");
  const rules = {};

  inputParts[0].split("\n").forEach((rule) => {
    const ruleParts = rule.split(":");
    rules[ruleParts[0]] = ruleParts[1].trim().replace(/"/g, "");
  });

  return {
    rules,
    strings,
  };
};

const getRuleExpression = (rules, ruleNum) => {
  while (rules[ruleNum].match(/\d+/)) {
    const newRulesToProcess = Object.keys(rules).filter((rNum) => {
      return !rules[rNum].match(/\d+/);
    });

    newRulesToProcess.forEach((key) => {
      Object.keys(rules).forEach((rNum) => {
        rules[rNum] = rules[rNum].replace(new RegExp(key, 'g'), rules[key]);
      });
      delete rules[key];
    });
  }

  return rule[ruleNum];
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const input = parseInput(lines);
    const rule0 = getRuleExpression(input.rules, 0);
  });
};

part1();
