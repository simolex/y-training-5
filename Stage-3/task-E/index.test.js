const solution = require(".");

describe("E. Нумерация дробей", () => {
    test("test-1", () => {
        const result = solution(1n);
        expect(result).toEqual([1n, 1n]);
    });
    test("test-2", () => {
        const result = solution(6n);
        expect(result).toEqual([3n, 1n]);
    });
    test("test-3", () => {
        const result = solution(2n);
        expect(result).toEqual([2n, 1n]);
    });
});
