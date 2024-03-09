const solution = require(".");

describe("A. Минимальный прямоугольник", () => {
    test("test-1", () => {
        const result = solution([
            [1, 3],
            [3, 1],
            [3, 5],
            [6, 3]
        ]);
        expect(result).toEqual([1, 1, 6, 5]);
    });
});
