/**
 * A. Быстрый поиск в массиве
 *
 * Дан массив из N целых чисел. Все числа от −10^9 до 10^9.
 * Нужно уметь отвечать на запросы вида “Cколько чисел имеют значения от L до R?”.
 *
 * Формат ввода:
 * Число N (1 ≤ N ≤ 10^5). Далее N целых чисел.Затем число запросов K (1 ≤ K ≤ 10^5).
 * Далее K пар чисел L,R (−10^9 ≤ L ≤ R ≤ 10^9) — собственно запросы.
 *
 * Формат вывода:
 * Выведите K чисел — ответы на запросы.
 *
 * Примечания:
 */

function fastSearch(series, lrRange) {
    const leftSearch = (l, r, target) => {
        while (l < r) {
            const m = l + Math.floor((r - l) / 2);
            if (target <= series[m]) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    };

    const rightSearch = (l, r, target) => {
        while (l < r) {
            const m = l + Math.floor((r - l) / 2);
            if (series[m] <= target) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    };

    series.sort((a, b) => a - b);

    const result = lrRange.map((range) => {
        const r = rightSearch(0, series.length, range[1]);
        const l = leftSearch(0, series.length, range[0]);

        return r - l;
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
    const n = readInt();
    const series = readArray();

    const m = readInt();
    const lrRange = [];
    for (let i = 0; i < m; i++) {
        lrRange.push(readArray());
    }

    const result = fastSearch(series, lrRange);

    console.log(result.join(" "));
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

module.exports = fastSearch;
