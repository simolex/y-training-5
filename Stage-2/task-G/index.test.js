const solution = require(".");

describe("G. Построить квадрат", () => {
    test("test-1", () => {
        const result = solution([
            [1, 0],
            [0, 1],
        ]);
        expect(result).toEqual([
            [0, 0],
            [1, 1],
        ]);
    });
    test("test-2", () => {
        const result = solution([
            [0, 2],
            [2, 0],
            [2, 2],
        ]);
        expect(result).toEqual([[0, 0]]);
    });
    test("test-3", () => {
        const result = solution([
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, -1],
        ]);
        expect(result).toEqual([]);
    });
});
