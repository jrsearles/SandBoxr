import { UNDEFINED } from "../../types/primitive-type";
import { isUndefined } from "../../utils/checks";
import { toString } from "../../utils/native";
import { getNativeType as getType } from "../../utils/helpers";

export default function ($target, env, factory) {
  function createReviver (reviver) {
    if (reviver && reviver.className === "Function") {
      return function* (holder, key, value) {
        let args = [factory.createPrimitive(key), value];
        return yield* reviver.call(holder, args);
      };
    }

    return (holder, key, value) => value;
  }

  function* deserialize (value, reviver) {
    let valueType = getType(value);
    switch (valueType) {
      // these are the only types supported by JSON.parse - sad face...
      case "Undefined":
      case "Null":
      case "String":
      case "Number":
      case "Boolean":
        return factory.create(valueType, value);

      case "Array":
        let arr = factory.createArray();

        for (let i = 0, ln = value.length; i < ln; i++) {
          let element = value[i];
          let elementValue = yield reviver(arr, String(i), yield deserialize(element, reviver));

          if (!isUndefined(elementValue)) {
            arr.setIndex(i, yield deserialize(element));
          }
        }

        return arr;

      default:
        let obj = factory.createObject();
        let propValue;

        for (let prop in value) {
          if (value.hasOwnProperty(prop)) {
            propValue = yield reviver(obj, prop, yield deserialize(value[prop], reviver));
            if (!isUndefined(propValue)) {
              obj.defineProperty(prop, { value: propValue, configurable: true, enumerable: true, writable: true });
            }
          }
        }

        return obj;
    }
  }

  $target.define("parse", factory.createBuiltInFunction(function* (str, reviver) {
    reviver = createReviver(reviver);

    let stringValue = yield toString(str);
    let parsedObject = JSON.parse(stringValue);
    let deserializedObject = yield deserialize(parsedObject, reviver);

    return yield reviver(deserializedObject, "", deserializedObject) || UNDEFINED;
  }, 2, "JSON.parse"));
}
