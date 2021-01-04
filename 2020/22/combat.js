const inputUtils = require("../utils/input");

const parseInput = (lines) => {
  const players = lines.join("\n").split("\n\n");
  return {
    turn: 0,
    player1: players[0]
      .split("\n")
      .slice(1)
      .map((card) => parseInt(card, 10)),
    player2: players[1]
      .split("\n")
      .slice(1)
      .map((card) => parseInt(card, 10)),
  };
};

const playRound = (state) => {
  const nextState = {
    turn: state.turn + 1,
    player1: state.player1,
    player2: state.player2,
  };

  const player1Card = state.player1.shift(),
    player2Card = state.player2.shift();

  if (player1Card > player2Card) {
    nextState.player1.push(player1Card);
    nextState.player1.push(player2Card);
  } else {
    nextState.player2.push(player2Card);
    nextState.player2.push(player1Card);
  }

  return nextState;
};

const part1 = () => {
  inputUtils.getInput().then((lines) => {
    let state = parseInput(lines);

    do {
      state = playRound(state);
    } while (state.player1.length && state.player2.length);

    const winner = state.player1.length ? state.player1 : state.player2;
    console.log(winner.map((card, i) => card * (winner.length - i)).reduce((a, b) => a+b, 0));
  });
};

part1();
