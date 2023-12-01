import { createInterface } from 'readline';
import { question } from 'readline-sync';

export const prompt = (message) => question(message);

export const getInput = async () => {
    return new Promise(function(resolve, reject) {
        const lines = [];
        const rl = createInterface({
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