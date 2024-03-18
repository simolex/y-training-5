const solution = require(".");

describe("I. Пираты Баренцева моря", () => {
    test("test-1", () => {
        const result = solution(3, [
            [1, 2],
            [3, 3],
            [1, 1]
        ]);
        expect(result).toBe(3);
    });
    test("test-13", () => {
        const result = solution(10, [
            [9, 4],
            [8, 9],
            [5, 4],
            [10, 8],
            [7, 9],
            [10, 5],
            [9, 2],
            [8, 10],
            [3, 9],
            [6, 2]
        ]);
        expect(result).toBe(48);
    });
});
