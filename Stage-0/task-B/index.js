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
// const event = {
//     onPainting: 1,
//     offPainting: 2,
// };

// function countPaintedTree(P, V, Q, M) {
//     let treeCount = 0;
//     const tasks = [];
//     tasks.push({
//         treeNum: P - V,
//         eventTree: event.onPainting,
//     });
//     tasks.push({
//         treeNum: P + V,
//         eventTree: event.offPainting,
//     });
//     tasks.push({
//         treeNum: Q - M,
//         eventTree: event.onPainting,
//     });
//     tasks.push({
//         treeNum: Q + M,
//         eventTree: event.offPainting,
//     });

//     tasks.sort((a, b) => a.treeNum - b.treeNum || a.eventTree - b.eventTree);
//     let painter = 1;
//     let startNum = tasks[0].treeNum;

//     for (let i = 1; i < tasks.length; i++) {
//         if (tasks[i].eventTree === event.onPainting) {
//             if (painter === 0) {
//                 startNum = tasks[i].treeNum;
//             }
//             painter++;
//         }
//         if (tasks[i].eventTree === event.offPainting) {
//             painter--;
//             if (painter === 0) {
//                 treeCount += tasks[i].treeNum - startNum + 1;
//             }
//         }
//     }

//     return treeCount;
// }

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
    const firstLine = readArray();
    const P = firstLine[0];
    const V = firstLine[1];
    const secondLine = readArray();
    const Q = secondLine[0];
    const M = secondLine[1];

    const result = countPaintedTree(P, V, Q, M);
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

module.exports = countPaintedTree;
