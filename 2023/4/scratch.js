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

const cardMemo = {};

const compute = (cards, card) => {
  if (cardMemo[card.cardNumber]) {
    return cardMemo[card.cardNumber];
  }

  const cardsToProcess = cards.slice(card.cardNumber, card.cardNumber + card.matches.length)
  cardMemo[card.cardNumber] = cardsToProcess.length + cardsToProcess.reduce((result, c) => result + compute(cards, c), 0);
  return cardMemo[card.cardNumber];
};

const part2 = async () => {
  const input = await getInput();
  const cards = input.map((card, i) => {
    const numbers = card.split(':')[1].trim();
    const [winnerString, mineString] = numbers.split('|');
    const winners = winnerString.trim().split(' ').map(w => parseInt(w, 10)).filter(w => !isNaN(w));
    const mine = mineString.trim().split(' ').map(w => parseInt(w, 10)).filter(w => !isNaN(w));
    const matches = mine.filter(m => winners.includes(m));
    return {
      cardNumber: i+1,
      winners,
      mine,
      matches
    };
  });

  console.log(cards.length + cards.reduce((result, c) => result + compute(cards, c), 0));
};

part2();
