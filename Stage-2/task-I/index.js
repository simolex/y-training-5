/**
 * I. Играйте в футбол!
 *
 * Ася Вуткина — известный футбольный комментатор. Будучи профессионалом своего дела, Ася тщательно следит
 * за всеми матчами всех европейских чемпионатов.
 * Благодаря накопленной информации, Ася может во время трансляции матча сообщить какую-нибудь интересную
 * статистику, например: «Индзаги третий матч подряд забивает гол на 9-й минуте» или «Матерацци никогда не
 * открывает счет в матче».
 * Но мозг Аси не безграничен, а помнить всю историю футбола просто невозможно. Поэтому Ася попросила вас
 * написать программу, которая собирает статистику матчей и умеет отвечать на некоторые запросы, касающиеся
 * истории футбола.
 * Информация о матче сообщается программе в следующей форме:
 *
 * "<Название 1-й команды>" - "<Название 2-й команды>"
 * <Счет 1-й команды>:<Счет 2-й команды>
 * <Автор 1-го забитого мяча 1-й команды> <Минута, на которой был забит мяч>'
 * <Автор 2-го забитого мяча 1-й команды> <Минута, на которой был забит мяч>'
 * ...
 * <Автор последнего забитого мяча 1-й команды> <Минута, на которой был забит мяч>'
 * <Автор 1-го забитого мяча 2-й команды> <Минута, на которой был забит мяч>'
 * ...
 * <Автор последнего забитого мяча 2-й команды> <Минута, на которой был забит мяч>'
 * Запросы к программе бывают следующих видов:
 *
 * Total goals for <Название команды>
 * — количество голов, забитое данной командой за все матчи.
 *
 * Mean goals per game for <Название команды>
 * — среднее количество голов, забиваемое данной командой за один матч.
 * Гарантирутся, что к моменту подачи такого запроса команда уже сыграла хотя бы один матч.
 *
 * Total goals by <Имя игрока>
 * — количество голов, забитое данным игроком за все матчи.
 *
 * Mean goals per game by <Имя игрока>
 * — среднее количество голов, забиваемое данным игроком за один матч его команды.
 * Гарантирутся, что к моменту подачи такого запроса игрок уже забил хотя бы один гол.
 *
 * Goals on minute <Минута> by <Имя игрока>
 * — количество голов, забитых данным игроком ровно на указанной минуте матча.
 *
 * Goals on first <T> minutes by <Имя игрока>
 * — количество голов, забитых данным игроком на минутах с первой по T-ю включительно.
 *
 * Goals on last <T> minutes by <Имя игрока>
 * — количество голов, забитых данным игроком на минутах с (91 - T)-й по 90-ю включительно.
 *
 * Score opens by <Название команды>
 * — сколько раз данная команда открывала счет в матче.
 *
 * Score opens by <Имя игрока>
 * — сколько раз данный игрок открывал счет в матче.
 *
 * Формат ввода:
 * Входной файл содержит информацию о матчах и запросы в том порядке, в котором они поступают в программу Аси Вуткиной.
 * Во входном файле содержится информация не более чем о 100 матчах, в каждом из которых забито не более 10 голов.
 * Всего в чемпионате участвует не более 20 команд, в каждой команде не более 10 игроков забивают голы.
 * Все названия команд и имена игроков состоят только из прописных и строчных латинских букв и пробелов,
 * а их длина не превышает 30. Прописные и строчные буквы считаются различными. Имена и названия не начинаются
 * и не оканчиваются пробелами и не содержат двух пробелов подряд. Каждое имя и название содержит хотя бы одну букву.
 * Минута, на которой забит гол — целое число от 1 до 90 (про голы, забитые в дополнительное время, принято говорить,
 * что они забиты на 90-й минуте).Для простоты будем считать, что голов в собственные ворота в европейских чемпионатах
 * не забивают, и на одной минуте матча может быть забито не более одного гола (в том числе на 90-й).
 * Во время чемпионата игроки не переходят из одного клуба в другой.Количество запросов во входном файле
 * не превышает 500.
 *
 * Формат вывода:
 * Для каждого запроса во входном файле выведите ответ на этот запрос в отдельной строке. Ответы на запросы,
 * подразумевающие нецелочисленный ответ, должны быть верны с точностью до трех знаков после запятой.
 *
 * Примечания:
 */

function playSoccer(commands) {
    const result = [];
    const tableGames = [];
    const indexTeams_tblGames = new Map();
    const indexPlayers_Teams = new Map();
    const tableTimes = [];

    const indexGames_tblTimes = new Map();
    const indexTeams_tblTimes = new Map();
    const indexPlayers_tblTimes = new Map();
    const gameScore = /^("[ a-zA-Z]+") - ("[ a-zA-Z]+") (\d+)\:(\d+)/i;
    const timeslot = /^(.+) (\d+)\'/i;
    const selectCommand = /^(Mean|Total|Goals|Score) .*/;

    const commandPatterns = {
        Mean: /Mean goals per game (for|by) ("?[ a-zA-Z]+"?)/i,
        Total: /Total goals (for|by) ("?[ a-zA-Z]+"?)/i,
        Goals: /Goals on (minute|first|last) (\d+) .*?by ("?[ a-zA-Z]+"?)/i,
        Score: /Score opens by ("?[ a-zA-Z]+"?)/i
    };

    const goalsComparation = {
        minute: (value, target) => value === target,
        first: (value, target) => value <= target,
        last: (value, target) => value <= 90 && value >= 91 - target
    };

    const commandFn = {
        Mean: (type, name) => {
            let forResult = "Mean";
            if (type === "for") {
                forResult = (indexTeams_tblTimes.get(name).size / indexTeams_tblGames.get(name).size).toFixed(3);
            }
            if (type === "by") {
                const team = indexPlayers_Teams.get(name).keys().next().value;
                forResult = (indexPlayers_tblTimes.get(name).size / indexTeams_tblGames.get(team).size).toFixed(3);
            }
            result.push(forResult);
        },
        Total: (type, name) => {
            let forResult = "Total";

            if (type === "for") {
                forResult = (indexTeams_tblTimes.has(name) ? indexTeams_tblTimes.get(name).size : 0).toFixed(0);
                result.push();
            }
            if (type === "by") {
                forResult = (indexPlayers_tblTimes.has(name) ? indexPlayers_tblTimes.get(name).size : 0).toFixed(0);
            }
            result.push(forResult);
        },
        Goals: (type, time, name) => {
            const cmp = goalsComparation[type];

            let count = 0;
            if (indexPlayers_tblTimes.has(name)) {
                for (const idx of indexPlayers_tblTimes.get(name)) {
                    if (cmp(tableTimes[idx], Number(time))) {
                        count++;
                    }
                }
            }
            result.push(count.toFixed(0));
        },
        Score: (name) => {
            let count = 0;
            let forResult = count.toFixed(0);

            if (indexTeams_tblGames.has(name) && indexTeams_tblTimes.has(name)) {
                const gamesSet = indexTeams_tblGames.get(name);
                const opens = new Set();
                for (const game of gamesSet) {
                    if (indexGames_tblTimes.has(game)) {
                        let minTime = 900;
                        let idxTime = -1;
                        for (const time of indexGames_tblTimes.get(game)) {
                            if (tableTimes[time] < minTime) {
                                minTime = tableTimes[time];
                                idxTime = time;
                            }
                        }
                        opens.add(idxTime);
                    }
                }
                for (const time of indexTeams_tblTimes.get(name)) {
                    if (opens.has(time)) count++;
                }
                forResult = count.toFixed(0);
            } else if (indexPlayers_Teams.has(name) && indexPlayers_tblTimes.has(name)) {
                const team = indexPlayers_Teams.get(name).keys().next().value;
                const gamesSet = indexTeams_tblGames.get(team);
                const opens = new Set();
                for (const game of gamesSet) {
                    if (indexGames_tblTimes.has(game)) {
                        let minTime = 900;
                        let idxTime = -1;

                        for (const time of indexGames_tblTimes.get(game)) {
                            if (tableTimes[time] < minTime) {
                                minTime = tableTimes[time];
                                idxTime = time;
                            }
                        }
                        opens.add(idxTime);
                    }
                }
                for (const time of indexPlayers_tblTimes.get(name)) {
                    if (opens.has(time)) count++;
                }
                forResult = count.toFixed(0);
            }
            result.push(forResult);
        }
    };

    const saveIndex = (index, value, rowTable) => {
        if (!index.has(value)) {
            index.set(value, new Set());
        }

        index.get(value).add(rowTable);
    };

    let numCommand = 0;

    while (numCommand < commands.length) {
        comm = commands[numCommand];
        let selCommand;
        if ((selCommand = selectCommand.exec(comm)) !== null) {
            const pattern = commandPatterns[selCommand[1]];
            const params = pattern.exec(comm);
            commandFn[selCommand[1]].apply(null, params.slice(1));
        } else {
            let getScore;
            if ((getScore = gameScore.exec(comm)) !== null) {
                const id_games = tableGames.length;
                const nameTeam_1 = getScore[1];
                const nameTeam_2 = getScore[2];
                const goals_1 = getScore[3];
                const goals_2 = getScore[4];

                saveIndex(indexTeams_tblGames, nameTeam_1, id_games);
                saveIndex(indexTeams_tblGames, nameTeam_2, id_games);
                tableGames.push([nameTeam_1, goals_1, nameTeam_2, goals_2]);

                let id_times = tableTimes.length;
                for (let i = 0; i < Number(goals_1); i++) {
                    comm = commands[++numCommand];
                    if ((getGoal = timeslot.exec(comm)) !== null) {
                        saveIndex(indexTeams_tblTimes, nameTeam_1, id_times);
                        saveIndex(indexPlayers_tblTimes, getGoal[1], id_times); //save index player
                        saveIndex(indexGames_tblTimes, id_games, id_times);
                        saveIndex(indexPlayers_Teams, getGoal[1], nameTeam_1);
                        tableTimes[id_times++] = Number(getGoal[2]); //save time
                    }
                }

                for (let i = 0; i < Number(goals_2); i++) {
                    comm = commands[++numCommand];
                    if ((getGoal = timeslot.exec(comm)) !== null) {
                        saveIndex(indexTeams_tblTimes, nameTeam_2, id_times);
                        saveIndex(indexPlayers_tblTimes, getGoal[1], id_times); //save index player
                        saveIndex(indexGames_tblTimes, id_games, id_times);
                        saveIndex(indexPlayers_Teams, getGoal[1], nameTeam_2);

                        tableTimes[id_times++] = Number(getGoal[2]); //save time
                    }
                }
            }
        }
        numCommand++;
    }

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
    const commands = readAllString();
    const result = playSoccer(commands);

    console.log(result.join("\n") + "\n");
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

module.exports = playSoccer;
