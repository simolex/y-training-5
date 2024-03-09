/**
 * C. Петя, Маша и верёвочки
 *
 * На столе лежали две одинаковые верёвочки целой положительной длины.
 * Петя разрезал одну из верёвочек на N частей, каждая из которых имеет целую положительную длину, так что
 * на столе стало N+1 верёвочек. Затем в комнату зашла Маша и взяла одну из лежащих на столе верёвочек.
 * По длинам оставшихся на столе N верёвочек определите, какую наименьшую длину может иметь верёвочка, взятая
 * Машей.
 *
 * Формат ввода:
 * Первая строка входных данных содержит одно целое число N — количество верёвочек, оставшихся на столе
 * (2 ≤ N ≤ 1000). Во второй строке содержится N целых чисел l[i] — длины верёвочек (1 ≤ l[i] ≤ 1000).
 *
 * Формат вывода:
 * Выведите одно целое число — наименьшую длину, которую может иметь верёвочка, взятая Машей.
 */

function lengthGettedPart(parts) {
    let maxParts = parts[0];
    let summuryLength = 0;
    for (let i = 1; i < parts.length; i++) {
        if (parts[i] > maxParts) {
            summuryLength += maxParts;
            maxParts = parts[i];
        } else {
            summuryLength += parts[i];
        }
    }
    return maxParts > summuryLength ? maxParts - summuryLength : maxParts + summuryLength;
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
    const N = readInt();
    const parts = readArray();

    const result = lengthGettedPart(parts);
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

module.exports = lengthGettedPart;
