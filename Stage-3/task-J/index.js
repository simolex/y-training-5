/**
 * J. Дождик
 *
 * В НИИ метеорологии решили изучить процесс образования водоемов на различных рельефах местности во время дождя.
 * Ввиду сложности реальной задачи была создана двумерная модель, в которой местность имеет только два измерения
 * — высоту и длину. В этой модели рельеф местности можно представить как N-звенную ломаную
 * c вершинами (x0, y0), ..., (xN, yN), где x0 < x1 < ... < xN и yi ≠ yj, для любых i ≠ j. Слева в точке x0 и справа
 * в точке xN рельеф ограничен вертикальными горами огромной высоты.
 * Если бы рельеф был горизонтальным, то после дождя вся местность покрылась бы слоем воды глубины H. Но поскольку
 * рельеф — это ломаная, то вода стекает и скапливается в углублениях, образуя водоемы.
 * Требуется найти максимальную глубину в образовавшихся после дождя водоемах.
 *
 * Формат ввода:
 * В первой строке расположены натуральное число N (1 ≤ N ≤ 100) и H — действительное число, заданное с тремя цифрами
 * после десятичной точки (0 ≤ H ≤ 109).
 * В последующих N + 1 строках — по два целых числа xi, yi (-10000 ≤ xi, yi ≤ 10000).
 * Числа в строках разделены пробелами.
 *
 * Формат вывода:
 * Выведите единственное число — искомую глубину с точностью 10^-4.
 *
 * Примечания:
 */
const TypeFloor = { descent: -1, ascent: 1 };

class HalfLoch {
    constructor(leftPoint, rightPoint) {
        this.leftPoint = {};
        [this.leftPoint.x, this.leftPoint.y] = leftPoint;

        this.rightPoint = {};
        [this.rightPoint.x, this.rightPoint.y] = rightPoint;
    }

    getLeftPoint() {
        return this.leftPoint;
    }

    getRightPoint() {
        return this.rightPoint;
    }

    getWidth() {
        if (!this.width) {
            this.width = this.rightPoint.x - this.leftPoint.x;
        }
        return this.width;
    }
    getHeight() {
        if (!this.height) {
            this.height = (this.rightPoint.y - this.leftPoint.y) * this.getType();
        }
        return this.height;
    }

    getType() {
        if (!this.type) {
            if (this.leftPoint.y < this.rightPoint.y) {
                this.type = TypeFloor.ascent;
            }
            this.type = TypeFloor.descent;
        }
        return this.type;
    }

    getSquare() {
        if (!this.square) {
            this.square = (this.getWidth() * this.getHeight()) / 2;
        }

        return this.square;
    }
}

class Loch {
    constructor(leftLoch, rightLoch) {
        this.leftLoch = leftLoch;
        this.rightLoch = rightLoch;
    }

    getLeftPoint() {
        return this.leftLoch.getLeftPoint();
    }

    getRightPoint() {
        return this.rightLoch.getRightPoint();
    }

    getType() {
        if (!this.type) {
            if (Math.abs(this.leftLoch.getType() + this.rightLoch.getType()) > 0) {
                this.type = this.leftLoch.getType();
            } else {
                if (this.getLeftPoint().y < this.getRightPoint().y) {
                    this.type = TypeFloor.ascent;
                }
                this.type = TypeFloor.descent;
            }
        }
    }

    getWidth() {
        if (!this.width) {
            this.width = this.leftLoch.getWidth() + this.rightLoch.getWidth();
        }
        return this.width;
    }
}

function maxDepth(n, h, points) {
    points.sort((a, b) => a[0] - b[0]);

    // const n = party.length;

    // const sortedParty = [];
    // const bribes = [];
    // const prefixParty = [0];

    // const isAvailableExpense = (expense) => {
    //     const isAvailable = party.reduce((test, p, i) => {
    //         const bribes = p[1];
    //         if (bribes > 0) {
    //             const upElectorate = prefixParty[i] - p[0] * i;
    //             const avgVote = (upElectorate - 1) / (i + 1);
    //             console.log();
    //         }
    //         return test;
    //     }, false);
    // };

    // const rightSearch = (l, r, count, target) => {
    //     while (l < r) {
    //         const m = l + Math.floor((r - l) / 2);

    //         if (troopsSum[m + count] - troopsSum[m] < target) {
    //             l = m + 1;
    //         } else {
    //             r = m;
    //         }
    //     }
    //     return l;
    // };

    // party.sort((a, b) => b[0] - a[0]);
    // party.forEach((p, i) => prefixParty.push(prefixParty[i] + p[0]));

    // for (let i = 0; i < n; i++) {
    //     sortedParty.push(i);
    //     bribes.push(i);
    // }

    // sortedParty;
    // bribes.sort((a, b) => party[a][1] - party[b][1]);

    return 15.84455;
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
    const params = readStringArray();
    const n = Number(params[0]);
    const h = parseFloat(params[1]);

    const points = [];
    for (let i = 0; i <= n; i++) {
        points.push(readArray());
    }

    const result = maxDepth(n, h, points);
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

module.exports = maxDepth;
