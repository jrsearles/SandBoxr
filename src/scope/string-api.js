var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

var protoMethods = ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "search", "slice", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "valueOf"];
var staticMethods = ["fromCharCode"];
var slice = Array.prototype.slice;

module.exports = function (globalScope) {
	var stringClass = objectFactory.createFunction(utils.wrapNative(String));
	var proto = stringClass.getProperty("prototype");

	protoMethods.forEach(function (name) {
		var fn = String.prototype[name];
		if (fn) {
			proto.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	});

	staticMethods.forEach(function (name) {
		var fn = String[name];
		if (fn) {
			stringClass.setProperty(name, objectFactory.createFunction(utils.wrapNative(fn)));
		}
	});

	proto.setProperty("split", objectFactory.createFunction(function (separator, limit) {
		separator = separator && separator.value;
		limit = limit && limit.toNumber();

		var result = this.node.value.split(separator, limit);

		var arr = objectFactory.create("ARRAY");
		result.forEach(function (value, index) {
			arr.setProperty(index, objectFactory.createPrimitive(value));
		});

		return arr;
	}));

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
	}));

	proto.setProperty("match", objectFactory.createFunction(function (regex) {
		var results = this.node.value.match(regex && regex.value);
		if (results) {
			var matches = objectFactory.create("ARRAY");
			results.forEach(function (value, index) {
				matches.setProperty(index, objectFactory.createPrimitive(value));
			});

			return matches;
		}

		return typeRegistry.get("NULL");
	}));

	typeRegistry.set("String", stringClass);
	globalScope.setProperty("String", stringClass);
};
