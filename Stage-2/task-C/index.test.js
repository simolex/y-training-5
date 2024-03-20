const solution = require(".");

describe("C. Удаление чисел", () => {
    test("test-1", () => {
        const result = solution([1, 2, 3, 4, 5]);
        expect(result).toBe(3);
    });
    test("test-2", () => {
        const result = solution([1, 1, 2, 3, 5, 5, 2, 2, 1, 5]);
        expect(result).toBe(4);
    });
});
