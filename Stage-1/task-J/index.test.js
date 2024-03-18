const solution = require(".");

describe("J. Два прямоугольника", () => {
    test("test-1", () => {
        const result = solution(2, 1, ["#", "."]);
        expect(result).toEqual([]);
    });
    test("test-2", () => {
        const result = solution(2, 2, ["..", "##"]);
        expect(result).toEqual(["..", "ab"]);
    });
    test("test-3", () => {
        const result = solution(1, 3, ["###"]);
        expect(result).toEqual(["abb"]);
    });
    test("test-4", () => {
        const result = solution(1, 5, ["####."]);
        expect(result).toEqual(["abbb."]);
    });
});
