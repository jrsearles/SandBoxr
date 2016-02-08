import {toLength, toObject} from "../../utils/native";
import {assertIsFunction} from "../../utils/contracts";
import iterate from "../../iterators/";
import {executeCallback} from "./array-helpers";

export default function ($target, env, factory) {
  $target.define("forEach", factory.createBuiltInFunction(function* (callback, thisArg) {
    let arr = toObject(this.object);
    let length = yield toLength(arr);
    assertIsFunction(callback, arr);

    for (let entry of iterate.forward(arr, 0, length)) {
      yield executeCallback(env, callback, entry, thisArg, arr);
    }
  }, 1, "Array.prototype.forEach"));
}