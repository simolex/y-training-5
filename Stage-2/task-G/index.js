/**
 * G. Построить квадрат
 *
 * Задано множество, состоящее из N различных точек на плоскости. Координаты всех точек — целые числа.
 * Определите, какое минимальное количество точек нужно добавить во множество, чтобы нашлось четыре
 * точки, лежащие в вершинах квадрата.
 *
 * Формат ввода:
 * В первой строке вводится число N (1 ≤ N ≤ 2000) — количество точек.
 * В следующих N строках вводится по два числа xi, yi (-10^8 ≤ xi, yi ≤ 10^8) — координаты точек.
 *
 * Формат вывода:
 * В первой строке выведите число K — минимальное количество точек, которые нужно добавить во множество.
 * В следующих K строках выведите координаты добавленных точек xi, yi через пробел. Координаты должны
 * быть целыми и не превышать 10^9 по модулю.
 * Если решений несколько — выведите любое из них.
 *
 * Примечания:
 */

function findSquare(coords) {
    const setByX = new Map();
    const setByY = new Map();

    const addNumber = (set, key, value) => {
        if (!set.has(key)) {
            set.set(key, new Set());
        }

        set.get(key).add(value);
        return;
    };

    coords.forEach(([x, y]) => {
        addNumber(setByX, x, y);
        addNumber(setByY, y, x);
    });

    console.log(setByX);
    console.log(setByY);

    return [];
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
    coords = [];
    const n = readInt();
    for (let i = 0; i < n; i++) {
        coords.push(readArray());
    }

    const result = findSquare(coords);
    console.log(result.length);
    if (result.length > 0) {
        console.log(result.map((v) => v.join(" ")).join("\n"));
    }
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

module.exports = findSquare;
