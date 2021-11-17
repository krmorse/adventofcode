const inputUtils = require("../utils/input");

const solve = (circuit, wire) => {
  if (!isNaN(wire)) {
    return parseInt(wire, 10);
  }
  if (circuit[wire].hasOwnProperty("value")) {
    return circuit[wire].value;
  }

  switch (circuit[wire].op) {
    case "AND":
      circuit[wire].value =
        solve(circuit, circuit[wire].left) &
        solve(circuit, circuit[wire].right) &
        0xffff;
      break;
    case "OR":
      circuit[wire].value =
        (solve(circuit, circuit[wire].left) |
          solve(circuit, circuit[wire].right)) &
        0xffff;
      break;
    case "NOT":
      circuit[wire].value = ~solve(circuit, circuit[wire].right) & 0xffff;
      break;
    case "LSHIFT":
      circuit[wire].value =
        (solve(circuit, circuit[wire].left) <<
          parseInt(circuit[wire].right, 10)) &
        0xffff;
      break;
    case "RSHIFT":
      circuit[wire].value =
        (solve(circuit, circuit[wire].left) >>
          parseInt(circuit[wire].right, 10)) &
        0xffff;
      break;
    case "EQ":
      circuit[wire].value = solve(circuit, circuit[wire].left);
      break;
  }

  return circuit[wire].value;
};

const part1 = () => {
  inputUtils.getInput().then((circuitSpecs) => {
    const circuit = {};
    circuitSpecs.forEach((spec) => {
      const tokens = spec.split("->").map((s) => s.trim());
      const [input, output] = tokens;

      const opRegex = /\w+ (?<op>AND|OR|RSHIFT|LSHIFT) \w+/;
      const opMatch = input.match(opRegex);
      if (opMatch) {
        const op = opMatch.groups.op;
        const [left, right] = input.split(op).map((s) => s.trim());
        circuit[output] = { op, left, right };
      } else if (input.match(/^\d+$/)) {
        circuit[output] = { value: parseInt(input, 10) };
      } else if (input.match(/^NOT/)) {
        const [left, right] = input.split("NOT").map((s) => s.trim());
        circuit[output] = { op: "NOT", right };
      } else {
        circuit[output] = { op: "EQ", left: input };
      }
    });

    Object.keys(circuit).forEach((key) => {
      solve(circuit, key);
    });
    console.log(circuit.a);
  });
};

const part2 = () => {
  inputUtils.getInput().then((circuitSpecs) => {
    const circuit = {};
    circuitSpecs.forEach((spec) => {
      const tokens = spec.split("->").map((s) => s.trim());
      const [input, output] = tokens;

      const opRegex = /\w+ (?<op>AND|OR|RSHIFT|LSHIFT) \w+/;
      const opMatch = input.match(opRegex);
      if (opMatch) {
        const op = opMatch.groups.op;
        const [left, right] = input.split(op).map((s) => s.trim());
        circuit[output] = { op, left, right };
      } else if (input.match(/^\d+$/)) {
        circuit[output] = { value: parseInt(input, 10) };
      } else if (input.match(/^NOT/)) {
        const [left, right] = input.split("NOT").map((s) => s.trim());
        circuit[output] = { op: "NOT", right };
      } else {
        circuit[output] = { op: "EQ", left: input };
      }
    });

    circuit.b.value = 3176;

    Object.keys(circuit).forEach((key) => {
      solve(circuit, key);
    });
    console.log(circuit.a);
  });
};

part2();
