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
	proto.defineOwnProperty("test", objectFactory.createFunction(function (str) {
		var value = utils.toPrimitive(this, str, "string");
		return objectFactory.createPrimitive(this.node.source.test(value));
	}), propertyConfig);

	proto.defineOwnProperty("exec", objectFactory.createFunction(function (str) {
		var match = this.node.source.exec(str.toString());

		// update the last index from the underlying regex
		this.node.putValue("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex));

		if (match) {
			var arr = objectFactory.create("Array");
			for (var i = 0, ln = match.length; i < ln; i++) {
				arr.putValue(i, objectFactory.createPrimitive(match[i]));
			}

			// extra properties are added to the array
			arr.putValue("index", objectFactory.createPrimitive(match.index));
			arr.putValue("input", objectFactory.createPrimitive(match.input));
			return arr;
		}

		return this.scope.global.getValue("null");
	}), propertyConfig);

	proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var str = "/";
		str += this.node.getValue("source").toString();
		str += "/";

		if (this.node.getValue("global").toBoolean()) {
			str += "g";
		}

		if (this.node.getValue("ignoreCase").toBoolean()) {
			str += "i";
		}

		if (this.node.getValue("multiline").toBoolean()) {
			return str += "m";
		}

		return objectFactory.create("String", str);
	}), propertyConfig);

	proto.defineOwnProperty("compile", objectFactory.createFunction(utils.wrapNative(RegExp.prototype.compile)), propertyConfig);

	var frozen = { configurable: false, enumerable: false, writable: false };
	["global", "ignoreCase", "multiline", "source"].forEach(function (name) {
		proto.defineOwnProperty(name, objectFactory.createPrimitive(RegExp.prototype[name]), frozen);
	});

	globalScope.defineOwnProperty("RegExp", regexClass, { enumerable: false });
};
