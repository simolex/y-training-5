const solution = require(".");

describe("G. Разрушить казарму", () => {
    test("test-1", () => {
        const result = solution(10, 11, 15);
        expect(result).toBe(4);
    });
    test("test-2", () => {
        const result = solution(1, 2, 1);
        expect(result).toBe(-1);
    });
    test("test-4", () => {
        const result = solution(1, 1, 1);
        expect(result).toBe(1);
    });
    test("test-5", () => {
        const result = solution(25, 200, 10);
        expect(result).toBe(13);
    });
});
