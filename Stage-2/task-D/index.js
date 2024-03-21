/**
 * D. Повторяющееся число
 *
 * Вам дана последовательность измерений некоторой величины. Требуется определить, повторялась ли какое-либо
 * число, причём расстояние между повторами не превосходило k.
 *
 * Формат ввода:
 * В первой строке задаются два числа n и k (1 ≤ n, k ≤ 10^5).
 * Во второй строке задаются n чисел, по модулю не превосходящих 10^9.
 *
 * Формат вывода:
 * Выведите YES, если найдется повторяющееся число и расстояние между повторами не превосходит k
 * и NO в противном случае.
 *
 * Примечания:
 */

function isRepeatedKNumber(k, numbers) {
    const numSet = new Map();

    const addNumber = (num) => {
        if (!numSet.has(num)) {
            numSet.set(num, { count: 0 });
        }

        numSet.get(num).count++;
    };

    const delNumber = (num) => {
        // Проверка наличия не требуется
        numSet.get(num).count--;
        if (numSet.get(num).count === 0) {
            numSet.delete(num);
        }
    };

    let result = false;
    let range = 0;

    numbers.forEach((num, index) => {
        if (range <= k && numSet.has(num)) {
            result = result || true;
        }

        addNumber(num);
        range++;
        if (range === k + 1) {
            delNumber(numbers[index - k]);
            range--;
        }
    });

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
    const params = readArray();
    const n = params[0];
    const k = params[1];
    const numbers = readArray();

    const result = isRepeatedKNumber(k, numbers);
    console.log(result ? "YES" : "NO");
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

module.exports = isRepeatedKNumber;
