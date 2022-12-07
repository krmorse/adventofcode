const inputUtils = require("../utils/input");

const buildFileTree = (inputLines) => {
  const root = { dirs: {}, files: {} };
  let curDir;
  let curCmd;
  inputLines.forEach(cmd => {
    const commandInfo = cmd.split(' ');
    if (commandInfo[0] === "$") {
      if (commandInfo[1] === "cd") {
        curCmd = commandInfo[1];
        if (commandInfo[2] === "/") {
          curDir = root;
        } else {
          curDir = curDir.dirs[commandInfo[2]];
        }
      } else if (commandInfo[1] === "ls") {
        curCmd = commandInfo[1];
      }
    } else if (curCmd === "ls") {
      if (commandInfo[0] === "dir") {
        curDir.dirs[commandInfo[1]] = curDir.dirs[commandInfo[1]] || { curDir, dirs: { "..": curDir }, files: {} };
      } else {
        curDir.files[commandInfo[1]] = parseInt(commandInfo[0], 10);
      }
    }
  });

  return root;
}

const computeSize = (dir) => {
  const fileSize = Object.values(dir.files).reduce((accum, val) => accum + val, 0);
  const directorySize = Object.keys(dir.dirs).filter(d => d !== "..").map(d => computeSize(dir.dirs[d])).reduce((accum, val) => accum + val, 0);
  dir.size = fileSize + directorySize;
  return dir.size;
};

const getDirs = (dir, allDirs) => {
  allDirs.push(dir);
  Object.keys(dir.dirs).filter(d => d !== "..").forEach(d => {
    getDirs(dir.dirs[d], allDirs);
  });
  return allDirs;
};

const part1 = () => {
  inputUtils.getInput().then((inputLines) => {
    const fs = buildFileTree(inputLines);
    computeSize(fs);

    const allDirs = getDirs(fs, []);
    console.log(allDirs.filter(dir => dir.size <= 100000)
      .reduce((accum, val) => accum + val.size, 0));
  });
};

const part2 = () => {
  inputUtils.getInput().then((inputLines) => {
    const fs = buildFileTree(inputLines);
    computeSize(fs);

    const allDirs = getDirs(fs, []);
    allDirs.filter(dir => dir.size <= 100000)
      .reduce((accum, val) => accum + val.size, 0);

    const spaceRequired = 30000000;
    const totalSize = 70000000;
    const spaceAvailable = totalSize - fs.size;
    const additionalSpaceRequired = spaceRequired - spaceAvailable;
    const candidatesForDelete = allDirs.filter(dir => dir.size >= additionalSpaceRequired);
    candidatesForDelete.sort((a, b) => a.size - b.size);

    console.log(candidatesForDelete[0].size);
  });
};

part2();
