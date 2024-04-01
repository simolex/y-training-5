/**
 * F. Велодорожки
 *
 * Мэр одного города очень любит следить за тенденциями и воспроизводить их в своём городе. До него дошла новость
 * о популярности велодорожек. Теперь он хочет проложить велодорожки в своём городе и сделать это лучше, чем
 * в других городах! Поэтому он решил сделать велодорожки даже на главной площади города.
 * Главная площадь представляет собой прямоугольник шириной w и высотой h, замощённый квадратными плитками
 * со стороной 1. Мэр хочет, чтобы было проложено две велодорожки одинаковой ширины: одна горизонтальная
 * и одна вертикальная. К сожалению, ремонт на площади проводился достаточно давно и на некоторых плитках уже
 * появились трещины. Мэр хочет проложить велодорожки так, чтобы после этого на площади остались только целые
 * плитки. При строительстве велодорожек плитки на их месте убираются. Можно только убирать плитки с площади
 * и нельзя менять местами или добавлять новые. Чтобы потратить меньше денег, мэр хочет сделать велодорожки наименьшей
 * возможной ширины, при этом ширина дорожек должна быть целым числом. Определите, какой должна быть ширина велодорожек.
 *
 * Формат ввода:
 * В первой строке входных данных содержатся три целых числа w,h,n (1 ≤ w,h ≤ 10^9, 1 ≤ n ≤ min(w×h,3⋅10^5))
 *  — ширина и высота площади и количество потрескавшихся плиток соответственно.
 * В следующих n строках содержится по 2 целых числа x[i],y[i] (1 ≤ x[i] ≤ w, 1 ≤ y[i] ≤ h)
 *  — координаты потрескавшихся плиток. (x[i],y[i]) ≠ (x[j],y[j]) при i≠j.
 *
 * Формат вывода:
 * Выведите единственное число c ( 1 ≤ c ≤ min(w,h))  — наименьшую возможную ширину велодорожек.
 *
 * Примечания:
 * Ниже приведены картинки к примерам из условия (description.png).
 * Серым отмечены потрескавшиеся плитки.
 *
 * Во втором примере ширина дорожек равна меньшей из сторон прямоугольника.
 */

function minCycleLane(w, h, badTiles) {
    const n = badTiles.length;
    const allRows = new Map();

    const addRow = (row) => {
        if (!allRows.has(row)) {
            allRows.set(row, { count: 0 });
        }

        allRows.get(row).count++;
    };

    const delRow = (row) => {
        // Проверка наличия не требуется
        allRows.get(row).count--;
        if (allRows.get(row).count === 0) {
            allRows.delete(row);
        }
    };

    const rightSearch = (l, r, count, target) => {
        while (l < r) {
            const m = l + Math.floor((r - l) / 2);

            if (troopsSum[m + count] - troopsSum[m] < target) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    };

    badTiles.forEach((tile) => addRow(tile[1]));
    badTiles.sort((a, b) => a[0] - b[0]);

    badTiles.forEach((tile, i) => {
        if (i === 0) {
        }
        if (i === n - 1) {
        }
        tile.push({});
    });

    console.log(badTiles);

    return 0;
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
    const w = params[0];
    const h = params[1];
    const n = params[2];

    const badTiles = [];
    for (let i = 0; i < n; i++) {
        badTiles.push(readArray());
    }

    const result = minCycleLane(w, h, badTiles);

    console.log(result);
}

function readAllString() {
    var arr = _inputLines.map((line) => line.trim());

    return arr;
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
function readBigInt() {
    const n = BigInt(_inputLines[_curLine]);
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

function readBigIntArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .map((num) => BigInt(num));
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

module.exports = minCycleLane;
