import { getInput } from "../utils/input.js";

const parseInput = (input) => {
  return input.reduce((result, line) => {
    const parts = line.split(':');
    const gameId = parts[0].split(' ')[1];
    const subGames = parts[1].split(';')
    result[gameId] = subGames.map((subGame) => {
      const cubes = subGame.split(',');
      return cubes.reduce((cubeResult, cube) => {
        const [count, color] = cube.trim().split(' ');
        cubeResult[color] = parseInt(count, 10);
        return cubeResult;
      }, {});
    });
    return result;
  }, {});
}

const part1 = async () => {
  const input = parseInput(await getInput());
  const possibleGames = Object.keys(input).filter((gameId) => {
    const game = input[gameId];
    return game.every((cubes) => {
      return (cubes.red ?? 0) <= 12 && (cubes.green ?? 0) <= 13 && (cubes.blue ?? 0) <= 14;
    });
  });
  const sum = possibleGames.reduce((result, val) => result + parseInt(val, 10), 0);
  console.log(sum);
};

const part2 = async () => {
  const input = parseInput(await getInput());
  const minimums = Object.values(input).map((subGames) => {
    return subGames.reduce((result, subGame) => {
      return {
        blue: Math.max(result.blue, subGame.blue??1),
        red: Math.max(result.red, subGame.red??1),
        green: Math.max(result.green, subGame.green??1)
      };
    }, { blue: 1, red: 1, green: 1});
  });

  console.log(minimums.reduce((result, min) => {
    return result + (min.red * min.green * min.blue);
  }, 0));
};

part2();
