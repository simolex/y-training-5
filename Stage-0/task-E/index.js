/**
 * E. Прибыльный стартап
 *
 * k друзей организовали стартап по производству укулеле для кошек. На сегодняшний день прибыль составила n рублей.
 * Вы, как главный бухгалтер компании, хотите в каждый из ближайших d дней приписывать по одной цифре в конец числа,
 * выражающего прибыль. При этом в каждый из дней прибыль должна делиться на k.
 *
 * Формат ввода:
 * В единственной строке входных данных через пробел записаны три числа: n, k, d — изначальная прибыль, количество
 * учредителей компании и количество дней, которое вы собираетесь следить за прибылью (1 ≤ n,k ≤ 10^9,1 ≤ d ≤ 10^5).
 * НЕ гарантируется, что n делится на k.
 *
 * Формат вывода:
 * Выведите одно целое число x — прибыль компании через d дней. Первые цифры числа x должны совпадать с числом n.
 * Все префиксы числа x, которые длиннее числа n на 1,2,…,d цифр, должны делиться на k. Если возможных ответов
 * несколько, выведите любой из них. Если ответа не существует, выведите −1.
 */

function testStartup(n, k, d) {
    let result = -1;
    let currentGain = n * 10;
    let isValid = false;
    for (let j = 0; j < 10; j++) {
        if (currentGain % k === 0) {
            isValid = true;
            break;
        }
        currentGain++;
    }

    return isValid ? currentGain + "0".repeat(d - 1) : result;
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
    const params = readArray();
    const n = params[0];
    const k = params[1];
    const d = params[2];

    const result = testStartup(n, k, d);
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

module.exports = testStartup;
