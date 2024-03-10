/**
 * C. Форматирование файла
 *
 * Петя - начинающий программист. Сегодня он написал код из n строк.К сожалению оказалось, что этот код трудно читать.
 * Петя решил исправить это, добавив в различные места пробелы. А точнее, для i-й строки ему нужно добавить
 * ровно a[i] пробелов.
 * Для добавления пробелов Петя выделяет строку и нажимает на одну из трёх клавиш: Space, Tab, и Backspace.
 * При нажатии на Space в строку добавляется один пробел. При нажатии на Tab в строку добавляются четыре пробела.
 * При нажатии на Backspace в строке удаляется один пробел.
 * Ему хочется узнать, какое наименьшее количество клавиш придётся нажать, чтобы добавить необходимое количество
 * пробелов в каждую строку.
 * Помогите ему!
 *
 * Формат ввода:
 * Первая строка входных данных содержит одно целое положительное число n (1 ≤ n ≤ 10^5) – количество строк в файле.
 * Каждая из следующих n строк содержит одно целое неотрицательное число a[i] (0 ≤ a[i] ≤ 10^9) – количество пробелов,
 * которые нужно добавить в i-ю строку файла.
 *
 * Формат вывода:
 * Выведите одно число – минимальное количество нажатий, чтобы добавить в каждой строке необходимое количество пробелов.
 */

function minPressKey(needSpaces) {
    let press = 0;

    needSpaces.forEach((s) => {
        const intCount = Math.floor(s / 4);
        let restCount = s % 4;
        if (restCount === 3) {
            restCount = 2;
        }
        press += intCount + restCount;
    });

    return press;
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
    const needSpaces = [];
    for (let i = 0; i < n; i++) {
        needSpaces.push(readInt());
    }

    const result = minPressKey(needSpaces);
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

module.exports = minPressKey;
