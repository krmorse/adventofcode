const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const groups = lines.join('||').split('||||').map(l => l.replace(/\|\|/g, ''));
    const counts = groups.map(group => [...group].reduce((accum, y) => ({...accum, [y]: true}), {}));
    const total = counts.map(c => Object.keys(c).length).reduce((accum, val) => accum + val, 0);
    console.log('Total:', total);
  });
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const groups = lines.join('||').split('||||').map(l => l.replace(/\|\|/g, ' '))
    const counts = groups.map(group => [...group]
      .reduce((accum, y) => ({...accum, [y]: true}), {}))
      .map((c, i) => ({counts: c, answers: groups[i].split(' ')}));
    const totals = counts.map(c => Object.keys(c.counts).filter(q => c.answers.every(v => v.includes(q))).length);
    const total = totals.reduce((accum, v) => accum + v, 0);
    console.log('Total:', total);
  });
}

part2();


