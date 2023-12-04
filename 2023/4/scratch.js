import { getInput } from "../utils/input.js";

const part1 = async () => {
  const input = await getInput();
  const winPoints = input.map(card => {
    const numbers = card.split(':')[1].trim();
    const [winnerString, mineString] = numbers.split('|');
    const winners = winnerString.trim().split(' ').map(w => parseInt(w, 10)).filter(w => !isNaN(w));
    const mine = mineString.trim().split(' ').map(w => parseInt(w, 10)).filter(w => !isNaN(w));
    const matches = mine.filter(m => winners.includes(m));
    return matches.length && Math.pow(2, matches.length-1);
  });

  console.log(winPoints.reduce((result, wp) => result + wp, 0));
};

const part2 = async () => {
  const input = await getInput();
  
};

part1();
