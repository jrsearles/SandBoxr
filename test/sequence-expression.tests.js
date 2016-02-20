import { es5 as runner } from "./test-runner";

describe("Expressions", () => {
  describe("Sequence", () => {
    it("should assign to last value in sequence", done => {
      runner.confirmBlock("var a = (7, 5);a===5;", done);
    }); 
  });
});
