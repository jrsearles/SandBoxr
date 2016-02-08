import {inherits} from "util";
import {FunctionType} from "./function-type";
import {PropertyDescriptor} from "./property-descriptor";
import {UNDEFINED} from "./primitive-type";

export function NativeFunctionType (fn) {
  FunctionType.call(this);
  
  this.type = "function";
  this.native = true;
  this.nativeFunction = fn;
}

inherits(NativeFunctionType, FunctionType);

NativeFunctionType.prototype.init = function (env, proto, {configurable = false, enumerable = false, writable = true, isConstructor = false, homeObject} = {}) {
  this[Symbol.for("env")] = env;    
  this.isConstructor = isConstructor;
  this.homeObject = homeObject;
  
  let length = this.nativeFunction.length;
  if ("nativeLength" in this.nativeFunction) {
    length = this.nativeFunction.nativeLength;
  }

  if ("strict" in this.nativeFunction) {
    this.strict = this.nativeFunction.strict;
  }

  this.setLength(length);

  if (proto !== null) {
    proto = proto || env.objectFactory.createObject();
    proto.properties.constructor = new PropertyDescriptor(this, {configurable: true, enumerable: false, writable: true, value: this}, "constructor");

    let protoDescriptor = {
      value: proto,
      configurable: configurable,
      enumerable: enumerable,
      writable: writable
    };

    this.defineProperty("prototype", protoDescriptor);
  }

  this.addPoison();
};

NativeFunctionType.prototype.call = function* (thisArg, args, callee) {
  if (this.isConstructor) {
    throw TypeError(`Function ${this.name} must be called with 'new' keyword`);
  }
  
  callee = callee || this;
  let env = this[Symbol.for("env")];

  let self = this;
  let scope = env.createExecutionScope(this, thisArg);

  return yield scope.use(function* () {
    return yield self.nativeFunction.apply(env.createExecutionContext(thisArg, callee), args || []);
  });
};

NativeFunctionType.prototype.construct = function* (thisArg, args, callee) {
  let self = this;
  let target = (callee || this).getValue();
  let env = this[Symbol.for("env")];
  let scope = env.createExecutionScope(this, thisArg, target);

  return yield scope.use(function* () {
    return yield self.nativeFunction.apply(env.createExecutionContext(thisArg, self, target), args || []);
  });
};
