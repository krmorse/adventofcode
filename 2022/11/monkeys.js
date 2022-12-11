const inputUtils = require("../utils/input");

const monkeys = [
  {
    inspections: 0,
    items: [79, 98],
    operation: old => old * 19,
    mod: 23,
    nextMonkey: (newVal) => newVal % 23 === 0 ? 2 : 3 
  },
  {
    inspections: 0,
    items: [54, 65, 75, 74],
    operation: old => old + 6,
    mod: 19,
    nextMonkey: (newVal) => newVal % 19 === 0 ? 2 : 0 
  },
  {
    inspections: 0,
    items: [79, 60, 97],
    operation: old => old * old,
    mod: 13,
    nextMonkey: (newVal) => newVal % 13 === 0 ? 1 : 3 
  },
  {
    inspections: 0,
    items: [74],
    operation: old => old + 3,
    mod: 17,
    nextMonkey: (newVal) => newVal % 17 === 0 ? 0 : 1 
  }
];

// const monkeys = [
//   {
//     inspections: 0,
//     items: [71, 86],
//     operation: old => old * 13,
//     mod: 19,
//     nextMonkey: (newVal) => newVal % 19 === 0 ? 6 : 7 
//   },
//   {
//     inspections: 0,
//     items: [66, 50, 90, 53, 88, 85],
//     operation: old => old + 3,
//     mod: 2,
//     nextMonkey: (newVal) => newVal % 2 === 0 ? 5 : 4 
//   },
//   {
//     inspections: 0,
//     items: [97, 54, 89, 62, 84, 80, 63],
//     operation: old => old + 6,
//     mod: 13,
//     nextMonkey: (newVal) => newVal % 13 === 0 ? 4 : 1 
//   },
//   {
//     inspections: 0,
//     items: [82, 97, 56, 92],
//     operation: old => old + 2,
//     mod: 5,
//     nextMonkey: (newVal) => newVal % 5 === 0 ? 6 : 0 
//   },
//   {
//     inspections: 0,
//     items: [50, 99, 67, 61, 86],
//     operation: old => old * old,
//     mod: 7,
//     nextMonkey: (newVal) => newVal % 7 === 0 ? 5 : 3 
//   },
//   {
//     inspections: 0,
//     items: [61, 66, 72, 55, 64, 53, 72, 63],
//     operation: old => old + 4,
//     mod: 11,
//     nextMonkey: (newVal) => newVal % 11 === 0 ? 3 : 0 
//   },
//   {
//     inspections: 0,
//     items: [59, 79, 63],
//     operation: old => old * 7,
//     mod: 17,
//     nextMonkey: (newVal) => newVal % 17 === 0 ? 2 : 7 
//   },
//   {
//     inspections: 0,
//     items: [55],
//     operation: old => old + 7,
//     mod: 3,
//     nextMonkey: (newVal) => newVal % 3 === 0 ? 2 : 1 
//   }
// ];

const part1 = () => {
  for (let i = 0; i < 20; i++) {
    monkeys.forEach(monkey => {
      monkey.items.forEach(worryLevel => {
        const newWorryLevel = Math.floor(monkey.operation(worryLevel) / 3);
        const nextMonkey = monkey.nextMonkey(newWorryLevel);
        monkeys[nextMonkey].items.push(newWorryLevel);
      });
      monkey.inspections += monkey.items.length;
      monkey.items = [];
    });
  }

  const inspections = monkeys.map(monkey => monkey.inspections);
  inspections.sort((a, b) => b-a);
  console.log(inspections[0]*inspections[1]);
};

const part2 = () => {
  inputUtils.getInput().then((inputLines) => {
    for (let i = 0; i < 10000; i++) {
      monkeys.forEach(monkey => {
        monkey.items.forEach(worryLevel => {
          const newWorryLevel = monkey.operation(worryLevel);
          const nextMonkey = monkey.nextMonkey(newWorryLevel);
          monkeys[nextMonkey].items.push(newWorryLevel % monkey.mod);
        });
        monkey.inspections += monkey.items.length;
        monkey.items = [];
      });

      if (i == 0 || i === 19 || (i+1) % 1000 === 0) {
        console.log(monkeys.map(monkey => monkey.inspections));
      }
    }
  
    const inspections = monkeys.map(monkey => monkey.inspections);
    inspections.sort((a, b) => b-a);
    console.log(inspections[0]*inspections[1]);
  });
};

part2();
