import { UNDEFINED } from "../types/primitive-type";
import { assertIsNotNullOrUndefined } from "../utils/contracts";
import { toString } from "../utils/native";

export default function (target, env, factory) {
  let iteratorProto = factory.createObject();
  iteratorProto.setPrototype(env.global.getValue("%IteratorPrototype%"));
  iteratorProto.className = "String Iterator";

  iteratorProto.define("next", factory.createBuiltInFunction(function () {
    let result = this.object.advance();
    if (result.value) {
      return result.value;
    }

    let obj = factory.createObject();
    obj.define("done", factory.createPrimitive(result.done));
    return obj;
  }, 0, "StringIterator.prototype.next"));

  function* getIterator (stringValue) {
    let length = stringValue.length;
    let done = false;
    let index = 0;

    while (!done) {
      let value = UNDEFINED;

      if (index === length) {
        done = true;
      }  else {
        let char = stringValue[index++];
        if (index < length) {
          let first = char.charCodeAt(0);
          if (first >= 0xD800 && first <= 0xDBFF) {
            let second = stringValue.charCodeAt(index);
            if (second >= 0xDC00 && second <= 0xDFFF) {
              char += stringValue[index++];
            }
          }
        }
      
        value = factory.createPrimitive(char);
      }

      yield factory.createIteratorResult({ value, done });
    }
  }

  let iteratorKey = env.getSymbol("iterator");
  target.define(iteratorKey, factory.createBuiltInFunction(function* () {
    assertIsNotNullOrUndefined(this.object, "String.protoype[Symbol.iterator]");
    let stringValue = yield toString(this.object);
    let it = getIterator(stringValue);
    return factory.createIterator(it, iteratorProto);
  }, 0, "[Symbol.iterator]"));
  
  let stringTagKey = env.getSymbol("toStringTag");
  iteratorProto.define(stringTagKey, factory.createPrimitive("String Iterator"), { writable: false });
}
