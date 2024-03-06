const solution = require(".");

describe("A. Покраска деревьев", () => {
    test("test-1", () => {
        const result = solution(0, 7, 12, 5);
        expect(result).toBe(25);
    });
    test("test-2", () => {
        const result = solution(0, 0, 12, 0);
        expect(result).toBe(2);
    });
    test("test-3", () => {
        const result = solution(12, 0, 0, 0);
        expect(result).toBe(2);
    });
});
