/**
 * G. Разрушить казарму
 *
 
 *
 * Формат ввода:
 *
 * Формат вывода:

 */

function destroyBarracks(x, y, p) {
    let result = 0;
    let countFoe = 0;

    let fighter = x;

    do {
        x -= countFoe;
        countFoe += p;
        if (x <= 0) {
            return -1;
        }

        fighter = x;
        if (fighter > 0 && y <= fighter / 2) {
            const halfFighters = Math.floor(fighter / 2);
            y -= halfFighters;
            if (y < 0) {
                fighter = fighter - halfFighters - y;
            } else {
                fighter = fighter - halfFighters;
            }
        }

        if (countFoe > 0 && fighter > 0) {
            countFoe -= fighter;

            if (countFoe < 0) {
                fighter = -1 * countFoe;
                countFoe = 0;
            } else {
                fighter = 0;
            }
        }
        if (fighter > 0 && y > 0) {
            y -= fighter;
        }
        result++;
        console.log(x, y, countFoe, fighter);
    } while (x > 0 && y > 0);

    return result;
}

const _readline = require("readline");

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on("line", (line) => {
    _inputLines.push(line);
});

process.stdin.on("end", solve);

function solve() {
    const x = readInt();
    const y = readInt();
    const p = readInt();

    const result = destroyBarracks(x, y, p);
    console.log(result);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .map((num) => Number(num));
    _curLine++;
    return arr;
}

function readEdges(n) {
    let grid = [];
    for (let i = 0; i < n; i++) {
        let vertex = readArray();
        grid.push(vertex);
    }
    return grid;
}

module.exports = destroyBarracks;
