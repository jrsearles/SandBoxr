import ObjectType from "./object-type";
import * as convert from "../utils/convert";
import * as contracts from "../utils/contracts";
import iterate from "../iterators";
import {exhaust as x} from "../utils/async";

function setIndex (env, arr, name, descriptor, throwOnError) {
	let index = Number(name);
	let lengthProperty = arr.getProperty("length");
	let lengthValue = lengthProperty.getValue().unwrap();

	if ((!lengthProperty.canSetValue() && index >= lengthValue)
		|| !ObjectType.prototype.defineOwnProperty.call(arr, name, descriptor, false, env)) {

		if (throwOnError) {
			throw new TypeError("Cannot define property: " + name + ", object is not extensible.");
		}

		return false;
	}

	if (index >= lengthValue) {
		let newLength = env.objectFactory.createPrimitive(index + 1);
		arr.defineOwnProperty("length", { value: newLength }, false, env);
	}

	return true;
}

function* setLength (env, arr, name, descriptor, throwOnError) {
	let newLengthValue = yield convert.toUInt32(env, descriptor.value);
	if (newLengthValue !== (yield convert.toNumber(env, descriptor.value))) {
		throw new RangeError("Array length out of range");
	}

	descriptor.value = env.objectFactory.createPrimitive(newLengthValue);
	let newLength = descriptor.value;
	let currentLength = arr.getProperty("length").getValue();
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

	let notWritable = "writable" in descriptor && !descriptor.writable;
	if (notWritable) {
		// set to writable in case removing items fails
		descriptor.writable = true;
	}

	let i = currentLength.value;
	if (!ObjectType.prototype.defineOwnProperty.call(arr, name, descriptor, throwOnError)) {
		return false;
	}

	let succeeded = true;

	if (i > newLength.value) {
		for (let entry of iterate.reverse(env, arr, i - 1, newLength.value)) {
			if (!arr.deleteProperty(entry.index, false)) {
				newLength = env.objectFactory.createPrimitive(entry.index + 1);
				arr.defineOwnProperty("length", { value: newLength}, false, env);
				succeeded = false;
				break;
			}
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

export default class ArrayType extends ObjectType {
	constructor () {
		super();
		this.className = "Array";
	}

	init (objectFactory) {
		this.defineOwnProperty("length", { value: objectFactory.createPrimitive(0), configurable: false, enumerable: false, writable: true });
	}

	putValue (name, value, throwOnError, env) {
		if (name === "length") {
			x(setLength(env, this, name, { value }, throwOnError));
			return;
		}

		super.putValue.apply(this, arguments);
	}

	defineOwnProperty (name, descriptor, throwOnError, env) {
		if (contracts.isInteger(name) && contracts.isValidArrayLength(Number(name) + 1) && !this.hasOwnProperty(name)) {
			return setIndex(env, this, name, descriptor, throwOnError);
		}

		if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
			return x(setLength(env, this, name, descriptor, throwOnError));
		}

		return super.defineOwnProperty.apply(this, arguments);
	}

	unwrap () {
		let arr = [];

		// this won't grab properties from the prototype - do we care?
		// it's an edge case but we may want to address it
		for (let index in this.properties) {
			if (this.properties[index].enumerable) {
				arr[Number(index)] = this.getValue(index).unwrap();
			}
		}

		return arr;
	}
}
