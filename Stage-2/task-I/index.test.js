const solution = require(".");

describe("I. Играйте в футбол!", () => {
    test("test-1", () => {
        const result = solution([
            '"Juventus" - "Milan" 3:1',
            "Inzaghi 45'",
            "Del Piero 67'",
            "Del Piero 90'",
            "Shevchenko 34'",
            'Total goals for "Juventus"',
            "Total goals by Pagliuca",
            "Mean goals per game by Inzaghi",
            '"Juventus" - "Lazio" 0:0',
            "Mean goals per game by Inzaghi",
            "Mean goals per game by Shevchenko",
            "Score opens by Inzaghi"
        ]);
        expect(result).toEqual(["3", "0", "1.0", "0.5", "1.0", "0"]);
    });
    test("test-2", () => {
        const result = solution(["Total goals by Arshavin"]);
        expect(result).toEqual(["a", "aa", "aa", "bc", "abcd"]);
    });
});
