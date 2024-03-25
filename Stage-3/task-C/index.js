/**
 * C. Саруман
 *
 * Как известно, Саруман Радужный очень любит порядок. Поэтому все полки его войска стоят друг за другом,
 * причем каждый следующий полк содержит количество орков не меньше, чем предыдущий. Перед тем как напасть
 * на Хельмову Падь, Саруман решил провести несколько вылазок для разведки. Чтобы его отряды никто не заметил,
 * он решил каждый раз отправлять несколько подряд идущих полков так, чтобы суммарное количество орков
 * в них было равно определенному числу. Так как это всего лишь разведка, каждый полк после вылазки возвращается
 * на свое место. Задачу выбрать нужные полки он поручил Гриме Змеиному Языку.
 * А Грима не поскупится на вознаграждение, если вы ему поможете.
 *
 * Формат ввода:
 * В первой строке входного файла находится два целых числа: n (1 ≤ n ≤ 2⋅10^5) — количество полков
 * и m (1 ≤ m ≤ 2⋅10^5) – количество предстоящих вылазок.В следующей строке записано n чисел a[i],
 * где a[i] — число орков в i-ом полке (1 ≤ a[i] ≤ 109, a[i] ≤ a[i+1]).
 * Далее в m строках записаны запросы вида: количество полков l (1 ≤ l ≤ n), которые должны будут отправиться
 * в эту вылазку, и суммарное количество орков в этих полках s (1 ≤ s ≤ 2⋅10^16)
 *
 * Формат вывода:
 * Для каждого запроса выведите номер полка, с которого начнутся те l, которые необходимо отправить на вылазку.
 * Если таких полков несколько, выведите любой. Если же так выбрать полки нельзя, выведите -1.
 *
 * Примечания:
 */

function troopsSauron(troops, recces) {
    const n = troops.length;

    let currentSum = 0n;
    const troopsSum = [currentSum];
    troops.forEach((v) => {
        currentSum += v;
        troopsSum.push(currentSum);
    });

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

    const result = recces.map((range) => {
        const from = rightSearch(0, n - Number(range[0]), Number(range[0]), range[1]);
        if (troopsSum[from + Number(range[0])] - troopsSum[from] === range[1]) {
            return from + 1;
        }
        return -1n;
    });

    return result;
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

    const troops = readBigIntArray();
    const recces = [];
    for (let i = 0; i < m; i++) {
        recces.push(readBigIntArray());
    }

    const result = troopsSauron(troops, recces);

    console.log(result.map((l) => l.toString()).join("\n"));
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

module.exports = troopsSauron;
