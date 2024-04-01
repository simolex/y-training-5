const solution = require(".");

describe("H. Выборы", () => {
    test("test-1", () => {
        const result = solution(5, 6, [
            [5, 4],
            [2, 6],
            [4, 1],
            [2, 3],
            [1, 4]
        ]);
        expect(result).toBe(3);
    });
    test("test-2", () => {
        const result = solution(4, 3, [
            [1, 1],
            [4, 3],
            [4, 1],
            [1, 3]
        ]);
        expect(result).toBe(3);
    });
});
