const solution = require(".");

describe("F. Замена слов", () => {
    test("test-1", () => {
        const result = solution(["a", "b"], ["abdafb", "basrt", "casds", "dsasa", "a"]);
        expect(result).toEqual(["a", "b", "casds", "dsasa", "a"]);
    });
    test("test-2", () => {
        const result = solution(["aa", "bc", "aaa"], ["a", "aa", "aaa", "bcd", "abcd"]);
        expect(result).toEqual(["a", "aa", "aa", "bc", "abcd"]);
    });
    test("test-3", () => {
        const result = solution(["bc", "aaa", "aa"], ["a", "aa", "aaa", "bcd", "abcd"]);
        expect(result).toEqual(["a", "aa", "aa", "bc", "abcd"]);
    });
});
