import { assertIsObject } from "../utils/contracts";
import { isUndefined } from "../utils/checks";
import { toPropertyKey } from "../utils/native";

export default function ($target, env, factory) {
  $target.define("set", factory.createBuiltInFunction(function* (target, key, value, receiver) {
    assertIsObject(target, "Reflect.set");
    let k = yield toPropertyKey(key);

    if (isUndefined(receiver)) {
      receiver = target;
    }

    return factory.createPrimitive(target.setValue(k, value, receiver));
  }, 3, "Reflect.set"));
}
