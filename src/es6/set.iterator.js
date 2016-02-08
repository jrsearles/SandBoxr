import { assertIsSet } from "../utils/contracts";

export default function ($target, env, factory) {
  function* getIterator (obj, kind) {
    let index = 0;
    let done = false;

    while (!done) {
      let value;

      while (index < obj.data.length) {
        value = obj.data[index++];
        if (value) {
          break;
        }
      }

      done = !value;
      if (value && kind !== "key" && kind !== "value") {
        value = factory.createArray([value, value]);
      }

      yield factory.createIteratorResult({ value, done });
    }
  }

  let proto = factory.createObject();
  proto.setPrototype(env.global.getValue("%IteratorPrototype%"));
  proto.define(env.getSymbol("toStringTag"), factory.createPrimitive("Set Iterator"), { writable: false });

  proto.define("next", factory.createBuiltInFunction(function () {
    let result = this.object.advance();
    if (result.value) {
      return result.value;
    }

    return factory.createIteratorResult({ done: result.done });
  }, 0, "SetIterator.prototype.next"));

  $target.define("entries", factory.createBuiltInFunction(function () {
    assertIsSet(this.object, "Set.prototype.entries");
    let it = getIterator(this.object, "key+value");
    return factory.createIterator(it, proto);
  }, 0, "Set.prototype.entries"));

  let valuesFunc = factory.createBuiltInFunction(function () {
    assertIsSet(this.object, "Set.prototype.values");
    let it = getIterator(this.object, "value");
    return factory.createIterator(it, proto);
  }, 0, "Set.prototype.values");


  $target.define("values", valuesFunc);
  $target.define("keys", valuesFunc);

  let iteratorKey = env.getSymbol("iterator");
  $target.define(iteratorKey, valuesFunc);
}
