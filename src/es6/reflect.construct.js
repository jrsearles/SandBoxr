import {assertIsFunction, assertIsObject} from "../utils/contracts";
import {toArray} from "../utils/native";
import {isUndefined, isConstructor} from "../utils/checks";

export default function ($target, env, factory) {
  $target.define("construct", factory.createBuiltInFunction(function* (target, argsArray, newTarget) {
    assertIsFunction(target, "target");

    if (argsArray) {
      assertIsObject(argsArray, "Reflect.construct");
    }

    if (!isUndefined(newTarget) && !isConstructor(newTarget)) {
      throw TypeError("Provided newTarget is not a constructor.");
    }
    
    let args = yield toArray(argsArray);
    let ctor = newTarget || target;
    let obj = factory.createObject(ctor);
    
    return yield target.construct(obj, args, ctor);
  }, 2, "Reflect.construct"));
}
