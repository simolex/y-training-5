const solution = require(".");

describe("D. Шахматная доска", () => {
    test("test-1", () => {
        const result = solution([
            [1, 1],
            [1, 2],
            [2, 1]
        ]);
        expect(result).toBe(8);
    });
    test("test-2", () => {
        const result = solution([[8, 8]]);
        expect(result).toBe(4);
    });
});
