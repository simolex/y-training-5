const solution = require(".");

describe("B. Одномерный морской бой", () => {
    test("test-1", () => {
        const result = solution(7);
        expect(result).toBe(2);
    });
    test("test-2", () => {
        const result = solution(12);
        expect(result).toBe(3);
    });
});
