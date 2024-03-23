/**
 * E. Нумерация дробей
 *
 * Поле в игре в одномерный морской бой имеет размеры 1×n. Ваша задача — найти такое максимальное k,
 * что на поле можно расставить один корабль размера 1×k, два корабля размера 1×(k−1), …, k кораблей размера 1×1,
 * причем корабли, как и в обычном морском бое, не должны касаться друг друга и пересекаться.
 *
 * Формат ввода:
 * В единственной строке входных данных дано число n — количество клеток поля (0 ≤ n ≤ 10^18).
 *
 * Формат вывода:
 * Выведите K чисел — ответы на запросы.
 *
 * Примечания:
 */

function numDecimal(num) {
    const rightSearch = (l, r, fn) => {
        let m;
        while (l < r) {
            m = l + (r - l + 1n) / 2n;
            if (fn(m)) {
                l = m;
            } else {
                r = m - 1n;
            }
        }
        return l;
    };

    const calcRow = (k) => (k * (k + 1n)) / 2n;

    const oddEvenRow = rightSearch(0n, num, (m) => {
        const r = calcRow(m);
        return num >= r;
    });

    const rest = num - calcRow(oddEvenRow);

    // const nextLoop = calcRow(oddEvenRow + 1n) - calcRow(oddEvenRow);
    const result = [];
    if (oddEvenRow % 2n === 0n) {
        if (rest === 0n) {
            result[0] = 1n;
            result[1] = oddEvenRow;
        } else {
            result[0] = rest;
            result[1] = oddEvenRow + 2n - rest;
        }
    } else {
        if (rest === 0n) {
            result[0] = oddEvenRow;
            result[1] = 1n;
        } else {
            result[0] = oddEvenRow + 2n - rest;
            result[1] = rest;
        }
    }
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
    const num = readBigInt();

    const result = numDecimal(num);

    console.log(result.map((n) => n.toString()).join("/"));
}

function readAllString() {
    var arr = _inputLines.map((line) => line.trim());

    return arr;
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
function readBigInt() {
    const n = BigInt(_inputLines[_curLine]);
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

module.exports = numDecimal;
