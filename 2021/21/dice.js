const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((input) => {
    const players = [
      { score: 0, position: 2 },
      { score: 0, position: 6 },
    ];
    let done = false;
    let turn = 0;
    while (!done) {
      const player = players[turn%players.length];
      const rollBase = turn*3;
      player.position = (player.position + rollBase+1 + rollBase+2 + rollBase+3) % 10;
      player.score += player.position+1;
      
      turn++;
      done = !!players.find(({ score }) => score >= 1000);
    }

    const rolls = turn * 3;
    const losingScore = players.find(({score}) => score < 1000).score;
    console.log(rolls * losingScore);
  });
};

part1();
