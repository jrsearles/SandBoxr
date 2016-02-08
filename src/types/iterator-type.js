import { inherits } from "util";
import { ObjectType } from "./object-type";

export function IteratorType (iterable, kind = "key+value") {
  ObjectType.call(this);

  this.iterable = iterable;
  this.position = 0;
  this.className = "Iterator";
  this.kind = kind;
}

inherits(IteratorType, ObjectType);

IteratorType.prototype.init = function (env, proto) {
  ObjectType.prototype.init.apply(this, arguments);
  
  if (!proto) {
    let factory = env.objectFactory;
    proto = factory.createObject();
    proto.className = "[Symbol.iterator]";
    proto.setPrototype(env.global.getValue("%IteratorPrototype%"));
    
    proto.define("next", factory.createBuiltInFunction(function () {
      let result = this.object.advance();
      if (result.value) {
        return result.value;
      }
      
      return factory.createIteratorResult({ done: true });
    }));
  }

  this.setPrototype(proto);
};

IteratorType.prototype.advance = function () {
  return this.iterable.next();
};
