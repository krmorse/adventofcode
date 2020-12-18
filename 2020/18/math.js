const inputUtils = require("../utils/input");

const computeFlattenedExpression = (expression) => {
  if (
    expression.indexOf("(") > 0 ||
    (expression.indexOf(")") > 0 &&
      expression.indexOf(")") < expression.length - 1)
  ) {
    throw new Error("expression is not flat");
  }

  let remainingExpression = expression.replace("(", "").replace(")", "");
  while (remainingExpression.indexOf(" ") > 0) {
    let toEval = remainingExpression.match(/(\d+) ([+*]) (\d+)/);
    remainingExpression = remainingExpression.replace(
      toEval[0],
      toEval[2] === "+"
        ? parseInt(toEval[1], 10) + parseInt(toEval[3], 10)
        : parseInt(toEval[1], 10) * parseInt(toEval[3], 10)
    );
  }

  return remainingExpression;
};

const compute = (input) => {
  let flattened = input;
  let needsFlattening = flattened.match(/\(\d+[^(]+?\)/g);
  while (needsFlattening) {
    for (let i = 0; i < needsFlattening.length; i++) {
      flattened = flattened.replace(
        needsFlattening[i],
        computeFlattenedExpression(needsFlattening[i])
      );
    }
    needsFlattening = flattened.match(/\(\d+[^(]+?\)/g);
  }
  while (needsFlattening);

  return computeFlattenedExpression(flattened);
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    console.log(
      lines
        .map((line) => parseInt(compute(line), 10))
        .reduce((a, b) => a + b, 0)
    );
  });
};

part1();
