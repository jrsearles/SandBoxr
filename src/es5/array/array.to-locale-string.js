import { toLength, toString } from "../../utils/native";
import { isNullOrUndefined } from "../../utils/checks";

export default function ($target, env, factory) {
  $target.define("toLocaleString", factory.createBuiltInFunction(function* () {
    let length = yield toLength(this.object);
    let arr = new Array(length);
    let i = 0;
    let current;

    while (i < length) {
      if (this.object.has(i)) {
        current = this.object.getValue(i);

        if (isNullOrUndefined(current)) {
          arr[i] = "";
        } else {
          let func = current.getValue("toLocaleString") || current.getValue("toString");
          arr[i] = yield toString(yield func.call(current));
        }
      }

      i++;
    }

    return factory.createPrimitive(arr.join());
  }, 0, "Array.prototype.toLocaleString"));
}