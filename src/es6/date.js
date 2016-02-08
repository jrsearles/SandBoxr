import {toPrimitiveOrdinary, toString} from "../utils/native";
import {assertIsObject} from "../utils/contracts";

export default function (globalObject, env, factory) {
  let dateClass = globalObject.getValue("Date");
  let toPrimitiveKey = env.getSymbol("toPrimitive");

  let proto = dateClass.getValue("prototype");
  proto.define(toPrimitiveKey, factory.createBuiltInFunction(function* (hint) {
    assertIsObject(this.object);
    let primitiveHint;
    
    if (hint && hint.type === "string") {
      switch (hint.value) {
        case "string":
        case "default":
          primitiveHint = "string";
          break;
          
        case "number":
          primitiveHint = "number";
          break;
          
        default:
          break;
      }
    }
    
    if (!primitiveHint) {
      throw TypeError(`Invalid hint '${yield toString(hint)}'' used in primitive conversion`);
    }
    
    let value = yield toPrimitiveOrdinary(this.object, primitiveHint);
    return factory.createPrimitive(value);
  }, 1, "[Symbol.toPrimitive]"));
}
