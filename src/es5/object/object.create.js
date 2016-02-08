import { toString } from "../../utils/native";
import { defineProperty } from "./object-helpers";

export default function ($target, env, factory) {
  $target.define("create", factory.createBuiltInFunction(function* (parent, descriptors) {
    if (parent && parent.isPrimitive && parent.value !== null) {
      let stringValue = yield toString(parent);
      throw TypeError(`Object prototype may only be an Object or null: ${stringValue}`);
    }

    if (descriptors && descriptors.isPrimitive && descriptors.value === null) {
      throw TypeError("Cannot convert null or undefined to object");
    }

    let obj = factory.createObject();

    if (parent) {
      obj.setPrototype(parent);
    }

    if (descriptors) {
      for (let prop in descriptors.properties) {
        if (descriptors.properties[prop].enumerable) {
          yield defineProperty(env, obj, prop, descriptors.getValue(prop));
        }
      }
    }

    return obj;
  }, 2, "Object.create"));
}
