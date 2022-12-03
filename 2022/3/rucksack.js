const inputUtils = require("../utils/input");

const findPriority = (rucksack) => {
  const left = rucksack.substring(0, rucksack.length / 2).split("");
  const right = rucksack.substring(rucksack.length / 2).split("");
  return left.filter((val) => right.includes(val))[0];
};

const getPriorityValue = (priority) => {
  return priority === priority.toUpperCase() ?
    (priority.charCodeAt(0) - "A".charCodeAt(0) + 27) :
    (priority.charCodeAt(0) - "a".charCodeAt(0) + 1);
}

const part1 = () => {
  inputUtils.getInput().then((rucksacks) => {
    const priorities = rucksacks.map(rucksack => {
      const priority = findPriority(rucksack);
      return getPriorityValue(priority);
    });
    console.log(priorities.reduce((accum, val) => accum + val, 0));
  });
};

const part2 = () => {
  inputUtils.getInput().then((rucksacks) => {
    const priorities = rucksacks.reduce((accum, val, i, r) => {
      if(i % 3 === 0) {
        accum.push([r[i], r[i+1], r[i+2]]);
      }
      return accum;
    }, []);
    const badges = priorities.map((val) => {
      const [one, two, three] = val.map(ruck => ruck.split(""));
      const badge = one.filter(o => two.includes(o) && three.includes(o))[0];
      return getPriorityValue(badge);
    });
    console.log(badges.reduce((accum, val) => accum + val, 0));
  });
};

part2();
