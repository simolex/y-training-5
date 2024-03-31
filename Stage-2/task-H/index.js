/**
 * H. Спички детям не игрушка!
 *
 * Задано множество, состоящее из N различных точек на плоскости. Координаты всех точек — целые числа.
 * Определите, какое минимальное количество точек нужно добавить во множество, чтобы нашлось четыре
 * точки, лежащие в вершинах квадрата.
 *
 * Формат ввода:
 * В первой строке вводится число N (1 ≤ N ≤ 2000) — количество точек.
 * В следующих N строках вводится по два числа xi, yi (-10^8 ≤ xi, yi ≤ 10^8) — координаты точек.
 *
 * Формат вывода:
 * В первой строке выведите число K — минимальное количество точек, которые нужно добавить во множество.
 * В следующих K строках выведите координаты добавленных точек xi, yi через пробел. Координаты должны
 * быть целыми и не превышать 10^9 по модулю.
 * Если решений несколько — выведите любое из них.
 *
 * Примечания:
 */

function frictionMatch(A, B) {
    const testAndRotate = (oneMatch) => {
        if (oneMatch[3] - oneMatch[1] < 0 || (oneMatch[3] - oneMatch[1] === 0 && oneMatch[2] - oneMatch[0] < 0)) {
            return [oneMatch[2], oneMatch[3], oneMatch[0], oneMatch[1]];
        }
        return oneMatch;
    };

    const addMatch = (bash, x, y, vector) => {
        if (!bash.has(x)) {
            bash.set(x, new Map());
        }
        if (!bash.get(x).has(y)) {
            bash.get(x).set(y, new Set());
        }
        bash.get(x).get(y).add(JSON.stringify(vector));
    };

    const getOverlaps = (bashAA, bashBB, mapAA, mapBB) => {
        let max = 0;
        for (let i = 0; i < bashAA.length; i++) {
            for (let j = 0; j < bashBB.length; j++) {
                let overlap = 0;
                for (const [X, setByY] of mapAA.entries()) {
                    const newX = X - bashAA[i][0] + bashBB[j][0];

                    if (mapBB.has(newX)) {
                        const byX = mapBB.get(newX);
                        for (const [Y, vectors] of setByY.entries()) {
                            const newY = Y - bashAA[i][1] + bashBB[j][1];
                            if (byX.has(newY)) {
                                const byY = byX.get(newY);
                                for (const vector of vectors.keys()) {
                                    if (byY.has(vector)) {
                                        overlap++;
                                    }
                                }
                            }
                        }
                    }
                }
                max = Math.max(max, overlap);
            }
        }
        return max;
    };

    const mapA = new Map();
    const mapB = new Map();

    A.forEach((m) => {
        const mm = testAndRotate(m);
        addMatch(mapA, mm[0], mm[1], [mm[2] - mm[0], mm[3] - mm[1]]);
    });

    B.forEach((m) => {
        const mm = testAndRotate(m);
        addMatch(mapB, mm[0], mm[1], [mm[2] - mm[0], mm[3] - mm[1]]);
    });

    const bashA = [];
    for (const [X, setByY] of mapA.entries()) {
        for (const Y of setByY.keys()) {
            bashA.push([X, Y]);
        }
    }

    const bashB = [];
    for (const [X, setByY] of mapB.entries()) {
        for (const Y of setByY.keys()) {
            bashB.push([X, Y]);
        }
    }

    return (
        A.length -
        (bashA.length < bashB.length ? getOverlaps(bashA, bashB, mapA, mapB) : getOverlaps(bashB, bashA, mapB, mapA))
    );
}

const _readline = require("readline");
// const { createReadStream } = require("fs");
// const highWaterMark = 64 * 1024;
// const input = createReadStream("input.txt", { encoding: "utf8", highWaterMark });
let _inputLines = [];
let _curLine = 0;

// input.on("data", (chunk) => {
//     _inputLines = chunk.toString().trim().split("\n");
//     solve();
// });

const _reader = _readline.createInterface({
    input: process.stdin
});

_reader.on("line", (line) => {
    _inputLines.push(line);
});

process.stdin.on("end", solve);

function solve() {
    const A = [];
    const B = [];

    const n = readInt();
    for (let i = 0; i < n; i++) {
        A.push(readArray());
    }

    for (let i = 0; i < n; i++) {
        B.push(readArray());
    }

    const result = frictionMatch(A, B);
    console.log(result);
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

module.exports = frictionMatch;
