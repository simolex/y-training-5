/**
 * D. Рапорт
 *
 * Верс нужно подготовить рапорт о последнем боевом вылете. Она уже сочинила в голове текст, осталось лишь его
 * записать. Рапорт будет состоять из двух частей: первая будет содержать n слов, i-е из которых состоит из ai букв,
 * вторая — m слов, j-е из которых состоит из bj букв. Язык Крии не содержит никаких знаков препинания. Верс должна
 * записать рапорт на клетчатом рулоне бумаги, шириной w клеток. Так как рапорт состоит из двух частей, она разделит
 * вертикальной чертой рулон на две части целой ширины, после чего в левой части напишет первую часть, а в правой —
 * вторую.
 * Обе части рапорта записываются аналогично, каждая на своей части рулона. Одна буква слова занимает ровно одну клетку.
 * Первое слово записывается в первой строке рулона, начиная с самой левой клетки этой части рулона. Каждое следующее
 * слово, если это возможно, должно быть записано в той же строке, что и предыдущее, и быть отделено от него ровно одной
 * пустой клеткой. Иначе, оно пишется в следующей строке, начиная с самой левой клетки. Если ширина части рулона меньше,
 * чем длина какого-то слова, которое должно быть написано в этой части, написать эту часть рапорта на части рулона
 * такой ширины невозможно.
 * Гарантируется, что можно провести вертикальную черту так, что обе части рапорта возможно написать. Верс хочет
 * провести вертикальную черту так, чтобы длина рулона, которой хватит, чтобы написать рапорт, была минимальна.
 * Помогите ей найти эту минимальную длину.
 *
 * Формат ввода:
 * В первой строке даны три целых числа w, n и m — ширина рулона, количество слов в первой и второй части
 * рапорта (1 ≤ w ≤ 10^9; 1 ≤ n,m ≤ 100000).В следующей строке дано n целых чисел a[i] — длина i-го слова первой части
 * рапорта 1 ≤ a[i] ≤ 10^9.
 * В следующей строке дано m целых чисел b[j] — длина j-го слова второй части рапорта 1 ≤ b[j] ≤ 10^9.
 * Гарантируется, что возможно провести черту так, что обе части рапорта возможно написать.
 *
 * Формат вывода:
 * В единственной строке выведите одно целое число — минимальную длину рулона, которой достаточно,
 * чтобы написать рапорт.
 *
 * Примечания:
 * В тесте из примера рулон можно разделить на две части, проведя черту между 7 и 8 столбцом клеток, а затем записать
 * по два слова в каждой строке в обеих частях рапорта.
 */

function report(width, leftText, rightText) {
    const getMinWidth = (text) => text.reduce((max, wordLength) => Math.max(max, wordLength), 0);

    const countLine = (widthColumn, text) => {
        let count = 0;
        let rest = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] > widthColumn) {
                return text.length * text.length;
            }
            if (rest === 0 || rest + text[i] + 1 > widthColumn) {
                rest = text[i];
                count++;
            } else {
                rest += text[i] + 1;
            }
        }
        return count;
    };

    const leftSearch = (l, r) => {
        while (l < r) {
            const m = l + Math.floor((r - l) / 2);
            if (
                countLine(m, leftText) <= countLine(m + 1, leftText) &&
                countLine(m + 1, leftText) <= countLine(width - m - 1, rightText)
            ) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    };

    const minWidthLeft = getMinWidth(leftText);
    const minWidthRight = getMinWidth(rightText);

    const leftWidth = leftSearch(minWidthLeft, width - minWidthRight);
    const result = Math.max(
        countLine(leftWidth, leftText),
        countLine(width - leftWidth, rightText)
    );

    return result;
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
    const params = readArray();
    const w = params[0];
    const n = params[1];
    const m = params[2];

    const result = report(w, readArray(), readArray());

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

module.exports = report;
