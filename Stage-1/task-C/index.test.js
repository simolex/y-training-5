const solution = require(".");

describe("C. Петя, Маша и верёвочки", () => {
    test("test-1", () => {
        const result = solution([1, 5, 2, 1]);
        expect(result).toBe(1);
    });
    test("test-2", () => {
        const result = solution([5, 12, 4, 3]);
        expect(result).toBe(24);
    });
});
