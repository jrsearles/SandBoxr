import {toLength, toObject} from "../../utils/native";
import {assertIsFunction, assertIsNotNullOrUndefined} from "../../utils/contracts";
import iterate from "../../iterators/";
import {executeCallback} from "./array-helpers";
import {createDataProperty} from "../../utils/helpers";

export default function ($target, env, factory) {
  $target.define("map", factory.createBuiltInFunction(function* (callback, thisArg) {
    let arr = toObject(this.object);
    let length = yield toLength(arr);

    assertIsNotNullOrUndefined(arr, "Array.prototype.map");
    assertIsFunction(callback, arr);

    let newArray = yield factory.createArrayFromSpecies(this.object, length);
    newArray.setValue("length", factory.createPrimitive(length));

    for (let entry of iterate.forward(arr, 0, length)) {
      let value = yield executeCallback(env, callback, entry, thisArg, arr);
      createDataProperty(newArray, entry.key, value);
      // newArray.defineProperty(entry.key, {value, configurable: true, enumerable: true, writable: true});
    }

    return newArray;
  }, 1, "Array.prototype.map"));
}