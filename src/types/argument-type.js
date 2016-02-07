import {inherits} from "util";
import {ObjectType} from "./object-type";

export function ArgumentType (callee) {
  ObjectType.call(this);
  
  this.className = "Arguments";
  this.parameterMap = Object.create(null);
  this.callee = callee;
}

inherits(ArgumentType, ObjectType);

ArgumentType.prototype.mapProperty = function (index, binding) {
  index = String(index);
  ObjectType.prototype.defineProperty.call(this, index, {configurable: true, enumerable: true, writable: true, value: undefined}, true);
  this.parameterMap[index] = binding;
};

ArgumentType.prototype.getProperty = function (key) {
  let ownProperty = this.getOwnProperty(key);
  if (ownProperty) {
    return ownProperty;
  }

  return ObjectType.prototype.getProperty.call(this, key);
};

ArgumentType.prototype.getOwnProperty = function (key) {
  let name = String(key);

  if (name in this.parameterMap) {
    let mappedProperty = this.properties[name];
    let linkedProperty = this.parameterMap[name];

    mappedProperty.value = linkedProperty.getValue();
    mappedProperty.setValue = linkedProperty.setValue.bind(linkedProperty);
    return mappedProperty;
  }

  return ObjectType.prototype.getOwnProperty.call(this, key);
};

ArgumentType.prototype.defineProperty = function (key, descriptor, throwOnError) {
  let name = String(key);

  let allowed = ObjectType.prototype.defineProperty.apply(this, arguments);
  if (allowed && name in this.parameterMap) {
    if ("set" in descriptor || "get" in descriptor) {
      delete this.parameterMap[name];
    } else if ("value" in descriptor) {
      this.parameterMap[name].setValue(descriptor.value, throwOnError);
    }

    if ("writable" in descriptor && !descriptor.writable) {
      delete this.parameterMap[name];
    }
  }

  return allowed;
};

ArgumentType.prototype.deleteProperty = function (key, throwOnError) {
  let name = String(key);
  if (name in this.parameterMap) {
    delete this.parameterMap[name];
  }

  return ObjectType.prototype.deleteProperty.apply(this, arguments);
};
