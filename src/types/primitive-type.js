import {inherits} from "util";
import {ObjectType} from "./object-type";
import {getNativeType as getType} from "../utils/helpers";

export function PrimitiveType (value) {
  ObjectType.call(this);

  this.isPrimitive = true;
  this.value = value;
  this.type = typeof value;

  this.className = getType(value);
}

inherits(PrimitiveType, ObjectType);

PrimitiveType.prototype.getProperty = function (name) {
  // can't read properties of null/undefined
  if (this.value == null) {
    throw TypeError(`Cannot read property '${name}' of ${this.type}`);
  }

  return ObjectType.prototype.getProperty.apply(this, arguments);
};

PrimitiveType.prototype.toNative = function () {
  return this.value;
};

PrimitiveType.prototype.toObject = function () {
  let ctor = this.getValue("constructor");
  let env = this[Symbol.for("env")];
  let newValue = env.objectFactory.createObject(ctor);
  
  newValue.className = this.className;
  newValue.value = this.value;
  
  this.init.call(newValue, env);
  return newValue;
};

export const UNDEFINED = new PrimitiveType(undefined);
export const NULL = new PrimitiveType(null);
