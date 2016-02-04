import {PrimitiveType} from "./primitive-type";
import {isInteger} from "../utils/native";

const charAttrs = {writable: false, enumerable: true, configurable: false};

function lazyInit (instance, key) {
	let nativeValue = instance.value;
	if (!nativeValue || !isInteger(key) || "0" in instance.properties) {
		return;
	}
  
  if (nativeValue.length === 1) {
    instance.define("0", instance, charAttrs);
    return;
  }

	for (let i = 0, ln = nativeValue.length; i < ln; i++) {
    let c = instance[Symbol.for("env")].objectFactory.create("String", nativeValue[i]);
		instance.define(i, c, charAttrs);
	}
}

export function StringType (value) {
  PrimitiveType.call(this, value);
}

StringType.prototype = Object.create(PrimitiveType.prototype);
StringType.prototype.constructor = StringType;

StringType.prototype.init = function (env) {
  PrimitiveType.prototype.init.apply(this, arguments);
  
  let length = this.value.length;
  this.define("length", env.objectFactory.create("Number", length), {configurable: false, writable: false});

  if (length === 1) {
    this.define("0", this, {enumerable: true, configurable: false});
  }
};

StringType.prototype.getProperty = function (key) {
  lazyInit(this, key);
  return PrimitiveType.prototype.getProperty.apply(this, arguments);
};

StringType.prototype.getOwnProperty = function (key) {
  lazyInit(this, key);
  return PrimitiveType.prototype.getOwnProperty.apply(this, arguments);
};

StringType.prototype.getOwnPropertyKeys = function () {
  lazyInit(this, 0);
  return PrimitiveType.prototype.getOwnPropertyKeys.apply(this, arguments);
};

StringType.prototype.has = function (key) {
  lazyInit(this, key);
  return PrimitiveType.prototype.has.apply(this, arguments);
};

StringType.prototype.owns = function (key) {
  lazyInit(this, key);
  return PrimitiveType.prototype.owns.apply(this, arguments);
};

StringType.prototype.toObject = function () {
  let obj = PrimitiveType.prototype.toObject.call(this);
  
  // set all character properties
  lazyInit(obj, 0);
  return obj;
};
