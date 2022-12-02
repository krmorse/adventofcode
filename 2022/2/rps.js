const inputUtils = require("../utils/input");

//Rock: A = 65, X = 88
//Paper: B = 66, Y = 89
//Scissors: C = 67, Z = 90

const getMeMoveValue = (meMove) => meMove.charCodeAt(0) - 87;
const getYouMoveValue = (youMove) => youMove.charCodeAt(0) - 64;

const getRoundScore = (youMove, meMove) => {
  const youMoveValue = youMove.charCodeAt(0);
  const meMoveValue = meMove.charCodeAt(0) - 23;
  const result = meMoveValue - youMoveValue;
  if (result === 0) {
    return 3 + getMeMoveValue(meMove);
  } else if (result === 1 || result === -2) {
    return 6 + getMeMoveValue(meMove);
  } else {
    return getMeMoveValue(meMove);
  }
};

const part1 = () => {
  inputUtils.getInput().then((strategyGuide) => {
    // const roundScores = ['A Y', 'B X', 'C Z'].map(round => getRoundScore(...round.split(' ')));
    const roundScores = strategyGuide.map(round => getRoundScore(...round.split(' ')));
    console.log(roundScores.reduce((accum, val) => accum + val));
  });
};

const part2 = () => {
  inputUtils.getInput().then((strategyGuide) => {
    // const roundScores = ['A Y', 'B X', 'C Z'].map(round => {
    const roundScores = strategyGuide.map(round => {
      const [youMove, meMove] = round.split(' ');
      if (meMove === "X") {
        //need to lose
        const meRealMove = youMove === "A" ? "Z" : (youMove === "B" ? "X" : "Y");
        return getMeMoveValue(meRealMove);
      } else if (meMove === "Y") {
        //need to draw
        return 3 + getYouMoveValue(youMove);
      } else {
        //win
        const meRealMove = youMove === "A" ? "Y" : (youMove === "B" ? "Z" : "X");
        return 6 + getMeMoveValue(meRealMove);
      }
    });
    console.log(roundScores.reduce((accum, val) => accum + val));
  });
};

part2();
