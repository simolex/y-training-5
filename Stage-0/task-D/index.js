/**
 * D. Слоны и ладьи
 *
 * На шахматной доске стоят слоны и ладьи, необходимо посчитать, сколько клеток не бьется ни одной из фигур.
 * Шахматная доска имеет размеры 8 на 8. Ладья бьет все клетки горизонтали и вертикали, проходящих через клетку,
 * где она стоит, до первой встретившейся фигуры. Слон бьет все клетки обеих диагоналей, проходящих через клетку,
 * где он стоит, до первой встретившейся фигуры.
 *
 * Формат ввода:
 * В первых восьми строках ввода описывается шахматная доска. Первые восемь символов каждой из этих строк описывают
 * состояние соответствующей горизонтали: символ B (заглавная латинская буква) означает, что в клетке стоит слон,
 * символ R — ладья, символ * — что клетка пуста. После описания горизонтали в строке могут идти пробелы, однако
 * длина каждой строки не превышает 250 символов. После описания доски в файле могут быть пустые строки.
 *
 * Формат вывода:
 * Выведите количество пустых клеток, которые не бьются ни одной из фигур.
 */

function whereEmpty(chessBoard) {
    // const allDirections = ["XAxis", "YAxis", "LeftDiag", "RightDiag"];
    const pieces = {
        R: [
            { i: -1, j: 0 },
            { i: 0, j: 1 },
            { i: 1, j: 0 },
            { i: 0, j: -1 },
        ],
        B: [
            { i: -1, j: -1 },
            { i: -1, j: 1 },
            { i: 1, j: 1 },
            { i: 1, j: -1 },
        ],
    };

    const fields = [];
    fields.push(Array(10).fill(" "));
    chessBoard.forEach((str) => {
        const row = Array(1).fill(" ").concat(str.split(""));
        row.push(" ");
        fields.push(row);
    });
    fields.push(Array(10).fill(" "));

    let dI, dJ;
    let canStep;
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const directions = pieces[fields[i][j]];

            if (directions) {
                directions.forEach((delta) => {
                    canStep = true;
                    for (let k = 1; k < 8 && canStep; k++) {
                        dI = i + k * delta.i;
                        dJ = j + k * delta.j;

                        if (["*", "#"].includes(fields[dI][dJ])) {
                            fields[dI][dJ] = "#";
                        } else {
                            canStep = false;
                            continue;
                        }
                    }
                });
            }
        }
    }

    let result = 0;
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            if (fields[i][j] === "*") {
                result++;
            }
        }
    }

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
    const chessBoard = [];

    for (let i = 0; i < 8; i++) {
        chessBoard.push(readString());
    }

    const result = whereEmpty(chessBoard);
    console.log(result);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readString() {
    var str = _inputLines[_curLine].trim(" ");
    _curLine++;
    return str;
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

module.exports = whereEmpty;
