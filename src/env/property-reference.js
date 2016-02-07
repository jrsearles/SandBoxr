import {inherits} from "util";
import {Reference} from "./reference";
import {UNDEFINED} from "../types/primitive-type";

/**
 * An object which represents a reference to an object's property.
 */
export function PropertyReference (key, object, env) {
  Reference.call(this, key, object, env);
  this.isPropertyReference = true;
}

inherits(PropertyReference, Reference);

/**
 * Returns the value of the reference. If the reference is unresolved,
 * a ReferenceError will be thrown.
 * @returns {ObjectType} The value.
 */
PropertyReference.prototype.getValue = function () {
  let propInfo = this.base.getProperty(this.key);
  
  let value = propInfo && propInfo.getValue();
  if (value && value.isReference) {
    value = value.getValue();
  }
  
  return value || UNDEFINED;
};

/**
 * Sets the value of the underlying property or value.
 * @param {ObjectType} value - The value to assign.
 * @param {Boolean} throwOnError - Set true if a failed assignment should throw an exception.
 * @returns {Boolean} The result of the value assignment.
 */
PropertyReference.prototype.setValue = function (value, throwOnError) {
  let propInfo = this.base.getProperty(this.key);
  if (propInfo && !propInfo.initialized) {
    throw ReferenceError(`Cannot ${this.key} before it has been initialized`);
  }
  
  if (throwOnError) {
    // todo: why can't this go in the setValue function?
    if (propInfo && !propInfo.canSetValue()) {
      throw TypeError(`Cannot assign to read only property '${this.key}'`);
    }

    if (!propInfo && !this.base.isExtensible()) {
      throw TypeError(`Cannot assign to '${this.key}' on non-extensible object`);
    }
  }

  let result = this.base.setValue(this.key, value);
  if (!result && throwOnError) {
    throw TypeError(`Cannot assign to read only property '${this.key}'`);
  }

  return result;
};

/**
 * Deletes the underlying reference.
 * @returns {Boolean} The result of the delete operation.
 */
PropertyReference.prototype["delete"] = function () {
  return this.base.deleteProperty(this.key, this.env.isStrict());
};

/**
 * Indicates whether the reference is resolved or not.
 * @returns {Boolean} true if resolves; false otherwise.
 */
PropertyReference.prototype.isUnresolved = function () {
  return false;
};
