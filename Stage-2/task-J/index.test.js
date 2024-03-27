const solution = require(".");

describe("J. P2P обновление", () => {
    test("test-1", () => {
        const result = solution(3, 2);
        expect(result).toEqual([3, 3]);
    });
    test("test-26", () => {
        const result = solution(5, 5);
        expect(result).toEqual([10, 11, 11, 14]);
    });
});
