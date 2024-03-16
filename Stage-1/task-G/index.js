/**
 * G. Ни больше ни меньше
 *
 * Дан массив целых положительных чисел a длины n. Разбейте его на минимально возможное количество отрезков, чтобы
 * каждое число было не меньше длины отрезка которому оно принадлежит. Длиной отрезка считается количество чисел
 * в нем. Разбиение массива на отрезки считается корректным, если каждый элемент принадлежит ровно одному отрезку.
 *
 * Формат ввода:
 * Первая строка содержит одно целое число t (1 ≤ t ≤ 1 000) — количество наборов тестовых данных.
 * Затем следуют t наборов тестовых данных.
 * Первая строка набора тестовых данных содержит одно целое число n (1 ≤ n ≤ 10^5) — длину массива.
 * Следующая строка содержит n целых чисел a[1], a[2], …, a[n] (1 ≤ a[i] ≤ n) — массив a.
 * Гарантируется, что сумма n по всем наборам тестовых данных не превосходит 2 ⋅ 10^5.
 *
 * Формат вывода:
 * Для каждого набора тестовых данных в первой строке выведите число k — количество отрезков в вашем разбиении.
 * Затем в следующей строке выведите k чисел len1, len2, …, lenk
 * [formule-1.png]— длины отрезков в порядке слева направо.
 *
 * Примечания:
 * Ответы в примере соответствуют разбиениям:
 * {[1], [3, 3], [3, 2]}
 * {[1], [9, 8, 7, 6, 7, 8], [9, 9, 9, 9, 9, 9, 9, 9, 9]}
 * {[7, 2], [3, 4, 3], [2, 7]}
 * В первом наборе тестовых данных набор длин {1, 3, 1}, соответствующий разбиению {[1], [3, 3, 3], [2]},
 * также был бы корректным.
 */

function minPieces(setsOfNums) {
    const result = [];

    for (let t = 0; t < setsOfNums.length; t++) {
        const currentSet = setsOfNums[t];
        const currentResult = [];
        result.push(currentResult);
        let min = currentSet[0];
        let lenPiece = 1;
        for (let i = 1; i < currentSet.length; i++) {
            min = Math.min(min, currentSet[i]);
            lenPiece++;
            if (lenPiece > min) {
                min = currentSet[i];
                currentResult.push(lenPiece - 1);
                lenPiece = 1;
            }
        }
        currentResult.push(lenPiece);
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
    const t = readInt();
    const setsOfNums = [];

    for (let i = 0; i < t; i++) {
        const n = readInt();
        setsOfNums.push(readArray());
    }

    const result = minPieces(setsOfNums);

    result.forEach((r) => {
        console.log(r.length);
        console.log(r.join(" "));
    });
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

module.exports = minPieces;
