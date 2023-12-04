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

const getParts = (input) => {
  const partNumbers = [];
  input.forEach((line, y) => {
    const parts = line.match(/(\d+)/g) ?? [];
    let x = 0;
    parts.forEach(part => {
      const startIndex = line.indexOf(part, x);
      if (isPartNumber(part, startIndex, y, input)) {
        partNumbers.push({ partNumber: parseInt(part, 10), x: startIndex, y });
      }
      x = startIndex + part.length;
    });
  });
  return partNumbers;
}

const part1 = async () => {
  const input = await getInput();
  const parts = getParts(input);

  console.log(parts.reduce((result, part) => result + part.partNumber, 0));
};

const part2 = async () => {
  const input = await getInput();
  const parts = getParts(input);
  const gears = {};
  parts.forEach((part) => {
    console.log(part);
    for (let y = part.y - 1; y <= part.y + 1; y++) {
      if (y >= 0 && y < input.length) {
        for (let x = part.x - 1; x <= part.x + part.partNumber.toString(10).length; x++) {
          if (x >= 0 && x < input[y].length) {
            if (input[y][x] === "*") {
              if (!gears[`y=${y},x=${x}`]) {
                gears[`y=${y},x=${x}`] = [];
              }
              gears[`y=${y},x=${x}`].push(part.partNumber);
            }
          }
        }
      }
    }
  });

  console.log(Object.values(gears)
    .filter((g) => g.length === 2)
    .reduce((result, p) => result + (p[0]*p[1]), 0));
};

part2();
