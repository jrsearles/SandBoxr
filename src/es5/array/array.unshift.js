import { toLength } from "../../utils/native";

export default function ($target, env, factory) {
  $target.define("unshift", factory.createBuiltInFunction(function* (...items) {
    let length = yield toLength(this.object);
    let argCount = items.length;
    let i = length;
    let toIndex, fromIndex;

    while (i > 0) {
      fromIndex = i - 1;
      toIndex = i + argCount - 1;

      if (this.object.has(fromIndex)) {
        this.object.setValue(toIndex, this.object.getValue(fromIndex));
      } else {
        this.object.deleteProperty(toIndex, true);
      }

      i--;
    }

    for (i = 0; i < argCount; i++) {
      this.object.setValue(i, items[i]);
    }

    let newLength = factory.createPrimitive(argCount + length);
    this.object.setValue("length", newLength);
    return newLength;
  }, 1, "Array.prototype.unshift"));
}