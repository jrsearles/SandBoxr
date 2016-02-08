import {assertIsSet} from "../utils/contracts";
import {UNDEFINED} from "../types/primitive-type";

export default function ($target, env, factory) {
  $target.define("forEach", factory.createBuiltInFunction(function* (callback, thisArg) {
    assertIsSet(this.object, "Set.prototype.forEach");

    thisArg = thisArg || UNDEFINED;
    let data = this.object.data;
    let index = 0;

    // length might change during iteration
    while (index < data.length) {
      let entry = data[index++];
      if (entry) {
        let args = [entry, entry, this.object];
        yield callback.call(thisArg, args);
      }
    }
  }, 1, "Set.prototype.forEach"));
}
