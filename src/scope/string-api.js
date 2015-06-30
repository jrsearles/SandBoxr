var contracts = require("../utils/contracts");
var convert = require("../utils/convert");
var func = require("../utils/func");
var types = require("../utils/types");
var RegexType = require("../types/regex-type");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "substr", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "valueOf"];
var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var stringClass = objectFactory.createFunction(function (value) {
		var stringValue = String(convert.toPrimitive(this, value, "string"));

		// called as new
		if (this.isNew) {
			return convert.primitiveToObject(stringValue, objectFactory);
		}

		return objectFactory.createPrimitive(stringValue);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = stringClass.proto;
	proto.defineOwnProperty("length", objectFactory.createPrimitive(0));

	proto.defineOwnProperty("search", objectFactory.createFunction(function (regex) {
		return objectFactory.createPrimitive(this.node.value.search(regex.source));
	}), propertyConfig);

	proto.defineOwnProperty("substring", objectFactory.createFunction(function (start, end) {
		contracts.assertIsNotConstructor(this, "substring");

		var value = convert.toPrimitive(this, this.node, "string");
		var length = value.length;

		start = convert.toInteger(this, start);
		end = types.isNullOrUndefined(end) ? length : convert.toInteger(this, end);

		return objectFactory.createPrimitive(value.substring(start, end));
	}), propertyConfig);

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.defineOwnProperty(name, convert.toNativeFunction(objectFactory, fn, "String.prototype." + name), propertyConfig);
		}
	}, propertyConfig);

	stringClass.defineOwnProperty("fromCharCode", objectFactory.createFunction(function (charCode) {
		var context = this;
		var args = slice.call(arguments).map(function (arg) { return convert.toPrimitive(context, arg); });
		return objectFactory.createPrimitive(String.fromCharCode.apply(null, args));
	}), propertyConfig);

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
		var separatorValue = separator && separator.className === "RegExp" ? separator.source : convert.toString(this, separator);
		var limitValue;

		if (!types.isNullOrUndefined(limit)) {
			limitValue = convert.toUInt32(this, limit);
		}

		var result = stringValue.split(separatorValue, limitValue);

		var arr = objectFactory.create("Array");
		var context = this;

		result.forEach(function (value, index) {
			arr.putValue(index, objectFactory.createPrimitive(value), false, context);
		});

		return arr;
	}), propertyConfig);

	proto.defineOwnProperty("replace", objectFactory.createFunction(function (regexOrSubstr, substrOrFn) {
		var match = regexOrSubstr && (regexOrSubstr.source || regexOrSubstr.value);

		if (substrOrFn && substrOrFn.type === "function") {
			var executionContext = this;
			var wrappedReplacer = function () {
				var scope = executionContext.scope.createScope();
				var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });

				func.loadArguments(substrOrFn.node.params, args, scope);
				var result = executionContext.create(substrOrFn.node.body, substrOrFn.node, scope).execute().result;
				return result && result.value;
			};

			return objectFactory.createPrimitive(this.node.value.replace(match, wrappedReplacer));
		}

		return objectFactory.createPrimitive(this.node.value.replace(match, substrOrFn && substrOrFn.value));
	}), propertyConfig);

	proto.defineOwnProperty("match", objectFactory.createFunction(function (regex) {
		var stringValue = convert.toString(this, this.node);
		var actualRegex;

		if (regex && regex instanceof RegexType) {
			actualRegex = regex.source;
		} else if (regex) {
			actualRegex = new RegExp(convert.toPrimitive(this, regex));
		}

		var results = stringValue.match(actualRegex);
		if (results) {
			var matches = objectFactory.create("Array");
			var context = this;
			
			results.forEach(function (value, index) {
				matches.putValue(index, objectFactory.createPrimitive(value), false, context);
			});

			return matches;
		}

		return globalScope.getValue("null");
	}), propertyConfig);

	proto.defineOwnProperty("trim", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotNullOrUndefined(this.node, "String.prototype.trim");

		var stringValue = convert.toPrimitive(this, this.node, "string");
		return objectFactory.createPrimitive(stringValue.trim());
	}, 0, "String.prototype.trim"), propertyConfig);

	globalScope.defineOwnProperty("String", stringClass, propertyConfig);
};
