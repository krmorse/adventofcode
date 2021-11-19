const inputUtils = require("../utils/input");

const part1 = () => {
  inputUtils.getInput().then((strings) => {
    const totalLength = strings
      .map((s) => s.length)
      .reduce((accum, val) => accum + val, 0);
    const inMemoryLength = strings
      .map((s) => {
        return s
          .replace(/^"/, "")
          .replace(/"$/, "")
          .replace(/\\"/g, "Q")
          .replace(/\\\\/g, "B")
          .replace(/\\x[a-f|0-9][a-f|0-9]/g, "H");
      })
      .map((s, i) => {
        console.log(strings[i], strings[i].length, "==>", s, s.length);
        return s;
      })
      .map((s) => s.length)
      .reduce((accum, val) => accum + val, 0);

    console.log("Total:", totalLength - inMemoryLength);
  });
};

const part2 = () => {
  inputUtils.getInput().then((strings) => {
    const totalLength = strings
      .map((s) => s.length)
      .reduce((accum, val) => accum + val, 0);
    const encodedLength = strings
      .map((s) => {
        return s
          .replace(/\\x[a-f|0-9][a-f|0-9]/g, "\\\\x27")
          .replace(/\\\\/g, "\\\\\\\\") //< this is messing it up
          .replace(/\\"/g, '\\\\\\"')
          .replace(/"$/, '\\""')
          .replace(/^"/, '"\\"');
      })
      .map((s, i) => {
        console.log(strings[i], strings[i].length, "==>", s, s.length);
        return s;
      })
      .map((s) => s.length)
      .reduce((accum, val) => accum + val, 0);

    console.log("Total:", encodedLength - totalLength);
  });
};

part2();
