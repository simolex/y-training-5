/**
 * H. Наилучший запрет
 *
 * Константин и Михаил играют в настольную игру «Ярость Эльфов». В игре есть n рас и m классов персонажей.
 * Каждый персонаж характеризуется своими расой и классом. Для каждой расы и каждого класса существует ровно один
 * персонаж такой расы и такого класса. Сила персонажа i-й расы и j-го класса равна ai j, и обоим игрокам это прекрасно
 * известно.
 * Сейчас Константин будет выбирать себе персонажа. Перед этим Михаил может запретить одну расу и один класс,
 * чтобы Константин не мог выбирать персонажей, у которых такая раса или такой класс. Конечно же, Михаил старается,
 * чтобы Константину достался как можно более слабый персонаж, а Константин, напротив, выбирает персонажа посильнее.
 * Какие расу и класс следует запретить Михаилу?
 *
 * Формат ввода:
 * Первая строка содержит два целых числа n и m (2 ≤ n,m ≤ 1000) через пробел — количество рас и классов
 * в игре «Ярость Эльфов», соответственно.
 * В следующих n строках содержится по m целых чисел через пробел. j-е число i-й из этих строк — это a[i, j]
 * (1 ≤ a[i, j] ≤ 10^9).
 *
 * Формат вывода:
 * В единственной строке выведите два целых числа через пробел — номер расы и номер класса, которые следует запретить
 * Михаилу. Расы и классы нумеруются с единицы. Если есть несколько возможных ответов, выведите любой из них.
 *
 * Примечания:
 */

function bestDeny(heroRate) {
    const n = heroRate.length;
    const m = heroRate[0].length;

    const getMaxPower = (lockRow = -1, lockColumn = -1) => {
        let maxI, maxJ;
        let maxValue = -1;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (i === lockRow || j === lockColumn) {
                    continue;
                }
                if (heroRate[i][j] > maxValue) {
                    maxValue = heroRate[i][j];
                    (maxI = i), (maxJ = j);
                }
            }
        }
        return [maxI, maxJ, maxValue];
    };

    const [zeroMaxRow, zeroMaxColumn] = getMaxPower();
    const [_1, nextMaxColumn] = getMaxPower(zeroMaxRow);
    const [nextMaxRow, _2] = getMaxPower(-1, zeroMaxColumn);

    const [__01, _02, maxRestPower_1] = getMaxPower(zeroMaxRow, nextMaxColumn);
    const [__11, _12, maxRestPower_2] = getMaxPower(nextMaxRow, zeroMaxColumn);

    return maxRestPower_1 < maxRestPower_2
        ? [zeroMaxRow + 1, nextMaxColumn + 1]
        : [nextMaxRow + 1, zeroMaxColumn + 1];
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
    const params = readArray();
    const n = params[0];
    const heroRate = [];

    for (let i = 0; i < n; i++) {
        heroRate.push(readArray());
    }

    const result = bestDeny(heroRate);
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

module.exports = bestDeny;
