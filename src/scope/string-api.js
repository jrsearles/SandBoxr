var contracts = require("../utils/contracts");
var convert = require("../utils/convert");
var func = require("../utils/func");
var types = require("../utils/types");
var RegexType = require("../types/regex-type");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase"];
var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var stringClass = objectFactory.createFunction(function (value) {
		var stringValue = value ? String(convert.toString(this, value.getValue())) : "";

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(stringValue, objectFactory);
		}

		return objectFactory.createPrimitive(stringValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = stringClass.proto;

	// prototype can be coerced into an empty string
	proto.value = "";
	proto.className = "String";
	
	proto.defineOwnProperty("length", objectFactory.createPrimitive(0));

	proto.defineOwnProperty("search", objectFactory.createBuiltInFunction(function (regex) {
		var stringValue = convert.toString(this, this.node);
		var underlyingRegex;

		if (regex) {
			if (regex.className === "RegExp") {
				underlyingRegex = regex.source;
			} else {
				underlyingRegex = new RegExp(convert.toString(this, regex));
			}
		}

		return objectFactory.createPrimitive(stringValue.search(underlyingRegex));
	}, 1, "String.prototype.search"), propertyConfig);

	proto.defineOwnProperty("substring", objectFactory.createBuiltInFunction(function (start, end) {
		contracts.assertIsNotConstructor(this, "substring");

		var value = convert.toPrimitive(this, this.node, "string");
		var length = value.length;

		start = convert.toInteger(this, start);
		end = types.isNullOrUndefined(end) ? length : convert.toInteger(this, end);

		return objectFactory.createPrimitive(value.substring(start, end));
	}, 2, "String.prototype.substring"), propertyConfig);

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.defineOwnProperty(name, objectFactory.createBuiltInFunction(function () {
				var context = this;
				var stringValue = convert.toString(this, this.node);
				var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg); });
				return objectFactory.createPrimitive(String.prototype[name].apply(stringValue, args));
			}, String.prototype[name].length, "String.prototype." + name), propertyConfig);
			// proto.defineOwnProperty(name, convert.toNativeFunction(objectFactory, fn, "String.prototype." + name), propertyConfig);
		}
	}, propertyConfig);

	stringClass.defineOwnProperty("fromCharCode", objectFactory.createBuiltInFunction(function (charCode) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg); });
		return objectFactory.createPrimitive(String.fromCharCode.apply(null, args));
	}, 1, "String.fromCharCode"), propertyConfig);

	proto.defineOwnProperty("slice", objectFactory.createBuiltInFunction(function (start, end) {
		var stringValue = convert.toString(this, this.node);
		var startValue = convert.toInteger(this, start);
		var endValue;

		if (!types.isNullOrUndefined(end)) {
			endValue = convert.toInteger(this, end);
		}

		return objectFactory.createPrimitive(stringValue.slice(startValue, endValue));
	}, 2, "String.prototype.slice"), propertyConfig);

	proto.defineOwnProperty("split", objectFactory.createBuiltInFunction(function (separator, limit) {
		var stringValue = convert.toString(this, this.node);
		separator = separator && separator.getValue();
		limit = limit && limit.getValue();
		var limitValue = types.isUndefined(limit) ? undefined : convert.toUInt32(this, limit);

		// if (!types.isNullOrUndefined(limit)) {
		// 	limitValue = convert.toUInt32(this, limit);
		// }

		var arr = objectFactory.create("Array");
		if (types.isUndefined(separator)) {
			arr.putValue(0, objectFactory.createPrimitive(stringValue), false, this);
		} else {
			var separatorValue;
			if (separator.className === "RegExp") {
				separatorValue = separator.source;
			} else {
				separatorValue = convert.toString(this, separator);
			}

			var result = stringValue.split(separatorValue, limitValue);
			var context = this;

			result.forEach(function (value, index) {
				arr.putValue(index, objectFactory.createPrimitive(value), false, context);
			});
		}

		return arr;
	}, 2, "String.prototype.split"), propertyConfig);

	proto.defineOwnProperty("replace", objectFactory.createBuiltInFunction(function (regexOrSubstr, substrOrFn) {
		var stringValue = convert.toString(this, this.node);

		var matcher;
		if (regexOrSubstr && regexOrSubstr.className === "RegExp") {
			matcher = regexOrSubstr.source;
		} else {
			matcher = convert.toString(this, regexOrSubstr);
		}

		var replacer;
		if (substrOrFn && substrOrFn.type === "function") {
			var executionContext = this;
			var callee = substrOrFn.native ? substrOrFn : substrOrFn.node;
			var params = callee.params || [];

			replacer = function () {
				var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });
				var replacedValue = func.executeFunction(executionContext, substrOrFn, params, args, globalObject, callee);
				return replacedValue ? convert.toString(executionContext, replacedValue) : undefined;
				// var scope = executionContext.env.createScope(globalObject);
				// scope.init(substrOrFn.node.body);

				// var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });

				// func.loadArguments(substrOrFn.node.params, args, executionContext.env);

				// try {
				// 	var result = executionContext.create(substrOrFn.node.body, substrOrFn.node).execute().result;
				// 	return result && result.getValue().value;
				// } catch (err) {
				// 	scope.exitScope();
				// 	throw err;
				// }

				// scope.exitScope();
			};
		} else {
			replacer = convert.toString(this, substrOrFn);
		}

		return objectFactory.createPrimitive(stringValue.replace(matcher, replacer));
	}, 2, "String.prototype.replace"), propertyConfig);

	proto.defineOwnProperty("match", objectFactory.createBuiltInFunction(function (regex) {
		var stringValue = convert.toString(this, this.node);
		var actualRegex;

		if (regex && regex instanceof RegexType) {
			actualRegex = regex.source;
		} else if (regex) {
			actualRegex = new RegExp(convert.toPrimitive(this, regex));
		}

		var match = stringValue.match(actualRegex);
		if (match) {
			var matches = objectFactory.create("Array");
			var context = this;

			match.forEach(function (value, index) {
				matches.putValue(index, objectFactory.createPrimitive(value), false, context);
			});

			matches.putValue("index", objectFactory.createPrimitive(match.index), false, this);
			matches.putValue("input", objectFactory.createPrimitive(match.input), false, this);
			return matches;
		}

		return globalObject.getProperty("null").getValue();
	}, 1, "String.prototype.match"), propertyConfig);

	proto.defineOwnProperty("trim", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotNullOrUndefined(this.node, "String.prototype.trim");

		var stringValue = convert.toPrimitive(this, this.node, "string");
		return objectFactory.createPrimitive(stringValue.trim());
	}, 0, "String.prototype.trim"), propertyConfig);

	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "String") {
			throw new TypeError("String.prototype.toString is not generic");
		}

		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.toString"), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createBuiltInFunction(function () {
		if (this.node.className !== "String") {
			throw new TypeError("String.prototype.valueOf is not generic");
		}

		return objectFactory.createPrimitive(this.node.value);
	}, 0, "String.prototype.valueOf"), propertyConfig);

	globalObject.defineOwnProperty("String", stringClass, propertyConfig);
};
