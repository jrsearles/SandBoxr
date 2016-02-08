import { assertIsNotNullOrUndefined } from "../../utils/contracts";
import { getOwnPropertyDescriptor, confirmObject } from "./object-helpers";

export default function ($target, env, factory) {
  $target.define("getOwnPropertyDescriptor", factory.createBuiltInFunction(function* (obj, key) {
    assertIsNotNullOrUndefined(obj, "Object.getOwnPropertyDescriptor");
    confirmObject(obj, "Object.getOwnPropertyDescriptor", env.ecmaVersion);

    return yield getOwnPropertyDescriptor(env, obj, key);
  }, 2, "Object.getOwnPropertyDescriptor"));
}
