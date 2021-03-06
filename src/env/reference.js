import { assertIsValidIdentifier } from "../utils/contracts";

export function Reference (key, base, env) {
  this.isReference = true;
  this.unqualified = false;

  this.key = key;
  this.base = base;
  this.env = env;
  this.strict = env.isStrict();
}

Reference.prototype = {
  constructor: Reference,
  
  /**
   * Returns the value of the reference. If the reference is unresolved,
   * a ReferenceError will be thrown.
   * @returns {ObjectType} The value.
   */
  getValue () {
    if (!this.base) {
      throw ReferenceError(`${this.key} is not defined`);
    }

    return this.base.getValue(this.key, this.strict);
  },

  /**
   * Sets the value of the underlying property or value.
   * @param {ObjectType} value - The value to assign.
   * @param {Boolean} throwOnError - Causes errors to be thrown.
   * @returns {Boolean} The result of the value assignment.
   */
  setValue (value, throwOnError) {
    if (this.base) {
      if (!this.base.setValue(this.key, value) && this.strict) {
        throw TypeError();
      }

      return true;
    }

    // check identifier before strict
    assertIsValidIdentifier(this.key, this.strict, this.env.ecmaVersion);

    if (this.strict) {
      throw ReferenceError(`${this.key} is not defined`);
    }

    return this.env.global.defineProperty(this.key, {
      value: value,
      configurable: true,
      enumerable: true,
      writable: true
    },
    false,
    this.env);
  },

  isStrict () {
    return this.strict || this.env.isStrict();
  },

  /**
   * Deletes the underlying reference.
   * @returns {Boolean} The result of the delete operation.
   */
  ["delete"] () {
    if (this.base) {
      return this.base.deleteVariable(this.key);
    }

    return true;
  },

  /**
   * Indicates whether the reference is resolved or not.
   * @returns {Boolean} true if resolves; false otherwise.
   */
  isUnresolved () {
    return !this.base;
  }
};
