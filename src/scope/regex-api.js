var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var propertyConfig = { enumerable: false };

module.exports = function (globalScope) {
	var regexClass = objectFactory.createFunction(function (pattern, flags) {
		if (pattern && pattern.className === "RegExp") {
			return pattern;
		}

		pattern = pattern && pattern.toString();
		flags = flags && flags.toString();

		return objectFactory.create("RegExp", new RegExp(pattern, flags));
	});

	var proto = regexClass.proto;
	proto.defineProperty("test", objectFactory.createFunction(utils.wrapNative(RegExp.prototype.test)), propertyConfig);

	proto.defineProperty("exec", objectFactory.createFunction(function (str) {
		var match = this.node.source.exec(str.toString());

		// update the last index from the underlying regex
		this.node.setProperty("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex));

		if (match) {
			var arr = objectFactory.create("Array");
			for (var i = 0, ln = match.length; i < ln; i++) {
				arr.setProperty(i, objectFactory.createPrimitive(match[i]));
			}

			// extra properties are added to the array
			arr.setProperty("index", objectFactory.createPrimitive(match.index));
			arr.setProperty("input", objectFactory.createPrimitive(match.input));
			return arr;
		}

		return this.scope.global.getProperty("null");
	}), propertyConfig);

	proto.defineProperty("toString", objectFactory.createFunction(function () {
		var str = "/";
		str += this.node.getProperty("source").toString();
		str += "/";

		if (this.node.getProperty("global").toBoolean()) {
			str += "g";
		}

		if (this.node.getProperty("ignoreCase").toBoolean()) {
			str += "i";
		}

		if (this.node.getProperty("multiline").toBoolean()) {
			return str += "m";
		}

		return objectFactory.create("String", str);
	}), propertyConfig);

	proto.defineProperty("compile", objectFactory.createFunction(utils.wrapNative(RegExp.prototype.compile)), propertyConfig);

	var frozen = { configurable: false, enumerable: false, writable: false };
	["global", "ignoreCase", "multiline", "source"].forEach(function (name) {
		proto.defineProperty(name, objectFactory.createPrimitive(RegExp.prototype[name]), frozen);
	});

	globalScope.defineProperty("RegExp", regexClass, { enumerable: false });
};
