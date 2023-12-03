import { getInput } from "../utils/input.js";

const isPartNumber = (part, partX, partY, input) => {
  console.log(`checking part=${part}`)
  for (let y = partY - 1; y <= partY + 1; y++) {
    if (y >= 0 && y < input.length) {
      for (let x = partX - 1; x <= partX + part.length; x++) {
        if (x >= 0 && x < input[y].length) {
          if (/[^\d\.]/.test(input[y][x])) {
            return true;
          }
        }
      }
    }
  }
}

const part1 = async () => {
  const input = await getInput();
  const partNumbers = [];
  input.forEach((line, y) => {
    const parts = line.match(/(\d+)/g) ?? [];
    let x = 0;
    parts.forEach(part => {
      const startIndex = line.indexOf(part, x);
      if (isPartNumber(part, startIndex, y, input)) {
        partNumbers.push(part);
      }
      x = startIndex + part.length;
    });
  });

  console.log(partNumbers)
  console.log(partNumbers.reduce((result, partNumber) => result + parseInt(partNumber, 10), 0));
};

const part2 = async () => {
  const input = parseInput(await getInput());

};

part1();
