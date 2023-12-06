const part1 = async () => {
  const input = [
    { time: 71, distance: 202 },
    { time: 82, distance: 1076 },
    { time: 69, distance: 1138 },
    { time: 81, distance: 1458 }
  ];

  const options = input.map((race) => {
    let valid = 0;
    for (let i = 1; i < race.time && i <= race.distance / 2 + 1; i++) {
      if (i * (race.time - i) > race.distance) {
        valid++;
      }
    }
    return valid;
  });
  console.log(options.reduce((result, o) => result * o, 1));
};


const part2 = async () => {
  const race = { time: 44826981, distance: 202107611381458 };
  let valid = 0;
  for (let i = 1; i < race.time && i <= race.distance / 2 + 1; i++) {
    if (i * (race.time - i) > race.distance) {
      valid++;
    }
  }
  console.log(valid);
};

part2();
