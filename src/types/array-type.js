import {ObjectType} from "./object-type";
import {toNumber, toUInt32} from "../utils/native";
import {assertIsValidArrayLength, isValidArrayLength, isInteger} from "../utils/contracts";
import iterate from "../iterators";
import {exhaust as x} from "../utils/async";

export class ArrayType extends ObjectType {
	constructor () {
		super();
		this.className = "Array";
	}

	init (env) {
		super.init(...arguments);
		this.defineOwnProperty("length", {value: env.objectFactory.createPrimitive(0), writable: true});
	}

	setValue (name, value) {
		if (name === "length") {
			return this.setLength({value}, false);
		}

		return super.setValue(...arguments);
	}

	setIndex (key, value, descriptor, throwOnError) {
		descriptor = descriptor || {value, configurable: true, enumerable: true, writable: true};

		let index = Number(key);
		let lengthProperty = this.getProperty("length");
		let lengthValue = lengthProperty.getValue().toNative();

		if ((!lengthProperty.canSetValue() && index >= lengthValue)
			|| !super.defineOwnProperty(key, descriptor)) {

			if (throwOnError) {
				throw TypeError(`Cannot define property: ${key}, object is not extensible.`);
			}

			return false;
		}

		if (index >= lengthValue) {
			let newLength = this[Symbol.for("env")].objectFactory.createPrimitive(index + 1);
			this.defineOwnProperty("length", {value: newLength});
		}

		return true;
	}

	setLength (descriptor, throwOnError) {
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
			return super.defineOwnProperty("length", descriptor, throwOnError);
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
		if (!super.defineOwnProperty("length", descriptor, throwOnError)) {
			return false;
		}

		let succeeded = true;

		if (i > newLength.toNative()) {
			for (let {key} of iterate.reverse(this, i - 1, newLength.toNative())) {
				if (!this.deleteProperty(key, false)) {
					newLength = env.objectFactory.createPrimitive(key + 1);
					this.defineOwnProperty("length", {value: newLength});
					succeeded = false;
					break;
				}
			}
		}

		if (notWritable) {
			this.defineOwnProperty("length", {writable: false});
		}

		if (!succeeded && throwOnError) {
			throw TypeError("Cannot redefine property: length");
		}

		return succeeded;
	}

	defineOwnProperty (name, descriptor, throwOnError) {
		if (isInteger(name) && isValidArrayLength(Number(name) + 1) && !this.owns(name)) {
			return this.setIndex(name, null, descriptor, throwOnError);
		}

		if (name === "length" && "length" in this.properties && descriptor && "value" in descriptor) {
			return this.setLength(descriptor, throwOnError);
		}

		return super.defineOwnProperty(...arguments);
	}

	toNative () {
		let arr = [];

		// this won't grab properties from the prototype - do we care?
		// it's an edge case but we may want to address it
		for (let index in this.properties) {
			if (this.properties[index].enumerable) {
				arr[Number(index)] = this.getValue(index).toNative();
			}
		}

		return arr;
	}
}
