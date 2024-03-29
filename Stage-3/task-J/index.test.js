const solution = require(".");

describe("H. Выборы", () => {
    test("test-1", () => {
        const result = solution(7, 7.0, [
            [-5, 10],
            [-3, 4],
            [-1, 6],
            [1, -4],
            [4, 17],
            [5, 3],
            [9, 5],
            [12, 15]
        ]);
        expect(result).toBeCloseTo(15.8446, 4);
    });
});
