const solution = require(".");

describe("B. Продавец рыбы", () => {
    test("test-1", () => {
        const result = solution(5, 2, [1, 2, 3, 4, 5]);
        expect(result).toBe(2);
    });
    test("test-2", () => {
        const result = solution(5, 2, [5, 4, 3, 2, 1]);
        expect(result).toBe(0);
    });
    test("test-3", () => {
        const result = solution(1, 1, [1, 4]);
        expect(result).toBe(0);
    });
    test("test-4", () => {
        const result = solution(1, 1, [5, 4]);
        expect(result).toBe(0);
    });
    test("test-5", () => {
        const result = solution(4, 3, [6, 7, 2, 6]);
        expect(result).toBe(4);
    });
});
