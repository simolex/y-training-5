/**
 * F. Замена слов
 *
 * С целью экономии чернил в картридже принтера было принято решение укоротить некоторые слова
 * в тексте. Для этого был составлен словарь слов, до которых можно сокращать более длинные слова.
 * Слово из текста можно сократить, если в словаре найдется слово, являющееся началом слова из текста.
 * Например, если в списке есть слово "лом", то слова из текста "ломбард", "ломоносов" и другие слова,
 * начинающиеся на "лом", можно сократить до "лом".
 * Если слово из текста можно сократить до нескольких слов из словаря, то следует сокращать его
 * до самого короткого слова.
 *
 * Формат ввода:
 * В первой строке через пробел вводятся слова из словаря, слова состоят из маленьких латинских букв.
 * Гарантируется, что словарь не пуст и количество слов в словаре не превышет 1000,
 * а длина слов — 100 символов.
 * Во второй строке через пробел вводятся слова текста (они также состоят только из маленьких латинских
 * букв). Количество слов в тексте не превосходит 10^5, а суммарное количество букв в них — 10^6.
 *
 * Формат вывода:
 * Выведите текст, в котором осуществлены замены.
 *
 * Примечания:
 */

function replaceWords(dictionary, text) {
    const localDict = new Set(dictionary);

    const findMinimal = (word) => {
        for (let i = 1; i < word.length; i++) {
            if (localDict.has(word.substring(0, i))) {
                return word.substring(0, i);
            }
        }
        return "";
    };

    const forDelete = [];
    dictionary.forEach((word) => {
        const minWord = findMinimal(word);
        if (minWord.length > 0 && minWord !== word) {
            forDelete.push(word);
        }
    });

    forDelete.forEach((w) => localDict.delete(w));

    const result = text.map((word) => {
        const minWord = findMinimal(word);
        if (minWord.length > 0 && minWord !== word) {
            return minWord;
        }
        return word;
    });

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
    const dictionary = readStringArray();
    const text = readStringArray();

    const result = replaceWords(dictionary, text);
    console.log(result.join(" "));
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

module.exports = replaceWords;
