import {assertIsObject} from "../utils/contracts";
import {toPropertyKey} from "../utils/native";
import {UNDEFINED} from "../types/primitive-type";

export default function ($target, env, factory) {
  $target.define("get", factory.createBuiltInFunction(function* (target, propertyKey, receiver) {
    assertIsObject(target, "Reflect.get");
    let key = yield toPropertyKey(propertyKey);

    let property = target.getProperty(key);
    if (property) {
      property.bind(receiver || target);
      return property.getValue();
    }

    return UNDEFINED;
  }, 2, "Reflect.get"));
}