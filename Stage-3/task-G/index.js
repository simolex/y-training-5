/**
 * G. Кролик учит геометрию
 *
 * Сервис Тындекс.Плюс так быстро растет, что для сотрудников и серверов потребовалось потребовалось построить новый
 * офис.Участок под застройку представляет из себя клетчатое поле n×m, часть клеток которого пригодна для строительства,
 * а часть нет.Новый офис должен выглядеть как знак "плюс"какого-то целого положительного размера k. Знак "плюс"
 * размера k  — это такая клетчатая фигура, состоящая из пяти квадратов k×k клеток, при этом есть один центральный
 * квадрат, а остальные четыре являются его соседями по стороне. Новый офис должен быть как можно больше, поэтому
 * необходимо найти максимальное k, такое что офис удастся разместить на участке под застройку.Определите максимальное k.
 * Гарантируется, что он можно построить офис хотя бы с k=1.
 *
 * Формат ввода:
 * В первой строке задано два целых числа n и m (1 ≤ n,m ≤ 2000) — длина и ширина участка под застройку.
 * В каждой из последующих n строк задана строка, состоящая из m символов, j-й символ в i-й строке равен "#",
 * если клетка с координатами (i,j) пригодна для строительства и "." иначе.
 *
 * Формат вывода:
 * Выведите одно целое положительное число — максимально возможное k.
 */

function getMaxPlus(n, m, constructionSite) {
    const amounts = [];
    const getSum = (i_1, j_1, i_2, j_2) => {
        return amounts[i_2][j_2] - amounts[i_1 - 1][j_2] - amounts[i_2][j_1 - 1] + amounts[i_1 - 1][j_1 - 1];
    };
    const getHashPointSite = (i, j) => (constructionSite[i].charAt(j) === "#" ? 0 : 1);

    const getSumPlus = (i, j, size) => {
        i -= size;
        j -= size;
        return (
            getSum(i, j + size, i + size * 3 - 1, j + size * 2 - 1) +
            getSum(i + size, j, i + size * 2 - 1, j + size * 3 - 1)
            // -getSum(i + size, j + size, i + size * 2 - 1, j + size * 2 - 1)
        );
    };

    for (let i = 0; i <= n; i++) {
        amounts[i] = [];
        for (let j = 0; j <= m; j++) {
            if (i !== 0 && j !== 0) {
                amounts[i][j] =
                    amounts[i - 1][j] + amounts[i][j - 1] - amounts[i - 1][j - 1] + getHashPointSite(i - 1, j - 1);
            } else {
                amounts[i][j] = 1;
            }
        }
    }
    let max = 0;

    for (let i = 2; i <= n - 1; i++) {
        for (let j = 2; j <= m - 1; j++) {
            let l = 1;
            let r = Math.min(Math.floor((n - i + 1) / 2), Math.floor((m - j + 1) / 2), i - 1, j - 1);
            let med;
            while (l < r) {
                med = Math.ceil((l + r) / 2);
                if (med > 0 && getSumPlus(i, j, med) === 0) {
                    l = med;
                } else {
                    r = med - 1;
                }
            }

            if (l > 0) max = Math.max(max, l);
        }
    }
    return max;
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
    const params = readArray();
    const n = params[0];
    const m = params[1];

    const constructionSite = [];
    for (let i = 0; i < n; i++) {
        constructionSite.push(readString());
    }
    const result = getMaxPlus(n, m, constructionSite);

    console.log(result);
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
function readBigInt() {
    const n = BigInt(_inputLines[_curLine]);
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

function readBigIntArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .map((num) => BigInt(num));
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

module.exports = getMaxPlus;
