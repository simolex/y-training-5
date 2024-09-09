const solution = require(".");

describe("B. Футбольный комментатор", () => {
    test("test-1", () => {
        const result = solution("0:0", "0:0", 1);
        expect(result).toBe(1);
    });
    test("test-2", () => {
        const result = solution("0:2", "0:3", 1);
        expect(result).toBe(5);
    });
    test("test-3", () => {
        const result = solution("0:2", "0:3", 2);
        expect(result).toBe(6);
    });
});
