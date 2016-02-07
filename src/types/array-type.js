import {inherits} from "util";
import {ObjectType} from "./object-type";
import {toNumber, toUInt32, isInteger, isValidArrayLength} from "../utils/native";
import {assertIsValidArrayLength} from "../utils/contracts";
import iterate from "../iterators";
import {exhaust as x} from "../utils/async";

export function ArrayType () {
  ObjectType.call(this);
  this.className = "Array";
}

inherits(ArrayType, ObjectType);

ArrayType.prototype.init = function (env) {
  ObjectType.prototype.init.apply(this, arguments);
  this.defineProperty("length", {value: env.objectFactory.createPrimitive(0), writable: true});
};

ArrayType.prototype.setValue = function (name, value) {
  if (name === "length") {
    return this.setLength({value}, false);
  }

  return ObjectType.prototype.setValue.apply(this, arguments);
};

ArrayType.prototype.setIndex = function (key, value, descriptor, throwOnError) {
  descriptor = descriptor || {value, configurable: true, enumerable: true, writable: true};

  let index = Number(key);
  let lengthProperty = this.getProperty("length");
  let lengthValue = lengthProperty.getValue().toNative();

  if ((!lengthProperty.canSetValue() && index >= lengthValue)
    || !ObjectType.prototype.defineProperty.call(this, key, descriptor)) {

    if (throwOnError) {
      throw TypeError(`Cannot define property: ${key}, object is not extensible.`);
    }

    return false;
  }

  if (index >= lengthValue) {
    let newLength = this[Symbol.for("env")].objectFactory.createPrimitive(index + 1);
    this.defineProperty("length", {value: newLength});
  }

  return true;
};

ArrayType.prototype.setLength = function (descriptor, throwOnError) {
  let env = this[Symbol.for("env")];

  let newLengthValue = x(toUInt32(descriptor.value));
  if (newLengthValue !== x(toNumber(descriptor.value))) {
    throw RangeError("Array length out of range");
  }

  descriptor.value = env.objectFactory.createPrimitive(newLengthValue);
  let newLength = descriptor.value;
  let currentLength = this.getValue("length");
  assertIsValidArrayLength(newLength.toNative());

  if (newLength.toNative() >= currentLength.toNative()) {
    return ObjectType.prototype.defineProperty.call(this, "length", descriptor, throwOnError);
  }

  let isWritable = this.getProperty("length").writable;
  if (isWritable === false) {
    if (throwOnError) {
      throw TypeError("Cannot redefine property: length");
    }

    return false;
  }

  let notWritable = "writable" in descriptor && !descriptor.writable;
  if (notWritable) {
    // set to writable in case removing items fails
    descriptor.writable = true;
  }

  let i = currentLength.toNative();
  if (!ObjectType.prototype.defineProperty.call(this, "length", descriptor, throwOnError)) {
    return false;
  }

  let succeeded = true;

  if (i > newLength.toNative()) {
    for (let {key} of iterate.reverse(this, i - 1, newLength.toNative())) {
      if (!this.deleteProperty(key, false)) {
        newLength = env.objectFactory.createPrimitive(key + 1);
        this.defineProperty("length", {value: newLength});
        succeeded = false;
        break;
      }
    }
  }

  if (notWritable) {
    this.defineProperty("length", {writable: false});
  }

  if (!succeeded && throwOnError) {
    throw TypeError("Cannot redefine property: length");
  }

  return succeeded;
};

ArrayType.prototype.defineProperty = function (name, descriptor, throwOnError) {
  if (isInteger(name) && isValidArrayLength(Number(name) + 1) && !this.owns(name)) {
    return this.setIndex(name, null, descriptor, throwOnError);
  }

  if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
    return this.setLength(descriptor, throwOnError);
  }

  return ObjectType.prototype.defineProperty.apply(this, arguments);
};

ArrayType.prototype.toNative = function () {
  let length = this.properties.length.getValue().toNative();
  let arr = new Array(length);

  // this won't grab properties from the prototype - do we care?
  // it's an edge case but we may want to address it
  for (let index in this.properties) {
    if (this.properties[index].enumerable) {
      arr[Number(index)] = this.getValue(index).toNative();
    }
  }

  return arr;
};
