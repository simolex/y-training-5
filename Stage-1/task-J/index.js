/**
 * J. Два прямоугольника
 *
 * Недавно один известный художник-абстракционист произвел на свет новый шедевр — картину «Два черных непересекающихся
 * прямоугольника». Картина представляет собой прямоугольник m× n, разбитый на квадраты 1× 1, некоторые из которых
 * закрашены любимым цветом автора — черным. Федя — не любитель абстрактных картин, однако ему стало интересно,
 * действительно ли на картине изображены два непересекающихся прямоугольника. Помогите ему это узнать. Прямоугольники
 * не пересекаются в том смысле, что они не имеют общих клеток.
 *
 * Формат ввода:
 * Первая строка входного файла содержит числа m и n (1 ≤ m, n ≤ 200). Следующие m строк содержат описание рисунка.
 * Каждая строка содержит ровно n символов. Символ «.» обозначает пустой квадрат, а символ «#» — закрашенный.
 *
 * Формат вывода:
 * Если рисунок можно представить как два непересекающихся прямоугольника, выведите в первой строке «YES»,
 * а в следующих m строках выведите рисунок в том же виде, в каком он задан во входном файле, заменив квадраты,
 * соответствующие первому прямоугольнику на символ «a», а второму — на символ «b». Если решений несколько,
 * выведите любое.
 * Если же этого сделать нельзя, выведите в выходной файл «NO».
 *
 * Примечания:
 */

function validPicture(n, m, picture) {
    //Инициализация барьерного периметра
    const pixelPicture = [];
    pixelPicture.push(new Array(m + 2).fill("."));
    picture.forEach((line) => {
        const pixelLine = [];
        pixelLine.push(".");
        line.split("").forEach((s) => pixelLine.push(s));
        pixelLine.push(".");
        pixelPicture.push(pixelLine);
    });
    pixelPicture.push(new Array(m + 2).fill("."));
    //===

    //Максимальный описывающий закрашенный прямоугольник
    const topLeft = [n, m];
    const bottomRight = [0, 0];

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (pixelPicture[i][j] === "#") {
                topLeft[0] = Math.min(topLeft[0], i);
                topLeft[1] = Math.min(topLeft[1], j);
                bottomRight[0] = Math.max(bottomRight[0], i);
                bottomRight[1] = Math.max(bottomRight[1], j);
            }
        }
    }
    //==

    const height = bottomRight[0] - topLeft[0] + 1;
    const width = bottomRight[1] - topLeft[1] + 1;

    //Если нет места для двух примугольников
    if (width * height < 2) {
        return [];
    }
    //===

    // Константы и функция для опредения углов нарушающих выпуклость оболочки
    const dI = [-1, 0, 1, 0]; //^>_<
    const dJ = [0, 1, 0, -1];
    const leftTopHolePattern = [
        ["", "", "", ""],
        [".", ".", "#", "."],
        [
            [".", ".", ".", "."],
            [".", "#", ".", "."]
        ],
        ["", "", "", ""],
        [".", "#", "#", "."]
    ];
    const rightTopHolePattern = [
        ["", "", "", ""],
        ["", "", "", ""],
        [
            [".", ".", ".", "."],
            [".", ".", ".", "#"]
        ],
        [".", ".", "#", "."],
        [".", ".", "#", "#"]
    ];
    const rightBottomHolePattern = [
        [
            [".", ".", ".", "."],
            [".", ".", ".", "#"]
        ],
        ["", "", "", ""],
        ["", "", "", ""],
        ["#", ".", ".", "."],
        ["#", ".", ".", "#"]
    ];
    const leftBottomHolePattern = [
        [
            [".", ".", ".", "."],
            [".", "#", ".", "."]
        ],
        ["#", ".", ".", "."],
        ["", "", "", ""],
        ["", "", "", ""],
        ["#", "#", ".", "."]
    ];

    const getVertexHole = (curPos, pattern, test) => {
        let findAngel = false;

        while (pixelPicture[curPos[0]][curPos[1]] === "." && !findAngel) {
            const next = [true, true, true, true, true];

            for (let d = 0; d < 4; d++) {
                const i = curPos[0] + dI[d];
                const j = curPos[1] + dJ[d];
                for (let p = 0; p < next.length; p++) {
                    next[p] =
                        next[p] &&
                        (Array.isArray(pattern[p][0])
                            ? pixelPicture[i][j] === pattern[p][0][d] || pixelPicture[i][j] === pattern[p][1][d]
                            : pixelPicture[i][j] === pattern[p][d]);
                }
            }
            if (next[4]) findAngel = true;
            else {
                for (let d = 0; d < 4; d++) {
                    if (next[d]) {
                        curPos[0] += dI[d];
                        curPos[1] += dJ[d];
                    }
                }
            }
        }
        if (findAngel) pixelPicture[curPos[0]][curPos[1]] = test;

        return findAngel ? curPos : [-1, -1];
    };
    //===

    //Основная часть
    const leftTopHoleAngel = getVertexHole([topLeft[0], topLeft[1]], leftTopHolePattern, "1");
    const rightTopHoleAngel = getVertexHole([topLeft[0], bottomRight[1]], rightTopHolePattern, "2");
    const rightBottomHoleAngel = getVertexHole([bottomRight[0], bottomRight[1]], rightBottomHolePattern, "3");
    const leftBottomHoleAngel = getVertexHole([bottomRight[0], topLeft[1]], leftBottomHolePattern, "4");

    const existHoleAngel = (result) => (result[0] === -1 ? 0 : 1);

    const countHoleAngel =
        existHoleAngel(leftTopHoleAngel) +
        existHoleAngel(rightTopHoleAngel) +
        existHoleAngel(rightBottomHoleAngel) +
        existHoleAngel(leftBottomHoleAngel);
    console.log(pixelPicture);
    console.log(countHoleAngel);

    if (countHoleAngel == 0) {
        for (let i = topLeft[0]; i <= bottomRight[0]; i++) {
            for (let j = topLeft[1]; j <= bottomRight[1]; j++) {
                if (width == 1) {
                    if (i === topLeft[0]) {
                        pixelPicture[i][j] = "a";
                    } else {
                        pixelPicture[i][j] = "b";
                    }
                } else {
                    if (j === topLeft[1]) {
                        pixelPicture[i][j] = "a";
                    } else {
                        pixelPicture[i][j] = "b";
                    }
                }
            }
        }
        return pixelPicture.slice(1, -1).map((line) => line.slice(1, -1).join(""));
    } else if (countHoleAngel == 1) {
        if (existHoleAngel(leftTopHoleAngel) == 1) {
            //разрезать
            //проверить(функция) что это прямоугольник
            //разукрасить(функция)
        }
        if (existHoleAngel(rightTopHoleAngel) == 1) {
            //
        }
        if (existHoleAngel(rightBottomHoleAngel) == 1) {
        }
        if (existHoleAngel(leftBottomHoleAngel) == 1) {
        }
    } else if (countHoleAngel == 2) {
    }
    return [];
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
    const m = params[1];

    const picture = [];

    for (let i = 0; i < n; i++) {
        picture.push(readString());
    }

    const result = validPicture(n, m, picture);
    if (result.length > 0) {
        console.log("YES");
        result.forEach((v) => console.log(v));
    } else {
        console.log("NO");
    }
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

function readEdges(n) {
    let grid = [];
    for (let i = 0; i < n; i++) {
        let vertex = readArray();
        grid.push(vertex);
    }
    return grid;
}

module.exports = validPicture;
