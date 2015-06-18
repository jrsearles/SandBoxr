var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var util = require("../util");
var contracts = require("../utils/contracts");
var ArrayType = require("../types/array-type");

var propertyConfig = { enumerable: false };

function validateIndex (index) {
	return util.isInteger(index) && index >= 0 && index < 4294967296;
}

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
	var scope = executionContext.scope.createScope(thisArg);
	var args = [executionContext.node.getValue(index), objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, callback.node, scope).execute().result;
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	var scope = executionContext.scope.createScope();
	var args = [priorValue, executionContext.node.getValue(index), objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, callback.node, scope).execute().result;
}

module.exports = function (globalScope) {
	var arrayClass = objectFactory.createFunction(function (length) {
		var newArray = objectFactory.create("Array");

		if (arguments.length > 0) {
			if (arguments.length === 1 && length.type === "number") {
				if (!validateIndex(length.toNumber())) {
					throw new RangeError("Invalid array length");
				}

				newArray.putValue("length", length);
			} else {
				for (var i = 0, ln = arguments.length; i < ln; i++) {
					newArray.putValue(i, arguments[i]);
				}
			}
		}

		return newArray;
	}, globalScope);

	var proto = arrayClass.proto;
	proto.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false });

	arrayClass.defineOwnProperty("isArray", objectFactory.createFunction(function (obj) {
		return globalScope.createPrimitive(obj === proto || obj instanceof ArrayType);
	}));

	proto.defineOwnProperty("push", objectFactory.createFunction(function () {
		var start = this.node.getValue("length").value || 0;

		var i = 0;
		var length = arguments.length;
		for (; i < length; i++) {
			this.node.putValue(start + i, arguments[i]);
		}

		return this.node.getValue("length");
	}), propertyConfig);

	proto.defineOwnProperty("pop", objectFactory.createFunction(function () {
		var index = this.node.getValue("length").value;
		var obj = this.node.getValue(--index) || objectFactory.createPrimitive(undefined);

		// need to update length manually - deleting an item does not update length per spec
		if (index >= 0) {
			this.node.putValue("length", objectFactory.createPrimitive(index));
		}

		return obj;
	}), propertyConfig);

	proto.defineOwnProperty("shift", objectFactory.createFunction(function () {
		var obj = this.node.getValue(0);

		var i = 1;
		var length = this.node.getValue("length").value;
		for (; i < length; i++) {
			this.node.properties[i - 1] = this.node.properties[i];
		}

		this.node.putValue("length", objectFactory.createPrimitive(--length));
		return obj;
	}), propertyConfig);

	proto.defineOwnProperty("unshift", objectFactory.createFunction(function () {
		var i = this.node.getValue("length").value;
		var length = arguments.length;

		while (i--) {
			this.node.putValue(i + length, this.node.getValue(i));
		}

		for (; i < length; i++) {
			this.node.putValue(i, arguments[i]);
		}

		return this.node.getValue("length");
	}), propertyConfig);

	proto.defineOwnProperty("slice", objectFactory.createFunction(function (begin, end) {
		var source = this.node;
		var length = source.getValue("length").value;
		begin = begin ? utils.toInteger(this, begin) : 0;

		if (!end || end.type === "undefined") {
			end = length;
		} else {
			end = utils.toInteger(this, end);
		}

		var arr = objectFactory.create("Array");
		var index = 0;

		begin = getStartIndex(begin, length);
		end = getEndIndex(end, length);

		for (var i = begin; i < end; i++) {
			arr.putValue(index++, source.getValue(i));
		}

		return arr;
	}), propertyConfig);

	proto.defineOwnProperty("splice", objectFactory.createFunction(function (start, deleteCount) {
		start = start.toNumber();
		deleteCount = deleteCount.toNumber();

		var removed = objectFactory.create("Array");
		var length = this.node.getValue("length").value;
		var newCount = arguments.length - 2;
		var i, removedIndex = 0;

		start = getStartIndex(start, length);
		deleteCount = Math.min(deleteCount, length - start);

		for (i = start; i < start + deleteCount; i++) {
			removed.putValue(removedIndex++, this.node.getValue(i));
			// this.node.properties[i] = this.node.properties[i + deleteCount];
		}

		if (deleteCount > 0) {
			for (i = start + deleteCount; i < length; i++) {
				this.node.properties[i - deleteCount] = this.node.properties[i];
			}
		}

		length -= deleteCount;
		this.node.putValue("length", objectFactory.createPrimitive(length));

		if (newCount > 0) {
			i = length + newCount;
			while (i-- > start) {
				this.node.putValue(i, this.node.getValue([i - newCount]));
			}

			i = 0;
			while (i++ < newCount) {
				this.node.putValue(start++, arguments[i + 1]);
			}
		}

		return removed;
	}), propertyConfig);

	proto.defineOwnProperty("concat", objectFactory.createFunction(function () {
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
	}), propertyConfig);

	proto.defineOwnProperty("join", objectFactory.createFunction(function (separator) {
		separator = arguments.length === 0 ? "," : separator.toString();
		var stringValues = [];

		for (var i = 0, length = this.node.getValue("length").value; i < length; i++) {
			stringValues.push(this.node.getValue(i).toString());
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}), propertyConfig);

	proto.defineOwnProperty("indexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
		var index = arguments.length === 1 ? 0 : utils.toInteger(this, fromIndex);
		var length = utils.toUInt32(this, this.node.getValue("length"));
		var notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (; index < length; index++) {
			if (index in this.node.properties && searchElement.equals(this.node.getValue(index))) {
				return objectFactory.createPrimitive(index);
			}
		}

		return notFound;
	}), propertyConfig);

	proto.defineOwnProperty("lastIndexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
		var length = utils.toUInt32(this, this.node.getValue("length"));
		var index = arguments.length === 1 ? length : utils.toInteger(this, fromIndex);

		if (index < 0) {
			index = length - Math.abs(index);
		}

		while (index-- > 0) {
			if (index in this.node.properties && searchElement.equals(this.node.getValue(index))) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}), propertyConfig);

	proto.defineOwnProperty("forEach", objectFactory.createFunction(function (callback, thisArg) {
		var length = utils.toUInt32(this, this.node.getValue("length"));
		for (var i = 0; i < length; i++) {
			if (String(i) in this.node.properties) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}), propertyConfig);

	proto.defineOwnProperty("map", objectFactory.createFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.map");

		var newArray = objectFactory.create("Array");
		var length = utils.toUInt32(this, this.node.getValue("length"));

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i)) {
				newArray.putValue(i, executeCallback(callback, thisArg, this, i));
			}
		}

		return newArray;
	}), propertyConfig);

	proto.defineOwnProperty("filter", objectFactory.createFunction(function (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.filter");

		var newArray = objectFactory.create("Array");
		var length = utils.toUInt32(this, this.node.getValue("length"));
		var index = 0;

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.putValue(index++, this.node.getValue(i));
			}
		}

		return newArray;
	}), propertyConfig);

	function every (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.every");

		var length = utils.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && !executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}
	every.nativeLength = 1;
	proto.defineOwnProperty("every", objectFactory.createFunction(every), propertyConfig);

	function some (callback, thisArg) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.some");

		var length = utils.toUInt32(this, this.node.getValue("length"));
		contracts.assertIsFunction(callback);

		for (var i = 0; i < length; i++) {
			if (this.node.hasProperty(i) && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}
	some.nativeLength = 1;
	proto.defineOwnProperty("some", objectFactory.createFunction(some), propertyConfig);

	proto.defineOwnProperty("reduce", objectFactory.createFunction(function (callback, initialValue) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduce");

		if (callback.type !== "function") {
			throw new TypeError();
		}

		var length = utils.toUInt32(this, this.node.getValue("length"));
		var index = 0;
		var value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index < length && !(index in this.node.properties)) {
				index++;
			}

			if (index >= length) {
				throw new TypeError("Reduce of empty array with no initial value");
			}

			value = this.node.properties[index++];
		}

		for (; index < length; index++) {
			if (index in this.node.properties) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}), propertyConfig);

	proto.defineOwnProperty("reduceRight", objectFactory.createFunction(function (callback, initialValue) {
		contracts.assertIsNotNullOrUndefined(this.node, "Array.prototype.reduceRight");

		var index = this.node.getValue("length").value - 1;
		var value;

		if (arguments.length >= 2) {
			value = initialValue;
		} else {
			// make sure array isn't empty
			while (index >= 0 && !(index in this.node.properties)) {
				index--;
			}

			value = this.node.properties[index--];
		}

		for (; index >= 0; index--) {
			if (index in this.node.properties) {
				value = executeAccumulator(callback, value, this, index);
			}
		}

		return value;
	}), propertyConfig);

	proto.defineOwnProperty("reverse", objectFactory.createFunction(function () {
		var length = utils.toUInt32(this, this.node.getValue("length"));
		var temp;

		for (var i = 0, ln = length / 2; i < ln; i++) {
			temp = this.node.properties[length - i - 1];
			this.node.properties[length - i - 1] = this.node.properties[i];
			this.node.properties[i] = temp;
		}

		return this.node;
	}), propertyConfig);

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

	proto.defineOwnProperty("sort", objectFactory.createFunction(function (compareFunction) {
		var executionContext = this;
		var arr = this.node;

		var wrappedComparer = compareFunction && function (a, b) {
			var scope = executionContext.scope.createScope();

			utils.loadArguments(compareFunction.node.params, [a, b], scope);
			return executionContext.create(compareFunction.node.body, compareFunction.node, scope).execute().result.value;
		};

		// convert to array, run the wrapped comparer, then re-assign indexes
		util.toArray(arr)
			.sort(wrappedComparer || defaultComparer)
			.forEach(function (element, index) {
				arr.putValue(index, element);
			});

		return arr;
	}), propertyConfig);

	proto.defineOwnProperty("toLocaleString", objectFactory.createFunction(function () {
		// todo: implement for reach
		var values = util.toArray(this.node).map(function (arg) { return arg.value.toLocaleString(); });
		return objectFactory.createPrimitive(values.toLocaleString());
	}), propertyConfig);

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.defineOwnProperty("toString", proto.properties.join.value, propertyConfig);

	globalScope.defineOwnProperty("Array", arrayClass, propertyConfig);
};
