var contracts = require("../utils/contracts");
var func = require("../utils/func");
var convert = require("../utils/convert");
var ArrayType = require("../types/array-type");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

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

function executeCallback (callback, thisArg, executionContext, index) {
	var scope = executionContext.scope.createScope(thisArg || executionContext.scope.global);
	var objectFactory = scope.global.factory;
	var args = [executionContext.node.getValue(index), objectFactory.createPrimitive(index), executionContext.node];

	func.loadArguments(callback.node.params, args, scope);
	var executionResult = executionContext.create(callback.node.body, callback.node, scope).execute();
	return executionResult ? executionResult.result : scope.global.getValue("undefined");
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	var scope = executionContext.scope.createScope();
	var undef = scope.global.getValue("undefined");
	var objectFactory = scope.global.factory;
	var args = [priorValue || undef, executionContext.node.getValue(index) || undef, objectFactory.createPrimitive(index), executionContext.node];

	func.loadArguments(callback.node.params, args, scope);
	var executionResult = executionContext.create(callback.node.body, callback.node, scope).execute();
	return executionResult ? executionResult.result : undef;
}

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var arrayClass = objectFactory.createFunction(function (length) {
		var newArray = objectFactory.create("Array");

		if (arguments.length > 0) {
			if (arguments.length === 1 && length.type === "number") {
				newArray.putValue("length", length, false, this);
			} else {
				for (var i = 0, ln = arguments.length; i < ln; i++) {
					newArray.putValue(i, arguments[i], false, this);
				}
			}
		}

		return newArray;
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = arrayClass.proto;
	proto.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false, writable: true });

	arrayClass.defineOwnProperty("isArray", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj === proto || obj instanceof ArrayType);
	}));

	proto.defineOwnProperty("push", objectFactory.createBuiltInFunction(function (arg) {
		var start = convert.toUInt32(this, this.node.getValue("length"));

		var i = 0;
		var length = arguments.length;
		for (; i < length; i++) {
			this.node.putValue(start + i, arguments[i]);
		}

		var newLength = objectFactory.createPrimitive(start + i);
		this.node.putValue("length", newLength);
		return newLength;
	}, 1, "Array.prototype.push"), propertyConfig);

	proto.defineOwnProperty("pop", objectFactory.createBuiltInFunction(function () {
		var obj;
		var length = convert.toUInt32(this, this.node.getValue("length"));
		if (length) {
			obj = this.node.getValue(--length);
			this.node.deleteProperty(length);
		}

		this.node.putValue("length", objectFactory.createPrimitive(length || 0));
		return obj || this.scope.global.getValue("undefined");
	}, 0, "Array.prototype.pop"), propertyConfig);

	proto.defineOwnProperty("shift", objectFactory.createBuiltInFunction(function () {
		var obj;
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var i = 0;

		if (length > 0) {
			obj = this.node.getValue(i);
			this.node.deleteProperty(i);

			while (++i < length) {
				if (this.node.hasProperty(i)) {
					this.node.putValue(i - 1, this.node.getValue(i));
				} else {
					this.node.deleteProperty(i);
				}
			}
		}

		this.node.putValue("length", objectFactory.createPrimitive(length === 0 ? 0 : --length));
		return obj || this.scope.global.getValue("undefined");
	}, 0, "Array.prototype.shift"), propertyConfig);

	proto.defineOwnProperty("unshift", objectFactory.createBuiltInFunction(function (elementN) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var count = arguments.length;
		var i = length || 0;

		while (i > 0) {
			if (this.node.hasProperty(i - 1)) {
				this.node.putValue(i + count - 1, this.node.getValue(i - 1));
			} else {
				this.node.deleteProperty(i + count - 1);
			}

			i--;
		}

		for (; i < count; i++) {
			this.node.putValue(i, arguments[i]);
		}

		var newLength = objectFactory.createPrimitive(count + length);
		this.node.putValue("length", newLength);
		return newLength;
	}, 1, "Array.prototype.unshift"), propertyConfig);

	proto.defineOwnProperty("slice", objectFactory.createBuiltInFunction(function (begin, end) {
		var source = this.node;
		var length = convert.toUInt32(this, source.getValue("length"));
		begin = begin ? convert.toInteger(this, begin) : 0;

		if (!end || end.type === "undefined") {
			end = length;
		} else {
			end = convert.toInteger(this, end);
		}

		var arr = objectFactory.create("Array");
		var index = 0;

		begin = getStartIndex(begin, length);
		end = getEndIndex(end, length);

		for (var i = begin; i < end; i++) {
			arr.putValue(index++, source.getValue(i));
		}

		return arr;
	}, 2, "Array.prototype.slice"), propertyConfig);

	proto.defineOwnProperty("splice", objectFactory.createBuiltInFunction(function (start, deleteCount) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		start = convert.toInteger(this, start);
		if (start < 0) {
			start = Math.max(length + start, 0);
		} else {
			start = Math.min(start, length);
		}

		deleteCount = Math.min(Math.max(convert.toInteger(this, deleteCount), 0), length - start);
		var removed = objectFactory.create("Array");

		var k = 0;
		while (k < deleteCount) {
			if (this.node.hasProperty(k + start)) {
				removed.putValue(k, this.node.getValue(k + start));
			}

			k++;
		}

		var newCount = arguments.length - 2;
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
					this.node.putValue(k + newCount - 1, this.node.getValue(k + deleteCount - 1));
				} else {
					this.node.deleteProperty(k + newCount - 1);
				}

				k--;
			}
		}

		k = start;
		var i = 0;
		for (; i < newCount; i++) {
			this.node.putValue(k, arguments[i + 2]);
			k++;
		}

		this.node.putValue("length", objectFactory.createPrimitive(length - deleteCount + newCount));
		return removed;
	}, 2, "Array.prototype.splice"), propertyConfig);

	proto.defineOwnProperty("concat", objectFactory.createBuiltInFunction(function () {
		var newArray = objectFactory.create("Array");
		var arrays = Array.prototype.slice.call(arguments);

		// add "this" array to bunch
		arrays.unshift(this.node);

		var current, index = 0, i, length;
		while (arrays.length > 0) {
			current = arrays.shift();

			if (current instanceof ArrayType) {
				for (i = 0, length = current.getValue("length").value; i < length; i++) {
					newArray.putValue(index++, current.getValue(i));
				}
			} else {
				newArray.putValue(index++, current);
			}
		}

		return newArray;
	}, 1, "Array.prototype.concat"), propertyConfig);

	function join (separator) {
		var undef = this.scope.global.getValue("undefined");
		var length = convert.toUInt32(this, this.node.getValue("length"));
		separator = arguments.length === 0 || separator === undef ? "," : convert.toPrimitive(this, separator, "string");
		var stringValues = [];
		var stringValue;

		for (var i = 0; i < length; i++) {
			stringValue = "";
			if (this.node.hasProperty(i)) {
				stringValue = this.node.getValue(i);
				if (stringValue.isPrimitive) {
					stringValue = stringValue.value == null ? "" : stringValue.toString();
				} else {
					stringValue = convert.toPrimitive(this, stringValue, "string");
				}
			}

			stringValues.push(stringValue);
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}

	proto.defineOwnProperty("join", objectFactory.createBuiltInFunction(join, 1, "Array.prototype.join"), propertyConfig);

	proto.defineOwnProperty("indexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		var undef = this.scope.global.getValue("undefined");
		searchElement = searchElement || undef;
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var index = arguments.length === 1 ? 0 : convert.toInteger(this, fromIndex);
		var notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (; index < length; index++) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getValue(index) || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return notFound;
	}, 1, "Array.prototype.indexOf"), propertyConfig);

	proto.defineOwnProperty("lastIndexOf", objectFactory.createBuiltInFunction(function (searchElement, fromIndex) {
		var undef = this.scope.global.getValue("undefined");
		searchElement = searchElement || undef;
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var index = arguments.length === 1 ? length - 1 : convert.toInteger(this, fromIndex);

		if (index < 0) {
			index = length - Math.abs(index);
		}

		for (; index >= 0; index--) {
			if (this.node.hasProperty(index) && searchElement.equals(this.node.getValue(index) || undef)) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}, 1, "Array.prototype.lastIndexOf"), propertyConfig);

	proto.defineOwnProperty("forEach", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}, 1, "Array.prototype.forEach"), propertyConfig);

	proto.defineOwnProperty("map", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.map");
		contracts.assertIsFunction(callback);

		var newArray = objectFactory.create("Array");
		newArray.putValue("length", objectFactory.createPrimitive(length));

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				newArray.putValue(i, executeCallback(callback, thisArg, this, i));
			}
		}

		return newArray;
	}, 1, "Array.prototype.map"), propertyConfig);

	proto.defineOwnProperty("filter", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.filter");
		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		var newArray = objectFactory.create("Array");
		var index = 0;

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.putValue(index++, this.node.getValue(i));
			}
		}

		return newArray;
	}, 1, "Array.prototype.filter"), propertyConfig);

	proto.defineOwnProperty("every", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");
		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && !executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}, 1, "Array.prototype.every"), propertyConfig);

	proto.defineOwnProperty("some", objectFactory.createBuiltInFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.some");

		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Array.prototype.some"), propertyConfig);

	proto.defineOwnProperty("reduce", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduce");
		contracts.assertIsFunction(callback);

		var index = 0;
		var value;

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

			value = this.node.getValue(index++);
		}

		for (; index < length; index++) {
			if (this.node.hasProperty(index)) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}, 1, "Array.prototype.reduce"), propertyConfig);

	proto.defineOwnProperty("reduceRight", objectFactory.createBuiltInFunction(function (callback, initialValue) {
		var index = convert.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduceRight");
		contracts.assertIsFunction(callback);

		index--;
		var value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index >= 0 && !(this.node.hasProperty(index))) {
				index--;
			}

			if (index <= 0) {
				throw new TypeError("Reduce of empty array with no initial value");
			}

			value = this.node.getValue(index--);
		}

		for (; index >= 0; index--) {
			if (this.node.hasProperty(index)) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}, 1, "Array.prototype.reduceRight"), propertyConfig);

	proto.defineOwnProperty("reverse", objectFactory.createBuiltInFunction(function () {
		var length = convert.toUInt32(this, this.node.getValue("length"));
		var temp;

		for (var i = 0, ln = length / 2; i < ln; i++) {
			temp = this.node.getValue(length - i - 1);
			this.node.putValue(length - i - 1, this.node.getValue(i));
			this.node.putValue(i, temp);
		}

		return this.node;
	}, 0, "Array.prototype.reverse"), propertyConfig);

	function defaultComparer (a, b) {
		a = a.toString();
		b = b.toString();

		if (a < b) {
			return -1;
		}

		if (a > b) {
			return 1;
		}

		return 0;
	}

	proto.defineOwnProperty("sort", objectFactory.createBuiltInFunction(function (compareFunction) {
		var executionContext = this;
		var arr = this.node;

		var wrappedComparer = compareFunction && function (a, b) {
			var scope = executionContext.scope.createScope();

			func.loadArguments(compareFunction.node.params, [a, b], scope);
			return executionContext.create(compareFunction.node.body, compareFunction.node, scope).execute().result.value;
		};

		// convert to array, run the wrapped comparer, then re-assign indexes
		convert.toArray(arr)
			.sort(wrappedComparer || defaultComparer)
			.forEach(function (element, index) {
				arr.putValue(index, element, false, this);
			});

		return arr;
	}, 1, "Array.prototype.sort"), propertyConfig);

	proto.defineOwnProperty("toLocaleString", objectFactory.createBuiltInFunction(function () {
		// todo: implement for reach
		var values = convert.toArray(this.node).map(function (arg) { return arg.value.toLocaleString(); });
		return objectFactory.createPrimitive(values.toLocaleString());
	}, 0, "Array.prototype.toLocaleString"), propertyConfig);

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(join, 1, "Array.prototype.toString"), propertyConfig);

	globalScope.defineOwnProperty("Array", arrayClass, propertyConfig);
};
