/**
 * J. P2P обновление
 *
 * В системе умного дома под управлением голосового помощника Лариса n устройств, соединяющихся между
 * собой по сети LoRaWAN. Устройство номер 1 подключено к интернету и на него было скачано обновление,
 * которое необходимо передать на все устройства.
 * Сеть LoRaWAN очень медленная, поэтому для распространения протокола был придуман peer-to-peer (P2P)
 * протокол. Файл обновления разбивается на k одинаковых по размеру частей, занумерованных от 1 до k.
 * Передача части обновления происходит во время таймслотов. Каждый таймслот занимает одну минуту.
 * За один таймслот каждое устройство может получить и передать ровно одну часть обновления. То есть
 * устройство во время таймслота может получать новую часть обновления и передавать уже имеющуюуся
 * у него к началу таймслота часть обновления, или совершать только одно из этих действий, или вообще
 * не осуществлять прием или передачу. После приема части обновления устройство может передавать эту
 * часть обновления другим устройствам в следующих таймслотах.
 * Перед каждым таймслотом для каждой части обновления определяется, на скольких устройствах сети
 * скачана эта часть. Каждое устройство выбирает отсутствующую на нем часть обновления, которая
 * встречается в сети реже всего. Если таких частей несколько, то выбирается отсутствующая на устройстве
 * часть обновления с наименьшим номером.
 * После этого устройство делает запрос выбранной части обновления у одного из устройств, на котором
 * такая часть обновления уже скачана. Если таких устройств несколько — выбирается устройство, на котором
 * скачано наименьшее количество частей обновления. Если и таких устройств оказалось несколько — выбирается
 * устройство с минимальным номером.
 * После того, как все запросы отправлены, каждое устройство выбирает, чей запрос удовлетворить.
 * Устройство A удовлетворяет тот запрос, который поступил от наиболее ценного для A устройства. Ценность
 * устройства B для устройства A определяется как количество частей обновления, ранее полученных
 * устройством A от устройства B. Если на устройство A пришло несколько запросов от одинаково ценных устройств,
 * то удовлетворяется запрос того устройства, на котором меньше всего скачанных частей обновления. Если и таких
 * запросов несколько, то среди них выбирается устройство с наименьшим номером.
 * Далее начинается новый таймслот. Устройства, чьи запросы удовлетворены, скачивают запрошенную часть
 * обновления, а остальные не скачивают ничего.
 * Для каждого устройства определите, сколько таймслотов понадобится для скачивания всех частей обновления.
 *
 * Формат ввода:
 * Вводится два числа n и k (2 ≤ n ≤ 100, 1 ≤ k ≤ 200).
 *
 * Формат вывода:
 * Выведите n-1 число — количество таймслотов, необходимых для скачивания обновления на устройства
 * с номерами от 2 до n.
 *
 * Примечания:
 * Для удобства будем пользоваться обозначениями устройств буквами A, B, C (соответствует устройствам
 * с номерами 1, 2 и 3). На устройстве A есть обе части обновления, а на устройствах B и C — ни одной.
 * Перед первым таймслотом для каждой части определяется количество устройств, на которых скачана каждая
 * часть обновления: и 1 и 2 часть обновления присутствуют только на одном устройстве.
 * Устройства B и C выбирают самую редкую отсутствующую у них часть обновления с минимальным номером:
 * самая редкая часть с минимальным номером — это часть 1. Она отсутствует и на устройстве B, и на устройстве С.
 * Они запрашивают ее у устройства A. Ценность устройств B и C для устройства A равна нулю. Количество
 * имеющихся у устройств B и C частей обновления одинакова и равно нулю. Поэтому устройство A выбирает
 * устройство с минимальным номером (B). Во время первого таймслота выполняется передача части 1
 * с устройства A на устройство B. Ценность устройства A для устройства B становится равной 1.
 * Перед вторым таймслотом для каждой части определяется количество устройств, на которых скачана каждая
 * часть обновления: самой редкой оказывается часть 2 (присутствует только на устройстве A), следующая
 * по редкости часть 1 (присутствует на устройствах A и B).
 * Устройства B и C выбирают среди отсутствующих у них частей обновления самую редкую: для обоих устройств
 * выбирается часть 2. Каждое из них делает запрос части 2 у единственного обладателя этой части — устройства A.
 * Ценность устройств B и C для устройства A одинакова и равна нулю. Количество имеющихся у устройства C
 * частей (0) меньше, чем у устройства B (1), поэтому выбирается устройство C. Во время второго таймслота
 * выполняется передача части 2 с устройства A на устройство C. Ценность устройства A для устройства C
 * становится равной 1.
 * Перед третьим таймслотом для каждой части определяется количество устройств, на которых скачана каждая
 * часть обновления: обе части 1 и 2 присутствуют на двух устройствах (часть 1 на устройствах A и B,
 * часть 2 — на устройствах A и C)
 * Устройство B может сделать запрос недостающей части 2 у обладающей ей устройств A и C, но выбирает
 * устройство C, т.к. на устройстве C скачано меньше частей (1), чем у устройства A (2).
 * Устройство C может сделать запрос недостающей части 1 у обладающей ей устройств A и B, но выбирает
 * устройство B, т.к. на устройстве B скачано меньше частей (1), чем у устройства A (2).
 * Во время третьего таймслота оба запроса оказываются единственными запросами у устройств B и C
 * и удовлетворяются. Часть 2 передается с устройства C на устройство B. Часть 1 передается с устройства B
 * на устройство C. Ценность устройства B для устройства C становится равной 1. Ценность устройства C
 * для устройства B становится равной 1.
 * Все части обновления оказываются на всех устройствах и на этом обновление заканчивается.
 */

function protocol_P2P(n, k) {
    const requests = [];
    const favorites = new Map();
    const partsRating = [];
    const partByDevice = [];
    for (let i = 1; i <= k; i++) {
        partByDevice[i] = new Set();
        partByDevice[i].add(1); // индекс частей которые есть на устройстве
    }

    const deviceWithParts = [];
    for (let i = 1; i <= n; i++) {
        deviceWithParts[i] = new Set();
    }
    for (let j = 1; j <= k; j++) {
        deviceWithParts[1].add(j); // индекс устройст на котором есть части
    }

    const calcRating = () => {
        partsRating.length = 0;
        for (let i = 0; i < k; i++) {
            partsRating[i] = { part: i + 1, devices: partByDevice[i + 1] };
        }
        partsRating.sort((a, b) => a.devices.size - b.devices.size || a.part - b.part);
        partsRating.unshift({});
    };

    const getNextPart = (device) => {
        const partOnDevice = deviceWithParts[device];
        let noSelectTransmitter = true;
        let partCandidateIndex = 1;
        while (noSelectTransmitter && partCandidateIndex <= k) {
            if (!partOnDevice.has(partsRating[partCandidateIndex].part)) {
                noSelectTransmitter = false;
            } else {
                partCandidateIndex++;
            }
        }

        const listDevices = [...partsRating[partCandidateIndex].devices.values()];
        listDevices.sort((a, b) => a - b);
        // console.log(device, partCandidateIndex, listDevices);

        let diviceTransmitter = -1;
        let minCountPart = k;
        for (const device of listDevices) {
            if (diviceTransmitter === -1 || deviceWithParts[device].size < minCountPart) {
                minCountPart = deviceWithParts[device].size;
                diviceTransmitter = device;
            }
        }
        return { part: partsRating[partCandidateIndex].part, trasmitter: diviceTransmitter };
    };

    const addRequest = (device, receiver, part) => {
        if (!requests[device]) {
            requests[device] = new Map();
        }
        requests[device].set(receiver, part);
    };

    const addFavoriteRate = (receiver, transmitter) => {
        if (!favorites.has(receiver)) {
            favorites.set(receiver, new Map());
            if (!favorites.get(receiver).has(transmitter)) {
                favorites.get(receiver).set(transmitter, { rate: 0 });
            }
        }
        favorites.get(receiver).get(transmitter).rate++;
    };

    const getFavoriteRate = (transmitter, receiver) => {
        if (!favorites.has(transmitter) || !favorites.get(transmitter).has(receiver)) {
            return 0;
        }

        return favorites.get(transmitter).get(receiver);
    };

    calcRating();

    deviceWithParts.forEach((d, i) => {
        if (i > 0 && d.size < k) {
            const { part, trasmitter } = getNextPart(i);
            addRequest(trasmitter, i, part);
        }
    });
    const responce = requests.map((req, i) => {
        if (i > 0) {
            const receivers = [...req.keys()];

            receivers.sort(
                (a, b) =>
                    getFavoriteRate(i, b) - getFavoriteRate(i, a) ||
                    deviceWithParts[a].size - deviceWithParts[b].size ||
                    a - b
            );

            return { receiver: receivers[0], part: req.get(receivers[0]) };
        }
    });
    responce.forEach((res, i) => {
        //
        addFavoriteRate(res.receiver, i);
    });
    console.log(requests);
    console.log(responce);
    console.log(favorites);

    return [];
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
    const n = params[0];
    const k = params[1];

    const result = protocol_P2P(n, k);
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

module.exports = protocol_P2P;
