import {UNDEFINED} from "../types/primitive-type";
import * as contracts from "../utils/contracts";
import {tryExecute as tryExec} from "../utils/func";
import {toString,toPrimitive,toInteger,toUInt32,toBoolean,toObject,toArray} from "../utils/native";
import iterate from "../iterators";
import {exhaust as x} from "../utils/async";

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

function* getLength (env, source) {
	if (source.hasProperty("length")) {
		return yield toUInt32(env, source.getValue("length"));
	}

	return 0;
}

export default function arrayApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;

	function* executeCallback (callback, entry, thisArg, arr) {
		if (!thisArg) {
			thisArg = callback.isStrict() ? UNDEFINED : env.global;
		}

		let scope = env.createScope(thisArg);
		scope.init(callback.node.body);

		let args = [entry.value, objectFactory.createPrimitive(entry.index), arr];
		scope.loadArgs(callback.node.params, args, callback);

		return yield scope.use(function* () {
			let executionResult = yield env.createExecutionContext(callback.node.body, callback.node).execute();
			return executionResult ? executionResult.result : UNDEFINED;
		});
	}

	function* executeAccumulator (callback, priorValue, entry, arr) {
		let scope = env.createScope();
		scope.init(callback.node.body);

		let args = [priorValue || UNDEFINED, entry.value || UNDEFINED, objectFactory.createPrimitive(entry.index), arr];
		scope.loadArgs(callback.node.params, args, callback);

		return yield scope.use(function* () {
			let executionResult = yield env.createExecutionContext(callback.node.body, callback.node).execute();
			return executionResult ? executionResult.result : UNDEFINED;
		});
	}

	function createIndexProperty (value) {
		return {
			value: value,
			configurable: true,
			enumerable: true,
			writable: true
		};
	}

	let arrayClass = objectFactory.createFunction(function (length) {
		let newArray = objectFactory.create("Array");

		if (arguments.length > 0) {
			if (arguments.length === 1 && length.type === "number") {
				contracts.assertIsValidArrayLength(arguments[0].value);
				newArray.putValue("length", length, false, env);
			} else {
				for (let i = 0, ln = arguments.length; i < ln; i++) {
					newArray.defineOwnProperty(i, createIndexProperty(arguments[i]), false, env);
				}
			}
		}

		return newArray;
	}, null, { configurable: false, enumerable: false, writable: false });

	let proto = arrayClass.getValue("prototype");
	proto.className = "Array";
	proto.define("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });

	arrayClass.define("isArray", objectFactory.createBuiltInFunction(function (obj) {
		return objectFactory.createPrimitive(!!(obj && obj.className === "Array"));
	}, 1, "Array.isArray"));

	proto.define("push", objectFactory.createBuiltInFunction(function* (...items) {
		let start = yield getLength(env, this.node);
		let i = 0;

		for (let length = items.length; i < length; i++) {
			this.node.defineOwnProperty(start + i, createIndexProperty(items[i]), true, env);
		}

		let newLength = objectFactory.createPrimitive(start + i);
		this.node.putValue("length", newLength, true, env);
		return newLength;
	}, 1, "Array.prototype.push"));

	proto.define("pop", objectFactory.createBuiltInFunction(function* () {
		let obj;
		let i = yield getLength(env, this.node);

		if (i > 0) {
			i--;

			if (this.node.hasProperty(i)) {
				obj = this.node.getValue(i);
				this.node.deleteProperty(i, true);
			}
		}

		this.node.putValue("length", objectFactory.createPrimitive(i), true, env);
		return obj || UNDEFINED;
	}, 0, "Array.prototype.pop"));

	proto.define("shift", objectFactory.createBuiltInFunction(function* () {
		let obj;
		let length = yield getLength(env, this.node);
		let i = 0;

		if (length > 0) {
			if (this.node.hasProperty(i)) {
				obj = this.node.getValue(i);
				this.node.deleteProperty(i);
			}

			while (++i < length) {
				if (this.node.hasProperty(i)) {
					this.node.putValue(i - 1, this.node.getValue(i), true, env);
				} else {
					this.node.deleteProperty(i);
				}
			}

			this.node.deleteProperty(length - 1);
		}

		this.node.putValue("length", objectFactory.createPrimitive(length === 0 ? 0 : --length), true, env);
		return obj || UNDEFINED;
	}, 0, "Array.prototype.shift"));

	proto.define("unshift", objectFactory.createBuiltInFunction(function* (...items) {
		let length = yield getLength(env, this.node);
		let argCount = items.length;
		let i = length;
		let toIndex, fromIndex;

		while (i > 0) {
			fromIndex = i - 1;
			toIndex = i + argCount - 1;

			if (this.node.hasProperty(fromIndex)) {
				this.node.putValue(toIndex, this.node.getValue(fromIndex), true, env);
			} else {
				this.node.deleteProperty(toIndex, true);
			}

			i--;
		}

		for (i = 0; i < argCount; i++) {
			this.node.putValue(i, items[i], true, env);
		}

		let newLength = objectFactory.createPrimitive(argCount + length);
		this.node.putValue("length", newLength, true, env);
		return newLength;
	}, 1, "Array.prototype.unshift"));

	proto.define("slice", objectFactory.createBuiltInFunction(function* (begin, end) {
		let source = this.node;
		let length = yield getLength(env, this.node);
		begin = begin ? (yield toInteger(env, begin)) : 0;

		if (!end || end.type === "undefined") {
			end = length;
		} else {
			end = yield toInteger(env, end);
		}

		let arr = objectFactory.create("Array");
		let index = 0;

		begin = getStartIndex(begin, length);
		end = getEndIndex(end, length);

		for (let i = begin; i < end; i++) {
			arr.defineOwnProperty(index++, createIndexProperty(source.getValue(i)), true, env);
		}

		return arr;
	}, 2, "Array.prototype.slice"));

	proto.define("splice", objectFactory.createBuiltInFunction(function* (start, deleteCount, ...elements) {
		let length = yield getLength(env, this.node);

		start = yield toInteger(env, start);
		if (start < 0) {
			start = Math.max(length + start, 0);
		} else {
			start = Math.min(start, length);
		}

		deleteCount = yield toInteger(env, deleteCount);
		if (deleteCount < 0) {
			deleteCount = 0;
		} else {
			deleteCount = Math.min(Math.max(deleteCount, 0), length - start);
		}

		let removed = objectFactory.create("Array");

		let k = 0;
		while (k < deleteCount) {
			if (this.node.hasProperty(k + start)) {
				removed.defineOwnProperty(k, createIndexProperty(this.node.getValue(k + start)), true, env);
			}

			k++;
		}

		let newCount = elements.length;
		if (newCount < deleteCount) {
			k = start;

			while (k < length - deleteCount) {
				if (this.node.hasProperty(k + deleteCount)) {
					this.node.putValue(k + newCount, this.node.getValue(k + deleteCount));
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
					this.node.putValue(k + newCount - 1, this.node.getValue(k + deleteCount - 1), true, env);
				} else {
					this.node.deleteProperty(k + newCount - 1);
				}

				k--;
			}
		}

		k = start;
		for (let i = 0; i < newCount; i++) {
			this.node.putValue(k, elements[i], true, env);
			k++;
		}

		this.node.putValue("length", objectFactory.createPrimitive(length - deleteCount + newCount), true, env);
		return removed;
	}, 2, "Array.prototype.splice"));

	proto.define("concat", objectFactory.createBuiltInFunction(function (...arrays) {
		let newArray = objectFactory.create("Array");

		// add "this" array to bunch
		arrays.unshift(toObject(env, this.node));

		let current, index = 0, i, length;
		while (arrays.length > 0) {
			current = arrays.shift();

			if (current.className === "Array") {
				for (i = 0, length = current.getValue("length").toNative(); i < length; i++) {
					if (current.hasProperty(i)) {
						newArray.defineOwnProperty(index, createIndexProperty(current.getValue(i)), true, env);
					}

					index++;
				}
			} else {
				newArray.defineOwnProperty(index++, createIndexProperty(current), true, env);
			}
		}

		newArray.putValue("length", objectFactory.createPrimitive(index), true, env);
		return newArray;
	}, 1, "Array.prototype.concat"));

	function* join (separator) {
		let length = yield getLength(env, this.node);
		separator = arguments.length === 0 || separator === UNDEFINED ? "," : (yield toPrimitive(env, separator, "string"));
		let stringValues = [];
		let stringValue;

		for (let i = 0; i < length; i++) {
			stringValue = "";
			if (this.node.hasProperty(i)) {
				stringValue = this.node.getValue(i);
				if (contracts.isNullOrUndefined(stringValue)) {
					stringValue = "";
				} else {
					stringValue = yield toString(env, stringValue);
				}
			}

			stringValues.push(stringValue);
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}

	proto.define("join", objectFactory.createBuiltInFunction(join, 1, "Array.prototype.join"));

	proto.define("indexOf", objectFactory.createBuiltInFunction(function* (searchElement, fromIndex) {
		searchElement = searchElement || UNDEFINED;
		let length = yield getLength(env, this.node);
		let index = arguments.length === 1 ? 0 : (yield toInteger(env, fromIndex));
		const notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (let entry of iterate.forward(env, this.node, index, length)) {
			if (searchElement.equals(entry.value || UNDEFINED)) {
				return objectFactory.createPrimitive(entry.index);
			}
		}

		return notFound;
	}, 1, "Array.prototype.indexOf"));

	proto.define("lastIndexOf", objectFactory.createBuiltInFunction(function* (searchElement, fromIndex) {
		searchElement = searchElement || UNDEFINED;
		let length = yield getLength(env, this.node);
		let index = arguments.length === 1 ? length - 1 : (yield toInteger(env, fromIndex));

		if (index < 0) {
			index = length - Math.abs(index);
		}

		for (let entry of iterate.reverse(env, this.node, index)) {
			if (searchElement.equals(entry.value || UNDEFINED)) {
				return objectFactory.createPrimitive(entry.index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}, 1, "Array.prototype.lastIndexOf"));

	proto.define("forEach", objectFactory.createBuiltInFunction(function* (callback, thisArg) {
		let arr = toObject(env, this.node);
		let length = yield getLength(env, arr);
		contracts.assertIsFunction(callback, arr);

		for (let entry of iterate.forward(env, arr, 0, length)) {
			yield executeCallback(callback, entry, thisArg, arr);
		}
	}, 1, "Array.prototype.forEach"));

	proto.define("map", objectFactory.createBuiltInFunction(function* (callback, thisArg) {
		let arr = toObject(env, this.node);
		let length = yield getLength(env, arr);
		contracts.assertIsNotNullOrUndefined(arr, "Array.prototype.map");
		contracts.assertIsFunction(callback, arr);

		let newArray = objectFactory.create("Array");
		newArray.putValue("length", objectFactory.createPrimitive(length), true, env);

		for (let entry of iterate.forward(env, arr, 0, length)) {
			let value = yield executeCallback(callback, entry, thisArg, arr);
			newArray.defineOwnProperty(entry.index, createIndexProperty(value), true, env);
		}

		return newArray;
	}, 1, "Array.prototype.map"));

	proto.define("filter", objectFactory.createBuiltInFunction(function* (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.filter");
		let arr = toObject(env, this.node);
		let length = yield getLength(env, arr);
		contracts.assertIsFunction(callback, arr);

		let newArray = objectFactory.create("Array");
		let index = 0;

		for (let entry of iterate.forward(env, arr, 0, length)) {
			let passed = toBoolean(yield executeCallback(callback, entry, thisArg, arr));
			if (passed) {
				newArray.defineOwnProperty(index++, createIndexProperty(entry.value), true, env);
			}
		}

		return newArray;
	}, 1, "Array.prototype.filter"));

	proto.define("every", objectFactory.createBuiltInFunction(function* (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");
		let arr = toObject(env, this.node);
		let length = yield getLength(env, arr);
		contracts.assertIsFunction(callback, arr);

		for (let entry of iterate.forward(env, arr, 0, length)) {
			let passed = toBoolean(yield executeCallback(callback, entry, thisArg, arr));
			if (!passed) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}, 1, "Array.prototype.every"));

	proto.define("some", objectFactory.createBuiltInFunction(function* (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.some");
		let arr = toObject(env, this.node);
		let length = yield getLength(env, this.node);
		contracts.assertIsFunction(callback, this.node);

		for (let entry of iterate.forward(env, arr, 0, length)) {
			let passed = toBoolean(yield executeCallback(callback, entry, thisArg, arr));
			if (passed) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Array.prototype.some"));

	proto.define("reduce", objectFactory.createBuiltInFunction(function* (callback, initialValue) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduce");
		let arr = toObject(env, this.node);
		let length = yield getLength(env, arr);
		contracts.assertIsFunction(callback, arr);

		let hasInitialValue = false;
		let value;

		if (arguments.length > 1) {
			value = initialValue;
			hasInitialValue = true;
		}

		let hasElements = false;
		if (length > 0) {
			for (let entry of iterate.forward(env, arr, 0, length)) {
				if (!hasElements) {
					hasElements = true;

					if (!hasInitialValue) {
						value = entry.value;
						continue;
					}
				}

				value = yield executeAccumulator(callback, value, entry, arr);
			}
		}

		if (!hasElements && !hasInitialValue) {
			return this.raise(new TypeError("Reduce of empty array with no initial value"));
		}

		return value;
	}, 1, "Array.prototype.reduce"));

	proto.define("reduceRight", objectFactory.createBuiltInFunction(function* (callback, initialValue) {
		let length = yield getLength(env, this.node);
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduceRight");
		let arr = toObject(env, this.node);
		contracts.assertIsFunction(callback, arr);

		let accumulator;
		let hasInitialValue = false;

		if (arguments.length > 1) {
			accumulator = initialValue;
			hasInitialValue = true;
		}

		let hasElements = false;
		if (length > 0) {
			for (let entry of iterate.reverse(env, arr, length - 1)) {
				if (!hasElements) {
					hasElements = true;

					if (!hasInitialValue) {
						accumulator = entry.value;
						continue;
					}
				}

				accumulator = yield executeAccumulator(callback, accumulator, entry, arr);
			}
		}

		if (!hasElements && !hasInitialValue) {
			return this.raise(new TypeError("Reduce of empty array with no initial value"));
		}

		return accumulator;
	}, 1, "Array.prototype.reduceRight"));

	proto.define("reverse", objectFactory.createBuiltInFunction(function* () {
		let length = yield getLength(env, this.node);
		let middle = Math.floor(length / 2);
		let lower = 0;
		let upper, upperValue, lowerValue;

		while (lower !== middle) {
			upper = length - lower - 1;
			lowerValue = this.node.hasProperty(lower) && this.node.getValue(lower);
			upperValue = this.node.hasProperty(upper) && this.node.getValue(upper);

			if (upperValue) {
				this.node.putValue(lower, upperValue, true, env);
			}

			if (lowerValue) {
				this.node.putValue(upper, lowerValue, true, env);
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

	proto.define("sort", objectFactory.createBuiltInFunction(function* (compareFunction) {
		let executionContext = this;
		let arr = this.node;
		let length = yield getLength(env, arr);
		let i = 0;

		let comparer;
		if (contracts.isNullOrUndefined(compareFunction)) {
			comparer = function defaultComparer (a, b) {
				a = x(toString(env, a));
				b = x(toString(env, b));

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
				let scope = env.createScope(UNDEFINED);
				scope.init(compareFunction.node.body);

				scope.loadArgs(compareFunction.node.params, [a, b], compareFunction);
				let executionResult = x(scope.use(function () {
					return x(executionContext.create(compareFunction.node.body, compareFunction.node).execute());
				}));

				if (executionResult && executionResult.exit && executionResult.result) {
					return executionResult.result.getValue().toNative();
				}

				return undefined;
			};
		}

		// to array, run the wrapped comparer, then re-assign indexes
		let sortedArray = toArray(arr, length)
			// undefined positions are handled by the underlying sort algorithm, so replace them with the raw primitive value
			.map(el => { return el.isPrimitive && el.value === undefined ? undefined : el; })
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

	proto.define("toLocaleString", objectFactory.createBuiltInFunction(function* () {
		let length = yield getLength(env, this.node);
		let arr = new Array(length);
		let i = 0;
		let current;

		while (i < length) {
			if (this.node.hasProperty(i)) {
				current = this.node.getValue(i);

				if (contracts.isNullOrUndefined(current)) {
					arr[i] = "";
				} else {
					arr[i] = yield toString(env, yield tryExec(env, current, "toLocaleString"));
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
