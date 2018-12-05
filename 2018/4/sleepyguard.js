const inputUtils = require('../utils/input');

function buildLog(input) {
    const log = {};
    let activeId, asleepAt;

    input.sort();
    input.forEach(function(spec) {
        const match = spec.match(/\[(.*) \d+\:(\d+)\] (.*)/);
        const [ , date, minute, action] = match;
        const guardStart = action.match(/Guard \#(\d+) begins shift/);

        if (guardStart) {
            const [, id] = guardStart;
            activeId = id;
        } else if (action === 'falls asleep') {
            asleepAt = parseInt(minute, 10);
        } else if (action === 'wakes up') {
            log[activeId] = log[activeId] || {};
            log[activeId][date] = log[activeId][date] || [];
            const awakeAt = parseInt(minute, 10);
            for (let m = asleepAt; m < awakeAt; m++) {
                log[activeId][date].push(m);
            }
        }
    });

    return log;
}

function findSleepiestGuard(log) {
    let sleepiest, sleepiestTotal = 0;
    Object.keys(log).forEach(function(id) {
        const guardLog = log[id];
        const sleepTotal = Object.values(guardLog).reduce(function(accum, sleepLog) {
            return accum + sleepLog.length;
        }, 0);
        if (sleepTotal > sleepiestTotal) {
            sleepiest = id;
            sleepiestTotal = sleepTotal;
        }
    });

    return sleepiest;
}

function findSleepiestMinute(log) {
    const counts = {};
    Object.values(log).forEach(function(sessionLog) {
        sessionLog.forEach(function(minute) {
            counts[minute] = (counts[minute] || 0) + 1;
        });
    });

    let max, maxCount = 0;
    Object.keys(counts).forEach(function(count) {
        if (counts[count] > maxCount) {
            max = count;
            maxCount = counts[count];
        }
    });

    return [ max, maxCount ];
}

function findOverallSleepiestGuardMinute(log) {
    let id, min, max = 0;
    Object.keys(log).forEach(function(guardId) {
        const [minute, count] = findSleepiestMinute(log[guardId]);
        if (count > max) {
            id = guardId;
            min = minute;
            max = count;
        }
    });

    return [ id, min];
}

inputUtils.getInput().then(function(input) {
    const log = buildLog(input);

    const sleepiestGuard = findSleepiestGuard(log);
    console.log(`Sleepiest guard: #${sleepiestGuard}`);

    const [ sleepiestMinute ] = findSleepiestMinute(log[sleepiestGuard]);
    console.log(`Sleepiest minute: #${sleepiestMinute}`);

    console.log('Part 1 Answer:', sleepiestGuard * sleepiestMinute);

    const [ guardId, minute ] = findOverallSleepiestGuardMinute(log);
    console.log('Part 2 Answer:', parseInt(guardId) * minute);
});