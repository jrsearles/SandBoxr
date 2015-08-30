import ArrayType from "../types/array-type";
import * as contracts from "../utils/contracts";
import * as func from "../utils/func";
import * as convert from "../utils/convert";

function getStartIndex (index, length) {
	if (index < 0) {
		return Math.max(length - Math.abs(index), 0);
	}

	return Math.min(index || 0, length);
}

function getEndIndex (index, length) {
	if (index < 0) {
		return Math.max(length + index, 0);
	}

	return Math.min(index, length);
}

function getLength (env, source) {
	if (source.hasProperty("length")) {
		return convert.toUInt32(env, source.getValue("length"));
	}

	return 0;
}

function executeCallback (callback, thisArg, executionContext, index) {
	let undef = executionContext.env.global.getValue("undefined");
	let objectFactory = executionContext.env.objectFactory;
	let arr = convert.toObject(executionContext.env, executionContext.node);
	
	if (!thisArg) {
		thisArg = callback.isStrict() ? undef : executionContext.env.global;
	}
	
	let scope = executionContext.env.createScope(thisArg);
	scope.init(callback.node.body);

	let args = [executionContext.node.getProperty(index).getValue(), objectFactory.createPrimitive(index), arr];
	let executionResult;

	func.loadArguments(executionContext.env, callback.node.params, args, callback);

	try {
		executionResult = executionContext.create(callback.node.body, callback.node).execute();
		return executionResult ? executionResult.result : undef;
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	let arr = convert.toObject(executionContext.env, executionContext.node);
	let scope = executionContext.env.createScope();
	scope.init(callback.node.body);

	let undef = executionContext.env.global.getValue("undefined");
	let objectFactory = executionContext.env.objectFactory;
	let args = [priorValue || undef, executionContext.node.getProperty(index).getValue() || undef, objectFactory.createPrimitive(index), arr];
	let executionResult;

	func.loadArguments(executionContext.env, callback.node.params, args, callback);

	try {
		executionResult = executionContext.create(callback.node.body, callback.node).execute();
		return executionResult ? executionResult.result : undef;
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
}

function createIndexProperty (value) {
	return {
		value: value,
		configurable: true,
		enumerable: true,
		writable: true
	};
}

export default function arrayApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;
	const undef = globalObject.getValue("undefined");

	let arrayClass = objectFactory.createFunction(function (length) {
		let newArray = objectFactory.create("Array");

		if (arguments.length > 0) {
			if (arguments.length === 1 && length.type === "number") {
				contracts.assertIsValidArrayLength(arguments[0].value);
				newArray.putValue("length", length, false, this);
			} else {
				for (let i = 0, ln = arguments.length; i < ln; i++) {
					newArray.defineOwnProperty(i, createIndexProperty(arguments[i]), false, env);
				}
			}
		}

		return newArray;
	}, null, { configurable: false, enumerable: false, writable: false });

	let proto = arrayClass.getProperty("prototype").getValue();
	proto.className = "Array";
	proto.define("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });

	arrayClass.define("isArray", objectFactory.createBuiltInFunction(function (obj) {
		return objectFactory.createPrimitive(!!(obj && obj.className === "Array"));
	}, 1, "Array.isArray"));

	proto.define("push", objectFactory.createBuiltInFunction(function () {
		let start = getLength(env, this.node);
		let i = 0;
		
		for (let length = arguments.length; i < length; i++) {
			this.node.defineOwnProperty(start + i, createIndexProperty(arguments[i]), true, env);
		}

		let newLength = objectFactory.createPrimitive(start + i);
		this.node.putValue("length", newLength, true);
		return newLength;
	}, 1, "Array.prototype.push"));

	proto.define("pop", objectFactory.createBuiltInFunction(function () {
		let obj;
		let i = getLength(env, this.node);

		if (i > 0) {
			i--;

			if (this.node.hasProperty(i)) {
				obj = this.node.getProperty(i).getValue();
				this.node.deleteProperty(i, true);
			}
		}

		this.node.putValue("length", objectFactory.createPrimitive(i));
		return obj || undef;
	}, 0, "Array.prototype.pop"));

	proto.define("shift", objectFactory.createBuiltInFunction(function () {
		let obj;
		let length = getLength(env, this.node);
		let i = 0;

		if (length > 0) {
			if (this.node.hasProperty(i)) {
				obj = this.node.getProperty(i).getValue();
				this.node.deleteProperty(i);
			}

			while (++i < length) {
				if (this.node.hasProperty(i)) {
					this.node.putValue(i - 1, this.node.getProperty(i).getValue());
				} else {
					this.node.deleteProperty(i);
				}
			}

			this.node.deleteProperty(length - 1);
		}

		this.node.putValue("length", objectFactory.createPrimitive(length === 0 ? 0 : --length));
		return obj || undef;
	}, 0, "Array.prototype.shift"));

	proto.define("unshift", objectFactory.createBuiltInFunction(function () {
		let length = getLength(env, this.node);
		let argCount = arguments.length;
		let i = length;
		let toIndex, fromIndex;

		while (i > 0) {
			fromIndex = i - 1;
			toIndex = i + argCount - 1;

			if (this.node.hasProperty(fromIndex)) {
				this.node.putValue(toIndex, this.node.getProperty(fromIndex).getValue(), true);
			} else {
				this.node.deleteProperty(toIndex, true);
			}

			i--;
		}

		for (i = 0; i < argCount; i++) {
			this.node.putValue(i, arguments[i], true);
		}

		let newLength = objectFactory.createPrimitive(argCount + length);
		this.node.putValue("length", newLength, true);
		return newLength;
	}, 1, "Array.prototype.unshift"));

	proto.define("slice", objectFactory.createBuiltInFunction(function (begin, end) {
		let source = this.node;
		let length = getLength(env, this.node);
		begin = begin ? convert.toInteger(env, begin) : 0;

		if (!end || end.type === "undefined") {
			end = length;
		} else {
			end = convert.toInteger(env, end);
		}

		let arr = objectFactory.create("Array");
		let index = 0;

		begin = getStartIndex(begin, length);
		end = getEndIndex(end, length);

		for (let i = begin; i < end; i++) {
			arr.defineOwnProperty(index++, createIndexProperty(source.getProperty(i).getValue()), true, env);
		}

		return arr;
	}, 2, "Array.prototype.slice"));

	proto.define("splice", objectFactory.createBuiltInFunction(function (start, deleteCount, ...elements) {
		let length = getLength(env, this.node);

		start = convert.toInteger(env, start);
		if (start < 0) {
			start = Math.max(length + start, 0);
		} else {
			start = Math.min(start, length);
		}

		deleteCount = convert.toInteger(env, deleteCount);
		if (deleteCount < 0) {
			deleteCount = 0;
		} else {
			deleteCount = Math.min(Math.max(deleteCount, 0), length - start);
		}

		let removed = objectFactory.create("Array");

		let k = 0;
		while (k < deleteCount) {
			if (this.node.hasProperty(k + start)) {
				removed.defineOwnProperty(k, createIndexProperty(this.node.getProperty(k + start).getValue()), true, env);
			}

			k++;
		}

		let newCount = elements.length;
		if (newCount < deleteCount) {
			k = start;

			while (k < length - deleteCount) {
				if (this.node.hasProperty(k + deleteCount)) {
					this.node.putValue(k + newCount, this.node.getProperty(k + deleteCount).getValue());
				} else {
					this.node.deleteProperty(k + deleteCount);
				}

				k++;
			}

			k = length;
			while (k > length - deleteCount + newCount) {
				this.node.deleteProperty(--k);
			}
		} else if (newCount > deleteCount) {
			k = length - start;
			while (k > start) {
				if (this.node.hasProperty(k + deleteCount - 1)) {
					this.node.putValue(k + newCount - 1, this.node.getProperty(k + deleteCount - 1).getValue());
				} else {
					this.node.deleteProperty(k + newCount - 1);
				}

				k--;
			}
		}

		k = start;
		for (let i = 0; i < newCount; i++) {
			this.node.putValue(k, elements[i]);
			k++;
		}

		this.node.putValue("length", objectFactory.createPrimitive(length - deleteCount + newCount));
		return removed;
	}, 2, "Array.prototype.splice"));

	proto.define("concat", objectFactory.createBuiltInFunction(function (...arrays) {
		let newArray = objectFactory.create("Array");

		// add "this" array to bunch
		arrays.unshift(convert.toObject(env, this.node));

		let current, index = 0, i, length;
		while (arrays.length > 0) {
			current = arrays.shift();

			if (current instanceof ArrayType) {
				for (i = 0, length = current.getProperty("length").getValue().value; i < length; i++) {
					if (current.hasProperty(i)) {
						newArray.defineOwnProperty(index, createIndexProperty(current.getProperty(i).getValue()), true, env);
					}

					index++;
				}
			} else {
				newArray.defineOwnProperty(index++, createIndexProperty(current), true, env);
			}
		}

		newArray.putValue("length", objectFactory.createPrimitive(index), true);
		return newArray;
	}, 1, "Array.prototype.concat"));

	function join (separator) {
		let length = getLength(env, this.node);
		separator = arguments.length === 0 || separator === undef ? "," : convert.toPrimitive(env, separator, "string");
		let stringValues = [];
		let stringValue;

		for (let i = 0; i < length; i++) {
			stringValue = "";
			if (this.node.hasProperty(i)) {
				stringValue = this.node.getProperty(i).getValue();
				if (contracts.isNullOrUndefined(stringValue)) {
					stringValue = "";
				} else {
					stringValue = convert.toString(env, stringValue);
				}
			}

			stringValues.push(stringValue);
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}

	proto.define("join", objectFactory.createBuiltInFunction(join, 1, "Array.prototype.join"));

	proto.define("indexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		searchElement = searchElement || undef;
		let length = getLength(env, this.node);
		let index = arguments.length === 1 ? 0 : convert.toInteger(env, fromIndex);
		const notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (; index < length; index++) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getProperty(index).getValue() || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return notFound;
	}, 1, "Array.prototype.indexOf"));

	proto.define("lastIndexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		searchElement = searchElement || undef;
		let length = getLength(env, this.node);
		let index = arguments.length === 1 ? length - 1 : convert.toInteger(env, fromIndex);

		if (index < 0) {
			index = length - Math.abs(index);
		}

		for (; index >= 0; index--) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getProperty(index).getValue() || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}, 1, "Array.prototype.lastIndexOf"));

	proto.define("forEach", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		let length = getLength(env, this.node);
		contracts.assertIsFunction(callback, this.node);

		for (let i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}, 1, "Array.prototype.forEach"));

	proto.define("map", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		let length = getLength(env, this.node);
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.map");
		contracts.assertIsFunction(callback, this.node);

		let newArray = objectFactory.create("Array");
		newArray.putValue("length", objectFactory.createPrimitive(length));

		for (let i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				newArray.defineOwnProperty(i, createIndexProperty(executeCallback(callback, thisArg, this, i)), true, env);
			}
		}

		return newArray;
	}, 1, "Array.prototype.map"));

	proto.define("filter", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.filter");
		let length = getLength(env, this.node);
		contracts.assertIsFunction(callback, this.node);

		let newArray = objectFactory.create("Array");

		for (let i = 0, index = 0; i < length; i++) {
			if (this.node.hasProperty(i) && convert.toBoolean(executeCallback(callback, thisArg, this, i))) {
				newArray.defineOwnProperty(index++, createIndexProperty(this.node.getProperty(i).getValue()), true, env);
			}
		}

		return newArray;
	}, 1, "Array.prototype.filter"));

	proto.define("every", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");
		let length = getLength(env, this.node);
		contracts.assertIsFunction(callback, this.node);

		for (let i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && !convert.toBoolean(executeCallback(callback, thisArg, this, i))) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}, 1, "Array.prototype.every"));

	proto.define("some", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.some");
		let length = getLength(env, this.node);
		contracts.assertIsFunction(callback, this.node);

		for (let i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && convert.toBoolean(executeCallback(callback, thisArg, this, i))) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Array.prototype.some"));

	proto.define("reduce", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		let length = getLength(env, this.node);
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduce");
		contracts.assertIsFunction(callback, this.node);

		let index = 0;
		let value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index < length && !(this.node.hasProperty(index))) {
				index++;
			}

			if (index >= length) {
				throw new TypeError("Reduce of empty array with no initial value");
			}

			value = this.node.getProperty(index++).getValue();
		}

		for (; index < length; index++) {
			if (this.node.hasProperty(index)) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}, 1, "Array.prototype.reduce"));

	proto.define("reduceRight", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		let length = getLength(env, this.node);
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduceRight");
		contracts.assertIsFunction(callback, this.node);

		let accumulator;

		if (length === 0 && arguments.length === 1) {
			throw new TypeError("Reduce of empty array with no initial value");
		}

		let k = length - 1;
		if (arguments.length >= 2) {
			accumulator = initialValue;
		} else {
			// make sure array isn't empty
			let hasElements = false;
			while (k >= 0 && !hasElements) {
				hasElements = this.node.hasProperty(k);
				if (hasElements) {
					accumulator = this.node.getProperty(k).getValue();
				}

				k--;
			}

			if (!hasElements) {
				throw new TypeError("Reduce of empty array with no initial value");
			}
		}

		while (k >= 0) {
			if (this.node.hasProperty(k)) {
				accumulator = executeAccumulator(callback, accumulator, this, k);
			}

			k--;
		}

		return accumulator;
	}, 1, "Array.prototype.reduceRight"));

	proto.define("reverse", objectFactory.createBuiltInFunction(function () {
		let length = getLength(env, this.node);
		let middle = Math.floor(length / 2);
		let lower = 0;
		let upper, upperValue, lowerValue;

		while (lower !== middle) {
			upper = length - lower - 1;
			lowerValue = this.node.hasProperty(lower) && this.node.getProperty(lower).getValue();
			upperValue = this.node.hasProperty(upper) && this.node.getProperty(upper).getValue();

			if (upperValue) {
				this.node.putValue(lower, upperValue, true);
			}

			if (lowerValue) {
				this.node.putValue(upper, lowerValue, true);
			}

			if (upperValue && !lowerValue) {
				this.node.deleteProperty(upper);
			} else if (lowerValue && !upperValue) {
				this.node.deleteProperty(lower);
			}

			lower++;
		}

		return this.node;
	}, 0, "Array.prototype.reverse"));

	proto.define("sort", objectFactory.createBuiltInFunction(function (compareFunction) {
		let executionContext = this;
		let arr = this.node;
		let length = getLength(env, arr);
		let i = 0;

		let comparer;
		if (contracts.isNullOrUndefined(compareFunction)) {
			comparer = function defaultComparer (a, b) {
				a = convert.toString(env, a);
				b = convert.toString(env, b);

				if (a < b) {
					return -1;
				}

				if (a > b) {
					return 1;
				}

				return 0;
			};
		} else {
			comparer = function (a, b) {
				let scope = env.createScope(undef);
				scope.init(compareFunction.node.body);

				func.loadArguments(env, compareFunction.node.params, [a, b], compareFunction);
				let executionResult;

				try {
					executionResult = executionContext.create(compareFunction.node.body, compareFunction.node).execute();
				} catch (err) {
					scope.exitScope();
					throw err;
				}

				scope.exitScope();

				if (executionResult && executionResult.exit && executionResult.result) {
					return executionResult.result.getValue().value;
				}

				return undefined;
			};
		}

		// convert to array, run the wrapped comparer, then re-assign indexes
		let sortedArray = convert.toArray(arr, length)
			// undefined positions are handled by the underlying sort algorithm, so replace them with the raw primitive value
			.map(el => { return el.isPrimitive && el.value === undefined ? undefined : el })
			.sort(comparer);

		while (i < length) {
			if (i in sortedArray) {
				arr.putValue(i, sortedArray[i], false, env);
			} else {
				arr.deleteProperty(i, false);
			}

			i++;
		}

		return arr;
	}, 1, "Array.prototype.sort"));

	proto.define("toLocaleString", objectFactory.createBuiltInFunction(function () {
		let length = getLength(env, this.node);
		let arr = new Array(length);
		let i = 0;
		let current;

		while (i < length) {
			if (this.node.hasProperty(i)) {
				current = this.node.getProperty(i).getValue();

				if (contracts.isNullOrUndefined(current)) {
					arr[i] = "";
				} else {
					arr[i] = convert.toString(env, func.tryCallMethod(env, current, "toLocaleString"));
				}
			}

			i++;
		}

		return objectFactory.createPrimitive(arr.join());
	}, 0, "Array.prototype.toLocaleString"));

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.define("toString", objectFactory.createBuiltInFunction(join, 0, "Array.prototype.toString"));
	globalObject.define("Array", arrayClass);
}
