const solution = require(".");

describe("F. Колесо Фортуны", () => {
    test("test-1", () => {
        const result = solution([1, 2, 3, 4, 5], 3, 5, 2);
        expect(result).toBe(5);
    });
    test("test-2", () => {
        const result = solution([1, 2, 3, 4, 5], 15, 15, 2);
        expect(result).toBe(4);
    });
    test("test-3", () => {
        const result = solution([5, 4, 3, 2, 1], 2, 5, 2);
        expect(result).toBe(5);
    });
});
