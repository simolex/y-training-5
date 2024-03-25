const solution = require(".");

describe("C. Саруман", () => {
    test("test-1", () => {
        const result = solution(
            [1, 3, 5, 7, 9],
            [
                [2, 4],
                [1, 3]
            ]
        );
        expect(result).toEqual([1, 2]);
    });
});
