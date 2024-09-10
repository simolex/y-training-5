const solution = require(".");

describe("D. Слоны и ладьи", () => {
    test("test-1", () => {
        const result = solution([
            "********",
            "********",
            "*R******",
            "********",
            "********",
            "********",
            "********",
            "********",
        ]);
        expect(result).toBe(49);
    });
    test("test-2", () => {
        const result = solution([
            "********",
            "********",
            "******B*",
            "********",
            "********",
            "********",
            "********",
            "********",
        ]);
        expect(result).toBe(54);
    });
    test("test-3", () => {
        const result = solution([
            "********",
            "*R******",
            "********",
            "*****B**",
            "********",
            "********",
            "********",
            "********",
        ]);
        expect(result).toBe(40);
    });
});
