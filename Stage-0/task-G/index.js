/**
 * G. Разрушить казарму
 *
 
 *
 * Формат ввода:
 *
 * Формат вывода:

 */
function strategyAttack(minLevelBarracks, x, y, p) {
    let countSteps = 0;
    let countFoe = 0;

    while (y >= minLevelBarracks) {
        if (countFoe >= x) {
            return Infinity;
        }

        y -= x - countFoe;

        countFoe = 0;
        if (y > 0) {
            countFoe = p;
        }

        countSteps++;
    }
    while (y > 0) {
        if (x <= 0) {
            return Infinity;
        }

        if (y >= x) {
            y -= x;
        } else {
            countFoe -= x - y;
            y = 0;
        }

        x -= countFoe;
        if (y > 0) {
            countFoe += p;
        }

        countSteps++;
    }

    while (countFoe > 0) {
        if (x <= 0) {
            return Infinity;
        }

        countFoe -= x;
        if (countFoe > 0) {
            x -= countFoe;
        }

        countSteps++;
    }
    return countSteps;
}

function destroyBarracks(x, y, p) {
    let result = Infinity;

    for (let i = 0; i <= y; i++) {
        result = Math.min(strategyAttack(i, x, y, p), result);
    }

    return result < Infinity ? result : -1;
}

const _readline = require("readline");

const _reader = _readline.createInterface({
    input: process.stdin,
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
