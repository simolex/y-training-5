/**
 * E. Амбициозная улитка
 *
 * Домашний питомец мальчика Васи — улитка Петя. Петя обитает на бесконечном в обе стороны вертикальном столбе,
 * который для удобства можно представить как числовую прямую. Изначально Петя находится в точке 0. Вася кормит
 * Петю ягодами. У него есть  n  ягод, каждая в единственном экземпляре. Вася знает, что если утром он даст
 * Пете ягоду с номером  i , то поев и набравшись сил, за остаток дня Петя поднимется на  a i  единиц вверх
 * по столбу, но при этом за ночь, потяжелев, съедет на  b i  единиц вниз. Параметры различных ягод могут
 * совпадать. Пете стало интересно, а как оно там, наверху, и Вася взялся ему в этом помочь.
 * Ближайшие n дней он будет кормить Петю ягодами из своего запаса таким образом, чтобы максимальная высота,
 * на которой побывал Петя за эти  n  дней была максимальной. К сожалению, Вася не умеет программировать,
 * поэтому он попросил вас о помощи. Найдите, максимальную высоту, на которой Петя сможет побывать
 * за эти n дней и в каком порядке Вася должен давать Пете ягоды, чтобы Петя смог её достичь!
 *
 *const { join } = require("path");
 Формconst { SourceTextModule } = require("vm");
ат ввода:
 * В первой строке входных данных дано число n (1 ≤ n ≤ 5⋅10^5) — количество ягод у Васи.
 * В последующих n строках описываются параметры каждой ягоды. В i+1 строке дано два числа a[i] и b[i]
 * (0 ≤ a[i],b[i] ≤ 10^9) — то, насколько поднимется улитка за день после того, как съест i ягоду и насколько
 * опуститься за ночь.
 *
 * Формат вывода:
 * В первой строке выходных данных выведите единственное число — максимальную высоту, которую сможет достичь
 * Петя, если Вася будет его кормить оптимальным образом. В следующей строке выведите n различных целых чисел
 * от 1 до n — порядок, в котором Вася должен кормить Петю (i число в строке соответствует номеру ягоды,
 * которую Вася должен дать Пете в i день чтобы Петя смог достичь максимальной высоты).
 *
 * Примечания:
 * Во втором примере изначально улитка находится на высоте 0. Пусть сначала Петя накормит её второй ягодой,
 * а затем первой. После того как она съест вторую ягоду, за день она поднимется на 7 (и окажется на высоте 7),
 * а за ночь опустится на 4 (и окажется на высоте 3). После того как она съест первую ягоду, за день она
 * поднимется на 7 (и окажется на высоте 10), а за ночь опустится на 6 (и окажется на высоте 4).
 * Таким образом, максимальная высота, на которой побывает улитка при данном порядке кормления, равна 10.
 * Нетрудно видеть, что если Петя накормит улитку сначала первой ягодой, а затем второй, то максимальная
 * высота, на которой побывает улитка, будет меньше.
 */

function calculateMaxHeight(impulses) {
    let longPath = 0;
    const positiveSteps = [];
    const negativeSteps = [];
    let maxStep = 0;
    let minDelta = impulses[0][0] - impulses[0][1];
    let flag = minDelta < 0;
    let maxResult = 0;

    const sortSteps = (index) => {
        const delta = impulses[index][0] - impulses[index][1];
        if (delta < 0) {
            negativeSteps.push(index + 1);
        } else {
            positiveSteps.push(index + 1);
            longPath += delta;
        }
    };

    for (let i = 1; i < impulses.length; i++) {
        const newDelta = impulses[i][0] - impulses[i][1];
        if (
            // (flag && newDelta >= 0) ||
            (impulses[i][0] + minDelta > impulses[maxStep][0] && newDelta < 0) ||
            (impulses[i][0] + minDelta > impulses[maxStep][0] + newDelta && newDelta >= 0)
        ) {
            sortSteps(maxStep);
            maxStep = i;
            minDelta = newDelta;
            flag = false;
        } else {
            sortSteps(i);
        }
    }
    console.log(positiveSteps);
    console.log(negativeSteps);

    if (impulses[maxStep][0] - impulses[maxStep][1] < 0) {
        // maxResult = impulses[positiveSteps[positiveSteps.length - 1] - 1][0];
    } else {
        maxResult = impulses[maxStep][0];
    }
    positiveSteps.push(maxStep + 1);

    return [longPath + maxResult, positiveSteps.concat(negativeSteps)];
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
    const N = readInt();
    const impulses = [];

    for (let i = 0; i < N; i++) {
        impulses.push(readArray());
    }

    const result = calculateMaxHeight(impulses);

    console.log(result[0]);
    console.log(result[1].join(" "));
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

module.exports = calculateMaxHeight;
