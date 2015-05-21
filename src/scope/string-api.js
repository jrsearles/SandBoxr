var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "search", "slice", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "valueOf"];
var staticMethods = ["fromCharCode"];
var slice = Array.prototype.slice;
var propertyConfig = { configurable: true, enumerable: false, writable: true };

function getString (value, executionContext) {
	if (!value) {
		return "";
	}

	if (value.isPrimitive) {
		return value.toString();
	}

	var primitiveValue = utils.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	primitiveValue = utils.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

module.exports = function (globalScope) {
	var stringClass = objectFactory.createFunction(function (value) {
		value = getString(value, this);

		// called as new
		if (this.scope.thisNode !== globalScope) {
			return utils.createWrappedPrimitive(this.node, value);
		}

		return objectFactory.createPrimitive(value);
	}, globalScope);

	var proto = stringClass.properties.prototype;

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	}, propertyConfig);

	staticMethods.forEach(function (name) {
		var fn = String[name];
		if (fn) {
			stringClass.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	}, propertyConfig);

	proto.setProperty("split", objectFactory.createFunction(function (separator, limit) {
		separator = separator && separator.value;
		limit = limit && limit.toNumber();

		var result = this.node.value.split(separator, limit);

		var arr = objectFactory.create("Array");
		result.forEach(function (value, index) {
			arr.setProperty(index, objectFactory.createPrimitive(value));
		});

		return arr;
	}), propertyConfig);

	proto.setProperty("replace", objectFactory.createFunction(function (regexOrSubstr, substrOrFn) {
		var match = regexOrSubstr && regexOrSubstr.value;
		if (substrOrFn && substrOrFn.type === "function") {
			var executionContext = this;
			var wrappedReplacer = function () {
				var scope = executionContext.scope.createScope();
				var args = slice.call(arguments).map(function (arg) { return objectFactory.createPrimitive(arg); });

				utils.loadArguments(substrOrFn.node.params, args, scope);
				var result = executionContext.create(substrOrFn.node.body, substrOrFn.node, scope).execute().result;
				return result && result.value;
			};

			return objectFactory.createPrimitive(this.node.value.replace(match, wrappedReplacer));
		}

		return objectFactory.createPrimitive(this.node.value.replace(match, substrOrFn && substrOrFn.value));
	}), propertyConfig);

	proto.setProperty("match", objectFactory.createFunction(function (regex) {
		var results = this.node.value.match(regex && regex.value);
		if (results) {
			var matches = objectFactory.create("Array");
			results.forEach(function (value, index) {
				matches.setProperty(index, objectFactory.createPrimitive(value));
			});

			return matches;
		}

		return globalScope.getProperty("null");
	}), propertyConfig);

	globalScope.setProperty("String", stringClass);
};
