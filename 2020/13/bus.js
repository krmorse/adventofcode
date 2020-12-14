const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  return {
    departure: parseInt(lines[0], 10),
    busses: lines[1].split(',')
      .map(bus => ({id: parseInt(bus, 10)}))
      .filter(bus => !!bus.id)
  };
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const busInfo = parseInput(lines);
    for(let i = 0; i < busInfo.busses.length; i++) {
      const x = Math.ceil(busInfo.departure / busInfo.busses[i].id);
      busInfo.busses[i].waitTime = (busInfo.busses[i].id * x) % busInfo.departure;
    }
    busInfo.busses.sort((a, b) => a.waitTime - b.waitTime);
    
    console.log(busInfo.busses[0].id * busInfo.busses[0].waitTime);
  });
};

part1();
