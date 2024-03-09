/**
 * A. Минимальный прямоугольник
 *
 * На клетчатой плоскости закрашено K клеток. Требуется найти минимальный по площади прямоугольник,
 * со сторонами, параллельными линиям сетки, покрывающий все закрашенные клетки.
 *
 * Формат ввода:
 * Во входном файле, на первой строке, находится число K (1 ≤ K ≤ 100). На следующих K строках находятся
 * пары чисел X[i] и Y[i] — координаты закрашенных клеток (|X[i]|, |Y[i]| ≤ 10^9).
 *
 * Формат вывода:
 * Выведите в выходной файл координаты левого нижнего и правого верхнего углов прямоугольника.
 */

function getMinimalRect(coords) {
    const result = [coords[0][0], coords[0][1], coords[0][0], coords[0][1]];

    for (let i = 1; i < coords.length; i++) {
        result[0] = Math.min(result[0], coords[i][0]);
        result[1] = Math.min(result[1], coords[i][1]);
        result[2] = Math.max(result[2], coords[i][0]);
        result[3] = Math.max(result[3], coords[i][1]);
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
    const n = readInt();
    const coords = [];

    for (let i = 0; i < n; i++) {
        const xy = readArray();
        coords.push([xy[0], xy[1]]);
    }

    const result = getMinimalRect(coords);
    console.log(result.join(" "));
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

module.exports = getMinimalRect;
