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

  while (remainingExpression.match(/(\d+) \+ (\d+)/)) {
    let toEval = remainingExpression.match(/(\d+) \+ (\d+)/);
    remainingExpression = remainingExpression.replace(
      toEval[0],
      parseInt(toEval[1], 10) + parseInt(toEval[2], 10));
  }

  while (remainingExpression.match(/(\d+) \* (\d+)/)) {
    let toEval = remainingExpression.match(/(\d+) \* (\d+)/);
    remainingExpression = remainingExpression.replace(
      toEval[0],
      parseInt(toEval[1], 10) * parseInt(toEval[2], 10));
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

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    console.log(
      lines
        .map((line) => parseInt(compute(line), 10))
        .reduce((a, b) => a + b, 0)
    );
  });
};

part2();
