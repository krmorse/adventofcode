const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  const sections = lines.join("||").split("||||");
  const rules = sections[0].split("||").map((ruleSpec) => {
    const ruleTokens = ruleSpec.match(/^(.+)\: (\d+\-\d+) or (\d+\-\d+)$/);
    return {
      field: ruleTokens[1],
      range1: ruleTokens[2].split('-'),
      range2: ruleTokens[3].split('-'),
      isValid: (input) => {
        const range1 = ruleTokens[2].split("-");
        const range2 = ruleTokens[3].split("-");

        return (
          (input >= parseInt(range1[0], 10) &&
            input <= parseInt(range1[1], 10)) ||
          (input >= parseInt(range2[0], 10) && input <= parseInt(range2[1], 10))
        );
      },
    };
  });

  const myTicket = sections[1]
    .split("||")[1]
    .split(",")
    .map((num) => parseInt(num, 10));
  const tickets = sections[2]
    .split("||")
    .slice(1)
    .map((ticket) => ticket.split(",").map((num) => parseInt(num, 10)));

  return {
    rules,
    myTicket,
    tickets,
  };
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const ticketSpecs = parseInput(lines);

    const allTicketValues = ticketSpecs.tickets.flatMap((x) => x);
    const invalidTicketValues = allTicketValues.filter((num) => {
      return !ticketSpecs.rules.some((rule) => rule.isValid(num));
    });

    const errorRate = invalidTicketValues.reduce(
      (accum, val) => accum + val,
      0
    );
    console.log(errorRate);
  });
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const ticketSpecs = parseInput(lines);
    const validTickets = ticketSpecs.tickets.filter((ticket) => {
      return ticket.some((num) => {
        return ticketSpecs.rules.some((rule) => rule.isValid(num));
      });
    });

    const fieldIndexes = {};
    for (let i = 0; i < ticketSpecs.tickets[0].length; i++) {
      const values = ticketSpecs.tickets.map((ticket) => ticket[i]);
      ticketSpecs.rules.forEach((rule) => {
        const validValues = values.filter(v => rule.isValid(v));
        if (values.every((value) => rule.isValid(value))) {
          fieldIndexes[rule.field] = fieldIndexes[rule.field] || [];
          fieldIndexes[rule.field].push(i);
        }
      });
    };

    const errorRate = invalidTicketValues.reduce(
      (accum, val) => accum + val,
      0
    );
    console.log(errorRate);
  });
};

part2();
