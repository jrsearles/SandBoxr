var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var ArrayType = require("../types/array-type");

var slice = Array.prototype.slice;

function getStartIndex (index, length) {
	if (index < 0) {
		return Math.max(length - Math.abs(index), 0);
	}

	return Math.min(index || 0, length);
}

function executeCallback (callback, thisArg, executionContext, index) {
	var scope = executionContext.scope.createScope(thisArg);
	var args = [executionContext.node.properties[index], objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, callback.node, scope).execute().result;
}

function executeAccumulator (callback, priorValue, executionContext, index) {
	var scope = executionContext.scope.createScope();
	var args = [priorValue, executionContext.node.properties[index], objectFactory.createPrimitive(index), executionContext.node];

	utils.loadArguments(callback.node.params, args, scope);
	return executionContext.create(callback.node.body, callback.node, scope).execute().result;
}

module.exports = function (globalScope) {
	var arrayClass = objectFactory.createFunction(function () {
		var newArray;
		if (this.scope.thisNode === globalScope) {
			newArray = objectFactory.create("Array");
		} else {
			newArray = this.scope.thisNode;

			// this will be a regular object - we need to trick it into becoming an array
			// newArray.setProto(globalScope.getProperty("Array").proto);
			// newArray.setProperty = ArrayType.prototype.setProperty.bind(newArray);
			// ArrayType.prototype.init.call(newArray, objectFactory);
		}

		if (arguments.length > 0) {
			if (arguments.length === 1 && arguments[0].type === "number") {
				if (arguments[0].toNumber() < 0) {
					throw new RangeError("Invalid array length");
				}

				newArray.setProperty("length", arguments[0]);
			} else {
				for (var i = 0, ln = arguments.length; i < ln; i++) {
					newArray.setProperty(i, arguments[i]);
				}
			}
		}

		return newArray;
	}, globalScope);

	var proto = arrayClass.properties.prototype;

	arrayClass.setProperty("isArray", objectFactory.createFunction(function (obj) {
		return globalScope.createPrimitive(obj instanceof ArrayType);
	}));

	proto.setProperty("push", objectFactory.createFunction(function () {
		var start = this.node.getProperty("length").value || 0;

		var i = 0;
		var length = arguments.length;
		for (; i < length; i++) {
			this.node.setProperty(start + i, arguments[i]);
		}

		return this.node.getProperty("length");
	}));

	proto.setProperty("pop", objectFactory.createFunction(function () {
		var index = this.node.getProperty("length").value;
		var obj = this.node.getProperty(--index) || objectFactory.createPrimitive(undefined);

		// need to update length manually - deleting an item does not update length per spec
		if (index >= 0) {
			this.node.setProperty("length", objectFactory.createPrimitive(index));
		}

		return obj;
	}));

	proto.setProperty("shift", objectFactory.createFunction(function () {
		var obj = this.node.getProperty(0);

		var i = 1;
		var length = this.node.getProperty("length").value;
		for (; i < length; i++) {
			this.node.properties[i - 1] = this.node.properties[i];
		}

		this.node.setProperty("length", objectFactory.createPrimitive(--length));
		return obj;
	}));

	proto.setProperty("unshift", objectFactory.createFunction(function () {
		var i = this.node.getProperty("length").value;
		var length = arguments.length;

		while (i--) {
			this.node.setProperty(i + length, this.node.properties[i]);
		}

		for (; i < length; i++) {
			this.node.setProperty(i, arguments[i]);
		}

		return this.node.getProperty("length");
	}));

	proto.setProperty("slice", objectFactory.createFunction(function (begin, end) {
		begin = begin ? begin.toNumber() : 0;
		end = end ? end.toNumber() : this.node.properties.length.value;

		var arr = objectFactory.create("Array");

		// since slice is generic we can just call it against our properties object which is array-like enough
		slice.call(this.node.properties, begin, end).forEach(function (element, index) {
			arr.setProperty(index, element);
		});

		return arr;
	}));

	proto.setProperty("splice", objectFactory.createFunction(function (start, deleteCount) {
		start = start.toNumber();
		deleteCount = deleteCount.toNumber();

		var removed = objectFactory.create("Array");
		var length = this.node.properties.length.value;
		var newCount = arguments.length - 2;
		var i, j = 0;

		start = getStartIndex(start, length);
		deleteCount = Math.min(deleteCount, length - start);

		for (i = start; i < start + deleteCount; i++) {
			removed.setProperty(j++, this.node.properties[i]);
			this.node.properties[i] = this.node.properties[i + deleteCount];
		}

		this.node.setProperty("length", objectFactory.createPrimitive(length - deleteCount));

		if (newCount > 0) {
			i = this.node.properties.length.value + newCount;
			while (i-- > start) {
				this.node.setProperty(i, this.node.properties[i - newCount]);
			}

			i = 0;
			while (i++ < newCount) {
				this.node.setProperty(start++, arguments[i + 1]);
			}
		}

		return removed;
	}));

	proto.setProperty("concat", objectFactory.createFunction(function () {
		var newArray = objectFactory.create("Array");
		var arrays = slice.call(arguments);

		// add "this" array to bunch
		arrays.unshift(this.node);

		var current, index = 0, i, length;
		while (arrays.length > 0) {
			current = arrays.shift();

			if (current instanceof ArrayType) {
				for (i = 0, length = current.properties.length.value; i < length; i++) {
					newArray.setProperty(index++, current.properties[i]);
				}
			} else {
				newArray.setProperty(index++, current);
			}
		}

		return newArray;
	}));

	proto.setProperty("join", objectFactory.createFunction(function (separator) {
		separator = arguments.length === 0 ? "," : separator.toString();
		var stringValues = [];

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			stringValues.push(this.node.properties[i].toString());
		}

		return objectFactory.createPrimitive(stringValues.join(separator));
	}));

	proto.setProperty("indexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
		var index = arguments.length === 1 ? 0 : fromIndex.toNumber();
		var length = this.node.properties.length.value;
		var notFound = objectFactory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (; index < length; index++) {
			if (index in this.node.properties && searchElement.equals(this.node.properties[index])) {
				return objectFactory.createPrimitive(index);
			}
		}

		return notFound;
	}));

	proto.setProperty("lastIndexOf", objectFactory.createFunction(function (searchElement, fromIndex) {
		var length = this.node.properties.length.value;
		var index = arguments.length === 1 ? length : fromIndex.toNumber();

		if (index < 0) {
			index = length - Math.abs(index);
		}

		while (index-- > 0) {
			if (index in this.node.properties && searchElement.equals(this.node.properties[index])) {
				return objectFactory.createPrimitive(index);
			}
		}

		return objectFactory.createPrimitive(-1);
	}));

	proto.setProperty("forEach", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties) {
				executeCallback(callback, thisArg, this, i);
			}
		}
	}));

	proto.setProperty("map", objectFactory.createFunction(function (callback, thisArg) {
		var newArray = objectFactory.create("Array");

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties) {
				newArray.setProperty(i, executeCallback(callback, thisArg, this, i));
			}
		}

		return newArray;
	}));

	proto.setProperty("filter", objectFactory.createFunction(function (callback, thisArg) {
		var newArray = objectFactory.create("Array");
		var index = 0;

		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && executeCallback(callback, thisArg, this, i).toBoolean()) {
				newArray.setProperty(index++, this.node.properties[i]);
			}
		}

		return newArray;
	}));

	proto.setProperty("every", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && !executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(false);
			}
		}

		return objectFactory.createPrimitive(true);
	}));

	proto.setProperty("some", objectFactory.createFunction(function (callback, thisArg) {
		for (var i = 0, length = this.node.properties.length.value; i < length; i++) {
			if (i in this.node.properties && executeCallback(callback, thisArg, this, i).toBoolean()) {
				return objectFactory.createPrimitive(true);
			}
		}

		return objectFactory.createPrimitive(false);
	}));

	proto.setProperty("reduce", objectFactory.createFunction(function (callback, initialValue) {
		if (callback.type !== "function") {
			throw new TypeError();
		}

		var length = this.node.properties.length.value;
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
	}));

	proto.setProperty("reduceRight", objectFactory.createFunction(function (callback, initialValue) {
		var index = this.node.properties.length.value - 1;
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
	}));

	proto.setProperty("reverse", objectFactory.createFunction(function () {
		var length = this.node.properties.length.value;
		var temp;
		for (var i = 0, ln = length / 2; i < ln; i++) {
			temp = this.node.properties[length - i - 1];
			this.node.properties[length - i - 1] = this.node.properties[i];
			this.node.properties[i] = temp;
		}

		return this.node;
	}));

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

	proto.setProperty("sort", objectFactory.createFunction(function (compareFunction) {
		var executionContext = this;
		var arr = this.node;

		var wrappedComparer = compareFunction && function (a, b) {
			var scope = executionContext.scope.createScope();

			utils.loadArguments(compareFunction.node.params, [a, b], scope);
			return executionContext.create(compareFunction.node.body, compareFunction.node, scope).execute().result.value;
		};

		// convert to array, run the wrapped comparer, then re-assign indexes
		slice.call(arr.properties)
			.sort(wrappedComparer || defaultComparer)
			.forEach(function (element, index) {
				arr.properties[index] = element;
			});

		return arr;
	}));

	// todo: this is a bit hacky - toString will call join if available per spec,
	// but will call Object..toString if not
	proto.setProperty("toString", proto.properties.join);

	// typeRegistry.set("ARRAY", arrayClass);
	globalScope.setProperty("Array", arrayClass);
};
