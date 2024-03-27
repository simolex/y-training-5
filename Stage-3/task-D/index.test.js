const solution = require(".");

describe("D. Рапорт", () => {
    test("test-1", () => {
        const result = solution(15, [2, 2, 2, 3, 2, 2], [3, 3, 5, 2, 4, 3]);
        expect(result).toBe(3);
    });
});
