const readline = require('readline');

function getInput() {
    return new Promise(function(resolve, reject) {
        const lines = [];
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        
        rl.on('line', function (line) {
            lines.push(line);
        });
        
        rl.on('close', function () {
            resolve(lines);
        });
    });

    //TODO: error handling?
}

module.exports = {
    getInput
};
