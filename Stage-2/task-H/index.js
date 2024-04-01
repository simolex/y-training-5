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
    const mapShift = new Map();

    const testAndRotate = (oneMatch) => {
        if (oneMatch[3] - oneMatch[1] < 0 || (oneMatch[3] - oneMatch[1] === 0 && oneMatch[2] - oneMatch[0] < 0)) {
            return [oneMatch[2], oneMatch[3], oneMatch[0], oneMatch[1]];
        }
        return oneMatch;
    };
    const addShift = (shift) => {
        const shiftHash = JSON.stringify(shift);
        if (!mapShift.has(shiftHash)) {
            mapShift.set(shiftHash, { count: 0 });
        }

        mapShift.get(shiftHash).count++;
    };

    const addMatch = (bash, x, y, vector) => {
        const vectorHash = JSON.stringify(vector);
        if (!bash.has(vectorHash)) {
            bash.set(vectorHash, new Map());
        }
        if (!bash.get(vectorHash).has(y)) {
            bash.get(vectorHash).set(y, new Set());
        }
        bash.get(vectorHash).get(y).add(x);
    };

    const getOverlaps = (mapAA, mapBB) => {
        for (const [vector, aSetY] of mapAA.entries()) {
            if (mapBB.has(vector)) {
                const bSetY = mapBB.get(vector);
                for (const [aY, aSetX] of aSetY.entries()) {
                    for (const aX of aSetX.keys()) {
                        for (const [bY, bSetX] of bSetY.entries()) {
                            for (const bX of bSetX.keys()) {
                                addShift([bX - aX, bY - aY]);
                            }
                        }
                    }
                }
            }
        }
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

    getOverlaps(mapA, mapB);

    let maxEqual = 0;
    for (const equal of mapShift.values()) {
        if (maxEqual < equal.count) {
            maxEqual = equal.count;
        }
    }

    return A.length - maxEqual;
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
