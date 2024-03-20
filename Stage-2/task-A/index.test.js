const solution = require(".");

describe("A. Плейлисты", () => {
    test("test-1", () => {
        const result = solution(1, [["GoGetIt", "Life"]]);
        expect(result).toEqual(["GoGetIt", "Life"]);
    });
    test("test-2", () => {
        const result = solution(2, [
            ["Love", "Life"],
            ["Life", "GoodDay"],
        ]);
        expect(result).toEqual(["Life"]);
    });
});
