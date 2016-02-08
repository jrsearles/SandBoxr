import { assertIsNotNullOrUndefined } from "../utils/contracts";
import { isObject, isNull } from "../utils/checks";

export default function ($target, env, factory) {
  $target.define("setPrototypeOf", factory.createBuiltInFunction(function (target, proto) {
    assertIsNotNullOrUndefined(target, "setPrototypeOf");

    if (!isObject(proto) && !isNull(proto)) {
      throw TypeError("Object prototype may only be an Object or null");
    }

    if (isObject(target) && !target.setPrototype(proto)) {
      throw TypeError(`${target.className} is not extensible`);
    }

    return target;
  }, 2, "Object.setPrototypeOf"));
}
