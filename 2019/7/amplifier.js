const inputUtils = require('../utils/input');
const intCode = require('./intcode');

const calculateThrust = (program, phases) => {
    let input = 0;
    for(let i = 0; i < phases.length; i++) {
        const output = intCode.compute(program.slice(0), [phases[i], input]);
        input = output;
    }

    return input;
};

inputUtils.getInput().then((input) => {
    const program = input[0].split(',').map(code => parseInt(code, 10));
    let maxThrust = 0;
    for(let phase1 = 0; phase1 < 5; phase1++) {
        for(let phase2 = 0; phase2 < 5; phase2++) {
            if (phase2 == phase1) { continue; }
            for(let phase3 = 0; phase3 < 5; phase3++) {
                if (phase3 == phase1 || phase3 == phase2) { continue; }
                for(let phase4 = 0; phase4 < 5; phase4++) {
                    if (phase4 == phase1 || phase4 == phase2 || phase4 == phase3) { continue; }
                    for(let phase5 = 0; phase5 < 5; phase5++) {
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
