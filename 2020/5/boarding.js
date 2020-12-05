const inputUtils = require("../utils/input");

const toSeatPosition = (input, lowerIndicator) => {
  let rangeMin = 0, rangeMax = 2 ** input.trim().length - 1;
  for(let i = 0; i < input.length; i++) {
    const rangeSize = rangeMax - rangeMin + 1;
    if (input[i] === lowerIndicator) {
      rangeMax -= Math.floor(rangeSize / 2);
    } else {
      rangeMin += Math.ceil(rangeSize / 2);
    }
  }

  return rangeMin;
}

const toSeat = (bp) => {
  const row = toSeatPosition(bp.substr(0, 7), 'F');
  const col = toSeatPosition(bp.substr(7), 'L');
  return {row, col};
}

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    const seatPositions = lines.map(bp => {
      const {row, col} = toSeat(bp);
      return row * 8 + col;
    });
    
    const max = Math.max(...seatPositions);
    console.log('Max:', max);
  });
};

const part2 = () => {
  inputUtils.getInput().then((lines) => {
    const seatPositions = lines.map(toSeat).map(({row, col}) => row * 8 + col).sort((a, b) => a - b);
    
    const firstID = seatPositions[0];
    for(let i = 1; i < seatPositions.length; i++) {
      if (seatPositions[i] !== firstID + i) {
        console.log('ID:', seatPositions[i] - 1);
        break;
      }
    }
  });
};

part2();
