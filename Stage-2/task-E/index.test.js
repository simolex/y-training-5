const solution = require(".");

describe("E. Два из трех", () => {
    test("test-1", () => {
        const result = solution([
            [3, 1],
            [1, 3],
            [1, 2],
        ]);
        expect(result).toEqual([1, 3]);
    });
    test("test-2", () => {
        const result = solution([[1, 2, 2], [3, 4, 3], [5]]);
        expect(result).toEqual([]);
    });
});
