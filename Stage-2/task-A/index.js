/**
 * A. Плейлисты
 *
 * Костя успешно прошел собеседование и попал на стажировку в отдел разработки сервиса «Музыка».
 * Конкретно ему поручили такое задание — научиться подбирать плейлист для группы друзей, родственников или
 * коллег. При этом нужно подобрать такой плейлист, в который входят исключительно нравящиеся всем членам группы
 * песни. Костя очень хотел выполнить это задание быстро и качественно, но у него не получается. Помогите ему
 * написать программу, которая составляет плейлист для группы людей.
 *
 * Формат ввода:
 * В первой строке расположено одно натуральное число n(1 ≤ n ≤ 2⋅10^5), где n – количество человек в группе.
 * В следующих 2⋅n строках идет описание любимых плейлистов членов группы. По 2 строки на каждого участника.
 * В первой из этих 2-х строк расположено число k[i] — количество любимых треков i-го члена группы.
 * В следующей строке расположено k[i] строк через пробел — названия любимых треков i-го участника группы.
 * Каждый трек в плейлисте задан в виде строки, все строки уникальны, сумма длин строк не превосходит 2⋅10^6.
 * Строки содержат большие и маленькие латинские буквы и цифры.
 *
 * Формат вывода:
 * Выведите количество, а затем сам список песен через пробел — список треков,
 * которые нравятся каждому участнику группы.
 * Ответ необходимо отсортировать в лексикографическом порядке!
 *
 * Примечания:
 */

function bestPlayList(n, playLists) {
    const trackSongs = new Map();

    playLists.forEach((playlist) => {
        playlist.forEach((track) => {
            if (!trackSongs.has(track)) {
                trackSongs.set(track, { listener: 0 });
            }
            trackSongs.get(track).listener++;
        });
    });
    const result = [];

    for (let [track, count] of trackSongs) {
        if (count.listener === n) {
            result.push(track);
        }
    }
    result.sort();
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
    const n = readInt();
    const playLists = [];

    for (let i = 0; i < n; i++) {
        const m = readInt();
        playLists.push(readStringArray());
    }

    const result = bestPlayList(n, playLists);
    console.log(result.length);
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

module.exports = bestPlayList;
