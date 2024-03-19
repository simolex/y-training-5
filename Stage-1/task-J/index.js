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
    const minimalPaintedRect = (ltPoint, btPoint) => {
        const rect = [...btPoint, ...ltPoint];

        for (let i = ltPoint[0]; i <= btPoint[0]; i++) {
            for (let j = ltPoint[1]; j <= btPoint[1]; j++) {
                if (pixelPicture[i][j] === "#") {
                    rect[0] = Math.min(rect[0], i);
                    rect[1] = Math.min(rect[1], j);
                    rect[2] = Math.max(rect[2], i);
                    rect[3] = Math.max(rect[3], j);
                }
            }
        }
        return [
            [rect[0], rect[1]],
            [rect[2], rect[3]]
        ];
    };

    const [topLeft, bottomRight] = minimalPaintedRect([1, 1], [n, m]);
    //==

    const height = bottomRight[0] - topLeft[0] + 1;
    const width = bottomRight[1] - topLeft[1] + 1;

    //Если нет места для двух прямоугольников
    if (width * height < 2) {
        return [];
    }
    //===

    // Константы и функция для опредения углов нарушающих выпуклость оболочки
    const dI = [-1, 0, 1, 0]; //^>_<
    const dJ = [0, 1, 0, -1];

    const testEdgeI = (fromJ, toJ, I) => {
        let onlyPoint = true;

        for (let k = fromJ; k <= toJ; k++) {
            onlyPoint = onlyPoint && pixelPicture[I][k] === ".";
        }

        return onlyPoint ? "." : "#";
    };

    const testEdgeJ = (fromI, toI, J) => {
        let onlyPoint = true;

        for (let k = fromI; k <= toI; k++) {
            onlyPoint = onlyPoint && pixelPicture[k][J] === ".";
        }

        return onlyPoint ? "." : "#";
    };
    const leftTopHolePattern = [
        ["", "", "", ""],
        [".", ".", "#", "."],
        [
            [".", ".", ".", "."],
            [".", "#", ".", "."]
        ],
        ["", "", "", ""],
        [".", "#", "#", "."],
        [
            (startPoint, endPoint) => testEdgeI(startPoint[1], endPoint[1], startPoint[0] + dI[0]),
            (startPoint, endPoint) => testEdgeJ(startPoint[0], endPoint[0], endPoint[1] + dJ[1]),
            (startPoint, endPoint) => testEdgeI(startPoint[1], endPoint[1], endPoint[0] + dI[2]),
            (startPoint, endPoint) => testEdgeJ(startPoint[0], endPoint[0], startPoint[1] + dJ[3])
        ]
    ];
    const rightTopHolePattern = [
        ["", "", "", ""],
        ["", "", "", ""],
        [
            [".", ".", ".", "."],
            [".", ".", ".", "#"]
        ],
        [".", ".", "#", "."],
        [".", ".", "#", "#"],
        [
            (startPoint, endPoint) => testEdgeI(endPoint[1], startPoint[1], startPoint[0] + dI[0]),
            (startPoint, endPoint) => testEdgeJ(startPoint[0], endPoint[0], startPoint[1] + dJ[1]),
            (startPoint, endPoint) => testEdgeI(endPoint[1], startPoint[1], endPoint[0] + dI[2]),
            (startPoint, endPoint) => testEdgeJ(startPoint[0], endPoint[0], endPoint[1] + dJ[3])
        ]
    ];
    const rightBottomHolePattern = [
        [
            [".", ".", ".", "."],
            [".", ".", ".", "#"]
        ],
        ["", "", "", ""],
        ["", "", "", ""],
        ["#", ".", ".", "."],
        ["#", ".", ".", "#"],
        [
            (startPoint, endPoint) => testEdgeI(endPoint[1], startPoint[1], endPoint[0] + dI[0]),
            (startPoint, endPoint) => testEdgeJ(endPoint[0], startPoint[0], startPoint[1] + dJ[1]),
            (startPoint, endPoint) => testEdgeI(endPoint[1], startPoint[1], startPoint[0] + dI[2]),
            (startPoint, endPoint) => testEdgeJ(endPoint[0], startPoint[0], endPoint[1] + dJ[3])
        ]
    ];
    const leftBottomHolePattern = [
        [
            [".", ".", ".", "."],
            [".", "#", ".", "."]
        ],
        ["#", ".", ".", "."],
        ["", "", "", ""],
        ["", "", "", ""],
        ["#", "#", ".", "."],
        [
            (startPoint, endPoint) => testEdgeI(startPoint[1], endPoint[1], endPoint[0] + dI[0]),
            (startPoint, endPoint) => testEdgeJ(endPoint[0], startPoint[0], endPoint[1] + dJ[1]),
            (startPoint, endPoint) => testEdgeI(startPoint[1], endPoint[1], startPoint[0] + dI[2]),
            (startPoint, endPoint) => testEdgeJ(endPoint[0], startPoint[0], startPoint[1] + dJ[3])
        ]
    ];

    const getVertexHole = (curPos, pattern) => {
        const initPos = [...curPos];
        let findAngel = false;

        while (pixelPicture[curPos[0]][curPos[1]] === "." && !findAngel) {
            const next = [true, true, true, true, true];

            for (let d = 0; d < 4; d++) {
                const i = curPos[0] + dI[d];
                const j = curPos[1] + dJ[d];
                const testEdge = pattern[5][d];
                const resTest = testEdge(initPos, curPos);

                for (let p = 0; p < 5; p++) {
                    next[p] =
                        next[p] &&
                        (Array.isArray(pattern[p][0])
                            ? resTest === pattern[p][0][d] || resTest === pattern[p][1][d]
                            : resTest === pattern[p][d]);
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

        return findAngel ? curPos : [-1, -1];
    };
    //===

    //Основная часть
    const leftTopHoleAngel = getVertexHole([topLeft[0], topLeft[1]], leftTopHolePattern);
    const rightTopHoleAngel = getVertexHole([topLeft[0], bottomRight[1]], rightTopHolePattern);
    const rightBottomHoleAngel = getVertexHole([bottomRight[0], bottomRight[1]], rightBottomHolePattern);
    const leftBottomHoleAngel = getVertexHole([bottomRight[0], topLeft[1]], leftBottomHolePattern);

    const existHoleAngel = (result) => (result[0] === -1 ? 0 : 1);

    const testingRect = (topLeftPoint, bottomRightPoint) => {
        let isRect = true;

        const [topLeftPointNew, bottomRightPointNew] = minimalPaintedRect(topLeftPoint, bottomRightPoint);

        for (let i = topLeftPointNew[0]; i <= bottomRightPointNew[0] && isRect; i++) {
            for (let j = topLeftPointNew[1]; j <= bottomRightPointNew[1] && isRect; j++) {
                isRect = isRect && pixelPicture[i][j] === "#";
            }
        }
        return isRect;
    };

    const paintingRect = (topLeftPoint, bottomRightPoint, marker) => {
        const [topLeftPointNew, bottomRightPointNew] = minimalPaintedRect(topLeftPoint, bottomRightPoint);

        for (let i = topLeftPointNew[0]; i <= bottomRightPointNew[0]; i++) {
            for (let j = topLeftPointNew[1]; j <= bottomRightPointNew[1]; j++) {
                pixelPicture[i][j] = marker;
            }
        }
    };

    const paintingRectWithOneHole = (topLeftPoint, bottomRightPoint, marker) => {
        if (testingRect(topLeftPoint, bottomRightPoint)) {
            paintingRect(topLeftPoint, bottomRightPoint, marker);
            return true;
        }
        return false;
    };

    const returnResult = () => {
        const result = pixelPicture.slice(1, -1).map((line) => line.slice(1, -1).join(""));
        const isFail = result.reduce((test, line) => test || line.includes("#"), false);
        return isFail ? [] : result;
    };

    const countHoleAngel =
        existHoleAngel(leftTopHoleAngel) +
        existHoleAngel(rightTopHoleAngel) +
        existHoleAngel(rightBottomHoleAngel) +
        existHoleAngel(leftBottomHoleAngel);

    if (countHoleAngel == 0) {
        if (testingRect(topLeft, bottomRight)) {
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
        } else {
            let isRect = true;
            let i;
            for (i = topLeft[0]; i <= bottomRight[0]; i++) {
                if (pixelPicture[i][topLeft[1]] !== "#") {
                }
            }
        }
    } else if (countHoleAngel == 1) {
        if (existHoleAngel(leftTopHoleAngel) == 1) {
            if (
                testingRect([topLeft[0], leftTopHoleAngel[1] + 1], [leftTopHoleAngel[0], bottomRight[1]]) &&
                testingRect([leftTopHoleAngel[0] + 1, topLeft[1]], bottomRight)
            ) {
                paintingRect([topLeft[0], leftTopHoleAngel[1] + 1], [leftTopHoleAngel[0], bottomRight[1]], "a");
                paintingRect([leftTopHoleAngel[0] + 1, topLeft[1]], bottomRight, "b");
                return returnResult();
            } else if (
                testingRect([topLeft[0], leftTopHoleAngel[1] + 1], bottomRight) &&
                testingRect([leftTopHoleAngel[0] + 1, topLeft[1]], [leftTopHoleAngel[0], bottomRight[1]])
            ) {
                paintingRect([topLeft[0], leftTopHoleAngel[1] + 1], bottomRight, "a");
                paintingRect([leftTopHoleAngel[0] + 1, topLeft[1]], [leftTopHoleAngel[0], bottomRight[1]], "b");
                return returnResult();
            }
        } else if (existHoleAngel(rightTopHoleAngel) == 1) {
            if (
                testingRect(topLeft, [rightTopHoleAngel[0], rightTopHoleAngel[1] - 1]) &&
                testingRect([rightTopHoleAngel[0] + 1, topLeft[1]], bottomRight)
            ) {
                paintingRect(topLeft, [rightTopHoleAngel[0], rightTopHoleAngel[1] - 1], "a");
                paintingRect([rightTopHoleAngel[0] + 1, topLeft[1]], bottomRight, "b");
                return returnResult();
            } else if (
                testingRect(topLeft, [bottomRight[0], rightTopHoleAngel[1] - 1]) &&
                testingRect([rightTopHoleAngel[0] + 1, rightTopHoleAngel[1]], bottomRight)
            ) {
                paintingRect(topLeft, [bottomRight[0], rightTopHoleAngel[1] - 1], "a");
                paintingRect([rightTopHoleAngel[0] + 1, rightTopHoleAngel[1]], bottomRight, "b");
                return returnResult();
            }
        } else if (existHoleAngel(rightBottomHoleAngel) == 1) {
            if (
                testingRect(topLeft, [rightBottomHoleAngel[0] - 1, bottomRight[1]]) &&
                testingRect([rightBottomHoleAngel[0], topLeft[1]], [bottomRight[0], rightBottomHoleAngel[1] - 1])
            ) {
                paintingRect(topLeft, [rightBottomHoleAngel[0] - 1, bottomRight[1]], "a");
                paintingRect([rightBottomHoleAngel[0], topLeft[1]], [bottomRight[0], rightBottomHoleAngel[1] - 1], "b");
                return returnResult();
            } else if (
                testingRect(topLeft, [bottomRight[0], rightBottomHoleAngel[1] - 1]) &&
                testingRect([topLeft[0], rightBottomHoleAngel[1]], [(rightBottomHoleAngel[0] - 1, bottomRight[1])])
            ) {
                paintingRect(topLeft, [bottomRight[0], rightBottomHoleAngel[1] - 1], "a");
                paintingRect(
                    [topLeft[0], rightBottomHoleAngel[1]],
                    [(rightBottomHoleAngel[0] - 1, bottomRight[1])],
                    "b"
                );
                return returnResult();
            }
        } else if (existHoleAngel(leftBottomHoleAngel) == 1) {
            if (
                testingRect(topLeft, [leftBottomHoleAngel[0] - 1, bottomRight[1]]) &&
                testingRect([leftBottomHoleAngel[0], leftBottomHoleAngel[1] + 1], bottomRight)
            ) {
                paintingRect(topLeft, [leftBottomHoleAngel[0] - 1, bottomRight[1]], "a");
                paintingRect([leftBottomHoleAngel[0], leftBottomHoleAngel[1] + 1], bottomRight, "b");
                return returnResult();
            } else if (
                testingRect(topLeft, [leftBottomHoleAngel[0] - 1, leftBottomHoleAngel[1]]) &&
                testingRect([topLeft[0], leftBottomHoleAngel[1] + 1], bottomRight)
            ) {
                paintingRect(topLeft, [leftBottomHoleAngel[0] - 1, leftBottomHoleAngel[1]], "a");
                paintingRect([topLeft[0], leftBottomHoleAngel[1] + 1], bottomRight, "b");
                return returnResult();
            }

            if (
                paintingRectWithOneHole(topLeft, [leftBottomHoleAngel[0] - 1, bottomRight[1]], "a") &&
                paintingRectWithOneHole([leftBottomHoleAngel[0], leftBottomHoleAngel[1] + 1], bottomRight, "b")
            ) {
                return returnResult();
            }
        }
    } else if (countHoleAngel == 2) {
        if (existHoleAngel(leftTopHoleAngel) == 1 && existHoleAngel(rightTopHoleAngel) == 1) {
            if (
                leftTopHoleAngel[0] === rightTopHoleAngel[0] &&
                paintingRectWithOneHole(
                    [topLeft[0], leftTopHoleAngel[1] + 1],
                    [rightTopHoleAngel[0], rightTopHoleAngel[1] - 1],
                    "a"
                ) &&
                paintingRectWithOneHole([leftTopHoleAngel[0] + 1, topLeft[1]], bottomRight, "b")
            ) {
                return returnResult();
            }
        } else if (existHoleAngel(leftTopHoleAngel) == 1 && existHoleAngel(rightBottomHoleAngel) == 1) {
            if (
                rightBottomHoleAngel[0] - leftTopHoleAngel[0] <= 1 &&
                rightBottomHoleAngel[1] - leftTopHoleAngel[1] > 0 &&
                paintingRectWithOneHole(
                    [topLeft[0], leftTopHoleAngel[1] + 1],
                    [leftTopHoleAngel[0], bottomRight[1]],
                    "a"
                ) &&
                paintingRectWithOneHole(
                    [leftTopHoleAngel[0] + 1, topLeft[1]],
                    [bottomRight[0], rightBottomHoleAngel[1] - 1],
                    "b"
                )
            ) {
                return returnResult();
            } else if (
                rightBottomHoleAngel[0] - leftTopHoleAngel[0] > 0 &&
                rightBottomHoleAngel[1] - leftTopHoleAngel[1] <= 1 &&
                paintingRectWithOneHole(
                    [leftTopHoleAngel[0] + 1, topLeft[1]],
                    [bottomRight[0], leftTopHoleAngel[1]],
                    "a"
                ) &&
                paintingRectWithOneHole(
                    [topLeft[0], rightBottomHoleAngel[1]],
                    [rightBottomHoleAngel[0] - 1, bottomRight[1]],
                    "b"
                )
            ) {
                return returnResult();
            } else if (
                rightBottomHoleAngel[0] - leftTopHoleAngel[0] <= 1 &&
                rightBottomHoleAngel[1] - leftTopHoleAngel[1] <= 1 &&
                paintingRectWithOneHole(
                    [topLeft[0], leftTopHoleAngel[1] + 1],
                    [rightBottomHoleAngel[0] - 1, bottomRight[1]],
                    "a"
                ) &&
                paintingRectWithOneHole(
                    [leftTopHoleAngel[0] + 1, topLeft[1]],
                    [bottomRight[0], rightBottomHoleAngel[1] - 1],
                    "b"
                )
            ) {
                return returnResult();
            }
        } else if (existHoleAngel(leftTopHoleAngel) == 1 && existHoleAngel(leftBottomHoleAngel) == 1) {
            if (
                leftTopHoleAngel[1] === leftBottomHoleAngel[1] &&
                paintingRectWithOneHole(
                    [leftTopHoleAngel[0] + 1, topLeft[1]],
                    [leftBottomHoleAngel[0] - 1, leftBottomHoleAngel[1]],
                    "a"
                ) &&
                paintingRectWithOneHole([topLeft[0], leftTopHoleAngel[1] + 1], bottomRight, "b")
            ) {
                return returnResult();
            }
        } else if (existHoleAngel(rightTopHoleAngel) == 1 && existHoleAngel(rightBottomHoleAngel) == 1) {
            if (
                rightTopHoleAngel[1] === rightBottomHoleAngel[1] &&
                paintingRectWithOneHole(topLeft, [bottomRight[0], rightTopHoleAngel[1] - 1], "a") &&
                paintingRectWithOneHole(
                    [rightTopHoleAngel[0] + 1, rightTopHoleAngel[1]],
                    [rightBottomHoleAngel[0] - 1, bottomRight[1]],
                    "b"
                )
            ) {
                return returnResult();
            }
        } else if (existHoleAngel(rightTopHoleAngel) == 1 && existHoleAngel(leftBottomHoleAngel) == 1) {
            if (
                leftBottomHoleAngel[0] - rightTopHoleAngel[0] <= 1 &&
                rightTopHoleAngel[1] - leftBottomHoleAngel[1] > 0 &&
                paintingRectWithOneHole(topLeft, [rightTopHoleAngel[0], rightTopHoleAngel[1] - 1], "a") &&
                paintingRectWithOneHole([leftBottomHoleAngel[0], leftBottomHoleAngel[1] + 1], bottomRight, "b")
            ) {
                return returnResult();
            } else if (
                leftBottomHoleAngel[0] - rightTopHoleAngel[0] > 0 &&
                rightTopHoleAngel[1] - leftBottomHoleAngel[1] <= 1 &&
                paintingRectWithOneHole(topLeft, [leftBottomHoleAngel[0] - 1, rightTopHoleAngel[1] - 1], "a") &&
                paintingRectWithOneHole([rightTopHoleAngel[0] + 1, leftBottomHoleAngel[1] + 1], bottomRight, "b")
            ) {
                return returnResult();
            } else if (
                leftBottomHoleAngel[0] - rightTopHoleAngel[0] <= 1 &&
                rightTopHoleAngel[1] - leftBottomHoleAngel[1] <= 1 &&
                paintingRectWithOneHole(topLeft, [leftBottomHoleAngel[0] - 1, rightTopHoleAngel[1] - 1], "a") &&
                paintingRectWithOneHole([rightTopHoleAngel[0] + 1, leftBottomHoleAngel[1] + 1], bottomRight, "b")
            ) {
                return returnResult();
            }
        } else if (existHoleAngel(rightBottomHoleAngel) == 1 && existHoleAngel(leftBottomHoleAngel) == 1) {
            if (
                leftBottomHoleAngel[0] === rightBottomHoleAngel[0] &&
                paintingRectWithOneHole(topLeft, [leftBottomHoleAngel[0] - 1, bottomRight[1]], "a") &&
                paintingRectWithOneHole(
                    [leftBottomHoleAngel[0], leftBottomHoleAngel[1] + 1],
                    [bottomRight[0], rightBottomHoleAngel[1] - 1],
                    "b"
                )
            ) {
                return returnResult();
            }
        }
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
