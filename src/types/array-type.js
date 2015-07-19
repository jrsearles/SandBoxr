var ObjectType = require("./object-type");
var types = require("../utils/types");
var contracts = require("../utils/contracts");
var convert = require("../utils/convert");

// todo: this is hacky - remove this for passed in environment
var localObjectFactory;

function setIndex (env, arr, name, descriptor, throwOnError) {
	var index = Number(name);
	var lengthProperty = arr.getProperty("length");
	var lengthValue = lengthProperty.getValue().value;

	if ((!lengthProperty.canSetValue() && index >= lengthValue)
		|| !ObjectType.prototype.defineOwnProperty.call(arr, name, descriptor, false, env)) {

		if (throwOnError) {
			throw new TypeError("Cannot define property: " + name + ", object is not extensible.");
		}

		return false;
	}

	if (index >= lengthValue) {
		var newLength = localObjectFactory.createPrimitive(index + 1);
		arr.defineOwnProperty("length", { value: newLength }, false, env);
	}

	return true;
}

function setLength (env, arr, name, descriptor, throwOnError) {
	var newLengthValue = convert.toUInt32(env, descriptor.value);
	if (newLengthValue !== convert.toNumber(env, descriptor.value)) {
		throw new RangeError("Array length out of range");
	}

	descriptor.value = localObjectFactory.createPrimitive(newLengthValue);
	var newLength = descriptor.value;
	var currentLength = arr.getProperty("length").getValue();
	contracts.assertIsValidArrayLength(newLength.value);

	if (newLength.value >= currentLength.value) {
		return ObjectType.prototype.defineOwnProperty.call(arr, name, descriptor, throwOnError);
	}

	if (arr.properties.length.writable === false) {
		if (throwOnError) {
			throw new TypeError("Cannot redefine property: length");
		}

		return false;
	}

	var notWritable = "writable" in descriptor && !descriptor.writable;
	if (notWritable) {
		// set to writable in case removing items fails
		descriptor.writable = true;
	}

	var i = currentLength.value;
	if (!ObjectType.prototype.defineOwnProperty.call(arr, name, descriptor, throwOnError)) {
		return false;
	}

	var succeeded = true;
	while (i > newLength.value) {
		if (!arr.deleteProperty(--i, false)) {
			newLength = localObjectFactory.createPrimitive(i + 1);
			arr.defineOwnProperty("length", { value: newLength }, false);
			succeeded = false;
			break;
		}
	}

	if (notWritable) {
		arr.defineOwnProperty("length", { writable: false }, false);
	}

	if (!succeeded && throwOnError) {
		throw new TypeError("Cannot redefine property: length");
	}

	return succeeded;
}

function descriptorHasValue (descriptor) {
	return descriptor && ("value" in descriptor || "getter" in descriptor);
}

function ArrayType () {
	ObjectType.call(this);
	this.className = "Array";
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.constructor = ArrayType;

ArrayType.prototype.putValue = function (name, value, throwOnError, env) {
	if (name === "length") {
		setLength(env, this, name, { value: value }, throwOnError);
		return;
	}

	ObjectType.prototype.putValue.apply(this, arguments);
};

ArrayType.prototype.defineOwnProperty = function (name, descriptor, throwOnError, env) {
	if (types.isInteger(name) && contracts.isValidArrayLength(Number(name) + 1) && !this.hasOwnProperty(name)) {
		return setIndex(env, this, name, descriptor, throwOnError);
	}

	if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
		return setLength(env, this, name, descriptor, throwOnError);
	}

	return ObjectType.prototype.defineOwnProperty.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	localObjectFactory = objectFactory;
	this.defineOwnProperty("length", { value: objectFactory.createPrimitive(0), configurable: false, enumerable: false, writable: true });
};

module.exports = ArrayType;
