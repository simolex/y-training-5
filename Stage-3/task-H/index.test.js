const solution = require(".");

describe("H. Выборы", () => {
    test("test-1", () => {
        const result = solution([
            [7, -1],
            [2, 8],
            [1, 2]
        ]);
        expect(result).toEqual([6, 3, [3, 2, 5]]);
    });
    test("test-2", () => {
        const result = solution([[239, 239]]);
        expect(result).toEqual([239, 1, [239]]);
    });
    test("test-3", () => {
        const result = solution([
            [239, 239],
            [238, -1]
        ]);
        expect(result).toEqual([239, 1, [239, 238]]);
    });
    test("test-4", () => {
        const result = solution([
            [239, 239],
            [239, -1]
        ]);
        expect(result).toEqual([240, 1, [240, 238]]);
    });
    test("test-5", () => {
        const result = solution([
            [239, 239],
            [240, -1]
        ]);
        expect(result).toEqual([240, 1, [240, 239]]);
    });
    test("test-14", () => {
        const result = solution([
            [2, 3],
            [3, 1],
            [5, -1],
            [3, 3],
            [5, 4],
            [2, 1],
            [2, 1],
            [3, 4],
            [5, 2],
            [3, -1]
        ]);
        expect(result).toEqual([3, 9, [2, 3, 5, 3, 4, 2, 2, 3, 6, 3]]);
    });
    test("test-51", () => {
        const result = solution([
            [999752, 844759],
            [993867, 841816],
            [986613, 837960],
            [937429, 802772],
            [922645, 791684],
            [904200, 777848],
            [902833, 776825],
            [893585, 769889],
            [888288, 765914],
            [878957, 758918],
            [875193, 756095],
            [847658, 735443],
            [842843, 731831],
            [830441, 722531],
            [826325, 719444],
            [822824, 716816],
            [822460, 716543],
            [816195, 711845],
            [807342, 705206],
            [806746, 704759],
            [798139, 698303],
            [793396, 694745],
            [788210, 690857],
            [786291, 689417],
            [781812, 686057],
            [778831, 683822],
            [776321, 681941],
            [774429, 680522],
            [737070, 650882],
            [694483, 616773],
            [676119, 601473],
            [666835, 593733],
            [645753, 576168],
            [637437, 569238],
            [637004, 568873],
            [628732, 561983],
            [628605, 561878],
            [624962, 558838],
            [618930, 553813],
            [610163, 546508],
            [596422, 535058],
            [588604, 528543],
            [573632, 515767],
            [570518, 513044],
            [558993, 502957],
            [527131, 475076],
            [525034, 473242],
            [513564, 463204],
            [509724, 459844],
            [508446, 458731],
            [503406, 454321],
            [498459, 449947],
            [492015, 444219],
            [491693, 443931],
            [468372, 423203],
            [456480, 412635],
            [450971, 407709],
            [448637, 405603],
            [448072, 405099],
            [411246, 371952],
            [373556, 338031],
            [373367, 337860],
            [342170, 309620],
            [338728, 306490],
            [306833, 277399],
            [302544, 273472],
            [294674, 266256],
            [285916, 258226],
            [274155, 247446],
            [269321, 243013],
            [268781, 242518],
            [267566, 241407],
            [260590, 235016],
            [254378, 229318],
            [242780, 218692],
            [239806, 215964],
            [232753, 209496],
            [229959, 206933],
            [194913, 174813],
            [180739, 161822],
            [150127, 133761],
            [144761, 128833],
            [136404, 121177],
            [129163, 114544],
            [122954, 108846],
            [117076, 103456],
            [114503, 101102],
            [100702, 88452],
            [76630, 66386],
            [61882, 52867],
            [54561, 46157],
            [43250, 35784],
            [33846, 27160],
            [32740, 26148],
            [22747, 16996],
            [19316, 13850],
            [17552, 12233],
            [11635, 6810],
            [4752, 496],
            [4210, 1]
        ]);
        expect(result).toEqual([
            844749,
            93,
            [
                851434, 851434, 851434, 851434, 851434, 851434, 851434, 851434, 851434, 851434, 851433, 847658, 842843,
                830441, 826325, 822824, 822460, 816195, 807342, 806746, 798139, 793396, 788210, 786291, 781812, 778831,
                776321, 774429, 737070, 694483, 676119, 666835, 645753, 637437, 637004, 628732, 628605, 624962, 618930,
                610163, 596422, 588604, 573632, 570518, 558993, 527131, 525034, 513564, 509724, 508446, 503406, 498459,
                492015, 491693, 468372, 456480, 450971, 448637, 448072, 411246, 373556, 373367, 342170, 338728, 306833,
                302544, 294674, 285916, 274155, 269321, 268781, 267566, 260590, 254378, 242780, 239806, 232753, 229959,
                194913, 180739, 150127, 144761, 136404, 129163, 122954, 117076, 114503, 100702, 76630, 61882, 54561,
                43250, 851435, 32740, 22747, 19316, 17552, 11635, 4752, 4210
            ]
        ]);
    });
});
