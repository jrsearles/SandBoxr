import {assertIsSet} from "../utils/contracts";

export default function ($target, env, factory) {
  $target.define("has", factory.createBuiltInFunction(function (value) {
    assertIsSet(this.object, "Set.prototype.has");
    let has = this.object.data.some(e => e && env.ops.areSameOrZero(e, value));
    return factory.createPrimitive(has);
  }, 1, "Set.prototype.has"));
}
