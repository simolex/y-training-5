/**
 * B. Футбольный комментатор
 *
 * Раунд плей-офф между двумя командами состоит из двух матчей. Каждая команда проводит по одному
 * матчу «дома» и «в гостях». Выигрывает команда, забившая большее число мячей. Если же число
 * забитых мячей совпадает, выигрывает команда, забившая больше мячей «в гостях». Если и это число
 * мячей совпадает, матч переходит в дополнительный тайм или серию пенальти.
 * Вам дан счёт первого матча, а также счёт текущей игры (которая ещё не завершилась). Помогите
 * комментатору сообщить, сколько голов необходимо забить первой команде, чтобы победить, не переводя
 * игру в дополнительное время.
 *
 * Формат ввода:
 * В первой строке записан счёт первого мачта в формате G1:G2, где G1 — число мячей, забитых первой
 * командой, а G2 — число мячей, забитых второй командой.
 * Во второй строке записан счёт второго (текущего) матча в аналогичном формате. Все числа в записи
 * счёта не превышают 5.
 * В третьей строке записано число 1, если первую игру первая команда провела «дома», или 2,
 * если «в гостях».
 *
 * Формат вывода:
 * Выведите единственное целое число "— необходимое количество мячей.
 */

function needGoals(firstScore, secondScore, gamePlace) {
    let [g1Game1, g2Game1] = firstScore.split(":").map((v) => Number(v));
    let [g1Game2, g2Game2] = secondScore.split(":").map((v) => Number(v));

    let countAddGoals = 0;

    if (gamePlace === 1) {
        const sumG1 = g1Game1 * 1000 + g1Game2 * 1001;
        const sumG2 = g2Game1 * 1001 + g2Game2 * 1000;
        countAddGoals = Math.max(countAddGoals, Math.floor((sumG2 - sumG1 + 1001) / 1001));
    } else {
        const sumG1 = g1Game1 * 1001 + g1Game2 * 1000;
        const sumG2 = g2Game1 * 1000 + g2Game2 * 1001;
        countAddGoals = Math.max(countAddGoals, Math.floor((sumG2 - sumG1 + 1000) / 1000));
    }

    return countAddGoals;
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
    const firstScore = readString();
    const secondScore = readString();
    const gamePlace = readInt();

    const result = needGoals(firstScore, secondScore, gamePlace);
    console.log(result);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readString() {
    var str = _inputLines[_curLine].trim(" ");
    _curLine++;
    return str;
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

module.exports = needGoals;
