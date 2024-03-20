/**
 * B. Анаграмма?
 *
 * Задано две строки, нужно проверить, является ли одна анаграммой другой. Анаграммой называется строка,
 * полученная из другой перестановкой букв.
 *
 * Формат ввода:
 * Строки состоят из строчных латинских букв, их длина не превосходит 100000. Каждая записана в отдельной строке.
 *
 * Формат вывода:
 * Выведите "YES" если одна из строк является анаграммой другой и "NO" в противном случае.
 *
 * Примечания:
 */

function isAnagram(a, b) {
    const letters = new Map();

    if (a.length !== b.length) return false;

    a.split("").forEach((letter) => {
        if (!letters.has(letter)) {
            letters.set(letter, { count: 0 });
        }
        letters.get(letter).count++;
    });

    b.split("").forEach((letter) => {
        if (letters.has(letter)) {
            letters.get(letter).count--;
        } else return false;
    });

    if (
        letters.size > 0 &&
        [...letters.values()].reduce((sum, lett) => Math.abs(lett.count) + sum, 0) !== 0
    ) {
        return false;
    }

    return true;
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
    const a = readString();
    const b = readString();

    const result = isAnagram(a, b);
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

module.exports = isAnagram;
