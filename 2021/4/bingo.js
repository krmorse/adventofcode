const inputUtils = require("../utils/input");

const parseInput = (input) => {
  const callNumbers = input
    .shift()
    .split(",")
    .map((num) => parseInt(num, 10));

  const boards = [];
  let currentBoard = [];
  for (let i = 1; i <= input.length; i++)
    if (currentBoard.length === 5) {
      boards.push(currentBoard);
      currentBoard = [];
    } else {
      const row = input[i]
        .split(" ")
        .map((num) => parseInt(num, 10))
        .filter((num) => !isNaN(num));
      currentBoard.push(row);
    }

  return { callNumbers, boards };
};

const isWinningBoard = (board) => {
  //check rows
  for (let y = 0; y < 5; y++) {
    if (board[y].every(isNaN)) {
      return true;
    }
  }

  //check columns
  for (let x = 0; x < 5; x++) {
    const col = [
      board[0][x],
      board[1][x],
      board[2][x],
      board[3][x],
      board[4][x],
    ];
    if (col.every(isNaN)) {
      return true;
    }
  }

  return false;
};

const part1 = () => {
  inputUtils.getInput().then((input) => {
    const { callNumbers, boards } = parseInput(input);

    callNumbers.every((callNumber) => {
      boards.forEach((board) => {
        board.forEach((row, y) => {
          row.forEach((item, x) => {
            if (item === callNumber) {
              board[y][x] = NaN;
            }
          });
        });
      });

      const winningBoards = boards.filter(isWinningBoard);
      if (winningBoards.length) {
        const winningBoard = winningBoards[0];
        const remainingTotal = winningBoard.reduce((accum, row) => {
          return (
            accum +
            row
              .filter((val) => !isNaN(val))
              .reduce((accum, val) => accum + val, 0)
          );
        }, 0);

        console.log(remainingTotal * callNumber);
        return false;
      }

      return true;
    });
  });
};

const part2 = () => {
  inputUtils.getInput().then((input) => {
    const { callNumbers, boards } = parseInput(input);

    let results = [];
    boards.forEach((board, i) => {
      callNumbers.every((callNumber, round) => {
        board.forEach((row, y) => {
          row.forEach((item, x) => {
            if (item === callNumber) {
              board[y][x] = NaN;
            }
          });
        });

        if (isWinningBoard(board)) {
          const remainingTotal = board.reduce((accum, row) => {
            return (
              accum +
              row
                .filter((val) => !isNaN(val))
                .reduce((accum, val) => accum + val, 0)
            );
          }, 0);

          results.push({
            turns: round,
            callNumber: callNumber,
            remainingTotal,
          });

          return false;
        }

        return true;
      });
    });

    results.sort((a, b) => b.turns - a.turns);

    const longestBoard = results[0];
    console.log(longestBoard.callNumber * longestBoard.remainingTotal);
  });
};

part2();
