const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((directions) => {
    const houses = {'0,0': 1};
    let x = 0, y = 0;

    directions[0].split('').forEach(dir => {
      switch(dir) {
        case '^':
          y++;
          break;
        case '<':
          x--;
          break;
        case '>':
          x++;
          break;
        case 'v':
          y--;
          break;
      }
      houses[`${x},${y}`] = (houses[`${x},${y}`] || 0) +1;
    });
 
    console.log('Total:', Object.keys(houses).length);
  });
};

const part2 = () => {
  inputUtils.getInput().then((directions) => {
    const houses = {'0,0': 1};
    let santaX = 0, santaY = 0, roboX = 0, roboY = 0;

    directions[0].split('').forEach((dir, i) => {
      switch(dir) {
        case '^':
          if(i % 2) { santaY++; } else { roboY++; }
          break;
        case '<':
          if(i % 2) { santaX--; } else { roboX--; }
          break;
        case '>':
          if(i % 2) { santaX++; } else { roboX++; }
          break;
        case 'v':
          if(i % 2) { santaY--; } else { roboY--; }
          break;
      }
      const key = (i % 2) ? `${santaX},${santaY}` : `${roboX},${roboY}`;
      houses[key] = (houses[key] || 0) + 1;
    });
 
    console.log('Total:', Object.keys(houses).length);
  });
};

part2();
