import { getInput } from "../utils/input.js";

const isSafe = (values) => {
  const originalReport = values.join(' ');
  const ascending = [].concat(values.sort((a, b) => a - b));
  const descending = [].concat(values.sort((a, b) => b - a));
  if (originalReport !== ascending.join(' ') && originalReport !== descending.join(' ')) {
    return false;
  }
  return values.every((val, i) => {
    const diff = Math.abs(values[i] - values[i - 1]);
    return i === 0 || (diff >= 1 && diff <= 3);
  });
}

const compute = (reports) => {
  const safe = reports.filter((report) => {
    const values = report.split(' ').map((val) => parseInt(val, 10));
    return isSafe(values);
  });
  return safe.length;
}

const compute2 = (reports) => {
  const safe = reports.filter((report) => {
    const values = report.split(' ').map((val) => parseInt(val, 10));
    for (let i = 0; i < values.length; i++) {
      if (isSafe([...values.slice(0, i), ...values.slice(i + 1)])) {
        return true;
      }
    }
  });
  return safe.length;
}

const part1 = async () => {
  console.log(compute(await getInput()));
};

const part2 = async () => {
  console.log(compute2(await getInput()));
};

part2();

