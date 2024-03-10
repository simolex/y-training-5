/**
 * D. Шахматная доска
 *
 * Из шахматной доски по границам клеток выпилили связную (не распадающуюся на части) фигуру без дыр.
 * Требуется определить ее периметр.
 *
 * Формат ввода:
 * Сначала вводится число N (1 ≤ N ≤ 64) – количество выпиленных клеток. В следующих N строках вводятся
 * координаты выпиленных клеток, разделенные пробелом (номер строки и столбца – числа от 1 до 8). Каждая
 * выпиленная клетка указывается один раз.
 *
 * Формат вывода:
 * Выведите одно число – периметр выпиленной фигуры (сторона клетки равна единице).
 */
dx = [-1, 0, 1, 0];
dy = [0, 1, 0, -1];

function calculateThePerimeter(dots) {
    let result = 0;
    let field = [];
    for (let i = 0; i < 10; i++) {
        field.push(new Array(10).fill(false, 0, 10));
    }

    dots.forEach((c) => {
        result += 4;
        const x = c[0];
        const y = c[1];
        field[x][y] = true;

        for (let k = 0; k < 4; k++) {
            if (field[x + dx[k]][y + dy[k]]) {
                result -= 2;
            }
        }
    });

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
    const N = readInt();
    const dots = [];

    for (let i = 0; i < N; i++) {
        dots.push(readArray());
    }

    const result = calculateThePerimeter(dots);
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

module.exports = calculateThePerimeter;
