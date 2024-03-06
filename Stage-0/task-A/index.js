/**
 * A. Покраска деревьев
 *
 * Вася и Маша участвуют в субботнике и красят стволы деревьев в белый цвет. Деревья растут
 * вдоль улицы через равные промежутки в 1 метр. Одно из деревьев обозначено числом ноль,
 * деревья по одну сторону занумерованы положительными числами  1 ,2  и т.д.,
 * а в другую — отрицательными  − 1 , − 2  и т.д.
 * Ведро с краской для Васи установили возле дерева P, а для Маши — возле дерева Q.
 * Ведра с краской очень тяжелые и Вася с Машей не могут их переставить, поэтому они окунают
 * кисть в ведро и уже с этой кистью идут красить дерево. Краска на кисти из ведра Васи засыхает,
 * когда он удаляется от ведра более чем на V метров, а из ведра Маши — на M метров. Определите,
 * сколько деревьев может быть покрашено.
 *
 * Формат ввода:
 * В первой строке содержится два целых числа P и V — номер дерева, у которого стоит ведро Васи и
 * на сколько деревьев он может от него удаляться.В второй строке содержится два целых
 * числа Q и M — аналогичные данные для Маши.
 * Все числа целые и по модулю не превосходят 10^8.
 *
 * Формат вывода:
 * Выведите одно число — количество деревьев, которые могут быть покрашены.
 */
const event = {
    onPainting: 1,
    offPainting: 2,
};

function countPaintedTree(P, V, Q, M) {
    let treeCount = 0;
    const tasks = [];
    tasks.push({
        treeNum: P - V,
        eventTree: event.onPainting,
    });
    tasks.push({
        treeNum: P + V,
        eventTree: event.offPainting,
    });
    tasks.push({
        treeNum: Q - M,
        eventTree: event.onPainting,
    });
    tasks.push({
        treeNum: Q + M,
        eventTree: event.offPainting,
    });

    tasks.sort((a, b) => a.treeNum - b.treeNum || a.eventTree - b.eventTree);
    let painter = 1;
    let startNum = tasks[0].treeNum;

    for (let i = 1; i < tasks.length; i++) {
        if (tasks[i].eventTree === event.onPainting) {
            if (painter === 0) {
                startNum = tasks[i].treeNum;
            }
            painter++;
        }
        if (tasks[i].eventTree === event.offPainting) {
            painter--;
            if (painter === 0) {
                treeCount += tasks[i].treeNum - startNum + 1;
            }
        }
    }

    return treeCount;
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
