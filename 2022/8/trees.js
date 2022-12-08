const inputUtils = require("../utils/input");

const isVisible = (trees, y, x) => {
  if (x === 0 || y === 0 || y === trees.length - 1 || x === trees[y].length - 1) {
    return true;
  } else {
    //go up
    let visibleFromTop = true;
    for (let yDelta = y - 1; yDelta >= 0; yDelta--) {
      if (trees[yDelta][x] >= trees[y][x]) {
        visibleFromTop = false;
      }
    }
    //go right
    let visibleFromRight = true;
    for (let xDelta = x + 1; xDelta < trees[y].length; xDelta++) {
      if (trees[y][xDelta] >= trees[y][x]) {
        visibleFromRight = false;
      }
    }
    //go down
    let visibleFromBottom = true;
    for (let yDelta = y + 1; yDelta < trees.length; yDelta++) {
      if (trees[yDelta][x] >= trees[y][x]) {
        visibleFromBottom = false;
      }
    }
    //go left
    let visibleFromLeft = true;
    for (let xDelta = x - 1; xDelta >= 0; xDelta--) {
      if (trees[y][xDelta] >= trees[y][x]) {
        visibleFromLeft = false;
      }
    }

    return visibleFromTop || visibleFromRight || visibleFromBottom || visibleFromLeft;
  }
}

const getTreeScore = (trees, y, x) => {
  if (x === 0 || y === 0 || y === trees.length - 1 || x === trees[y].length - 1) {
    return 0;
  } else {
    //go up
    let upScore = 0;
    for (let yDelta = y - 1; yDelta >= 0; yDelta--) {
      upScore++;
      if (trees[yDelta][x] >= trees[y][x]) {
        break;
      }
    }
    //go right
    let rightScore = 0;
    for (let xDelta = x + 1; xDelta < trees[y].length; xDelta++) {
      rightScore++;
      if (trees[y][xDelta] >= trees[y][x]) {
        break;
      }
    }
    //go down
    let downScore = 0;
    for (let yDelta = y + 1; yDelta < trees.length; yDelta++) {
      downScore++;
      if (trees[yDelta][x] >= trees[y][x]) {
        break;
      }
    }
    //go left
    let leftScore = 0;
    for (let xDelta = x - 1; xDelta >= 0; xDelta--) {
      leftScore++;
      if (trees[y][xDelta] >= trees[y][x]) {
        break;
      }
    }

    return upScore * rightScore * downScore * leftScore;
  }
}

const part1 = () => {
  inputUtils.getInput().then((inputLines) => {
    const trees = inputLines.map(line => line.split('').map(t => parseInt(t, 10)));
    let visibleCount = 0;
    for (let y = 0; y < trees.length; y++) {
      for (let x = 0; x < trees[y].length; x++) {
        if (isVisible(trees, y, x)) {
          visibleCount++;
        }
      }
    }
    console.log(visibleCount);

  });
};

const part2 = () => {
  inputUtils.getInput().then((inputLines) => {
    const trees = inputLines.map(line => line.split('').map(t => parseInt(t, 10)));
    let treeScores = [];
    for (let y = 0; y < trees.length; y++) {
      for (let x = 0; x < trees[y].length; x++) {
        treeScores.push(getTreeScore(trees, y, x));
      }
    }
    console.log(Math.max(...treeScores));
  });
};

part2();
