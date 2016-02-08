import {toLength} from "../../utils/native";
import {UNDEFINED} from "../../types/primitive-type";

export default function ($target, env, factory) {
  $target.define("pop", factory.createBuiltInFunction(function* () {
    let obj;
    let i = yield toLength(this.object);

    if (i > 0) {
      i--;

      if (this.object.has(i)) {
        obj = this.object.getValue(i);
        this.object.deleteProperty(i, true);
      }
    }

    this.object.setValue("length", factory.createPrimitive(i));
    return obj || UNDEFINED;
  }, 0, "Array.prototype.pop"));
}
