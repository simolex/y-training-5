/**
 * C. Удаление чисел
 *
 * Дан массив a из n чисел. Найдите минимальное количество чисел, после удаления которых попарная разность
 * оставшихся чисел по модулю не будет превышать 1, то есть после удаления ни одно число не должно отличаться
 * от какого-либо другого более чем на 1.
 *
 * Формат ввода:
 * Первая строка содержит одно целое число n (1 ≤ n ≤ 2⋅10^5) — количество элементов массива a. Вторая строка
 * содержит n целых чисел a[1],a[2],…,a[n] (0 ≤ a[i] ≤ 10^5) — элементы массива a.
 *
 * Формат вывода:
 * Выведите одно число — ответ на задачу.
 *
 * Примечания:
 */

function countOverNumber(numbers) {
    const numSet = new Map();

    numbers.forEach((num) => {
        if (!numSet.has(num)) {
            numSet.set(num, { count: 0 });
        }
        numSet.get(num).count++;
    });
    const uniqNums = [...numSet.keys()];

    uniqNums.sort((a, b) => a - b);

    if (uniqNums.length === 1) return 0;

    let maxNums = 0;
    for (let i = 1; i < uniqNums.length; i++) {
        if (uniqNums[i] - uniqNums[i - 1] === 1) {
            maxNums = Math.max(
                maxNums,
                numSet.get(uniqNums[i]).count + numSet.get(uniqNums[i - 1]).count
            );
        }
    }

    return maxNums > 0 ? numbers.length - maxNums : numbers.length - 1;
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
    const n = readInt();
    const numbers = readArray();

    const result = countOverNumber(numbers);
    console.log(result);
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

module.exports = countOverNumber;
