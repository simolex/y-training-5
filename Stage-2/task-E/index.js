/**
 * E. Два из трех
 *
 * Вам даны три списка чисел. Найдите все числа, которые встречаются хотя бы в двух
 * из трёх списков.
 *
 * Формат ввода:
 * Во входных данных описывается три списка чисел. Первая строка каждого описания списка состоит
 * из длины списка n (1 ≤ n ≤ 1000). Вторая строка описания содержит список натуральных чисел,
 * записанных через пробел. Числа не превосходят 10^9.
 *
 * Формат вывода:
 * Выведите все числа, которые содержатся хотя бы в двух списках из трёх, в порядке возрастания.
 * Обратите внимание, что каждое число необходимо выводить только один раз.
 *
 * Примечания:
 */

function twoFromThree(rows) {
    let result = [];
    const numSet = new Map();

    const addNumber = (num) => {
        if (!numSet.has(num)) {
            numSet.set(num, { count: 0 });
        }

        numSet.get(num).count++;
    };

    rows.forEach((row) => {
        const currentSet = new Set();

        row.forEach((v) => currentSet.add(v));
        currentSet.forEach((v) => addNumber(v));
    });

    for (let [num, count] of numSet) {
        if (count.count > 1) {
            result.push(num);
        }
    }

    result.sort((a, b) => a - b);

    return result;
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
    const rows = [];

    for (let i = 0; i < 3; i++) {
        const n = readInt();
        rows.push(readArray());
    }
    const result = twoFromThree(rows);
    console.log(result.join(" "));
}

function readString() {
    var str = _inputLines[_curLine].trim(" ");
    _curLine++;
    return str;
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
function readStringArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .filter((str) => str && str.length > 0);
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

module.exports = twoFromThree;
