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
    const setByXY = new Map();
    let result = [];

    const addNumber = (set, key, value) => {
        if (!set.has(key)) {
            set.set(key, new Set());
        }

        set.get(key).add(value);
        return;
    };

    coords.forEach(([x, y]) => {
        addNumber(setByXY, x, y);
    });
    coords.length = 0;

    for (const [X, setByY] of setByXY.entries()) {
        for (const Y of setByY.keys()) {
            coords.push([X, Y]);
        }
    }

    const findVertex = (p1, p2) => {
        let noFinded = [];

        const dX = p2[0] - p1[0];
        const dY = p2[1] - p1[1];

        const leftVertex = [];
        leftVertex[0] = p1[0] - dY;
        leftVertex[1] = p1[1] + dX;
        if (!setByXY.has(leftVertex[0]) || !setByXY.get(leftVertex[0]).has(leftVertex[1])) {
            noFinded.push(leftVertex);
        }

        const rightVertex = [];
        rightVertex[0] = p2[0] - dY;
        rightVertex[1] = p2[1] + dX;

        if (!setByXY.has(rightVertex[0]) || !setByXY.get(rightVertex[0]).has(rightVertex[1])) {
            noFinded.push(rightVertex);
        }

        const countNoFinded = noFinded.length;

        if (result[countNoFinded] === undefined) {
            result[countNoFinded] = noFinded;
        }
        return countNoFinded;
    };

    let noFinded;
    let noFindedMin = 3;

    for (let i = 0; i < coords.length && noFindedMin > 0; i++) {
        for (let j = i + 1; j < coords.length && noFindedMin > 0; j++) {
            noFinded = findVertex(coords[i], coords[j]);
            noFindedMin = Math.min(noFindedMin, noFinded);
            noFinded = findVertex(coords[j], coords[i]);
            noFindedMin = Math.min(noFindedMin, noFinded);
        }
    }
    return result[noFindedMin];
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
