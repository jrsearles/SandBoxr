import { assertIsSet } from "../utils/contracts";
import { isNegativeZero } from "../utils/checks";

export default function ($target, env, factory) {
  $target.define("add", factory.createBuiltInFunction(function (value) {
    assertIsSet(this.object, "Set.prototype.add");
    
    if (isNegativeZero(value)) {
      value = factory.createPrimitive(+0);
    }

    if (!this.object.data.some(e => e && env.ops.areSameOrZero(e, value))) {
      this.object.data.push(value);
    }

    return this.object;
  }, 1, "Set.prototype.add"));
}
