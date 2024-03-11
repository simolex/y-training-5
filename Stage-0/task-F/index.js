/**
 * F. Миша и математика
 *
 * Миша сидел на занятиях математики в Высшей школе экономики и решал следующую задачу: дано n целых чисел и нужно
 * расставить между ними знаки + и × так, чтобы результат полученного арифметического выражения был нечётным
 * (например, между числами 5, 7, 2, можно расставить арифметические знаки следующим образом: 5×7+2=37). Так как
 * примеры становились все больше и больше, а Миша срочно убегает в гости, от вас требуется написать программу
 * решающую данную задачу.
 *
 * Формат ввода:
 * В первой строке содержится единственное число n (2 ≤ n ≤ 10^5). Во второй строке содержится n целых чисел a[i],
 * разделённых пробелами (−10^9 ≤ a[i] ≤ 10^9). Гарантируется, что решение существует.
 *
 * Формат вывода:
 * В одной строке выведите n−1 символ + или ×, в результате применения которых получается нечётный результат.
 * (Для вывода используйте соответственно знаки «+» (ASCII код—43) и «x» (ASCII код—120), без кавычек).
 */

function plusAndTimes(nums) {
    const n = nums.length;
    const result = new Array(n - 1).fill("+");
    let firstOddIndex = -1;
    let oddCount = 0;
    let evenCount = 0;

    nums.forEach((v, i) => {
        if (v % 2 === 0) {
            evenCount++;
        } else {
            oddCount++;
            if (firstOddIndex === -1) firstOddIndex = i;
        }
    });
    if (oddCount % 2 === 0) {
        if (firstOddIndex < n - 1) {
            result[firstOddIndex] = "x";
        } else {
            result[firstOddIndex - 2] = "x";
        }
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
    const nums = readArray();

    const result = plusAndTimes(nums);
    console.log(result.join(""));
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

module.exports = plusAndTimes;
