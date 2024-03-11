const solution = require(".");

describe("E. Прибыльный стартап", () => {
    test("test-1", () => {
        const result = solution(21, 108, 1);
        expect(result).toBe(216);
    });
    test("test-2", () => {
        const result = solution(5, 12, 4);
        expect(result).toBe(-1);
    });
});
