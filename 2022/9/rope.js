const inputUtils = require("../utils/input");

const calculateNewTailPosition = (head, tail) => {
  const deltaX = head.x - tail.x;
  const deltaY = head.y - tail.y;

  if (Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1) {
    return;
  }

  if (deltaX === 2 && deltaY === 0) {
    tail.x++;
  } else if (deltaX === -2 && deltaY === 0) {
    tail.x--;
  } else if (deltaY === 2 && deltaX === 0) {
    tail.y++;
  } else if (deltaY === -2 && deltaX === 0) {
    tail.y--;
  } else {
    if (deltaY === -2) {
      tail.y--;
      tail.x += deltaX;
    } else if (deltaY === 2) {
      tail.y++;
      tail.x += deltaX;
    } else if (deltaX === -2) {
      tail.x--;
      tail.y += deltaY;
    } else if (deltaX === 2) {
      tail.x++;
      tail.y += deltaY;
    } else {
      console.log("hi");
    }
  }
}

const part1 = () => {
  inputUtils.getInput().then((inputLines) => {
    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let tailPositions = { '0,0': true };

    inputLines.forEach(move => {
      const [direction, count] = move.split(' ');
      for (let i = 0; i < parseInt(count, 10); i++) {
        if (direction === 'R') {
          head.x++;
        } else if (direction === 'L') {
          head.x--;
        } else if (direction === 'U') {
          head.y--;
        } else {
          head.y++;
        }

        calculateNewTailPosition(head, tail);
        tailPositions[`${tail.x},${tail.y}`] = true;
      }
    });

    console.log(Object.keys(tailPositions).length);
  });
};

const part2 = () => {
  inputUtils.getInput().then((inputLines) => {

  });
};

part1();
