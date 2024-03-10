const solution = require(".");

describe("E. Амбициозная улитка", () => {
    test("test-1", () => {
        const result = solution([
            [1, 5],
            [8, 2],
            [4, 4]
        ]);
        expect(result).toEqual([10, [2, 3, 1]]);
    });
    test("test-2", () => {
        const result = solution([
            [7, 6],
            [7, 4]
        ]);
        expect(result).toEqual([10, [2, 1]]);
    });
});
