/**
 * H. Выборы
 *
 * В одной демократической стране приближаются парламентские выборы. Выборы проходят по следующей схеме:
 * каждый житель страны, достигший восемнадцатилетнего возраста, отдает свой голос за одну из политических партий.
 * После этого партия, которая набрала максимальное количество голосов, считается победившей на выборах
 * и формирует правительство. Если несколько партий набрали одинаковое максимальное количество голосов, то они
 * должны сформировать коалиционное правительство, что обычно приводит к длительным переговорам.
 * Один бизнесмен решил выгодно вложить свои средства и собрался поддержать на выборах некоторые партии.
 * В результате поддержки он планирует добиться победы одной из этих партий, которая затем сформирует правительство,
 * которое будет действовать в его интересах. При этом возможность формирования коалиционного правительства его
 * не устраивает, поэтому он планирует добиться строгой победы одной из партий.
 * Чтобы повлиять на исход выборов, бизнесмен собирается выделить деньги на агитационную работу среди жителей страны.
 * Исследование рынка показало, что для того, чтобы один житель сменил свои политические воззрения, требуется
 * потратить одну условную единицу. Кроме того, чтобы i-я партия в случае победы сформировала правительство,
 * которое будет действовать в интересах бизнесмена, необходимо дать лидеру этой партии взятку в размере p[i] условных
 * единиц. При этом некоторые партии оказались идеологически устойчивыми и не согласны на сотрудничество
 * с бизнесменом ни за какие деньги.
 * По результатам последних опросов известно, сколько граждан планируют проголосовать за каждую партию перед началом
 * агитационной компании. Помогите бизнесмену выбрать, какую партию следует подкупить, и какое количество граждан
 * придется убедить сменить свои политические воззрения, чтобы выбранная партия победила, учитывая, что бизнесмен
 * хочет потратить на всю операцию минимальное количество денег.
 *
 * Формат ввода:
 * В первой строке вводится целое число n – количество партий (1 ≤ n ≤ 10^5). Следующие n строк описывают партии.
 * Каждая из этих строк содержит по два целых числа:
 * v[i] – количество жителей, которые собираются проголосовать за эту партию перед началом агитационной компании,
 * и p[i] – взятка, которую необходимо дать лидеру партии для того, чтобы сформированное ей в случае победы
 * правительство действовало в интересах бизнесмена (1 ≤ vi ≤ 106, 1 ≤ pi ≤ 106 или pi = -1).
 * Если партия является идеологически устойчивой, то pi равно -1. Гарантируется, что хотя бы одно pi не равно -1.
 *
 * Формат вывода:
 * В первой строке выведите минимальную сумму, которую придется потратить бизнесмену. Во второй строке выведите
 * номер партии, лидеру которой следует дать взятку. В третьей строке выведите n целых чисел – количество голосов,
 * которые будут отданы за каждую из партий после осуществления операции. Если оптимальных решений несколько,
 * выведите любое.
 *
 * Примечания:
 */

function election(party) {
    const n = party.length;

    const sortedParty = [];
    const bribes = [];
    const prefixParty = [0];

    const leftSearch = (l, r, fn, ...params) => {
        while (l < r) {
            const m = l + Math.floor((r - l) / 2);
            if (fn(m, ...params)) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    };

    const rightSearch = (l, r, fn, ...params) => {
        while (l < r) {
            const m = l + Math.floor((r - l) / 2);

            if (fn(m, ...params)) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    };

    let maxVotes = -1;
    let startIndex = -1;
    party.forEach((v, i) => (v[2] = i));

    party.sort((a, b) => b[0] - a[0]);
    party.forEach((p, i) => {
        if (maxVotes < 0) {
            maxVotes = p[0];
        }
        if (startIndex < 0 && p[1] > 0) {
            startIndex = i;
        }
        prefixParty.push(prefixParty[i] + p[0]);
    });
    prefixParty.shift();

    const getCompetitors = (restrictLevel) => {
        l = 0;
        r = n - 1;

        while (l < r) {
            const m = l + Math.ceil((r - l) / 2);
            if (restrictLevel >= party[m][0]) {
                r = m - 1;
            } else {
                l = m;
            }
        }
        return l;

        // while (l < r) {
        //     const m = l + Math.ceil((r - l) / 2);

        //     if (restrictLevel < party[m][0]) {
        //         l = m + 1;
        //     } else {
        //         r = m;
        //     }
        // }
        // return l;
    };

    const highPrecisionManipulation = (index) => {
        let l = 0;
        let r = maxVotes * 2; //10 ** 6;

        // console.log("index", index);

        while (l < r) {
            const m = l + Math.ceil((r - l) / 2);
            const indexCompetitor = getCompetitors(m);
            const upVotes =
                prefixParty[indexCompetitor] -
                m * (indexCompetitor + 1) -
                (indexCompetitor > index ? party[index][0] - m : 0);
            // console.log(index, prefixParty[indexCompetitor] - m * (indexCompetitor + 1), l, r);
            // console.log(`m: ${m}, indexCompetitor: ${indexCompetitor}, upVotes: ${upVotes} `);

            if (m >= party[index][0] + upVotes) {
                r = m - 1;
            } else {
                l = m;
            }
        }

        const restrictLevel = l;
        // console.log("restrictLevel", restrictLevel);
        const i = getCompetitors(l);
        const upVotes = prefixParty[i] - restrictLevel * (i + 1);
        // console.log(
        //     `${index}, restrictLevel: ${restrictLevel}, competitors: ${getCompetitors(l)},` +
        //         ` upVotes: ${upVotes}, rest: ${upVotes + party[index][0] - restrictLevel - 2}, brick: ${
        //             party[index][1]
        //         } `
        // );

        return {
            restrictLevel,
            competitorsEdgeIndex: getCompetitors(l)
        };
    };

    let good = {
        restrictLevel: party[0][0],
        competitorsEdgeIndex: 0,
        index: 0,
        upVotes: 0,
        overVotes: 0
    };
    let rollback;
    let maxMoney = -1;

    // console.log(maxMoney, Math.max(1, startIndex));
    if (party.length > 1) {
        for (let i = 0 /*Math.max(1, startIndex)*/; i < n; i++) {
            const bribes = party[i][1];

            if (bribes > 0) {
                rollback = highPrecisionManipulation(i);
                const j = rollback.competitorsEdgeIndex;
                let upVotes =
                    prefixParty[j] -
                    rollback.restrictLevel * (j + 1) -
                    (j >= i ? party[i][0] - rollback.restrictLevel : 0);
                const overVotes =
                    upVotes +
                    party[i][0] -
                    rollback.restrictLevel -
                    2 -
                    (j >= i ? party[i][0] - rollback.restrictLevel : 0);
                if (overVotes > 0) upVotes -= overVotes;

                // console.log(
                //     `${i}, restrictLevel: ${rollback.restrictLevel}, competitors: ${j},` +
                //         ` upVotes: ${upVotes}, rest: ${overVotes}, brick: ${bribes} `
                // );
                if (maxMoney < 0 || maxMoney > upVotes + bribes) {
                    maxMoney = upVotes + bribes;
                    rollback.index = i;
                    rollback.upVotes = upVotes;
                    rollback.overVotes = overVotes;
                    good = rollback;
                }
            }
        }
    }

    let overVotes = good.overVotes;
    // console.log(good);

    for (let i = 0; i <= good.competitorsEdgeIndex; i++) {
        if (i !== good.index) {
            party[i][0] = good.restrictLevel;
            if (good.overVotes > 0) {
                ++party[i][0];
                good.overVotes--;
            }
        }
    }
    // console.log(party);
    party[good.index][0] += good.upVotes;

    const p1 = good.upVotes + party[good.index][1];
    const p2 = party[good.index][2] + 1;

    return [p1, p2, party.map((v) => v[0])];
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
    const n = readInt();

    const party = [];
    for (let i = 0; i < n; i++) {
        party.push(readArray());
    }

    const result = election(party);

    console.log(result[0]);
    console.log(result[1]);
    console.log(result[2].join(" "));
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

module.exports = election;
