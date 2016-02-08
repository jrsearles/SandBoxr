import {assertIsObject} from "../../utils/contracts";

export default function ($target, env, factory) {
  $target.define("getOwnPropertyNames", factory.createBuiltInFunction(function (obj) {
    assertIsObject(obj, "Object.getOwnPropertyNames");

    let arr = factory.createArray();
    obj.getOwnPropertyKeys().forEach((name, index) => {
      arr.setValue(index, factory.createPrimitive(name));
    });

    return arr;
  }, 1, "Object.getOwnPropertyNames"));
}
