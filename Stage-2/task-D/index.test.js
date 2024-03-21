const solution = require(".");

describe("D. Повторяющееся число", () => {
    test("test-1", () => {
        const result = solution(2, [1, 2, 3, 1]);
        expect(result).toBe(false);
    });
    test("test-2", () => {
        const result = solution(1, [1, 0, 1, 1]);
        expect(result).toBe(true);
    });
    test("test-3", () => {
        const result = solution(2, [1, 2, 3, 1, 2, 3]);
        expect(result).toBe(false);
    });
});
