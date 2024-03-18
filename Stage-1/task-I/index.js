/**
 * I. Пираты Баренцева моря
 *
 * Вася играет в настольную игру «Пираты Баренцева моря», которая посвящена морским битвам. Игровое поле представляет
 * собой квадрат из N × N клеток, на котором расположено N кораблей (каждый корабль занимает одну клетку).
 * Вася решил воспользоваться линейной тактикой, для этого ему необходимо выстроить все N кораблей в одном столбце.
 * За один ход можно передвинуть один корабль в одну из четырёх соседних по стороне клеток. Номер столбца, в котором
 * будут выстроены корабли, не важен. Определите минимальное количество ходов, необходимых для построения кораблей
 * в одном столбце. В начале и процессе игры никакие два корабля не могут находиться в одной клетке.
 *
 * Формат ввода:
 * В первой строке входных данных задаётся число N (1 ≤ N ≤ 100).
 * В каждой из следующих N строк задаются координаты корабля:
 * сначала номер строки, затем номер столбца (нумерация начинается с единицы).
 *
 * Формат вывода:
 * Выведите одно число — минимальное количество ходов, необходимое для построения.
 *
 * Примечания:
 * В примере необходимо выстроить корабли в столбце номер 2. Для этого необходимо
 * переставить корабль из клетки 3 3 в клетку 3 2 за один ход, а корабль
 * из клетки 1 1 в клетку 2 2 за два хода. Существуют и другие варианты перестановки кораблей,
 * однако ни в одном из них нет меньше трёх ходов.
 */

function minimalStep(n, ships) {
    let resultFinal = -1;

    for (let medium = 1; medium <= n; medium++) {
        ships.sort((a, b) => a[0] - b[0] || Math.abs(medium - a[1]) - Math.abs(medium - b[1]));

        const resultTest = ships.reduce(
            (result, ship, index) => result + Math.abs(index + 1 - ship[0]) + Math.abs(medium - ship[1]),
            0
        );
        resultFinal = resultFinal === -1 ? resultTest : Math.min(resultTest, resultFinal);
    }

    return resultFinal;
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
    const ships = [];

    for (let i = 0; i < n; i++) {
        ships.push(readArray());
    }

    const result = minimalStep(n, ships);
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

module.exports = minimalStep;
