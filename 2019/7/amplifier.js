const inputUtils = require('../utils/input');
const intCode = require('./intcode');

const calculateThrust = (program, phases) => {
    let input = 0, i = 0;
    const amplifiers = phases.map(p => intCode.createComputer(program.slice(0)));
    const done = [];
    while(done.length < phases.length) {
        const index = i % amplifiers.length;
        const inputs = i < amplifiers.length ? [phases[i], input] : [input];
        const software = amplifiers[index];
        const result = software(inputs);
        input = result.output;
        if (result.done) {
            done.push(index);
        }
        i++;
    }

    return input;
};

inputUtils.getInput().then((input) => {
    const program = input[0].split(',').map(code => parseInt(code, 10));
    let maxThrust = 0;
    for(let phase1 = 5; phase1 < 10; phase1++) {
        for(let phase2 = 5; phase2 < 10; phase2++) {
            if (phase2 == phase1) { continue; }
            for(let phase3 = 5; phase3 < 10; phase3++) {
                if (phase3 == phase1 || phase3 == phase2) { continue; }
                for(let phase4 = 5; phase4 < 10; phase4++) {
                    if (phase4 == phase1 || phase4 == phase2 || phase4 == phase3) { continue; }
                    for(let phase5 = 5; phase5 < 10; phase5++) {
                        if (phase5 == phase1 || phase5 == phase2 || phase5 == phase3 || phase5 == phase4) { continue; }
                        const thrust = calculateThrust(program, [phase1, phase2, phase3, phase4, phase5]);
                        if (thrust > maxThrust) {
                            maxThrust = thrust;
                        }
                    }
                }
            }
        }
    }

    console.log('max thrust:', maxThrust);
});
