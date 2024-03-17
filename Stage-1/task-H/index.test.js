const solution = require(".");

describe("H. Наилучший запрет", () => {
    test("test-1", () => {
        const result = solution([
            [1, 2],
            [3, 4]
        ]);
        expect(result).toEqual([2, 2]);
    });
    test("test-2", () => {
        const result = solution([
            [1, 3, 5, 7],
            [9, 11, 2, 4],
            [6, 8, 10, 12]
        ]);
        expect(result).toEqual([3, 2]);
    });
});
