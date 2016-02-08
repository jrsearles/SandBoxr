import { assertIsObject } from "../../utils/contracts";

export default function ($target, env, factory) {
  $target.define("keys", factory.createBuiltInFunction(function (obj) {
    assertIsObject(obj);

    let arr = factory.createArray();
    let index = 0;

    obj.getOwnPropertyKeys().forEach(key => {
      if (typeof key === "string") {
        let propInfo = obj.getProperty(key);
        if (propInfo && propInfo.enumerable) {
          arr.setValue(index++, factory.createPrimitive(key));
        }
      }
    });

    return arr;
  }, 1, "Object.keys"));
}
