var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var regexClass = objectFactory.createFunction(utils.wrapNative(RegExp));
	var proto = regexClass.getProperty("prototype");

	proto.setProperty("test", objectFactory.createFunction(utils.wrapNative(RegExp.prototype.test)));

	proto.setProperty("exec", objectFactory.createFunction(function (str) {
		var match = this.node.value.exec(str.toString());

		// update the last index from the underlying regex
		this.node.setProperty("lastIndex", objectFactory.createPrimitive(this.node.value.lastIndex));

		if (match) {
			var arr = objectFactory.create("ARRAY");
			for (var i = 0, ln = match.length; i < ln; i++) {
				arr.setProperty(i, objectFactory.createPrimitive(match[i]));
			}

			// extra properties are added to the array
			arr.setProperty("index", objectFactory.createPrimitive(match.index));
			arr.setProperty("input", objectFactory.createPrimitive(match.input));
			return arr;
		}

		return typeRegistry.get("null");
	}));

	typeRegistry.set("RegExp", regexClass);
	globalScope.setProperty("RegExp", regexClass);
};
