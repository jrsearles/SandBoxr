var ObjectType = require("./object-type");
var types = require("../utils/types");
var contracts = require("../utils/contracts");
var convert = require("../utils/convert");

var localObjectFactory;

// Let index be ToUint32(P).
// Reject if index ≥ oldLen and oldLenDesc.[[Writable]] is false.
// Let succeeded be the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing P, Desc, and false as arguments.
// Reject if succeeded is false.
// If index ≥ oldLen
// Set oldLenDesc.[[Value]] to index + 1.
// Call the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", oldLenDesc, and false as arguments. This call will always return true.
// Return true.

function setIndex (context, arr, name, descriptor, throwOnError) {
	var index = Number(name);
	var lengthProperty = arr.getProperty("length");
	var lengthValue = lengthProperty.getValue().value;

	if ((!lengthProperty.canSetValue() && index >= lengthValue)
		|| !ObjectType.prototype.defineOwnProperty.call(arr, name, null, descriptor, false, context)) {

		if (throwOnError) {
			throw new TypeError("Cannot define property: " + name + ", object is not extensible.");
		}

		return false;
	}

	if (index >= lengthValue) {
		var newLength = localObjectFactory.createPrimitive(index + 1);
		arr.defineOwnProperty("length", null, { value: newLength }, false, context);
	}

	return true;
}

// Let index be ToUint32(P).
// Reject if index ≥ oldLen and oldLenDesc.[[Writable]] is false.
// Let succeeded be the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing P, Desc, and false as arguments.
// Reject if succeeded is false.
// If index ≥ oldLen
// Set oldLenDesc.[[Value]] to index + 1.
// Call the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", oldLenDesc, and false as arguments. This call will always return true.
// Return true.

// function setIndex (context, arr, name, descriptor, throwOnError) {
// 	var index = convert.toUInt32(context, descriptor.value);
// 	var lengthProperty = arr.getProperty("length");

// 	if (!lengthProperty.canSetValue() && index >= lengthProperty.getValue(arr).value) {
// 		if (throwOnError) {
// 			throw new TypeError("Cannot define property: " + name + ", object is not extensible.");
// 		}

// 		return false;
// 	}
// }

function setLength (context, arr, name, descriptor, throwOnError) {
	var newLengthValue = convert.toUInt32(context, descriptor.value);
	if (newLengthValue !== convert.toNumber(context, descriptor.value)) {
		if (throwOnError) {
			throw new RangeError("Array length out of range");
		}

		return false;
	}

	descriptor.value = localObjectFactory.createPrimitive(newLengthValue);
	var newLength = descriptor.value;
	var currentLength = arr.getProperty("length").getValue();
	contracts.assertIsValidArrayLength(newLength.value);

	if (newLength.value >= currentLength.value) {
		return ObjectType.prototype.defineOwnProperty.call(arr, name, null, descriptor, throwOnError);
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
	if (!ObjectType.prototype.defineOwnProperty.call(arr, name, null, descriptor, throwOnError)) {
		return false;
	}

	var succeeded = true;
	while (i > newLength.value) {
		if (!arr.deleteProperty(--i, false)) {
			newLength = localObjectFactory.createPrimitive(i + 1);
			arr.defineOwnProperty("length", null, { value: newLength }, false);
			succeeded = false;
			break;
		}
	}

	if (notWritable) {
		arr.defineOwnProperty("length", null, { writable: false }, false);
	}

	if (!succeeded && throwOnError) {
		throw new TypeError("Cannot redefine property: length");
	}

	return succeeded;
}

function ArrayType () {
	ObjectType.call(this);
	this.className = "Array";
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.constructor = ArrayType;

ArrayType.prototype.putValue = function (name, value, throwOnError, context) {
	if (!this.hasOwnProperty(name)) {
		this.defineOwnProperty(name, null, { value: value, configurable: true, enumerable: true, writable: true }, throwOnError);
		return;
	}

	// if (types.isInteger(name)) {
	// 	setIndex(context, this, name, { value: value }, false);
	// 	return;
	// }

	if (name === "length") {
		setLength(context, this, name, { value: value }, throwOnError);
		return;
	}

	// resizeArray(this, name);
	// setLength(this, name, value);
	ObjectType.prototype.putValue.apply(this, arguments);
	// this.defineOwnProperty(name, null, { value: value }, false);
};

ArrayType.prototype.defineOwnProperty = function (name, value, descriptor, throwOnError, context) {
	if (types.isInteger(name) && "value" in descriptor) {
		return setIndex(context, this, name, descriptor, throwOnError);
	}

	if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
		return setLength(context, this, name, descriptor, throwOnError);
	}

	return ObjectType.prototype.defineOwnProperty.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	localObjectFactory = objectFactory;
	this.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });
};

module.exports = ArrayType;
