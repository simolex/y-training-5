const solution = require(".");

describe("E. Прибыльный стартап", () => {
    test("test-1", () => {
        const result = solution([5, 7, 2]);
        expect(result).toEqual(["x", "+"]);
    });
    test("test-2", () => {
        const result = solution([4, -5]);
        expect(result).toEqual(["+"]);
    });
    test("test-4", () => {
        const result = solution([4, 7, 2]);
        expect(result).toEqual(["+", "+"]);
    });
    test("test-5", () => {
        const result = solution([2, 7, 2, 7]);
        expect(result).toEqual(["+", "x", "+"]);
    });
});
