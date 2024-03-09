/**
 * B. Продавец рыбы
 *
 * Вася решил заняться торговлей рыбой. С помощью методов машинного обучения он предсказал цены на рыбу
 * на N дней вперёд. Он решил, что в один день он купит рыбу, а в один из следующих дней — продаст
 * (то есть совершит или ровно одну покупку и продажу или вообще не совершит покупок и продаж, если это
 * не принесёт ему прибыли). К сожалению, рыба — товар скоропортящийся и разница между номером дня продажи
 * и номером дня покупки не должна превышать K.
 * Определите, какую максимальную прибыль получит Вася.
 *
 * Формат ввода:
 * В первой строке входных данных задаются числа N и K (1 ≤ N ≤ 10000, 1 ≤ K ≤ 100).
 * Во второй строке задаются цены на рыбу в каждый из N дней. Цена — целое число, которое может находится
 * в пределах от 1 до 10^9.
 *
 * Формат вывода:
 * Выведите одно число — максимальную прибыль, которую получит Вася.
 */

function getMaxRevenue(N, K, price) {
    let maxRevenue = 0;
    for (let i = 0; i < N - 1; i++) {
        let min = price[i];
        let max = price[i + 1];
        for (let j = 1; j <= K && i + j < N; j++) {
            max = Math.max(price[i + j], max);
        }

        maxRevenue = Math.max(maxRevenue, max - min);
    }

    return maxRevenue;
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
    const line = readArray();
    const N = line[0];
    const K = line[1];
    const price = readArray();

    const result = getMaxRevenue(N, K, price);
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

module.exports = getMaxRevenue;
