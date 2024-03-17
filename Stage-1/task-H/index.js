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
    const result1 = [];
    const n = heroRate.length;
    const m = heroRate[0].length;

    const maxByRows = [];
    const maxByColumns = [];

    for (let i = 0; i < n; i++) {
        maxByRows[i] = { value: heroRate[i][0], index: i, indexT: 0 };
    }

    const checkAndSetMax = (holder, index, indexT, current) => {
        if (holder[index].value < current) {
            holder[index] = { value: current, index, indexT };
        }
    };

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            checkAndSetMax(maxByRows, i, j, heroRate[i][j]);
        }
    }

    let maxRow = maxByRows[0];
    for (let i = 1; i < n; i++) {
        if (maxRow.value < maxByRows[i].value) {
            maxRow = maxByRows[i];
        }
    }
    result1.push(maxRow.index + 1);

    let initRow = maxRow.index === 0 ? 1 : 0;
    for (let j = 0; j < m; j++) {
        maxByColumns[j] = { value: heroRate[initRow][j], index: j, indexT: initRow };
    }

    for (let i = 0; i < n; i++) {
        if (i !== maxRow.index) {
            for (let j = 0; j < m; j++) {
                checkAndSetMax(maxByColumns, j, i, heroRate[i][j]);
            }
        }
    }

    let maxColumn = maxByColumns[0];
    for (let j = 1; j < m; j++) {
        if (maxColumn.value < maxByColumns[j].value) {
            maxColumn = maxByColumns[j];
        }
    }
    result1.push(maxColumn.index + 1);

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
