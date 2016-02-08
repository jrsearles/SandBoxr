import { assertIsNotGeneric } from "../../utils/contracts";
import { toPrimitive } from "../../utils/native";

export default function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function* (radix) {
    assertIsNotGeneric(this.object, "Number", "Number.prototype.toString");

    let radixValue = 10;
    if (radix) {
      radixValue = yield toPrimitive(radix, "number");
      if (radixValue < 2 || radixValue > 36) {
        throw RangeError("toString() radix argument must be between 2 and 36");
      }
    }

    return factory.createPrimitive(this.object.value == null ? "0" : this.object.value.toString(radixValue));
  }, 1, "Number.prototype.toString"));
}
