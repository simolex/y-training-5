const solution = require(".");

describe("B. Анаграмма?", () => {
    test("test-1", () => {
        const result = solution("dusty", "study");
        expect(result).toBe(true);
    });
    test("test-2", () => {
        const result = solution("rat", "bat");
        expect(result).toBe(false);
    });
});
